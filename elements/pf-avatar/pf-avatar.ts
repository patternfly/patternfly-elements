import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';

import { BaseAvatar } from './BaseAvatar.js';

import style from './pf-avatar.css';

/**
 * An avatar is a visual used to represent a user. It may contain an image or a placeholder graphic.
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
