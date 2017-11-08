(function () {
  const templateId = 'cp-typography-head';

  if (document.getElementById(templateId)) {
    return;
  }

  const cpstylesTemplate = document.createElement('div');

  cpstylesTemplate.setAttribute('style', 'display: none;');
  cpstylesTemplate.setAttribute('id', templateId);

  cpstylesTemplate.innerHTML = `
    <style class="document-style">body {
  font-family: var(--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);
  font-size: var(--font-size, 16px);
  line-height: var(--line-height, 1.5em);
  font-weight: var(--font-weight, 400);
  color: var(--text-color, #333);
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased; }</style>
  `;

  document.head.appendChild(cpstylesTemplate);
}());
