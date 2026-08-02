// Image processing: validation, duplicate detection (dHash), optimization (WebP).
import sharp from 'sharp'
import { createHash } from 'crypto'

// ── Download ───────────────────────────────────────────────────────
// upload.wikimedia.org rate-limits unregistered bots hard (429s) — retry with
// backoff, respect Retry-After, and pace downloads with a small delay.
const DOWNLOAD_USER_AGENT = 'ClinovaBot/1.0 (educational project; contact admin@clinova.example)'

function parseRetryAfter(header: string | null): number {
  if (!header) return 0
  const seconds = Number(header)
  if (Number.isFinite(seconds)) return Math.min(seconds, 120)
  const when = Date.parse(header)
  if (Number.isFinite(when)) return Math.min(Math.max(Math.ceil((when - Date.now()) / 1000), 0), 120)
  return 0
}

export async function downloadImage(url: string): Promise<Buffer> {
  let lastErr: Error | null = null
  for (let attempt = 0; attempt < 6; attempt++) {
    let res: Response
    try {
      res = await fetch(url, {
        signal: AbortSignal.timeout(30000),
        headers: { 'User-Agent': DOWNLOAD_USER_AGENT },
      })
    } catch (e: any) {
      lastErr = e
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)))
      continue
    }

    if (res.status === 429) {
      const waitMs = parseRetryAfter(res.headers.get('retry-after')) * 1000 || 12000 * (attempt + 1)
      console.log(`  [download 429] waiting ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/6)`)
      await new Promise((r) => setTimeout(r, waitMs))
      continue
    }

    if (!res.ok) {
      lastErr = new Error(`HTTP ${res.status} fetching ${url}`)
      if (res.status >= 500) {
        await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)))
        continue
      }
      throw lastErr
    }

    return Buffer.from(await res.arrayBuffer())
  }
  throw lastErr || new Error(`Failed to download ${url}`)
}

// Space out downloads so upload.wikimedia.org's burst limiter stays quiet.
export function downloadDelay(): Promise<void> {
  const base = Number(process.env.CRAWL_DOWNLOAD_DELAY_MS || '900')
  const jitter = Math.floor(Math.random() * 700)
  return new Promise((r) => setTimeout(r, base + jitter))
}

// ── Validation ─────────────────────────────────────────────────────
export interface ValidationResult {
  valid: boolean
  reason?: string
  width: number
  height: number
  format: string
}

export async function validateImage(buf: Buffer): Promise<ValidationResult> {
  try {
    const meta = await sharp(buf).metadata()
    const { width = 0, height = 0, format = 'unknown' } = meta

    if (width < 400 || height < 400) {
      return { valid: false, reason: 'Image too small (min 400x400)', width, height, format }
    }

    // Check for blurriness using Laplacian variance approximation
    const { data } = await sharp(buf)
      .resize(100, 100, { fit: 'inside' })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true })

    let sum = 0
    let sumSq = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i]
      sumSq += data[i] * data[i]
    }
    const mean = sum / data.length
    const variance = sumSq / data.length - mean * mean
    if (variance < 100) {
      return { valid: false, reason: 'Image appears blurry', width, height, format }
    }

    // Reject if mostly text (check for high edge density in a small region)
    // Simple heuristic: if the image has very low color variance, it might be text/icons
    const { data: colorData } = await sharp(buf)
      .resize(50, 50, { fit: 'inside' })
      .raw()
      .toBuffer({ resolveWithObject: true })

    let colorSum = 0
    for (let i = 0; i < colorData.length; i += 3) {
      colorSum += Math.abs(colorData[i] - colorData[i + 1]) + Math.abs(colorData[i + 1] - colorData[i + 2])
    }
    const avgColorDiff = colorSum / (colorData.length / 3)
    if (avgColorDiff < 5) {
      return { valid: false, reason: 'Image appears to be text/icon (low color variance)', width, height, format }
    }

    return { valid: true, width, height, format }
  } catch (e: any) {
    return { valid: false, reason: `Processing error: ${e.message}`, width: 0, height: 0, format: 'unknown' }
  }
}

// ── dHash (difference hash) for duplicate detection ────────────────
export async function computeDHash(buf: Buffer): Promise<string> {
  try {
    // Resize to 9x8, greyscale, compute difference hash
    const { data } = await sharp(buf)
      .resize(9, 8, { fit: 'fill' })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true })

    let hash = ''
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const left = data[y * 9 + x]
        const right = data[y * 9 + x + 1]
        hash += left > right ? '1' : '0'
      }
    }
    return hash
  } catch {
    return ''
  }
}

export function hammingDistance(a: string, b: string): number {
  if (a.length !== b.length) return Infinity
  let dist = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) dist++
  }
  return dist
}

// ── Optimization (WebP, multiple sizes) ────────────────────────────
export interface OptimizedImages {
  original: Buffer
  large: Buffer
  medium: Buffer
  thumbnail: Buffer
  hash: string
}

export async function optimizeImage(buf: Buffer): Promise<OptimizedImages> {
  const hash = await computeDHash(buf)

  // Downscale huge sources first — the original is also uploaded and 1600px
  // is plenty for display; this keeps WebP encoding fast.
  const meta = await sharp(buf).metadata()
  let source = buf
  if ((meta.width || 0) > 1600 || (meta.height || 0) > 1600) {
    source = await sharp(buf).resize(1600, 1600, { fit: 'inside' }).toBuffer()
  }

  const original = await sharp(source).webp({ quality: 90 }).toBuffer()
  const [large, medium, thumbnail] = await Promise.all([
    sharp(source).resize(800, 800, { fit: 'inside' }).webp({ quality: 85 }).toBuffer(),
    sharp(source).resize(400, 400, { fit: 'inside' }).webp({ quality: 80 }).toBuffer(),
    sharp(source).resize(128, 128, { fit: 'inside' }).webp({ quality: 75 }).toBuffer(),
  ])

  return { original, large, medium, thumbnail, hash }
}

// ── Quality scoring ────────────────────────────────────────────────
export function scoreQuality(width: number, height: number, format: string): number {
  let score = 0
  // Size score (up to 40 points)
  const minDim = Math.min(width, height)
  if (minDim >= 800) score += 40
  else if (minDim >= 600) score += 30
  else if (minDim >= 400) score += 20

  // Format score (up to 20 points)
  if (format === 'jpeg' || format === 'png') score += 20
  else if (format === 'webp') score += 15
  else score += 10

  // Aspect ratio (up to 20 points — prefer 1:1 to 4:3)
  const ratio = width / height
  if (ratio >= 0.8 && ratio <= 1.25) score += 20
  else if (ratio >= 0.6 && ratio <= 1.67) score += 15
  else score += 10

  // Resolution bonus (up to 20 points)
  const totalPixels = width * height
  if (totalPixels >= 640000) score += 20 // >= 800x800
  else if (totalPixels >= 256000) score += 15 // >= 506x506
  else if (totalPixels >= 160000) score += 10 // >= 400x400

  return Math.min(score, 100)
}

// ── MD5 hash for file integrity ────────────────────────────────────
export function md5(buf: Buffer): string {
  return createHash('md5').update(buf).digest('hex')
}
