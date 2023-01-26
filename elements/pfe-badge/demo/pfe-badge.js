import '@patternfly/elements/pfe-badge/pfe-badge.js';

for (const el of document.querySelectorAll('pfe-badge')) {
  const code = el.closest('section')?.querySelector?.('code');
  if (code) {
    code.textContent = el.outerHTML;
  }
}
