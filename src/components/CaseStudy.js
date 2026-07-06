import { renderFluidBackground } from './FluidBackground.js';
import { renderNav } from './Nav.js';
import { renderCTA } from './CTA.js';
import { renderFooter } from './Footer.js';
import { escapeHtml, linkAttrs } from '../utils/html.js';

function renderMetaItem(label, value) {
  return [
    '      <div class="case-meta__item">',
    `        <span class="case-meta__label">${escapeHtml(label)}</span>`,
    `        <span class="case-meta__value">${escapeHtml(value)}</span>`,
    '      </div>',
  ].join('\n');
}

function renderGalleryFigure(image) {
  return [
    '    <figure class="case-figure reveal">',
    `      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async">`,
    '    </figure>',
  ].join('\n');
}

function renderHeader(study) {
  const summary = study.summary
    .map((paragraph) => `      <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');

  return [
    '  <header class="case-header">',
    `    <div class="sec-label">${escapeHtml(study.label)}</div>`,
    `    <h1>${escapeHtml(study.title)}</h1>`,
    '    <div class="case-summary">',
    summary,
    '    </div>',
    `    <a class="cta-btn case-live" ${linkAttrs({ href: study.liveUrl, external: true })}>see live website</a>`,
    '    <div class="case-rule" role="presentation"></div>',
    '    <div class="case-meta">',
    renderMetaItem('Client', study.client),
    renderMetaItem('Service', study.service),
    renderMetaItem('Year', study.year),
    '    </div>',
    '  </header>',
  ].join('\n');
}

function renderCaseStudy(study) {
  const gallery = study.gallery.map(renderGalleryFigure).join('\n');

  return [
    '<article class="case">',
    renderHeader(study),
    '  <div class="case-cover reveal">',
    `    <img src="${escapeHtml(study.cover.src)}" alt="${escapeHtml(study.cover.alt)}" decoding="async">`,
    '  </div>',
    '  <div class="case-gallery">',
    gallery,
    '  </div>',
    `  <a class="case-next" href="${escapeHtml(study.next.href)}">`,
    `    <span class="case-next__label">${escapeHtml(study.next.label)}</span>`,
    '    <span class="case-next__arrow" aria-hidden="true">&rarr;</span>',
    '  </a>',
    '</article>',
  ].join('\n');
}

export function renderCaseStudyPage(study) {
  return [
    renderFluidBackground(),
    '<div class="wrap">',
    renderNav(),
    '<main id="main" class="case-page">',
    renderCaseStudy(study),
    renderCTA(),
    renderFooter(),
    '</main>',
    '</div>',
  ].join('\n');
}
