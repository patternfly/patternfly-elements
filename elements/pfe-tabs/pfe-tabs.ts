import { LitElement, html } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';

import { bound, observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfeTab, PfeTabExpandEvent } from './pfe-tab.js';
import { PfeTabPanel } from './pfe-tab-panel.js';

import style from './pfe-tabs.scss';

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tabs')
export class PfeTabs extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  #logger = new Logger(this);

  @queryAssignedElements({ slot: 'tab', selector: 'pfe-tab', flatten: true }) _tabs!: PfeTab[];
  @queryAssignedElements({ selector: 'pfe-tab-panel' }) _panels!: PfeTabPanel[];

  @observed
  @property({ reflect: true, attribute: 'active-key' }) activeKey = 0;

  @property({ reflect: true, type: Boolean }) box = false;

  @property({ reflect: true, type: Boolean }) vertical = false;

  @observed
  @state() current: PfeTab | null = null;

  @observed
  @state() focused: PfeTab | null = null;

  static isTab(element: HTMLElement) {
    return element instanceof PfeTab;
  }

  static isPanel(element: HTMLElement) {
    return element instanceof PfeTabPanel;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-expand', this._tabExpandEventHandler);
    this.addEventListener('keydown', this._onKeyDownHandler);
    this.#updateAccessibility();
  }

  render() {
    return html`
      <div id="container" part="container">
        <div id="wrapper">
          <div id="tabs" part="tabs" role="tablist">
            <div id="tab-container">
              <slot name="tab"></slot>
            </div>
          </div>
        </div>
        <div id="panels" part="panels">
          <slot></slot>
        </div>
      </div>
    `;
  }

  #activate(key: number): void {
    let tab = this.#allTabs()[key];
    if (tab === undefined) {
      this.#logger.warn(`Tab at active key: ${key} does not exist`);
      // if tab doesn't exist return first of set
      [tab] = this.#allTabs();
    }
    // set the current an focused to tab
    this.current = tab;
    this.focused = tab;
  }

  @bound
  private _currentChanged(oldVal: PfeTab, newVal: PfeTab) {
    if (!newVal || newVal === oldVal) {
      return;
    }
    if (oldVal) {
      oldVal.selected = 'false';
    }
    newVal.selected = 'true';
    const selectedPanel = this.#allPanels().find(panel => panel.getAttribute('aria-labelledby') === newVal.id);
    if (selectedPanel) {
      selectedPanel.hidden = false;
      const notSelectedPanels = this.#allPanels().filter(panel => panel !== selectedPanel);
      notSelectedPanels.forEach(panel => panel.hidden = true);
    }
  }

  @bound
  private _focusedChanged(oldVal: PfeTab, newVal: PfeTab) {
    if (!newVal || newVal === oldVal) {
      return;
    }
    newVal.focus();
  }

  #allTabs(): PfeTab[] {
    return this._tabs.filter(PfeTabs.isTab);
  }

  #focusableTabs(): PfeTab[] {
    return this._tabs.filter(tab => PfeTabs.isTab(tab) && tab.disabled === false);
  }

  #allPanels(): PfeTabPanel[] {
    return this._panels.filter(PfeTabs.isPanel);
  }

  #tabIndex(element: PfeTab): number | null {
    if (!PfeTabs.isTab(element)) {
      this.#logger.warn('PfeTab element expected');
      return null;
    }
    return this.#allTabs().findIndex(tab => tab.id === element.id);
  }

  #focusableTabIndex(element: PfeTab): number | null {
    if (!PfeTabs.isTab(element)) {
      this.#logger.warn('PfeTab element expected');
      return null;
    }
    return this.#focusableTabs().findIndex(tab => tab.id === element.id && tab.disabled === false);
  }

  #first(): void {
    const [firstTab] = this.#focusableTabs();
    const found = this.#allTabs().find(tab => tab.id === firstTab.id);
    this.#focusTab(found);
  }

  #last(): void {
    const lastTab = this.#focusableTabs().slice(-1).pop();
    if (lastTab) {
      const found = this.#allTabs().find(tab => tab.id === lastTab.id);
      this.#focusTab(found);
    }
  }

  #next(): void {
    if (!this.focused) {
      return;
    }

    const total = this.#focusableTabs().length;
    const key = this.#focusableTabIndex(this.focused);

    if (key !== null) {
      const newKey = key + 1;
      if (newKey < total) {
        const nextTab = this.#focusableTabs()[key + 1];
        const found = this.#allTabs().find(tab => tab.id === nextTab.id);
        this.#focusTab(found);
      } else {
        this.#first();
      }
    }

    if (key === total) {
      this.#first();
    }
  }

  #prev(): void {
    if (!this.focused) {
      return;
    }
    const key = this.#focusableTabIndex(this.focused);
    if (key && key !== 0) {
      const prevTab = this.#focusableTabs()[key - 1];
      const found = this.#allTabs().find(tab => tab === prevTab);
      this.#focusTab(found);
    }
    if (key === 0) {
      this.#last();
    }
  }

  #focusTab(tab: PfeTab | undefined) {
    if (tab) {
      if (!tab.getAttribute('aria-disabled')) {
        this.current = tab;
      }
      this.focused = tab;
    }
  }

  @bound
  private _tabExpandEventHandler(event: Event): void {
    if (event instanceof PfeTabExpandEvent) {
      const selected = this.#allTabs().find(tab => tab === event.target as PfeTab);
      if (selected) {
        this.current = selected;
      }
    }
  }

  @bound
  private async _activeKeyChanged(oldVal: string | undefined, newVal: string ): Promise<void> {
    await this.updateComplete;
    const key = parseInt(newVal);
    this.#activate(key);
  }

  @bound
  private _onKeyDownHandler(event: KeyboardEvent) {
    const foundTab = this.#allTabs().find(tab => tab === event.target);
    if (!foundTab) {
      return;
    }

    // if (event.shiftKey && event.key === 'Tab') {
    //   this.#prev();
    // } else {
    switch (event.key) {
      case 'ArrowLeft':
        this.#prev();
        break;

      case 'ArrowRight':
        this.#next();
        break;

      case 'Home':
        this.#first();
        break;

      case 'End':
        this.#last();
        break;

      default:
        return;
    }
    // }
  }

  async #updateAccessibility(): Promise<void> {
    await this.updateComplete;
    this.#allTabs().forEach((tab: PfeTab, index: number) => {
      this.#allPanels().forEach((panel: PfeTabPanel, pindex: number) => {
        if (index === pindex) {
          panel.setAriaLabelledBy(tab.id);
          tab.setAriaControls(panel.id);
        }
      });
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
