import { Count, In, Tag } from './kit';
import nstLogo from '../../assets/logos/nst.svg?raw';
import examDesktop from '../../assets/deck/exam-desktop.webp';
import examPhone from '../../assets/deck/exam-phone-question.webp';
import examQuestion from '../../assets/deck/exam-question.webp';
import academicCalendar from '../../assets/work/academic-calendar-1600.webp';

/* ---------------------------------------------------------------- 01 Cover */
export function Cover() {
  return (
    <div className="s01">
      <div className="s01__text">
        <In d={0} className="label">
          Newton School of Technology
        </In>
        <In d={1} as="h1" className="display">
          Growth Season
          <br />
          2025–26
        </In>
        <In d={2} as="p" className="lede s01__lede">
          Product design, growth systems, and the first high-stakes product experience.
        </In>
        <In d={4} className="s01__by">
          <b>Gaurav Kumar</b>
          <span>Senior Product Designer</span>
        </In>
      </div>
      <In d={2} className="s01__shot">
        <img className="s01__desktop" src={examDesktop} alt="NSAT exam interface on desktop" />
        <img className="s01__phone" src={examPhone} alt="NSAT exam interface on a phone" />
      </In>
    </div>
  );
}

/* ---------------------------------------------------------- 02 Big picture */
const ECOSYSTEM = [
  { k: 'Discovery', d: 'Brand, website' },
  { k: 'Acquisition products', d: 'Study Buddy, Head Start, referral' },
  { k: 'Signup', d: 'Account' },
  { k: 'Application', d: 'Application page' },
  { k: 'Payment', d: 'NSAT fee' },
  { k: 'Exam', d: 'NSAT / NSET', exam: true },
];

