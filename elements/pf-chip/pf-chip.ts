import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-chip.css';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
/**
 * Chip
 * @slot - Place element content here
 */
@customElement('pf-chip')
export class PfChip extends LitElement {
  static readonly styles = [styles];

  /**
   * ARIA label for close button
   */
  @property({ attribute: 'close-btn-aria-label', type: String }) closeBtnAriaLabel = 'Close';

  /**
   * Flag indicating if the chip is an overflow chip
   */
  @property({ attribute: 'overflow-chip', type: Boolean }) overflowChip = false;

  /**
   * Position of the tooltip which is displayed if text is longer
   */
  @property({ attribute: 'tooltip-position', type: String }) tooltipPosition: TooltipPosition = 'top';

  render() {
    return html`
      <slot></slot>
      <pf-button plain @click=${this.#onClick}>
        <svg aria-label="${this.closeBtnAriaLabel}" fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
          <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
        </svg>
      </pf-button>
    `;
  }

  #onClick() {
    this.remove();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip': PfChip;
  }
}
