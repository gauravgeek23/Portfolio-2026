// Top-level tabs. Each tab is a page; sub-pages live under its path (e.g. /work/<slug>/).
export const navItems = [
  { id: 'work', label: 'work', href: '' },
  { id: 'play', label: 'play', href: 'play/' },
  { id: 'notes', label: 'notes', href: 'notes/' },
  { id: 'about', label: 'about', href: 'about/' },
  { id: 'resume', label: 'resume', href: 'resume/' },
] as const;

export type NavId = (typeof navItems)[number]['id'];