export function BigPicture() {
  return (
    <div className="s02 pad">
      <In d={0} className="label">
        The big picture
      </In>
      <In d={1} as="h2" className="h1 s02__title">
        The season was a system, <span className="muted">not a campaign.</span>
      </In>
      <div className="s02__flow">
        <svg className="s02__line" viewBox="0 0 1696 40" preserveAspectRatio="none" aria-hidden="true">
          <path className="draw" pathLength="1" d="M0 20 H1696" style={{ '--d': 3 }} />
        </svg>
        {ECOSYSTEM.map((n, i) => (
          <In d={3 + i * 0.6} key={n.k} className={`s02__node${n.exam ? ' is-exam' : ''}`}>
            <span className="s02__dot" />
            <b>{n.k}</b>
            <span>{n.d}</span>
            {n.exam && <img src={examQuestion} alt="" />}
          </In>
        ))}
      </div>
      <div className="s02__acts">
        <In d={8} className="s02__act s02__act--one">
          <span className="s02__bracket" />
          <em>Act I</em>
          <b>Building the growth system</b>
          <span>Brand, website, acquisition products, referral and the steps to payment.</span>
        </In>
        <In d={9} className="s02__act s02__act--two">
          <span className="s02__bracket" />
          <em>Act II</em>
          <b>Redesigning the exam experience</b>
          <span>The first prolonged product experience.</span>
        </In>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 03 Student journey */
const MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const STAGES = [
  { k: 'Discovery', t: ['Website', 'Study Buddy', 'Head Start', 'Referral'] },
  { k: 'Signup', t: ['Account creation'] },
  { k: 'Application form', t: ['Application page', 'Notification centre'] },
  { k: 'NSAT payment', t: ['Exam fee', 'Retries'] },
  { k: 'Exam', t: ['NSAT / NSET interface'] },
];

export function Journey() {
  return (
    <div className="s03 pad">
      <In d={0} className="label">
        The student journey
      </In>
      <In d={1} as="h2" className="h1">
        A high-intent journey <span className="muted">with many handoffs.</span>
      </In>

      <In d={2} className="s03__season">
        <div className="s03__months">
          {MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="s03__peak">
          <span>Discovery peak, Dec – Mar</span>
        </div>
        <div className="s03__span">Admissions season, September to June</div>
      </In>

      <div className="s03__stages">
        {STAGES.map((s, i) => (
          <In d={3 + i * 0.7} key={s.k} className={`s03__stage${i === 4 ? ' is-exam' : ''}`}>
            <span className="s03__n">0{i + 1}</span>
            <b>{s.k}</b>
            <ul>
              {s.t.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {i < STAGES.length - 1 && (
              <span className="s03__handoff" aria-hidden="true">
                <i />
                handoff
              </span>
            )}
          </In>
        ))}
      </div>

      <In d={8} className="s03__foot">
        <span className="muted">Campuses</span>
        <b>Delhi</b>
        <b>Pune</b>
        <b>Bengaluru</b>
        <b>Hyderabad</b>
        <span className="s03__note">Every handoff is a place a student can drop out.</span>
      </In>
    </div>
  );
}

/* ---------------------------------------------------- 04 Design function */
const PARTNERS = ['Product', 'Engineering', 'Marketing', 'Content', 'Academic'];

export function DesignFunction() {
  const R = 330;
  return (
    <div className="s04 pad">
      <div className="s04__text">
        <In d={0} className="label">
          Building the design function
        </In>
        <In d={1} as="h2" className="h1">
          Five verticals.
          <br />
          One design function.
        </In>
        <In d={3} className="s04__zero">
          <span className="s04__from">0</span>
          <span className="s04__arrow">→</span>
          <span className="s04__to">team</span>
        </In>
        <In d={4} as="p" className="body">
          There was no design team when I joined. I built and led one, working across five business verticals.
        </In>
      </div>

      <In d={2} className="s04__model" aria-label="Design at the centre of five verticals and five partner teams">
        <svg viewBox="-400 -400 800 800">
          <circle className="s04__ring draw" pathLength="1" r={R} style={{ '--d': 3 }} />
          <circle className="s04__ring s04__ring--in draw" pathLength="1" r="190" style={{ '--d': 4 }} />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <g key={i} className="s04__v" style={{ '--d': 5 + i * 0.4 }}>
                <line x1={Math.cos(a) * 92} y1={Math.sin(a) * 92} x2={Math.cos(a) * 190} y2={Math.sin(a) * 190} />
                <circle cx={Math.cos(a) * 190} cy={Math.sin(a) * 190} r="30" />
                <text x={Math.cos(a) * 190} y={Math.sin(a) * 190 + 9}>
                  V{i + 1}
                </text>
              </g>
            );
          })}
          <circle className="s04__core" r="92" />
          <text className="s04__coreText" y="10">
            Design
          </text>
        </svg>
        {PARTNERS.map((p, i) => {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2 + Math.PI / 5;
          return (
            <In
              d={6 + i * 0.4}
              key={p}
              className="s04__partner"
              style={{
                left: `${50 + (Math.cos(a) * (R + 10) * 100) / 800}%`,
                top: `${50 + (Math.sin(a) * (R + 10) * 100) / 800}%`,
              }}
            >
              {p}
            </In>
          );
        })}
        <div className="s04__legend">
          <span>
            <i className="s04__key s04__key--v" /> Business verticals (V1–V5)
          </span>
          <span>
            <i className="s04__key s04__key--p" /> Partner teams
          </span>
        </div>
      </In>
    </div>
  );
}

/* --------------------------------------------------- 05 Brand standardisation */
export function Brand() {
  return (
    <div className="s05 pad">
      <div className="s05__head">
        <In d={0} className="label">
          Brand standardisation · September 2025
        </In>
        <In d={1} as="h2" className="h1">
          First, create one <br />
          recognisable brand.
        </In>
      </div>
      <div className="s05__board">
        <In d={2} className="s05__tile s05__logo">
          <span className="s05__cap">Logo</span>
          <span className="s05__logoMark" dangerouslySetInnerHTML={{ __html: nstLogo }} />
        </In>
        <In d={2.5} className="s05__tile s05__colour">
          <span className="s05__cap">Colour</span>
          <div className="s05__swatches">
            <i style={{ background: '#004599' }}>
              <b>#004599</b>
            </i>
            <i style={{ background: '#0673F9' }}>
              <b>#0673F9</b>
            </i>
            <i style={{ background: '#2D2D2D' }} />
            <i style={{ background: '#F5F5F5' }} />
          </div>
          <span className="s05__src">Blues sampled from the logo</span>
        </In>
        <In d={3} className="s05__tile s05__type">
          <span className="s05__cap">Typography</span>
          <span className="s05__aa">Aa</span>
          <span className="s05__scale">
            <b>Headline</b>
            <span>Body copy for campaigns</span>
            <small>CAPTION · LABEL</small>
          </span>
          <Tag>Illustrative</Tag>
        </In>
        <In d={3.5} className="s05__tile s05__photo">
          <span className="s05__cap">Photography</span>
          <div className="s05__frames">
            <i />
            <i />
            <i />
          </div>
          <span className="s05__src">One crop, light and colour treatment across campuses</span>
          <Tag>Illustrative</Tag>
        </In>
        <In d={4} className="s05__tile s05__shots">
          <span className="s05__cap">Product screenshots</span>
          <img src={academicCalendar} alt="Newton School of Technology academic calendar" />
          <img className="s05__shot2" src={examQuestion} alt="" />
        </In>
        <In d={4.5} className="s05__tile s05__portal">
          <span className="s05__cap">Central brand portal</span>
          <ul>
            {['Logos', 'Colours', 'Typography', 'Photography', 'Product screenshots'].map((x, i) => (
              <li key={x} style={{ '--d': 6 + i * 0.3 }} data-in>
                <i />
                {x}
              </li>
            ))}
          </ul>
          <span className="s05__src">One source for campus and central teams</span>
        </In>
      </div>
      <In d={6} className="foot">
        Board recreated for this presentation. Logo, colours and product screenshots are real; typography and
        photography tiles are illustrative.
      </In>
    </div>
  );
}

