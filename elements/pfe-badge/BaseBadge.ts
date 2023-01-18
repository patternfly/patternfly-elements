import { LitElement, html } from 'lit';

import style from './BaseBadge.css';

export abstract class BaseBadge extends LitElement {
  static readonly styles = [style];

  abstract state?: string;

  /**
   * Sets a numeric value for a badge.
   *
   * You can pair it with `threshold` attribute to add a `+` sign
   * if the number exceeds the threshold value.
   */
  abstract number?: number;

  /**
   * Sets a threshold for the numeric value and adds `+` sign if
   * the numeric value exceeds the threshold value.
   */
  abstract threshold?: number;

  override render() {
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
