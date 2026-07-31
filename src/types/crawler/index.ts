export interface DrugImage {
  id: string;
  drug_id: string;
  generic_name: string;
  dosage_form: string;
  strength: string;
  image_url: string;
  thumbnail_url: string;
  large_url: string;
  medium_url: string;
  source: string;
  license: string;
  license_url: string;
  author: string;
  page_url: string;
  hash: string;
  verified: boolean;
  quality_score: number;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
}

export interface CrawlStatistics {
  total_images: number;
  verified_images: number;
  rejected_images: number;
  unique_drugs: number;
  by_source: Record<string, number>;
}

export interface CrawlReport {
  timestamp: string;
  summary: {
    medicines_searched: number;
    images_found: number;
    images_accepted: number;
    images_rejected: number;
    duplicates_removed: number;
    processing_time_seconds: number;
    coverage_percentage: number;
    storage_used_mb: number;
  };
  rejection_reasons: Record<string, number>;
  failures: string[];
}

export interface CrawlStatus {
  last_crawl: string | null;
  run_count: number;
  crawled_count: number;
  failed_count: number;
  pending_count: number;
}