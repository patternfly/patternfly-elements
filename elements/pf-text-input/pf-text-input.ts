import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-text-input.css';

/**
 * Text Input
 * @slot - Place element content here
 */
@customElement('pf-text-input')
export class PfTextInput extends LitElement {
  static readonly styles = [styles];

  static readonly formAssociated = true;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'left-truncated' }) leftTruncated = false;

  @property({ type: Boolean, reflect: true }) readonly = false;

  @property({ type: Boolean, reflect: true }) plain = false;

  @property() value = '';

  #internals = this.attachInternals();

  render() {
    return html`
      <input id="input"
             ?disabled="${this.disabled}"
             ?readonly="${this.readonly}"
             .value="${this.value}">
    `;
  }

  setCustomValidity(message: string) {
    this.#internals.setValidity({}, message);
  }

  checkValidity() {
    return this.#internals.checkValidity();
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-text-input': PfTextInput;
  }
}
