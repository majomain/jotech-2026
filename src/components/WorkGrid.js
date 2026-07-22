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
  if (item.href || item.videoModal) {
    const label = item.linkLabel ?? (item.videoModal ? 'Watch video' : 'View case study');
    return `    <span class="wcard-link">${label} &rarr;</span>`;
  }

  return '';
}

function renderCard(item) {
  let tag = 'div';
  let attrs = '';

  if (item.href) {
    tag = 'a';
    attrs = ` href="${item.href}"`;
  } else if (item.videoModal) {
    const { embedUrl, title } = item.videoModal;
    const label = item.linkLabel ?? 'Watch video';

    tag = 'button';
    attrs = [
      ' type="button"',
      ' data-video-modal',
      ` data-embed-url="${escapeHtml(embedUrl)}"`,
      ` aria-label="${escapeHtml(title ?? label)}"`,
    ].join('');
  }

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
    '      <div class="intro reveal-group">',
    '        <div class="sec-label reveal">Selected Work</div>',
    '        <h2 class="reveal" style="--reveal-delay: 100ms">Stories,<br>made <em>visible.</em></h2>',
    '      </div>',
    `      ${cards}`,
    '    </div>',
    '  </div>',
    renderVideoModal(),
    '</div>',
  ].join('\n');
}
