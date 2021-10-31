const { shadowRoot: root } = document.querySelector('[data-demo="pfe-number"]');

for (const el of root.querySelectorAll('pfe-number')) {
  const tr = el.closest('tr');
  tr.querySelector('[codeblock-container] code').textContent = el.outerHTML;
  tr.querySelector('input').addEventListener('input', function(e) {
    tr.querySelector('[codeblock-container] code').textContent = el.outerHTML;
    el.setAttribute('number', e.target.value);
    el.textContent = e.target.value;
  });
}
