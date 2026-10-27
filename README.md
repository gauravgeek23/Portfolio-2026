# Portfolio 2026

Personal portfolio for Gaurav Kumar — plain **React + HTML + CSS**, bundled with [Vite](https://vite.dev) and routed with React Router.

## Run it locally

Requires [Node.js](https://nodejs.org) 18 or newer (the LTS installer is easiest).

```sh
npm install
npm run dev      # opens http://localhost:3000
npm run build    # production build into dist/
npm run preview  # serve the production build on http://localhost:3000
```

## Structure

```
index.html                 HTML shell (title, meta, favicon)
src/
  main.jsx                 React entry + router
  App.jsx                  Routes: /, /work, /work/:slug, /play, /notes, /about, /resume
  styles/global.css        Design tokens from Figma (colours, type, spacing) + shared classes
  data/site.js             Name, email, location, social links, nav tabs
  data/projects.js         Selected work + side projects (cards and case-study content)
  data/testimonials.js
  components/              One .jsx + .css per component (Nav, Footer, ProjectCard, …)
  pages/                   One component per route
  assets/                  Images (WebP at 1x/2x) and SVG icons/flags
```

### Add a project

1. Export the cover from Figma at 800px and 1600px wide as WebP into `src/assets/work/`.
2. Import both in `src/data/projects.js` and add an entry to `projects`. It shows up on the home page and gets its own page at `/work/<slug>`.

### Add a tab

Add a route in `src/App.jsx`, a page in `src/pages/`, and the link in `navItems` in `src/data/site.js`.

## Deploy

Static output — import the repo into Vercel or Netlify (framework preset: Vite). `vercel.json` and `public/_redirects` make deep links such as `/work/toppr-answr` work on refresh.
