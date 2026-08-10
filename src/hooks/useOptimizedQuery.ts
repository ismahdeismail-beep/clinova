import { useCallback, useRef, useState, useEffect } from 'react';

interface QueryOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
  retry?: number;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  select?: (data: T) => T;
}

interface QueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  refetch: () => Promise<T | undefined>;
  invalidate: () => void;
}

const queryCache = new Map<string, { 
  data: any; 
  timestamp: number; 
  staleTime: number;
  subscribers: Set<() => void>;
  promise: Promise<any> | null;
}>();

const pendingQueries = new Map<string, Promise<any>>();

function generateKey(queryKey: string[]): string {
  return queryKey.join(':');
}

export function useOptimizedQuery<T>(options: QueryOptions<T>): QueryResult<T> {
  const {
    queryKey,
    queryFn,
    staleTime = 30000,
    enabled = true,
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    refetchOnWindowFocus = true,
    refetchInterval,
    select,
  } = options;

  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const setCache = useCallback((data: any, timestamp: number) => {
    const key = generateKey(queryKey);
    const existing = queryCache.get(key) || { 
      data: undefined, 
      timestamp: 0, 
      staleTime: 30000, 
      subscribers: new Set(),
      promise: null
    };
    queryCache.set(key, {
      ...existing,
      data,
      timestamp,
      staleTime: 30000,
    });
  }, [queryKey]);

  const fetchData = useCallback(async (isRetry = false): Promise<T | undefined> => {
    if (!enabled) return undefined;
    
    const key = generateKey(queryKey);
    
    if (!isRetry) {
      setIsLoading(true);
    }
    setIsFetching(true);
    setError(null);

    const cacheEntry = queryCache.get(key);
    const isStale = !cacheEntry || Date.now() - cacheEntry.timestamp > staleTime;

    if (!isStale && cacheEntry?.data !== undefined) {
      const cachedData = cacheEntry.data;
      const finalData = select ? select(cachedData) : cachedData;
      if (mountedRef.current) {
        setData(finalData);
        setIsLoading(false);
        setIsFetching(false);
        onSuccess?.(cachedData);
      }
      return finalData;
    }

    const pendingPromise = pendingQueries.get(key);
    if (pendingPromise && !isRetry) {
      try {
        const result = await pendingPromise;
        const finalData = select ? select(result) : result;
        if (mountedRef.current) {
          setData(finalData);
          setIsLoading(false);
          setIsFetching(false);
          onSuccess?.(result);
        }
        return finalData;
      } catch {
        // Continue to fetch
      }
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const promise = (async () => {
      let lastError: Error | null = null;
      for (let attempt = 0; attempt <= retry; attempt++) {
        try {
          retryCountRef.current = attempt;
          const result = await queryFn();
          const finalData = select ? select(result) : result;
          
          if (mountedRef.current) {
            setData(finalData);
            setIsLoading(false);
            setIsFetching(false);
            setError(null);
            setCache(result, Date.now());
            onSuccess?.(result);
          }
          
          return result;
        } catch (err) {
          lastError = err as Error;
          if (attempt < retry) {
            await new Promise(r => setTimeout(r, retryDelay * (attempt + 1)));
          }
        }
      }
      throw lastError;
    })();

    pendingQueries.set(key, promise);

    try {
      const result = await promise;
      pendingQueries.delete(key);
      return select ? select(result) : result;
    } catch (err) {
      pendingQueries.delete(key);
      const error = err as Error;
      if (mountedRef.current) {
        setError(error);
        setIsLoading(false);
        setIsFetching(false);
        onError?.(error);
      }
      throw error;
    }
  }, [enabled, queryKey, queryFn, staleTime, retry, retryDelay, select, onSuccess, onError, setCache]);

  const refetch = useCallback(async () => {
    const key = generateKey(queryKey);
    queryCache.delete(key);
    return await fetchData(true);
  }, [queryKey, fetchData]);

  const invalidate = useCallback(() => {
    const key = generateKey(queryKey);
    queryCache.delete(key);
    fetchData(true);
  }, [queryKey, fetchData]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  useEffect(() => {
    if (refetchInterval && enabled) {
      const interval = setInterval(() => {
        if (mountedRef.current) {
          fetchData(true);
        }
      }, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [refetchInterval, enabled, fetchData]);

  useEffect(() => {
    if (!refetchOnWindowFocus) return;
    const handleFocus = () => {
      if (mountedRef.current) {
        const cacheEntry = queryCache.get(generateKey(queryKey));
        if (cacheEntry && Date.now() - cacheEntry.timestamp > staleTime) {
          fetchData(true);
        }
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, queryKey, staleTime, fetchData]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const finalData = select && data !== undefined ? select(data) : data;

  return {
    data: finalData,
    error,
    isLoading,
    isError: !!error,
    isSuccess: !error && !isLoading && data !== undefined,
    isFetching,
    refetch,
    invalidate,
  };
}

export function invalidateQueries(queryKey: string[]) {
  const key = queryKey.join(':');
  queryCache.delete(key);
}

export function setQueryData<T>(queryKey: string[], data: T) {
  const key = queryKey.join(':');
  queryCache.set(key, {
    data,
    timestamp: Date.now(),
    staleTime: 30000,
    subscribers: new Set(),
    promise: null,
  });
}

export function getQueryData<T>(queryKey: string[]): T | undefined {
  const key = queryKey.join(':');
  return queryCache.get(key)?.data;
}