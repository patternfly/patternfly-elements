import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-panel.css';

/**
 * The **panel** component is a container that supports flexible content layouts. It can
 * be used to house other components such as fields, forms, videos, buttons, and more.
 * The panel should not be confused with the [drawer](https://www.patternfly.org/v4/components/drawer/design-guidelines/)
 * component, which allows you to surface information via a collapsable container.
 * @alias Panel
 */
@customElement('pf-panel')
export class PfPanel extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ type: Boolean, reflect: true }) scrollable = false;

  @property({ reflect: true }) variant?: 'raised' | 'bordered';

  #slots = new SlotController(this, 'header', null, 'footer');

  render(): TemplateResult<1> {
    const hasHeader = this.#slots.hasSlotted('header');
    const hasFooter = this.#slots.hasSlotted('footer');
    return html`
      <header>
        <!-- Place header content here -->
        <slot name="header" ?hidden="${!hasHeader}"></slot>
      </header>
      <hr role="presentation" ?hidden="${!hasHeader}">
      <!-- Place main content here -->
      <slot></slot>
      <footer>
        <!-- Place footer content here -->
        <slot name="footer" ?hidden="${!hasFooter}"></slot>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-panel': PfPanel;
  }
}
