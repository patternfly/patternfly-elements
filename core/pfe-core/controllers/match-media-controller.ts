import type { ReactiveControllerHost, ReactiveController } from 'lit';

import { bound } from '@patternfly/pfe-core/decorators/bound.js';

export class MatchMediaController implements ReactiveController {
  /**
   * The matchMedia result
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
   */
  public mediaQueryList: MediaQueryList | null = null;

  private onChange?(list: MediaQueryList): void

  constructor(
    /** reference to the host element using this controller */
    public host: ReactiveControllerHost & Element,
    private mediaQuery = '',
    options?: {
      onChange?(list: MediaQueryList): void
    }
  ) {
    this.host.addController(this);
    this.mediaQueryList = matchMedia(mediaQuery);
    this.onChange = options?.onChange;
  }

  hostConnected() {
    this.mediaQueryList?.addEventListener('change', this.evaluate);
  }

  hostDisconnected() {
    this.mediaQueryList?.removeEventListener('change', this.evaluate);
  }

  /** Requests a render and calls the onChange callback */
  @bound evaluate() {
    this.host.requestUpdate();
    this.onChange?.(this.mediaQueryList ?? matchMedia(this.mediaQuery));
  }
}
