import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-description-list.css';

/**
 * Description List
 * @slot - Place element content here
 */
@customElement('pf-description-list')
export class PfDescriptionList extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-description-list': PfDescriptionList;
  }
}
