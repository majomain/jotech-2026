import { homeShareMeta, getCaseStudyShareMeta } from '../data/shareMeta.js';

function upsertMeta({ property, name, content }) {
  if (content == null || content === '') return;

  const selector = property
    ? `meta[property="${property}"]`
    : `meta[name="${name}"]`;
  let el = document.querySelector(selector);

  if (!el) {
    el = document.createElement('meta');
    if (property) el.setAttribute('property', property);
    if (name) el.setAttribute('name', name);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

function absoluteUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return new URL(src, window.location.origin).href;
}

function applyShareMeta(meta) {
  document.title = meta.title;
  upsertMeta({ name: 'description', content: meta.description });
  upsertMeta({ property: 'og:type', content: meta.type });
  upsertMeta({ property: 'og:title', content: meta.title });
  upsertMeta({ property: 'og:description', content: meta.description });
  upsertMeta({ property: 'og:url', content: meta.url });
  upsertMeta({ property: 'og:image', content: meta.image });
  if (meta.imageWidth) upsertMeta({ property: 'og:image:width', content: meta.imageWidth });
  if (meta.imageHeight) upsertMeta({ property: 'og:image:height', content: meta.imageHeight });
  upsertMeta({ name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta({ name: 'twitter:title', content: meta.title });
  upsertMeta({ name: 'twitter:description', content: meta.description });
  upsertMeta({ name: 'twitter:image', content: meta.image });
}

/**
 * Sets document title and social meta tags for a case study page.
 */
export function setCaseStudyMeta(study) {
  const meta = getCaseStudyShareMeta(study);
  // Prefer same-origin absolute URLs when running in the browser.
  meta.url = absoluteUrl(study.path);
  if (study.ogImage || study.cover?.src) {
    meta.image = absoluteUrl(study.ogImage ?? study.cover?.src);
  } else {
    meta.image = homeShareMeta.image;
  }
  applyShareMeta(meta);
}

export function setHomeMeta() {
  applyShareMeta({
    ...homeShareMeta,
    url: absoluteUrl('/'),
  });
}
