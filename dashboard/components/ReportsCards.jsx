import ProgressBar from "./ProgressBar";
import MachineBadge from "./MachineBadge";
import { percentToNumber, formatUptime } from "../utils/formatters";
import { cn } from "../utils/cn";

export default function ReportsCards({ reports }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
      {reports.map((r) => {
        const cpu = percentToNumber(r.latest.checks.cpuUsage);
        const mem = percentToNumber(r.latest.checks.memoryUsage);
        const disk = percentToNumber(r.latest.checks.diskUsage);
        const ts = new Date(r.latest.timestamp);

        return (
          <article
            key={r._id}
            className={cn(
              "rounded-lg border bg-white p-4",
              cpu >= 85 || mem >= 85 || disk >= 90
                ? "ring-1 ring-amber-500/40"
                : "ring-1 ring-blue-500/10"
            )}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {r.latest.machineId}
                </h3>
                <p className="text-xs text-gray-600">{ts.toLocaleString()}</p>
              </div>
              <MachineBadge os={r.latest.os} />
            </div>

            <div className="space-y-3">
              <ProgressBar value={cpu} label="CPU" />
              <ProgressBar value={mem} label="Memory" />
              <ProgressBar value={disk} label="Disk" />
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Uptime</span>
                <span className="font-medium">
                  {formatUptime(r.latest.checks.uptime)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
