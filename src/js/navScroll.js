const STUCK_THRESHOLD = 40;

/**
 * Toggles sticky nav styles after scrolling past threshold.
 */
export function initNavScroll(navEl) {
  if (!navEl) return;

  const onScroll = () => {
    navEl.classList.toggle('stuck', window.scrollY > STUCK_THRESHOLD);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