/* ------------------------------------------------------- 06 Website redesign */
export function Website({ active }) {
  // Slope chart, y from 20% (bottom) to 25% (top).
  const y = (v) => 470 - ((v - 20) / 5) * 420;
  return (
    <div className="s06 pad">
      <div className="s06__left">
        <In d={0} className="label">
          Website redesign
        </In>
        <In d={1} as="h2" className="h1">
          21 days. 18 pages.
          <br />
          <span className="muted">A measurable lift.</span>
        </In>
        <In d={3} className="s06__pages" aria-label="18 pages redesigned">
          {Array.from({ length: 18 }, (_, k) => (
            <span key={k} style={{ '--i': k }}>
              <i />
            </span>
          ))}
        </In>
        <In d={4} className="s06__days" aria-label="over 21 days">
          <div className="s06__dayTicks">
            {Array.from({ length: 21 }, (_, k) => (
              <i key={k} />
            ))}
          </div>
          <div className="s06__pagesKey">
            <span>
              <b>18</b> pages redesigned
            </span>
            <span>
              in <b>21</b> days
            </span>
          </div>
        </In>
      </div>
      <In d={2} className="s06__chart">
        <div className="s06__chartTitle">Signup conversion, before and after the redesign</div>
        <svg viewBox="0 0 760 520">
          {[20, 21, 22, 23, 24, 25].map((v) => (
            <g key={v} className="axis">
              <line x1="70" x2="740" y1={y(v)} y2={y(v)} />
              <text x="56" y={y(v) + 7}>
                {v}%
              </text>
            </g>
          ))}
          <path className="s06__slope draw" pathLength="1" d={`M180 ${y(21.3)} L630 ${y(23.6)}`} style={{ '--d': 4 }} />
          <circle className="s06__pt s06__pt--a" cx="180" cy={y(21.3)} r="12" />
          <circle className="s06__pt s06__pt--b" cx="630" cy={y(23.6)} r="14" />
          <text className="s06__val" x="180" y={y(21.3) - 30} textAnchor="middle">
            21.3%
          </text>
          <text className="s06__val s06__val--b" x="630" y={y(23.6) - 34} textAnchor="middle">
            23.6%
          </text>
          <text className="s06__x" x="180" y="510" textAnchor="middle">
            Before
          </text>
          <text className="s06__x" x="630" y="510" textAnchor="middle">
            After
          </text>
        </svg>
        <div className="s06__delta">
          <span className="s06__pp">
            +<Count to={2.3} decimals={1} active={active} delay={900} /> pp
          </span>
          <span>percentage points, at 98% confidence</span>
        </div>
      </In>
      <In d={6} className="foot">
        A 2.3 percentage-point increase in signup conversion (21.3% → 23.6%), as reported with 98% statistical
        confidence.
      </In>
    </div>
  );
}

