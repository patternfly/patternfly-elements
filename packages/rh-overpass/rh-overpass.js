(function () {
  const overpassTemplate = document.createElement('div');
  overpassTemplate.setAttribute('style', 'display: none;');

  overpassTemplate.innerHTML = `
    <link rel="stylesheet" type="text/css" href="http://overpass-30e2.kxcdn.com/overpass.css">
  `;

  document.head.appendChild(overpassTemplate);
}());
