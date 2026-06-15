import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-v6-badge.css';

export type BadgeState = 'unread' | 'read';

/**
 * A **badge** provides a small count or status annotation for labels,
 * navigation items, or object names. Use a badge when you need to display
 * a numeric count or short status indicator alongside other content.
 *
 * Authors SHOULD slot visually-hidden text for screen readers when the
 * number alone lacks context, e.g. `<pf-v6-badge>3 <span class="sr-only">unread messages</span></pf-v6-badge>`.
 *
 * @summary Annotates content with a small count or status indicator
 *
 * @slot - Badge content, typically a number. Include visually-hidden text for screen reader context.
 *
 * @cssprop {<length>} --pf-v6-c-badge--MinWidth - Minimum badge width
 * @cssprop {<length>} --pf-v6-c-badge--PaddingInlineStart - Inline start padding
 * @cssprop {<length>} --pf-v6-c-badge--PaddingInlineEnd - Inline end padding
 * @cssprop {<length>} --pf-v6-c-badge--FontSize - Badge text font size
 * @cssprop {<number>} --pf-v6-c-badge--FontWeight - Badge text font weight
 * @cssprop {<color>} --pf-v6-c-badge--Color - Badge text color
 * @cssprop {<color>} --pf-v6-c-badge--BackgroundColor - Badge background color
 * @cssprop {<length>} --pf-v6-c-badge--BorderRadius - Badge border radius
 * @cssprop {<length>} --pf-v6-c-badge--BorderWidth - Badge border width
 * @cssprop {<color>} --pf-v6-c-badge--BorderColor - Badge border color
 * @cssprop {<color>} --pf-v6-c-badge--m-read--Color - Text color in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-read--BackgroundColor - Background in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-read--BorderColor - Border color in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-unread--Color - Text color in unread state
 * @cssprop {<color>} --pf-v6-c-badge--m-unread--BackgroundColor - Background in unread state
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--Color - Text color when disabled
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--BackgroundColor - Background when disabled
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--BorderColor - Border color when disabled
 */
@customElement('pf-v6-badge')
export class PfV6Badge extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Denotes the state-of-affairs this badge represents.
   */
  @property({ reflect: true }) state?: BadgeState;

  /** Disables the badge */
  @property({ type: Boolean, reflect: true }) disabled = false;

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-badge': PfV6Badge;
  }
}
