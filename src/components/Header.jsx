export default function Header({ onQuickSearch }) {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Discover words. Define your world.</h1>
          <p className="hero-subtitle">A clean, fast dictionary with definitions, phonetics, examples, and synonyms.</p>
          <button className="btn btn-dark" onClick={onQuickSearch}>Try a search</button>
        </div>
      </div>
    </header>
  )
}
