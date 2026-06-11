import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-v6-badge.css';

export type BadgeState = 'unread' | 'read';

/**
 * A **badge** is used to annotate other information like a label or an object name.
 * @summary Displays a small annotation, typically a number
 * @slot - Badge content, typically a number or short text.
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
