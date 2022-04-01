import { PfeIcon } from '/pfe.min.js';

PfeIcon.addIconSet(
  'fas',
  '/icons/font-awesome/solid',
  (iconName, _setName, path) => {
    const name = iconName.replace('fas-', '');
    return `${path}/${name}.svg`;
  }
);

const themeableSection = document.querySelector('#themeable-section');
const themeSelect = themeableSection.querySelector('pfe-select');
themeSelect.addEventListener('change', event => {
  themeableSection.className = event.detail.value;
});

const contextBand = document.getElementById('context-band');
const contextSelect = contextBand.querySelector('pfe-select');
contextSelect.addEventListener('change', event => {
  contextBand.setAttribute('color-palette', event.detail.value);
});
