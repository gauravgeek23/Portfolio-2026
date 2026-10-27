import academicCalendar from '../assets/work/academic-calendar-1600.webp';
import academicCalendarThumb from '../assets/resume/academic-calendar-thumb.webp';
import examInterface from '../assets/resume/exam-interface.webp';
import examInterfaceThumb from '../assets/resume/exam-interface-thumb.webp';
import iconscout from '../assets/case-studies/iconscout-plugin/hero@2x.webp';
import iconscoutThumb from '../assets/resume/iconscout-thumb.webp';
import visionPro from '../assets/work/lottiefiles-vision-pro-1600.webp';
import visionProThumb from '../assets/resume/vision-pro-thumb.webp';
import topprAnswr from '../assets/resume/toppr-answr.webp';
import topprAnswrThumb from '../assets/resume/toppr-answr-thumb.webp';
import uranium from '../assets/resume/uranium.webp';
import uraniumThumb from '../assets/resume/uranium-thumb.webp';
import friction from '../assets/resume/friction.webp';
import frictionThumb from '../assets/resume/friction-thumb.webp';
import igloo from '../assets/resume/igloo.webp';
import iglooThumb from '../assets/resume/igloo-thumb.webp';

// Resume content. Each entry renders as a row: details on the left, bullet points on the right,
// with optional `gallery` thumbnails under the points (they open in the overlay as a set).
// Each image: a 16:9 `thumb` for the small card and the full-size `src` for the enlarged view.
export const experience = [
  {
    title: 'Newton School of Technology',
    lines: ['Senior Product Designer', 'Bangalore', '2024 - 2026'],
    points: [
      '₹375+ Cr revenue impact: led design at NST and built the team from scratch.',
      '9 lakh+ students acquired, 20,000+ entrance exam registrations in one season.',
      '1.1 lakh students on Study Buddy, with 14% converting to paid.',
      'Website, referral, and exam redesigns that lifted conversions by up to 30%.',
    ],
    gallery: [
      { thumb: academicCalendarThumb, src: academicCalendar, alt: 'Academic calendar for Newton School of Technology' },
      { thumb: examInterfaceThumb, src: examInterface, alt: 'NSAT entrance exam interface on desktop and mobile' },
    ],
  },
  {
    title: 'LottieFiles & IconScout',
    lines: ['Product Designer', 'Malaysia + Remote', '2021 - 2024'],
    points: [
      'Partnered with the CEO and PM to lift purchase-funnel conversion by 13%.',
      'Owned IconScout’s Figma plugin ecosystem, ranked #14 on Figma.',
      'Designed LottieFiles for Vision Pro 0→1, opening a new product vertical.',
      'Spoke at 8 events across India with CRED, Razorpay, Zeta, 10K Designers, Cars24.',
    ],
    gallery: [
      { thumb: iconscoutThumb, src: iconscout, alt: 'IconScout plugin for Figma: millions of high-quality design assets' },
      { thumb: visionProThumb, src: visionPro, alt: 'LottieFiles for Apple Vision Pro' },
    ],
  },
  {
    title: 'Toppr',
    lines: ['Product Design Intern', 'Mumbai', '2021'],
    points: [
      'Worked on the Toppr Answr platform chat module and image search interaction.',
      'Designed the user flow of the subscription module.',
      'Build the basic component library and tokens for seamless flow in design team.',
    ],
    gallery: [
      { thumb: topprAnswrThumb, src: topprAnswr, alt: 'Toppr Answr: student assistant app with a live mentor chat system' },
      { thumb: uraniumThumb, src: uranium, alt: 'Uranium, an education centered design system for Toppr' },
    ],
  },
  {
    title: 'Programming Pathshala',
    lines: ['Product Design Intern', 'Delhi', '2020 - 2021'],
    points: [
      'Led product design from concept to launch alongside one developer and three founders.',
      'Developed and deployed an ed-tech platform within six months.',
      'Achieved over 350 annual subscriptions in the first half-year.',
    ],
  },
];

export const education = [
  {
    title: 'B.Tech in CSE, JSSATEN',
    lines: ['Delhi', '2018 - 2022'],
    points: [
      'Computer Science Engineering graduate with 8.2 SGPA.',
      'Dedicated four years to unique projects like department design, participated in 8 hackathons including Smart India Hackathon, and discovered a passion for user experience over just coding.',
    ],
  },
  {
    title: 'Google Developer Student Clubs',
    lines: ['Delhi', '2018 - 2022'],
    // TODO: this repeats the B.Tech text in the Figma frame — replace with the GDSC details.
    points: [
      'Computer Science Engineering graduate with 8.2 SGPA.',
      'Dedicated four years to unique projects like department design, participated in 8 hackathons including Smart India Hackathon, and discovered a passion for user experience over just coding.',
    ],
    gallery: [
      { thumb: frictionThumb, src: friction, alt: 'Friction: an in-team coding platform for events, workshops and hiring, with a live leaderboard' },
      { thumb: iglooThumb, src: igloo, alt: 'Igloo: a chatbot form for community event registrations, with custom themes and fonts' },
    ],
  },
];

// Features & awards: each item has a year aligned to the right, and an optional link
// (`href`) to the post about it.
export const features = [
  {
    title: 'Speaker Session',
    items: [
      { label: 'Razorpay', year: '2023', href: 'https://x.com/prototyper_23/status/1749142329896644651' },
      { label: 'Zeta', year: '2023', href: 'https://x.com/prototyper_23/status/1748758823962124408' },
      { label: 'Cars 24', year: '2023' },
      { label: 'CRED', year: '2022', href: 'https://www.instagram.com/p/CulrUcxMBbU/' },
      { label: 'After Office Hours', year: '2022', href: 'https://x.com/AfterOfficeHQ/status/1748674603504030002' },
    ],
  },
  { title: 'Award', items: [{ label: 'Smart India Hackathon', year: '2020' }] },
  {
    title: 'Judge',
    items: [
      {
        label: 'Delhi Designathon (Speaker + Judge)',
        year: '2023',
        href: 'https://x.com/prototyper_23/status/1771634040090554589',
      },
    ],
  },
];
