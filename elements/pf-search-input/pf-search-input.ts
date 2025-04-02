import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import type { TemplateResult } from 'lit';

import { LitElement, html, isServer } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

import { PfSearchInputOption } from './pf-search-input-option.js';
import styles from './pf-search-input.css';
import type { PfButton } from '../pf-button/pf-button.js';

export class PfSelectChangeEvent extends Event {
  constructor() {
    super('change', { bubbles: true });
  }
}

/**
 * Search Input
 * @slot - Place element content here
 */
@customElement('pf-search-input')
export class PfSearchInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };


  /** Accessible label for the select */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;


  /** Multi listbox button text */
  @property({ attribute: 'items-selected-text' }) itemsSelectedText = 'items selected';

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the select listbox is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * Enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  /** Current form value */
  @property() value?: string;

  /** Placeholder entry. Overridden by the `placeholder` slot */
  @property() placeholder?: string;

  /**
   * Indicates initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * Default is `bottom`.
   */
  @property({ reflect: true }) position: Placement = 'bottom';


  @query('#toggle-input') private _toggleInput?: HTMLInputElement;

  @query('#toggle-button') private _toggleButton?: HTMLDivElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfSearchInputOption;

  #isNotPlaceholderOption = (option: PfSearchInputOption) => option !== this._placeholder;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #combobox = ComboboxController.of(this, {
    getItems: () => this.options,
    getFallbackLabel: () => this.accessibleLabel
                         || this.#internals.computedLabelText
                         || this.placeholder
                         || this.#slots.getSlotted('placeholder').map(x => x.textContent).join(''),
    getListboxElement: () => this._listbox ?? null,
    getToggleButton: () => this._toggleButton ?? null,
    getComboboxInput: () => this._toggleInput ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden),
    isItem: item => item instanceof PfSearchInputOption,
    setItemActive: (item, active) => item.active = active,
    setItemSelected: (item, selected) => item.selected = selected,
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: PfSearchInputOption | PfSearchInputOption[]) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

  get selected(): PfSearchInputOption[] {
    return this.#combobox.selected;
  }

  /** List of options */
  get options(): PfSearchInputOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this._placeholder,
        ...Array.from(this.querySelectorAll('pf-search-input-option')),
      ].filter((x): x is PfSearchInputOption => !!x && !x.hidden);
    }
  }

  get #buttonLabel(): string {
    const { selected } = this.#combobox;
    return `${selected?.length ?? 0} ${this.itemsSelectedText}`;
  }

  override render(): TemplateResult<1> {
    const { disabled, expanded, placeholder } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { height, width } = this.getBoundingClientRect?.() || {};
    const hideLightDomItems =  !ComboboxController.supportsCrossRootActiveDescendant;

    return html`
      <div 
        id="outer"
        style="${styleMap(styles)}"
        class="${classMap({ disabled, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}"
      >
        <div id="toggle">
          <div class="search-icon">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512">
              <path d="M256.233,5.756c-71.07,15.793-141.44,
              87.863-155.834,159.233c-11.495,57.076,0.3,111.153,
              27.688,154.335L6.339,441.172c-8.596,8.596-8.596,
              22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,
              8.596,30.987,0L192.26,383.796c43.282,
              27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,
              159.632-155.934C540.212,104.314,407.968-27.93,256.233,
              5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944
              S171.969,281.239,171.969,208.37S231.043,76.426,303.913,
              76.426S435.857,135.501,435.857,208.37z">
              </path>
            </svg>
          </div>
          <input 
            id="toggle-input"
            ?disabled="${disabled}"
            placeholder="${placeholder || this.#buttonLabel}"
          >
          <pf-button 
            @click="${this.#OnClose}" 
            ?hidden="${(!expanded && this._toggleInput?.value.trim() === "")}" 
            id="close-button"  
            plain 
            label="Close"
          >
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 
              0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 
              189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 
              0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 
              356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 
              12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 
              44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
              </path>
            </svg>
          </pf-button>
          <div style="width: 0px; height: 0px; padding: 0px; visibility: hidden;" id="toggle-button"></div>
        </div>
        <div 
          id="listbox-container"
          ?hidden="${!expanded}"
          style="${styleMap({
            marginTop: `${height || 0}px`,
            width: width ? `${width}px` : 'auto',
          })}"
        >
          <div id="listbox">
            ${this.#combobox.renderItemsToShadowRoot()}
            <slot ?hidden="${hideLightDomItems}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  @observes('disabled')
  private disabledChanged() {
    this.#combobox.disabled = this.disabled;
  }

  @observes('expanded')
  private async expandedChanged(old: boolean, expanded: boolean) {
    if (this.dispatchEvent(new Event(this.expanded ? 'close' : 'open'))) {
      if (expanded) {
        this.#doExpand();
      } else {
        this.#doCollapse();
      }
    }
  }

  @observes('selected')
  private async selectedChanged(_: PfSearchInputOption[], selected: PfSearchInputOption[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    this._toggleInput!.value = this.value;
  }


  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSelectChangeEvent());
  }


  async #doExpand() {
    try {
      await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
      return true;
    } catch {
      return false;
    }
  }

  async #doCollapse() {
    try {
      await this.#float.hide();
      return true;
    } catch {
      return false;
    }
  }

  #computePlaceholderText() {
    return this.placeholder
      || this.querySelector?.<HTMLSlotElement>('[slot=placeholder]')
          ?.assignedNodes()
          ?.reduce((acc, node) => `${acc}${node.textContent}`, '')
          ?.trim()
      || this.#combobox.items
          .filter(this.#isNotPlaceholderOption)
          .at(0)
          ?.value
      || '';
  }

  /**
   * Opens the dropdown
   */
  async show(): Promise<void> {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes listbox
   */
  async hide(): Promise<void> {
    this.expanded = false;
    await this.updateComplete;
  }

  /**
   * toggles popup based on current state
   */
  async toggle(): Promise<void> {
    if (this.expanded) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  async #OnClose(){
    if (this.expanded) {
      await this.hide();
    }
    this.value = "";
    this._toggleInput!.value = this.value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
