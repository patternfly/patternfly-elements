import type { ColorTheme } from '@patternfly/pfe-core';

import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import { colorContextConsumer } from '@patternfly/pfe-core/decorators.js';

import { BaseAvatar } from './BaseAvatar.js';

import style from './pfe-avatar.scss';

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 *
 * @summary For displaying a user's avatar image
 *
 * @csspart {HTMLImageElement} img - The image element for when an image URL is provided
 */

@customElement('pfe-avatar') @pfelement()
export class PfeAvatar extends BaseAvatar {
  static readonly version = '{{version}}';

  static readonly styles = [style];


  /**
 * Sets color theme based on parent context
 */
   @colorContextConsumer()
   @property({ reflect: true }) on?: ColorTheme;

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

  declare global {
    interface HTMLElementTagNameMap {
      'pfe-avatar': PfeAvatar;
    }
  }
