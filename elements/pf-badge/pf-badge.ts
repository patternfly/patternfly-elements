import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-badge.css';

/**
 * A **badge** is used to annotate other information like a label or an object name.
 * @alias Badge
 */


@customElement('pf-badge')
export class PfBadge extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Denotes the state-of-affairs this badge represents
   * Options include read and unread
   */
  @property({ reflect: true }) state?: 'unread' | 'read';

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

  override render(): TemplateResult<1> {
    const { threshold, number, textContent } = this;
    const displayText =
        (threshold && number && (threshold < number)) ? `${threshold.toString()}+`
      : (number != null) ? number.toString()
      : textContent ?? '';
    return html`
      <span>${displayText}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-badge': PfBadge;
  }
}
