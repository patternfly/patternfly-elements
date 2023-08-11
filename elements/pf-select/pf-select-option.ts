import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
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
   * whether list items are arranged vertically or horizontally;
   * limits arrow keys based on orientation
   */
  @property({ type: Object }) value?: unknown;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.#onFocus);
    this.addEventListener('blur', this.#onBlur);
    this.id = this.id || getRandomId();
    this.#internals;
  }

  render() {
    return html`
      <input type="checkbox" aria-hidden="true" ?checked="${this.#internals.ariaSelected === 'true'}">
      <slot></slot>
      <svg 
        viewBox="0 0 512 512" 
        fill="currentColor" 
        aria-hidden="true">
        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
      </svg>
    `;
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
