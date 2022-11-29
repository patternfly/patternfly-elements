import '@patternfly/pfe-card';
import '@patternfly/pfe-button';
import '@patternfly/pfe-switch';
const pfeSwitchAll = document.querySelectorAll('pfe-switch');
const pfeCard = document.querySelector('pfe-card');
const cardContainer = document.querySelector('#card-container');

function setAttr(name, val = '') {
  pfeCard.setAttribute(name, val);
}

function rmAttr(name, val = '') {
  if (pfeCard?.attributes?.getNamedItem(name) && val !== '' && pfeCard?.attributes?.getNamedItem(name)?.value !== val) {
    return;
  }
  pfeCard.removeAttribute(name);
}

pfeSwitchAll.forEach(pfeSwitch => {
  pfeSwitch.addEventListener('click', event => {
    const enabled = event.target.checked;
    switch (event.target.id) {
      case 'compact':
        enabled ? setAttr('size', 'compact') : rmAttr('size', 'compact');
        break;
      case 'flat':
        enabled ? setAttr('flat') : rmAttr('flat');
        break;
      case 'rounded':
        enabled ? setAttr('rounded') : rmAttr('rounded');
        break;
      case 'large':
        enabled ? setAttr('size', 'large') : rmAttr('size', 'large');
        break;
      case 'fullHeight':
        enabled ? setAttr('full-height') : rmAttr('full-height');
        cardContainer.classList.add('resize');
        break;
      case 'plain':
        enabled ? setAttr('plain') : rmAttr('plain');
        break;
      default:
        break;
    }
  });
});

