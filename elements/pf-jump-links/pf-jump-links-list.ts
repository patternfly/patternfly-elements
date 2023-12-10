import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import style from './pf-jump-links-list.css';

/**
 * @cssprop --pf-c-jump-links__list__list__link--PaddingTop -- padding around each link
 * @cssprop --pf-c-jump-links__list__list__link--PaddingBottom
 * @cssprop --pf-c-jump-links__list__list__link--PaddingLeft
 */
@customElement('pf-jump-links-list')
export class PfJumpLinksList extends LitElement {
  static readonly styles = [style];

  render() {
    // TODO: add label
    // eslint-disable-next-line lit-a11y/accessible-name
    return html`<div id="container" role="listbox"><slot></slot></div>`;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-jump-links-list': PfJumpLinksList;
  }
}
