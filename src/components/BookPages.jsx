import { images } from '../data/about-images';
import avatar from '../assets/avatar-156.webp';
import examInterface from '../assets/resume/exam-interface.webp';
import academicCalendar from '../assets/case-studies/academic-calendar/workspace@1x.webp';
import maldives from '../assets/case-studies/lottiefiles-vision-pro/maldives@1x.webp';
import iconscout from '../assets/case-studies/iconscout-plugin/hero@1x.webp';
import changLa from '../assets/book/chang-la.webp';
import hamptaPass from '../assets/book/hampta-pass.webp';
import baliKecak from '../assets/book/bali-kecak.webp';
import desk from '../assets/book/desk.webp';
import kualaLumpur from '../assets/book/kuala-lumpur.webp';
import workation2023 from '../assets/book/workation-2023.webp';
import maldivesTeam from '../assets/book/maldives-team.webp';
import kangYatseTeam from '../assets/book/kang-yatse-team.webp';
import ootyWorkation from '../assets/book/ooty-workation.webp';
import bikeCare from '../assets/book/bike-care.webp';
import './BookPages.css';

// The pages of the profile book: a scrapbook of the last few years, one spread per year, opened
// by a hello and a letter. Each page is 460 x 654 and laid out freely (x / y in px), like things
// stuck into a notebook. Items drop in one after another (`d` = order) when their spread opens;
// photos straighten and lift on hover, notes wiggle, doodles draw themselves.

const at = ({ x, y, w, r = 0, d = 0, z }) => ({ left: x, top: y, width: w, '--r': `${r}deg`, '--d': d, zIndex: z });

