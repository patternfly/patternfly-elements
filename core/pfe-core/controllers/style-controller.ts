import type {
  ReactiveController,
  ReactiveElement,
  CSSResultGroup,
  CSSResultOrNative,
  CSSResult,
} from 'lit';
import { getCompatibleStyle, supportsAdoptingStyleSheets } from 'lit';

declare global {
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

/**
 * Controller which adds styles to it's host element.
 * Like `static styles = []`, except a controller.
 * Should typically only be used within other controllers.
 */
export class StyleController implements ReactiveController {
  private stylesAdopted = false;

  constructor(
    private host: ReactiveElement,
    /** These styles will be applied to the host element */
    private styles: CSSResultGroup,
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    if (this.stylesAdopted || !(this.host.renderRoot instanceof ShadowRoot)) {
      return;
    }

    const styles = [this.styles]
        .flatMap(x => getCompatibleStyle(x as CSSResultOrNative))
        .filter(x => !!x);

    if (supportsAdoptingStyleSheets) {
      this.host.renderRoot.adoptedStyleSheets = [
        ...styles.map(x => x instanceof CSSStyleSheet ? x : x.styleSheet as CSSStyleSheet),
        ...this.host.renderRoot.adoptedStyleSheets ?? [],
      ];
    } else {
      styles.forEach(s => {
        const style = document.createElement('style');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nonce = (window as any)['litNonce'];
        if (nonce !== undefined) {
          style.setAttribute('nonce', nonce);
        }
        style.textContent = (s as CSSResult).cssText;
        this.host.renderRoot.appendChild(style);
      });
    }

    this.stylesAdopted = true;
  }
}
