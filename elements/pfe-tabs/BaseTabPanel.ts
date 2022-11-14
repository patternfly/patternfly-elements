import { LitElement, html } from 'lit';

import style from './BaseTabPanel.scss';

export abstract class BaseTabPanel extends LitElement {
  static readonly styles = [style];

  hidden = true;

  render() {
    return html`
      <slot></slot>
    `;
  }

  firstUpdated() {
    this.setAttribute('role', 'tabpanel');
    this.tabIndex = 0;
  }
}
