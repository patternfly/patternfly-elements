import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

import style from './BaseTabPanel.scss';

export abstract class BaseTabPanel extends LitElement {
  static readonly styles = [style];

  @property({ reflect: true, type: Boolean }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  firstUpdated() {
    this.#upgradeAccessibility();
  }

  #upgradeAccessibility(): void {
    this.setAttribute('role', 'tabpanel');
    if (!this.disabled) {
      this.tabIndex = 0;
    } else {
      this.tabIndex = -1;
    }
  }

  setAriaLabelledBy(id: string): void {
    if (!this.hasAttribute('aria-labelledby')) {
      this.setAttribute('aria-labelledby', id);
    }
  }
}
