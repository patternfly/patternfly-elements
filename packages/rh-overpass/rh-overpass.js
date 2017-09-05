const overpassTemplate = document.createElement('div');
overpassTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="http://overpass-30e2.kxcdn.com/overpass.css">
`;

// window.customElements.define('rh-overpass', RhOverpass);
document.head.appendChild(overpassTemplate);