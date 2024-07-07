import type { ReactiveElement } from 'lit';
import type { Options } from '../controllers/light-dom-controller.js';

import { LightDOMController } from '../controllers/light-dom-controller.js';

/**
 * Runs the decorated method in `connectedCallback`,
 * provided the element has light children, and sets
 * up a mutation observer to re-run the callback,
 * unless opted-out with `{ observe: false }`
 * @param  options        Set `observe` to `false` to skip mutation observer setup, or pass a MutationObserverInit as options
 */
export function initializer<T extends ReactiveElement>(options?: Options) {
  return function(proto: T, key: string): void {
    // @TODO: allow multiple initializers
    (proto.constructor as typeof ReactiveElement).addInitializer(instance => {
      const initializer = proto[key as keyof T] as unknown as () => void;
      const controller = new LightDOMController(instance as ReactiveElement, initializer, options);
      if (instance.isConnected) {
        controller.hostConnected();
      }
    });
  };
}
