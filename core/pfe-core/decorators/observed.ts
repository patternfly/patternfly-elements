import type { ReactiveElement } from 'lit';
import type {
  ChangeCallback,
  ChangeCallbackName,
  PropertyObserverHost,
} from '../controllers/property-observer-controller.js';

import {
  observedController,
  PropertyObserverController,
} from '../controllers/property-observer-controller.js';

type TypedFieldDecorator<T> = (proto: T, key: string | keyof T) => void ;

// eslint-disable-next-line jsdoc/require-param
/**
 * Calls a _fooChanged method on the instance when the value changes.
 * Works on any class field. When using on lit observed properties,
 * Make sure `@observed` is to the left (i.e. called after) the `@property`
 * or `@state` decorator.
 * @example observing a lit property
 *          ```ts
 *          @observed @property() foo = 'bar';
 *
 *          protected _fooChanged(oldValue?: string, newValue?: string) {}
 *          ```
 * @example using a custom callback
 *          ```ts
 *          @observed('_myCallback') size = 'lg';
 *
 *          _myCallback(_, size) {...}
 *          ```
 * @example using an arrow function
 *          ```ts
 *          @observed((oldVal, newVal) => console.log(`Size changed from ${oldVal} to ${newVal}`))
 *          ```
 */
export function observed<T extends ReactiveElement>(methodName: string): TypedFieldDecorator<T>;
export function observed<T extends ReactiveElement>(cb: ChangeCallback<T>): TypedFieldDecorator<T>;
export function observed<T extends ReactiveElement>(proto: T, key: string): void;
// eslint-disable-next-line jsdoc/require-jsdoc
export function observed<T extends ReactiveElement>(...as: any[]): void | TypedFieldDecorator<T> {
  if (as.length === 1) {
    const [methodNameOrCallback] = as;
    return function(proto, key) {
      (proto.constructor as typeof ReactiveElement)
          .addInitializer(x => new PropertyObserverController(x));
      observeProperty(proto, key as string & keyof T, methodNameOrCallback);
    };
  } else {
    const [proto, key] = as;
    (proto.constructor as typeof ReactiveElement)
        .addInitializer(x => new PropertyObserverController(x));
    observeProperty(proto, key);
  }
}

/**
 * Creates an observer on a field
 * @param proto
 * @param key
 * @param callbackOrMethod
 */
export function observeProperty<T extends ReactiveElement>(
  proto: T,
  key: string & keyof T,
  callbackOrMethod?: ChangeCallback<T>
) {
  const descriptor = Object.getOwnPropertyDescriptor(proto, key);
  Object.defineProperty(proto, key, {
    ...descriptor,
    configurable: true,
    set(this: PropertyObserverHost<T>, newVal: T[keyof T]) {
      const oldVal = this[key as keyof T];
      // first, call any pre-existing setters, e.g. `@property`
      descriptor?.set?.call(this, newVal);

      // if the user passed a callback, call it
      // e.g. `@observed((_, newVal) => console.log(newVal))`
      // safe to call before connectedCallback, because it's impossible to get a `this` ref.
      if (typeof callbackOrMethod === 'function') {
        callbackOrMethod.call(this, oldVal, newVal);
      } else {
        // if the user passed a string method name, call it on `this`
        // e.g. `@observed('_renderOptions')`
        // otherwise, use a default method name e.g. `_fooChanged`
        const actualMethodName = callbackOrMethod || `_${key}Changed`;

        // if the component has already connected to the DOM, run the callback
        // otherwise, If the component has not yet connected to the DOM,
        // cache the old and new values. See PropertyObserverController above
        if (this.hasUpdated) {
          this[actualMethodName as ChangeCallbackName]?.(oldVal, newVal);
        } else {
          this[observedController].cache(key as string, actualMethodName, oldVal, newVal);
        }
      }
    },
  });
}
