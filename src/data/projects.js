import academicCalendar800 from '../assets/work/academic-calendar-800.webp';
import academicCalendar1600 from '../assets/work/academic-calendar-1600.webp';
import lottie800 from '../assets/work/lottiefiles-vision-pro-800.webp';
import lottie1600 from '../assets/work/lottiefiles-vision-pro-1600.webp';
import toppr800 from '../assets/work/toppr-answr-800.webp';
import toppr1600 from '../assets/work/toppr-answr-1600.webp';
import iconscout800 from '../assets/work/iconscout-plugin-800.webp';
import iconscout1600 from '../assets/work/iconscout-plugin-1600.webp';
import camera370 from '../assets/side/camera-app-wear-os-370.webp';
import camera740 from '../assets/side/camera-app-wear-os-740.webp';
import iphone370 from '../assets/side/iphone-kit-370.webp';
import iphone740 from '../assets/side/iphone-kit-740.webp';
import { academicCalendarCaseStudy } from './case-studies/academic-calendar';
import { lottieVisionProCaseStudy } from './case-studies/lottiefiles-vision-pro';

// Placeholder case-study outline for projects whose write-up isn't in yet.
// Projects with a `caseStudy` (see data/case-studies/) use that instead.
const outline = [
  { heading: 'Overview', body: 'Case study coming soon. This section will cover the problem, my role, the process and the outcome.' },
  { heading: 'The problem', body: '' },
  { heading: 'Process', body: '' },
  { heading: 'Outcome', body: '' },
];

// Selected work — each entry is a card on the home page and a case study at /work/<slug>.
export const projects = [
  {
    slug: 'academic-calendar',
    title: 'Academic Calendar',
    period: 'Jan 2025 - Mar 2025',
    summary:
      'Designed a scalable, unified academic calendar connecting students, teachers, and mentors across business verticals.',
    cover: { src: academicCalendar800, src2x: academicCalendar1600 },
    coverAlt: 'Newton School of Technology academic calendar showing a weekly schedule of lectures and labs',
    caseStudy: academicCalendarCaseStudy,
  },
  {
    slug: 'lottiefiles-vision-pro',
    title: 'LottieFiles for Vision Pro',
    period: 'Jan 2024 - Mar 2024',
    summary:
      'Ideating & Designing platform to empower seamless motion for products in spatial spaces, ensuring motion is accessible and never a limitation.',
    cover: { src: lottie800, src2x: lottie1600 },
    coverAlt: 'LottieFiles logo above an Apple Vision Pro headset',
    caseStudy: lottieVisionProCaseStudy,
  },
  {
    slug: 'toppr-answr',
    title: 'Toppr Answr',
    period: 'Apr 2021 - Jul 2021',
    summary: 'Building a seamless platform for instant doubt resolution and learning.\nSimply     Click → Scan → Solve.',
    cover: { src: toppr800, src2x: toppr1600 },
    coverAlt: 'Collage of Toppr Answr mobile screens for scanning, solving and chatting about questions',
    sections: outline,
  },
  {
    slug: 'iconscout-plugin',
    title: 'IconScout Plugin',
    period: 'Jul 2023 - Dec 2023',
    summary:
      'Revamped an existing plugin, boosting MAU by 228% and securing the Rank #14 on the Figma Marketplace, driving increased user engagement.',
    cover: { src: iconscout800, src2x: iconscout1600 },
    coverAlt: 'IconScout Figma plugin interface with asset categories such as icons, illustrations and Lottie animations',
    sections: outline,
  },
];

// Side projects also get a case-study page at /work/<slug> (linked from the play tab).
export const sideProjects = [
  {
    slug: 'camera-app-wear-os',
    title: 'Camera App Wear OS',
    period: 'Oct 2022',
    summary:
      'Effortless capture and seamless control—tap to shoot, swipe to switch, all on your wrist. A fast, simple camera experience designed for Wear OS.',
    cover: { src: camera370, src2x: camera740 },
    coverAlt: 'Three Wear OS watch faces showing the camera app controls',
    sections: outline,
  },
  {
    slug: 'iphone-kit',
    title: 'iPhone Kit (Figma)',
    period: 'Apr 2020 - Present',
    summary:
      'Solving iPhone asset needs for 100K+ designers & developers including status bar mockups wallpapers, Dynamic Island, and shutter capture.',
    cover: { src: iphone370, src2x: iphone740 },
    coverAlt: 'iPhone 17 Pro design asset kit cover in orange',
    sections: outline,
  },
];
