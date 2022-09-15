import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

import style from './BaseTabPanel.scss';

export abstract class BaseTabPanel extends LitElement {
  static readonly styles = [style];

  @property({ reflect: true, type: Boolean }) disabled = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.#upgradeAccessibility();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  setAriaLabelledBy(id: string) {
    if (!this.hasAttribute('aria-labelledby')) {
      this.setAttribute('aria-labelledby', id);
    }
  }

  #upgradeAccessibility() {
    this.setAttribute('role', 'tabpanel');
    if (!this.disabled) {
      this.tabIndex = 0;
    } else {
      this.tabIndex = -1;
    }
  }
}
