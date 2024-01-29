import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-option.css';

/**
 * select event for listbox options
 */
export class PfOptionSelectEvent extends Event {
  constructor(public originalEvent?: Event) {
    super('select', { bubbles: true, cancelable: true });
  }
}

/**
 * focus event for listbox options
 */
export class PfOptionFocusEvent extends Event {
  constructor(public originalEvent: Event) {
    super('focus', { bubbles: true, cancelable: true });
  }
}

/**
 * blur event for listbox options
 */
export class PfOptionBlurEvent extends Event {
  constructor(public originalEvent: Event) {
    super('blur', { bubbles: true, cancelable: true });
  }
}

/**
 * Option within a listbox
 *
 * @fires { PfOptionSelectEvent } select - Fired on option select/deselect
 * @fires { PfOptionFocusEvent } focus - Fired on option focus
 * @fires { PfOptionBlurEvent } blur - Fired on option blur
 * @slot -
 *        option text
 * @slot icon
 *        optional icon
 * @slot description
 *        optional description
 */
@customElement('pf-option')
export class PfOption extends LitElement {
  static readonly styles = [styles];

  /** whether option is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** form value for this option */
  @property({ reflect: true })
  get value() {
    return this.#value ?? this.textContent;
  }

  set value(v: string) {
    this.#value = v;
  }

  /** whether option is selected */
  @property({ type: Boolean }) selected = false;

  /** whether option is active descendant */
  @property({ type: Boolean }) active = false;

  /** Optional option description; overridden by description slot. */
  @property() description = '';

  @queryAssignedNodes({ slot: '', flatten: true })
  private _slottedText!: Node[];

  /**
   * this option's position relative to the other options
   */
  set posInSet(posInSet: number | null) {
    this.#internals.ariaPosInSet = `${Math.max(0, posInSet ?? 0)}`;
  }

  get posInSet() {
    const parsed = parseInt(this.#internals.ariaPosInSet ?? '0');
    return Number.isNaN(parsed) ? null : parsed;
  }

  /**
   * total number of options
   */
  set setSize(setSize: number | null) {
    this.#internals.ariaSetSize = `${Math.max(0, setSize ?? 0)}`;
  }

  get setSize() {
    try {
      const int = parseInt(this.#internals.ariaSetSize ?? '0');
      if (Number.isNaN(int)) {
        return 0;
      } else {
        return int;
      }
    } catch {
      return 0;
    }
  }

  #value = '';

  #internals = InternalsController.of(this, { role: 'option' });

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId();
  }

  render() {
    const { disabled, active } = this;
    return html`
      <div id="outer" class="${classMap({ active, disabled })}">
        <input type="checkbox"
               aria-hidden="true"
               ?checked="${this.selected}"
               ?disabled="${this.disabled}">
        <slot name="icon"></slot>
        <span>
          <slot name="create"></slot>
          <slot></slot>
        </span>
        <svg ?hidden="${!this.selected}"
             viewBox="0 0 512 512"
             fill="currentColor"
             aria-hidden="true">
          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
        <slot id="description" name="description">${this.description ?? ''}</slot>
      </div>
    `;
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('selected')) {
      this.#internals.ariaSelected = this.selected ? 'true' : 'false';
      this.dispatchEvent(new PfOptionSelectEvent());
    }
    if (changed.has('disabled')) {
      this.#internals.ariaDisabled = String(!!this.disabled);
    }
  }

  /**
   * text content within option (used for filtering)
   */
  get optionText() {
    return this._slottedText.map(node => node.textContent).join('').trim();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-option': PfOption;
  }
}
