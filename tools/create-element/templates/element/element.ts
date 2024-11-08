import { LitElement, html, TemplateResult, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from '<%= cssRelativePath %>';

/**
 * <%= readmeName %>
 * @slot - Place element content here
 */
@customElement('<%= tagName %>')
export class <%= className %> extends LitElement {
  static readonly styles: CSSResultGroup = [styles];

  render(): TemplateResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
