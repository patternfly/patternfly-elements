import { customElement } from 'lit/decorators.js';
import { BaseJumpLinks } from './BaseJumpLinks.js';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links')
export class PfeJumpLinks extends BaseJumpLinks {
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links': PfeJumpLinks;
  }
}
