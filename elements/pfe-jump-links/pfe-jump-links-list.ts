import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './pfe-jump-links-list.scss';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links-list')
export class PfeJumpLinksList extends LitElement {
  static readonly styles = [style];

  render() {
    return html`
      <div id="container" role="listbox">
        <slot></slot>
      </div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-list': PfeJumpLinksList;
  }
}
