# Clinova Medicine Image Crawler

Automated medicine image acquisition system that integrates with the existing Clinova + Kenya Drug Index (KDI).

## Purpose

For every medicine in the Clinova drug database, the system automatically discovers, verifies, downloads, optimizes, stores, and displays representative images of every available dosage form (tablet, capsule, injection, etc.) while respecting copyright and license requirements.

## Architecture

```
packages/crawler/
├── src/
│   ├── crawler/          # Orchestrator + medicine reader + search terms
│   ├── parser/           # Image result parsing (Wikimedia, Open-i, NIH, NCI)
│   ├── provider/         # Abstract Provider interface + concrete implementations
│   ├── license/          # License verification (accepts CC0, CC BY, CC BY-SA, PD)
│   ├── download/         # Image downloader with retry logic
│   ├── validator/        # Image validation (size, blur, watermark, etc.)
│   ├── duplicate/        # Duplicate detection via pHash/dHash
│   ├── optimizer/        # WebP optimization with multiple sizes
│   ├── uploader/         # Cloudinary / Supabase Storage uploader
│   ├── metadata/         # Database metadata storage
│   ├── scheduler/        # Incremental crawl scheduling
│   ├── reporting/        # Crawl report generation
│   ├── api/              # Python API routes
│   └── utils/            # Config, logger, helpers
├── config/
├── scripts/
├── tests/
├── storage/
└── database/
```

## Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install playwright (for dynamic pages)
playwright install chromium

# Set environment variables
cp .env.example .env
# Edit .env with your credentials

# Run the crawler
python -m src.crawler --all
# or
python scripts/run_all.py
```

## Usage

```bash
# Crawl all medicines
python -m src.crawler --all

# Crawl a single drug
python -m src.crawler --drug-id <uuid>

# Dry run (search only, no downloads)
python -m src.crawler --dry-run

# Incremental crawl (only missing drugs)
python -m src.crawler --incremental

# Reset crawl state
python -m src.crawler --reset

# Show statistics
python -m src.crawler --stats
```

## Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `DATABASE_URL` | PostgreSQL database URL |
| `STORAGE_PROVIDER` | `supabase` or `cloudinary` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `MAX_CONCURRENT_DOWNLOADS` | Max concurrent downloads (default: 10) |
| `RETRY_ATTEMPTS` | Max retry attempts (default: 3) |
| `IMAGE_MIN_WIDTH` | Minimum image width in px (default: 400) |
| `IMAGE_MIN_HEIGHT` | Minimum image height in px (default: 400) |
| `MAX_FILE_SIZE_KB` | Maximum file size in KB (default: 200) |
| `INCREMENTAL_ONLY` | Only crawl missing drugs (default: true) |
| `PROVIDERS` | Comma-separated provider list |

## Sources

Supported image providers (pluggable):

- **Wikimedia Commons** - Public domain and CC-licensed content
- **Open-i** - NLM open-access medical images
- **NIH** - National Institutes of Health image database
- **NCI** - National Cancer Institute image database

## License Policy

**Accepted:**
- Public Domain
- CC0
- CC BY
- CC BY-SA

**Rejected:**
- All Rights Reserved
- No License
- Unknown
- Watermarked stock images
- Terms prohibiting redistribution

## Database Schema

```sql
drug_images (
  id, drug_id, generic_name, dosage_form, strength,
  image_url, thumbnail_url, large_url, medium_url,
  source, license, license_url, author, page_url,
  hash, verified, quality_score, rejection_reason,
  created_at, updated_at
)
```

## Reports

Reports are generated as JSON in `reports/crawl-report.json` and include:

- Medicines searched
- Images found/accepted/rejected
- Rejection reasons breakdown
- Duplicates removed
- Processing time
- Storage used
- Coverage percentage

## Testing

```bash
pip install -e ".[dev]"
pytest tests/ --cov=src --cov-report=html
```