import '@patternfly/pfe-band';
import '@patternfly/pfe-tabs';
import '@patternfly/pfe-tooltip';

const root = document.querySelector('[data-demo="pfe-tabs"]')?.shadowRoot ?? document;

root.querySelector('pfe-tabs');

const switchToAriaDisabledInput = root.querySelector('input[name="toggle-disabled"]');
function disabledToggle() {
  const disabledExample = root.querySelector('#disabledExample');
  if (switchToAriaDisabledInput.checked) {
    disabledExample.setAttribute('active-key', '3');
  } else {
    disabledExample.setAttribute('active-key', '4');
  }
}
switchToAriaDisabledInput.addEventListener('change', disabledToggle);

const variantInput = root.querySelector('input[name="toggle-variant"]');
function variantToggle() {
  const boxVariant = root.querySelector('pfe-tabs[box]');
  if (variantInput.checked) {
    boxVariant.setAttribute('box', 'light');
  } else {
    boxVariant.setAttribute('box', 'dark');
  }
}
variantInput.addEventListener('change', variantToggle);

const verticalInput = root.querySelector('input[name="toggle-vertical"]');
function verticalToggle() {
  const verticalVariant = root.querySelector('pfe-tabs[vertical]');
  if (verticalInput.checked) {
    verticalVariant.setAttribute('box', 'dark');
  } else {
    verticalVariant.removeAttribute('box');
  }
}
verticalInput.addEventListener('change', verticalToggle);


const resizeInput = root.querySelector('input[name="toggle-resize"]');
function resizeToggle() {
  const resize = root.querySelector('.resize pfe-tabs');
  if (resizeInput.checked) {
    resize.setAttribute('box', 'dark');
  } else {
    resize.removeAttribute('box');
  }
}
resizeInput.addEventListener('change', resizeToggle);

const resizeWrapper = root.querySelector('.resize');
const observer = new ResizeObserver(function() {
  // debounce
  let timeout = null;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    simulateResize();
  }, 100);
});

observer.observe(resizeWrapper, { attributes: true });

function simulateResize() {
  const event = new UIEvent('resize', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  window.dispatchEvent(event);
}


const insetInput = root.querySelectorAll('input[name="toggle-inset"]');
function insetToggle(event) {
  const inset = root.querySelector('pfe-tabs[inset]');
  inset.setAttribute('inset', event.target.value);
}
insetInput.forEach(input => input.addEventListener('change', insetToggle));
