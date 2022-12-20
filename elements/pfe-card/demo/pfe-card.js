import '@patternfly/pfe-card';
import '@patternfly/pfe-button';
import '@patternfly/pfe-switch';
const form = document.getElementById('card-settings');
const card = document.querySelector('pfe-card');

form.addEventListener('change', function(event) {
  const { checked } = event.target;
  const { attribute } = event.target.dataset;
  switch (attribute) {
    case 'flat':
    case 'rounded':
    case 'plain':
    case 'full-height':
      card.toggleAttribute(attribute, checked);
      break;
    case 'size':
      card.setAttribute('size', form.querySelector('label[for="size"]:not([hidden])').textContent.toLowerCase());
      break;
  }
});

