// Placeholder for tabs whose designs aren't ready yet (notes, about, resume).
export default function ComingSoon({ title, subtitle }) {
  return (
    <main className="container page" style={{ minHeight: '60vh' }}>
      <header>
        <h1 className="text-medium">{title}</h1>
        <p className="text-small text-muted">{subtitle}</p>
      </header>
    </main>
  );
}
