import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-switch.css';

/**
 * A **switch** provides a toggle control for turning a setting on or off.
 * Each switch MUST have a visible label or an `accessible-label` attribute.
 * Switches without visible labels SHOULD set `show-check-icon`.
 * Keyboard: `Space` or `Enter` toggles the switch.
 * Uses ARIA `switch` role via ElementInternals (WCAG 1.3.1, 4.1.2, 2.1.1).
 *
 * @summary Toggle control for on/off settings
 *
 * @slot - Label text displayed beside the switch toggle
 *
 * @fires {Event} change - Fires when the switch is toggled. Uses the native
 *        `Event` interface with no custom detail payload.
 *        Cancelable: call `preventDefault()` to reject the state change.
 *
 * @cssprop {<length>} --pf-v6-c-switch--ColumnGap - Gap between toggle and label {@default 0.5rem}
 * @cssprop {<length>} --pf-v6-c-switch--FontSize - Switch font size {@default 0.875rem}
 * @cssprop {<number>} --pf-v6-c-switch--LineHeight - Switch line height {@default 1.5}
 * @cssprop {<length>} --pf-v6-c-switch--Height - Switch container height {@default auto}
 * @cssprop {<color>} --pf-v6-c-switch__toggle--BackgroundColor - Toggle track background color (unchecked)
 * @cssprop {<color>} --pf-v6-c-switch__input--checked__toggle--BackgroundColor - Toggle track background color (checked)
 * @cssprop {<color>} --pf-v6-c-switch__input--disabled__toggle--BackgroundColor - Toggle track background color (disabled)
 * @cssprop {<color>} --pf-v6-c-switch__input--not-checked__toggle--before--BackgroundColor - Knob color (unchecked)
 * @cssprop {<color>} --pf-v6-c-switch__input--checked__toggle--before--BackgroundColor - Knob color (checked)
 * @cssprop {<color>} --pf-v6-c-switch__input--disabled__toggle--before--BackgroundColor - Knob color (disabled)
 * @cssprop {<color>} --pf-v6-c-switch__toggle-icon--Color - Check icon color
 * @cssprop {<color>} --pf-v6-c-switch__input--not-checked__label--Color - Label color (unchecked)
 * @cssprop {<color>} --pf-v6-c-switch__input--checked__label--Color - Label color (checked)
 * @cssprop {<color>} --pf-v6-c-switch__input--disabled__label--Color - Label color (disabled)
 * @cssprop {<length>} --pf-v6-c-switch__toggle--BorderRadius - Toggle track border radius
 * @cssprop {<length>} --pf-v6-c-switch__toggle--Width - Toggle track width
 * @cssprop {<length>} --pf-v6-c-switch__toggle--Height - Toggle track height
 * @cssprop {<length>} --pf-v6-c-switch__toggle--before--Width - Knob width
 * @cssprop {<length>} --pf-v6-c-switch__toggle--before--Height - Knob height
 * @cssprop {<length>} --pf-v6-c-switch__toggle--before--BorderRadius - Knob border radius
 * @cssprop {<color>} --pf-v6-c-switch__input--focus__toggle--OutlineColor - Focus outline color
 * @cssprop {<length>} --pf-v6-c-switch__input--focus__toggle--OutlineWidth - Focus outline width
 * @cssprop {<length>} --pf-v6-c-switch__input--focus__toggle--OutlineOffset - Focus outline offset
 * @cssprop {<length>} --pf-v6-c-switch__toggle-icon--Offset - Offset used in knob and track sizing calculations
 * @cssprop {<length>} --pf-v6-c-switch__toggle--before--BorderWidth - Knob border width (high-contrast mode)
 * @cssprop --pf-v6-c-switch__toggle--before--Transition - Knob transition shorthand
 * @cssprop --pf-v6-c-switch__toggle--before--TransitionTimingFunction - Knob transition timing function
 * @cssprop {<time>} --pf-v6-c-switch__toggle--before--TransitionDuration - Knob transition duration
 * @cssprop {<length>} --pf-v6-c-switch__input--checked__toggle--before--TranslateX - Knob translate distance when checked
 * @cssprop {<color>} --pf-v6-c-switch__input--disabled__toggle--BorderColor - Toggle border color (disabled)
 * @cssprop {<length>} --pf-v6-c-switch__input--checked__toggle--BorderWidth - Toggle border width (checked)
 * @cssprop {<color>} --pf-v6-c-switch__input--checked__toggle--BorderColor - Toggle border color (checked)
 * @cssprop {<color>} --pf-v6-c-switch__input--disabled__toggle-icon--Color - Check icon color (disabled)
 * @cssprop {<length>} --pf-v6-c-switch__toggle-icon--FontSize - Check icon font size
 * @cssprop {<length>} --pf-v6-c-switch__toggle-icon--InsetInlineStart - Check icon horizontal position
 * @cssprop {<color>} --pf-v6-c-switch__toggle--BorderColor - Toggle border color (unchecked)
 * @cssprop {<length>} --pf-v6-c-switch__toggle--BorderWidth - Toggle border width (unchecked)
 * @cssprop {<length>} --pf-v6-c-switch__toggle--before--InsetInlineStart - Knob horizontal offset (unchecked)
 */
