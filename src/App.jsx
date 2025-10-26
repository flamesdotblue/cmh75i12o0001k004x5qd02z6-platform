import { useEffect, useMemo, useState } from 'react'
import './styles.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import Recent from './components/Recent'

export default function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [recent, setRecent] = useState(() => {
    try {
      const raw = localStorage.getItem('recentWords')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try { localStorage.setItem('recentWords', JSON.stringify(recent.slice(0, 10))) } catch {}
  }, [recent])

  const canSearch = useMemo(() => query.trim().length > 0, [query])

  async function search(term) {
    const word = (term ?? query).trim()
    if (!word) return
    setStatus('loading')
    setError('')
    setResult(null)
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      if (!res.ok) {
        let message = 'No results found.'
        try { const j = await res.json(); if (j && j.message) message = j.message } catch {}
        throw new Error(message)
      }
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) throw new Error('No results found.')
      setResult(data[0])
      setStatus('success')
      setRecent(prev => {
        const filtered = prev.filter(w => w.toLowerCase() !== word.toLowerCase())
        return [word, ...filtered].slice(0, 10)
      })
    } catch (e) {
      setStatus('error')
      setError(e.message || 'Something went wrong')
    }
  }

  return (
    <div className="app">
      <Header onQuickSearch={() => search('modern')} />

      <main className="container">
        <div className="panel">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={() => search()}
            disabled={!canSearch || status === 'loading'}
            loading={status === 'loading'}
          />

          <div className="content-grid">
            <section className="content-main">
              <Results
                status={status}
                error={error}
                result={result}
                onPick={(w) => { setQuery(w); search(w) }}
              />
            </section>
            <aside className="content-aside">
              <Recent
                items={recent}
                onPick={(w) => { setQuery(w); search(w) }}
                onClear={() => setRecent([])}
              />
            </aside>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Dictionary Web App • Free Dictionary API</span>
          <a href="https://dictionaryapi.dev/" target="_blank" rel="noreferrer" className="link">API Docs</a>
        </div>
      </footer>
    </div>
  )
}
