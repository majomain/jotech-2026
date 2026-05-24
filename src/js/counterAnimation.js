const COUNTER_OPTIONS = { threshold: 0.5 };
const STEPS = 38;

/**
 * Animates metric numbers when they scroll into view.
 */
export function initCounterAnimation(root = document) {
  if (!('IntersectionObserver' in window)) {
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
      let current = 0;

      const step = () => {
        current += Math.ceil(target / STEPS);
        if (current >= target) current = target;
        el.textContent = `${current}${suffix}`;
        if (current < target) requestAnimationFrame(step);
      };

      step();
      counterObserver.unobserve(el);
    });
  }, COUNTER_OPTIONS);

  root.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));
}
