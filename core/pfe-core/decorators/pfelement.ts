import type { ReactiveElement } from 'lit';

import { trackPerformance } from '../core.js';

import { ColorContextController } from '../controllers/color-context-controller.js';
import { PerfController } from '../controllers/perf-controller.js';

function isReactiveElementClass(
  klass: Function // eslint-disable-line @typescript-eslint/ban-types
): klass is typeof ReactiveElement {
  return typeof klass['addInitializer' as keyof typeof klass] === 'function';
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
