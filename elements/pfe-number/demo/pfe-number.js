import '@patternfly/pfe-band';
import '@patternfly/pfe-codeblock';
import '@patternfly/pfe-number';

const root = document.querySelector('[data-demo="pfe-number"]')?.shadowRoot ?? document;

function pretty(el) {
  return (el.outerHTML
    .replace(' pfelement=""', '')
    .replace(' class="PFElement"', '')
    .replace(' on="null"', '')
    .replace(' on="light"', '')
  );
}
for (const el of root.querySelectorAll('pfe-number')) {
  const tr = el.closest('tr');
  tr.querySelector('[codeblock-container] code').textContent = pretty(el);
  tr.querySelector('input').addEventListener('input', function(e) {
    tr.querySelector('[codeblock-container] code').textContent = pretty(el);
    el.setAttribute('number', e.target.value);
    el.textContent = e.target.value;
  });
}
