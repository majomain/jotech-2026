const DRAG_THRESHOLD = 5;

/**
 * Portfolio preview carousel: video visibility, hover pause (CSS), drag to scrub.
 */
export function initHeroCarousel(root = document) {
  const carousel = root.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel__track');
  if (!track) return;

  if ('IntersectionObserver' in window) {
    const videos = carousel.querySelectorAll('video');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 },
    );
    videos.forEach((video) => observer.observe(video));
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let loopWidth = 0;
  let isDragging = false;
  let dragDistance = 0;
  let startX = 0;
  let startOffset = 0;

  const measure = () => {
    loopWidth = track.scrollWidth / 2;
  };

  const normalizeOffset = (x) => {
    if (!loopWidth) return 0;
    let o = x % loopWidth;
    if (o > 0) o -= loopWidth;
    return o;
  };

  const readOffset = () => {
    const transform = getComputedStyle(track).transform;
    if (transform === 'none') return 0;
    return new DOMMatrixReadOnly(transform).m41;
  };

  const applyOffset = (x) => {
    track.style.animation = 'none';
    track.style.transform = `translate3d(${normalizeOffset(x)}px, 0, 0)`;
  };

  const resumeAnimation = () => {
    measure();
    if (!loopWidth) return;

    const current = readOffset();
    const progress = Math.max(0, Math.min(1, -normalizeOffset(current) / loopWidth));
    const durationMs =
      parseFloat(getComputedStyle(track).animationDuration) * 1000 || 48000;

    track.style.transform = '';
    track.style.animation = '';
    track.style.animationDelay = `${-progress * durationMs}ms`;
  };

  const endDrag = (resume) => {
    if (isDragging) {
      if (resume) resumeAnimation();
      carousel.classList.remove('is-dragging');
      isDragging = false;
    }
    track.style.animationPlayState = '';
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    measure();
    isDragging = false;
    dragDistance = 0;
    startX = e.clientX;
    startOffset = readOffset();
    track.style.animationPlayState = 'paused';

    try {
      carousel.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e) => {
    if (!carousel.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - startX;
    dragDistance = Math.max(dragDistance, Math.abs(dx));

    if (!isDragging && Math.abs(dx) < DRAG_THRESHOLD) return;

    if (!isDragging) {
      isDragging = true;
      carousel.classList.add('is-dragging');
      startOffset = readOffset();
    }

    e.preventDefault();
    applyOffset(startOffset + dx);
  };

  const onPointerUp = (e) => {
    if (!carousel.hasPointerCapture(e.pointerId)) return;

    try {
      carousel.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    endDrag(isDragging);
  };

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove);
  carousel.addEventListener('pointerup', onPointerUp);
  carousel.addEventListener('pointercancel', onPointerUp);

  let lastMeasureWidth = window.innerWidth;
  const onResize = () => {
    const width = window.innerWidth;
    if (width === lastMeasureWidth) return;
    lastMeasureWidth = width;
    measure();
  };

  window.addEventListener('resize', onResize, { passive: true });
  measure();
}
