import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-v5-tbody.css';

/**
 * Table body
 * @slot - Place element content here
 */
@customElement('pf-v5-tbody')
export class PfV5Tbody extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-tbody': PfV5Tbody;
  }
}
