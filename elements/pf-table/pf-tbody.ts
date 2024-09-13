import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';

import styles from './pf-tbody.css';

/**
 * Table body
 * @slot - Place element content here
 */
@customElement('pf-tbody')
export class PfTbody extends LitElement {
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
    'pf-tbody': PfTbody;
  }
}
