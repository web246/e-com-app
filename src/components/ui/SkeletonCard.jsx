export function SkeletonCard() {
  return (
    <div className="linet-card overflow-hidden">
      <div className="aspect-square shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-3 shimmer rounded-full w-3/4" />
        <div className="h-3 shimmer rounded-full w-1/2" />
        <div className="h-4 shimmer rounded-full w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonBanner() {
  return <div className="w-full aspect-[16/7] rounded-3xl shimmer" />;
}

export function SkeletonText({ className = '' }) {
  return <div className={`h-4 shimmer rounded-full ${className}`} />;
}
