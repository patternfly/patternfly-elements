import type { ReactiveElement } from 'lit';

import type { ChangeCallback } from '@patternfly/pfe-core/controllers/property-observer-controller.js';

/**
 * Observes changes on the given property and calls the decorated method
 * with the old and new values when it changes.
 * @param propertyName property to react to
 */
export function observes<T extends ReactiveElement>(propertyName: string & keyof T) {
  return function(proto: T, methodName: string) {
    const method = proto[methodName as keyof T] as ChangeCallback<T>;
    if (typeof method !== 'function') {
      throw new Error('@observes must decorate a class method');
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
    Object.defineProperty(proto, propertyName, {
      ...descriptor,
      configurable: true,
      set(this: T, newVal: T[keyof T]) {
        const oldVal = this[propertyName as keyof T];
        // first, call any pre-existing setters, e.g. `@property`
        descriptor?.set?.call(this, newVal);
        method.call(this, oldVal, newVal);
      },
    });
  };
}


