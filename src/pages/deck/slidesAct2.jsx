import { useState } from 'react';
import { Count, In, Tag } from './kit';
import examDesktop from '../../assets/deck/exam-desktop.webp';
import examQuestion from '../../assets/deck/exam-question.webp';
import examTabs from '../../assets/deck/exam-tabs.webp';
import examLegend from '../../assets/deck/exam-legend.webp';
import examPalette from '../../assets/deck/exam-palette.webp';
import examBottom from '../../assets/deck/exam-bottom.webp';
import examSheet from '../../assets/deck/exam-phone-sheet.webp';
import examPhone from '../../assets/deck/exam-phone-question.webp';
import examHeader from '../../assets/deck/exam-header.webp';

/* ------------------------------------------------------ 12 Section transition */
export function ActTwo() {
  return (
    <div className="s12">
      <div className="s12__text pad">
        <In d={0} className="label">
          Act II · The exam interface
        </In>
        <In d={1} as="h2" className="display s12__title">
          The first prolonged product experience was the exam.
        </In>
        <In d={2} as="p" className="lede muted">
          Redesigning the NSAT / NSET exam interface.
        </In>
      </div>
      <In d={2} className="s12__shot">
        <img src={examDesktop} alt="NSAT exam interface" />
      </In>
    </div>
  );
}

/* ------------------------------------------------------------- 13 Problem */
const SECTIONS = ['Advanced Maths', 'Basic Maths', 'General Aptitude', 'English'];

export function Problem({ active }) {
  return (
    <div className="s13 pad">
      <In d={0} className="label">
        The problem
      </In>
      <In d={1} as="h2" className="h1 s13__title">
        Students were learning the interface <span className="muted">before taking the exam.</span>
      </In>
      <div className="s13__body">
        <In d={2} className="s13__stat">
          <span className="s13__min">
            <Count to={5} active={active} />–<Count to={6} active={active} />
            <small>min</small>
          </span>
          <span>a student could spend understanding how the interface worked, before answering anything</span>
          <Tag tone="dark">Reported</Tag>
        </In>
        <div className="s13__obs">
          <In d={3} className="s13__o">
            <b>01</b>
            <span>The interface lacked cohesion.</span>
          </In>
          <In d={4} className="s13__o">
            <b>02</b>
            <span>Its working had to be learned, under exam time.</span>
          </In>
          <In d={5} className="s13__o">
            <b>03</b>
            <span>Switching between sections meant unnecessary back-and-forth.</span>
          </In>
          <In d={6} className="s13__zig" aria-label="Illustration of back-and-forth between sections">
            {SECTIONS.map((s) => (
              <span key={s}>{s}</span>
            ))}
            <svg viewBox="0 0 800 120" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="draw"
                pathLength="1"
                d="M100 8 Q 300 110, 500 8 Q 400 70, 300 8 Q 500 110, 700 8 Q 400 140, 100 8"
                style={{ '--d': 7 }}
              />
            </svg>
            <small>Illustration of the back-and-forth, not a screenshot</small>
          </In>
        </div>
      </div>
      <In d={8} className="foot">
        Design observations, as reported. No screenshots of the previous interface were available, so none are shown.
      </In>
    </div>
  );
}

