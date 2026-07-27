import { renderProgressBar } from './FluidBackground.js';
import { renderNav } from './Nav.js';
import { renderFooter } from './Footer.js';
import { escapeHtml, linkAttrs } from '../utils/html.js';

function renderEditorialMetaItem(label, value, href) {
  const valueMarkup = href
    ? `<a class="case-editorial-meta__link" ${linkAttrs({ href, external: true })}>${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return [
    '      <div class="case-editorial-meta__item">',
    `        <span class="case-meta__label">${escapeHtml(label)}</span>`,
    `        <span class="case-editorial-meta__value">${valueMarkup}</span>`,
    '      </div>',
  ].join('\n');
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

function renderEditorialFigure(media, index = 0) {
  const delay = index ? ` style="--reveal-delay: ${index * 90}ms"` : '';
  const variant = media.variant ? ` case-editorial-figure--${media.variant}` : '';
  const label = media.label
    ? `        <span class="case-editorial-figure__label">${escapeHtml(media.label)}</span>`
    : '';
  const caption = media.caption
    ? `        <span>${escapeHtml(media.caption)}</span>`
    : '';
  const visual =
    media.type === 'video'
      ? [
          '          <video',
          '            class="case-editorial-figure__video case-figure__video"',
          `            src="${escapeHtml(media.src)}"`,
          `            aria-label="${escapeHtml(media.alt ?? 'Video')}"`,
          '            autoplay',
          '            muted',
          '            loop',
          '            playsinline',
          '            preload="metadata"',
          '          ></video>',
        ].join('\n')
      : `          <img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" loading="lazy" decoding="async"${media.loop ? ' data-loop-gif' : ''}>`;

  return [
    `      <figure class="case-editorial-figure${variant} reveal"${delay}>`,
    '        <div class="case-editorial-figure__frame">',
    visual,
    '        </div>',
    media.caption || media.label ? '      <figcaption>' : '',
    label,
    caption,
    media.caption || media.label ? '      </figcaption>' : '',
    '      </figure>',
  ]
    .filter(Boolean)
    .join('\n');
}

function renderEditorialSection(section) {
  const hasIntro = section.intro !== false;
  const copy = hasIntro
    ? section.copy
        .map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`)
        .join('\n')
    : '';
  const media = section.media
    .map((item, mediaIndex) => renderEditorialFigure(item, mediaIndex))
    .join('\n');
  const intro = hasIntro
    ? [
        '    <div class="case-editorial-section__intro reveal">',
        '      <div class="case-editorial-section__copy">',
        `        <div class="case-editorial-section__eyebrow">${escapeHtml(section.label)}</div>`,
        `        <h2>${escapeHtml(section.heading)}</h2>`,
        '        <div class="case-editorial-section__body">',
        copy,
        '        </div>',
        '      </div>',
        '    </div>',
      ].join('\n')
    : '';

  return [
    `  <section class="case-editorial-section case-editorial-section--${escapeHtml(section.layout ?? 'full')}${hasIntro ? '' : ' case-editorial-section--media-only'}">`,
    intro,
    `    <div class="case-editorial-section__media case-editorial-section__media--${escapeHtml(section.layout ?? 'full')}">`,
    media,
    '    </div>',
    '  </section>',
  ].join('\n');
}

function renderEditorialLead(media) {
  const ratioClass = media.aspectRatio
    ? ` case-editorial-lead--${escapeHtml(String(media.aspectRatio).replace(/\s*\/\s*/g, '-'))}`
    : '';
  const fitClass =
    media.fit === 'contain'
      ? ' case-editorial-lead--fit'
      : media.fit === 'natural'
        ? ' case-editorial-lead--natural'
        : '';
  const visual =
    media.type === 'video'
      ? [
          '    <video',
          '      class="case-editorial-lead__video case-figure__video"',
          `      src="${escapeHtml(media.src)}"`,
          `      aria-label="${escapeHtml(media.alt ?? 'Video')}"`,
          '      autoplay',
          '      muted',
          '      loop',
          '      playsinline',
          '      preload="metadata"',
          '    ></video>',
        ].join('\n')
      : `    <img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" decoding="async">`;

  return [
    `  <figure class="case-editorial-lead${ratioClass}${fitClass} reveal">`,
    visual,
    '  </figure>',
  ].join('\n');
}

function renderCaseStudy(study) {
  const metadata = [
    renderEditorialMetaItem('Services', study.service),
    renderEditorialMetaItem('Year', study.year),
    renderEditorialMetaItem('Industry', study.industry),
    renderEditorialMetaItem('Website', study.websiteLabel, study.liveUrl),
  ].join('\n');
  const story = study.story.map(renderEditorialSection).join('\n');
  const introVisuals = study.introVisuals?.map(renderEditorialLead).join('\n') ?? '';

  return [
    '<article class="case case--editorial">',
    '  <header class="case-header case-header--editorial">',
    `    <div class="sec-label reveal">${escapeHtml(study.label)}</div>`,
    `    <h1 class="case-editorial-title reveal">${escapeHtml(study.title)}</h1>`,
    `    <p class="case-editorial-outcome reveal">${escapeHtml(study.outcome)}</p>`,
    '  </header>',
    '  <div class="case-editorial-frame">',
    '    <div class="case-editorial-meta reveal">',
    metadata,
    '    </div>',
    renderEditorialLead(study.leadVisual),
    introVisuals,
    story,
    renderCaseNav(study),
    '  </div>',
    '</article>',
  ].join('\n');
}

export function renderCaseStudyPage(study) {
  return [
    renderProgressBar(),
    '<div class="wrap">',
    renderNav(),
    '<main id="main" class="case-page">',
    renderCaseStudy(study),
    renderFooter(),
    '</main>',
    '</div>',
  ].join('\n');
}
