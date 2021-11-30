import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './<%= tagName %>.scss';

/**
 * <%= readmeName %>
 * @slot - Place element content here
 */
@customElement('<%= tagName %>') @pfelement()
export class <%= className %> extends LitElement {
  static readonly styles = [styles];

  render() {
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