/* ---------------------------------------------------------- 14 Principles */
export function Principles() {
  return (
    <div className="s14 pad">
      <In d={0} className="label">
        Design principles
      </In>
      <In d={1} as="h2" className="h1">
        Design for confidence <span className="muted">under pressure.</span>
      </In>
      <div className="s14__cols">
        <In d={2} className="s14__col">
          <span className="s14__n">1</span>
          <b>Reduce cognitive load</b>
          <div className="s14__img">
            <img src={examQuestion} alt="One question with four lettered options; the chosen one is filled" />
          </div>
          <p>One question at a time. Four lettered options, and the chosen answer is filled solid.</p>
        </In>
        <In d={3} className="s14__col">
          <span className="s14__n">2</span>
          <b>Make navigation predictable</b>
          <div className="s14__img s14__img--stack">
            <img src={examTabs} alt="Section tabs: Advanced Maths, Basic Maths, General Aptitude, English" />
            <img src={examBottom} alt="Previous and Next buttons" />
          </div>
          <p>Sections are tabs. Previous and Next always sit in the same place.</p>
        </In>
        <In d={4} className="s14__col">
          <span className="s14__n">3</span>
          <b>Make progress and states clear</b>
          <div className="s14__img">
            <img
              src={examLegend}
              alt="Legend: Not Visited, Attempted, Mark for Review, Un-attempted, Marked and Answered"
            />
          </div>
          <p>Every question state has its own colour and fill, explained by a legend that stays on screen.</p>
        </In>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 15 The new canvas */
// Annotations on the desktop crop, in % of the image: the highlight box and its label.
const CANVAS_NOTES = [
  {
    k: 'Full-width layout',
    d: 'The question gets the width, so long questions need less scrolling.',
    box: [0.9, 15.8, 67.9, 53.3],
  },
  {
    k: 'Light / dark theme toggle',
    d: 'Dark mode is there to reduce perceived glare over a long exam.',
    box: [75.2, 1.5, 3.4, 4.4],
  },
  { k: 'Section tabs', d: 'Switch sections directly, in one click.', box: [1.7, 8.2, 46.4, 5.3] },
  {
    k: 'Question navigation, right side',
    d: 'A collapsible panel: every question, grouped by section.',
    box: [69, 28, 31, 72],
  },
  {
    k: 'Question and review states',
    d: 'Attempted, not visited, marked for review: clearer at a glance.',
    box: [70.3, 8.7, 28.3, 16.5],
  },
];

export function Canvas() {
  const [hover, setHover] = useState(null);
  return (
    <div className="s15">
      <div className="s15__shot">
        <In d={1} className="s15__frame">
          <img src={examDesktop} alt="Redesigned NSAT exam interface on desktop" />
          {CANVAS_NOTES.map((n, i) => (
            <span
              key={n.k}
              className={`s15__box${hover === i ? ' is-on' : ''}`}
              style={{
                left: `${n.box[0]}%`,
                top: `${n.box[1]}%`,
                width: `${n.box[2]}%`,
                height: `${n.box[3]}%`,
                '--d': 4 + i * 0.4,
              }}
              data-in
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <i>{i + 1}</i>
            </span>
          ))}
        </In>
      </div>
      <div className="s15__side">
        <In d={0} className="label">
          The new exam canvas
        </In>
        <In d={1} as="h2" className="h2 s15__title">
          One exam canvas. <span className="muted">Less friction.</span>
        </In>
        <ol className="s15__list">
          {CANVAS_NOTES.map((n, i) => (
            <In
              as="li"
              d={3 + i * 0.4}
              key={n.k}
              className={hover === i ? 'is-on' : ''}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <i>{i + 1}</i>
              <span>
                <b>{n.k}</b>
                {n.d}
              </span>
            </In>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------ 16 Navigation and states */
export function Navigation() {
  return (
    <div className="s16 pad">
      <div className="s16__head">
        <In d={0} className="label">
          Navigation and question states
        </In>
        <In d={1} as="h2" className="h1">
          Move through the exam <span className="muted">without losing your place.</span>
        </In>
      </div>
      <div className="s16__grid">
        <In d={2} className="s16__item s16__tabs">
          <div className="s16__crop">
            <img src={examTabs} alt="Section tabs" />
          </div>
          <span className="s16__cap">
            <i>1</i>
            <span>
              <b>Section tabs</b> switch sections directly. The active section is highlighted.
            </span>
          </span>
        </In>
        <In d={3} className="s16__item s16__palette">
          <div className="s16__crop">
            <img
              src={examPalette}
              alt="Question palette for Advanced and Basic Mathematics, with counts 12/20 and 07/15"
            />
          </div>
          <span className="s16__cap">
            <i>2</i>
            <span>
              <b>Question navigation</b> gives an overview: every question by section, with a count per section (12/20,
              07/15).
            </span>
          </span>
        </In>
        <In d={4} className="s16__item s16__legend">
          <div className="s16__crop">
            <img src={examLegend} alt="Question state legend" />
          </div>
          <span className="s16__cap">
            <i>3</i>
            <span>
              <b>Question states</b> show progress and review intent. Marked and answered questions are still evaluated.
            </span>
          </span>
        </In>
        <In d={5} className="s16__item s16__phone">
          <img src={examSheet} alt="On mobile, an All questions sheet with the same palette" />
          <span className="s16__cap">
            <span>
              <b>On mobile</b>, the same overview opens as an “All questions” sheet.
            </span>
          </span>
        </In>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- 17 Constraints */
const PROCESS = [
  { k: 'Constraint', d: 'Backend and storage integration' },
  { k: 'Design exploration', d: 'Internal testing informed iterations' },
  { k: 'Student feedback', d: 'Online students contacted for feedback' },
  { k: 'Iteration', d: 'Revised quiz and exam patterns tested with a small group' },
  { k: 'Launch', d: 'Wider release' },
];

export function Constraints() {
  return (
    <div className="s17 pad">
      <In d={0} className="label">
        Designing with constraints
      </In>
      <In d={1} as="h2" className="h1">
        The experience had to fit <span className="muted">the system underneath.</span>
      </In>
      <div className="s17__flow">
        <svg className="s17__loop" viewBox="0 -150 1664 160" aria-hidden="true">
          {/* From Iteration (step 4) back over the line to Design exploration (step 2). */}
          <path className="draw" pathLength="1" d="M1031 -12 C 1031 -130, 366 -130, 366 -12" style={{ '--d': 8 }} />
          <path d="M354 -26 L366 -10 L378 -26" />
        </svg>
        <span className="s17__loopLabel">feedback loops back into design</span>
        <svg className="s17__line" viewBox="0 0 1696 4" preserveAspectRatio="none" aria-hidden="true">
          <path className="draw" pathLength="1" d="M0 2 H1696" style={{ '--d': 2 }} />
        </svg>
        {PROCESS.map((p, i) => (
          <In
            d={3 + i * 0.6}
            key={p.k}
            className={`s17__step${i === 0 ? ' is-constraint' : ''}${i === 4 ? ' is-launch' : ''}`}
          >
            <span className="s17__dot">{i + 1}</span>
            <b>{p.k}</b>
            <span>{p.d}</span>
          </In>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 18 Design to code */
export function DesignToCode({ active }) {
  const C = 2 * Math.PI * 150;
  return (
    <div className="s18 pad">
      <div className="s18__head">
        <In d={0} className="label">
          From design to shipped product
        </In>
        <In d={1} as="h2" className="h1">
          Design decisions, <span className="muted">implemented in the real codebase.</span>
        </In>
      </div>
      <div className="s18__flow">
        <In d={2} className="s18__step">
          <span className="s18__k">01 · Me</span>
          <b>Product thinking and design</b>
          <span>Problem, principles, interface, states</span>
        </In>
        <In d={3} className="s18__arrow" aria-hidden="true">
          →
        </In>
        <In d={3.5} className="s18__step s18__step--ai">
          <span className="s18__k">02 · Me, with Claude</span>
          <b>Implementation with codebase context</b>
          <div className="s18__ring">
            <svg viewBox="0 0 360 360">
              <circle r="150" cx="180" cy="180" className="s18__track" />
              <circle
                r="150"
                cx="180"
                cy="180"
                className="s18__fill"
                style={{ strokeDasharray: C, strokeDashoffset: active ? C * 0.2 : C }}
                transform="rotate(-90 180 180)"
              />
            </svg>
            <span className="s18__pct">
              <span>
                ~<Count to={80} active={active} delay={500} />%
              </span>
            </span>
            <span className="s18__pctL">of the code</span>
          </div>
        </In>
        <In d={4.5} className="s18__arrow" aria-hidden="true">
          →
        </In>
        <In d={5} className="s18__step">
          <span className="s18__k">03 · Developer</span>
          <b>Integration and shipping</b>
          <span className="s18__hours">~2–3 hours</span>
        </In>
        <In d={6} className="s18__arrow" aria-hidden="true">
          →
        </In>
        <In d={6.5} className="s18__step s18__step--live">
          <span className="s18__k">04 · Live</span>
          <img src={examHeader} alt="Shipped exam header with timer and Submit Test" />
          <b>Shipped exam interface</b>
        </In>
      </div>
      <In d={8} className="foot">
        Implementation figures are candidate-reported. AI sped up implementation; developer integration took it to
        production.
      </In>
    </div>
  );
}

/* ------------------------------------------------------------- 19 Outcome */
export function Outcome({ active }) {
  const x = (v) => `${((v - 1) / 4) * 100}%`;
  return (
    <div className="s19 pad">
      <In d={0} className="label">
        Outcome
      </In>
      <In d={1} as="h2" className="h1">
        A clearer interface. <span className="muted">A better exam experience.</span>
      </In>
      <In d={2} className="s19__big">
        <span className="s19__before">3.7</span>
        <span className="s19__to">→</span>
        <span className="s19__after">
          <Count to={4.2} decimals={1} active={active} delay={700} />
        </span>
        <span className="s19__of">/ 5 reported satisfaction</span>
      </In>
      <In d={4} className="s19__scale">
        <div className="s19__track">
          {[1, 2, 3, 4, 5].map((v) => (
            <span key={v} className="s19__tick" style={{ left: x(v) }}>
              {v}
            </span>
          ))}
          <span className="s19__seg" style={{ left: x(3.7), width: `${(0.5 / 4) * 100}%` }} />
          <span className="s19__mark s19__mark--a" style={{ left: x(3.7) }}>
            <b>3.7</b> previous
          </span>
          <span className="s19__mark s19__mark--b" style={{ left: x(4.2) }}>
            <b>4.2</b> new
          </span>
        </div>
      </In>
      <In d={6} className="foot">
        Reported scores out of 5. Sample size, survey question and how the score was measured are still to be verified,
        so this isn’t presented as a controlled result.
      </In>
    </div>
  );
}

/* ----------------------------------------------------------- 20 Synthesis */
export function Synthesis() {
  return (
    <div className="s20">
      <div className="s20__shot">
        <img src={examDesktop} alt="Exam interface with everything but the question dimmed" />
        <span className="s20__focus" style={{ left: '0.9%', top: '17%', width: '67%', height: '51.5%' }} />
      </div>
      <div className="s20__text">
        <In d={3} as="h2" className="display s20__title">
          The interface should disappear.
          <br />
          <span className="accent-text">The exam should remain.</span>
        </In>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- 21 Lessons */
export function Lessons() {
  const items = [
    ['Consistency across touchpoints reduces fragmented experiences.', 'Brand system, website · slides 05–06'],
    [
      'Growth means understanding the whole journey, not one conversion screen.',
      'Journey, funnel, referral · slides 03, 07–10',
    ],
    ['High-stakes product experiences deserve careful usability work.', 'Exam interface · slides 13–20'],
  ];
  return (
    <div className="s21 pad">
      <In d={0} className="label">
        What the season taught me
      </In>
      <In d={1} as="h2" className="h1 s21__title">
        Design creates leverage <span className="muted">when it works as a system.</span>
      </In>
      <div className="s21__list">
        <svg className="s21__spine" viewBox="0 0 4 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="draw" pathLength="1" d="M2 0 V600" style={{ '--d': 2 }} />
        </svg>
        {items.map(([t, ref], i) => (
          <In d={3 + i} key={t} className="s21__item">
            <span className="s21__dot" />
            <b>{t}</b>
            <span className="s21__ref">{ref}</span>
          </In>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 22 Approach */
const APPROACH = [
  'Understand the business goal',
  'Identify the user problem',
  'Define the critical journey',
  'Design and validate',
  'Partner with engineering to ship',
  'Measure the outcome',
];

export function Approach() {
  const R = 300;
  return (
    <div className="s22 pad">
      <div className="s22__text">
        <In d={0} className="label">
          How I approach product design
        </In>
        <In d={1} as="h2" className="h1">
          Start with the business.
          <br />
          Stay with the user.
          <br />
          <span className="accent-text">Ship the solution.</span>
        </In>
      </div>
      <In d={2} className="s22__loop">
        <svg viewBox="-420 -420 840 840" aria-hidden="true">
          <circle className="s22__ring draw" pathLength="1" r={R} style={{ '--d': 3 }} />
          <path className="s22__back draw" pathLength="1" d={arc(R, -120 + 2, -90 - 4)} style={{ '--d': 8 }} />
        </svg>
        {APPROACH.map((a, i) => {
          const ang = ((i / 6) * 360 - 90) * (Math.PI / 180);
          return (
            <In
              d={4 + i * 0.5}
              key={a}
              className={`s22__node${i === 5 ? ' is-measure' : ''}`}
              style={{
                left: `${50 + (Math.cos(ang) * R * 100) / 840}%`,
                top: `${50 + (Math.sin(ang) * R * 100) / 840}%`,
              }}
            >
              <i>{i + 1}</i>
              <span>{a}</span>
            </In>
          );
        })}
        <In d={9} className="s22__centre">
          Measuring feeds the next understanding.
        </In>
      </In>
    </div>
  );
}

function arc(r, from, to) {
  const p = (a) => [Math.cos((a * Math.PI) / 180) * r, Math.sin((a * Math.PI) / 180) * r];
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
}

/* ------------------------------------------------------ 23 What next */
const NEXT = [
  { when: 'First', items: ['Validate the exam satisfaction baseline and method'] },
  {
    when: 'Then',
    items: ['Measure task completion and navigation friction', 'Examine performance across device types'],
  },
  {
    when: 'Ongoing',
    items: [
      'Keep testing question navigation and section switching',
      'Connect interface changes to student confidence and completion',
    ],
  },
];

export function WhatNext() {
  return (
    <div className="s23 pad">
      <In d={0} className="label">
        What I would do next
      </In>
      <In d={1} as="h2" className="h1">
        The next iteration starts <span className="muted">with better evidence.</span>
      </In>
      <In d={2} className="s23__flag">
        <Tag tone="outline">Proposed</Tag> Future work, not completed work
      </In>
      <div className="s23__cols">
        {NEXT.map((c, i) => (
          <In d={3 + i} key={c.when} className="s23__col">
            <span className="s23__when">{c.when}</span>
            {c.items.map((t) => (
              <span key={t} className="s23__card">
                {t}
              </span>
            ))}
          </In>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- 24 Closing */
export function Closing() {
  return (
    <div className="s24">
      <In d={1} className="s24__strip">
        <img src={examPhone} alt="" />
        <img src={examDesktop} alt="" />
        <img src={examSheet} alt="" />
      </In>
      <div className="s24__text pad">
        <In d={2} as="h2" className="display s24__title">
          Build experiences that move the business forward.
        </In>
        <In d={4} className="s24__thanks">
          <span className="mark">
            gk
            <i />
          </span>
          <span>Thank you.</span>
        </In>
      </div>
    </div>
  );
}
