let logger = () => null;

/**
 * Reveal web components when loading is complete by removing the unresolved attribute
 * from the body tag; log the event.
 * @throws debugging log indicating the reveal event
 */
export function reveal() {
  logger(`[reveal] elements ready, revealing the body`);
  window.document.body.removeAttribute("unresolved");
}

/**
 * Auto-reveal functionality prevents a flash of unstyled content before components
 * have finished loading.
 * @param {function} logFunction
 * @see https://github.com/github/webcomponentsjs#webcomponents-loaderjs
 */
export function autoReveal(logFunction) {
  logger = logFunction;
  // If Web Components are already ready, run the handler right away.  If they
  // are not yet ready, wait.
  //
  // see https://github.com/github/webcomponentsjs#webcomponents-loaderjs for
  // info about web component readiness events
  const polyfillPresent = window.WebComponents;
  const polyfillReady = polyfillPresent && window.WebComponents.ready;

  if (!polyfillPresent || polyfillReady) {
    handleWebComponentsReady();
  } else {
    window.addEventListener("WebComponentsReady", handleWebComponentsReady);
  }
}

/**
 * Reveal web components when loading is complete and log event.
 * @throws debugging log indicating the web components are ready
 */
function handleWebComponentsReady() {
  logger("[reveal] web components ready");
  reveal();
}
