import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { CssVariableController } from '@patternfly/pfe-core/controllers/css-variable-controller.js';
import { pfelement, bound, observed } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';

import styles from './pfe-avatar.scss';

/**
 * Avatar is an element for displaying a user's avatar image.
 *
 * @summary For displaying a user's avatar image
 *
 * @fires {Event} pfe-avatar:connected - When the element connects to the DOM {@deprecated Use `await pfeAvatar.updateComplete` instead}
 *
 * @csspart {HTMLImageElement} img - The image element for when an image URL is provided
 */
@customElement('pfe-avatar') @pfelement() @register
export class PfeAvatar extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = styles;

  private static readonly defaultSize = 128;

  /**
   * The URL to the user's custom avatar image.
   *
   */
  @observed('_update')
  @property({ reflect: true }) src?: string;

  private css = new CssVariableController(this);


declare global {
  interface HTMLElementTagNameMap {
    'pfe-avatar': PfeAvatar;
  }
}
