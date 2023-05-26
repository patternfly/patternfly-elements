import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './BaseLabel.css';

/**
 * Base label class
 */
export abstract class BaseLabel extends LitElement {
  static readonly styles = [styles];

  abstract variant?: string;

  abstract color?: string;

  abstract icon?: string;

  abstract href?: string;

  /** Represents the state of the anonymous and icon slots */
  protected slots = new SlotController(this, null, 'icon');

  override render() {
    const { variant, color, icon } = this;
    const hasIcon = !!icon || this.slots.hasSlotted('icon');
    const content = html`<slot name="icon" part="icon">${this.renderDefaultIcon?.()}</slot><slot id="text"></slot>`;
    return html`
      <span id="container" class=${classMap({ hasIcon, [variant ?? '']: !!variant, [color ?? '']: !!color })}>
        ${!this.href ? content : html`<a id="link" href=${this.href}>${content}</a>`}
        ${this.renderSuffix?.() ?? ''}
      </span>
    `;
  }

  /**
   * Fallback content for the icon slot. When the `icon` attribute is set, it
   * should render an icon corresponding to the value.
   *
   * @example ```html
   * <pf-icon icon=${this.icon}></pf-icon>
   * ```
   */
  protected abstract renderDefaultIcon?(): unknown;

  /**
   * Optional override to render content after the anonymous slot.
   * @example ```html
   * <button id="close-button">X</button>
   * ```
   */
  protected abstract renderSuffix?(): unknown;
}
