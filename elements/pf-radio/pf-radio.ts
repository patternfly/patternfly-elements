import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-radio.css';

export class PfRadioChangeEvent extends Event {
  constructor(public event: Event, public value: string) {
    super('change', { bubbles: true });
  }
}

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio')
export class PfRadio extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static formAssociated = true;
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true }) name = '';

  @property({ reflect: true }) label?: string;

  @property({ reflect: true }) value = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
    this.#createRadioButton(this.name, this.value, this.checked, this.label);
  }

  #createRadioButton(name: string, value: string, checked: boolean, labelText?: string) {
    // Generate a unique ID for the radio button
    const uniqueId = Math.random().toString(36).substring(2, 15);

    // Create the input (radio) element
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = name;
    radioInput.value = value;
    radioInput.id = `radio${uniqueId}`; // Unique ID for the radio button
    radioInput.checked = checked;
    radioInput.slot = 'input';

    // Create the label element
    const label = document.createElement('label');
    label.setAttribute('for', radioInput.id); // Link label to radio button
    label.textContent = labelText || ''; // Set label text (default to empty if not provided)
    label.slot = 'label';
    // Append the input and label
    this.appendChild(radioInput);
    this.appendChild(label);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  #onClick(event: MouseEvent) {
    this.dispatchEvent(new PfRadioChangeEvent(event, this.value));
  }

  render(): TemplateResult<1> {
    return html`
      <slot name="input"></slot>
      <slot name="label"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
