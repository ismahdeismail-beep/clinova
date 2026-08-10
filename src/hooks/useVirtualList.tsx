import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  height: number;
  itemHeight: number | ((index: number) => number);
  overscan?: number;
  className?: string;
  style?: React.CSSProperties;
  emptyMessage?: string;
  overscanCount?: number;
}

export function VirtualList<T>({
  items,
  renderItem,
  height,
  itemHeight,
  className = '',
  style,
  emptyMessage = 'No items to display',
  overscanCount = 10,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: typeof itemHeight === 'function' ? itemHeight : () => itemHeight,
    overscan: overscanCount,
    getItemKey: (index: number) => index,
    debug: false,
  });

  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];
    return virtualizer.getVirtualItems();
  }, [items.length, virtualizer]);

  if (items.length === 0) {
    return (
      <div
        ref={parentRef}
        className={className}
        style={{ height, ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="text-center text-[var(--text-muted)] py-8">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={className}
      style={{ height, overflow: 'auto', ...style }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {visibleItems.map((virtualRow: VirtualItem) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderItem(items[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

interface WindowedListProps<T> {
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  itemWidth?: number;
  overscan?: number;
}

export function useWindowedList<T>(props: WindowedListProps<T>) {
  const { items, itemHeight, containerHeight, overscan = 5 } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount + overscan * 2);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  }, [items, startIndex, endIndex]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [itemHeight]);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    onScroll: handleScroll,
    scrollToIndex,
    startIndex,
    endIndex,
  };
}

export function WindowedList<T>({
  items,
  renderItem,
  itemHeight = 50,
  containerHeight = 400,
  overscan = 5,
  className = '',
  emptyMessage = 'No items to display',
}: WindowedListProps<T> & { className?: string; emptyMessage?: string }) {
  const { containerRef, totalHeight, onScroll, startIndex } = useWindowedList({
    items,
    itemHeight,
    containerHeight,
    overscan,
  });

  if (items.length === 0) {
    return (
      <div className={`h-[${containerHeight}px] flex items-center justify-center ${className}`}>
        <p className="text-[var(--text-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {items.slice(startIndex, startIndex + Math.ceil(containerHeight / itemHeight) + 10).map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem?.(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function useInfiniteScroll<T>(
  fetchMore: () => Promise<T[]>,
  hasMore: boolean,
  threshold = 100
) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchMore();
    } finally {
      setIsLoading(false);
    }
  }, [fetchMore]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, isLoading, loadMore, threshold]);

  return { sentinelRef, isLoading };
}