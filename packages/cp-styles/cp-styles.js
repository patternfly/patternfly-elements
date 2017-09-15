import '../rh-overpass/rh-overpass.js';

(function () {
  const templateId = 'cp-styles-head';

  if (document.getElementById(templateId)) {
    return;
  }

  const cpstylesTemplate = document.createElement('div');

  cpstylesTemplate.setAttribute('style', 'display: none;');
  cpstylesTemplate.setAttribute('id', templateId);

  cpstylesTemplate.innerHTML = `
    <style>
      body {
        font-family: "Overpass","Open Sans",Helvetica,sans-serif !important;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 400;
        color: #252525;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }
    </style>
  `;

  document.head.appendChild(cpstylesTemplate);
}());
