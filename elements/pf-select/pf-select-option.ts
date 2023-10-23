import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { property } from 'lit/decorators/property.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';


import styles from './pf-select-option.css';


export class PfSelectOptionCreatedEvent extends Event {
  constructor() {
    super('created', { bubbles: true, composed: true });
  }
}

export class PfSelectOptionSelectEvent extends Event {
  constructor(public originalEvent?: Event) {
    super('select', { bubbles: true, composed: true });
  }
}

/**
 * focus custom event for listbox options
 * @fires focus
 */
export class PfSelectOptionFocusEvent extends Event {
  constructor(public originalEvent: Event) {
    super('focus', { bubbles: true, composed: true });
  }
}

/**
 * blur custom event for listbox options
 * @fires blur
 */
export class PfSelectOptionBlurEvent extends Event {
  constructor(public originalEvent: Event) {
    super('blur', { bubbles: true, composed: true });
  }
}

/**
 * Option within a listbox
 * @slot -
 *        option text
 * @slot icon
 *        optional icon
 * @slot description
 *        optional description
 */
@customElement('pf-select-option')
export class PfSelectOption extends LitElement {
  static readonly styles = [styles];

  /**
   * whether option is disabled
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * value of options
   */
  @property({ attribute: false, reflect: true }) value: unknown;

  /**
   * whether option is selected
   */
  @property({ type: Boolean }) selected = false;


  @queryAssignedNodes({ slot: '', flatten: true }) private _slottedText!: Node[];

  #createOptionText = '';
  #userCreatedOption = false;

  #internals = new InternalsController(this, {
    role: 'option'
  });

  /**
   * whether option is hidden by listbox filtering
   */
  set filtered(filtered: boolean) {
    this.toggleAttribute('filtered', filtered);
  }

  get filtered() {
    return !!this.getAttribute('filtered');
  }

  /**
  * option's position amoun the other options
  */
  set posInSet(posInSet: string | null) {
    this.#internals.ariaPosInSet = `${Math.max(0, parseInt(posInSet || '0'))}`;
  }

  get posInSet() {
    return this.#internals.ariaPosInSet;
  }

  /**
  * total number of options
  */
  set setSize(setSize: string | null) {
    this.#internals.ariaSetSize = `${Math.max(0, parseInt(setSize || '0'))}`;
  }

  get setSize() {
    return this.#internals.ariaSetSize;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId();
  }

  render() {
    return html`
      <div id="outer" class="${this.disabled ? 'disabled' : ''}">
        <input 
          type="checkbox" 
          aria-hidden="true" 
          ?checked=${this.selected}
          ?disabled=${this.disabled}>
        <slot name="icon"></slot>
        <span>${this.#createOptionText === '' ? '' : `${this.#createOptionText}: `}<slot></slot></span>
        <svg 
          ?hidden=${!this.selected}
          viewBox="0 0 512 512" 
          fill="currentColor" 
          aria-hidden="true">
          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
        <div id="description"><slot name="description"></slot></div>
      </div>
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('selected')) {
      if (this.selected) {
        this.#createOption();
      }
      this.#internals.ariaSelected = this.selected ? 'true' : 'false';
      this.dispatchEvent(new PfSelectOptionSelectEvent());
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

  /**
   * used for typeahead to determine if
   * a create option should be shown
   * by setting the text for create option
   */
  set createOptionText(str: string) {
    if (!this.#userCreatedOption) {
      this.#createOptionText = str || '';
      this.disabled = str === '';
      this.hidden = str === '';
    }
  }

  /**
   * whether option is user created option
   */
  get userCreatedOption() {
    return this.#userCreatedOption;
  }

  /**
   * handles when a "create option" is selected
   * @fires optioncreated
   */
  #createOption() {
    this.#createOptionText = '';
    this.#userCreatedOption = true;
    this.dispatchEvent(new PfSelectOptionCreatedEvent());
    this.selected = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select-option': PfSelectOption;
  }
}
