import { isServer, type ReactiveController, type ReactiveElement } from 'lit';

import { Logger } from './logger.js';

export interface Options {
  observe?: boolean | MutationObserverInit;
  emptyWarning?: string;
}

export class LightDOMController implements ReactiveController {
  private mo: MutationObserver;
  private logger: Logger;
  private initializer: () => void;

  constructor(
    private host: ReactiveElement,
    initializer: () => void,
    private options?: Options | undefined,
  ) {
    this.initializer = initializer.bind(host);
    this.mo = new MutationObserver(this.initializer);
    this.logger = new Logger(this.host);
    host.addController(this);
  }

  hostConnected(): void {
    if (this.hasLightDOM()) {
      this.initializer();
    } else if (this.options?.emptyWarning) {
      this.logger.warn(this.options?.emptyWarning);
    }

    this.initObserver();
  }

  hostDisconnected(): void {
    this.mo.disconnect();
  }

  private initObserver() {
    if (this.options?.observe ?? true) {
      // Use the provided options, or their defaults
      this.mo.observe(
        this.host,
          typeof this.options?.observe !== 'object' ? { childList: true }
        : this.options?.observe as MutationObserverInit
      );
    }
  }

  /**
   * Returns a boolean statement of whether or not this component contains any light DOM.
   */
  hasLightDOM(): boolean {
    if (isServer) {
      return false;
    } else {
      return !!(
        this.host.children.length > 0
        || (this.host.textContent ?? '').trim().length > 0
      );
    }
  }
}
