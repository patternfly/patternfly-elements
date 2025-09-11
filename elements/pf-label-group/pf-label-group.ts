import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-label-group.css';

/**
 * Label Group
 * @slot - Place element content here
 */
@customElement('pf-label-group')
export class PfLabelGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-label-group': PfLabelGroup;
  }
}
