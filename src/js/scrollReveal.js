const REVEAL_OPTIONS = { threshold: 0.16 };
const STATEMENT_OPTIONS = { threshold: 0.35 };

/**
 * Observes elements and adds `.in` when they enter the viewport.
 */
export function initScrollReveal(root = document) {
  if (!('IntersectionObserver' in window)) {
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    root.getElementById?.('founder')?.classList.add('in');
    root.getElementById?.('statement')?.classList.add('in');
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

  root.querySelectorAll('.reveal').forEach((el) => {
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

  const statement = root.getElementById?.('statement') ?? document.getElementById('statement');
  if (statement) {
    const statementObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        statementObserver.unobserve(entry.target);
      });
    }, STATEMENT_OPTIONS);
    statementObserver.observe(statement);
  }
}
