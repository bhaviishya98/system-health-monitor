export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-7 w-64 animate-pulse rounded bg-gray-200" />
      <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-2 w-full animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-2 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-2 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
