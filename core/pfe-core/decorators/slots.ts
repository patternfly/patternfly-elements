import type { ReactiveElement } from 'lit';

import { SlotController, type SlotControllerArgs } from '../controllers/slot-controller.js';

/**
 * Enable ssr hints for element
 * @param args a spread of slot names, or a config object.
 * @see SlotController constructor args
 */
export function slots<T extends typeof ReactiveElement>(...args: SlotControllerArgs) {
  return function(klass: T): void {
    klass.createProperty('ssrHintHasSlotted', {
      attribute: 'ssr-hint-has-slotted',
      converter: {
        fromAttribute(slots) {
          return (slots ?? '')
              .split(/[, ]/)
              .map(x => x.trim())
              .map(x => x === 'default' ? null : x);
        },
      },
    });
    klass.addInitializer(instance => {
      new SlotController(instance, ...args);
    });
  };
}
