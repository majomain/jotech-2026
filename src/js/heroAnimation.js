const EASING = 'cubic-bezier(.2,.8,.2,1)';

/**
 * Staggered entrance animation for hero headline lines.
 */
export function initHeroAnimation(root = document) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelectorAll('.hero h1 .ln em');

  lines.forEach((el, i) => {
    if (reduceMotion) {
      el.style.transform = 'none';
      return;
    }

    if (!el.animate) return;

    el.animate(
      [{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      {
        duration: 1000,
        delay: 300 + i * 100,
        easing: EASING,
        fill: 'both',
      }
    );
  });
}
