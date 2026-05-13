import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-v6-badge.css';

export type BadgeState = 'unread' | 'read';

/**
 * A **badge** is used to annotate other information like a label or an object name.
 * @summary Displays a numeric value as an annotation
 */
@customElement('pf-v6-badge')
export class PfV6Badge extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

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
  @property({ type: Number }) number?: number;

  /**
   * Sets a threshold for the numeric value and adds `+` sign if
   * the numeric value exceeds the threshold value.
   */
  @property({ type: Number }) threshold?: number;

  /** Disables the badge */
  @property({ type: Boolean, reflect: true }) disabled = false;

  override render(): TemplateResult {
    const { threshold, number } = this;
    const displayText =
        (threshold && number && (threshold <= number)) ? `${threshold.toString()}+`
      : (number != null) ? number.toString()
      : '';
    return html`${!displayText ? html`<!-- Badge content, typically a number or short text --><slot></slot>` : displayText}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-badge': PfV6Badge;
  }
}
