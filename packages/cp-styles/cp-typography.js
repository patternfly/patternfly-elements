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
        font-family: "Overpass", "Open Sans", Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5em;
        font-weight: 400;
        color: #333;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }
    </style>
  `;

  document.head.appendChild(cpstylesTemplate);
}());
