import { Count, Hand, In, Slot } from './kit';
import nstLogo from '../../assets/logos/nst.svg?raw';
import examDesktop from '../../assets/deck/exam-desktop.webp';

/* 01 Cover ----------------------------------------------------------------- */
export function Cover() {
  return (
    <div className="body s01">
      <div className="s01__text">
        <In d={0} className="t">
          Growth season 2025–26
        </In>
        <In d={1} className="t m">
          Newton School of Technology
        </In>
        <In d={3} as="p" className="p s01__lede">
          Product design, growth systems, and the first high-stakes product experience.
        </In>
      </div>
      <In d={2} className="tile s01__shot">
        <img src={examDesktop} alt="The NSAT exam interface" />
      </In>
      <In d={4} className="s01__by">
        <span>Gaurav Kumar</span>
        <span className="m">Senior Product Designer</span>
      </In>
    </div>
  );
}

/* 02 The big picture --------------------------------------------------------- */
const STEPS = ['Discovery', 'Acquisition products', 'Signup', 'Application', 'Payment', 'Exam'];

export function BigPicture() {
  return (
    <div className="body s02">
      <In d={0}>
        <Slot id="season-banner" hint="A wide filler: campus, students, an event from the season" ratio="4 / 1" />
      </In>
      <In d={1} className="t s02__t">
        The season was a system, <span className="m">not a campaign.</span>
      </In>
      <div className="s02__line">
        {STEPS.map((s, i) => (
          <In d={2 + i * 0.4} key={s} className={`s02__step${i === 5 ? ' is-exam' : ''}`}>
            <i />
            {s}
          </In>
        ))}
      </div>
      <div className="s02__acts">
        <In d={5} className="s02__act">
          <span className="m">Act I</span> Building the growth system
        </In>
        <In d={5.5} className="s02__act s02__act--two">
          <span className="m">Act II</span> The exam experience
        </In>
      </div>
    </div>
  );
}

/* 03 Student journey ------------------------------------------------------- */
const MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const CAMPUSES = ['Delhi', 'Pune', 'Bengaluru', 'Hyderabad'];

export function Journey() {
  return (
    <div className="body s03">
      <In d={0} className="t">
        A high-intent journey, <span className="m">with many handoffs.</span>
      </In>
      <In d={1} className="s03__months">
        {MONTHS.map((m, i) => (
          <span key={m} className={i >= 3 && i <= 6 ? 'is-peak' : ''}>
            {m}
          </span>
        ))}
        <Hand className="s03__hand">discovery peaks here</Hand>
      </In>
      <In d={2} as="p" className="p s03__flow">
        Discovery → signup → application form → NSAT payment → exam
      </In>
      <div className="s03__campuses">
        {CAMPUSES.map((c, i) => (
          <In d={3 + i * 0.4} key={c}>
            <Slot id={`campus-${c.toLowerCase()}`} hint={`${c} campus photo`} ratio="4 / 3" caption={c} />
          </In>
        ))}
      </div>
    </div>
  );
}

/* 04 Design function ------------------------------------------------------ */
export function DesignFunction() {
  return (
    <div className="body s04 split">
      <div>
        <In d={0} className="t">
          Five verticals.
          <br />
          <span className="m">One design function.</span>
        </In>
        <In d={2} as="p" className="p">
          There was no design team when I joined. I built and led one.
        </In>
        <In d={3} as="p" className="p s04__with">
          Working with product, engineering, marketing, content and academics.
        </In>
      </div>
      <In d={1}>
        <Slot id="design-team" hint="The design team, or a working session" ratio="4 / 5" />
      </In>
    </div>
  );
}

/* 05 Brand ----------------------------------------------------------------- */
export function Brand() {
  return (
    <div className="body s05">
      <In d={0} className="t">
        First, one recognisable brand. <span className="m">September 2025.</span>
      </In>
      <div className="s05__grid">
        <In d={1} className="tile s05__logo">
          <span dangerouslySetInnerHTML={{ __html: nstLogo }} />
        </In>
        <In d={1.5}>
          <Slot id="brand-guidelines" hint="A page from the brand guidelines" ratio="3 / 4" caption="Guidelines" />
        </In>
        <In d={2}>
          <Slot id="brand-campus" hint="A campus poster or banner" ratio="3 / 4" caption="Campus" />
        </In>
        <In d={2.5}>
          <Slot id="brand-social" hint="A social or ad creative" ratio="3 / 4" caption="Social" />
        </In>
        <In d={3}>
          <Slot id="brand-portal" hint="The central brand portal" ratio="3 / 4" caption="Brand portal" />
        </In>
      </div>
      <In d={4} as="p" className="p s05__p">
        Logos, colours, type, photography and product screenshots, from one portal.
      </In>
    </div>
  );
}

/* 06 Website ----------------------------------------------------------------- */
export function Website({ active }) {
  const y = (v) => 300 - ((v - 20) / 5) * 270;
  return (
    <div className="body s06">
      <In d={0} className="t">
        18 pages in 21 days. <span className="m">Signups went up.</span>
      </In>
      <div className="s06__row">
        <In d={1}>
          <Slot id="website-home" hint="The redesigned homepage, desktop" ratio="16 / 10" />
        </In>
        <In d={2} className="s06__chart">
          <svg viewBox="0 0 420 330" aria-label="Signup conversion rose from 21.3% to 23.6%">
            <line className="s06__base" x1="40" x2="400" y1={y(20)} y2={y(20)} />
            <path
              className="s06__slope draw"
              pathLength="1"
              d={`M70 ${y(21.3)} L360 ${y(23.6)}`}
              style={{ '--d': 3 }}
            />
            <circle className="s06__a" cx="70" cy={y(21.3)} r="7" />
            <circle className="s06__b" cx="360" cy={y(23.6)} r="9" />
            <text x="70" y={y(21.3) + 40} textAnchor="middle">
              21.3%
            </text>
            <text className="s06__bt" x="360" y={y(23.6) - 22} textAnchor="middle">
              23.6%
            </text>
          </svg>
          <span className="n s06__n">
            +<Count to={2.3} decimals={1} active={active} delay={700} /> pp
          </span>
          <span className="cap">signup conversion, at 98% confidence</span>
        </In>
      </div>
    </div>
  );
}