/* ----------------------------------------------------- 07 Top-of-funnel products */
export function Products({ active }) {
  return (
    <div className="s07 pad">
      <In d={0} className="label">
        Top-of-funnel products
      </In>
      <In d={1} as="h2" className="h1 s07__title">
        Products created demand <span className="muted">before application.</span>
      </In>
      <div className="s07__grid">
        <In d={2} className="s07__card s07__buddy">
          <span className="s07__name">Study Buddy</span>
          <span className="s07__big">
            <Count to={110589} active={active} />
          </span>
          <span className="s07__sub">users acquired</span>
          <div className="s07__units" aria-label="14.4 of every 100 Study Buddy users converted to NSAT paid">
            {Array.from({ length: 100 }, (_, i) => (
              <i key={i} className={i < 14 ? 'on' : i === 14 ? 'part' : ''} style={{ '--i': i }} />
            ))}
          </div>
          <span className="s07__conv">
            <b>14.4%</b> Study Buddy → NSAT paid
          </span>
        </In>
        <In d={3} className="s07__card s07__head">
          <span className="s07__name">Head Start</span>
          <span className="s07__lead">Free coding courses</span>
          <div className="s07__chips">
            <span>Python</span>
            <span>C++</span>
            <span>Fundamentals</span>
          </div>
        </In>
        <In d={4} className="s07__card s07__pwa">
          <span className="s07__name">PWA adoption</span>
          <div className="s07__bars">
            <div>
              <span>Did not add the PWA icon</span>
              <i className="grow-x" style={{ '--w': 1 / 1.23, '--d': 6 }} />
              <b>baseline</b>
            </div>
            <div className="is-on">
              <span>Added the PWA icon</span>
              <i className="grow-x" style={{ '--w': 1, '--d': 6.4 }} />
              <b>+23%</b>
            </div>
          </div>
          <span className="s07__note">
            NSAT payment conversion across Study Buddy and Head Start. An observed difference, not proof of cause.
          </span>
        </In>
      </div>
      <In d={7} className="s07__to">
        <span className="s07__toLine" />
        <span>All three feed the same next step: the NSAT application and payment</span>
      </In>
    </div>
  );
}

/* --------------------------------------------------------- 08 Season scale */
export function Scale({ active }) {
  return (
    <div className="s08 pad">
      <In d={0} className="label">
        Season-wide scale
      </In>
      <In d={1} as="h2" className="h1">
        The season at a glance.
      </In>
      <div className="s08__rows">
        <In d={2} className="s08__row">
          <span className="s08__num">
            <Count to={909850} active={active} />
          </span>
          <span className="s08__what">unique top-of-funnel acquisitions</span>
          <i className="s08__bar grow-x" style={{ '--w': 1, '--d': 3 }} />
        </In>
        <In d={4} className="s08__row s08__row--payers">
          <span className="s08__num s08__num--accent">
            <Count to={15930} active={active} delay={700} />
          </span>
          <span className="s08__what">unique payers</span>
          <i className="s08__bar s08__bar--accent grow-x" style={{ '--w': 15930 / 909850, '--d': 5 }} />
          <span className="s08__zoom">to scale: 1.75% of the bar above</span>
        </In>
        <In d={6} className="s08__row s08__row--tx">
          <span className="s08__num s08__num--ghost">
            <Count to={20152} active={active} delay={1100} />
          </span>
          <span className="s08__what">payments, including retries</span>
          <span className="s08__txNote">Transactions, not students. Not part of the funnel above.</span>
        </In>
      </div>
      <In d={7} className="s08__derived">
        <span className="s08__pct">≈1.75%</span>
        <span>
          Unique top-of-funnel acquisitions → unique payers
          <small>Derived: 15,930 ÷ 909,850</small>
        </span>
      </In>
    </div>
  );
}

/* ------------------------------------------------------- 09 Referral growth */
export function Referral({ active }) {
  return (
    <div className="s09 pad">
      <In d={0} className="label">
        Referral growth
      </In>
      <In d={1} as="h2" className="h1 s09__title">
        Referral became a <span className="accent-text">high-intent</span> acquisition channel.
      </In>
      <div className="s09__body">
        <div className="s09__funnel">
          <In d={2} className="s09__step">
            <span className="s09__n">
              <Count to={3468} active={active} />
            </span>
            <span className="s09__l">unique users acquired through referral</span>
            <i className="grow-x" style={{ '--w': 1, '--d': 3 }} />
          </In>
          <In d={4} className="s09__step s09__step--paid">
            <span className="s09__n">
              <Count to={1274} active={active} delay={600} />
            </span>
            <span className="s09__l">paid</span>
            <i className="grow-x" style={{ '--w': 1274 / 3468, '--d': 5 }} />
          </In>
          <In d={6} className="s09__rate">
            <b>36.7%</b>
            <span>referral → paid conversion</span>
          </In>
        </div>
        <In d={5} className="s09__yoy">
          <span className="s09__yoyNum">+21%</span>
          <span className="s09__yoyL">Referral conversion, year over year</span>
          <span className="s09__yoyNote">Relative improvement. The previous year’s rate isn’t shown here.</span>
          <span className="s09__share">
            <b>9.38%</b> of all paid, as reported*
          </span>
        </In>
      </div>
      <In d={8} className="foot">
        *The base for “9.38% of all paid” is being confirmed: 1,274 is 8.0% of the 15,930 unique payers.
      </In>
    </div>
  );
}

