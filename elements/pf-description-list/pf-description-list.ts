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
       <dl class="pf-c-description-list pf-m-grid-md"></dl>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-description-list': PfDescriptionList;
  }
}
