import '@patternfly/elements/pf-tile/pf-tile.js';

const container = document.getElementById('keyboard-interaction');

function selectByEvent(event) {
  const tile = event.composedPath().find(node => node.localName === 'pf-tile');
  if (tile) {
    for (const child of container.querySelectorAll('pf-tile')) {
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
