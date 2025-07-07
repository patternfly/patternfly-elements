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
import { PfOption } from '../pf-select/pf-option.js';
import { bound } from '@patternfly/pfe-core/decorators.js';
import '@patternfly/elements/pf-text-input/pf-text-input.js';
import styles from './pf-search-input.css';

export class PfSearchChangeEvent extends Event {
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

  static instances: Set<PfSearchInput> = new Set<PfSearchInput>();

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

  @query('#placeholder') private _placeholder?: PfOption;

  @query('#outer') private _searchInputContainer!: HTMLElement;

  // #isNotPlaceholderOption = (option: PfOption) => option !== this._placeholder;

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
    isItem: item => item instanceof PfOption,
    setItemActive: (item, active) => item.active = active,
    setItemSelected: (item, selected) => item.selected = selected,
  });

  static {
    if (!isServer) {
      document.addEventListener('click', event => {
        for (const instance of PfSearchInput.instances) {
          instance._onOutsideClick(event);
        }
      });
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    PfSearchInput.instances.add(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    PfSearchInput.instances.delete(this);
  }

  // Function to handle the closing of popover
  @bound private _onOutsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this._searchInputContainer)) {
      if (this.expanded) {
        this.expanded = false;
      }
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: PfOption | PfOption[]) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

  get selected(): PfOption[] {
    return this.#combobox.selected;
  }

  /** List of options */
  get options(): PfOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this._placeholder,
        ...Array.from(this.querySelectorAll('pf-option')),
      ].filter((x): x is PfOption => !!x && !x.hidden);
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
    const hideLightDomItems = !ComboboxController.supportsCrossRootActiveDescendant;

    return html`
      <div 
        id="outer"
        style="${styleMap(styles)}"
        class="${classMap({ disabled, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}"
      >
        <div id="toggle">
          <div class="search-icon">
            <pf-icon size="md" icon="search" set="fas">search</pf-icon>
          </div>
          <input 
            id="toggle-input"
            ?disabled="${disabled}"
            @keydown=${this.#onSearchInput}
            placeholder="${placeholder || this.#buttonLabel}">
          <pf-button 
            @click="${this.#OnClose}" 
            ?hidden="${this.#hideCloseButton()}" 
            id="close-button"  
            plain 
            label="Close"
          >
            <pf-icon size="md" icon="close" set="patternfly">close</pf-icon>
          </pf-button>
          <button aria-label="toggle button" inert class="visually-hidden" id="toggle-button"></button>
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
  private async selectedChanged(_: PfOption[], selected: PfOption[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    this._toggleInput!.value = this.value;
  }


  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSearchChangeEvent());
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

  async #OnClose() {
    if (this.expanded) {
      await this.hide();
    }
    this.value = '';
    this._toggleInput!.value = this.value;
    this.#combobox.selected = [];
  }

  #hideCloseButton() {
    if (!isServer) {
      return !this.expanded && this._toggleInput?.value.trim() === ''; // SSR or server-side environment: don't hide the element
    }
    return false;
  }

  #onSearchInput(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.value = this._toggleInput?.value;
      this.#internals.setFormValue(this.value ?? '');
      this.dispatchEvent(new PfSearchChangeEvent());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
