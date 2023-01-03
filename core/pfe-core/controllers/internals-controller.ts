import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class InternalsController implements ReactiveController {
  #internals: ElementInternals;

  disabled = false;

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
  ) {
    this.#internals = host.attachInternals();
    const { formDisabledCallback } = host;
    Object.defineProperty(Object.getPrototypeOf(host), 'formDisabledCallback', {
      configurable: true,
      value: (disabled: boolean) => {
        formDisabledCallback?.call(host, disabled);
        this.formDisabledCallback(disabled);
      }
    });
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.host.requestUpdate();
  }

  hostConnected?(): void

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