// A taped photo: a polaroid with a handwritten caption, or `plain` with a thin white border.
function Snap({ src, alt, h, caption, tape = 'yellow', plain, ...pos }) {
  return (
    <figure className={`sb-snap sb-in${plain ? ' sb-snap--plain' : ''}`} style={at(pos)}>
      <span className={`sb-tape sb-tape--${tape}`} />
      <img src={src} alt={alt} style={{ height: h }} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Note({ color = 'yellow', children, ...pos }) {
  return (
    <div className={`sb-note sb-note--${color} sb-in`} style={at(pos)}>
      {children}
    </div>
  );
}

function Text({ hand, size, children, ...pos }) {
  return (
    <p className={`sb-text${hand ? ' sb-text--hand' : ''} sb-in`} style={{ ...at(pos), fontSize: size }}>
      {children}
    </p>
  );
}

// A big handwritten year with a scribbled ring that draws itself.
function Year({ children, ...pos }) {
  return (
    <div className="sb-year sb-in" style={at(pos)}>
      <svg className="sb-draw" viewBox="0 0 200 90" aria-hidden="true">
        <path d="M18 52 C 14 18, 120 6, 176 26 C 206 38, 186 78, 104 82 C 40 86, 6 70, 22 40 C 30 26, 70 14, 120 14" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

const DOODLES = {
  arrow: { box: '0 0 120 90', d: 'M8 10 C 30 70, 70 80, 106 62 M92 52 L 108 62 L 96 76' },
  underline: { box: '0 0 300 20', d: 'M4 12 C 60 4, 120 18, 180 10 S 270 6, 296 12' },
  heart: { box: '0 0 60 54', d: 'M30 50 C 6 34, 2 18, 12 10 C 22 2, 30 10, 30 18 C 30 10, 38 2, 48 10 C 58 18, 54 34, 30 50 Z' },
  star: { box: '0 0 50 50', d: 'M25 4 L 30 19 L 46 19 L 33 29 L 38 45 L 25 35 L 12 45 L 17 29 L 4 19 L 20 19 Z' },
  sun: { box: '0 0 60 60', d: 'M30 18 a12 12 0 1 0 0.1 0 M30 4 v8 M30 48 v8 M4 30 h8 M48 30 h8 M11 11 l6 6 M43 43 l6 6 M49 11 l-6 6 M17 43 l-6 6' },
  squiggle: { box: '0 0 120 30', d: 'M4 16 q 10 -14 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0' },
};

function Doodle({ kind, color, ...pos }) {
  const { box, d } = DOODLES[kind];
  return (
    <svg
      className={`sb-doodle sb-doodle--${kind} sb-draw sb-in`}
      style={{ ...at(pos), color }}
      viewBox={box}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function Folio({ n }) {
  return <span className="sb-folio">{n}</span>;
}

/* ---------- Pages 1-2: hello and a letter ---------- */

export function Preface() {
  return (
    <div className="sb-page">
      <Text hand size={56} x={36} y={30} w={390} d={0}>
        hello there!
      </Text>
      <Doodle kind="underline" x={40} y={98} w={230} d={1} color="#f2a541" />
      <Text x={38} y={132} w={380} d={2}>
        This isn’t a résumé. It’s the scrapbook I’d hand you over coffee: the work I’m proud of, the roads that
        changed me, and the people in between. One spread per year, newest first.
      </Text>
      <Note x={52} y={268} w={236} r={-3} d={3}>
        <p className="sb-note__title">inside this book</p>
        <ul className="sb-checklist">
          <li>2026 · Ladakh, Hampta, Newton</li>
          <li>2025 · a calendar, Langkawi</li>
          <li>2024 · Vision Pro, Kang Yatse</li>
          <li>2023 · IconScout, Everest, Bali</li>
        </ul>
      </Note>
      <Doodle kind="star" x={330} y={262} w={40} r={12} d={4} color="#e8b72f" />
      <Doodle kind="star" x={372} y={312} w={24} r={-10} d={5} color="#ef8aa8" />
      <Snap
        src={images.photo10.src}
        alt="The Milky Way over a dark ridge above Turtuk"
        caption="Turtuk, at night"
        h={110}
        x={52}
        y={448}
        w={150}
        r={-6}
        d={5}
        tape="blue"
      />
      <Doodle kind="arrow" x={270} y={462} w={120} r={4} d={6} color="#3a352d" />
      <Text hand size={30} x={250} y={560} w={190} r={-5} d={7}>
        turn the page!
      </Text>
      <Folio n="1" />
    </div>
  );
}

export function Letter() {
  return (
    <div className="sb-page">
      <div className="sb-lined sb-in" style={at({ x: 30, y: 56, w: 318, r: -1.5, d: 0 })}>
        <p className="sb-lined__hi">Dear reader,</p>
        <p>
          Thank you for opening this. Somewhere between your tabs and your next meeting, you chose to spend a few
          minutes here, and that means a lot.
        </p>
        <p>
          Design, to me, is a kind of hospitality, so think of this as me pulling up a chair for you. Linger where
          you like, and if something sparks a thought, write to me. I read every note.
        </p>
        <p className="sb-lined__sign">With gratitude,</p>
        <p className="sb-lined__name">Gaurav</p>
      </div>
      <img className="sb-stamp sb-in" src={avatar} alt="" style={at({ x: 350, y: 34, w: 80, r: 7, d: 1 })} />
      <Snap
        src={desk}
        alt="Home desk with a monitor, laptop, prayer flags and warm lights"
        caption="where this book was made"
        h={168}
        x={250}
        y={418}
        w={170}
        r={5}
        d={2}
        tape="pink"
      />
      <Doodle kind="heart" x={70} y={520} w={46} r={-12} d={3} color="#e8576f" />
      <Folio n="2" />
    </div>
  );
}

/* ---------- 2026 ---------- */

export function Y2026Left() {
  return (
    <div className="sb-page">
      <Year x={30} y={18} w={190} r={-4} d={0}>
        2026
      </Year>
      <Snap
        src={changLa}
        alt="Holding the Indian flag behind the motorcycle at the yellow Chang La milestone"
        caption="Chang La, 17,688 ft"
        h={300}
        x={28}
        y={112}
        w={236}
        r={-3}
        d={1}
      />
      <Text x={286} y={126} w={150} d={2}>
        Two months on the bike across Ladakh: 6,000 km, 20+ high passes, all the way up to Umling La.
      </Text>
      <Doodle kind="arrow" x={300} y={262} w={90} r={150} d={3} color="#3a352d" />
      <Snap
        src={hamptaPass}
        alt="Standing on a rock above the river valley on the Hampta Pass trek"
        caption="then Hampta Pass, on foot!"
        h={170}
        x={238}
        y={330}
        w={192}
        r={6}
        d={4}
        tape="mint"
      />
      <Text hand size={30} x={40} y={560} w={260} r={-2} d={5}>
        thin air, clear head
      </Text>
      <Folio n="3" />
    </div>
  );
}

export function Y2026Right() {
  return (
    <div className="sb-page">
      <span className="sb-label sb-in" style={at({ x: 36, y: 34, r: -3, d: 0 })}>
        work
      </span>
      <Text hand size={38} x={36} y={58} w={400} d={1}>
        growth season @ Newton
      </Text>
      <Doodle kind="squiggle" x={40} y={108} w={160} d={2} color="#4c7dff" />
      <Snap
        src={examInterface}
        alt="NSAT entrance exam interface on desktop and mobile"
        h={210}
        x={34}
        y={140}
        w={390}
        r={-1.5}
        d={3}
        tape="blue"
        plain
      />
      <Note x={30} y={378} w={136} r={-5} d={4}>
        <b>₹375+ Cr</b>revenue impact
      </Note>
      <Note x={174} y={386} w={116} r={3} d={5} color="pink">
        <b>9 lakh+</b>students acquired
      </Note>
      <Note x={298} y={374} w={130} r={-2} d={6} color="mint">
        <b>20,000+</b>exam registrations
      </Note>
      <Text x={36} y={508} w={250} d={7}>
        Led design for the admissions season, from the website and referrals to an exam built to stay calm under
        pressure.
      </Text>
      <Snap
        src={images.altitude1.src}
        alt="At the Umling La sign with the motorcycle"
        caption="Umling La!"
        h={96}
        x={316}
        y={494}
        w={112}
        r={7}
        d={8}
        tape="pink"
      />
      <Folio n="4" />
    </div>
  );
}

/* ---------- 2025 ---------- */

export function Y2025Left() {
  return (
    <div className="sb-page">
      <Year x={30} y={18} w={190} r={3} d={0}>
        2025
      </Year>
      <Text hand size={34} x={36} y={108} w={400} d={1}>
        one calendar for a whole campus
      </Text>
      <Snap
        src={academicCalendar}
        alt="Academic calendar workspace with classes, assignments and notes"
        h={180}
        x={34}
        y={160}
        w={310}
        r={2}
        d={2}
        tape="blue"
        plain
      />
      <Text x={36} y={376} w={226} d={3}>
        Classes, labs, exams and mentor sessions lived in a dozen places. I pulled them into one calendar that
        students, teachers and mentors could trust.
      </Text>
      <Snap
        src={bikeCare}
        alt="The Triumph motorcycle, freshly washed, on a stand at home"
        caption="i take care of my bike"
        h={150}
        x={272}
        y={362}
        w={164}
        r={-5}
        d={4}
        tape="mint"
      />
      <Doodle kind="heart" x={400} y={536} w={26} r={10} d={5} color="#e8576f" />
      <Text hand size={26} x={36} y={574} w={300} r={-1.5} d={6}>
        “if it’s on the calendar, it’s real”
      </Text>
      <Folio n="5" />
    </div>
  );
}

export function Y2025Right() {
  return (
    <div className="sb-page">
      <Text hand size={42} x={36} y={30} w={330} d={0}>
        a week in Langkawi
      </Text>
      <Doodle kind="sun" x={370} y={26} w={52} d={1} color="#f2a541" />
      <Snap
        src={images.photo3.src}
        alt="Boat passing Kilim Geoforest Park on turquoise water"
        h={170}
        x={30}
        y={100}
        w={230}
        r={-3}
        d={2}
        plain
      />
      <Snap
        src={images.photo4.src}
        alt="Heron walking along a wooden jetty"
        h={136}
        x={248}
        y={136}
        w={180}
        r={4}
        d={3}
        tape="pink"
        plain
      />
      <Snap
        src={images.nomad3.src}
        alt="Islands on a calm sea under a cloudy sky"
        h={130}
        x={84}
        y={292}
        w={220}
        r={2}
        d={4}
        tape="mint"
        plain
      />
      <div className="sb-ticket sb-in" style={at({ x: 300, y: 318, w: 132, r: -6, d: 5 })}>
        <span>boarding</span>
        <b>KUL → LGK</b>
        <span>7 days · seat: window</span>
      </div>
      <Text x={36} y={456} w={390} d={6}>
        Seven slow days of mangroves, island hops and long ferry rides. No roadmap, no standups, just turquoise
        water.
      </Text>
      <Text hand size={28} x={40} y={556} w={300} r={-2} d={7}>
        would go back tomorrow
      </Text>
      <Folio n="6" />
    </div>
  );
}

/* ---------- 2024 ---------- */

export function Y2024Left() {
  return (
    <div className="sb-page">
      <Year x={30} y={18} w={190} r={-3} d={0}>
        2024
      </Year>
      <Snap
        src={maldives}
        alt="Wearing Apple Vision Pro at Oaga Art Resort, Maldives"
        caption="wearing my own work, Maldives"
        h={150}
        x={30}
        y={110}
        w={250}
        r={-2}
        d={1}
      />
      <Text hand size={30} x={296} y={118} w={146} d={2}>
        LottieFiles × Vision Pro
      </Text>
      <Text x={298} y={196} w={140} d={3}>
        Motion, in three dimensions, built from a rough prototype.
      </Text>
      <Snap
        src={maldivesTeam}
        alt="The LottieFiles team on a beach in the Maldives at night"
        caption="the LottieFiles fam"
        h={160}
        x={30}
        y={350}
        w={262}
        r={2}
        d={4}
        tape="pink"
      />
      <Snap
        src={ootyWorkation}
        alt="Laptop, coffee and sandals on the grass in Ooty"
        caption="workation, Ooty"
        h={176}
        x={306}
        y={318}
        w={124}
        r={6}
        d={5}
        tape="mint"
      />
      <Folio n="7" />
    </div>
  );
}

export function Y2024Right() {
  return (
    <div className="sb-page">
      <span className="sb-label sb-in" style={at({ x: 36, y: 30, r: -3, d: 0 })}>
        on stage
      </span>
      <Snap
        src={images.talks3.src}
        alt="Presenting a talk on motion and engagement"
        h={92}
        x={30}
        y={64}
        w={132}
        r={-4}
        d={1}
        plain
      />
      <Snap
        src={images.talks2.src}
        alt="Answering questions at a design meetup"
        h={92}
        x={166}
        y={74}
        w={124}
        r={3}
        d={2}
        tape="blue"
        plain
      />
      <ul className="sb-list sb-in" style={at({ x: 304, y: 54, w: 140, d: 3 })}>
        <li>Razorpay</li>
        <li>Zeta</li>
        <li>CRED</li>
        <li>Cars24</li>
        <li>After Office Hours</li>
        <li>Delhi Designathon</li>
      </ul>
      <Snap
        src={kangYatseTeam}
        alt="The Kang Yatse II crew below the snow-capped peak"
        caption="Kang Yatse II crew"
        h={190}
        x={30}
        y={234}
        w={276}
        r={-2}
        d={4}
      />
      <Snap
        src={kualaLumpur}
        alt="The Petronas Towers lit up at night"
        caption="first time in Malaysia"
        h={150}
        x={318}
        y={272}
        w={114}
        r={6}
        d={5}
        tape="pink"
      />
      <Text x={36} y={520} w={390} d={6}>
        Nine days through Markha Valley for a 6,250 m summit. We turned back at 5,791 m, and I’d do it all again.
      </Text>
      <Folio n="8" />
    </div>
  );
}

/* ---------- 2023 ---------- */

export function Y2023Left() {
  return (
    <div className="sb-page">
      <Year x={30} y={18} w={190} r={2} d={0}>
        2023
      </Year>
      <Snap
        src={iconscout}
        alt="IconScout plugin for Figma: millions of design assets"
        h={174}
        x={30}
        y={110}
        w={300}
        r={-2}
        d={1}
        tape="blue"
        plain
      />
      <div className="sb-badge sb-in" style={at({ x: 330, y: 84, w: 104, r: 8, d: 2 })}>
        <span>
          #14
          <small>on Figma!</small>
        </span>
      </div>
      <Text hand size={30} x={36} y={316} w={236} d={3}>
        300 → 1,400+
        <br />
        daily users
      </Text>
      <Text x={38} y={392} w={226} d={4}>
        It started as a fix for a problem I had myself. 17 updates later, it’s trusted by 1M+ designers.
      </Text>
      <Snap
        src={workation2023}
        alt="Working on a laptop in a café strung with flags from around the world"
        caption="workation mode"
        h={150}
        x={276}
        y={330}
        w={162}
        r={5}
        d={5}
        tape="pink"
      />
      <Doodle kind="star" x={60} y={520} w={34} r={-8} d={6} color="#e8b72f" />
      <Text hand size={24} x={100} y={530} w={280} r={-3} d={7}>
        built for designers, by one
      </Text>
      <Folio n="9" />
    </div>
  );
}

export function Y2023Right() {
  return (
    <div className="sb-page">
      <Text hand size={38} x={36} y={30} w={400} d={0}>
        Everest Base Camp, then Bali
      </Text>
      <Snap
        src={images.ebc1.src}
        alt="Holding the Indian flag at the Everest Base Camp rock"
        caption="5,364 m!"
        h={150}
        x={30}
        y={96}
        w={226}
        r={-4}
        d={1}
      />
      <Snap
        src={baliKecak}
        alt="Kecak fire dance at Uluwatu, on a clifftop above the sea at sunset"
        caption="Kecak at Uluwatu, Bali"
        h={150}
        x={206}
        y={242}
        w={226}
        r={4}
        d={2}
        tape="mint"
      />
      <Text x={36} y={460} w={390} d={3}>
        A dream come true among five of the world’s highest peaks. Months later, the team flew to Bali for sunsets
        and stories that never make it into a retro.
      </Text>
      <Text hand size={48} x={140} y={540} w={200} r={-4} d={4}>
        the end
      </Text>
      <Doodle kind="heart" x={290} y={552} w={34} r={12} d={5} color="#e8576f" />
      <Text hand size={18} x={128} y={604} w={240} d={6}>
        press next to close the book
      </Text>
      <Folio n="10" />
    </div>
  );
}

// The back of the last leaf is never turned to; it stays a plain endpaper.
export function Endpaper() {
  return <div className="sb-page" />;
}
