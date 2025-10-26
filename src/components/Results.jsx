import { useMemo, useRef, useState } from 'react';
import { Volume2, BookOpen } from 'lucide-react';

export default function Results({ data, loading, error }) {
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);

  const entry = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;
    return data[0];
  }, [data]);

  const phonetics = useMemo(() => {
    if (!entry?.phonetics) return [];
    return entry.phonetics.filter(Boolean);
  }, [entry]);

  const meanings = entry?.meanings || [];

  const playAudio = (url) => {
    if (!url) return;
    try {
      setAudioUrl(url);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    } catch {}
  };

  if (loading) return null;

  return (
    <div className="mt-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3">{error}</div>
      ) : null}

      {!error && !entry ? (
        <div className="text-neutral-500 text-sm">Search for a word to see definitions.</div>
      ) : null}

      {entry ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">{entry.word}</h2>
              {entry.phonetic ? (
                <p className="text-neutral-500">{entry.phonetic}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {phonetics
                .filter((p) => p.audio)
                .slice(0, 3)
                .map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => playAudio(p.audio)}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <Volume2 className="h-4 w-4" />
                    {p.text || 'Pronounce'}
                  </button>
                ))}
              <audio ref={audioRef} src={audioUrl} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meanings.map((m, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-neutral-900 text-white">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-neutral-900">{m.partOfSpeech}</h3>
                </div>
                <ul className="space-y-3 list-disc list-inside">
                  {m.definitions.slice(0, 5).map((d, idx) => (
                    <li key={idx} className="text-neutral-800 leading-relaxed">
                      {d.definition}
                      {d.example ? (
                        <p className="text-neutral-500 text-sm mt-1">“{d.example}”</p>
                      ) : null}
                      {d.synonyms && d.synonyms.length ? (
                        <p className="text-neutral-500 text-xs mt-1">Synonyms: {d.synonyms.slice(0, 5).join(', ')}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {entry.sourceUrls && entry.sourceUrls.length ? (
            <div className="text-sm text-neutral-500">
              Source: {entry.sourceUrls.map((u, i) => (
                <a key={u + i} href={u} target="_blank" rel="noreferrer" className="underline hover:text-neutral-700 mr-2">
                  {new URL(u).hostname}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
