
import type { TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './BaseLabel.scss';

export type LabelVariant = (
  | 'filled'
  | 'outline'
);

export type LabelColor = (
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'grey'
  | 'gold'
)

/**
 * Base label class
 *
 * @cssprop {<length>} --pf-c-label--FontSize   {@default `0.875em`}
 *
 * @cssprop {<length>} --pf-c-label--PaddingTop     {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-label--PaddingRight   {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-label--PaddingBottom  {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-label--PaddingLeft    {@default `0.5rem`}
 *
 * @cssprop {<color>} --pf-c-label--Color           {@default `#151515`}
 * @cssprop {<color>} --pf-c-label--BackgroundColor {@default `#f5f5f5`}
 *
 * @cssprop {<length>} --pf-c-label--BorderRadius {@default `30em`}
 *
 * @cssprop {<length>} --pf-c-label__content--MaxWidth            {@default `100%`}
 * @cssprop {<color>} --pf-c-label__content--Color                {@default `#151515`}
 * @cssprop {<length>} --pf-c-label__content--before--BorderWidth {@default `1px`}
 * @cssprop {<color>} --pf-c-label__content--before--BorderColor  {@default `#d2d2d2`}
 *
 * @cssprop {<color>} --pf-c-label--m-outline__content--Color  {@default `#151515`}
 * @cssprop {<color>} --pf-c-label--m-outline--BackgroundColor {@default `#ffffff`}
 *
 * @cssprop {<color>} --pf-c-label--m-blue__content--Color                {@default `#002952`}
 * @cssprop {<color>} --pf-c-label--m-blue--BackgroundColor               {@default `#e7f1fa`}
 * @cssprop {<color>} --pf-c-label--m-blue__content--before--BorderColor  {@default `#bee1f4`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-blue__content--Color      {@default `#06c`}
 *
 * @cssprop {<color>} --pf-c-label--m-cyan__content--Color                {@default `#3b1f00`}
 * @cssprop {<color>} --pf-c-label--m-cyan--BackgroundColor               {@default `#f2f9f9`}
 * @cssprop {<color>} --pf-c-label--m-cyan__content--before--BorderColor  {@default `#a2d9d9`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-cyan__content--Color      {@default `#005f60`}
 *
 * @cssprop {<color>} --pf-c-label--m-green__content--Color                {@default `#1e4f18`}
 * @cssprop {<color>} --pf-c-label--m-green--BackgroundColor               {@default `#f3faf2`}
 * @cssprop {<color>} --pf-c-label--m-green__content--before--BorderColor  {@default `#bde5b8`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-green__content--Color     {@default `#3e8635`}
 *
 * @cssprop {<color>} --pf-c-label--m-orange__content--Color                {@default `#003737`}
 * @cssprop {<color>} --pf-c-label--m-orange--BackgroundColor               {@default `#fff6ec`}
 * @cssprop {<color>} --pf-c-label--m-orange__content--before--BorderColor  {@default `#f4b678`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-orange__content--Color     {@default `#8f4700`}
 *
 * @cssprop {<color>} --pf-c-label--m-purple__content--Color                {@default `#1f0066`}
 * @cssprop {<color>} --pf-c-label--m-purple--BackgroundColor               {@default `#f2f0fc`}
 * @cssprop {<color>} --pf-c-label--m-purple__content--before--BorderColor  {@default `#cbc1ff`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-purple__content--Color     {@default `#6753ac`}
 *
 * @cssprop {<color>} --pf-c-label--m-red__content--Color                {@default `#7d1007`}
 * @cssprop {<color>} --pf-c-label--m-red--BackgroundColor               {@default `#faeae8`}
 * @cssprop {<color>} --pf-c-label--m-red__content--before--BorderColor  {@default `#c9190b`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-red__content--Color     {@default `#c9190b`}
 *
 * @cssprop {<color>} --pf-c-label--m-gold__content--Color                {@default `#3d2c00`}
 * @cssprop {<color>} --pf-c-label--m-gold--BackgroundColor               {@default `#fdf7e7`}
 * @cssprop {<color>} --pf-c-label--m-gold__content--before--BorderColor  {@default `#f9e0a2`}
 * @cssprop {<color>} --pf-c-label--m-outline--m-gold__content--Color     {@default `#795600`}

 * @cssprop {<color>} --pf-c-label--m-blue__icon--Color {@default `#06c`}
 * @cssprop {<color>} --pf-c-label--m-cyan__icon--Color {@default `#009596`}
 * @cssprop {<color>} --pf-c-label--m-green__icon--Color {@default `#3e8635`}
 * @cssprop {<color>} --pf-c-label--m-orange__icon--Color {@default `#ec7a08`}
 * @cssprop {<color>} --pf-c-label--m-red__icon--Color {@default `#c9190b`}
 * @cssprop {<color>} --pf-c-label--m-gold__icon--Color {@default `#f0ab00`}
 *
 * @slot icon
 *       Contains the labels's icon, e.g. web-icon-alert-success.
 *
 * @slot
 *       Must contain the text for the label.
*/

export abstract class BaseLabel extends LitElement {
  static readonly styles = [styles];

  /**
   * Changes the style of the label.
   * - Filled: Colored background with colored border.
   * - Outline: White background with colored border.
   */
  @property({ reflect: true }) variant: LabelVariant = 'filled';

  /**
   * Changes the color of the label
   */
  @property({ reflect: true }) color: LabelColor = 'grey';

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon = '';

  /** Represents the state of the anonymous and icon slots */
  protected slots = new SlotController(this, null, 'icon');

  #logger = new Logger(this);

  override render() {
    const { icon } = this;
    const hasIcon = this.slots.hasSlotted('icon') || !!icon;
    return html`
      <span id="container" class=${classMap({ hasIcon })}>
        <span part="icon">
          <slot name="icon">
          ${ifDefined(this.icon) ? html`${this.renderDefaultIcon()}` : ``}
          </slot>
        </span>
        <slot></slot>
      </span>
    `;
  }

  /**
   * Fallback content for the icon slot. When the `icon` attribute is set, it
   * should render an icon corresponding to the value.
   *
   * @example ```html
   * <pfe-icon icon=${this.icon}></pfe-icon>
   * ```
   */
  protected abstract renderDefaultIcon(): TemplateResult;
}
