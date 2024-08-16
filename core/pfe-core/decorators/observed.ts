import type { ReactiveElement } from 'lit';
import type { ChangeCallback } from '../controllers/property-observer-controller.js';

import { PropertyObserverController } from '../controllers/property-observer-controller.js';

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
export function observed<T extends ReactiveElement, V>(
  cb: ChangeCallback<T, V>,
): TypedFieldDecorator<T>;
export function observed<T extends ReactiveElement>(methodName: string): TypedFieldDecorator<T>;
export function observed<T extends ReactiveElement>(proto: T, key: string): void;
// eslint-disable-next-line jsdoc/require-jsdoc
export function observed<T extends ReactiveElement>(...as: any[]): void | TypedFieldDecorator<T> {
  if (as.length === 1) {
    const [methodNameOrCb] = as;
    return configuredDecorator(methodNameOrCb);
  } else {
    return executeBareDecorator(...as as [T, string & keyof T]);
  }
}

/**
 * @param proto element prototype
 * @param propertyName propertyName
 * @example ```typescript
 *          @observed @property() foo?: string;
 *          ```
 */
function executeBareDecorator<T extends ReactiveElement>(proto: T, propertyName: string & keyof T) {
  const klass = proto.constructor as typeof ReactiveElement;
  klass.addInitializer(x => initialize(
    x as T,
    propertyName,
    x[`_${propertyName}Changed` as keyof typeof x] as ChangeCallback<T>,
  ));
}

/**
 * @param methodNameOrCb string name of callback or function
 * @example ```typescript
 *          @observed('_myCallback') @property() foo?: string;
 *          @observed((old) => console.log(old)) @property() bar?: string;
 *          ```
 */
function configuredDecorator<T extends ReactiveElement>(
  methodNameOrCb: string | ChangeCallback<T>,
): TypedFieldDecorator<T> {
  return function(proto, key) {
    const propertyName = key as string & keyof T;
    const klass = proto.constructor as typeof ReactiveElement;
    if (typeof methodNameOrCb === 'function') {
      const callback = methodNameOrCb;
      klass.addInitializer(x => initialize(x as T, propertyName, callback));
    } else {
      klass.addInitializer(x => initialize(
        x as T,
        propertyName,
        x[methodNameOrCb as keyof ReactiveElement] as ChangeCallback<T>,
      ));
    }
  };
}

function initialize<T extends ReactiveElement>(
  instance: T,
  propertyName: string & keyof T,
  callback: ChangeCallback<T>,
) {
  const controller = new PropertyObserverController<T>(instance as T, { propertyName, callback });
  instance.addController(controller);
}
