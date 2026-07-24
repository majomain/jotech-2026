/**
 * Single-open accordion for services rows.
 */
export function initServicesAccordion(root = document) {
  const rows = [...root.querySelectorAll('.svc')];
  if (!rows.length) return;

  const setOpen = (row, open) => {
    const toggle = row.querySelector('.svc__toggle');
    row.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  rows.forEach((row) => {
    const toggle = row.querySelector('.svc__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const wasOpen = row.classList.contains('open');
      rows.forEach((item) => setOpen(item, false));
      if (!wasOpen) setOpen(row, true);
    });
  });
}
