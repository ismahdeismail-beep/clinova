import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useOptimizedQuery, invalidateQueries, setQueryData } from './useOptimizedQuery';

interface CacheConfig {
  defaultCacheTime: number;
  defaultStaleTime: number;
  maxCacheSize: number;
}

const defaultConfig: CacheConfig = {
  defaultCacheTime: 5 * 60 * 1000,
  defaultStaleTime: 30 * 1000,
  maxCacheSize: 1000,
};

const cache = new Map<string, { data: any; timestamp: number; subscribers: Set<() => void> }>();
const pendingRequests = new Map<string, Promise<any>>();

interface CacheContextValue {
  config: CacheConfig;
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, ttl?: number) => void;
  delete: (key: string) => void;
  clear: () => void;
  subscribe: (key: string, callback: () => void) => () => void;
}

const CacheContext = createContext<CacheContextValue | null>(null);

function emitChange(key: string) {
  const entry = cache.get(key);
  if (entry) {
    entry.subscribers.forEach(cb => cb());
  }
}

export function CacheProvider({ children, config = defaultConfig }: { children: ReactNode; config?: Partial<CacheConfig> }) {
  const mergedConfig = { ...defaultConfig, ...config };

  const get = useCallback(<T>(key: string): T | null => {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.timestamp < (config?.defaultCacheTime || defaultConfig.defaultCacheTime)) {
      return entry.data;
    }
    return null;
  }, []);

  const set = useCallback(<T>(key: string, data: T, ttl?: number) => {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      subscribers: new Set(),
    });
    emitChange(key);
  }, []);

  const deleteKey = useCallback((key: string) => {
    cache.delete(key);
  }, []);

  const clear = useCallback(() => {
    cache.clear();
  }, []);

  const subscribe = useCallback((key: string, callback: () => void) => {
    let entry = cache.get(key);
    if (!entry) {
      entry = { data: null, timestamp: 0, subscribers: new Set() };
      cache.set(key, entry);
    }
    entry.subscribers.add(callback);
    return () => {
      entry.subscribers.delete(callback);
    };
  }, []);

  return (
    <CacheContext.Provider value={{ config: mergedConfig, get, set, delete: deleteKey, clear, subscribe }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
}

export function useCachedQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { ttl?: number; enabled?: boolean; onSuccess?: (data: T) => void; onError?: (error: Error) => void }
) {
  const cache = useCache();
  const [data, setData] = useState<T | null>(() => cache.get<T>(key));
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!options?.enabled) return;
    setIsLoading(true);
    try {
      const result = await fetcher();
      cache.set(key, result);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, options]);

  useEffect(() => {
    if (options?.enabled !== false && !data) {
      fetch();
    }
  }, [fetch, options?.enabled, data]);

  return { data, error, isLoading, refetch: fetch };
}

export function useCacheInvalidation(keys: string[]) {
  const cache = useCache();
  return useCallback(() => {
    keys.forEach(key => cache.delete(key));
  }, [keys, cache]);
}

export function useCacheSubscription(key: string) {
  const cache = useCache();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = cache.subscribe(key, () => {
      forceUpdate(prev => ({ ...prev }));
    });
    return unsubscribe;
  }, [key, cache]);

  return cache.get(key);
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useThrottle<T>(value: T, limit: number): T {
  const [throttled, setThrottled] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastRan.current >= limit) {
      setThrottled(value);
      lastRan.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottled(value);
        lastRan.current = Date.now();
      }, limit - (now - lastRan.current));
      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttled;
}