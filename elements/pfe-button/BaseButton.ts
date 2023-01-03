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
 * @csspart icon - Container for the icon slot
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

  /** Accessible name for the button, use when the button does not have slotted text */
  @property() label?: string;

  @property() value?: string;

  @property() name?: string;

  /** Changes the size of the button. */
  abstract size?: string;

  /**
   * Use danger buttons for actions a user can take that are potentially
   * destructive or difficult/impossible to undo, like deleting or removing
   * user data.
   */
  abstract danger: unknown;

  /** Shorthand for the `icon` slot, the value is icon name */
  @property() icon?: string;

  #internals = new InternalsController(this);

  #initiallyDisabled = this.hasAttribute('disabled');

  protected get hasIcon() {
    return !!this.icon;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.disabled = this.#initiallyDisabled;
  }

  override render() {
    const { hasIcon } = this;
    return html`
      <button type="${ifDefined(this.type)}"
              class="${classMap({ hasIcon })}"
              value="${ifDefined(this.value)}"
              aria-label="${ifDefined(this.label)}"
              @click="${this.#onClick}"
              ?disabled="${this.disabled}">
        <slot id="icon" part="icon" aria-hidden="true" name="icon">${this.renderDefaultIcon()}</slot>
        <slot id="text" aria-hidden=${String(!!this.label) as 'true'|'false'}></slot>
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
   *          <base-icon icon=${this.icon}></base-icon>
   *          ```
   */
  protected abstract renderDefaultIcon(): TemplateResult;
}
