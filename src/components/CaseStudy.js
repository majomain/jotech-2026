import { renderFluidBackground, renderProgressBar } from './FluidBackground.js';
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

function renderGalleryNativeVideo(item) {
  return [
    '    <figure class="case-figure case-figure--video reveal">',
    '      <video',
    '        class="case-figure__video"',
    `        src="${escapeHtml(item.src)}"`,
    `        aria-label="${escapeHtml(item.alt ?? 'Video')}"`,
    '        autoplay',
    '        muted',
    '        loop',
    '        playsinline',
    '        preload="metadata"',
    '      ></video>',
    '    </figure>',
  ].join('\n');
}

function renderGallerySplitVideo(item) {
  const copy = item.copy
    .map((paragraph) => `        <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');

  return [
    '    <section class="case-split reveal">',
    '      <div class="case-split__copy">',
    `        <h2 class="case-split__title">${escapeHtml(item.heading)}</h2>`,
    '        <div class="case-split__body">',
    copy,
    '        </div>',
    '      </div>',
    '      <figure class="case-split__media case-figure case-figure--video">',
    '        <div class="case-video">',
    '          <iframe',
    `            title="${escapeHtml(item.title ?? 'Video')}"`,
    `            src="${escapeHtml(item.embedUrl)}"`,
    '            frameborder="0"',
    '            referrerpolicy="strict-origin-when-cross-origin"',
    '            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"',
    '            allowfullscreen',
    '          ></iframe>',
    '        </div>',
    '      </figure>',
    '    </section>',
  ].join('\n');
}

function renderGalleryVideo(item) {
  return [
    '    <figure class="case-figure case-figure--video reveal">',
    '      <div class="case-video">',
    '        <iframe',
    `          title="${escapeHtml(item.title ?? 'Video')}"`,
    `          src="${escapeHtml(item.embedUrl)}"`,
    '          frameborder="0"',
    '          referrerpolicy="strict-origin-when-cross-origin"',
    '          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"',
    '          allowfullscreen',
    '        ></iframe>',
    '      </div>',
    '    </figure>',
  ].join('\n');
}

function renderGalleryFigure(image) {
  const variantClass = image.variant ? ` case-figure--${image.variant}` : '';
  const loopAttr = image.loop ? ' data-loop-gif' : '';

  return [
    `    <figure class="case-figure${variantClass} reveal">`,
    `      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async"${loopAttr}>`,
    '    </figure>',
  ].join('\n');
}

function renderGalleryItem(item) {
  if (item.layout === 'split' && item.embedUrl) return renderGallerySplitVideo(item);
  if (item.embedUrl) return renderGalleryVideo(item);
  if (item.type === 'video') return renderGalleryNativeVideo(item);
  return renderGalleryFigure(item);
}

function renderCaseNav(study) {
  return [
    '  <nav class="case-nav reveal" aria-label="Case study navigation">',
    `    <a class="case-nav__back" ${linkAttrs(study.back)}>`,
    '      <span class="case-nav__back-arrow" aria-hidden="true">&larr;</span>',
    `      ${escapeHtml(study.back.label)}`,
    '    </a>',
    `    <a class="case-next" ${linkAttrs(study.next)}>`,
    '      <span class="case-next__text">',
    '        <span class="case-next__eyebrow">Next project</span>',
    `        <span class="case-next__label">${escapeHtml(study.next.label)}</span>`,
    '      </span>',
    '      <span class="case-next__arrow" aria-hidden="true">&rarr;</span>',
    '    </a>',
    '  </nav>',
  ].join('\n');
}

function renderHeroVisual(visual) {
  const alt = escapeHtml(visual.alt);

  if (visual.srcDark) {
    return [
      '    <figure class="case-hero__visual">',
      `      <img class="case-hero__visual-img case-hero__visual-img--light" src="${escapeHtml(visual.src)}" alt="${alt}" decoding="async">`,
      `      <img class="case-hero__visual-img case-hero__visual-img--dark" src="${escapeHtml(visual.srcDark)}" alt="" aria-hidden="true" decoding="async">`,
      '    </figure>',
    ].join('\n');
  }

  return [
    '    <figure class="case-hero__visual">',
    `      <img class="case-hero__visual-img" src="${escapeHtml(visual.src)}" alt="${alt}" decoding="async">`,
    '    </figure>',
  ].join('\n');
}

function renderCaseTitle(study) {
  const lines = study.titleLines ?? [{ text: study.title }];
  const markup = lines
    .map((line) => `<span class="ln"><em>${escapeHtml(line.text)}</em></span>`)
    .join('\n        ');

  return ['      <h1 class="case-title reveal">', `        ${markup}`, '      </h1>'].join('\n');
}

function renderHeader(study) {
  const summary = study.summary
    .map((paragraph) => `        <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');

  const summaryBlock = ['      <div class="case-summary reveal">', summary, '      </div>'].join('\n');

  const liveLink = `      <a class="cta-btn case-live reveal" ${linkAttrs({ href: study.liveUrl, external: true })}>see live website</a>`;

  const heroBlock = study.heroVisual
    ? [
        '    <div class="case-hero">',
        '      <div class="case-hero__copy">',
        `        <div class="sec-label reveal">${escapeHtml(study.label)}</div>`,
        renderCaseTitle(study),
        summaryBlock,
        liveLink,
        '      </div>',
        renderHeroVisual(study.heroVisual),
        '    </div>',
      ].join('\n')
    : [
        `    <div class="sec-label reveal">${escapeHtml(study.label)}</div>`,
        renderCaseTitle(study).replace(/^      /gm, '    '),
        summaryBlock.replace(/^      /gm, '    '),
        liveLink.replace(/^      /, '    '),
      ].join('\n');

  return [
    '  <header class="case-header">',
    heroBlock,
    '    <div class="case-rule" role="presentation"></div>',
    '    <div class="case-meta reveal">',
    renderMetaItem('Client', study.client),
    renderMetaItem('Service', study.service),
    renderMetaItem('Year', study.year),
    '    </div>',
    '  </header>',
  ].join('\n');
}

function renderCaseStudy(study) {
  const gallery = study.gallery.map(renderGalleryItem).join('\n');

  return [
    '<article class="case">',
    renderHeader(study),
    '  <div class="case-cover reveal">',
    `    <img src="${escapeHtml(study.cover.src)}" alt="${escapeHtml(study.cover.alt)}" decoding="async">`,
    '  </div>',
    '  <div class="case-gallery">',
    gallery,
    '  </div>',
    renderCaseNav(study),
    '</article>',
  ].join('\n');
}

export function renderCaseStudyPage(study) {
  return [
    renderFluidBackground(),
    renderProgressBar(),
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
