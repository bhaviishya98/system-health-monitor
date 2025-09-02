import { percentToNumber } from "../utils/formatters";
import { cn } from "../utils/cn";

function getSeverityClass(value) {
  const n = percentToNumber(value);
  if (n >= 85) return "ring-1 ring-amber-500/50";
  if (n >= 70) return "ring-1 ring-amber-500/30";
  return "ring-1 ring-blue-500/20";
}

export default function ProgressBar({ value, label, className }) {
  const n = Math.max(0, Math.min(100, percentToNumber(value)));
  const severity = getSeverityClass(n);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span aria-hidden className="font-medium text-gray-700">
          {label}
        </span>
        <span className="tabular-nums">{Math.round(n)}%</span>
      </div>
      <div
        className={cn(
          "h-2 w-full rounded-full bg-gray-200",
          "overflow-hidden",
          severity
        )}
        role="progressbar"
        aria-valuenow={Math.round(n)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full bg-blue-600 transition-[width] duration-500 ease-out"
          style={{ width: `${n}%` }}
        />
      </div>
    </div>
  );
}
