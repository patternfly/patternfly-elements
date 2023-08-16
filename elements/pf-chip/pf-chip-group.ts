import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import type { PropertyValues } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { PfChip } from './pf-chip.js';

import styles from './pf-chip-group.css';
/**
 * A **chip group** is a collection of chips that can be grouped by category and used to represent one or more values assigned to a single attribute. When the value of numChips is exceeded, additional chips will be hidden using an overflow chip.
 *
 * @slot category-name
 *      Category name text for the chip group category. If this prop is supplied the chip group with have a label and category styling applied
 *
 * @slot
 *      Should be <Chip> elements.
 *
 * @fires { Event } overflow-chip-click - when close button is clicked
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

  @queryAssignedNodes({ slot: 'category-name', flatten: true }) private _categorySlotted?: Node[];

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
          <svg aria-label="${this.closeLabel}" fill="currentColor" viewBox="0 0 496 496">
            <path d="m248,0C111,0,0,111,0,248s111,248,248,248,248-111,248-248S385,0,248,0Zm121.6,313.1c4.7,4.7,4.7,12.3,0,17l-39.6,39.5c-4.7,4.7-12.3,4.7-17,0l-65-65.6-65.1,65.6c-4.7,4.7-12.3,4.7-17,0l-39.5-39.6c-4.7-4.7-4.7-12.3,0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3,0-17l39.6-39.6c4.7-4.7,12.3-4.7,17,0l65,65.7,65.1-65.6c4.7-4.7,12.3-4.7,17,0l39.6,39.6c4.7,4.7,4.7,12.3,0,17l-65.7,65,65.6,65.1Z"/>
          </svg>
        </button>
      `}
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('closeLabel') || changed.has('numChips')) {
      this.#updateChips();
    }
    if (changed.has('label')) {
      this.#updateHasCategory();
    }
  }

  #updateChips() {
    this.#chips.forEach((chip, i) => {
      chip.closeLabel = this.closeLabel;
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

  #onMoreClick(event: Event) {
    this.open = !this.open;
    event.stopPropagation();
    this.dispatchEvent(new Event('overflow-chip-click', event));
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
