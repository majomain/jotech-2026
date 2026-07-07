const REVEAL_OPTIONS = { threshold: 0.16 };

function revealAll(root) {
  root.querySelectorAll('.reveal, .wcard, .reveal-group').forEach((el) => el.classList.add('in'));
}

/**
 * Observes elements and adds `.in` when they enter the viewport.
 * `.reveal-group` triggers staggered child `.reveal` elements via CSS.
 */
export function initScrollReveal(root = document) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll(root);
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, REVEAL_OPTIONS);

  root.querySelectorAll('.reveal-group').forEach((el) => revealObserver.observe(el));

  root.querySelectorAll('.reveal').forEach((el) => {
    if (el.closest('.reveal-group')) return;
    revealObserver.observe(el);
  });

  root.querySelectorAll('.wcard').forEach((el) => revealObserver.observe(el));
}
