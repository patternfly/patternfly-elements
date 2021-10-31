const { shadowRoot } = document.querySelector('[data-demo="pfe-cta"]');

let activeRegistry = null;

function onSelect(event) {
  // since we're listening on the shadowRoot itself,
  // which doesn't change from demo to demo, we need
  // to ensure we're viewing the cta demo
  if (!shadowRoot.host.dataset.demo !== 'pfe-cta')
    return;

  const { originEvent } = event.detail;

  // Cancel the propogation of the CTA
  originEvent.preventDefault ? originEvent.preventDefault() : (originEvent.returnValue = false);

  // Note the URL in the console for the demo page
  console.info(event.detail);

  // Register the event in the card
  const registry = event.target.closest('pfe-card').querySelector('.event-registry');
  if (registry) {
    if (activeRegistry) activeRegistry.innerHTML = '';
    activeRegistry = registry;
    registry.innerHTML = `
      <pfe-icon icon="rh-safety-warning-alert" size="lg"></pfe-icon>
      <span>
        Event registered on
        <strong>${event.detail.type}</strong>
        call-to-action. See console for details.
      </span>`;
  }
}

shadowRoot.addEventListener('pfe-cta:select', onSelect);
