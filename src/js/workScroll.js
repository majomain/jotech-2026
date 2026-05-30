const MOBILE_BREAKPOINT = 820;

/**
 * Pins the work section and translates cards horizontally on scroll.
 */
export function initWorkScroll(root = document) {
  const hwrap = root.getElementById('work');
  const htrack = root.getElementById('htrack');
  if (!hwrap || !htrack) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  const update = () => {
    if (window.innerWidth > MOBILE_BREAKPOINT && !reduceMotion) {
      const rect = hwrap.getBoundingClientRect();
      const total = hwrap.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      const distance = htrack.scrollWidth - window.innerWidth;
      htrack.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    } else {
      htrack.style.transform = '';
    }
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
