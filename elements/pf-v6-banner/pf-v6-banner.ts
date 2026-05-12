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
 * Status banners SHOULD include an icon and `screen-reader-text` so
 * screen readers can announce the status context (WCAG 1.3.1). Authors
 * SHOULD AVOID using color alone to convey meaning (WCAG 1.4.1).
 *
 * The banner is not focusable. Slotted interactive content like links
 * remains focusable via Tab.
 *
 * @summary Provides a full-width banner for brief, non-dismissible messages.
 * @slot - Banner content, including text, links, or icons. For accessibility,
 *         status banners MUST include `screen-reader-text` and SHOULD include
 *         a status icon so sighted users can identify the status at a glance.
 * @cssprop {<color>} [--pf-v6-c-banner--BackgroundColor] - Overrides the banner background color. Defaults to `--pf-t--global--color--nonstatus--gray--default`.
 * @cssprop {<color>} [--pf-v6-c-banner--Color] - Overrides the banner text color. Defaults to `--pf-t--global--text--color--nonstatus--on-gray--default`.
 * @cssprop {<length>} [--pf-v6-c-banner--PaddingBlockStart] - Overrides the block padding. Defaults to `--pf-t--global--spacer--xs`.
 * @cssprop {<length>} [--pf-v6-c-banner--PaddingInlineStart] - Overrides the inline padding. Defaults to `--pf-t--global--spacer--md`.
 * @cssprop {<length>} [--pf-v6-c-banner--md--PaddingInlineStart] - Overrides the inline padding at the medium breakpoint. Defaults to `--pf-t--global--spacer--lg`.
 * @cssprop {<length>} [--pf-v6-c-banner--FontSize] - Overrides the font size. Defaults to `--pf-t--global--font--size--body--default`.
 * @cssprop {<color>} [--pf-v6-c-banner--BorderColor] - Overrides the block border color, visible in high-contrast mode. Defaults to `--pf-t--global--border--color--high-contrast`.
 * @cssprop {<length>} [--pf-v6-c-banner--BorderWidth] - Overrides the block border width, visible in high-contrast mode. Defaults to `--pf-t--global--border--width--high-contrast--regular`.
 * @cssprop {<integer>} [--pf-v6-c-banner--m-sticky--ZIndex] - Overrides the z-index when sticky. Defaults to `--pf-t--global--z-index--md`.
 * @cssprop [--pf-v6-c-banner--m-sticky--BoxShadow] - Overrides the box shadow when sticky. Defaults to `--pf-t--global--box-shadow--md`.
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

  /** Text announced by screen readers to indicate the type of banner. */
  @property({ attribute: 'screen-reader-text' }) screenReaderText?: string;

  override render(): TemplateResult {
    return html`
      <div id="container" class=${classMap({
        [this.color ?? '']: !!this.color,
        [this.status ?? '']: !!this.status,
      })}>
        ${!this.screenReaderText ? nothing
          : html`<span class="sr-only">${this.screenReaderText}</span>`}
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
