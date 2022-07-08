import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseButton } from './BaseButton.js';

import styles from './pfe-button.scss';

/**
 * Buttons allow users to perform an action when triggered. They feature a text
 * label, a background or a border, and icons.
 *
 * @summary Allows users to perform an action when triggered
 *
 * @attr {string} progress-label - ARIA label for the progress indicator {@default 'loading'}
 *
 * @cssprop {<color>}  --pf-c-button--m-warning--Color                   {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--BackgroundColor         {@default #f0ab00}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--Color           {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--BackgroundColor {@default #c58c00}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--BackgroundColor  {@default #c58c00}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--BackgroundColor  {@default #c58c00}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--BackgroundColor         {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--Color                   {@default #6a6e73}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--BackgroundColor  {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--Color            {@default #151515}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--BackgroundColor {@default transparent}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--Color           {@default #151515}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--Color           {@default #d2d2d2}
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--BackgroundColor {@default transparent}
 *
 */
@customElement('pfe-button')
export class PfeButton extends BaseButton {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseButton.styles, styles];

  /** Represents the state of a stateful button */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Applies plain styles */
  @property({ type: Boolean, reflect: true }) plain = false;

  /** Not as urgent as danger */
  @property({ type: Boolean, reflect: true }) warning = false;

  protected override renderDefaultIcon() {
    return html`
      <pfe-icon ?hidden=${!this.icon} icon=${this.icon} size="sm"></pfe-icon>
        <pfe-progress-indicator
            ?hidden=${!this.loading}
            indeterminate
            aria-label=${this.getAttribute('progress-label') ?? 'loading'}
        ></pfe-progress-indicator>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-button': PfeButton;
  }
}
