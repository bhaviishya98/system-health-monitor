import { cn } from "../utils/cn";

export default function MachineBadge({ os }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        "border-blue-200 bg-blue-50 text-blue-700"
      )}
    >
      {os}
    </span>
  );
}
