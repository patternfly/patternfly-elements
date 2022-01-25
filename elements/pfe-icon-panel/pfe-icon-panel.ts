import type { IconColor } from '@patternfly/pfe-icon';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import '@patternfly/pfe-icon';

import style from './pfe-icon-panel.scss';

/**
 * Icon panel provides a way to present text with an accompanying icon.
 *
 * @summary Provides a way to present text with an accompanying icon
 *
 * @slot header - The header of the icon panel. Assign content to this region using `slot="header`.
 * @slot - Any content that is not designated for the header or footer slot, will go to this slot.
 * @slot footer - Use this slot for anything that you want in the footer of the icon panel.  Assign content to this region using `slot="footer`.
 * @slot pfe-icon-panel--header - {@deprecated Use `header`} Same as header
 * @slot pfe-icon-panel--footer - {@deprecated Use `footer`} Same as footer

 */
@customElement('pfe-icon-panel') @pfelement()
export class PfeIconPanel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * For example, `rh-leaf` loads a leaf icon from an icon set named "rh".
   * Values:
   * - `${iconSet}-${iconName}`
   */
  @property({ reflect: true }) icon?: string;

  /**
   * The color variant to use. This draws from your theming layer to color the icon. This will set icon color or background color (if circled is true).
   *
   * Values:
   * - base
   * - lightest
   * - lighter
   * - darker
   * - darkest
   * - complement
   * - accent
   * - critical
   * - important
   * - moderate
   * - success
   * - info
   * - default
   *
   */
  @property({ reflect: true }) color: IconColor = 'darker';

  /**
   * Whether to draw a circular background behind the icon.
   */
  @property({ reflect: true, type: Boolean }) circled = false;

  /** Stacked */
  @property({ reflect: true, type: Boolean }) stacked = false;

  /** Centered */
  @property({ reflect: true, type: Boolean }) centered = false;

  render() {
    return html`
      <pfe-icon
          ?circled="${this.circled}"
          color="${this.color}"
          size="${this.circled ? 'lg' : 'xl'}"
          icon="${this.icon}"
      ></pfe-icon>
      <div class="pfe-icon-panel__content">
        <slot class="pfe-icon-panel__header" name="header"></slot>
        <slot class="pfe-icon-panel__header" name="pfe-icon-panel--header"></slot>
        <slot class="pfe-icon-panel__body"></slot>
        <slot class="pfe-icon-panel__footer" name="footer"></slot>
        <slot class="pfe-icon-panel__footer" name="pfe-icon-panel--footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon-panel': PfeIconPanel;
  }
}
