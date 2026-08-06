import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, ImageOff, WifiOff } from 'lucide-react';
import {
  cacheDrugImages,
  cleanupImageCache,
  getCachedDrugImages,
  getCachedDrugImagesByGeneric,
  type CachedDrugImage,
} from '../lib/localDb';
import { DrugIcon } from './DrugIcon';

interface DrugImage {
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
  author: string;
  page_url: string;
  verified: boolean;
  quality_score: number;
  blobUrl?: string;
  fullBlobUrl?: string;
  fromCache?: boolean;
}

interface MedicineImageGalleryProps {
  drugId: string;
  genericName: string;
  dosageForms?: string[];
}

function toBlobUrl(blob: Blob | undefined): string | undefined {
  if (!blob) return undefined;
  try {
    return URL.createObjectURL(blob);
  } catch {
    return undefined;
  }
}

export function MedicineImageGallery({ drugId, genericName, dosageForms }: MedicineImageGalleryProps) {
  const [images, setImages] = useState<DrugImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<DrugImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const blobUrlsRef = useRef<string[]>([]);

  // Reset broken-image markers whenever a new image set arrives.
  useEffect(() => {
    setFailedIds(new Set());
  }, [images]);

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current = [];
    };
  }, []);

  const fromCache = useCallback((cached: CachedDrugImage[]): DrugImage[] => {
    const created: string[] = [];
    const mapped: DrugImage[] = cached.map((img) => {
      const thumbUrl = toBlobUrl(img.thumbBlob);
      const fullUrl = toBlobUrl(img.fullBlob);
      if (thumbUrl) created.push(thumbUrl);
      if (fullUrl) created.push(fullUrl);
      return {
        id: img.id,
        drug_id: img.drugId,
        generic_name: img.genericName,
        dosage_form: img.dosageForm,
        strength: img.strength,
        image_url: img.imageUrl,
        thumbnail_url: img.thumbnailUrl,
        large_url: img.largeUrl,
        medium_url: img.mediumUrl,
        source: img.source,
        license: img.license,
        author: img.author,
        page_url: img.pageUrl,
        verified: false,
        quality_score: 0,
        blobUrl: thumbUrl || img.thumbnailUrl,
        fullBlobUrl: fullUrl,
        fromCache: true,
      };
    });
    blobUrlsRef.current = created;
    return mapped;
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      const online = navigator.onLine !== false;
      let results: DrugImage[] = [];
      let apiError = false;

      if (online) {
        try {
          if (drugId) {
            const res = await fetch(`/api/drugs/${drugId}/images`);
            const data = await res.json();
            if (data.ok) results = data.data || [];
            else apiError = true;
          } else if (genericName) {
            const res = await fetch(`/api/images/search?q=${encodeURIComponent(genericName)}`);
            const data = await res.json();
            if (data.ok) results = data.data || [];
            else apiError = true;
          }
        } catch (err) {
          console.warn('Failed to fetch drug images from API:', err);
          apiError = true;
        }
      }

      if (results.length > 0) {
        setImages(results);
        setOfflineMode(false);
        // Auto-cache viewed images so they are available offline later.
        const cacheKey = drugId || results[0]?.drug_id || '';
        if (cacheKey) {
          cacheDrugImages(cacheKey, results, false)
            .then(() => cleanupImageCache(400))
            .catch(() => {});
        }
        return;
      }

      if (!online || apiError) {
        // Offline / API unreachable: fall back to the local IndexedDB blob cache.
        const cached = drugId
          ? await getCachedDrugImages(drugId)
          : await getCachedDrugImagesByGeneric(genericName);
        if (cached.length > 0) {
          setImages(fromCache(cached));
          setOfflineMode(true);
          return;
        }
      }

      setImages([]);
    } catch (err) {
      console.error('Failed to load drug images:', err);
      try {
        const cached = drugId
          ? await getCachedDrugImages(drugId)
          : await getCachedDrugImagesByGeneric(genericName);
        if (cached.length > 0) {
          setImages(fromCache(cached));
          setOfflineMode(true);
        }
      } catch {
        setImages([]);
      }
    } finally {
      setLoading(false);
    }
  }, [drugId, genericName, fromCache]);

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [fetchImages]);

  const groupedByForm = React.useMemo(() => {
    const groups: Record<string, DrugImage[]> = {};
    for (const img of images) {
      const form = img.dosage_form || 'unknown';
      if (!groups[form]) groups[form] = [];
      groups[form].push(img);
    }
    return groups;
  }, [images]);

  const tabs = activeTab ? [activeTab] : Object.keys(groupedByForm);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-3">
          <DrugIcon name={genericName || 'Drug'} size="lg" />
        </div>
        <ImageOff className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-[var(--text)] mb-1">No Images Available</h3>
        <p className="text-sm text-[var(--text-muted)]">
          No licensed images found for {genericName}. Administrators can upload verified images.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-[var(--text)]">Image Gallery</h2>
          {offlineMode && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--info-container)] text-[var(--info)] border border-[var(--info)]/30">
              <WifiOff size={11} />
              Offline
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--text-muted)]">{images.length} image{images.length !== 1 ? 's' : ''}</span>
      </div>

      {dosageForms && dosageForms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === null
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]'
            }`}
          >
            All
          </button>
          {dosageForms.map((form) => (
            <button
              key={form}
              onClick={() => setActiveTab(form)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                activeTab === form
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]'
              }`}
            >
              {form}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => { setSelectedImage(img); setLightboxOpen(true); }}
            className="group relative aspect-square bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--primary)] transition-all cursor-pointer"
          >
            {(img.blobUrl || img.thumbnail_url) && !failedIds.has(img.id) ? (
              <img
                src={img.blobUrl || img.thumbnail_url}
                alt={`${img.generic_name} ${img.dosage_form}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={() => setFailedIds(prev => new Set(prev).add(img.id))}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--surface-dim)]">
                <ImageOff className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-xs font-medium truncate">{img.dosage_form}</p>
              <p className="text-white/70 text-[10px]">{img.source}</p>
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 rounded-full p-2 cursor-pointer"
          >
            ✕
          </button>
          <img
            src={selectedImage.fullBlobUrl || selectedImage.image_url || selectedImage.large_url || selectedImage.thumbnail_url || selectedImage.blobUrl}
            alt={`${selectedImage.generic_name} ${selectedImage.dosage_form}`}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{selectedImage.generic_name}</p>
                <p className="text-xs text-white/70">{selectedImage.dosage_form} {selectedImage.strength}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded">{selectedImage.source}</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded">{selectedImage.license}</span>
              </div>
            </div>
            {selectedImage.author && (
              <p className="text-xs text-white/50 mt-2">Photo by {selectedImage.author}</p>
            )}
            {selectedImage.page_url && (
              <a
                href={selectedImage.page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--primary)] underline mt-1 block"
                onClick={(e) => e.stopPropagation()}
              >
                View Source
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
