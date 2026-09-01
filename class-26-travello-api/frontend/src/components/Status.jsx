export default function Status({ loading, error, children }) {
  if (loading) return <div className="state">Loading…</div>;
  if (error) return <div className="alert error">{error}</div>;
  return children;
}
