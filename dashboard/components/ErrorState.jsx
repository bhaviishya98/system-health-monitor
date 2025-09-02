export default function ErrorState({ onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-800"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm">
          Unable to load reports right now. Please try again in a moment.
        </p>
        <button
          onClick={onRetry}
          className="rounded-md border border-amber-300 bg-white px-3 py-1 text-sm font-medium text-amber-800 hover:bg-amber-100"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
