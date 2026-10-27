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
  // TODO: replace the placeholder URLs with real profile links.
  socials: [
    { label: 'Linkedin', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Substack', href: '#' },
    { label: 'Book a call', href: '#' },
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
