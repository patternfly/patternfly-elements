import '@patternfly/pfe-badge';

const root = document.querySelector('[data-demo="pfe-badge"]')?.shadowRoot ?? document;

for (const el of root.querySelectorAll('pfe-badge')) {
  const code = el.closest('section')?.querySelector?.('code');
  if (code) {
    code.textContent = (el.outerHTML
      .replace(' pfelement=""', '')
      .replace(' class="PFElement"', '')
      .replace(/ on="(null|light)"/g, '')
    );
  }
}
