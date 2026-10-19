/**
 * whatsapp-baileys.ts — run the Clinova RAG bot on an open-source WhatsApp
 * protocol client (Baileys) instead of the Meta Cloud API.
 *
 * Why: the Cloud API needs a Meta business account, an app, a webhook URL and a
 * Graph token. This links a normal WhatsApp number by scanning a QR code, and
 * still answers from the SAME RAG serving path (src/server/rag.ts), so both
 * transports behave identically.
 *
 * Design notes
 * ------------
 * - All the interesting logic lives in src/server/whatsappOpen.ts (pure,
 *   unit-tested); this file only owns the socket + process lifecycle.
 * - Auth is a multi-device pairing state on disk (default .whatsapp-auth, which
 *   is gitignored). Scanning once is enough — it survives restarts.
 * - `messages.upsert` is only handled for `type === 'notify'`: Baileys also
 *   emits `append` when it backfills history, and replying to old chats would
 *   spam contacts on every reconnect.
 * - Reconnects with capped backoff unless the device was logged out.
 * - `--dry-run` computes RAG answers and prints them instead of sending.
 *
 * Usage
 * -----
 *   npx tsx scripts/whatsapp-baileys.ts            # link by QR, then answer
 *   npx tsx scripts/whatsapp-baileys.ts --dry-run  # no messages ever sent
 *   npx tsx scripts/whatsapp-baileys.ts --logout   # drop local pairing state
 *
 * Env: GEMINI_API_KEY + SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY (RAG), plus
 * optional WHATSAPP_OPEN_* overrides documented in .env.example.
 */
import 'dotenv/config'
import { mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import makeWASocket, {
  Browsers,
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys'
import qrcode from 'qrcode-terminal'
import { answerWithRag } from '../src/server/rag.js'
import { createOpenBridge, incomingFromKey, type OpenIncoming } from '../src/server/whatsappOpen.js'

interface Args {
  dryRun: boolean
  logout: boolean
}

function parseArgs(argv: string[]): Args {
  const args: Args = { dryRun: false, logout: false }
  for (const a of argv) {
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--logout') args.logout = true
  }
  return args
}

const bool = (v: string | undefined, dflt = false): boolean =>
  v === undefined || v === '' ? dflt : !/^(0|false|no|off)$/i.test(v)

/** Baileys wants a pino-shaped logger; a no-op one keeps the terminal clean. */
function quietLogger(): any {
  const logger: Record<string, any> = {}
  for (const k of ['trace', 'debug', 'info', 'warn', 'error', 'fatal']) {
    logger[k] = () => logger
  }
  logger.child = () => logger
  logger.silent = true
  logger.level = 'silent'
  return logger
}

const args = parseArgs(process.argv.slice(2))
const authDir = resolve(process.cwd(), process.env.WHATSAPP_OPEN_AUTH_DIR || '.whatsapp-auth')
const debug = bool(process.env.WHATSAPP_OPEN_DEBUG)
const dryRun = args.dryRun || bool(process.env.WHATSAPP_OPEN_DRY_RUN)
const allowGroups = bool(process.env.WHATSAPP_OPEN_ALLOW_GROUPS)
const topK = Number(process.env.WHATSAPP_OPEN_TOP_K || process.env.WHATSAPP_RAG_TOP_K || 3)
const rateLimitMax = Number(
  process.env.WHATSAPP_OPEN_RATE_LIMIT_MAX || process.env.WHATSAPP_RATE_LIMIT_MAX || 10,
)
const rateLimitWindowMs = Number(
  process.env.WHATSAPP_OPEN_RATE_LIMIT_WINDOW_MS ||
    process.env.WHATSAPP_RATE_LIMIT_WINDOW_MS ||
    60000,
)
const RECONNECT_MAX_MS = 30_000

let closing = false
process.on('SIGINT', () => {
  console.log('\n[wa-open] stopping — device stays linked (use --logout to forget it).')
  closing = true
  process.exit(0)
})

/** One socket session. Resolves with the close code, if any. */
async function runSession(): Promise<{ code?: number }> {
  const { state, saveCreds } = await useMultiFileAuthState(authDir)

  const sock = makeWASocket({
    auth: state,
    browser: Browsers.ubuntu('Chrome') as any,
    logger: debug ? undefined : (quietLogger() as any),
    printQRInTerminal: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,
  })

  const send = async (chat: string, text: string): Promise<void> => {
    await sock.sendMessage(chat, { text })
  }

  const handle = createOpenBridge(
    { answer: answerWithRag, send, log: (line) => console.log(line) },
    { topK, allowGroups, dryRun, rateLimitMax, rateLimitWindowMs },
  )

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    // 'append' = history backfill; only live ('notify') messages are answered.
    if (type !== 'notify') return
    for (const m of messages) {
      let incoming: OpenIncoming | null = null
      try {
        incoming = incomingFromKey(m.key, m.message)
        if (!incoming) continue
        const outcome = await handle(incoming)
        if (!outcome.handled && (debug || outcome.skipped !== 'no-text')) {
          console.log(`[wa-open] skip ${outcome.skipped}: ${incoming.from}`)
        }
      } catch (err) {
        console.error(
          `[wa-open] handler failed (${incoming?.from ?? 'unknown'}): ${(err as Error)?.message || err}`,
        )
      }
    }
  })

  const closed = new Promise<{ code?: number }>((resolveClosed) => {
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update

      if (qr) {
        console.log('\nScan in WhatsApp → Settings → Linked devices → Link a device:\n')
        qrcode.generate(qr, { small: true })
        console.log(`\nPairing state: ${authDir}  (a restart reuses it if you are quick)\n`)
      }

      if (connection === 'open') {
        console.log(
          `[wa-open] connected ✓ ${dryRun ? '(dry-run: replies are logged, not sent)' : ''}`,
        )
      }

      if (connection === 'close') {
        // Baileys surfaces the close reason as a Boom error; reach the HTTP-ish
        // status code defensively (it is absent on plain Errors).
        const err = lastDisconnect?.error as any
        const code = err?.output?.statusCode as number | undefined
        resolveClosed({ code })
      }
    })
  })

  return closed
}