/* ----------------------------------------------------- 10 Next-step improvements */
export function NextStep({ active }) {
  return (
    <div className="s10">
      <div className="s10__half pad">
        <In d={0} className="label">
          Improving the next step
        </In>
        <In d={1} as="h2" className="h2 s10__title">
          Small experience improvements can matter deeper in the funnel.
        </In>
        <In d={3} className="s10__case">
          <span className="s10__name">Notification centre</span>
          <div className="s10__cmp">
            <div>
              <i className="grow-y" style={{ '--h': 1 / 1.3, '--d': 4 }} />
              <span>Did not see it</span>
              <b>baseline</b>
            </div>
            <div className="is-on">
              <i className="grow-y" style={{ '--h': 1, '--d': 4.4 }} />
              <span>Saw it</span>
              <b>+30%</b>
            </div>
          </div>
          <p className="s10__note">
            Relative conversion of students who saw the notification centre vs those who did not. Observed, not causal;
            group sizes not in the source data.
          </p>
        </In>
      </div>
      <div className="s10__half s10__half--b pad">
        <In d={2} className="s10__name">
          Application page
        </In>
        <In d={3} className="s10__apply">
          <div className="s10__applyRow">
            <span className="s10__n">
              <Count to={33424} active={active} />
            </span>
            <span>unique visitors</span>
            <i className="grow-x" style={{ '--w': 1, '--d': 4 }} />
          </div>
          <div className="s10__applyRow s10__applyRow--paid">
            <span className="s10__n">
              <Count to={15930} active={active} delay={600} />
            </span>
            <span>unique payers</span>
            <i className="grow-x" style={{ '--w': 15930 / 33424, '--d': 5 }} />
          </div>
        </In>
        <In d={6} className="s10__big">
          <b>
            <Count to={47.7} decimals={1} active={active} delay={900} />%
          </b>
          <span>apply → paid conversion</span>
        </In>
      </div>
    </div>
  );
}

/* ------------------------------------------------- 11 Cross-functional leadership */
const LANES = [
  { k: 'Design', who: 'Me, design ownership', dots: 1, me: true },
  { k: 'Product', who: 'Product lead', dots: 1 },
  { k: 'Engineering', who: 'Senior developer + 8 engineers', dots: 9 },
  { k: 'Marketing', who: '~6 marketers', dots: 6, approx: true },
  { k: 'Content', who: 'Content writers' },
  { k: 'Academic', who: 'Academic and teaching teams' },
];

export function Leadership() {
  return (
    <div className="s11 pad">
      <div className="s11__text">
        <In d={0} className="label">
          Cross-functional leadership
        </In>
        <In d={1} as="h2" className="h1">
          The work only moved when the system moved.
        </In>
        <In d={3} as="p" className="body muted">
          I owned design, and stayed close to funnel quality and the student experience. Every discipline shaped the
          same journey.
        </In>
      </div>
      <div className="s11__lanes">
        {LANES.map((l, i) => (
          <In d={2 + i * 0.5} key={l.k} className={`s11__lane${l.me ? ' is-me' : ''}`}>
            <b>{l.k}</b>
            <span className="s11__who">{l.who}</span>
            <span className="s11__dots">
              {l.dots
                ? Array.from({ length: l.dots }, (_, j) => <i key={j} className={l.approx ? 'approx' : ''} />)
                : [0, 1, 2].map((j) => <i key={j} className="many" />)}
            </span>
            <span className="s11__link" />
          </In>
        ))}
        <svg className="s11__merge" viewBox="0 0 200 600" preserveAspectRatio="none" aria-hidden="true">
          {LANES.map((l, i) => (
            <path
              key={l.k}
              className="draw"
              pathLength="1"
              d={`M0 ${50 + i * 100} C 120 ${50 + i * 100}, 80 300, 200 300`}
              style={{ '--d': 5 + i * 0.3 }}
            />
          ))}
        </svg>
        <In d={7} className="s11__journey">
          <span>One student journey</span>
          <small>Discovery → Signup → Application → Payment → Exam</small>
        </In>
      </div>
    </div>
  );
}
