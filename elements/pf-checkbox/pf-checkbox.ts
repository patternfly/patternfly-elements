import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './pf-checkbox.css';

export class RestoreEvent extends Event {
  constructor(public element: PfCheckbox) {
    super('restore', { bubbles: true, composed: true });
  }
}

/**
 * A **checkbox** is used to select a single item or multiple items, typically to choose elements to perform an action or to reflect a binary setting.
 *
 * @slot - Place nested (i.e. 'controlled') patternfly form-control elements here
 * @slot description - Description text of the checkbox.
 * @slot body - Body text of the checkbox.
 *
 * @fires {RestoreEvent} restore - when the form state is restored.
 * @fires change - An event for when the checkbox selection changes.
 *
 * @attr name - Form name of the checkbox
 *
 * @cssprop --pf-c-check__label--Color {@default var(--pf-global--Color--100, #151515)}
 * @cssprop --pf-c-check__label--FontWeight {@default var(--pf-global--FontWeight--normal, 400)}
 * @cssprop --pf-c-check__label--FontSize {@default var(--pf-global--FontSize--md, 1rem)}
 * @cssprop --pf-c-check__label--LineHeight {@default var(--pf-global--LineHeight--sm, 1.3)}
 * @cssprop --pf-c-check__input--Height {@default var(--pf-c-check__label--FontSize)}
 * @cssprop --pf-c-check__input--MarginTop {@default calc(((var(--pf-c-check__label--FontSize) * var(--pf-c-check__label--LineHeight)) - var(--pf-c-check__input--Height)) / 2)}
 * @cssprop --pf-c-check__description--FontSize {@default var(--pf-global--FontSize--sm, 0.875rem)}
 * @cssprop --pf-c-check__description--Color {@default var(--pf-global--Color--200, #6a6e73)}
 * @cssprop --pf-c-check__body--MarginTop {@default var(--pf-global--spacer--sm, 0.5rem)}
 * @cssprop --pf-c-check__label-required--MarginLeft {@default var(--pf-global--spacer--xs, 0.25rem)}
 * @cssprop --pf-c-check__label-required--FontSize {@default var(--pf-global--FontSize--sm, 0.875rem)}
 * @cssprop --pf-c-check__label-required--Color {@default var(--pf-global--danger-color--100)}
 */
@customElement('pf-checkbox')
export class PfCheckbox extends LitElement {
  static readonly styles = [styles];

  static formAssociated = true;

  static shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * Label text of the checkbox.
   */
  @property() label?: string;

  /**
   * Form value of the checkbox
   */
  @property() value = '';

  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /**
   * Flag to show if the checkbox is checked.
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * Flag to show if the checkbox is disabled.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Flag to show if the checkbox is required.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  @queryAssignedElements() private nestedElements?: HTMLElement[];

  /**
   * Flag to show if the checkbox selection is valid or invalid.
   */
  get valid() {
    return this.#internals.validity.valid;
  }

  #internals = this.attachInternals();

  #slots = new SlotController(this, null, 'description', 'body');

  #batching = false;

  constructor() {
    super();
    this.addEventListener('restore', e => this.#onRestore(e));
  }

  override willUpdate() {
    this.#internals.setFormValue(this.checked ? this.value : null);
    this.#setDisabledStateOnNestedControls();
  }

  override render() {
    const { checked, disabled, indeterminate, required } = this;
    const emptyNested = !this.#slots.hasSlotted(SlotController.anonymous as unknown as string);
    const emptyDescription = !this.#slots.hasSlotted('description');
    const emptyBody = !this.#slots.hasSlotted('body');
    return html`
      <input id="checkbox"
             type="checkbox"
             aria-labelledby="accessibleLabel"
             @input="${this.#onChange}"
             .disabled="${disabled}"
             .checked="${checked}"
             .indeterminate="${indeterminate}">
      <label for="checkbox"
             class="${classMap({ disabled })}">
        ${this.label ?? this.#internals.ariaLabel}
        <span id="required" aria-hidden="true" ?hidden="${!required}">*</span>
      </label>
      <slot id="nested"
            @input="${this.#onSlottedChange}"
            ?hidden="${emptyNested}"></slot>
      <slot id="description" name="description" ?hidden="${emptyDescription}"></slot>
      <slot id="body" name="body" ?hidden="${emptyBody}"></slot>
    `;
  }

  async formDisabledCallback() {
    await this.updateComplete;
    this.requestUpdate();
  }

  async formStateRestoreCallback(state: string, mode: string) {
    if (mode === 'restore') {
      const [maybeControlMode, maybeValue] = state.split('/');
      if (maybeValue ?? maybeControlMode === this.value) {
        this.checked = true;
      }
      this.dispatchEvent(new RestoreEvent(this));
    }
  }

  #onChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.#toggleAll(this.checked);
  }

  async #onRestore(event: Event) {
    if (event instanceof RestoreEvent && event.element !== this) {
      await this.updateComplete;
      this.#onSlottedChange();
      this.#setDisabledStateOnNestedControls();
    }
  }

  async #onSlottedChange() {
    if (this.#batching) {
      return;
    }
    let checked = false;
    let unchecked = false;
    for (const el of this.nestedElements ?? []) {
      if (el instanceof PfCheckbox) {
        checked ||= el.checked;
        unchecked ||= !el.checked;
      }
    }
    this.checked = checked && !unchecked;
    this.indeterminate = checked && unchecked;
  }

  async #setDisabledStateOnNestedControls() {
    const controls = this.nestedElements?.filter(x => !(x instanceof PfCheckbox)) ?? [];
    if (controls.length) {
      await Promise.race([
        new Promise(r => setTimeout(r, 1000)),
        Promise.all(controls.map(x =>
          customElements.whenDefined(x.localName)))
      ]);
      for (const control of controls) {
        if ('disabled' in control) {
          control.disabled = !this.checked;
        }
      }
    }
  }

  #toggleAll(force: boolean) {
    this.#batching = true;
    for (const el of this.nestedElements ?? []) {
      if (el instanceof PfCheckbox) {
        el.checked = force;
      }
    }
    this.#batching = false;
  }

  setCustomValidity(message: string) {
    this.#internals.setValidity({}, message);
  }

  checkValidity() {
    return this.#internals.checkValidity();
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-checkbox': PfCheckbox;
  }
}
