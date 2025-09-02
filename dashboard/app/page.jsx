"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Toolbar from "../components/Toolbar";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ReportsCards from "../components/ReportsCards";
import ReportsTable from "../components/ReportsTable";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
};

export default function Home() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    "https://system-health-monitor-10b6.onrender.com/reports/latest",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    const sorted = [...data].sort(
      (a, b) =>
        new Date(b.latest.timestamp).getTime() -
        new Date(a.latest.timestamp).getTime()
    );
    if (!q) return sorted;
    return sorted.filter((r) => r.latest.machineId.toLowerCase().includes(q));
  }, [data, search]);

  const lastUpdatedAt = useMemo(() => {
    if (!data || data.length === 0) return undefined;
    const newest = data.reduce((acc, cur) =>
      new Date(cur.latest.timestamp) > new Date(acc.latest.timestamp)
        ? cur
        : acc
    );
    return new Date(newest.latest.timestamp);
  }, [data]);

  return (
    <main className="font-sans">
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Toolbar
          count={data?.length ?? 0}
          lastUpdatedAt={lastUpdatedAt}
          search={search}
          setSearch={setSearch}
          onRefresh={() => mutate()}
          isRefreshing={isValidating}
        />

        <div className="mt-6 space-y-6">
          {isLoading && <LoadingSkeleton />}
          {error && !isLoading && <ErrorState onRetry={() => mutate()} />}
          {!isLoading && !error && filtered.length === 0 && <EmptyState />}
          {!isLoading && !error && filtered.length > 0 && (
            <>
              <ReportsCards reports={filtered} />
              <ReportsTable reports={filtered} />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
