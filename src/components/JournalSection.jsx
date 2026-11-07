import './JournalSection.css';

// A home page section laid out like a page of a field journal: the section's number, title and a
// handwritten note sit in a margin on the left (sticky while you scroll through the section),
// the content fills the page to its right. On phones the margin sits on top.
export default function JournalSection({ index, id, title, note, children }) {
  return (
    <section className="journal" aria-labelledby={id}>
      <header className="journal__margin">
        <span className="journal__index">{String(index).padStart(2, '0')}</span>
        <h2 className="journal__title text-medium" id={id}>
          {title}
        </h2>
        {note && <p className="journal__note">{note}</p>}
      </header>
      <div className="journal__body">{children}</div>
    </section>
  );
}
