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
 * @slot - Place element content here
 */
@customElement('pf-select-option')
export class PfSelectOption extends LitElement {
  static readonly styles = [styles];

  #internals = new InternalsController(this, {
    role: 'option'
  });

  /**
   * whether option is disabled
   */
  @property({ reflect: true, attribute: 'disabled', type: Boolean }) disabled = false;

  /**
   * whether list items are arranged vertically or horizontally;
   * limits arrow keys based on orientation
   */
  @property({ attribute: false, reflect: true }) value: unknown;

  /**
   * whether option is selected
   */
  @property({ type: Boolean }) selected = false;

  /**
  * total number of options
  */
  @property({ type: Number }) setSize!: number;

  /**
  * option's position amoun the other options
  */
  @property({ type: Number }) posInSet!: number;

  @queryAssignedNodes({ slot: '', flatten: true }) private _slottedText!: Node[];


  override connectedCallback() {
    super.connectedCallback();
    this.id = this.id || getRandomId();
    this.addEventListener('click', this.#onClick);
    this.addEventListener('focus', this.#onFocus);
    this.addEventListener('blur', this.#onBlur);
  }

  get optionText() {
    return this._slottedText.map(node => node.textContent).join('').trim();
  }

  render() {
    return html`
      <div>
        <input 
          type="checkbox" 
          aria-hidden="true" 
          ?checked=${this.selected}
          ?disabled=${this.disabled}>
        <slot name="icon"></slot>
        <span><slot></slot></span>
        <svg 
          ?hidden=${!this.selected}
          viewBox="0 0 512 512" 
          fill="currentColor" 
          aria-hidden="true">
          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
      </div>
      <slot name="description"></slot>
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('selected')) {
      this.#internals.ariaSelected = this.selected ? 'true' : 'false';
    }
    if (changed.has('posInSet')) {
      this.#internals.ariaPosInSet = this.posInSet ? `${this.posInSet}` : null;
    }
    if (changed.has('setSize')) {
      this.#internals.ariaSetSize = this.setSize ? `${this.setSize}` : null;
    }
    if (changed.has('disabled')) {
      this.#internals.ariaDisabled = this.disabled ? 'true' : 'false';
    }
  }

  #onClick() {
    this.dispatchEvent(new Event('optionclick', { bubbles: true }));
  }

  #onFocus() {
    this.dispatchEvent(new Event('optionfocus', { bubbles: true }));
  }

  #onBlur() {
    this.dispatchEvent(new Event('optionblur', { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-option': PfSelectOption;
  }
}
