import type { TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './BaseButton.scss';

/**
 * Base button class
 *
 * @csspart state - Container for the state slot.
 * @slot icon
 *       Contains the button's icon or state indicator, e.g. a spinner.
 * @slot
 *       Must contain exactly one `<button>` element as the only content not assigned to a named slot.
 */
export abstract class BaseButton extends LitElement {
  static readonly styles = [styles];

  static readonly formAssociated = true;

  static readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** Disables the button */
  @property({ reflect: true, type: Boolean }) disabled = false;

  @property({ reflect: true }) type?: 'button'|'submit'|'reset';

  @property() value?: string;

  @property() name?: string;

  /** Changes the size of the button. */
  @property({ reflect: true }) size?: 'small'|'large';
  /**
   * Use danger buttons for actions a user can take that are potentially
   * destructive or difficult/impossible to undo, like deleting or removing
   * user data.
   */
  @property({ type: Boolean, reflect: true }) danger = false;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon?: string;

  /** Icon set for the `icon` property */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  #internals = new InternalsController(this);

  #initiallyDisabled = this.hasAttribute('disabled');

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.disabled = this.#initiallyDisabled;
  }

  override render() {
    return html`
      <button type=${ifDefined(this.type)}
              class=${classMap({ hasIcon: !!this.icon })}
              value=${ifDefined(this.value)}
              @click=${this.#onClick}
              ?disabled=${this.disabled}>
        <span id="icon" part="icon">
          <slot name="icon">${this.renderDefaultIcon()}</slot>
        </span>
        <span id="text">
          <slot></slot>
        </span>
      </button>
    `;
  }

  #onClick() {
    switch (this.type) {
      case 'reset':
        return this.#internals.reset();
      default:
        return this.#internals.submit();
    }
  }

  /**
   * Fallback content for the icon slot. When the `icon` attribute is set, it
   * should render an icon corresponding to the value.
   *
   * @example ```html
   *          <pfe-icon icon=${this.icon}></pfe-icon>
   *          ```
   */
  protected abstract renderDefaultIcon(): TemplateResult;
}
