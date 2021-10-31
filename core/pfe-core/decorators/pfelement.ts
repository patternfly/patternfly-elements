import type { ReactiveElement } from 'lit';

import { trackPerformance } from '../core.js';

import { ColorContextController } from '../controllers/color-context-controller.js';
import { PerfController } from '../controllers/perf-controller.js';

function isReactiveElementClass(
  klass: Function // eslint-disable-line @typescript-eslint/ban-types
): klass is typeof ReactiveElement {
  return typeof klass['addInitializer' as keyof typeof klass] === 'function';
}

let waiting = false;
const queue = new Set<ReactiveElement>();

async function enqueue(instance: ReactiveElement) {
  queue.add(instance);

  // only the first call kicks off the 'timer'
  // but because of the while loop, subsequent calls will still cause an `await`
  if (!waiting) {
    waiting = true;
    while (queue.size) {
      const enqueued: Promise<boolean>[] = [];
      for (const instance of queue) {
        enqueued.push(instance.updateComplete);
        queue.delete(instance);
      }
      await Promise.all(enqueued);
    }
    document.body.removeAttribute('unresolved');
  }
}

/**
 * Adds pfelement APIs to the decorated custom-element class
 * 1. Adds readonly `version` field to the element constructor (class)
 * 2. Adds `[pfelement]` attr and `.PFElement` class in connectedCallback
 */
export function pfelement(): ClassDecorator {
  return function(klass) {
    if (!isReactiveElementClass(klass)) {
      throw new Error(`@pfelement may only decorate ReactiveElements. ${klass.name} is does not implement ReactiveElement.`);
    }

    // add `PFElement.version` as debugging aid
    Object.defineProperty(klass, 'version', { get() {
      return '{{version}}';
    } });

    klass.addInitializer(instance => {
      if (window.PfeConfig.autoReveal) {
        enqueue(instance);
      }

      // Set some global host DOM when it connects
      // by way of an ad-hoc controller
      instance.addController({
        hostConnected() {
          instance.setAttribute('pfelement', '');
          instance.classList.add('PFElement');
        },
      });

      // look mah, no instance property
      new ColorContextController(instance);

      if (trackPerformance()) {
        new PerfController(instance);
      }
    });
  };
}