/* 07 Top-of-funnel products ------------------------------------------------ */
export function Products({ active }) {
  return (
    <div className="body s07">
      <In d={0} className="t">
        Products that created demand <span className="m">before anyone applied.</span>
      </In>
      <div className="s07__row">
        <In d={1} className="s07__col">
          <Slot id="study-buddy" hint="Study Buddy, phone screen" ratio="9 / 16" />
          <span className="s07__name">Study Buddy</span>
          <span className="cap">
            <Count to={110589} active={active} /> users · 14.4% went on to pay for NSAT
          </span>
        </In>
        <In d={2} className="s07__col">
          <Slot id="head-start" hint="Head Start course, phone screen" ratio="9 / 16" />
          <span className="s07__name">Head Start</span>
          <span className="cap">Free coding courses: Python, C++, fundamentals</span>
        </In>
        <In d={3} className="s07__col">
          <Slot id="pwa-install" hint="The PWA on a home screen" ratio="9 / 16" />
          <span className="s07__name">The PWA</span>
          <span className="cap">Students who installed it paid 23% more often. Observed, not causal.</span>
        </In>
      </div>
    </div>
  );
}

/* 08 Season at a glance ---------------------------------------------------- */
export function Scale({ active }) {
  return (
    <div className="body s08">
      <In d={0} className="t">
        The season at a glance.
      </In>
      <div className="s08__rows">
        <In d={1} className="s08__row">
          <span className="n">
            <Count to={909850} active={active} />
          </span>
          <span className="cap">unique top-of-funnel acquisitions</span>
          <i className="s08__bar grow-x" style={{ '--w': 1, '--d': 2 }} />
        </In>
        <In d={3} className="s08__row">
          <span className="n a">
            <Count to={15930} active={active} delay={600} />
          </span>
          <span className="cap">unique payers, about 1.75% of the line above, drawn to scale</span>
          <i className="s08__bar s08__bar--a grow-x" style={{ '--w': 15930 / 909850, '--d': 4 }} />
        </In>
        <In d={5} className="s08__row s08__row--tx">
          <span className="n m">
            <Count to={20152} active={active} delay={1000} />
          </span>
          <span className="cap">payments</span>
          <Hand className="s08__hand">includes retries, so these are payments, not people</Hand>
        </In>
      </div>
    </div>
  );
}

/* 09 Referral ------------------------------------------------------------- */
export function Referral({ active }) {
  return (
    <div className="body s09 split">
      <div>
        <In d={0} className="t">
          Referral brought <span className="m">the highest intent.</span>
        </In>
        <In d={2} className="s09__nums">
          <div>
            <span className="n">
              <Count to={3468} active={active} />
            </span>
            <span className="cap">came through referral</span>
          </div>
          <div>
            <span className="n">
              <Count to={1274} active={active} delay={500} />
            </span>
            <span className="cap">paid</span>
          </div>
          <div>
            <span className="n a">36.7%</span>
            <span className="cap">referral → paid</span>
          </div>
        </In>
        <In d={4} as="p" className="p">
          Referral conversion improved 21% year over year.
        </In>
      </div>
      <In d={1}>
        <Slot id="referral" hint="The referral screen or invite flow" ratio="4 / 5" />
      </In>
    </div>
  );
}

/* 10 The next step ---------------------------------------------------------- */
export function NextStep({ active }) {
  return (
    <div className="body s10">
      <In d={0} className="t">
        Small changes, <span className="m">deeper in the funnel.</span>
      </In>
      <div className="s10__row">
        <In d={1} className="s10__col">
          <Slot id="notification-centre" hint="The notification centre" ratio="16 / 9" />
          <span className="s07__name">Notification centre</span>
          <span className="cap">Students who saw it converted 30% higher. Observed, not causal.</span>
        </In>
        <In d={2} className="s10__col">
          <Slot id="application-page" hint="The application page" ratio="16 / 9" />
          <span className="s07__name">
            Application page · <span className="a">47.7%</span> apply → paid
          </span>
          <span className="cap">
            <Count to={33424} active={active} /> unique visitors → <Count to={15930} active={active} delay={300} />{' '}
            unique payers
          </span>
        </In>
      </div>
    </div>
  );
}

/* 11 Cross-functional ------------------------------------------------------ */
const TEAM = [
  ['Design', 'me'],
  ['Product', 'product lead'],
  ['Engineering', 'senior developer + 8 engineers'],
  ['Marketing', '~6 marketers'],
  ['Content', 'content writers'],
  ['Academic', 'academic and teaching teams'],
];

export function Leadership() {
  return (
    <div className="body s11 split">
      <In d={1}>
        <Slot id="team-working" hint="Cross-functional team, a review or launch moment" ratio="4 / 5" />
      </In>
      <div>
        <In d={0} className="t">
          The work only moved <span className="m">when the system moved.</span>
        </In>
        <In d={2} as="dl" className="s11__team">
          {TEAM.map(([k, v]) => (
            <div key={k} className={k === 'Design' ? 'is-me' : ''}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </In>
      </div>
    </div>
  );
}
