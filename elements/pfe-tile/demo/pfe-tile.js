import '@patternfly/elements/pfe-tile/pfe-tile.js';

const container = document.getElementById('keyboard-interaction');

function selectByEvent(event) {
  const tile = event.composedPath().find(node => node.localName === 'pfe-tile');
  if (tile) {
    for (const child of container.querySelectorAll('pfe-tile')) {
      child.selected = tile === child && !child.disabled;
    }
  }
}
container.addEventListener('click', selectByEvent);
container.addEventListener('keydown', function(event) {
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault();
      selectByEvent(event);
  }
});
