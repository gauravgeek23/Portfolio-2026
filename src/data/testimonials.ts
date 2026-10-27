import type { ImageMetadata } from 'astro';
import pizzaYap from '../assets/testimonials/pizza-yap.png';
import gauravKapatia from '../assets/testimonials/gaurav-kapatia.png';
import singapore from '../assets/flags/singapore.png';
import india from '../assets/flags/india.png';

export interface Testimonial {
  name: string;
  role: string;
  url: string;
  quote: string;
  // Missing photos/flags fall back to initials / no flag until the assets are added.
  photo?: ImageMetadata;
  flag?: { src: ImageMetadata; country: string };
}

export const testimonials: Testimonial[] = [
  {
    name: 'Pizza Yap',
    role: 'Head of Design @LottieFiles',
    url: 'https://www.linkedin.com/in/pizza-yap-%F0%9F%8D%95-2750491b/',
    quote:
      'Gaurav played a key role at LottieFiles, driving growth through design and problem-solving. His adaptability, product expertise, and mentorship made a lasting impact on the team.',
    photo: pizzaYap,
    flag: { src: singapore, country: 'Singapore' },
  },
  {
    name: 'Gaurav Kapatia',
    role: 'Design Manager @Newton School',
    url: 'https://www.linkedin.com/in/gkapatia/',
    quote:
      'Gaurav takes strong ownership of design, balancing user needs with business goals. His product thinking and ability to drive initiatives end-to-end consistently deliver meaningful impact.',
    photo: gauravKapatia,
    flag: { src: india, country: 'India' },
  },
  {
    name: 'Dion Chooi',
    role: 'Senior Designer @Coffee Meets Bagel',
    url: 'https://www.linkedin.com/in/dion-chooi-818ba8142/',
    quote:
      'He brings strong user empathy, design ownership, and UX expertise. He balances business goals, user needs, and innovation while leading initiatives. A true learner and a valuable asset to any team.',
    // TODO: add photo export from Figma node 1:9515.
    flag: { src: singapore, country: 'Singapore' },
  },
  {
    name: 'Jen Yen Khor',
    role: 'Staff Product Designer @LottieFiles',
    url: 'https://www.linkedin.com/in/jykhor/',
    quote:
      "Gaurav's passion for design, quick iterations, and constant learning make him a valuable asset. He pushes boundaries, represents the company at events, and embraces challenges with enthusiasm.",
    // TODO: add photo (Figma node 1:9488) and Malaysia flag (node 1:9492).
  },
];
