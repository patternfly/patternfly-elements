import { elementUpdated, oneEvent } from '@open-wc/testing';

// Define the app out here so we can clean it up later.
let app;

/**
 * Creates a new Vue app "wrapper" for a passed in web component.
 *
 * Awaits for Vue and the web component to be ready.
 *
 * Registers a side effect to clean up the Vue app and code
 * after each test.
 *
 * @param {string} code The element code you'd like to inject into Vue.
 *
 * @returns {Promise} Returns the new web component rendered within Vue.
 */
export async function fixture(code) {
  // Add a listener so we know when Vue is ready.
  const isVueReady = oneEvent(window, 'vue-ready');

  app = new Vue({
    el: "#root",
    template: `
      <div id="vue-wrapper">
        ${code}
      </div>
    `,
    mounted: function () {
      // This will run only after the
      // entire view has been rendered
      this.$nextTick(function () {
        // Let others know that Vue has finished rendering.
        window.dispatchEvent(new Event("vue-ready"));
      })
    }
  });

  // Make sure Vue is ready and our component is rendered.
  await isVueReady;

  // Select the newly rendered component and make sure it's finished updating.
  // We use the parent <div id="vue-wrapper" /> for the selector. We need everything
  // within that wrapper.
  const newElement = document.querySelector("#vue-wrapper > *");
  await elementUpdated(newElement);
  // Return the ready element for testing.
  return newElement;
}

/**
 * This registers the Vue cleanup as a side effect.
 */
beforeEach(() => {
  // Destroy the Vue app.
  const vueWrapper = document.getElementById("vue-wrapper");
  if (app && vueWrapper) {
    app.$destroy();
    // Clear out any existing markup.
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    vueWrapper.replaceWith(newRoot);
  }
});
