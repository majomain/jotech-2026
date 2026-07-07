function upsertMeta({ property, name, content }) {
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

/**
 * Sets document title and social meta tags for a case study page.
 */
export function setCaseStudyMeta(study) {
  const description = study.metaDescription;
  const pageUrl = new URL(study.path, window.location.origin).href;
  const imageUrl = absoluteUrl(study.ogImage ?? study.cover?.src);

  document.title = study.documentTitle;
  upsertMeta({ name: 'description', content: description });
  upsertMeta({ property: 'og:type', content: 'article' });
  upsertMeta({ property: 'og:title', content: study.documentTitle });
  upsertMeta({ property: 'og:description', content: description });
  upsertMeta({ property: 'og:url', content: pageUrl });
  if (imageUrl) upsertMeta({ property: 'og:image', content: imageUrl });
  upsertMeta({ name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta({ name: 'twitter:title', content: study.documentTitle });
  upsertMeta({ name: 'twitter:description', content: description });
  if (imageUrl) upsertMeta({ name: 'twitter:image', content: imageUrl });
}
