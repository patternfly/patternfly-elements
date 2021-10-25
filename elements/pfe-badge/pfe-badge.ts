import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-badge.scss';

/**
 * The badge component provides a way to have small numerical descriptors for UI elements.
 *
 * @summary Provides a way to have small numerical descriptors for UI elements
 */
@customElement('pfe-badge') @pfelement()
export class PfeBadge extends LitElement {
  static readonly styles = [style];

  /**
   * Denotes the state-of-affairs this badge represents
   * Options include moderate, important, critical, success, info.
   */
  @property({ reflect: true }) state?: 'moderate'|'important'|'critical'|'success'|'info';

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

  render() {
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
    'pfe-badge': PfeBadge;
  }
}
