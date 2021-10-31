import type { ReactiveController, ReactiveElement } from 'lit';

export const observedController = Symbol('observed properties controller');

export type ChangeCallback<T = ReactiveElement> = (
  this: T,
  old?: T[keyof T],
  newV?: T[keyof T],
) => void;

export type ChangeCallbackName = `_${string}Changed`;

export type PropertyObserverHost<T> = T & Record<ChangeCallbackName, ChangeCallback<T>> & {
  [observedController]: PropertyObserverController;
}

export class PropertyObserverController implements ReactiveController {
  private static hosts: WeakMap<HTMLElement, PropertyObserverController> = new WeakMap();

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
  hostConnected() {
    for (const [key, [methodName, [oldVal, newVal]]] of this.values) {
      // @ts-expect-error: be cool, typescript
      this.host[methodName as keyof ReactiveElement]?.(oldVal, newVal);
      this.delete(key);
    }
  }

  cache(key: string, methodName: string, ...vals: [unknown, unknown]) {
    this.values.set(key, [methodName, vals]);
  }
}
