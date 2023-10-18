import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-chip.css';
/**
 * A **chip** is used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.
 *
 * @slot
 *      chip text
 *
 * @csspart text - span container for chip text
 *
 * @fires { Event } click - when close button is clicked
 */
@customElement('pf-chip')
export class PfChip extends LitElement {
  static readonly styles = [styles];

  /**
   * Accessible label for close button
   */
  @property({ attribute: 'close-label', type: String }) closeLabel = 'Close';

  /**
   * Flag indicating if chip is an overflow chip
   */
  @property({ reflect: true, attribute: 'overflow-chip', type: Boolean }) overflowChip = false;

  /**
   * Flag indicating if chip is read-only and cannot be removed
   */
  @property({ reflect: true, attribute: 'read-only', type: Boolean }) readOnly = false;

  @query('button') button?: HTMLButtonElement;

  render() {
    return html`
      <div id="outer">
        ${this.overflowChip && !this.readOnly ? html`
          <button id="overflow-button" class="chip-content">
            <span id="chip-text" part="text"><slot></slot></span>
          </button>
        ` : html`
          <span class="chip-content">
            <span id="chip-text" part="text"><slot></slot></span>
          </span>
          ${this.readOnly ? '' : html`
            <button id="close-button" @click=${this.#onClick} aria-describedby="chip-text" aria-label="${this.closeLabel}">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          `}
        `}
      </div>
    `;
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties);
    /**
     * @fires chip-ready
     */
    this.dispatchEvent(new Event('chip-ready', { bubbles: true }));
  }

  /**
   * handles chip's button click event
   */
  #onClick() {
    /**
     * @fires chip-remove
     */
    this.dispatchEvent(new Event('chip-remove', { bubbles: true }));
    this.remove();
  }

  /**
   * sets focus on chip's button
   */
  focus() {
    this.button?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip': PfChip;
  }
}
