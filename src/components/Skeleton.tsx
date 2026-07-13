interface SkeletonProps {
  className?: string;
  lines?: number;
  width?: string;
  height?: string;
}

export function Skeleton({ className = '', width = '100%', height = '1rem' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
      <Skeleton height="1.25rem" width="65%" />
      <Skeleton height="0.875rem" width="40%" />
      <Skeleton height="0.875rem" width="80%" />
      <div className="flex gap-2 pt-1">
        <Skeleton height="1.5rem" width="4rem" className="rounded-full" />
        <Skeleton height="1.5rem" width="5rem" className="rounded-full" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton width="2.5rem" height="2.5rem" className="rounded-lg shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton height="1rem" width="55%" />
            <Skeleton height="0.75rem" width="35%" />
          </div>
        </div>
      ))}
    </div>
  );
}
