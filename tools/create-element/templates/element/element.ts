import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from '<%= cssRelativePath %>';

/**
 * <%= readmeName %>
 * @slot - Place element content here
 */
@customElement('<%= tagName %>')
export class <%= className %> extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '<%= tagName %>': <%= className %>;
  }
}
