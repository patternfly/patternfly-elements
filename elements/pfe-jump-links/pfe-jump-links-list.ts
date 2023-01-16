import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './pfe-jump-links-list.scss';

/**
 * @cssprop --pf-c-jump-links__list__list__link--PaddingTop -- padding around each link
 * @cssprop --pf-c-jump-links__list__list__link--PaddingBottom
 * @cssprop --pf-c-jump-links__list__list__link--PaddingLeft
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
