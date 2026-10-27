import { images } from '../data/about-images';
import avatar from '../assets/avatar-156.webp';
import examInterface from '../assets/resume/exam-interface.webp';
import academicCalendar from '../assets/case-studies/academic-calendar/workspace@1x.webp';
import maldives from '../assets/case-studies/lottiefiles-vision-pro/maldives@1x.webp';
import spatialHome from '../assets/case-studies/lottiefiles-vision-pro/spatial-home@1x.webp';
import iconscout from '../assets/case-studies/iconscout-plugin/hero@1x.webp';
import './BookPages.css';

// The pages of the profile book: a magazine of the last few years, one spread per year, opened
// by a preface and a letter. Each page is 460 x 654. Layouts mix work and life on purpose.

function Folio({ n, label }) {
  return (
    <footer className="mag-folio">
      <span>{n}</span>
      {label && <span>{label}</span>}
    </footer>
  );
}

function Photo({ src, alt, className = '', caption }) {
  return (
    <figure className={`mag-photo ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// A placeholder frame for photos still to come.
function Pending({ className = '', label }) {
  return (
    <figure className={`mag-photo mag-photo--pending ${className}`}>
      <span>{label}</span>
    </figure>
  );
}

/* ---------- Pages 1-2: preface and letter ---------- */

export function Preface() {
  return (
    <div className="mag-page mag-preface">
      <p className="mag-label">Preface</p>
      <h2 className="mag-h mag-h--xl">A few years, folded into pages.</h2>
      <p className="mag-p mag-dropcap">
        This is not a résumé. It is the scrapbook I would hand you over coffee: the work I am proud of, the roads
        that changed me, and the people I met in between.
      </p>
      <p className="mag-p">
        Each spread is one year, newest first. Some pages are about pixels, some about mountains, and most are a
        little of both, because that is how the years actually felt.
      </p>
      <p className="mag-contents-title mag-label">In this issue</p>
      <ol className="mag-contents">
        <li>
          <span>2026</span> Ladakh, and a growth season at Newton
        </li>
        <li>
          <span>2025</span> One calendar for a campus, a week in Langkawi
        </li>
        <li>
          <span>2024</span> Vision Pro, the Maldives, and many stages
        </li>
        <li>
          <span>2023</span> IconScout on Figma, Bali with the team
        </li>
      </ol>
      <Folio n="1" />
    </div>
  );
}

export function Letter() {
  return (
    <div className="mag-page mag-letter">
      <img className="mag-letter__stamp" src={avatar} alt="" />
      <p className="mag-label">A note</p>
      <p className="mag-letter__salutation">Dear reader,</p>
      <p className="mag-p">
        Thank you for opening this. Somewhere between your tabs and your next meeting, you chose to spend a few
        minutes here, and that means more than you might think.
      </p>
      <p className="mag-p">
        I have always believed good design is a kind of hospitality. So consider this my way of pulling up a chair
        for you. Turn the pages slowly, linger where you like, and if something sparks a thought, write to me. I
        read every note.
      </p>
      <p className="mag-letter__sign">With gratitude,</p>
      <p className="mag-letter__name">Gaurav Kumar</p>
      <p className="mag-caption">Bangalore</p>
      <Folio n="2" />
    </div>
  );
}

/* ---------- 2026 ---------- */

export function Y2026Left() {
  return (
    <div className="mag-page mag-bleed">
      <Photo
        src={images.altitude2.src2x}
        alt="Motorcycle on an empty road through the Nubra Valley under storm clouds"
        className="mag-photo--full"
      />
      <div className="mag-bleed__shade" />
      <p className="mag-year mag-year--light">2026</p>
      <div className="mag-bleed__text">
        <p className="mag-label mag-label--light">Travel</p>
        <h2 className="mag-h mag-h--light">Six thousand kilometres of Ladakh</h2>
        <p className="mag-p mag-p--light">
          Two months on a motorcycle across Zanskar, Nubra and Changthang, over 20+ high passes and up to Umling
          La at 19,024 ft. Thin air, long silences, and the clearest head I have had in years.
        </p>
      </div>
      <Folio n="3" label="Nubra Valley" />
    </div>
  );
}

export function Y2026Right() {
  return (
    <div className="mag-page">
      <p className="mag-label">Work · Newton School of Technology</p>
      <h2 className="mag-h">A growth season, designed end to end</h2>
      <p className="mag-p">
        I led design for the admissions season, from the website and referrals to the exam itself. The NSAT exam
        interface had to stay calm under pressure for thousands of students at once, on any screen.
      </p>
      <Photo src={examInterface} alt="NSAT entrance exam interface on desktop and mobile" className="mag-photo--wide" />
      <dl className="mag-stats">
        <div>
          <dt>₹375+ Cr</dt>
          <dd>revenue impact</dd>
        </div>
        <div>
          <dt>9 lakh+</dt>
          <dd>students acquired</dd>
        </div>
        <div>
          <dt>20,000+</dt>
          <dd>exam registrations</dd>
        </div>
      </dl>
      <figure className="mag-polaroid mag-polaroid--corner">
        <img src={images.altitude1.src} alt="At the Umling La sign with the motorcycle" />
        <figcaption>Umling La</figcaption>
      </figure>
      <Folio n="4" label="2026" />
    </div>
  );
}

/* ---------- 2025 ---------- */

export function Y2025Left() {
  return (
    <div className="mag-page">
      <p className="mag-year">2025</p>
      <p className="mag-label">Work · Academic Calendar</p>
      <h2 className="mag-h">One calendar for a whole campus</h2>
      <p className="mag-p mag-dropcap">
        Classes, labs, exams and mentor sessions lived in a dozen places. I designed a single academic calendar
        that students, teachers and mentors could all trust, across every business vertical.
      </p>
      <Photo
        src={academicCalendar}
        alt="Academic calendar workspace with weekly classes, assignments and notes"
        className="mag-photo--wide"
      />
      <blockquote className="mag-quote">“If it is on the calendar, it is real.”</blockquote>
      <Folio n="5" label="2025" />
    </div>
  );
}

export function Y2025Right() {
  return (
    <div className="mag-page mag-langkawi">
      <p className="mag-label">Travel · Malaysia</p>
      <h2 className="mag-h">A week in Langkawi</h2>
      <div className="mag-collage">
        <Photo src={images.photo3.src} alt="Boat passing Kilim Geoforest Park" className="mag-collage__a" />
        <Photo src={images.photo4.src} alt="Heron on a wooden jetty" className="mag-collage__b" />
        <Photo src={images.nomad3.src} alt="Islands on a calm sea" className="mag-collage__c" />
      </div>
      <p className="mag-p">
        Seven slow days of mangroves, island hops and long ferry rides. No roadmap, no standups, just turquoise
        water and a camera that never left my hand.
      </p>
      <p className="mag-caption">Kilim Geoforest Park · the jetty at dusk · Strait of Malacca</p>
      <Folio n="6" label="Langkawi" />
    </div>
  );
}

/* ---------- 2024 ---------- */

export function Y2024Left() {
  return (
    <div className="mag-page mag-split">
      <div className="mag-split__top">
        <Photo src={maldives} alt="Wearing Apple Vision Pro at Oaga Art Resort, Maldives" className="mag-photo--full" />
        <p className="mag-year mag-year--light mag-year--overlay">2024</p>
      </div>
      <div className="mag-split__body">
        <p className="mag-label">Work · LottieFiles for Vision Pro</p>
        <h2 className="mag-h">Motion, in three dimensions</h2>
        <p className="mag-p">
          I took a rough prototype and shaped it into LottieFiles for Apple Vision Pro, proving motion is not a
          limitation in spatial design. Then I finally wore one myself, in the Maldives, and it felt like magic.
        </p>
        <p className="mag-caption">Oaga Art Resort, Maldives</p>
      </div>
      <Folio n="7" label="2024" />
    </div>
  );
}

export function Y2024Right() {
  return (
    <div className="mag-page">
      <p className="mag-label">On stage</p>
      <h2 className="mag-h">A year of speaking</h2>
      <div className="mag-grid3">
        <Photo src={images.talks3.src} alt="Presenting a talk on motion and engagement" />
        <Photo src={images.talks2.src} alt="Answering questions at a design meetup" />
        <Photo src={images.talks1.src} alt="Group photo at Delhi Designathon" />
      </div>
      <p className="mag-p">
        From community meetups to company stages, I shared what I had learnt about motion, craft and building in
        public. The questions afterwards were always the best part.
      </p>
      <ul className="mag-ticket">
        <li>Razorpay</li>
        <li>Zeta</li>
        <li>CRED</li>
        <li>Cars24</li>
        <li>After Office Hours</li>
        <li>Delhi Designathon</li>
      </ul>
      <figure className="mag-polaroid mag-polaroid--small">
        <img src={spatialHome} alt="LottieFiles on the Vision Pro home view" />
        <figcaption>visionOS</figcaption>
      </figure>
      <Folio n="8" label="Speaking" />
    </div>
  );
}

/* ---------- 2023 ---------- */

export function Y2023Left() {
  return (
    <div className="mag-page">
      <p className="mag-year">2023</p>
      <p className="mag-label">Work · IconScout plugin</p>
      <h2 className="mag-h">Rank #14 among Figma plugins</h2>
      <Photo src={iconscout} alt="IconScout plugin for Figma: millions of design assets" className="mag-photo--wide" />
      <p className="mag-p">
        It started as a fix for a problem I had myself. Over six months we shipped 17 meaningful updates and grew
        organically to a plugin trusted by more than a million designers.
      </p>
      <dl className="mag-stats">
        <div>
          <dt>300 → 1,400+</dt>
          <dd>daily users</dd>
        </div>
        <div>
          <dt>17</dt>
          <dd>feature updates</dd>
        </div>
        <div>
          <dt>1M+</dt>
          <dd>designers</dd>
        </div>
      </dl>
      <Folio n="9" label="2023" />
    </div>
  );
}

export function Y2023Right() {
  return (
    <div className="mag-page mag-bali">
      <p className="mag-label">Travel · Indonesia</p>
      <h2 className="mag-h">Bali, with the team</h2>
      <div className="mag-scrap">
        <Pending className="mag-scrap__a" label="Bali photo" />
        <Pending className="mag-scrap__b" label="Team photo" />
      </div>
      <p className="mag-p">
        The people you build with become the people you travel with. Temples at sunrise, rice terraces, too much
        nasi goreng and the kind of team stories that never make it into a retro.
      </p>
      <p className="mag-fin">Fin.</p>
      <p className="mag-caption mag-caption--center">Press next to close the book</p>
      <Folio n="10" label="Bali" />
    </div>
  );
}

// The back of the last leaf is never turned to; it stays a plain endpaper.
export function Endpaper() {
  return <div className="mag-page mag-endpaper" />;
}
