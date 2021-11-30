import { PfeIcon } from '/bundle.js';

PfeIcon.addIconSet(
  'fas',
  '/icons/font-awesome/solid',
  (iconName, setName, path) => {
    const name = iconName.replace('fas-', '');
    return `${path}/${name}.svg`;
  }
);

const themeableSection = document.querySelector('#themeable-section');
const themeSelect = themeableSection.querySelector('pfe-select');
themeSelect.addEventListener('pfe-select:change', event => {
  themeableSection.className = event.detail.value;
});

const contextBand = document.getElementById('context-band');
const contextSelect = contextBand.querySelector('pfe-select');
contextSelect.addEventListener('pfe-select:change', event => {
  contextBand.setAttribute('color', event.detail.value);
});
