import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';

import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-banner.css';

export type BannerVariant = (
  | 'default'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
);

/**
 * A banner is a 1-line, full color, full width container that can be used to communicate short snippets of information to users.
 * Banners are un-intrusive and non-dismissible.
 * @summary Allows users to display a stylized banner.
 * @cssprop {<length>} --pf-c-banner--PaddingTop  {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-banner--PaddingRight  {@default `1rem`}
 * @cssprop {<length>} --pf-c-banner--PaddingBottom  {@default `0.25rem`}
 * @cssprop {<length>} --pf-c-banner--PaddingLeft  {@default `1rem`}
 * @cssprop {<length>} --pf-c-banner--md--PaddingRight  {@default `1.5rem`}
 * @cssprop {<length>} --pf-c-banner--md--PaddingLeft  {@default `1.5rem`}
 * @cssprop {<length>} --pf-c-banner--FontSize {@default `0.875rem`}
 * @cssprop {<color>} --pf-c-banner--BackgroundColor  {@default `#4f5255`}
 * @cssprop {<color>} --pf-c-banner--m-info--BackgroundColor  {@default `#73bcf7`}
 * @cssprop {<color>} --pf-c-banner--m-danger--BackgroundColor  {@default `#c9190b`}
 * @cssprop {<color>} --pf-c-banner--m-success--BackgroundColor  {@default `#3e8635`}
 * @cssprop {<color>} --pf-c-banner--m-warning--BackgroundColor  {@default `#f0ab00`}
 * @cssprop --pf-c-banner--m-sticky--ZIndex  {@default `300`}
 * @cssprop --pf-c-banner--m-sticky--BoxShadow {@default `0 0.5rem 0.5rem -0.375rem rgba(3, 3, 3, 0.18)`}
 * @csspart container - The container of the banner
 * @slot icon
 *       Contains the labels's icon, e.g. web-icon-alert-success.
 * @slot
 *       Contains the text for the banner
 */
@customElement('pf-banner')
export class PfBanner extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Changes the visual appearance of the banner. */
  @property({ reflect: true }) variant?: BannerVariant;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon?: string;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property({ type: Boolean }) sticky = false;

  /** Represents the state of the anonymous and icon slots */
  #slots = new SlotController(this, null, 'icon');

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('icon') && this.icon) {
      import('@patternfly/elements/pf-icon/pf-icon.js');
    }
  }

  override render(): TemplateResult<1> {
    const { variant, icon } = this;
    const hasIcon = !!icon || this.#slots.hasSlotted('icon');
    return html`
      <div id="container" part="container"
            class=${classMap({ hasIcon, [variant ?? '']: !!variant })}>
        <slot name="icon" part="icon">${!this.icon ? '' : html`
          <pf-icon icon="${this.icon}"></pf-icon>`}
        </slot>
        <slot id="text"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-banner': PfBanner;
  }
}
