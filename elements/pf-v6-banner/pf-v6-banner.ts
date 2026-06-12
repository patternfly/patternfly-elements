import { LitElement, html, nothing, type TemplateResult } from 'lit';

import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-v6-banner.css';

export type BannerColor =
  | 'red'
  | 'orangered'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple';

export type BannerStatus =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'custom';

/**
 * A banner provides a full-width container for communicating short,
 * non-dismissible messages. Use a banner when you need to display a
 * brief announcement that allows users to continue without interruption.
 *
 * Status banners SHOULD include an icon and `accessible-label` so
 * screen readers can announce the status context (WCAG 1.3.1). Authors
 * SHOULD AVOID using color alone to convey meaning (WCAG 1.4.1).
 *
 * The banner is not focusable. Slotted interactive content like links
 * remains focusable via Tab.
 *
 * @summary Provides a full-width banner for brief, non-dismissible messages.
 */
@customElement('pf-v6-banner')
export class PfV6Banner extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** Non-status color for the banner background. Overridden by `status` if both are set. */
  @property({ reflect: true }) color?: BannerColor;

  /** Status style for the banner. Conveys semantic meaning and overrides `color`. */
  @property({ reflect: true }) status?: BannerStatus;

  /** Whether the banner sticks to the top of its container. */
  @property({ type: Boolean, reflect: true }) sticky = false;

  /** Accessible label announced by screen readers to convey the banner's status context. */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  override render(): TemplateResult {
    const { color = '', status = '' } = this;
    return html`
      <div id="container" class="${classMap({ [color]: !!color, [status]: !!status })}">
        ${!this.accessibleLabel ? nothing
          : html`<span class="sr-only">${this.accessibleLabel}</span>`}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-banner': PfV6Banner;
  }
}
