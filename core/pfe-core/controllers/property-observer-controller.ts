import type { ReactiveController, ReactiveElement } from 'lit';

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

export class PropertyObserverController<
  T extends ReactiveElement
> implements ReactiveController {
  private oldVal: T[keyof T];

  constructor(
    private host: T,
    private options: PropertyObserverOptions<T>
  ) {
    this.oldVal = host[options.propertyName];
  }

  /** Set any cached valued accumulated between constructor and connectedCallback */
  async hostUpdate(): Promise<void> {
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
    callback.call(this.host, oldVal as T[keyof T], newVal);
  }
}
