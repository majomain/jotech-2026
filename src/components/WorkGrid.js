import { workItems } from '../data/work.js';
import { escapeHtml } from '../utils/html.js';
import { renderWorkCardIcon } from './icons/WorkCardIcon.js';

function renderCardIcon(item) {
  if (!item.icon) return '';

  return [
    '  <div class="wcard-icon" aria-hidden="true">',
    `    ${renderWorkCardIcon(item.icon, item.iconSize)}`,
    '  </div>',
  ].join('\n');
}

function renderCardLink(item) {
  if (item.videoModal) {
    const { embedUrl, title } = item.videoModal;
    const label = item.linkLabel ?? 'watch video';

    return [
      '    <button',
      '      type="button"',
      '      class="wcard-link"',
      '      data-video-modal',
      `      data-embed-url="${escapeHtml(embedUrl)}"`,
      `      aria-label="${escapeHtml(title ?? label)}"`,
      '    >',
      `      ${label} &rarr;`,
      '    </button>',
    ].join('\n');
  }

  if (item.href) {
    return `    <span class="wcard-link">${item.linkLabel ?? 'view case study'} &rarr;</span>`;
  }

  return '';
}

function renderCard(item) {
  const tag = item.href ? 'a' : 'div';
  const attrs = item.href ? ` href="${item.href}"` : '';
  const link = renderCardLink(item);
  const linkBlock = link ? `${link}\n` : '';

  return [
    `<${tag} class="wcard"${attrs}>`,
    `  <div class="bg"></div>`,
    '  <div class="ov"></div>',
    renderCardIcon(item),
    '  <div class="body">',
    `    <span class="kick">${item.kicker}</span>`,
    `    <h3>${item.title}</h3>`,
    `    <p>${item.description}</p>`,
    linkBlock + '  </div>',
    `</${tag}>`,
  ].join('\n');
}

function renderVideoModal() {
  return [
    '<div id="video-modal" class="video-modal" hidden>',
    '  <div class="video-modal__dialog" role="dialog" aria-modal="true" aria-label="Video player">',
    '    <button type="button" class="video-modal__close" aria-label="Close video">&times;</button>',
    '    <div class="video-modal__iframe-wrap"></div>',
    '  </div>',
    '</div>',
  ].join('\n');
}

export function renderWork() {
  const cards = workItems.filter((item) => !item.hidden).map(renderCard).join('\n      ');

  return [
    '<div class="hwrap" id="work">',
    '  <div class="hsticky">',
    '    <div class="htrack" id="htrack">',
    '      <div class="intro">',
    '        <div class="sec-label">Selected Work</div>',
        '        <h2>stories,<br>made <em>visible.</em></h2>',
    '      </div>',
    `      ${cards}`,
    '    </div>',
    '  </div>',
    renderVideoModal(),
    '</div>',
  ].join('\n');
}
