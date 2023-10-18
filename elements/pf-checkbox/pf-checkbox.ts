import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-checkbox.css';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

export class RestoreEvent extends Event {
  constructor(public element: PfCheckbox) {
    super('restore', { bubbles: true, composed: true });
  }
}

/**
 * Checkbox
 * @slot - Place nested (i.e. 'controlled') pf-checkbox elements here
 * @slot description - Description text
 * @slot body - Body text
 */
@customElement('pf-checkbox')
export class PfCheckbox extends LitElement {
  static readonly styles = [styles];

  static formAssociated = true;

  static shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property() label?: string;

  @property() value = '';

  @property({ type: Boolean, reflect: true }) indeterminate = false;

  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @queryAssignedElements() private nestedElements?: HTMLElement[];

  #internals = this.attachInternals();

  #slots = new SlotController(this, null, 'description', 'body');

  #batching = false;

  constructor() {
    super();
    this.addEventListener('restore', e => this.#onRestore(e));
  }

  override willUpdate() {
    this.#internals.setFormValue(this.checked ? this.value : null);
  }

  override render() {
    const emptyNested = !this.#slots.hasSlotted(SlotController.anonymous as unknown as string);
    const emptyDescription = !this.#slots.hasSlotted('description');
    const emptyBody = !this.#slots.hasSlotted('body');
    return html`
      <input id="checkbox"
             type="checkbox"
             aria-labelledby="accessibleLabel"
             @input="${this.#onChange}"
             .checked="${this.checked}"
             .indeterminate="${this.indeterminate}">
      <label for="checkbox">${this.label ?? this.#internals.ariaLabel}</label>
      <slot id="nested"
            @input="${this.#onSlottedCheckboxChange}"
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

  setCustomValidity(message: string) {
    this.#internals.setValidity({}, message);
  }

  checkValidity() {
    return this.#internals.checkValidity();
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  #onChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.#toggleAll(this.checked);
  }

  async #onRestore(event: Event) {
    if (event instanceof RestoreEvent && event.element !== this) {
      await this.updateComplete;
      this.#onSlottedCheckboxChange();
    }
  }

  #onSlottedCheckboxChange() {
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

  #toggleAll(force: boolean) {
    this.#batching = true;
    for (const el of this.nestedElements ?? []) {
      if (el instanceof PfCheckbox) {
        el.checked = force;
      }
    }
    this.#batching = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-checkbox': PfCheckbox;
  }
}
