import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-v6-badge.css';

export type BadgeState = 'unread' | 'read';

/**
 * A **badge** is used to annotate other information like a label or an object name.
 * @summary Displays a numeric value as an annotation
 * @slot - Badge content, typically a number or short text
 * @cssprop {<color>} --pf-v6-c-badge--Color - Text color of the badge
 * @cssprop {<color>} --pf-v6-c-badge--BackgroundColor - Background color of the badge
 * @cssprop {<color>} --pf-v6-c-badge--BorderColor - Border color of the badge
 * @cssprop {<length>} --pf-v6-c-badge--BorderWidth - Border width of the badge
 * @cssprop {<length>} --pf-v6-c-badge--BorderRadius - Border radius of the badge
 * @cssprop {<length>} --pf-v6-c-badge--MinWidth - Minimum width of the badge
 * @cssprop {<length>} --pf-v6-c-badge--PaddingInlineStart - Inline start padding
 * @cssprop {<length>} --pf-v6-c-badge--PaddingInlineEnd - Inline end padding
 * @cssprop {<length>} --pf-v6-c-badge--FontSize - Font size of the badge text
 * @cssprop {<integer>} --pf-v6-c-badge--FontWeight - Font weight of the badge text
 * @cssprop {<color>} --pf-v6-c-badge--m-read--Color - Text color in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-read--BackgroundColor - Background color in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-read--BorderColor - Border color in read state
 * @cssprop {<color>} --pf-v6-c-badge--m-unread--Color - Text color in unread state
 * @cssprop {<color>} --pf-v6-c-badge--m-unread--BackgroundColor - Background color in unread state
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--Color - Text color when disabled
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--BackgroundColor - Background color when disabled
 * @cssprop {<color>} --pf-v6-c-badge--m-disabled--BorderColor - Border color when disabled
 */
@customElement('pf-v6-badge')
export class PfV6Badge extends LitElement {
  static readonly styles = [styles];

  /**
   * Denotes the state-of-affairs this badge represents.
   */
  @property({ reflect: true }) state?: BadgeState;

  /**
   * Sets a numeric value for a badge.
   *
   * You can pair it with `threshold` attribute to add a `+` sign
   * if the number exceeds the threshold value.
   */
  @property({ reflect: true, type: Number }) number?: number;

  /**
   * Sets a threshold for the numeric value and adds `+` sign if
   * the numeric value exceeds the threshold value.
   */
  @property({ reflect: true, type: Number }) threshold?: number;

  /** Disables the badge */
  @property({ type: Boolean, reflect: true }) disabled = false;

  override render(): TemplateResult<1> {
    const { threshold, number } = this;
    const displayText =
        (threshold && number && (threshold < number)) ? `${threshold.toString()}+`
      : (number != null) ? number.toString()
      : '';
    return html`${!displayText ? html`<slot></slot>` : displayText}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-badge': PfV6Badge;
  }
}
