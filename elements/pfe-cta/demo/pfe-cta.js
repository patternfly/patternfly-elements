import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-cta';

const root = document.querySelector('[data-demo="pfe-cta"]')?.shadowRoot ?? document;

let activeRegistry = null;

function onSelect(event) {
  const { originEvent } = event.detail;

  // Cancel the propogation of the CTA
  originEvent.preventDefault ? originEvent.preventDefault() : (originEvent.returnValue = false);

  // Note the URL in the console for the demo page
  // eslint-disable-next-line no-console
  console.info(event.detail);

  // Register the event in the card
  const registry = event.target.closest('pfe-card').querySelector('.event-registry');
  if (registry) {
    if (activeRegistry) {
      activeRegistry.innerHTML = '';
    }
    activeRegistry = registry;
    registry.innerHTML = `
      <pfe-icon icon="warning-triangle" set="patternfly" size="lg"></pfe-icon>
      <span>
        Event registered on
        <strong>${event.detail.type}</strong>
        call-to-action. See console for details.
      </span>`;
  }
}

root.addEventListener('pfe-cta:select', onSelect);
