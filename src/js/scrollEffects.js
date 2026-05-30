const MOBILE_BREAKPOINT = 860;

/**
 * Progress bar, blob parallax, bigtype word highlight, and horizontal work scroll.
 */
export function initScrollEffects(root = document, words = []) {
  const prog = root.getElementById('prog');
  const blobs = [...root.querySelectorAll('.blob')];
  const hwrap = root.getElementById('work');
  const htrack = root.getElementById('htrack');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  let maxScroll = 1;
  let ticking = false;

  const recalc = () => {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
  };

  recalc();
  window.addEventListener('resize', recalc, { passive: true });

  const update = () => {
    const y = window.scrollY;

    if (prog) {
      prog.style.width = `${(y / maxScroll) * 100}%`;
    }

    if (!reduceMotion) {
      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 0.06;
        blob.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    }

    if (words.length) {
      const block = root.getElementById('words')?.parentElement;
      if (block) {
        const rect = block.getBoundingClientRect();
        const vh = window.innerHeight;
        const revealStart = vh * 1.1;
        const revealEnd = vh * 0.2;
        const progress = Math.max(
          0,
          Math.min(1, (revealStart - rect.top) / (rect.height + revealStart - revealEnd)),
        );
        const litCount = Math.ceil(progress * words.length * 1.2);
        words.forEach((word, i) => {
          word.classList.toggle('lit', i < litCount);
        });
      }
    }

    if (htrack && hwrap && window.innerWidth > MOBILE_BREAKPOINT && !reduceMotion) {
      const rect = hwrap.getBoundingClientRect();
      const total = hwrap.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      const distance = htrack.scrollWidth - window.innerWidth;
      htrack.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    } else if (htrack) {
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
  update();
}
