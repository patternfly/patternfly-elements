import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { query } from 'lit/decorators/query.js';
import { property } from 'lit/decorators/property.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  FloatingDOMController,
  type Placement,
} from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import '@patternfly/elements/pf-text-input/pf-text-input.js';
import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import { PfSearchInputOption } from './pf-search-input-option.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './pf-search-input.css';

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

  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ reflect: true }) position: Placement = 'bottom';
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;
   /** Current form value */
   @property() value?: string;
   @property() variant: 'single' | 'checkbox' | 'typeahead' | 'typeaheadmulti' = 'single';
  @query('#listbox') listbox!: HTMLElement;
  @query('#button') button!: HTMLButtonElement;
  @query('#combobox') combobox!: HTMLInputElement;
  @query('#placeholder') placeholder!: PfSearchInputOption;
  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  #isNotPlaceholderOption = (option: PfSearchInputOption) => option !== this.placeholder;


  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #internals = InternalsController.of(this);

  #slots = new SlotController(this, null, 'placeholder');



  // static template: TemplateResult<1> = html`
  //   <pf-text-input-autocomplete></pf-text-input-autocomplete>`;

  #combobox = ComboboxController.of(this, {
    multi: this.variant === 'typeaheadmulti' || this.variant === 'checkbox',
    getItems: () => this.options,
    isItem: item => item instanceof PfSearchInputOption,
    getFallbackLabel: () => 'options',
    getListboxElement: () => this.listbox ?? null,
    getToggleButton: () => this.combobox ?? null,
    getComboboxInput: () => this.combobox ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemActive: (item, active) => item.classList.toggle('active', active),
    setItemSelected: (item, selected) => item.selected = selected,
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden)
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: any) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }



  /** List of options */
  get options(): PfSearchInputOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this.placeholder,
        ...Array.from(this.querySelectorAll('pf-search-input-option')),
      ].filter((x): x is PfSearchInputOption => !!x && !x.hidden);
    }
  }

  get selected(): PfSearchInputOption[] {
    return this.#combobox.selected;
  }

  // get activeOption(): HTMLOptionElement | undefined {
  //   return this.options.find(x => x.classList.contains('active'));
  // }

  //<input id="combobox">
  render(): TemplateResult<1> {

    const { expanded, placeholder, variant } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { height, width } = this.getBoundingClientRect?.() || {};
    const placeholderIsInert = !placeholder && this.#slots.isEmpty('placeholder');
    const hasSelection = !!(Array.isArray(this.selected) ? this.selected.length : this.selected);
    const typeahead = variant.startsWith('typeahead');
   const hideLightDomItems = typeahead && !ComboboxController.supportsCrossRootActiveDescendant;

    return html`
      <pf-text-input id="combobox" type="text" placeholder="Placeholder"></pf-text-input> 
        <pf-button disabled plain label="Close">
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
      <pf-button disabled plain label="Search">
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
      </pf-button>
      <div id="listbox-container"  ?hidden="${!expanded}"
             style="${styleMap({
               marginTop: `${height || 0}px`,
               width: width ? `${width}px` : 'auto',
             })}">
        <div id="listbox">
             <pf-search-input-option id="placeholder"
                       disabled
                       ?inert="${placeholderIsInert}"
                       aria-hidden="${ifDefined(placeholderIsInert ? undefined : String(!!hasSelection))}"
                       ?hidden="${!placeholder && this.#slots.isEmpty('placeholder')}"
            ><slot name="placeholder">${placeholder ?? ''}</slot></pf-search-input-option>
            ${this.#combobox.renderItemsToShadowRoot()}
            <slot ?hidden="${hideLightDomItems}"></slot>
        </div>
      </div>
    `;
  }

  @observes('selected')
  private async selectedChanged(_: PfSearchInputOption[], selected: PfSearchInputOption[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    this.hide();
   // this._toggleButton?.focus();
    
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

  @observes('value')
  private valueChanged() {
   // this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSelectChangeEvent());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
