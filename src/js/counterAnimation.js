const COUNTER_OPTIONS = { threshold: 0.5 };
const DURATION_MS = 2200;

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Animates metric numbers when they scroll into view.
 */
export function initCounterAnimation(root = document) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    root.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix ?? '';
      el.textContent = `${target}${suffix}`;
    });
    return;
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix ?? '';
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min(1, (now - startTime) / DURATION_MS);
        const value = Math.round(target * easeOutCubic(progress));
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, COUNTER_OPTIONS);

  root.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));
}