async function main(): Promise<void> {
  if (args.logout) {
    rmSync(authDir, { recursive: true, force: true })
    console.log(
      `[wa-open] removed local pairing state (${authDir}).\n` +
        'Also unlink the device from your phone: WhatsApp → Settings → Linked devices.',
    )
    return
  }

  mkdirSync(authDir, { recursive: true })
  console.log(
    [
      '[wa-open] open-source WhatsApp bot starting',
      `  transport : Baileys (protocol client, no Meta account)`,
      `  auth dir  : ${authDir}`,
      `  dry-run   : ${dryRun}`,
      `  groups    : ${allowGroups ? 'answer' : 'ignored'}`,
      `  rag top-k : ${topK}`,
      `  throttle  : ${rateLimitMax} msgs / ${rateLimitWindowMs}ms per sender`,
    ].join('\n'),
  )

  let attempt = 0
  for (;;) {
    let code: number | undefined
    try {
      ;({ code } = await runSession())
    } catch (err) {
      console.error(`[wa-open] session error: ${(err as Error)?.message || err}`)
    }
    if (closing) return
    if (code === DisconnectReason.loggedOut) {
      console.error(
        '[wa-open] logged out (401). Re-link with: npx tsx scripts/whatsapp-baileys.ts --logout && run it again.',
      )
      process.exit(1)
    }
    attempt += 1
    const wait = Math.min(RECONNECT_MAX_MS, 2000 * 2 ** Math.min(attempt, 4))
    console.log(`[wa-open] reconnecting in ${wait}ms (attempt ${attempt}, code ${code ?? '?'})`)
    await delay(wait)
  }
}

main().catch((e) => {
  console.error(`[wa-open] fatal: ${e?.message ?? e}`)
  process.exit(1)
})
