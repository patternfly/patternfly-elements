import '@patternfly/elements/pf-badge/pf-badge.js';

for (const el of document.querySelectorAll('pf-badge')) {
  const code = el.closest('section')?.querySelector?.('code');
  if (code) {
    code.textContent = el.outerHTML;
  }
}
