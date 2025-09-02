import ProgressBar from "./ProgressBar";
import MachineBadge from "./MachineBadge";
import { percentToNumber, formatUptime } from "../utils/formatters";
import { cn } from "../utils/cn";

export default function ReportsTable({ reports }) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border bg-white lg:block">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Machine",
              "OS",
              "CPU",
              "Memory",
              "Disk",
              "Uptime",
              "Timestamp",
            ].map((h) => (
              <th
                key={h}
                scope="col"
                className="sticky top-0 z-[1] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((r, idx) => {
            const cpu = percentToNumber(r.latest.checks.cpuUsage);
            const mem = percentToNumber(r.latest.checks.memoryUsage);
            const disk = percentToNumber(r.latest.checks.diskUsage);
            const ts = new Date(r.latest.timestamp);

            return (
              <tr
                key={r._id}
                className={cn(
                  "border-t border-gray-200",
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                )}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {r.latest.machineId}
                </td>
                <td className="px-4 py-3">
                  <MachineBadge os={r.latest.os} />
                </td>
                <td className="px-4 py-3">
                  <ProgressBar value={cpu} label="CPU" />
                </td>
                <td className="px-4 py-3">
                  <ProgressBar value={mem} label="Memory" />
                </td>
                <td className="px-4 py-3">
                  <ProgressBar value={disk} label="Disk" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {formatUptime(r.latest.checks.uptime)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {ts.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
