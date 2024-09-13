import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-badge.css';

/**
 * A **badge** is used to annotate other information like a label or an object name.
 * @cssprop {<length>} [--pf-c-badge--BorderRadius=180em]
 * @cssprop {<length>} [--pf-c-badge--MinWidth=2rem]
 * @cssprop {<length>} [--pf-c-badge--PaddingLeft=0.5rem]
 * @cssprop {<length>} [--pf-c-badge--PaddingRight=0.5rem]
 * @cssprop {<length>} [--pf-c-badge--FontSize=0.85em]
 * @cssprop {<length>} [--pf-c-badge--LineHeight=1.5]
 * @cssprop {<length>} [--pf-c-badge--FontWeight=700]
 * @cssprop {<color>} [--pf-c-badge--Color=#151515]
 * @cssprop {<color>} [--pf-c-badge--BackgroundColor=#f0f0f0]
 * @cssprop {<color>} [--pf-c-badge--m-read--Color=#151515]
 * @cssprop {<color>} [--pf-c-badge--m-read--BackgroundColor=#f0f0f0]
 * @cssprop {<color>} [--pf-c-badge--m-unread--Color=#fff]
 * @cssprop {<color>} [--pf-c-badge--m-unread--BackgroundColor=#06c]
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
