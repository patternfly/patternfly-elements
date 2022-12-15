import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './BaseLabel.scss';

/**
 * Base label class
*/
export abstract class BaseLabel extends LitElement {
  static readonly styles = [styles];

  abstract variant: string;

  abstract color: string;

  abstract icon: string;

  protected classes = {};

  /** Represents the state of the anonymous and icon slots */
  protected slots = new SlotController(this, null, 'icon');

  willUpdate() {
    this.classes = { 'has-icon': this.#hasIcon(), [`${this.variant}`]: true, [`${this.color}`]: true };
  }

  override render() {
    return html`
      <span id="container" class=${classMap(this.classes)}>
        <span part="icon">
          <slot name="icon">${this.renderDefaultIcon()}</slot>
        </span>
        <span id="text">
          <slot></slot>
        </span>
        ${this.renderSuffix?.() ?? ''}
      </span>
    `;
  }

  #hasIcon() {
    const { icon } = this;
    return (this.slots.hasSlotted('icon') || !!icon);
  }

  /**
   * Fallback content for the icon slot. When the `icon` attribute is set, it
   * should render an icon corresponding to the value.
   *
   * @example ```html
   * <pfe-icon icon=${this.icon}></pfe-icon>
   * ```
   */
  protected abstract renderDefaultIcon(): unknown;

  /**
   * Optional override to render content after the anonymous slot.
   * @example ```html
   * <button id="close-button">X</button>
   * ```
   */
  protected abstract renderSuffix?(): unknown;
}
