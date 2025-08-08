import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-label.css';

export class LabelCloseEvent extends Event {
  constructor() {
    super('close', { bubbles: true, cancelable: true });
  }
}

/**
 * The **label** component allows users to add specific element captions for user
 * clarity and convenience.
 * @summary Allows users to display meta data in a stylized form.
 * @alias Label
 * @fires {LabelCloseEvent} close - when a removable label's close button is clicked
 * @cssprop {<length>} [--pf-c-label--FontSize=0.875em]
 * @cssprop {<length>} [--pf-c-label--PaddingTop=0.25rem]
 * @cssprop {<length>} [--pf-c-label--PaddingRight=0.5rem]
 * @cssprop {<length>} [--pf-c-label--PaddingBottom=0.25rem]
 * @cssprop {<length>} [--pf-c-label--PaddingLeft=0.5rem]
 * @cssprop {<color>} [--pf-c-label--Color=#151515]
 * @cssprop {<color>} [--pf-c-label--BackgroundColor=#f5f5f5]
 * @cssprop {<length>} [--pf-c-label--BorderRadius=30em]
 * @cssprop {<length>} [--pf-c-label__content--MaxWidth=100]
 * @cssprop {<color>} [--pf-c-label__content--Color=#151515]
 * @cssprop {<length>} [--pf-c-label__content--before--BorderWidth=1px]
 * @cssprop {<color>} [--pf-c-label__content--before--BorderColor=#d2d2d2]
 * @cssprop {<color>} [--pf-c-label--m-outline__content--Color=#151515]
 * @cssprop {<color>} [--pf-c-label--m-outline--BackgroundColor=#ffffff]
 * @cssprop {<color>} [--pf-c-label--m-blue__content--Color=#002952]
 * @cssprop {<color>} [--pf-c-label--m-blue--BackgroundColor=#e7f1fa]
 * @cssprop {<color>} [--pf-c-label--m-blue__content--before--BorderColor=#bee1f4]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-blue__content--Color=#06c]
 * @cssprop {<color>} [--pf-c-label--m-cyan__content--Color=#3b1f00]
 * @cssprop {<color>} [--pf-c-label--m-cyan--BackgroundColor=#f2f9f9]
 * @cssprop {<color>} [--pf-c-label--m-cyan__content--before--BorderColor=#a2d9d9]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-cyan__content--Color=#005f60]
 * @cssprop {<color>} [--pf-c-label--m-green__content--Color=#1e4f18]
 * @cssprop {<color>} [--pf-c-label--m-green--BackgroundColor=#f3faf2]
 * @cssprop {<color>} [--pf-c-label--m-green__content--before--BorderColor=#bde5b8]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-green__content--Color=#3e8635]
 * @cssprop {<color>} [--pf-c-label--m-orange__content--Color=#003737]
 * @cssprop {<color>} [--pf-c-label--m-orange--BackgroundColor=#fff6ec]
 * @cssprop {<color>} [--pf-c-label--m-orange__content--before--BorderColor=#f4b678]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-orange__content--Color=#8f4700]
 * @cssprop {<color>} [--pf-c-label--m-purple__content--Color=#1f0066]
 * @cssprop {<color>} [--pf-c-label--m-purple--BackgroundColor=#f2f0fc]
 * @cssprop {<color>} [--pf-c-label--m-purple__content--before--BorderColor=#cbc1ff]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-purple__content--Color=#6753ac]
 * @cssprop {<color>} [--pf-c-label--m-red__content--Color=#7d1007]
 * @cssprop {<color>} [--pf-c-label--m-red--BackgroundColor=#faeae8]
 * @cssprop {<color>} [--pf-c-label--m-red__content--before--BorderColor=#c9190b]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-red__content--Color=#c9190b]
 * @cssprop {<color>} [--pf-c-label--m-gold__content--Color=#3d2c00]
 * @cssprop {<color>} [--pf-c-label--m-gold--BackgroundColor=#fdf7e7]
 * @cssprop {<color>} [--pf-c-label--m-gold__content--before--BorderColor=#f9e0a2]
 * @cssprop {<color>} [--pf-c-label--m-outline--m-gold__content--Color=#795600]
 * @cssprop {<color>} [--pf-c-label--m-blue__icon--Color=#06c]
 * @cssprop {<color>} [--pf-c-label--m-cyan__icon--Color=#009596]
 * @cssprop {<color>} [--pf-c-label--m-green__icon--Color=#3e8635]
 * @cssprop {<color>} [--pf-c-label--m-orange__icon--Color=#ec7a08]
 * @cssprop {<color>} [--pf-c-label--m-red__icon--Color=#c9190b]
 * @cssprop {<color>} [--pf-c-label--m-gold__icon--Color=#f0ab00]
 * @cssprop {<length>} [--pf-c-label--m-compact--PaddingTop=0]
 * @cssprop {<length>} [--pf-c-label--m-compact--PaddingRight=0.5rem]
 * @cssprop {<length>} [--pf-c-label--m-compact--PaddingBottom=0]
 * @cssprop {<length>} [--pf-c-label--m-compact--PaddingLeft=0.5rem]
 */
@customElement('pf-label')
export class PfLabel extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Changes the style of the label.
   * - Filled: Colored background with colored border.
   * - Outline: White background with colored border.
   */
  @property() variant:
    | 'filled'
    | 'outline' = 'filled';

  /**
   * Changes the color of the label
   */
  @property() color:
    | 'blue'
    | 'cyan'
    | 'green'
    | 'orange'
    | 'purple'
    | 'red'
    | 'grey'
    | 'gold' = 'grey';

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon?: string;

  /** Flag indicating the label is compact */
  @property({ type: Boolean }) compact = false;

  /** Flag indicating the label text should be truncated */
  @property({ type: Boolean }) truncated = false;

  /** Flag indicating the label is removable */
  @property({ type: Boolean }) removable = false;

  /** Text label for a removable label's close button */
  @property({ attribute: 'close-button-label' }) closeButtonLabel?: string;

  /** Represents the state of the anonymous and icon slots */
  #slots = new SlotController(this, null, 'icon');

  override render(): TemplateResult<1> {
    const { compact, truncated } = this;
    const { variant, color, icon } = this;
    const hasIcon = !!icon || this.#slots.hasSlotted('icon');
    return html`
      <span id="container"
            class="${classMap({
              hasIcon,
              compact,
              truncated,
              [variant ?? '']: !!variant,
              [color ?? '']: !!color })}">
        <!-- slot:
               summary: Contains the labels's icon, e.g. web-icon-alert-success.
             part:
               summary: container for the label icon
        -->
        <slot name="icon" part="icon">
          <pf-icon ?hidden="${!icon}"
                   size="sm"
                   .icon="${this.icon || undefined as unknown as string}"></pf-icon>
        </slot>
        <!-- summary: Must contain the text for the label. -->
        <slot id="text"></slot>
        <!-- summary: container for removable labels' close button -->
        <span part="close-button" ?hidden=${!this.removable}>
          <pf-button plain
                     @click="${this.#onClickClose}"
                     label="${this.closeButtonLabel ?? 'remove'}">
            <svg viewBox="0 0 352 512">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
            </svg>
          </pf-button>
        </span>
      </span>
    `;
  }

  #onClickClose() {
    if (this.removable && this.dispatchEvent(new LabelCloseEvent())) {
      this.remove();
    }
  }
}

export type LabelVariant = PfLabel['variant'];

export type LabelColor = PfLabel['color'];

declare global {
  interface HTMLElementTagNameMap {
    'pf-label': PfLabel;
  }
}
