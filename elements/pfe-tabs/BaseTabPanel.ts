import { LitElement, html } from 'lit';

import style from './BaseTabPanel.scss';

export abstract class BaseTabPanel extends LitElement {
  static readonly styles = [style];

  hidden = true;

  #internals = this.attachInternals();

  render() {
    return html`
      <slot></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'tabpanel';
    this.tabIndex = 0;
  }
}
