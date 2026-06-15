import { LitElement, html, type TemplateResult } from 'lit';

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
 * Status banners SHOULD include an icon and visually-hidden text so
 * screen readers can announce the status context (WCAG 1.3.1). Authors
 * SHOULD AVOID using color alone to convey meaning (WCAG 1.4.1).
 *
 * The banner is not focusable. Slotted interactive content like links
 * remains focusable via Tab.
 *
 * @summary Provides a full-width banner for brief, non-dismissible messages.
 *
 * @slot - Banner message content (text, links, icons). When `status` is set,
 *         include a visually-hidden `<span>` for screen reader context, e.g.
 *         `<span class="pf-v6-screen-reader">Danger alert:</span>`.
 *
 * @cssprop {<color>} --pf-v6-c-banner--BackgroundColor - Default banner background color
 * @cssprop {<color>} --pf-v6-c-banner--Color - Default banner text color
 * @cssprop {<length>} --pf-v6-c-banner--FontSize - Banner font size
 * @cssprop {<length>} --pf-v6-c-banner--PaddingBlockStart - Block (vertical) padding
 * @cssprop {<length>} --pf-v6-c-banner--PaddingInlineStart - Inline (horizontal) padding
 * @cssprop {<length>} --pf-v6-c-banner--md--PaddingInlineStart - Inline padding at medium breakpoint
 * @cssprop {<color>} --pf-v6-c-banner--BorderColor - Block border color (high-contrast mode)
 * @cssprop {<length>} --pf-v6-c-banner--BorderWidth - Block border width (high-contrast mode)
 * @cssprop {<integer>} --pf-v6-c-banner--m-sticky--ZIndex - Z-index when sticky
 * @cssprop --pf-v6-c-banner--m-sticky--BoxShadow - Box shadow when sticky
 * @cssprop {<color>} --pf-v6-c-banner--m-red--BackgroundColor - Red color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-red--Color - Red color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-orangered--BackgroundColor - Orangered color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-orangered--Color - Orangered color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-orange--BackgroundColor - Orange color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-orange--Color - Orange color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-yellow--BackgroundColor - Yellow color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-yellow--Color - Yellow color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-green--BackgroundColor - Green color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-green--Color - Green color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-teal--BackgroundColor - Teal color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-teal--Color - Teal color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-blue--BackgroundColor - Blue color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-blue--Color - Blue color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-purple--BackgroundColor - Purple color variant background
 * @cssprop {<color>} --pf-v6-c-banner--m-purple--Color - Purple color variant text
 * @cssprop {<color>} --pf-v6-c-banner--m-danger--BackgroundColor - Danger status background
 * @cssprop {<color>} --pf-v6-c-banner--m-danger--Color - Danger status text
 * @cssprop {<color>} --pf-v6-c-banner--m-success--BackgroundColor - Success status background
 * @cssprop {<color>} --pf-v6-c-banner--m-success--Color - Success status text
 * @cssprop {<color>} --pf-v6-c-banner--m-warning--BackgroundColor - Warning status background
 * @cssprop {<color>} --pf-v6-c-banner--m-warning--Color - Warning status text
 * @cssprop {<color>} --pf-v6-c-banner--m-info--BackgroundColor - Info status background
 * @cssprop {<color>} --pf-v6-c-banner--m-info--Color - Info status text
 * @cssprop {<color>} --pf-v6-c-banner--m-custom--BackgroundColor - Custom status background
 * @cssprop {<color>} --pf-v6-c-banner--m-custom--Color - Custom status text
 */
@customElement('pf-v6-banner')
export class PfV6Banner extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /**
   * Non-status (decorative) color for the banner background.
   * Overridden by `status` if both are set.
   */
  @property({ reflect: true }) color?: BannerColor;

  /**
   * Status style for the banner. Conveys semantic meaning and overrides `color`.
   * When set, authors SHOULD slot visually-hidden text for screen readers, e.g.
   * `<span class="pf-v6-screen-reader">Danger alert:</span>`.
   */
  @property({ reflect: true }) status?: BannerStatus;

  /** Whether the banner sticks to the top of its container. */
  @property({ type: Boolean, reflect: true }) sticky = false;

  override render(): TemplateResult {
    return html`
      <div id="container">
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
