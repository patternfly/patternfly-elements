import type { ReactiveController, ReactiveElement } from 'lit';

export const observedController: unique symbol = Symbol('observed properties controller');

export type ChangeCallback<T = ReactiveElement> = (
  this: T,
  old?: T[keyof T],
  newV?: T[keyof T],
) => void;

export type ChangeCallbackName = `_${string}Changed`;

export type PropertyObserverHost<T> = T & Record<ChangeCallbackName, ChangeCallback<T>> & {
  [observedController]: PropertyObserverController;
};

/** This controller holds a cache of observed property values which were set before the element updated */
export class PropertyObserverController implements ReactiveController {
  private static hosts = new WeakMap<HTMLElement, PropertyObserverController>();

  private values = new Map<string, [methodName: string, values: [unknown, unknown]]>();

  private delete(key: string) {
    this.values.delete(key);
  }

  constructor(private host: ReactiveElement) {
    if (PropertyObserverController.hosts.get(host)) {
      return PropertyObserverController.hosts.get(host) as PropertyObserverController;
    }
    host.addController(this);
    (host as PropertyObserverHost<ReactiveElement>)[observedController] = this;
  }

  /** Set any cached valued accumulated between constructor and connectedCallback */
  hostUpdate(): void {
    for (const [key, [methodName, [oldVal, newVal]]] of this.values) {
      // @ts-expect-error: be cool, typescript
      this.host[methodName as keyof ReactiveElement]?.(oldVal, newVal);
      this.delete(key);
    }
  }

  /** Once the element has updated, we no longer need this controller, so we remove it */
  hostUpdated(): void {
    this.host.removeController(this);
  }

  cache(key: string, methodName: string, ...vals: [unknown, unknown]): void {
    this.values.set(key, [methodName, vals]);
  }
}
