import { useState } from 'react';
import { Count, Hand, In, Slot } from './kit';
import examDesktop from '../../assets/deck/exam-desktop.webp';
import examQuestion from '../../assets/deck/exam-question.webp';
import examTabs from '../../assets/deck/exam-tabs.webp';
import examLegend from '../../assets/deck/exam-legend.webp';
import examPalette from '../../assets/deck/exam-palette.webp';
import examBottom from '../../assets/deck/exam-bottom.webp';
import examSheet from '../../assets/deck/exam-phone-sheet.webp';
import examPhone from '../../assets/deck/exam-phone-question.webp';

/* 12 Act II ------------------------------------------------------------------ */
export function ActTwo() {
  return (
    <div className="body s12">
      <In d={0} className="t">
        The first long product experience <span className="m">was the exam.</span>
      </In>
      <In d={1} as="p" className="p">
        Redesigning the NSAT / NSET exam interface.
      </In>
      <In d={2} className="s12__shots">
        <img className="s12__desk" src={examDesktop} alt="The NSAT exam interface on desktop" />
        <img className="s12__phone" src={examPhone} alt="The NSAT exam interface on a phone" />
      </In>
    </div>
  );
}

/* 13 The problem --------------------------------------------------------------- */
export function Problem({ active }) {
  return (
    <div className="body s13 split">
      <div>
        <In d={0} className="t">
          Students were learning the interface <span className="m">before taking the exam.</span>
        </In>
        <In d={2} className="s13__stat">
          <span className="n a">
            <Count to={5} active={active} />–<Count to={6} active={active} /> min
          </span>
          <span className="cap">to understand how it worked, as reported</span>
        </In>
        <In d={3} as="p" className="p">
          It lacked cohesion, and moving between sections meant going back and forth.
        </In>
      </div>
      <In d={1}>
        <Slot id="old-exam" hint="The previous exam interface, if you have it" ratio="4 / 3" />
      </In>
    </div>
  );
}

/* 14 Principles -------------------------------------------------------------- */
export function Principles() {
  return (
    <div className="body s14">
      <In d={0} className="t">
        Design for confidence <span className="m">under pressure.</span>
      </In>
      <div className="s14__cols">
        <In d={1} className="s14__col">
          <div className="tile s14__img">
            <img src={examQuestion} alt="One question with four lettered options" />
          </div>
          <span className="s07__name">Reduce cognitive load</span>
          <span className="cap">One question at a time, the chosen answer filled solid.</span>
        </In>
        <In d={2} className="s14__col">
          <div className="tile s14__img s14__img--stack">
            <img src={examTabs} alt="Section tabs" />
            <img src={examBottom} alt="Previous and Next" />
          </div>
          <span className="s07__name">Predictable navigation</span>
          <span className="cap">Sections as tabs. Previous and Next never move.</span>
        </In>
        <In d={3} className="s14__col">
          <div className="tile s14__img">
            <img src={examLegend} alt="Question state legend" />
          </div>
          <span className="s07__name">Clear progress and states</span>
          <span className="cap">Every state has its own colour, with a legend on screen.</span>
        </In>
      </div>
    </div>
  );
}

/* 15 The exam canvas ----------------------------------------------------------- */
// Hover areas on the desktop crop, in % of the image, and what each decision is.
const NOTES = [
  { k: 'Full-width question', box: [0.9, 15.8, 67.9, 53.3] },
  { k: 'Light / dark toggle', box: [75.2, 1.5, 3.4, 4.4] },
  { k: 'Section tabs', box: [1.7, 8.2, 46.4, 5.3] },
  { k: 'Question navigation, collapsible', box: [69, 28, 31, 72] },
  { k: 'Question and review states', box: [70.3, 8.7, 28.3, 16.5] },
];

