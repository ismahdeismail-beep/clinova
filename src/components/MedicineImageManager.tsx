import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, RefreshCw, Trash2, Check, X,
  ImageOff, Download,
  Database, AlertTriangle, Clock, FolderOpen,
} from 'lucide-react';

interface DrugImageRecord {
  id: string;
  drug_id: string;
  generic_name: string;
  dosage_form: string;
  strength: string;
  image_url: string;
  thumbnail_url: string;
  source: string;
  license: string;
  author: string;
  page_url: string;
  hash: string;
  verified: boolean;
  quality_score: number;
  rejection_reason: string;
  created_at: string;
}

export function MedicineImageManager() {
  const [images, setImages] = useState<DrugImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [missingDrugs, setMissingDrugs] = useState<string[]>([]);
  const [scheduleStatus, setScheduleStatus] = useState<any>(null);
  const [crawling, setCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState('');

  const fetchImages = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (sourceFilter) params.set('source', sourceFilter);
      if (licenseFilter) params.set('license', licenseFilter);

      const res = await fetch(`/api/images/search?${params.toString()}`);
      const data = await res.json();
      if (data.ok) setImages(data.data || []);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sourceFilter, licenseFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/images/stats');
      const data = await res.json();
      if (data.ok) setStats(data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const fetchMissing = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/images/missing');
      const data = await res.json();
      if (data.ok) setMissingDrugs(data.data || []);
    } catch (err) {
      console.error('Failed to fetch missing drugs:', err);
    }
  }, []);

  const fetchSchedule = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/images/schedule');
      const data = await res.json();
      if (data.ok) setScheduleStatus(data.data);
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    }
  }, []);

  useEffect(() => {
    fetchImages();
    fetchStats();
    fetchMissing();
    fetchSchedule();
  }, [fetchImages, fetchStats, fetchMissing, fetchSchedule]);

  const handleCrawlAll = async () => {
    setCrawling(true);
    setCrawlProgress('Starting full crawl...');
    try {
      const res = await fetch('/api/admin/images/crawl', { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        setCrawlProgress('Crawl complete');
        fetchImages();
        fetchStats();
        fetchMissing();
      }
    } catch {
      setCrawlProgress('Crawl failed');
    } finally {
      setCrawling(false);
    }
  };

  const handleCrawlMissing = async () => {
    setCrawling(true);
    setCrawlProgress(`Crawling ${missingDrugs.length} missing drugs...`);
    try {
      const res = await fetch('/api/admin/images/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drug_ids: missingDrugs }),
      });
      const data = await res.json();
      if (data.ok) {
        setCrawlProgress('Refresh complete');
        fetchImages();
        fetchStats();
        fetchMissing();
      }
    } catch {
      setCrawlProgress('Refresh failed');
    } finally {
      setCrawling(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image record?')) return;
    try {
      await fetch(`/api/admin/images/${id}`, { method: 'DELETE' });
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/admin/images/${id}/verify`, { method: 'POST' });
      setImages(images.map((img) => (img.id === id ? { ...img, verified: true } : img)));
    } catch (err) {
      console.error('Failed to approve:', err);
    }
  };

  const handleReindex = async () => {
    try {
      await fetch('/api/admin/images/reindex', { method: 'POST' });
      fetchStats();
    } catch (err) {
      console.error('Failed to reindex:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text)]">Medicine Image Manager</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleReindex} className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer">
            Reindex
          </button>
          <button onClick={fetchImages} className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer">
            Refresh
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <Database size={14} /> Total Images
            </div>
            <p className="text-2xl font-bold text-[var(--text)]">{stats.total_images || 0}</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <Check size={14} /> Verified
            </div>
            <p className="text-2xl font-bold text-[var(--success)]">{stats.verified_images || 0}</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <X size={14} /> Rejected
            </div>
            <p className="text-2xl font-bold text-[var(--destructive)]">{stats.rejected_images || 0}</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <FolderOpen size={14} /> Drugs Covered
            </div>
            <p className="text-2xl font-bold text-[var(--text)]">{stats.unique_drugs || 0}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </div>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none"
        >
          <option value="">All Sources</option>
          <option value="wikimedia">Wikimedia</option>
          <option value="openi">Open-i</option>
          <option value="nih">NIH</option>
          <option value="nci">NCI</option>
        </select>
        <select
          value={licenseFilter}
          onChange={(e) => setLicenseFilter(e.target.value)}
          className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none"
        >
          <option value="">All Licenses</option>
          <option value="cc0">CC0</option>
          <option value="cc-by">CC BY</option>
          <option value="cc-by-sa">CC BY-SA</option>
        </select>
      </div>

      {missingDrugs.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Missing Images ({missingDrugs.length})
            </h3>
            <button
              onClick={handleCrawlMissing}
              disabled={crawling}
              className="px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-xs font-semibold hover:opacity-90 cursor-pointer disabled:opacity-50"
            >
              {crawling ? 'Crawling...' : 'Crawl Missing'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {missingDrugs.slice(0, 50).map((drug) => (
              <span key={drug} className="px-2 py-0.5 bg-[var(--surface-dim)] rounded text-xs text-[var(--text-muted)]">
                {drug}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleCrawlAll}
          disabled={crawling}
          className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw size={14} className={crawling ? 'animate-spin' : ''} />
          {crawling ? 'Crawling...' : 'Crawl All Medicines'}
        </button>
        {crawlProgress && (
          <span className="text-xs text-[var(--text-muted)]">{crawlProgress}</span>
        )}
      </div>

      {scheduleStatus && (
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><Clock size={12} /> Last crawl: {scheduleStatus.last_crawl || 'Never'}</span>
          <span className="flex items-center gap-1"><RefreshCw size={12} /> Runs: {scheduleStatus.run_count || 0}</span>
          <span>Pending: {scheduleStatus.pending_count || 0}</span>
        </div>
      )}

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">Medicine</th>
                <th className="text-left p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">Form</th>
                <th className="text-left p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">Source</th>
                <th className="text-left p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">License</th>
                <th className="text-left p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">Status</th>
                <th className="text-right p-3 text-[var(--text-muted)] font-semibold text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    <ImageOff size={32} className="mx-auto mb-2" />
                    No images found
                  </td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-dim)]/50">
                    <td className="p-3">
                      <div className="font-medium text-[var(--text)]">{img.generic_name}</div>
                      {img.strength && <div className="text-xs text-[var(--text-muted)]">{img.strength}</div>}
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">{img.dosage_form}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-[var(--surface-dim)] rounded text-xs">{img.source}</span>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">{img.license || '—'}</td>
                    <td className="p-3">
                      {img.verified ? (
                        <span className="flex items-center gap-1 text-[var(--success)] text-xs"><Check size={12} /> Verified</span>
                      ) : img.rejection_reason ? (
                        <span className="flex items-center gap-1 text-[var(--destructive)] text-xs"><X size={12} /> Rejected</span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-500 text-xs"><Clock size={12} /> Pending</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {img.image_url && (
                          <a href={img.image_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-[var(--surface-dim)] rounded cursor-pointer">
                            <Download size={14} className="text-[var(--text-muted)]" />
                          </a>
                        )}
                        {!img.verified && (
                          <button onClick={() => handleApprove(img.id)} className="p-1 hover:bg-[var(--surface-dim)] rounded cursor-pointer" title="Approve">
                            <Check size={14} className="text-[var(--success)]" />
                          </button>
                        )}
                        <button onClick={() => handleDelete(img.id)} className="p-1 hover:bg-[var(--surface-dim)] rounded cursor-pointer" title="Delete">
                          <Trash2 size={14} className="text-[var(--destructive)]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}