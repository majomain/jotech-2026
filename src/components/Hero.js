import { hero as heroData } from '../data/hero.js';
import { heroPreview } from '../data/heroPreview.js';

function renderSlide(tile) {
  const { width, height } = tile;
  const arStyle = `--tile-ar: ${width} / ${height}`;

  const media =
    tile.type === 'video'
      ? `<video class="hero-carousel__media" src="${tile.src}" width="${width}" height="${height}" autoplay muted loop playsinline aria-label="${tile.alt}"></video>`
      : `<img class="hero-carousel__media" src="${tile.src}" alt="${tile.alt}" width="${width}" height="${height}" loading="lazy" decoding="async" draggable="false">`;

  return `<figure class="hero-carousel__slide" style="${arStyle}">${media}</figure>`;
}

function renderCarouselGroup() {
  return heroPreview.tiles.map(renderSlide).join('\n        ');
}

export function renderHero() {
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
    '  </div>',
    '  <div class="hero-foot">',
    `    <p>${heroData.footnote}</p>`,
    '  </div>',
    '</header>',
  ].join('\n');
}

export function renderHeroCollection() {
  const group = renderCarouselGroup();

  return [
    '<section class="hero-collection" aria-label="Portfolio preview">',
    '  <div class="hero-collection-inner">',
    `    <span class="hero-preview-label">${heroPreview.label}</span>`,
    '  </div>',
    '  <div class="hero-carousel">',
    '    <div class="hero-carousel__track">',
    '      <div class="hero-carousel__group">',
    `        ${group}`,
    '      </div>',
    '      <div class="hero-carousel__group" aria-hidden="true">',
    `        ${group}`,
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',
  ].join('\n');
}
