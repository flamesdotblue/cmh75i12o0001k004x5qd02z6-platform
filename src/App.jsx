import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import History from './components/History';
import { fetchDefinition } from './lib/dictionary';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('dict_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dict_history', JSON.stringify(history.slice(0, 15)));
    } catch {}
  }, [history]);

  const lastSearched = useMemo(() => (history[0] ? history[0].term : ''), [history]);

  const onSearch = async (term) => {
    if (!term) return;
    setQuery(term);
    setError('');
    setLoading(true);
    setData(null);
    try {
      const res = await fetchDefinition(term);
      setData(res);
      setHistory((prev) => {
        const filtered = prev.filter((h) => h.term.toLowerCase() !== term.toLowerCase());
        return [{ term, at: Date.now() }, ...filtered].slice(0, 15);
      });
    } catch (e) {
      setError(e.message || 'Failed to fetch definition');
    } finally {
      setLoading(false);
    }
  };

  const onHistorySelect = (term) => {
    onSearch(term);
  };

  const onClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Hero lastSearched={lastSearched} onSearch={onSearch} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-neutral-200">
          <div className="p-6 sm:p-8">
            <SearchBar onSearch={onSearch} loading={loading} />
            <Results data={data} loading={loading} error={error} />
          </div>
        </div>

        <div className="mt-8">
          <History items={history} onSelect={onHistorySelect} onClear={onClearHistory} />
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <div className="max-w-5xl mx-auto px-4">
          Powered by Free Dictionary API · Built with React + Tailwind
        </div>
      </footer>
    </div>
  );
}
