import { useEffect, useRef, useState } from 'react'

export default function SearchBar({ value, onChange, onSubmit, disabled, loading }) {
  const [local, setLocal] = useState(value || '')
  const ref = useRef(null)

  useEffect(() => setLocal(value || ''), [value])

  useEffect(() => {
    const t = setTimeout(() => onChange && onChange(local), 250)
    return () => clearTimeout(t)
  }, [local])

  function submit(e) {
    e.preventDefault()
    if (onSubmit) onSubmit()
  }

  return (
    <form onSubmit={submit} className="search">
      <label className="search-label" htmlFor="search-input">Search for a word</label>
      <div className="search-row">
        <input
          id="search-input"
          ref={ref}
          className="input"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Type a word..."
          onKeyDown={(e) => { if (e.key === 'Enter') submit(e) }}
        />
        <button className="btn" type="submit" disabled={disabled}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>
    </form>
  )
}
