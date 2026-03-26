export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square rounded-2xl bg-gray-200" />

      {/* Info Skeleton */}
      <div className="flex flex-col gap-5">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2 border-t pt-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="h-12 bg-gray-200 rounded-2xl w-full mt-4" />
      </div>
    </div>
  );
}