@customElement('pf-v6-switch')
export class PfV6Switch extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  #internals = InternalsController.of(this, { role: 'switch' });

  #slots = new SlotController(this, null);

  /**
   * Accessible label for the switch when there is no visible label text.
   * Should describe the checked state, e.g. "Wi-Fi" (not "Wi-Fi on/off").
   */
  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Flag to show a check icon on the toggle when checked. */
  @property({ reflect: true, type: Boolean, attribute: 'show-check-icon' }) showCheckIcon = false;

  /** Whether the switch is checked. */
  @property({ reflect: true, type: Boolean }) checked = false;

  /** Whether the switch is disabled. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Reverses the layout so the label appears before the toggle. */
  @property({ reflect: true, type: Boolean }) reversed = false;

  /** Form value defaults to undefined */
  @property() value?: string;

  #initialChecked = false;

  get #classes() {
    return [
      this.checked && 'checked',
      this.disabled && 'disabled',
      this.reversed && 'reversed',
    ].filter(Boolean).join(' ');
  }

  get labels(): NodeListOf<HTMLLabelElement> {
    return this.#internals.labels as NodeListOf<HTMLLabelElement>;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.#initialChecked = this.checked;
      this.addEventListener('click', this.#onClick);
      this.addEventListener('keyup', this.#onKeyup);
      this.addEventListener('keydown', this.#onKeydown);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keyup', this.#onKeyup);
    this.removeEventListener('keydown', this.#onKeydown);
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
    this.requestUpdate();
  }

  formResetCallback(): void {
    this.checked = this.#initialChecked;
  }

  override willUpdate(): void {
    this.tabIndex = this.disabled ? -1 : 0;
    this.#internals.ariaChecked = String(!!this.checked);
    this.#internals.ariaDisabled = String(!!this.disabled);
    this.#internals.ariaLabel = this.accessibleLabel || null;
    this.#internals.setFormValue(this.checked ? (this.value ?? 'on') : null);
  }

  override render(): TemplateResult<1> {
    return html`
      <span id="toggle" class="${this.#classes}">
        <span id="check-icon"
              ?hidden=${!this.showCheckIcon || (this.showCheckIcon && !this.checked)}>
          <svg role="presentation"
               fill="currentColor"
               height="1em"
               width="1em"
               viewBox="0 0 512 512">
            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
          </svg>
        </span>
      </span>
      <span id="label"
            class="${this.#classes}"
            ?hidden=${this.#slots.isEmpty()}>
<slot></slot>
      </span>
    `;
  }

  #onClick(event: Event) {
    // @ts-expect-error: firefox workaround for double-firing when switch is nested in a label
    const { originalTarget, explicitOriginalTarget } = event;
    if (explicitOriginalTarget) {
      let labels: HTMLLabelElement[];
      if (originalTarget === event.target
          && !(labels = Array.from(this.labels)).includes(explicitOriginalTarget)
          && labels.includes(this.closest('label') as HTMLLabelElement)) {
        return;
      }
    }
    this.#toggle();
  }

  #onKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.#toggle();
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  #toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      if (!this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))) {
        this.checked = !this.checked;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-switch': PfV6Switch;
  }
}
