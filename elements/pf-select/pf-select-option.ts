import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import type { PropertyValues } from 'lit';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import styles from './pf-select-option.css';

/**
 * Option within a listbox
 * @slot -
 *        option text
 * @slot icon
 *        optional icon
 * @slot description
 *        optional description
 */
@customElement('pf-select-option')
export class PfSelectOption extends LitElement {
  static readonly styles = [styles];

  /**
   * whether option is disabled
   */
  @property({ reflect: true, attribute: 'aria-disabled', type: String }) ariaDisabled = 'false';

  /**
   * whether list items are arranged vertically or horizontally;
   * limits arrow keys based on orientation
   */
  @property({ attribute: false, reflect: true }) value: unknown;

  /**
   * whether option is selected
   */
  @property({ attribute: 'selected', type: Boolean }) selected = false;

  /**
  * total number of options
  */
  @property({ type: Number }) setSize!: number;

  /**
  * option's position amoun the other options
  */
  @property({ type: Number }) posInSet!: number;

  /**
   * whether option is hidden by listbox filtering
   */
  @property({ reflect: true, attribute: 'hidden-by-filter', type: Boolean }) hiddenByFilter = false;

  @queryAssignedNodes({ slot: '', flatten: true }) private _slottedText!: Node[];

  #createOptionText = '';
  #userCreatedOption = false;

  #internals = new InternalsController(this, {
    role: 'option'
  });

  override connectedCallback() {
    super.connectedCallback();
    this.id = this.id || getRandomId();
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
    this.addEventListener('focus', this.#onFocus);
    this.addEventListener('blur', this.#onBlur);
  }

  render() {
    return html`
      <div id="outer">
        <input 
          type="checkbox" 
          aria-hidden="true" 
          ?checked=${this.selected}
          ?disabled=${this.ariaDisabled === 'true'}>
        <slot name="icon"></slot>
        <span>${this.#createOptionText === '' ? '' : `${this.#createOptionText}: `}<slot></slot></span>
        <svg 
          ?hidden=${!this.selected}
          viewBox="0 0 512 512" 
          fill="currentColor" 
          aria-hidden="true">
          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
        <div id="description"><slot name="description"></slot></div>
      </div>
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('selected')) {
      if (this.selected) {
        this.#createOption();
      }
      this.#internals.ariaSelected = this.selected ? 'true' : 'false';
    }
    if (changed.has('posInSet')) {
      this.#internals.ariaPosInSet = this.posInSet ? `${this.posInSet}` : null;
    }
    if (changed.has('setSize')) {
      this.#internals.ariaSetSize = this.setSize ? `${this.setSize}` : null;
    }
    if (changed.has('hiddenByFilter')) {
      this.#onHiddenByFilter();
    }
  }

  /**
   * text content within option (used for filtering)
   */
  get optionText() {
    return this._slottedText.map(node => node.textContent).join('').trim();
  }

  /**
   * used for typeahead to determine if
   * a create option should be shown
   * by setting the text for create option
   */
  set createOptionText(str: string) {
    if (!this.#userCreatedOption) {
      this.#createOptionText = str || '';
      this.ariaDisabled = str === '' ? 'true' : 'false';
      this.hidden = str === '';
    }
  }

  /**
   * whether option is user created option
   */
  get userCreatedOption() {
    return this.#userCreatedOption;
  }

  /**
   * handles when a "create option" is selected
   * @fires optioncreated
   */
  #createOption() {
    this.#createOptionText = '';
    this.#userCreatedOption = true;
    this.dispatchEvent(new Event('optioncreated', { bubbles: true }));
    this.selected = true;
    this.dispatchEvent(new Event('select', { bubbles: true }));
  }

  /**
   * handles option click
   * @fires select
   */
  #onClick() {
    this.dispatchEvent(new Event('select', { bubbles: true }));
  }

  /**
   * handles option click
   * @fires select
   */
  #onKeydown(event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      this.dispatchEvent(new Event('select', { bubbles: true }));
    }
  }

  /**
   * handles option focus
   * @fires optionfocus
   */
  #onFocus() {
    this.dispatchEvent(new Event('optionfocus', { bubbles: true }));
  }

  /**
   * handles option hidden by filter
   * @fires optionfiltered
   */
  #onHiddenByFilter() {
    this.dispatchEvent(new Event('optionfiltered', { bubbles: true }));
  }

  /**
   * handles option blur
   * @fires optionblur
   */
  #onBlur() {
    this.dispatchEvent(new Event('optionblur', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-option': PfSelectOption;
  }
}
