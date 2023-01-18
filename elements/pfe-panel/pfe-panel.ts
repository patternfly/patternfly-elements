import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pfe-panel.css';

/**
 * Panel
 * @slot header - Place header content here
 * @slot - Place main content here
 * @slot footer - Place footer content here
 */
@customElement('pfe-panel')
export class PfePanel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ type: Boolean, reflect: true }) scrollable = false;

  @property({ reflect: true }) variant?: 'raised'|'bordered';

  #slots = new SlotController(this, 'header', null, 'footer');

  render() {
    const hasHeader = this.#slots.hasSlotted('header');
    const hasFooter = this.#slots.hasSlotted('footer');
    return html`
      <slot name="header" role="region" ?hidden="${!hasHeader}"></slot>
      <hr role="presentation" ?hidden="${!hasHeader}">
      <slot></slot>
      <slot name="footer" role="region" ?hidden="${!hasFooter}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-panel': PfePanel;
  }
}