export function Canvas() {
  const [on, setOn] = useState(null);
  return (
    <div className="body s15">
      <In d={0} className="t">
        One exam canvas. <span className="m">Less friction.</span>
      </In>
      <div className="s15__row">
        <In d={1} className="tile s15__frame">
          <div className="s15__img">
            <img src={examDesktop} alt="The redesigned exam interface" />
            {NOTES.map((n, i) => (
              <span
                key={n.k}
                className={`s15__box${on === i ? ' is-on' : ''}`}
                style={{ left: `${n.box[0]}%`, top: `${n.box[1]}%`, width: `${n.box[2]}%`, height: `${n.box[3]}%` }}
                onMouseEnter={() => setOn(i)}
                onMouseLeave={() => setOn(null)}
              >
                <i>{i + 1}</i>
              </span>
            ))}
          </div>
        </In>
        <ol className="s15__list">
          {NOTES.map((n, i) => (
            <In
              as="li"
              d={2 + i * 0.4}
              key={n.k}
              className={on === i ? 'is-on' : ''}
              onMouseEnter={() => setOn(i)}
              onMouseLeave={() => setOn(null)}
            >
              <i>{i + 1}</i>
              {n.k}
            </In>
          ))}
          <In as="li" d={5} className="s15__hand">
            <Hand>dark mode was there to ease glare on a long exam</Hand>
          </In>
        </ol>
      </div>
    </div>
  );
}

/* 16 Navigation and states ------------------------------------------------------ */
export function Navigation() {
  return (
    <div className="body s16">
      <In d={0} className="t">
        Move through the exam <span className="m">without losing your place.</span>
      </In>
      <div className="s16__row">
        <In d={1} className="s16__col">
          <div className="tile s16__crop">
            <img src={examPalette} alt="Question palette by section, with counts" />
          </div>
          <span className="cap">Every question by section, with a count for each.</span>
        </In>
        <In d={2} className="s16__col">
          <div className="tile s16__crop">
            <img src={examLegend} alt="Question states" />
          </div>
          <span className="cap">“Marked and answered” still counts. One less worry.</span>
        </In>
        <In d={3} className="s16__col s16__phone">
          <img src={examSheet} alt="The All questions sheet on mobile" />
          <span className="cap">On mobile, the same overview as a sheet.</span>
        </In>
      </div>
    </div>
  );
}

/* 17 Constraints ---------------------------------------------------------------- */
const PROCESS = ['Constraints', 'Exploration', 'Student feedback', 'Iteration', 'Launch'];

export function Constraints() {
  return (
    <div className="body s17 split">
      <div>
        <In d={0} className="t">
          It had to fit <span className="m">the system underneath.</span>
        </In>
        <In d={1} as="p" className="p">
          Backend and storage integration set the limits.
        </In>
        <ol className="s17__steps">
          {PROCESS.map((p, i) => (
            <In as="li" d={2 + i * 0.4} key={p} className={i === 4 ? 'is-last' : ''}>
              {p}
            </In>
          ))}
        </ol>
        <In d={5} as="p" className="cap s17__cap">
          Internal testing, online students contacted for feedback, and new patterns tried with a small group first.
        </In>
      </div>
      <In d={1}>
        <Slot id="testing-session" hint="Testing with students, or feedback notes" ratio="4 / 5" />
      </In>
    </div>
  );
}

/* 18 Design to code ---------------------------------------------------------------- */
export function DesignToCode({ active }) {
  return (
    <div className="body s18">
      <In d={0} className="t">
        Designed, then built <span className="m">in the real codebase.</span>
      </In>
      <div className="s18__row">
        <In d={1} className="s18__col">
          <Slot id="design-file" hint="The Figma file for the exam" ratio="16 / 10" />
          <span className="cap">Product thinking and design: me</span>
        </In>
        <In d={2} className="s18__arrow" aria-hidden="true">
          →
        </In>
        <In d={3} className="s18__col">
          <Slot id="code-editor" hint="The code, written with Claude" ratio="16 / 10" />
          <span className="cap">
            ~<Count to={80} active={active} delay={600} />% of the code, written by me with Claude · ~2–3 hours of
            developer integration
          </span>
        </In>
      </div>
      <In d={5} className="s18__foot">
        <Hand>my own numbers. A developer took it to production.</Hand>
      </In>
    </div>
  );
}

