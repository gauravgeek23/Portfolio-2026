import './JournalSection.css';

// A home page section: its title and a short note, then its content.
export default function JournalSection({ id, title, note, children }) {
  return (
    <section className="journal" aria-labelledby={id}>
      <header className="journal__margin">
        <h2 className="text-medium" id={id}>
          {title}
        </h2>
        {note && <p className="text-small text-muted">{note}</p>}
      </header>
      <div className="journal__body">{children}</div>
    </section>
  );
}
