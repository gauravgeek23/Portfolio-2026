# Portfolio 2026

Personal portfolio for Gaurav Kumar, built with [Astro](https://astro.build) and plain CSS.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  content/work/*.md   Selected work — each file is a home-page card and a /work/<slug>/ case study
  content/side/*.md   Side projects
  data/site.ts        Name, bio, email, location and social links
  data/testimonials.ts
  components/         Intro, SectionHeader, ProjectCard, SideProjectCard, TestimonialCard, Contact, Ruler
  pages/              index, work/index, work/[slug]
  styles/global.css   Design tokens from Figma (colours, type, radii)
```

### Add a project

Drop a cover image in `src/assets/work/` and add `src/content/work/<slug>.md`:

```md
---
title: "Project name"
period: "Jan 2026 - Mar 2026"
summary: "One or two lines for the card."
cover: ../../assets/work/<slug>.png
coverAlt: "Describe the image"
order: 5
---

Case study content in Markdown…
```

## Deploy

Static output — deploy `dist/` to Vercel, Netlify or Cloudflare Pages (framework preset: Astro).
