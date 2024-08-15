import type { ReactiveController, ReactiveElement } from 'lit';

import { notEqual } from 'lit';

export type ChangeCallback<T extends ReactiveElement, V = T[keyof T]> = (
  this: T,
  old?: V,
  newV?: V,
) => void;

export interface PropertyObserverOptions<T extends ReactiveElement> {
  propertyName: string & keyof T;
  callback: ChangeCallback<T>;
  waitFor?: 'connected' | 'updated' | 'firstUpdated';
}

const UNINITIALIZED = Symbol('uninitialized');

export class PropertyObserverController<
  T extends ReactiveElement
> implements ReactiveController {
  private oldVal: T[keyof T] = UNINITIALIZED as T[keyof T];

  constructor(
    private host: T,
    private options: PropertyObserverOptions<T>
  ) {
  }

  #neverRan = true;

  hostConnected(): void {
    this.#init();
  }

  /**
   * Because of how typescript transpiles private fields,
   * the __accessPrivate helper might not be entirely initialized
   * by the time this constructor runs (in `addInitializer`'s instance callback')
   * Therefore, we pull this shtick.
   *
   * When browser support improves to the point we can ship decorated private fields,
   * we'll be able to get rid of this.
   */
  #init() {
    if (this.oldVal === UNINITIALIZED) {
      this.oldVal = this.host[this.options.propertyName];
    }
  }

  /** Set any cached valued accumulated between constructor and connectedCallback */
  async hostUpdate(): Promise<void> {
    this.#init();
    const { oldVal, options: { waitFor, propertyName, callback } } = this;
    if (!callback) {
      throw new Error(`no callback for ${propertyName}`);
    }
    const newVal = this.host[propertyName];
    this.oldVal = newVal;
    if (newVal !== oldVal) {
      switch (waitFor) {
        case 'connected':
          if (!this.host.isConnected) {
            const origConnected = this.host.connectedCallback;
            await new Promise<void>(resolve => {
              this.host.connectedCallback = function() {
                resolve(origConnected?.call(this));
              };
            });
          }
          break;
        case 'firstUpdated':
          if (!this.host.hasUpdated) {
            await this.host.updateComplete;
          }
          break;
        case 'updated':
          await this.host.updateComplete;
          break;
      }
    }
    const Class = (this.host.constructor as typeof ReactiveElement);
    const hasChanged = Class
        .getPropertyOptions(this.options.propertyName)
        .hasChanged ?? notEqual;
    if (this.#neverRan || hasChanged(oldVal, newVal)) {
      callback.call(this.host, oldVal as T[keyof T], newVal);
      this.#neverRan = false;
    }
  }
}
