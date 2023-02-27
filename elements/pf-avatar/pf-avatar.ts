import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

import { BaseAvatar } from './BaseAvatar.js';

import style from './pf-avatar.css';

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 *
 * @summary For displaying a user's avatar image
 */
@customElement('pf-avatar')
export class PfAvatar extends BaseAvatar {
  static readonly styles = [style];

  /** Size of the Avatar */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  /** Whether to display a border around the avatar */
  @property({ reflect: true }) border?: 'light'|'dark';
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-avatar': PfAvatar;
  }
}
