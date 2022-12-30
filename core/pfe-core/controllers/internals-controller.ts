import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class InternalsController implements ReactiveController {
  #internals: ElementInternals;

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
  ) {
    this.#internals = host.attachInternals();
  }

  hostConnected?(): void

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
