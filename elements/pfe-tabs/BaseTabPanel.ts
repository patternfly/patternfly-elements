import { LitElement, html } from 'lit';

import style from './BaseTabPanel.scss';

export abstract class BaseTabPanel extends LitElement {
  static readonly styles = [style];

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
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
    this.tabIndex = 0;
  }

  setAriaLabelledBy(id: string): void {
    if (!this.hasAttribute('aria-labelledby')) {
      this.setAttribute('aria-labelledby', id);
    }
  }
}
