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
  @property() checked = false;
  @property({ reflect: true }) name = 'radio-test';
  @property({ reflect: true }) label?: string;
  // #input:any

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();

    const root = this.getRootNode();
    if (root instanceof Document || root instanceof ShadowRoot) {
      const group = root.querySelectorAll(`pf-radio`);
      // console.log("------------- the group is", group);
    }
  }


  render(): TemplateResult<1> {
    return html`
      <label for=input>${this.label}</label>
      <input id=input class="pf-radio" .name=${this.name} type="radio" .checked="${this.checked}">
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
