import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './pf-popover.scss';

/**
 * Popover
 * @slot - Place element content here
 */
@customElement('pf-popover')
export class PfPopover extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-popover': PfPopover;
  }
}
