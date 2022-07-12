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
 * @cssprop {<length>} --pf-c-button--FontSize   {@default `1rem`}
 * @cssprop            --pf-c-button--FontWeight {@default `400`}
 * @cssprop {<number>} --pf-c-button--LineHeight {@default `1.5`}
 *
 * @cssprop {<length>} --pf-c-button--PaddingTop    {@default `0.375rem`}
 * @cssprop {<length>} --pf-c-button--PaddingLeft   {@default `1rem`}
 * @cssprop {<length>} --pf-c-button--PaddingBottom {@default `0.375rem`}
 * @cssprop {<length>} --pf-c-button--PaddingRight  {@default `1rem`}
 *
 * @cssprop {<length>|<percentage>} --pf-c-button--BorderRadius  {@default `3px`}
 * @cssprop {<color>}  --pf-c-button--after--BorderColor         {@default `transparent`}
 * @cssprop {<length>} --pf-c-button--after--BorderRadius        {@default `3px`}
 * @cssprop {<length>} --pf-c-button--after--BorderWidth         {@default `1px`}
 * @cssprop {<length>} --pf-c-button--active--after--BorderWidth {@default `2px`}
 * @cssprop {<length>} --pf-c-button--hover--after--BorderWidth  {@default `2px`}
 * @cssprop {<length>} --pf-c-button--focus--after--BorderWidth  {@default `2px`}
 *
 * @cssprop {<color>}  --pf-c-button--m-primary--Color                   {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-primary--BackgroundColor         {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--Color           {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-primary--active--BackgroundColor {@default `#004080`}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--Color            {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-primary--focus--BackgroundColor  {@default `#004080`}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--Color            {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-primary--hover--BackgroundColor  {@default `#004080`}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--Color                   {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--BackgroundColor         {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--Color           {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BackgroundColor {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--active--BorderColor     {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--Color            {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--focus--BorderColor      {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--Color            {@default `#06c`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--hover--BorderColor      {@default `#06c`}
 *
 * @cssprop {<color>}  --pf-c-button--m-tertiary--Color                   {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--BackgroundColor         {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--Color           {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BackgroundColor {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--active--BorderColor     {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--focus--BorderColor      {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-tertiary--hover--BorderColor      {@default `#151515`}
 *
 * @cssprop {<color>}  --pf-c-button--m-danger--Color                   {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-danger--BackgroundColor         {@default `#c9190b`}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--Color           {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-danger--active--BackgroundColor {@default `#a30000`}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--Color            {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-danger--focus--BackgroundColor  {@default `#a30000`}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--Color            {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-danger--hover--BackgroundColor  {@default `#a30000`}
 *
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--Color                   {@default `#c9190b`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BackgroundColor         {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--BorderColor             {@default `#c9190b`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--Color           {@default `#a30000`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BackgroundColor {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--active--BorderColor     {@default `#c9190b`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--Color            {@default `#a30000`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--focus--BorderColor      {@default `#c9190b`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--Color            {@default `#a30000`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-secondary--m-danger--hover--BorderColor      {@default `#c9190b`}
 *
 * @cssprop {<color>}  --pf-c-button--m-control--disabled--BackgroundColor        {@default `#f0f0f0`}
 * @cssprop {<length>} --pf-c-button--m-control--BorderRadius                     {@default `0`}
 * @cssprop {<length>} --pf-c-button--m-control--after--BorderWidth               {@default `1px`}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderTopColor            {@default `#f0f0f0`}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderRightColor          {@default `#f0f0f0`}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderBottomColor         {@default `#8a8d90`}
 * @cssprop {<color>}  --pf-c-button--m-control--after--BorderLeftColor           {@default `#f0f0f0`}
 * @cssprop {<color>}  --pf-c-button--m-control--Color                            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-control--BackgroundColor                  {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-control--active--Color                    {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BackgroundColor          {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-control--active--BorderBottomColor        {@default `#06c`}
 * @cssprop {<length>} --pf-c-button--m-control--active--after--BorderBottomWidth {@default `2px`}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--Color                     {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BackgroundColor           {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-control--focus--BorderBottomColor         {@default `#06c`}
 * @cssprop {<length>} --pf-c-button--m-control--focus--after--BorderBottomWidth  {@default `2px`}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--Color                     {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BackgroundColor           {@default `#fff`}
 * @cssprop {<color>}  --pf-c-button--m-control--hover--BorderBottomColor         {@default `#06c`}
 * @cssprop {<length>} --pf-c-button--m-control--hover--after--BorderBottomWidth  {@default `2px`}
 *
 * @cssprop {<color>}  --pf-c-button--disabled--Color              {@default `#6a6e73`}
 * @cssprop {<color>}  --pf-c-button--disabled--BackgroundColor    {@default `#d2d2d2`}
 * @cssprop {<color>}  --pf-c-button--disabled--after--BorderColor {@default `transparent`}
 *
 * @csspart state - Container for the state slot.
 * @slot icon
 *       Contains the button's icon or state indicator, e.g. a spinner.
 * @slot
 *       Must contain exactly one `<button>` element as the only content not assigned to a named slot.
 *
 * @attr {string} progress-label - ARIA label for the progress indicator {@default `'loading'`}
 *
 * @cssprop {<color>}  --pf-c-button--m-warning--Color                   {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-warning--BackgroundColor         {@default `#f0ab00`}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--Color           {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-warning--active--BackgroundColor {@default `#c58c00`}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-warning--focus--BackgroundColor  {@default `#c58c00`}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-warning--hover--BackgroundColor  {@default `#c58c00`}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--BackgroundColor         {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-plain--Color                   {@default `#6a6e73`}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-plain--hover--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--BackgroundColor  {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-plain--focus--Color            {@default `#151515`}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--BackgroundColor {@default `transparent`}
 * @cssprop {<color>}  --pf-c-button--m-plain--active--Color           {@default `#151515`}
 *
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--Color           {@default `#d2d2d2`}
 * @cssprop {<color>}  --pf-c-button--m-plain--disabled--BackgroundColor {@default `transparent`}
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
