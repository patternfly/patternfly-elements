const { shadowRoot: root } = document.querySelector('[data-demo="pfe-badge"]');

for (const el of root.querySelectorAll('pfe-badge')) {
  if (el.previousElementSibling.localName === 'pfe-codeblock') {
    el.previousElementSibling.querySelector('code').textContent =
      el.outerHTML.replace(' pfelement="" class="PFElement" on="null"', '');
  }
}
