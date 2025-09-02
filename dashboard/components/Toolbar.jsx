import { cn } from "../utils/cn";

export default function Toolbar({
  count,
  lastUpdatedAt,
  search,
  setSearch,
  onRefresh,
  isRefreshing,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Machine Health Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Monitoring {count} machine{count === 1 ? "" : "s"}
          {lastUpdatedAt
            ? ` • Last updated ${lastUpdatedAt.toLocaleString()}`
            : ""}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by machine ID..."
          className={cn(
            "h-9 w-56 rounded-md border border-gray-300 bg-white px-3 text-sm",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        />
        <button
          onClick={onRefresh}
          className="h-9 rounded-md bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}
