import '@patternfly/pfe-accordion';
import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-card';
import '@patternfly/pfe-jump-links';
import '@patternfly/pfe-select';

const pfeAccordion = document.querySelector('#context-band-3 pfe-accordion') ?? document;
const isLarge = document.getElementById('toggle-size');

isLarge.addEventListener('change', function(event) {
  if ( event.target.checked ) {
    pfeAccordion.setAttribute('large', true);
  } else {
    pfeAccordion.removeAttribute('large');
  }
});
