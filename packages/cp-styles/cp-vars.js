import './custom-style-interface.min.js';

(function () {
  const templateId = 'cp-vars-head';

  if (document.getElementById(templateId)) {
    return;
  }

  const cpvarsTemplate = document.createElement('div');

  cpvarsTemplate.setAttribute('style', 'display: none;');
  cpvarsTemplate.setAttribute('id', templateId);

  cpvarsTemplate.innerHTML = `
    <style class="document-style">:root {
  --text-color: #333;
  --link-color: #06c;
  --brand-primary: #c00; }</style>
  `;

  document.head.appendChild(cpvarsTemplate);

  if (window.ShadyCSS) {
    window.ShadyCSS.CustomStyleInterface.addCustomStyle(document.querySelector('style.document-style'));
  }
}());
