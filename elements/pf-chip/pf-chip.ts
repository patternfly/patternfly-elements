import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-chip.css';

export class ChipReadyEvent extends Event {
  constructor() {
    super('ready', { bubbles: true });
  }
}
export class ChipRemoveEvent extends Event {
  constructor() {
    super('remove', { bubbles: true });
  }
}

/**
 * A **chip** is used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.
 *
 * @fires { ChipReadyEvent } ready - Fires when chip is ready
 * @fires { ChipRemoveEvent } remove - Fires when chip is removed
 * @fires { Event } click - when close button is clicked
 *
 * @slot
 *      chip text
 *
 * @csspart text - span container for chip text
 */
@customElement('pf-chip')
export class PfChip extends LitElement {
  static readonly styles = [styles];
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * Accessible label for close button
   */
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';

  /**
   * Flag indicating if chip is an overflow chip
   */
  @property({ reflect: true, attribute: 'overflow-chip', type: Boolean }) overflowChip = false;

  /**
   * Flag indicating if chip is read-only and cannot be removed
   */
  @property({ reflect: true, type: Boolean }) readonly = false;

  @query('button') button?: HTMLButtonElement;

  render() {
    return html`
      <div id="outer">
        ${this.overflowChip && !this.readonly ? html`
          <button id="overflow-button" class="chip-content">
            <slot id="chip-text" part="text"></slot>
          </button>
        ` : html`
          <span class="chip-content">
            <slot id="chip-text" part="text"></slot>
          </span>
          ${this.readonly ? '' : html`
            <button id="close-button" @click=${this.#onClick} aria-describedby="chip-text" aria-label="${this.accessibleCloseLabel}">
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
    if (_changedProperties.has('overflowChip') || _changedProperties.has('readonly')) {
      this.#handleChipReady();
    }
  }

  disconnectedCallback(): void {
    this.#handleChipRemove();
    super.disconnectedCallback();
  }

  /**
   * @fires chip-ready
   */
  async #handleChipReady() {
    await this.updateComplete;
    this.dispatchEvent(new ChipReadyEvent());
  }

  /**
   * @fires chip-ready
   */
  #handleChipRemove() {
    return this.dispatchEvent(new ChipRemoveEvent());
  }

  /**
   * handles chip's button click event
   */
  #onClick() {
    if (this.#handleChipRemove()) {
      this.remove();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip': PfChip;
  }
}
