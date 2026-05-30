const MIN_SIZE = 36;
const MAX_SIZE = 200;

/**
 * Scales the hero headline to fit the available main column height and width.
 */
export function initHeroFit(root = document) {
  const main = root.querySelector('.hero-main');
  const h1 = root.querySelector('.hero h1');
  const eyebrow = root.querySelector('.hero .eyebrow');
  if (!main || !h1) return;

  const fit = () => {
    const eyebrowSpace = eyebrow ? eyebrow.offsetHeight + 30 : 0;
    const availH = main.clientHeight - eyebrowSpace;
    const availW = main.clientWidth;

    if (availH <= 0 || availW <= 0) return;

    let low = MIN_SIZE;
    let high = MAX_SIZE;
    let best = MIN_SIZE;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      h1.style.fontSize = `${mid}px`;

      if (h1.scrollHeight <= availH && h1.scrollWidth <= availW) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    h1.style.fontSize = `${best}px`;
  };

  fit();

  window.addEventListener('resize', fit, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(fit).catch(() => {});
  }
}
