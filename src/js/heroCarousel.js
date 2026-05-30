/**
 * Pauses duplicate carousel videos when off-screen to save resources.
 */
export function initHeroCarousel(root = document) {
  const carousel = root.querySelector('.hero-carousel');
  if (!carousel || !('IntersectionObserver' in window)) return;

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
    { threshold: 0.15 }
  );

  videos.forEach((video) => observer.observe(video));
}
