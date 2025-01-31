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

  @property({ reflect: true }) value = '';

  @property({ reflect: true }) id = '';


  createRenderRoot(): this {
    return this; // Renders content into the light DOM
  }

  #handleRadioChange(event: MouseEvent) {
    this.dispatchEvent(new PfRadioChangeEvent(event, this.value));
  }

  render(): TemplateResult<1> {
    const uniqueId: string = Math.random().toString(36).substring(2, 15);
    const inputId: string = this.id;
    this.id = uniqueId;

    return html`
      <input 
        type="radio" 
        name=${this.name}
        value=${this.value} 
        id=${inputId}
        @change="${this.#handleRadioChange}" 
        ?checked=${this.checked}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
