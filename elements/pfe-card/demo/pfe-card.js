// import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-button';
// import '@patternfly/pfe-select';
const pfeCard = document.querySelector('pfe-card');

function setAttr(name, val = '') {
  pfeCard.setAttribute(name, val);
}

function rmAttr(name, val = '') {
  if (pfeCard?.attributes?.getNamedItem(name) && val !== '' && pfeCard?.attributes?.getNamedItem(name)?.value !== val) {
    return;
  }
  pfeCard.removeAttribute(name);
}

document.querySelectorAll('.card_controls').forEach(cardControl => {
  cardControl.addEventListener('click', event => {
    document.querySelectorAll('.card_controls').forEach(control => {
      const enabled = control.checked;
      switch (control.value) {
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
          enabled ? setAttr('fullHeight') : rmAttr('fullHeight');
          break;
        case 'plain':
          enabled ? setAttr('plain') : rmAttr('plain');
          break;
        default:
          break;
      }
    });
  });
});
