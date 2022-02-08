import type { ReactiveController, ReactiveElement, CSSResultGroup, CSSResultOrNative } from 'lit';
import { adoptStyles, getCompatibleStyle } from 'lit';

/**
 * Controller which adds styles to it's host element.
 * Like `static styles = []`, except a controller.
 * Should typically only be used within other controllers.
 */
export class StyleController implements ReactiveController {
  private appliedStyles = false;

  constructor(
    private host: ReactiveElement,
    /** These styles will be applied to the host element */
    private styles: CSSResultGroup,
  ) {
    host.addController(this);
  }

  hostConnected() {
    if (!this.appliedStyles) {
      this.applyStyles();
    }
  }

  private applyStyles() {
    if (this.host.renderRoot instanceof ShadowRoot) {
      const styles = [this.styles].flatMap(x => getCompatibleStyle(x as CSSResultOrNative));
      adoptStyles(this.host.renderRoot, styles);
      this.appliedStyles = true;
    }
  }
}
