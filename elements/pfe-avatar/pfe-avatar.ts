import { property, customElement } from 'lit/decorators.js';

import { BaseAvatar } from './BaseAvatar.js';

import style from './pfe-avatar.css';

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 *
 * @summary For displaying a user's avatar image
 */
@customElement('pfe-avatar')
export class PfeAvatar extends BaseAvatar {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /** Size of the Avatar */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  /** Whether to display a border around the avatar */
  @property({ reflect: true }) border?: 'light'|'dark';
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-avatar': PfeAvatar;
  }
}
