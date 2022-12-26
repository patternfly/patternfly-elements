import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseJumpLinks } from './BaseJumpLinks.js';

import './pfe-jump-links-item.js';

import style from './pfe-jump-links.scss';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links')
export class PfeJumpLinks extends BaseJumpLinks {
  static readonly styles = [style];

  render() {
    return html`
      <nav id="container">
        <slot role="listbox"></slot>
      </nav>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links': PfeJumpLinks;
  }
}