/* 19 Outcome ------------------------------------------------------------------- */
export function Outcome({ active }) {
  const x = (v) => `${((v - 1) / 4) * 100}%`;
  return (
    <div className="body s19 split">
      <div>
        <In d={0} className="t">
          A clearer interface. <span className="m">A better exam.</span>
        </In>
        <In d={2} className="s19__big">
          <span className="n m">3.7</span>
          <span className="n m">→</span>
          <span className="n a">
            <Count to={4.2} decimals={1} active={active} delay={500} />
          </span>
        </In>
        <In d={3} className="s19__scale">
          {[1, 2, 3, 4, 5].map((v) => (
            <span key={v} style={{ left: x(v) }}>
              {v}
            </span>
          ))}
          <i className="s19__seg" style={{ left: x(3.7), width: `${(0.5 / 4) * 100}%` }} />
        </In>
        <In d={4} as="p" className="cap">
          Reported satisfaction, out of 5. Sample and method still to verify.
        </In>
      </div>
      <In d={1}>
        <Slot id="student-feedback" hint="Student feedback, quotes or messages" ratio="4 / 5" />
      </In>
    </div>
  );
}

/* 20 Synthesis ------------------------------------------------------------------- */
export function Synthesis() {
  return (
    <div className="body s20">
      <div className="tile s20__shot">
        <img src={examDesktop} alt="The exam interface with everything but the question dimmed" />
        <span className="s20__focus" style={{ left: '0.9%', top: '17%', width: '67%', height: '51.5%' }} />
      </div>
      <In d={3} className="t s20__t">
        The interface should disappear. <span className="m">The exam should remain.</span>
      </In>
    </div>
  );
}

/* 21 Lessons --------------------------------------------------------------------- */
export function Lessons() {
  const items = [
    ['moment-1', 'Consistency across touchpoints'],
    ['moment-2', 'The whole journey, not one screen'],
    ['moment-3', 'Care where the stakes are high'],
  ];
  return (
    <div className="body s21">
      <In d={0} className="t">
        Design creates leverage <span className="m">when it works as a system.</span>
      </In>
      <div className="s21__row">
        {items.map(([id, t], i) => (
          <In d={1 + i} key={id} className="s21__col">
            <Slot id={id} hint="A filler photo from the season" ratio="4 / 3" />
            <span className="s07__name">{t}</span>
          </In>
        ))}
      </div>
    </div>
  );
}

/* 22 Approach --------------------------------------------------------------------- */
const APPROACH = [
  'Understand the business goal',
  'Find the user problem',
  'Define the critical journey',
  'Design and validate',
  'Ship with engineering',
  'Measure, and start again',
];

export function Approach() {
  return (
    <div className="body s22 split">
      <div>
        <In d={0} className="t">
          Start with the business. <span className="m">Stay with the user. Ship it.</span>
        </In>
        <ol className="s22__list">
          {APPROACH.map((a, i) => (
            <In as="li" d={1 + i * 0.35} key={a}>
              <span className="m">0{i + 1}</span>
              {a}
            </In>
          ))}
        </ol>
      </div>
      <In d={1}>
        <Slot id="workspace" hint="A filler: your desk, sketches, a whiteboard" ratio="4 / 5" />
      </In>
    </div>
  );
}

/* 23 What next --------------------------------------------------------------------- */
export function WhatNext() {
  return (
    <div className="body s23">
      <In d={0} className="t">
        The next iteration starts <span className="m">with better evidence.</span>
      </In>
      <ol className="s23__list">
        {[
          'Validate the satisfaction baseline and method',
          'Measure task completion and navigation friction',
          'Check performance across devices',
          'Keep testing navigation and section switching',
          'Tie interface changes to confidence and completion',
        ].map((t, i) => (
          <In as="li" d={1 + i * 0.35} key={t}>
            {t}
          </In>
        ))}
      </ol>
      <In d={3} className="s23__hand">
        <Hand>proposed, not done yet</Hand>
      </In>
    </div>
  );
}

/* 24 Closing -------------------------------------------------------------------- */
export function Closing() {
  return (
    <div className="body s24">
      <In d={0}>
        <Slot id="closing" hint="A closing photo: you, the team, or a campus moment" ratio="32 / 9" />
      </In>
      <In d={1} className="t s24__t">
        Build experiences that move the business forward.
      </In>
      <In d={2} className="t m">
        Thank you.
      </In>
    </div>
  );
}
