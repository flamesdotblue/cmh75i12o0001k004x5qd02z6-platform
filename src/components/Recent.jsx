export default function Recent({ items, onPick, onClear }) {
  return (
    <div className="recent">
      <div className="recent-head">
        <div className="recent-title">Recent searches</div>
        {items?.length ? (
          <button className="link" onClick={onClear}>Clear</button>
        ) : null}
      </div>
      {!items?.length ? (
        <div className="muted">Your recent words will appear here.</div>
      ) : (
        <ul className="recent-list">
          {items.map((w, i) => (
            <li key={i}>
              <button className="recent-item" onClick={() => onPick && onPick(w)}>{w}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
