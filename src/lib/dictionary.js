export async function fetchDefinition(term) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) {
    let message = 'Failed to fetch definition';
    try {
      const err = await res.json();
      if (err && err.message) message = err.message;
    } catch {}
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}
