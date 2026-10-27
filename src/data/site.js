// Single source of truth for personal details and outbound links.
export const site = {
  name: 'Gaurav Kumar',
  role: 'a senior product designer based in Bangalore',
  email: 'gauravux23@gmail.com',
  location: {
    city: 'Bangalore',
    region: 'Karnataka, 560076',
    timeZone: 'Asia/Kolkata',
  },
  // TODO: add the Instagram profile URL.
  instagram: '#',
  substack: 'https://substack.com/@gauravkumar23',
  socials: [
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/gauravgeek23/' },
    { label: 'Twitter', href: 'https://x.com/prototyper_23' },
    { label: 'Substack', href: 'https://substack.com/@gauravkumar23' },
    { label: 'Book a call', href: 'https://calendar.app.google/Ma77Ymk9VpaYQiJM6' },
  ],
};

// Top-level tabs. Each tab is a route; sub-pages live under its path (e.g. /work/<slug>).
export const navItems = [
  { label: 'work', to: '/' },
  { label: 'play', to: '/play' },
  { label: 'notes', to: '/notes' },
  { label: 'about', to: '/about' },
  { label: 'resume', to: '/resume' },
];
