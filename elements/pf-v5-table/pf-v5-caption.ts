import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-v5-caption.css';

/**
 * Caption
 * @slot - Place element content here
 */
@customElement('pf-v5-caption')
export class PfV5Caption extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-caption': PfV5Caption;
  }
}
