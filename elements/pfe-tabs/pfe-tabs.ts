import { LitElement, html } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { bound, observed, cascades, } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

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

  #scrollTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 100);

  @queryAssignedElements({ slot: 'tab', selector: 'pfe-tab', flatten: true }) _tabs!: PfeTab[];
  @queryAssignedElements({ selector: 'pfe-tab-panel' }) _panels!: PfeTabPanel[];

  @query('#tabs') _tabList: HTMLElement;

  @observed
  @property({ reflect: true, attribute: 'active-key' }) activeKey = 0;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  @observed
  @state() current: PfeTab | null = null;

  @observed
  @state() focused: PfeTab | null = null;

  @state() _showScrollButtons = false;

  @state() _overflowOnLeft = false;

  @state() _overflowOnRight = false;

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
    await this.updateComplete;
    this._handleScrollButtons();
    this._tabList.addEventListener('scroll', this._handleScrollButtons);
    // on resize check for overflows
    window.addEventListener('resize', this._handleScrollButtons, false);
  }

  render() {
    const classes = { scrollable: this._showScrollButtons };
    return html`
      <div id="container" part="container">
        <div id="tabs-container" class="${classMap(classes)}">
          ${this._showScrollButtons ? html`
            <button id="previousTab" aria-label="Scroll left" ?disabled="${!this._overflowOnLeft}" @click="${this._scrollLeft}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
            </button>`
          : html``}
          <div id="tabs" part="tabs" role="tablist">
            <slot name="tab" @slotchange="${this.#onSlotChange}"></slot>
          </div>
          ${this._showScrollButtons ? html`
            <button id="nextTab" aria-label="Scroll right" ?disabled="${!this._overflowOnRight}" @click="${this._scrollRight}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
            </button>`
          : html``}
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
    if (tab.disabled) {
      this.#logger.warn(`Tab at active key: ${key} is disabled`);
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
    newVal.button().focus();
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

  #first(): PfeTab {
    const [firstTab] = this.#allTabs();
    return firstTab;
  }

  #last(): PfeTab | undefined {
    const lastTab = this.#allTabs().slice(-1).pop();
    return lastTab;
  }

  #firstFocusable(): PfeTab | undefined {
    const [firstTab] = this.#focusableTabs();
    return this.#allTabs().find(tab => tab.id === firstTab.id);
  }

  #lastFocusable(): PfeTab | undefined {
    const lastTab = this.#focusableTabs().slice(-1).pop();
    if (lastTab) {
      return this.#allTabs().find(tab => tab.id === lastTab.id);
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
        const first = this.#firstFocusable();
        this.#focusTab(first);
      }
    }
    if (key === total) {
      const first = this.#firstFocusable();
      this.#focusTab(first);
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
      const last = this.#lastFocusable();
      this.#focusTab(last);
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

    switch (event.key) {
      case 'ArrowLeft':
        this.#prev();
        break;

      case 'ArrowRight':
        this.#next();
        break;

      case 'Home':
        this.#firstFocusable();
        break;

      case 'End':
        this.#lastFocusable();
        break;

      default:
        return;
    }
  }

  #onSlotChange():void {
    this._tabs.forEach((tab, index) => {
      if (index === 0) {
        tab.classList.add('pfe-tab-first');
      } else {
        tab.classList.remove('pfe-tab-first');
        tab.classList.remove('pfe-tab-last');
      }
      if (index === this._tabs.length - 1) {
        tab.classList.add('pfe-tab-last');
      }
    });
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

  @bound
  _handleScrollButtons(): void {
    clearTimeout(this.#scrollTimeout);
    this.#scrollTimeout = setTimeout(() => {
      const tabs = this._tabList;
      this._overflowOnLeft = !isElementInView(tabs, this.#first() as HTMLElement, false);
      this._overflowOnRight = !isElementInView(tabs, this.#last() as HTMLElement, false);
      this._showScrollButtons = this._overflowOnLeft || this._overflowOnRight;
    }, 100);
  }

  @bound
  _scrollLeft(): void {
    const container = this._tabList;
    const childrenArr = this.#allTabs();
    let firstElementInView: PfeTab | undefined;
    let lastElementOutOfView: PfeTab | undefined;
    let i;
    for (i = 0; i < childrenArr.length && !firstElementInView; i++) {
      if (isElementInView(container, childrenArr[i] as HTMLElement, false)) {
        firstElementInView = childrenArr[i];
        lastElementOutOfView = childrenArr[i - 1];
      }
    }
    if (lastElementOutOfView) {
      container.scrollLeft -= lastElementOutOfView.scrollWidth;
    }
  }

  @bound
  _scrollRight(): void {
    const container = this._tabList;
    const childrenArr = this.#allTabs();
    let lastElementInView: PfeTab | undefined;
    let firstElementOutOfView: PfeTab | undefined;
    for (let i = childrenArr.length - 1; i >= 0 && !lastElementInView; i--) {
      if (isElementInView(container, childrenArr[i] as HTMLElement, false)) {
        lastElementInView = childrenArr[i];
        firstElementOutOfView = childrenArr[i + 1];
      }
    }
    if (firstElementOutOfView) {
      container.scrollLeft += firstElementOutOfView.scrollWidth;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
