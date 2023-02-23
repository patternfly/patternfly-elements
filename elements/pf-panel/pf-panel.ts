import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-panel.css';

/**
 * Panel
 * @slot header - Place header content here
 * @slot - Place main content here
 * @slot footer - Place footer content here
 */
@customElement('pf-panel')
export class PfPanel extends LitElement {
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
    'pf-panel': PfPanel;
  }
}
