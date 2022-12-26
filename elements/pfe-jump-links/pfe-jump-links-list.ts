import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links-list')
export class PfeJumpLinksList extends LitElement {
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-list': PfeJumpLinksList;
  }
}
