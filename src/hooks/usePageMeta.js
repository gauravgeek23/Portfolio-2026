import { useEffect } from 'react';

const SITE = 'Gaurav Kumar';
const DEFAULT_TITLE = 'Gaurav Kumar | Senior Product Designer';
const DEFAULT_DESCRIPTION =
  'Business-driven Product Designer with 5 years of E2E ownership, translating complex business challenges into impactful experiences that drive measurable growth.';

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attr === 'rel' ? 'link' : 'meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr === 'rel' ? 'href' : 'content', value);
}

// Per-page <title>, description and canonical URL (search engines render the app, so these
// count even though the HTML shell is shared). `noindex` keeps pages like the 404 out of
// results. Pass null to leave the head alone (e.g. while a child page sets its own).
export default function usePageMeta(meta) {
  const title = meta?.title;
  const description = meta?.description;
  const noindex = meta?.noindex;
  const skip = meta === null;

  useEffect(() => {
    if (skip) return;
    document.title = title ? `${title} | ${SITE}` : DEFAULT_TITLE;
    setMeta('meta[name="description"]', 'name', 'description', description || DEFAULT_DESCRIPTION);
    setMeta('link[rel="canonical"]', 'rel', 'canonical', window.location.origin + window.location.pathname);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('meta[name="robots"]', 'name', 'robots', 'noindex');
    else robots?.remove();
  }, [skip, title, description, noindex]);
}
