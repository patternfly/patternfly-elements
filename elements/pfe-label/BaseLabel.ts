import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './BaseLabel.scss';

export type LabelVariant = (
  | 'filled'
  | 'outline'
);

export type LabelColor = (
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'grey'
  | 'gold'
)

/**
 * Base label class
*/
export abstract class BaseLabel extends LitElement {
  static readonly styles = [styles];

  /**
   * Changes the style of the label.
   * - Filled: Colored background with colored border.
   * - Outline: White background with colored border.
   */
  @property({ reflect: true }) variant: LabelVariant = 'filled';

  /**
   * Changes the color of the label
   */
  @property({ reflect: true }) color: LabelColor = 'grey';

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon = '';

  /** Represents the state of the anonymous and icon slots */
  protected slots = new SlotController(this, null, 'icon');

  override render() {
    const { icon } = this;
    const hasIcon = this.slots.hasSlotted('icon') || !!icon;
    return html`
      <span id="container" class=${classMap({ hasIcon })}>
        <span part="icon">
          <slot name="icon">${this.renderDefaultIcon()}</slot>
        </span>
        <span id="text">
          <slot></slot>
        </span>
      </span>${this.renderSuffix?.() ?? ''}
    `;
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
