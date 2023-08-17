import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import type { PropertyValues } from 'lit';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
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
   * Flag indicating if overflow chips are visible
   */
  @property({ reflect: true, attribute: 'open', type: Boolean }) open = false;

  @query('#overflow') private _overflowChip?: PfChip;

  @query('#close-button') button?: HTMLButtonElement;

  @queryAssignedNodes({ slot: 'category-name', flatten: true }) private _categorySlotted?: Node[];

  #chips: PfChip[] = [];

  #buttons: HTMLElement[] = [];

  #tabindex: RovingTabindexController;

  get remaining() {
    return this.#chips.length - this.numChips;
  }

  render() {
    let collapsedText = `${this.collapsedText}`;
    if (this.collapsedText.match(/\$\{remaining\}/)) {
      collapsedText = this.collapsedText.split('${remaining}').join(` ${this.remaining}`);
    }
    return html`  
      ${this.label === '' ? html`
        <slot id="category" name="category-name" @slotchange=${this.#onSlotchange}></slot>
      ` : html`
        <slot id="category" name="category-name" @slotchange=${this.#onSlotchange}>
          <span class="offscreen">${this.label}</span>
        </slot>
      `}
      <slot id="chips"></slot>
      ${this.remaining < 1 ? '' : html`
        <pf-chip 
          id="overflow"
          overflow-chip 
          aria-controls="chips" 
          aria-expanded=${this.open}
          @click="${this.#onMoreClick}"
          @chip-ready="${this.#onChipReady}">
          ${this.open ? this.expandedText : collapsedText}
        </pf-chip>
      `}
      ${!this.closeable ? '' : html`
        <button id="close-button" @click=${this.#onCloseClick} aria-describedby="category">
          <svg aria-label="${this.closeLabel}" fill="currentColor" viewBox="0 0 496 496">
            <path d="m248,0C111,0,0,111,0,248s111,248,248,248,248-111,248-248S385,0,248,0Zm121.6,313.1c4.7,4.7,4.7,12.3,0,17l-39.6,39.5c-4.7,4.7-12.3,4.7-17,0l-65-65.6-65.1,65.6c-4.7,4.7-12.3,4.7-17,0l-39.5-39.6c-4.7-4.7-4.7-12.3,0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3,0-17l39.6-39.6c4.7-4.7,12.3-4.7,17,0l65,65.7,65.1-65.6c4.7-4.7,12.3-4.7,17,0l39.6,39.6c4.7,4.7,4.7,12.3,0,17l-65.7,65,65.6,65.1Z"/>
          </svg>
        </button>
      `}
    `;
  }

  constructor() {
    super();
    this.#tabindex = new RovingTabindexController<HTMLElement>(this);
    this.addEventListener('chip-ready', this.#onChipReady);
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('closeLabel') || changed.has('numChips') || changed.has('open')) {
      this.#updateChips();
    }
    if (changed.has('label')) {
      this.#updateHasCategory();
    }
  }

  /**
   * active chip that recieves focus when grooup receives focus
   */
  get activeChip() {
    const button = this.#tabindex.activeItem as HTMLElement;
    const shadow = button?.getRootNode() as ShadowRoot;
    return shadow?.host as PfChip;
  }

  set activeChip(chip: HTMLElement) {
    const button = chip.shadowRoot?.querySelector('button') as HTMLElement;
    this.#tabindex.updateActiveItem(button);
  }

  /**
   * @readonly whether or not group has a category
   */
  get hasCategory() {
    return (this._categorySlotted || []).length > 0;
  }

  /**
   * sets focus on active chip
   */
  focus() {
    this.#tabindex.focusOnItem(this.#tabindex.activeItem);
  }

  /**
   * makes chip active and sets focus on it
   */
  focusOnChip(chip: HTMLElement) {
    const button = chip.shadowRoot?.querySelector('button') as HTMLElement;
    this.#tabindex.focusOnItem(button);
  }

  #onChipReady() {
    const oldButtons = [...(this.#buttons || [])];
    this.#chips = [...this.querySelectorAll('pf-chip:not([slot]):not([overflow-chip])')] as PfChip[];
    const button = this._overflowChip?.button as HTMLElement;
    const buttons = this.#chips.map(chip => chip.button as HTMLElement);
    this.#buttons = [...buttons, button, this.button] as HTMLElement[];
    if (oldButtons.length !== this.#buttons.length || !oldButtons.every((element, index) => element === this.#buttons[index])) {
      this.#tabindex.initItems(this.#buttons);
    }
    this.#updateChips();
  }

  #onCloseClick() {
    this.remove();
  }

  #onMoreClick(event: Event) {
    this.open = !this.open;
    event.stopPropagation();
    this.dispatchEvent(new Event('overflow-chip-click', event));
  }

  #onSlotchange() {
    this.#updateHasCategory();
  }

  #updateChips() {
    this.#chips.forEach((chip, i) => {
      chip.closeLabel = this.closeLabel;
      const overflowHidden = i >= this.numChips && !this.open;
      if (overflowHidden) {
        chip.setAttribute('overflow-hidden', 'overflow-hidden');
      } else {
        chip.removeAttribute('overflow-hidden');
      }
    });
    this.requestUpdate();
  }

  #updateHasCategory() {
    if (this.hasCategory) {
      this.setAttribute('has-category', 'has-category');
    } else {
      this.removeAttribute('has-category');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip-group': PfChipGroup;
  }
}
