import { hero as heroData } from '../data/hero.js';
import { heroPreview } from '../data/heroPreview.js';
import { escapeHtml } from '../utils/html.js';

/** First N image tiles are above-fold LCP candidates — load eagerly. */
const EAGER_IMAGE_COUNT = 3;

function renderSlide(tile, { inert = false, imageIndex = -1 } = {}) {
  const { width, height } = tile;
  const arStyle = `--tile-ar: ${width} / ${height}`;

  let media;
  if (tile.type === 'video') {
    // Duplicate (inert) group: defer src until near viewport to avoid 2× decode/bandwidth.
    if (inert) {
      media = `<video class="hero-carousel__media" data-src="${tile.src}" width="${width}" height="${height}" muted loop playsinline preload="none" aria-hidden="true"></video>`;
    } else {
      media = `<video class="hero-carousel__media" src="${tile.src}" width="${width}" height="${height}" muted loop playsinline preload="metadata" aria-label="${escapeHtml(tile.alt)}"></video>`;
    }
  } else {
    const eager = !inert && imageIndex >= 0 && imageIndex < EAGER_IMAGE_COUNT;
    const loading = eager ? 'eager' : 'lazy';
    const priority = eager && imageIndex === 0 ? ' fetchpriority="high"' : '';
    media = `<img class="hero-carousel__media" src="${tile.src}" alt="${escapeHtml(tile.alt)}" width="${width}" height="${height}" loading="${loading}" decoding="async"${priority} draggable="false">`;
  }

  // Keep hrefs on the duplicated loop group too — otherwise tiles near the
  // seam (second half of the infinite scroll) are not clickable.
  if (tile.href) {
    const inertAttrs = inert ? ' tabindex="-1" aria-hidden="true"' : '';
    return `<a class="hero-carousel__slide hero-carousel__slide--link" href="${escapeHtml(tile.href)}" style="${arStyle}"${inertAttrs}>${media}</a>`;
  }

  return `<figure class="hero-carousel__slide" style="${arStyle}">${media}</figure>`;
}

function renderCarouselGroup({ inert = false } = {}) {
  let imageIndex = 0;
  return heroPreview.tiles
    .map((tile) => {
      const idx = tile.type === 'image' ? imageIndex++ : -1;
      return renderSlide(tile, { inert, imageIndex: idx });
    })
    .join('\n        ');
}

function renderHeroHeadline() {
  const lines = heroData.lines
    .map((line, i) => {
      const classAttr = line.className ? ` class="${line.className}"` : '';
      return `<span class="ln"><em data-d="${i}"${classAttr}>${line.text}</em></span>`;
    })
    .join('\n      ');

  return [
    '<header class="hero">',
    '  <div class="hero-banner">',
    '    <div class="hero-main">',
    `      <div class="eyebrow">${heroData.eyebrow}</div>`,
    '      <h1>',
    `        ${lines}`,
    '      </h1>',
    '    </div>',
    '    <div class="hero-aside">',
    `      <p class="hero-subtext">${heroData.footnote}</p>`,
    '    </div>',
    '  </div>',
    '</header>',
  ].join('\n');
}

/** Hero headline + portfolio carousel — one viewport on first load */
export function renderHeroStage() {
  return [
    '<div class="hero-stage">',
    renderHeroHeadline(),
    renderHeroCollection(),
    '</div>',
  ].join('\n');
}

export function renderHeroCollection() {
  const group = renderCarouselGroup();
  const duplicateGroup = renderCarouselGroup({ inert: true });

  return [
    '<section class="hero-collection" aria-label="Portfolio preview">',
    '  <div class="hero-carousel">',
    '    <div class="hero-carousel__track">',
    '      <div class="hero-carousel__group">',
    `        ${group}`,
    '      </div>',
    '      <div class="hero-carousel__group" aria-hidden="true">',
    `        ${duplicateGroup}`,
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',
  ].join('\n');
}
