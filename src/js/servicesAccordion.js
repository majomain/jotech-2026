/**
 * Single-open accordion for services rows.
 */
export function initServicesAccordion(root = document) {
  root.querySelectorAll('.svc').forEach((row) => {
    row.addEventListener('click', () => {
      const wasOpen = row.classList.contains('open');
      root.querySelectorAll('.svc').forEach((item) => item.classList.remove('open'));
      if (!wasOpen) row.classList.add('open');
    });
  });
}
