/**
 * Inject crawlable Open Graph / Twitter meta into an HTML document string.
 * Used at build time so bots see correct previews without executing JS.
 */

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function metaTag({ property, name, content }) {
  if (content == null || content === '') return '';
  const attr = property
    ? `property="${escapeAttr(property)}"`
    : `name="${escapeAttr(name)}"`;
  return `  <meta ${attr} content="${escapeAttr(content)}">`;
}

const META_KEYS = [
  { property: 'og:type' },
  { property: 'og:title' },
  { property: 'og:description' },
  { property: 'og:url' },
  { property: 'og:image' },
  { property: 'og:image:width' },
  { property: 'og:image:height' },
  { name: 'twitter:card' },
  { name: 'twitter:title' },
  { name: 'twitter:description' },
  { name: 'twitter:image' },
  { name: 'description' },
];

function stripExistingShareMeta(html) {
  let next = html;
  for (const key of META_KEYS) {
    const attr = key.property
      ? `property="${key.property}"`
      : `name="${key.name}"`;
    next = next.replace(
      new RegExp(`\\s*<meta\\s+[^>]*${attr}[^>]*>`, 'gi'),
      '',
    );
  }
  next = next.replace(/<title>[^<]*<\/title>/i, '');
  return next;
}

export function injectShareMetaHtml(html, meta) {
  const tags = [
    `  <title>${escapeAttr(meta.title)}</title>`,
    metaTag({ name: 'description', content: meta.description }),
    metaTag({ property: 'og:type', content: meta.type }),
    metaTag({ property: 'og:title', content: meta.title }),
    metaTag({ property: 'og:description', content: meta.description }),
    metaTag({ property: 'og:url', content: meta.url }),
    metaTag({ property: 'og:image', content: meta.image }),
    metaTag({ property: 'og:image:width', content: meta.imageWidth }),
    metaTag({ property: 'og:image:height', content: meta.imageHeight }),
    metaTag({ name: 'twitter:card', content: 'summary_large_image' }),
    metaTag({ name: 'twitter:title', content: meta.title }),
    metaTag({ name: 'twitter:description', content: meta.description }),
    metaTag({ name: 'twitter:image', content: meta.image }),
  ]
    .filter(Boolean)
    .join('\n');

  const cleaned = stripExistingShareMeta(html);
  if (!/<head[^>]*>/i.test(cleaned)) {
    throw new Error('injectShareMetaHtml: missing <head> in HTML');
  }

  return cleaned.replace(/<head([^>]*)>/i, `<head$1>\n${tags}`);
}
