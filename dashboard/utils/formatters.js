export function percentToNumber(value) {
  if (typeof value === "number") return value;
  const num = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(num) ? num : 0;
}

export function formatUptime(value) {
  const seconds =
    typeof value === "number" ? value : Number.parseFloat(String(value)) || 0;

  if (seconds < 60) return `${Math.floor(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${Math.floor(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours < 24) return `${hours}h ${mins}m`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}
