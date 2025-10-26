import { useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, loading }) {
  const [term, setTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    onSearch(q);
  };

  return (
    <form onSubmit={submit} className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-neutral-900/5 px-3 sm:px-4 py-2">
        <Search className="h-5 w-5 text-neutral-500" />
        <input
          ref={inputRef}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search a word (Press ⌘/Ctrl + K)"
          className="w-full bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? 'Searching' : 'Search'}
        </button>
      </div>
    </form>
  );
}
