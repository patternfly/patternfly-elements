import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './pf-text-input.css';

function getLabelText(label: HTMLElement) {
  if (label.hidden) {
    return '';
  } else {
    const ariaLabel = label.getAttribute?.('aria-label');
    return ariaLabel ?? label.textContent;
  }
}

/**
 * Text Input
 * @slot - Place element content here
 */
@customElement('pf-text-input')
export class PfTextInput extends LitElement {
  static readonly styles = [styles];

  static readonly formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true, attribute: 'left-truncated' }) leftTruncated = false;

  @property({ reflect: true }) validated?: 'success' | 'warning';

  @property({ reflect: true }) icon?: 'calendar' | 'clock' | 'search';

  @property({ reflect: true, attribute: 'custom-icon' }) customIcon?: string;

  @property({ reflect: true, attribute: 'custom-icon-dimensions' }) customIconDimensions?: string;

  @property({ type: Boolean, reflect: true }) plain = false;

  @property({ reflect: true }) type?: 'text' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) required = false;

  @property({ type: Boolean, reflect: true }) readonly = false;

  @property() value = '';

  #internals = this.attachInternals();

  #derivedLabel = '';

  get #input() {
    return this.shadowRoot?.getElementById('input') as HTMLInputElement ?? null;
  }

  willUpdate() {
    /** A best-attempt based on observed behaviour in FireFox 115 on fedora 38 */
    this.#derivedLabel =
      this.getAttribute('aria-label') ||
      this.#internals.ariaLabel ||
      Array.from(this.#internals.labels as NodeListOf<HTMLElement>)
        .reduce((acc, label) =>
          `${acc}${getLabelText(label)}`, '');
  }

  render() {
    return html`
      <input id="input"
             @input="${this.#onInput}"
             ?disabled="${this.disabled}"
             ?readonly="${this.readonly}"
             ?required="${this.required}"
             aria-label="${this.#derivedLabel}"
             type="${ifDefined(this.type)}"
             .value="${this.value}"
             style="${ifDefined(this.customIcon && styleMap({
               backgroundImage: `url('${this.customIcon}')`,
               backgroundSize: this.customIconDimensions,
             }))}">
    `;
  }

  #setValidityFromInput() {
    this.#internals.setValidity(
      this.#input?.validity,
      this.#input.validationMessage,
    );
  }

  setCustomValidity(message: string) {
    this.#internals.setValidity({}, message);
  }

  checkValidity() {
    this.#setValidityFromInput();
    return this.#internals.checkValidity();
  }

  reportValidity() {
    this.#setValidityFromInput();
    return this.#internals.reportValidity();
  }

  #onInput(event: Event & { target: HTMLInputElement }) {
    const { value } = event.target;
    this.value = value;
    this.#internals.setFormValue(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-text-input': PfTextInput;
  }
}
