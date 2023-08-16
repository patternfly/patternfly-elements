import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import type { PropertyValues } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { PfChip, type TooltipPosition } from './pf-chip.js';

import styles from './pf-chip-group.css';
/**
 * Chip
 * @slot - Place element content here
 */
@customElement('pf-chip-group')
export class PfChipGroup extends LitElement {
  static readonly styles = [styles];

  /**
   * ARIA label for chip group that does not have a category name
   */
  @property({ attribute: 'label', type: String }) label = '';

  /**
   * ARIA label for close button
   */
  @property({ attribute: 'close-label', type: String }) closeLabel = 'Close';

  /**
   * Flag if chip group can be closed
   */
  @property({ attribute: 'closeable', type: Boolean }) closeable = false;

  /**
   * Customizeable "more" template string. Use variable "${remaining}" for the overflow chip count.
   */
  @property({ attribute: 'collapsed-text', type: String }) collapsedText = '${remaining} more';

  /**
   * Customizable "show less" text string.
   */
  @property({ attribute: 'expanded-text', type: String }) expandedText = 'show less';

  /**
   * Set number of chips to show before overflow
   */
  @property({ reflect: true, attribute: 'num-chips', type: Number }) numChips = 3;

  /**
   * Flag indicating if the chip is an overflow chip
   */
  @property({ reflect: true, attribute: 'overflow-chip', type: Boolean }) overflowChip = false;

  /**
   * Flag indicating if the chip is an overflow chip
   */
  @property({ reflect: true, attribute: 'read-only', type: Boolean }) readOnly = false;

  /**
   * Flag indicating if overflow chips are visible
   */
  @property({ reflect: true, attribute: 'open', type: Boolean }) open = false;

  /**
   * Position of the tooltip which is displayed if text is longer
   */
  @property({ attribute: 'tooltip-position', type: String }) tooltipPosition: TooltipPosition = 'top';

  @queryAssignedNodes({ slot: 'category-name', flatten: true }) private _categorySlotted?: Node[];

  @query('#category') private _categoryText?: HTMLElement | null;

  #chips: PfChip[] = [];

  get remaining() {
    return this.#chips.length - this.numChips;
  }

  render() {
    let collapsedText = `${this.collapsedText}`;
    if (this.collapsedText.match(/\$\{remaining\}/)) {
      collapsedText = this.collapsedText.split('${remaining}').join(` ${this.remaining}`);
    }
    return html`
      <slot id="category" name="category-name" @slotchange=${this.#onCategorySlotchange}>
        <span class="offscreen">${this.label}</span>
      </slot>
      <slot id="chips" @slotchange=${this.#onChipsSlotchange}></slot>
      ${this.remaining < 1 ? '' : html`
        <pf-chip 
          overflow-chip 
          aria-controls="chips" 
          aria-expanded=${this.open}
          @click="${this.#onMoreClick}">
          ${this.open ? this.expandedText : collapsedText}
        </pf-chip>
      `}
      ${!this.closeable && (this.hasCategory || this.label !== '') ? '' : html`
        <button id="close-button" @click=${this.#onCloseClick} aria-describedby="category">
          <svg aria-label="${this.closeLabel}" fill="currentColor" viewBox="0 0 352 512">
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
        </button>
      `}
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('closeLabel') || changed.has('tooltipPosition') || changed.has('numChips')) {
      this.#updateChips();
    }
    if (changed.has('label')) {
      this.#updateHasCategory();
    }
  }

  #updateChips() {
    this.#chips.forEach((chip, i) => {
      chip.closeLabel = this.closeLabel;
      chip.tooltipPosition = this.tooltipPosition;
      const overflowHidden = i >= this.numChips;
      if (overflowHidden) {
        chip.setAttribute('overflow-hidden', 'overflow-hidden');
      } else {
        chip.removeAttribute('overflow-hidden');
      }
    });
    this.requestUpdate();
  }

  get hasCategory() {
    return (this._categorySlotted || []).length > 0;
  }

  #updateHasCategory() {
    if (this.hasCategory) {
      this.setAttribute('has-category', 'has-category');
    } else {
      this.removeAttribute('has-category');
    }
  }

  #onCategorySlotchange() {
    this.#updateHasCategory();
  }

  #onChipsSlotchange() {
    this.#chips = [...this.querySelectorAll('pf-chip:not([slot]):not([overflow-chip])')] as PfChip[];
    this.#updateChips();
  }

  #onMoreClick() {
    this.open = !this.open;
  }

  #onCloseClick() {
    this.remove();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip-group': PfChipGroup;
  }
}
