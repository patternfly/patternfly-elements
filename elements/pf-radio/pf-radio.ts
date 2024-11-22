import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-radio.css';
import { property } from 'lit/decorators/property.js';

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

  @property({
    type: Boolean,
    // attribute: 'inline-filter',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  })
  checked = false;

  @property({ reflect: true }) name = 'radio-test';
  @property({ reflect: true }) label?: string;
  @property({ reflect: true }) value = '';

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  #onRadioButtonClick(event: Event) {
    if (!this.checked) {
      const root: Node = this.getRootNode();
      let radioGroup: NodeListOf<PfRadio>;
      if (root instanceof Document || root instanceof ShadowRoot) {
        radioGroup = root.querySelectorAll('pf-radio');
        radioGroup.forEach(radio => {
          const element: HTMLElement = radio as HTMLElement;
          element?.removeAttribute('checked');
        });
        this.checked = true;
      }
    }
  }

  render(): TemplateResult<1> {
    return html`
      <label for='input'>${this.label}</label>
      <input
        @click=${(e: Event) => this.#onRadioButtonClick(e)}
        id='input'
        .name=${this.name}
        type='radio'
        .checked='${this.checked}'
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
