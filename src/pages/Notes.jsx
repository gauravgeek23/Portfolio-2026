import { Fragment } from 'react';
import { notes } from '../data/notes';
import './Notes.css';

export default function Notes() {
  return (
    <main className="container page">
      <header>
        <h1 className="text-medium">Notes and essays</h1>
        <p className="text-muted">Thinking through pixels and paragraphs</p>
      </header>

      <ul className="notes">
        {notes.map((note, i) => (
          <Fragment key={note.title}>
            {i > 0 && <li className="divider" aria-hidden="true" />}
            <li className="notes__item">
              {note.href ? (
                <a className="notes__title text-medium" href={note.href}>
                  {note.title}
                </a>
              ) : (
                <span className="notes__title text-medium">{note.title}</span>
              )}
              <span className="notes__meta text-small text-muted">
                {note.category} / {note.date}
              </span>
            </li>
          </Fragment>
        ))}
      </ul>
    </main>
  );
}
