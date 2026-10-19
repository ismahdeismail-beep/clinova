# WhatsApp — open-source transport (Baileys)

`docs/whatsapp-rag.md` covers the **Meta Cloud API** webhook. This file covers
the **open-source alternative**: run the same RAG bot on a normal WhatsApp
number with [Baileys](https://github.com/WhiskeySockets/Baileys), a protocol
client, instead of the Meta platform.

Both transports call the same handler chain and the same `answerWithRag()`, so a
question gets the identical grounded answer either way.

|                | Meta Cloud API (`whatsappWebhook.ts`)         | Open source (`whatsappOpen.ts`) |
| -------------- | --------------------------------------------- | ------------------------------- |
| Account needed | Meta business account + app + review          | A WhatsApp number               |
| Credentials    | `WHATSAPP_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` | QR scan, nothing to paste       |
| Inbound        | Webhook POST (public URL, signature)          | Client polls the socket         |
| Outbound       | Graph API                                     | Same socket                     |
| Runs anywhere  | Needs a public endpoint                       | Just needs outbound HTTPS       |
| Official?      | Yes (supported)                               | **No (unofficial)** — see below |

## Quick start

```sh
npm run wa:link          # prints a QR code — scan it on your phone
```

1. On the phone: **WhatsApp → Settings → Linked devices → Link a device**.
2. Scan the QR printed in the terminal.
3. Text yourself (or anyone) a question. The bot replies when the RAG corpus
   covers it, and says so plainly when it does not.

The pairing state is stored in `.whatsapp-auth/` (gitignored), so subsequent
starts are silent — no re-scan unless the session expires.

```sh
npm run wa:dry           # compute answers, print them, never send
npm run wa:logout        # forget the local pairing state
npx tsx scripts/whatsapp-baileys.ts --logout   # same, before npm run wa:link
```

## Configuration

See the `WHATSAPP_OPEN_*` block in `.env.example`. Nothing is required to start;
the defaults are the safe ones.

| Var                          | Default                    | Meaning                                            |
| ---------------------------- | -------------------------- | -------------------------------------------------- |
| `WHATSAPP_OPEN_AUTH_DIR`     | `.whatsapp-auth`           | Where the pairing state lives                      |
| `WHATSAPP_OPEN_DRY_RUN`      | `false`                    | Log replies instead of sending them                |
| `WHATSAPP_OPEN_ALLOW_GROUPS` | `false`                    | Off: a group reply broadcasts to every participant |
| `WHATSAPP_OPEN_DEBUG`        | `false`                    | Show Baileys' socket-level logging                 |
| `WHATSAPP_OPEN_TOP_K`        | `WHATSAPP_RAG_TOP_K` / `3` | Chunks each answer is grounded in                  |
| `WHATSAPP_OPEN_RATE_LIMIT_*` | `WHATSAPP_RATE_LIMIT_*`    | Per-sender throttle                                |

Inbound handling also honours the shared `WHATSAPP_RATE_LIMIT_*` throttle and a
message-id dedupe, so a reconnect that redelivers messages never double-replies.

## Honest caveats

**This is not an official integration.** It speaks WhatsApp's own protocol
directly, which is convenient but has consequences worth knowing before you point
it at your primary number:

- **Account risk.** Automating via the protocol client violates WhatsApp's
  Terms of Service. In practice small, low-volume, human-driven bots behave like
  any other linked device, but ban risk is real. **Test on a secondary number
  first.**
- **No guarantees.** Protocol changes can break the client between releases;
  Baileys is `7.0.0-rc14` (a release candidate pinned in `package.json`).
  Message delivery/ordering is best-effort.
- **You run the process.** There is no inbound webhook — the socket must be
  kept alive (systemd, `pm2`, or a terminal you keep open).
- **Pairing expires.** Phones drop linked sessions periodically; re-run
  `npm run wa:link` when it does.

If you later need the supported, ban-risk-free path, the Cloud API webhook in
`docs/whatsapp-rag.md` is already built and mounted — the two can coexist.

## Privacy & security

- `.whatsapp-auth/` is **gitignored**. It authenticates as your device; treat a
  leak like a leaked session cookie.
- Messages are sent to Google Gemini for the RAG answer (same as the Cloud API
  transport). Don't route clinical/PII data you wouldn't otherwise send.
- Throttle (default 10 msgs/min/sender) and dedupe bound abuse if a number spams
  the bot; groups are ignored unless you explicitly opt in.

## Code map

| File                                        | Role                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| `src/server/whatsappOpen.ts`                | Pure core: text extraction, filter, throttle, dedupe, RAG answer — unit-tested |
| `scripts/whatsapp-baileys.ts`               | Socket lifecycle: auth state, QR, reconnect, dispatch                          |
| `src/server/__tests__/whatsappOpen.test.ts` | Tests for the core                                                             |

Both transports are deliberately thin around `src/server/rag.ts`, which is the
single place the corpus is read and answered from.
