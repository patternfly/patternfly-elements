import type { TemplateResult } from 'lit';
import { LitElement, html, isServer, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-checkbox.css';

/**
 * A **checkbox** is used to select a single item or multiple items, typically to
 * choose elements to perform an action or to reflect a binary setting.
 *
 * @summary Select one or more items from a set, or toggle a binary setting
 *
 * @slot - Body content and controlled (nested) checkboxes
 * @slot description - Description text displayed below the label
 *
 * @fires {Event} input - Fires when the checkbox is toggled, like a native checkbox
 * @fires {Event} change - Fires when the checkbox is toggled, like a native checkbox
 *
 * @csspart input - The checkbox input
 * @csspart label - The label text
 * @csspart required - The required indicator
 * @csspart description - The description container
 * @csspart body - The body container
 */
@customElement('pf-v6-checkbox')
export class PfV6Checkbox extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  #internals = InternalsController.of(this, { role: 'checkbox' });

  #logger = new Logger(this);

  #slots = new SlotController(this, null, 'description');

  #labelRef = createRef<HTMLElement>();

  #descriptionRef = createRef<HTMLElement>();

  #defaultChecked = false;

  #hasConnected = false;

  #authorTabIndex: string | null = null;

  #customValidity = '';

  #batching = false;

  #warnedAboutExternalLabel = false;

  /** Visible label text. */
  @property({ reflect: true }) label?: string;

  /** Accessible name used when there is no visible label. */
  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Whether the checkbox is checked. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * Whether the checkbox is in the indeterminate (partially checked) state.
   * This is a JavaScript-only property; there is no corresponding HTML attribute,
   * matching the native `<input type="checkbox">` API.
   */
  @property({ type: Boolean, attribute: false }) indeterminate = false;

  /** Whether the checkbox is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the checkbox must be checked for the form to be valid. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Whether the checkbox should be displayed as invalid. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The value submitted with the form when the checkbox is checked. */
  @property() value = 'on';

  /** Position of the label relative to the checkbox input. */
  @property({ reflect: true, attribute: 'label-position' }) labelPosition: 'start' | 'end' = 'end';

  /** The form-associated element's validity state. */
  get validity(): ValidityState {
    return this.#internals.validity;
  }

  /** The validation message for the checkbox. */
  get validationMessage(): string {
    return this.#validityState()[1];
  }

  /** The `<label>` elements associated with the checkbox. */
  get labels(): NodeList {
    return this.#internals.labels;
  }

  get #disabled(): boolean {
    return this.disabled || this.#internals.formDisabled;
  }

  get #input(): HTMLInputElement | null {
    return this.shadowRoot?.getElementById('input') as HTMLInputElement | null;
  }

  get #nestedCheckboxes(): PfV6Checkbox[] {
    return Array.from(this.querySelectorAll<HTMLElement>('pf-v6-checkbox'))
        .filter((element): element is PfV6Checkbox => element instanceof PfV6Checkbox);
  }

  /**
   * Descendants that take part in controlled toggling and aggregate state:
   * checkboxes that are not effectively disabled, whether by their own
   * attribute or by an enclosing disabled fieldset.
   */
  get #controlledCheckboxes(): PfV6Checkbox[] {
    return this.#nestedCheckboxes.filter(checkbox => !checkbox.#disabled);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (isServer) {
      return;
    }
    // Capture the form-reset baseline only on the first connection, so that
    // moving the element in the DOM cannot overwrite it with a value the user
    // has since toggled.
    if (!this.#hasConnected) {
      this.#hasConnected = true;
      this.#defaultChecked = this.checked;
    }
    this.#authorTabIndex = this.getAttribute('tabindex');
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
    this.addEventListener('change', this.#onNestedChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (isServer) {
      return;
    }
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeydown);
    this.removeEventListener('change', this.#onNestedChange);
  }

  override willUpdate(): void {
    this.#syncInternals();
  }

  /**
   * Applies the state that event listeners and form submission must observe
   * synchronously. Called both from the update lifecycle and immediately before
   * input/change events are dispatched, while rendering stays asynchronous.
   */
  #syncInternals(): void {
    const disabled = this.#disabled;

    this.#internals.ariaChecked = this.indeterminate ? 'mixed' : String(this.checked);
    this.#internals.ariaDisabled = String(disabled);
    this.#internals.ariaRequired = String(this.required);
    this.#internals.ariaInvalid = String(this.invalid);
    this.#internals.ariaLabel = this.accessibleLabel ?? null;

    // Disabled form controls are barred from constraint validation and are not
    // included in form submission, matching native checkbox behaviour.
    this.#internals.setFormValue(this.checked && !disabled ? this.value : null);

    if (disabled) {
      this.tabIndex = -1;
    } else if (this.#authorTabIndex == null) {
      this.tabIndex = 0;
    } else {
      this.tabIndex = Number(this.#authorTabIndex);
    }

    this.#updateValidity();
  }

  override updated(): void {
    const input = this.#input;
    if (input) {
      input.checked = this.checked;
      input.indeterminate = this.indeterminate;
    }

    const label = this.#labelRef.value ?? null;
    if ((this.#internals.ariaLabelledByElements?.[0] ?? null) !== label) {
      this.#internals.ariaLabelledByElements = label ? [label] : null;
    }

    const description =
        this.#slots.hasSlotted('description') ?
        this.#descriptionRef.value ?? null
      : null;
    if ((this.#internals.ariaDescribedByElements?.[0] ?? null) !== description) {
      this.#internals.ariaDescribedByElements = description ? [description] : null;
    }

    if (!this.#warnedAboutExternalLabel
        && this.label
        && this.#internals.labels.length) {
      this.#warnedAboutExternalLabel = true;
      this.#logger.warn(
        'Using the `label` attribute together with an external <label> element '
        + 'is not supported. Use one or the other.',
      );
    }
  }

  override firstUpdated(): void {
    if (this.#nestedCheckboxes.length) {
      // An explicitly checked parent controls its children; otherwise the
      // children's initial state determines the parent's aggregate state.
      if (this.hasAttribute('checked')) {
        this.#toggleNested(true);
      } else {
        this.#syncNestedState();
      }
    }
  }

  override render(): TemplateResult<1> {
    const disabled = this.#disabled;
    const hasLabel = !!this.label;
    const hasDescription = this.#slots.hasSlotted('description');
    const hasBody = this.#slots.hasSlotted();

    const input = html`
      <input id="input"
             part="input"
             type="checkbox"
             class="${classMap({ disabled })}"
             ?checked="${this.checked}"
             ?disabled="${disabled}"
             tabindex="-1"
             inert
             @change="${this.#onInputChange}">
    `;

    const label = hasLabel ? html`
      <span id="label"
            part="label"
            ${ref(this.#labelRef)}
            class="${classMap({ disabled })}">${this.label}${!this.required ? nothing : html`
        <span id="required" part="required" aria-hidden="true">*</span>`}</span>
    ` : nothing;

    return html`
      ${this.labelPosition === 'start' ? html`${label}${input}` : html`${input}${label}`}
      <span id="description"
            part="description"
            ${ref(this.#descriptionRef)}
            ?hidden="${!hasDescription}">
        <slot name="description" @slotchange="${this.#onSlotChange}"></slot>
      </span>
      <span id="body" part="body" ?hidden="${!hasBody}">
        <slot @slotchange="${this.#onSlotChange}"></slot>
      </span>
    `;
  }

  /**
   * Sets a custom validation message, like `HTMLInputElement.setCustomValidity()`.
   * @param message the validation message; an empty string clears it
   */
  setCustomValidity(message: string): void {
    this.#customValidity = message;
    this.#updateValidity();
  }

  /** Returns whether the checkbox passes constraint validation. */
  checkValidity(): boolean {
    this.#updateValidity();
    return this.#internals.checkValidity();
  }

  /** Returns whether the checkbox passes constraint validation and reports the problem if not. */
  reportValidity(): boolean {
    this.#updateValidity();
    return this.#internals.reportValidity();
  }

  formDisabledCallback(): void {
    this.requestUpdate();
  }

  formResetCallback(): void {
    this.checked = this.#defaultChecked;
    this.indeterminate = false;
    this.requestUpdate();
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    // `setFormValue(null)` is used when unchecked, so any restored state means
    // the checkbox was checked when the page was left.
    this.checked = state != null;
    this.requestUpdate();
  }

  #updateValidity(): void {
    const [flags, message] = this.#validityState();
    this.#internals.setValidity(flags, message);
  }

  /**
   * Derives the constraint-validation state from the current properties, so
   * that `setValidity` and the public `validationMessage` share one source of
   * truth.
   */
  #validityState(): [ValidityStateFlags, string] {
    if (this.#disabled) {
      return [{}, ''];
    } else if (this.#customValidity) {
      return [{ customError: true }, this.#customValidity];
    } else if (this.required && !this.checked) {
      return [
        { valueMissing: true },
        'Please check this box if you want to proceed.',
      ];
    } else {
      return [{}, ''];
    }
  }

  #onClick(event: MouseEvent): void {
    if (this.#disabled) {
      return;
    }

    // Ignore clicks originating in slotted body/description content or in a
    // nested (controlled) checkbox. Clicks on the host itself, the shadow label,
    // and the shadow input toggle this checkbox.
    for (const node of event.composedPath()) {
      if (node === this) {
        break;
      } else if (node instanceof PfV6Checkbox) {
        return;
      } else if (node instanceof HTMLElement) {
        if (node.id === 'body' || node.id === 'description') {
          return;
        }
        if (node !== this.#input
            && node.matches('a[href], button, input, select, textarea, [contenteditable="true"]')) {
          return;
        }
      }
    }

    this.#toggle();
  }

  #onKeydown(event: KeyboardEvent): void {
    if (event.target !== this || this.#disabled) {
      return;
    }
    if (event.key === ' ') {
      event.preventDefault();
      this.#toggle();
    }
  }

  #onInputChange(): void {
    const input = this.#input;
    if (!input || this.#disabled) {
      return;
    }
    if (input.checked === this.checked && !this.indeterminate) {
      return;
    }
    this.checked = input.checked;
    this.indeterminate = false;
    this.#toggleNested(this.checked);
    this.#dispatchChangeEvents();
  }

  #onNestedChange(event: Event): void {
    if (this.#batching || event.target === this) {
      return;
    }
    if (event.target instanceof PfV6Checkbox) {
      this.#syncNestedState();
    }
  }

  #onSlotChange(): void {
    this.requestUpdate();
    this.#syncNestedState();
  }

  #toggle(): void {
    this.indeterminate = false;
    this.checked = !this.checked;
    this.#toggleNested(this.checked);
    this.#dispatchChangeEvents();
  }

  #dispatchChangeEvents(): void {
    // Listeners and form submission read form value and validity synchronously,
    // so update this checkbox and its controlled descendants before dispatching.
    this.#syncInternals();
    for (const checkbox of this.#controlledCheckboxes) {
      checkbox.#syncInternals();
    }
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  #toggleNested(checked: boolean): void {
    const nested = this.#controlledCheckboxes;
    if (!nested.length) {
      return;
    }
    this.#batching = true;
    for (const checkbox of nested) {
      checkbox.checked = checked;
      checkbox.indeterminate = false;
    }
    this.#batching = false;
  }

  #syncNestedState(): void {
    const nested = this.#controlledCheckboxes;
    if (!nested.length) {
      return;
    }
    const checked = nested.filter(checkbox => checkbox.checked).length;
    this.checked = checked === nested.length;
    this.indeterminate = checked > 0 && checked < nested.length;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-checkbox': PfV6Checkbox;
  }
}
