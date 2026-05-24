const EASING = 'cubic-bezier(.2,.8,.2,1)';

/**
 * Staggered entrance animation for hero headline lines and eyebrow.
 */
export function initHeroAnimation(root = document) {
  const lines = root.querySelectorAll('.hero h1 .line b');
  lines.forEach((el, i) => {
    if (!el.animate) return;
    el.animate(
      [{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      {
        duration: 950,
        delay: 300 + i * 110,
        easing: EASING,
        fill: 'both',
      }
    );
  });

  const eyebrow = root.querySelector('.eyebrow b');
  if (eyebrow?.animate) {
    eyebrow.animate(
      [{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      { duration: 900, delay: 150, easing: EASING, fill: 'both' }
    );
  }
}
