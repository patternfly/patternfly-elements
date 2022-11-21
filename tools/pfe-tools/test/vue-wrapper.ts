import type { TemplateResult } from 'lit';

import { elementUpdated, nextFrame, oneEvent } from '@open-wc/testing';
import { renderToString } from './render-to-string';

declare class Vue {
  constructor(opts: { el: string|Element, template: string; mounted(): void });
  $destroy(): void;
  $forceUpdate(): void;
  $nextTick(f: () => void): void;
  static nextTick(f: () => void): void;
  static config: {
    ignoredElements?: string[]
  };
}

// Define the app out here so we can clean it up later.
let app: Vue;

/**
 * Creates a new Vue app "wrapper" for a passed in web component.
 *
 * Awaits for Vue and the web component to be ready.
 *
 * Registers a side effect to clean up the Vue app and code
 * after each test.
 *
 * @param  code The element code you'd like to inject into Vue.
 *
 * @returns  Returns the new web component rendered within Vue.
 */
export async function fixture<T extends Element = HTMLElement>(
  testCase: string|TemplateResult
): Promise<T> {
  const code = (typeof testCase === 'string') ? testCase : renderToString(testCase);

  Vue.config.ignoredElements = [
    'pfe-accordion',
    'pfe-autocomplete',
    'pfe-avatar',
    'pfe-badge',
    'pfe-band',
    'pfe-button',
    'pfe-card',
    'pfe-clipboard',
    'pfe-code-block',
    'pfe-dropdown',
    'pfe-icon',
    'pfe-jump-links',
    'pfe-modal',
    'pfe-progress-steps',
    'pfe-select',
    'pfe-spinner',
    'pfe-switch',
    'pfe-tabs',
    'pfe-timestamp',
  ];

  const wrapper = document.getElementById('vue-wrapper');
  if (wrapper) {
    wrapper.innerHTML = '';
  }

  // console.log(code);

  const vueCode = code.replace(/<input(.*)(?!\/)>/g, '<input$1/>');

  if (!document.getElementById('root')) {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
  }

  app = new Vue({
    el: document.getElementById('root') as HTMLElement,
    template: `<div id="vue-wrapper">${vueCode}</div>`,
    mounted(this: Vue) {
      // This will run only after the
      // entire view has been rendered
      this.$nextTick(function() {
        // Let others know that Vue has finished rendering.
        window.dispatchEvent(new Event('vue-ready'));
      });
    },
  });

  // Make sure Vue is ready and our component is rendered.
  await oneEvent(window, 'vue-ready');

  // Select the newly rendered component and make sure it's finished updating.
  // We use the parent <div id="vue-wrapper" /> for the selector. We need everything
  // within that wrapper.
  const newElement = document.querySelector<T>('#vue-wrapper > *') as T;

  await elementUpdated(newElement);

  // Return the ready element for testing.
  return newElement;
}

/**
 * This registers the Vue cleanup as a side effect.
 */
beforeEach(clean);
afterEach(clean);

async function clean() {
  await nextFrame();
  // Destroy the Vue app.
  const vueWrapper = document.getElementById('vue-wrapper');
  await new Promise(r => Vue.nextTick(() => r(void 0)));
  app?.$forceUpdate();
  app?.$destroy();
  for (const el of vueWrapper?.children ?? []) {
    el.remove();
  }
  await nextFrame();
  document.querySelectorAll('#vue-wrapper').forEach(x => x.remove());
  vueWrapper?.remove();
}
