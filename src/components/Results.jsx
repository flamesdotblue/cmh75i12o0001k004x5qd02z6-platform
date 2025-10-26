function Section({ title, children }) {
  return (
    <div className="section">
      <div className="section-title">{title}</div>
      <div className="section-body">{children}</div>
    </div>
  )
}

function Pill({ children, onClick }) {
  return (
    <button onClick={onClick} className="pill">{children}</button>
  )
}

export default function Results({ status, error, result, onPick }) {
  if (status === 'idle') {
    return <div className="muted">Search for a word to get started.</div>
  }

  if (status === 'loading') {
    return (
      <div className="skeleton">
        <div className="sk-line w-40" />
        <div className="sk-line w-60" />
        <div className="sk-block" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="alert alert-error">
        <div className="alert-title">No results</div>
        <div className="alert-text">{error || 'Try a different word.'}</div>
      </div>
    )
  }

  if (!result) return null

  const title = result.word
  const phonetics = result.phonetics || []
  const audioUrl = phonetics.find(p => p.audio)?.audio
  const meanings = result.meanings || []

  return (
    <div className="results">
      <div className="results-head">
        <div>
          <h2 className="word">{title}</h2>
          {phonetics.some(p => p.text) && (
            <div className="phonetics">
              {phonetics.filter(p => p.text).map((p, i) => (
                <span key={i} className="phonetic">{p.text}</span>
              ))}
            </div>
          )}
        </div>
        {audioUrl && (
          <button className="btn btn-dark" onClick={() => new Audio(audioUrl).play()} title="Play pronunciation">Listen</button>
        )}
      </div>

      {meanings.map((m, idx) => (
        <div key={idx} className="meaning">
          <div className="pos">{m.partOfSpeech}</div>

          <Section title="Definitions">
            {(m.definitions || []).map((d, i) => (
              <div key={i} className="card">
                <div className="card-title">{d.definition}</div>
                {d.example && <div className="card-sub">Example: “{d.example}”</div>}
                {Array.isArray(d.synonyms) && d.synonyms.length > 0 && (
                  <div className="pill-row">
                    {d.synonyms.slice(0, 8).map((s, k) => (
                      <Pill key={k} onClick={() => onPick && onPick(s)}>{s}</Pill>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>

          {Array.isArray(m.synonyms) && m.synonyms.length > 0 && (
            <Section title="Synonyms">
              <div className="pill-row">
                {m.synonyms.slice(0, 14).map((s, i) => (
                  <Pill key={i} onClick={() => onPick && onPick(s)}>{s}</Pill>
                ))}
              </div>
            </Section>
          )}

          {Array.isArray(m.antonyms) && m.antonyms.length > 0 && (
            <Section title="Antonyms">
              <div className="pill-row">
                {m.antonyms.slice(0, 14).map((a, i) => (
                  <Pill key={i} onClick={() => onPick && onPick(a)}>{a}</Pill>
                ))}
              </div>
            </Section>
          )}
        </div>
      ))}

      {Array.isArray(result.sourceUrls) && result.sourceUrls.length > 0 && (
        <div className="source">
          Source:
          {result.sourceUrls.map((u, i) => (
            <a key={u + i} className="link" href={u} target="_blank" rel="noreferrer"> {new URL(u).hostname}</a>
          ))}
        </div>
      )}
    </div>
  )
}
