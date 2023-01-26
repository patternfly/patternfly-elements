import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import style from './BaseAvatar.css';

const DEFAULT = new URL('./lib/img_avatar-light.svg', import.meta.url).pathname;

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 *
 * @summary For displaying a user's avatar image
 */

export class BaseAvatar extends LitElement {
  static readonly styles = [style];

  /** The URL to the user's custom avatar image. */
  @property() src?: string = DEFAULT;

  /** The alt text for the avatar image. */
  @property({ reflect: true }) alt?: string = 'Avatar image';

  /** Size of the Avatar */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  render() {
    return html`
      <img
        size=${this.size}
        alt=${this.alt ?? ''}
        src=${ifDefined(this.src)}>
    `;
  }
}
