# WhatsApp bot — RAG-grounded replies

`POST /api/whatsapp/incoming` turns an inbound WhatsApp text into a reply
grounded in the `knowledge_chunks` corpus (retrieval-augmented generation).

> **No Meta account?** There is a second, open-source transport: a QR-linked
> Baileys client that answers from this same path with no business account,
> token or public webhook — see [`docs/whatsapp-open-source.md`](./whatsapp-open-source.md).

## How it works

```
WhatsApp → POST /api/whatsapp/incoming
  1. verify X-Hub-Signature-256 (when WHATSAPP_APP_SECRET is set)
  2. parse the message(s), dedupe by message id, per-phone rate limit
  3. answerWithRag(text)   (src/server/rag.ts)
       a. embedText(text)                     — gemini-embedding-001 (SAME model as ingest)
       b. retrieveChunks(embedding)           — cosine top-k over knowledge_chunks
       c. buildRagPrompt(chunks, question)    — src/prompts/rag-prompt.md
       d. generateContentWithFallback(...)    — gemini-flash-latest, temp 0
  4. sendWhatsAppText(sender, answer)          — Graph API
```

The retrieval/ranking math (`src/server/ragCore.ts`) is shared with the weekly
evaluator (`scripts/train-rag-weekly.ts`), so "what the bot answers with" and
"what the weekly loop scores" use identical code.

**Retrieval index:** `retrieveChunks` ranks in-process against a cached copy of
the whole corpus (`src/server/chunkIndex.ts`). The cache is not just an
optimisation — PostgREST truncates any single select at `max-rows` (Supabase
default 1000, even for an explicit `.limit(100000)`), so a per-query read would
silently rank against an arbitrary 1000-row slice and miss most of the corpus.
Rows are read page-by-page once, then reused for `RAG_INDEX_TTL_MS` (default
10 min), which also avoids re-downloading ~24 MB of vectors per message.

**Corpus completeness:** retrieval only returns chunks that already exist. While
the free-tier ingest is still filling, an uncovered question gets a graceful
"knowledge base still being built" reply (`no_chunks: true`) rather than a
hallucination — the model is instructed to answer **only** from the excerpts.

## Corpora / sources

`knowledge_chunks` holds more than drug monographs. Each chunk carries a
`source` tag (`'monograph'` | `'stg'`) and a source-scoped `source_ref`
(monograph id, or STG filename slug) — see migration
`00021_knowledge_chunks_sources.sql`. The unique upsert key is
`(source, source_ref, chunk_index)`.

A default retrieval searches **all** sources (they share one embedding model),
so STG chunks compete on similarity with monographs; pass
`answerWithRag(q, { source: 'stg' })` to restrict a query to guidelines.

## Configuration

| Env var                                  | Purpose                                                           |
| ---------------------------------------- | ----------------------------------------------------------------- |
| `WHATSAPP_VERIFY_TOKEN`                  | GET-subscription handshake; enter the same value in the Meta app. |
| `WHATSAPP_TOKEN`                         | Graph API access token (send replies).                            |
| `WHATSAPP_PHONE_NUMBER_ID`               | The bot's phone number id.                                        |
| `WHATSAPP_APP_SECRET`                    | Enables `X-Hub-Signature-256` verification of inbound POSTs.      |
| `WHATSAPP_GRAPH_VERSION`                 | Graph API version (default `v21.0`).                              |
| `WHATSAPP_RATE_LIMIT_MAX` / `_WINDOW_MS` | Per-phone throttle (default 10 / 60 s).                           |
| `WHATSAPP_RAG_TOP_K`                     | Chunks to ground each answer in (default 3).                      |
| `RAG_INDEX_TTL_MS`                       | How long the in-memory corpus stays fresh (default 600000).       |

Set the Meta webhook callback URL to `https://<your-host>/api/whatsapp/incoming`
and subscribe to the `messages` field.

## Testing without WhatsApp credentials

With `WHATSAPP_TOKEN` / `WHATSAPP_PHONE_NUMBER_ID` unset the endpoint runs in
dry-run: it does not call the Graph API and **returns the generated replies** in
the JSON body, so it can be exercised end-to-end locally.

```sh
# 1. Handshake (needs WHATSAPP_VERIFY_TOKEN set in the server env)
curl -s "http://localhost:3000/api/whatsapp/incoming?hub.mode=subscribe&hub.verify_token=$WHATSAPP_VERIFY_TOKEN&hub.challenge=abc"   # → abc

# 2. A message (dry-run echo). Meta's payload shape:
curl -s -X POST http://localhost:3000/api/whatsapp/incoming \
  -H 'Content-Type: application/json' \
  -d '{"object":"whatsapp_business_account","entry":[{"changes":[{"value":{"messages":[{"from":"254700000000","id":"wamid.T1","text":{"body":"What is the dose of paracetamol?"}}]}}]}]}'
# → {"ok":true,"received":1,"dry_run":true,"replies":[{"from":"254700000000","chunks":3,"no_chunks":false,"answer":"..."}]}
```

With `WHATSAPP_APP_SECRET` set, add the HMAC header (or the POST returns 401):

```sh
BODY='{...}'
SIG="sha256=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$WHATSAPP_APP_SECRET" | awk '{print $2}')"
curl -s -X POST http://localhost:3000/api/whatsapp/incoming \
  -H 'Content-Type: application/json' -H "X-Hub-Signature-256: $SIG" -d "$BODY"
```

## Notes

- The endpoint is declared **before** the opt-in `/api` auth guard in `server.ts`
  (like `/api/health`), so it stays reachable when `API_REQUIRE_AUTH=true`; its
  security comes from the HMAC signature + per-phone throttle instead.
- Inbound message ids are deduped (Meta redelivers on timeouts) and rate limited
  per phone number.
- Conversations are **not** written to `bot_conversation_log` yet: that table's
  `user_id` is `NOT NULL REFERENCES auth.users`, and a WhatsApp sender has no
  Supabase auth user. Logging needs a `channel`/nullable-user change (follow-up).
- Unit tests: `npx vitest run src/server/__tests__` (pure parsing, signature,
  limiter, dedupe, cosine ranking, prompt assembly, corpus paging/index caching).
