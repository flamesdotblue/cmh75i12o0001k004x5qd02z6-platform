import { Trash2, History as HistoryIcon } from 'lucide-react';

export default function History({ items, onSelect, onClear }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white/70 backdrop-blur rounded-2xl border border-neutral-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-neutral-800 font-medium">
          <HistoryIcon className="h-4 w-4" /> Recent searches
        </div>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800"
        >
          <Trash2 className="h-4 w-4" /> Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((h) => (
          <button
            key={h.term + h.at}
            onClick={() => onSelect(h.term)}
            className="px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 text-sm"
          >
            {h.term}
          </button>
        ))}
      </div>
    </div>
  );
}
