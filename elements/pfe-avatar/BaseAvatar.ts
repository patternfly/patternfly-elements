import type { ColorTheme } from '@patternfly/pfe-core';

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { colorContextConsumer } from '@patternfly/pfe-core/decorators.js';

import style from './BaseAvatar.scss';

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 *
 * @summary For displaying a user's avatar image
 *
 * @csspart {HTMLImageElement} img - The image element for when an image URL is provided
 */

export abstract class BaseAvatar extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
 * Sets color theme based on parent context
 */
   @colorContextConsumer()
   @property({ reflect: true }) on?: ColorTheme;

   /**
   * The URL to the user's custom avatar image.
   */
    @property({ reflect: true }) src?: string = '/elements/pfe-avatar/lib/img_avatar-dark.svg';

  /**
 * The alt text for the avatar image.
 */
  @property({ reflect: true }) alt?: string = 'Avatar image';

  /** Size of the Avatar */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  render() {
    return html`
      <img
        class="pf-c-avatar"
        size=${this.size}
        alt=${this.alt}
        src=${this.src}
      />
    `;
  }
}
