import { escapeHtml } from '../utils/html.js';

/**
 * Opens Vimeo embeds from work cards in a lightweight modal.
 */
export function initVideoModal(root = document) {
  const modal = root.getElementById('video-modal');
  if (!modal) return;

  const dialog = modal.querySelector('.video-modal__dialog');
  const iframeWrap = modal.querySelector('.video-modal__iframe-wrap');
  const closeBtn = modal.querySelector('.video-modal__close');
  let lastTrigger = null;

  const open = (embedUrl, title, trigger) => {
    lastTrigger = trigger;
    iframeWrap.innerHTML = [
      '<iframe',
      ` title="${escapeHtml(title ?? 'Video player')}"`,
      ` src="${escapeHtml(embedUrl)}"`,
      ' frameborder="0"',
      ' referrerpolicy="strict-origin-when-cross-origin"',
      ' allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"',
      ' allowfullscreen',
      '></iframe>',
    ].join('');
    modal.hidden = false;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.hidden = true;
    iframeWrap.innerHTML = '';
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
    lastTrigger = null;
  };

  root.querySelectorAll('[data-video-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open(trigger.dataset.embedUrl, trigger.getAttribute('aria-label'), trigger);
    });
  });

  closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (!dialog.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}
