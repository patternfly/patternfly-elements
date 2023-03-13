import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { PfJumpLinksItem } from './pf-jump-links-item.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';

import style from './pf-jump-links-list.css';

/**
 * @cssprop --pf-c-jump-links__list__list__link--PaddingTop -- padding around each link
 * @cssprop --pf-c-jump-links__list__list__link--PaddingBottom
 * @cssprop --pf-c-jump-links__list__list__link--PaddingLeft
 */
@customElement('pf-jump-links-list')
export class PfJumpLinksList extends LitElement {
  static readonly styles = [style];

  @queryAssignedElements() private slottedItems!: PfJumpLinksItem[];

  get items(): HTMLAnchorElement[] {
    return this.slottedItems.flatMap(item => item.items);
  }

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
    'pf-jump-links-list': PfJumpLinksList;
  }
}
