const REVEAL_OPTIONS = { threshold: 0.16 };

/**
 * Observes elements and adds `.in` when they enter the viewport.
 */
export function initScrollReveal(root = document) {
  if (!('IntersectionObserver' in window)) {
    root.querySelectorAll('.reveal, .wcard').forEach((el) => el.classList.add('in'));
    root.getElementById?.('founder')?.classList.add('in');
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === 'founder') return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, REVEAL_OPTIONS);

  // Work cards join the same observer so their icons rise in as each card scrolls into view.
  root.querySelectorAll('.reveal, .wcard').forEach((el) => {
    if (el.closest('#founder')) return;
    revealObserver.observe(el);
  });

  const founder = root.getElementById?.('founder');
  if (founder) {
    const founderObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        founderObserver.unobserve(entry.target);
      });
    }, REVEAL_OPTIONS);
    founderObserver.observe(founder);
  }
}
