import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import '@patternfly/pfe-icon';

import styles from './pfe-label.scss';

/**
 * Label
 * @slot - Label text
 *
 * @cssprop --pfe-label--PaddingTop {@default 4px} Padding Top
 * @cssprop --pfe-label--PaddingRight {@default 8px} Padding Right
 * @cssprop --pfe-label--PaddingBottom {@default 4px} Padding Bottom
 * @cssprop --pfe-label--PaddingLeft {@default 8px} Padding Left
 * @cssprop --pfe-label--BorderRadius {@default calc(var(--pfe-theme--ui--border-radius, 2px) * 30)} Border Radius
 * @cssprop --pfe-label--LineHeight {@default 1rem} Line Height
 * @cssprop --pfe-label--IconMargin {@default 3px} Icon Right Margin
 * @cssprop --pfe-label--IconColor {@default var(--pfe-label--TextColor, #151515)} Icon Color
 * @cssprop --pfe-label--BackgroundColor {@default #f0f0f0} Default Background Color
 * @cssprop --pfe-label--TextColor {@default #151515} Default Text Color
 * @cssprop --pfe-label--BorderColor {@default #d2d2d2} Default Border Color
 * @cssprop --pfe-label--BlueTextColor {@default #002952} Blue variant Text Color
 * @cssprop --pfe-label--BlueBackgroundColor {@default #e7f1fa} Blue variant Background Color
 * @cssprop --pfe-label--BlueBorderColor {@default #bee1f4} Blue variant Border Color
 * @cssprop --pfe-label--GreenTextColor {@default #0f280d} Green variant Text Color
 * @cssprop --pfe-label--GreenBackgroundColor {@default #f3faf2} Green variant Background Color
 * @cssprop --pfe-label--GreenBorderColor {@default #bde5b8} Green variant Border Color
 * @cssprop --pfe-label--OrangeTextColor {@default #3d2c00} Orange variant Text Color
 * @cssprop --pfe-label--OrangeBackgroundColor {@default #fdf7e7} Orange variant Background Color
 * @cssprop --pfe-label--OrangeBorderColor {@default #f9e0a2} Orange variant Border Color
 * @cssprop --pfe-label--RedTextColor {@default #7d1007} Red variant Text Color
 * @cssprop --pfe-label--RedBackgroundColor {@default #faeae8} Red variant Background Color
 * @cssprop --pfe-label--RedBorderColor {@default #c9190b} Red variant Border Color
 * @cssprop --pfe-label--PurpleTextColor {@default #1f0066} Purple variant Text Color
 * @cssprop --pfe-label--PurpleBackgroundColor {@default #f2f0fc} Purple variant Background Color
 * @cssprop --pfe-label--PurpleBorderColor {@default #cbc1ff} Purple variant Border Color
 * @cssprop --pfe-label--CyanTextColor {@default #003737} Cyan variant Text Color
 * @cssprop --pfe-label--CyanBackgroundColor {@default #f2f9f9} Cyan variant Background Color
 * @cssprop --pfe-label--CyanBorderColor {@default #a2d9d9} Cyan variant Border Color
 * @cssprop --pfe-label--GreyBackgroundColor {@default #f0f0f0} Grey variant Background Color
 * @cssprop --pfe-label--GreyTextColor {@default #151515} Grey variant Text Color
 * @cssprop --pfe-label--GreyBorderColor {@default #d2d2d2} Grey variant Border Color
 * @cssprop  --pfe-label--OutlineBackgroundColor {@default #ffffff} Outline variant Background Color
 *
 */
@customElement('pfe-label') @pfelement()
export class PfeLabel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  /**
   * Sets a value for color for the label
   * Options include grey, blue, green, orange, red, purple, cyan
   * @default grey
   */
  @property({ reflect: true }) color?: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'cyan' = 'grey';

  /**
  * Sets the value for a icon
  */
  @property({ reflect: true }) icon?: string | null = null;

  /**
  * Sets a value for displaying outline version
  * @default undefined
  */
  @property({ reflect: true }) outline?: string | null;

  render() {
    return html`
      <span class="pfe-label">
        <span class="content">
          ${this._renderIcon()}
          <slot></slot>
        </span>
      </span>
    `;
  }

  private _renderIcon(): TemplateResult {
    if (this.icon) {
      return html`<span class="icon"><pfe-icon icon="${this.icon}" size="1x"></pfe-icon></span>`;
    } else {
      return html``;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-label': PfeLabel;
  }
}
