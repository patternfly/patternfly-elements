import { LitElement, html } from 'lit';
import { state, property, query, queryAssignedElements } from 'lit/decorators.js';

import { bound, observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

import { BaseTab, TabExpandEvent } from './BaseTab.js';
import { BaseTabPanel } from './BaseTabPanel.js';

import style from './BaseTab.scss';

export abstract class BaseTabs extends LitElement {
  static readonly styles = [style];

  static readonly delay = 100;

  static isTab(element: BaseTab): element is BaseTab {
    return element instanceof BaseTab;
  }

  static isPanel(element: BaseTabPanel): element is BaseTabPanel {
    return element instanceof BaseTabPanel;
  }

  @query('[part="tabs"]') _tabList!: HTMLElement;

  @queryAssignedElements({ slot: 'tab' }) protected _tabs!: BaseTab[];

  @queryAssignedElements() protected _panels!: BaseTabPanel[];

  @observed
  @state() current: BaseTab | null = null;

  @observed
  @state() focused: BaseTab | null = null;

  @observed
  @property({ reflect: true, attribute: 'active-key' }) activeKey = 0;

  @state() protected _showScrollButtons = false;

  @state() protected _overflowOnLeft = false;

  @state() protected _overflowOnRight = false;

  #logger = new Logger(this);

  #scrollTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 100);

  #allTabs: BaseTab[] = [];

  #allPanels: BaseTabPanel[] = [];

  #focusableTabs: BaseTab[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-expand', this._tabExpandEventHandler);
    this.addEventListener('keydown', this._onKeyDownHandler);
    // on resize check for overflows
    window.addEventListener('resize', this._handleScrollButtons, false);
  }

  override render() {
    return html`
      <div part="container">
        <div part="tabs-container">
          ${this._showScrollButtons ? html`
            <button id="previousTab" aria-label="Scroll left" ?disabled="${!this._overflowOnLeft}" @click="${this._scrollLeft}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
            </button>`
          : html``}
          <div part="tabs" role="tablist">
            <slot name="tab" @slotchange="${this._onSlotChange}"></slot>
          </div>
          ${this._showScrollButtons ? html`
            <button id="nextTab" aria-label="Scroll right" ?disabled="${!this._overflowOnRight}" @click="${this._scrollRight}">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
            </button>`
          : html``}
        </div>
        <div part="panels">
          <slot @slotchange="${this._onSlotChange}"></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this._handleScrollButtons();
    this.#updateAccessibility();
    this._tabList.addEventListener('scroll', this._handleScrollButtons);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleScrollButtons);
  }

  private get allTabs() {
    return this.#allTabs;
  }

  private set allTabs(tabs: BaseTab[]) {
    tabs = tabs.filter(tab => BaseTabs.isTab(tab));
    this.#allTabs = tabs;
    this.#focusableTabs = tabs.filter(tab => !tab.disabled);
  }

  private get focusableTabs() {
    return this.#focusableTabs;
  }

  private get allPanels() {
    return this.#allPanels;
  }

  private set allPanels(panels: BaseTabPanel[]) {
    panels = panels.filter(panel => BaseTabs.isPanel(panel));
    this.#allPanels = panels;
  }

  #focusableTabIndex(element: BaseTab): number | null {
    if (!BaseTabs.isTab(element)) {
      this.#logger.warn('Tab element expected');
      return null;
    }
    return this.#focusableTabs.findIndex(tab => tab.id === element.id && !tab.disabled);
  }

  #focusTab(tab: BaseTab | undefined) {
    if (tab) {
      if (!tab.getAttribute('aria-disabled')) {
        this.current = tab;
      }
      this.focused = tab;
    }
  }

  #activate(key: number): void {
    let tab = this.allTabs[key];
    if (tab === undefined) {
      this.#logger.warn(`Tab at active key: ${key} does not exist`);
      // if tab doesn't exist return first of set
      [tab] = this.allTabs;
    }
    if (tab.disabled) {
      this.#logger.warn(`Tab at active key: ${key} is disabled`);
    }
    // set the current an focused to tab
    this.current = tab;
    this.focused = tab;
  }

  #first(): BaseTab {
    const [firstTab] = this.allTabs;
    return firstTab;
  }

  #last(): BaseTab | undefined {
    const lastTab = this.allTabs.slice(-1).pop();
    return lastTab;
  }

  #firstFocusable(): BaseTab | undefined {
    const [firstTab] = this.focusableTabs;
    return this.allTabs.find(tab => tab.id === firstTab.id);
  }

  #lastFocusable(): BaseTab | undefined {
    const lastTab = this.focusableTabs.slice(-1).pop();
    if (lastTab) {
      return this.allTabs.find(tab => tab.id === lastTab.id);
    }
  }

  #next(): void {
    if (!this.focused) {
      return;
    }

    const total = this.focusableTabs.length;
    const key = this.#focusableTabIndex(this.focused);

    if (key !== null) {
      const newKey = key + 1;
      if (newKey < total) {
        const nextTab = this.focusableTabs[key + 1];
        const found = this.allTabs.find(tab => tab.id === nextTab.id);
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
      const prevTab = this.focusableTabs[key - 1];
      const found = this.allTabs.find(tab => tab === prevTab);
      this.#focusTab(found);
    }
    if (key === 0) {
      const last = this.#lastFocusable();
      this.#focusTab(last);
    }
  }

  protected _onSlotChange(): void {
    this.allTabs = this._tabs;
    this.#firstLastClasses();
    this.allPanels = this._panels;
    this.#updateAccessibility();
  }


  #updateAccessibility(): void {
    this.allTabs.forEach((tab: BaseTab, index: number) => {
      const panel = this.allPanels[index];
      panel.setAriaLabelledBy(tab.id);
      tab.setAriaControls(panel.id);
    });
  }

  #firstLastClasses() {
    this.allTabs.forEach((tab, index) => {
      if (index === 0) {
        tab.classList.add('first');
      } else {
        tab.classList.remove('first');
        tab.classList.remove('last');
      }
      if (index === this.length - 1) {
        tab.classList.add('last');
      }
    });
  }

  @bound
  private _tabExpandEventHandler(event: Event): void {
    if (event instanceof TabExpandEvent) {
      const selected = this.allTabs.find(tab => tab === event.target as BaseTab);
      if (selected) {
        this.current = selected;
        this.focused = selected;
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
  private _currentChanged(oldVal: BaseTab, newVal: BaseTab): void {
    if (!newVal || newVal === oldVal) {
      return;
    }
    if (oldVal) {
      oldVal.selected = 'false';
    }
    newVal.selected = 'true';
    const selectedPanel = this.allPanels.find(panel => panel.getAttribute('aria-labelledby') === newVal.id);
    if (selectedPanel) {
      selectedPanel.hidden = false;
      const notSelectedPanels = this.allPanels.filter(panel => panel !== selectedPanel);
      notSelectedPanels.forEach(panel => panel.hidden = true);
    }
  }

  @bound
  private _focusedChanged(oldVal: BaseTab, newVal: BaseTab): void {
    if (!newVal || newVal === oldVal) {
      return;
    }
    if (oldVal) {
      newVal.focusButton();
    }
  }

  @bound
  private _onKeyDownHandler(event: KeyboardEvent): void {
    const foundTab = this.allTabs.find(tab => tab === event.target);
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
        event.preventDefault();
        this.#focusTab(this.#firstFocusable());
        break;

      case 'End':
        event.preventDefault();
        this.#focusTab(this.#lastFocusable());
        break;

      default:
        return;
    }
  }

  #isOverflow(): void {
    this._overflowOnLeft = !isElementInView(this._tabList, this.#first() as HTMLElement, false);
    this._overflowOnRight = !isElementInView(this._tabList, this.#last() as HTMLElement, false);
    this._showScrollButtons = (this._overflowOnLeft || this._overflowOnRight);
  }

  @bound
  private _handleScrollButtons(): void {
    clearTimeout(this.#scrollTimeout);
    this.#scrollTimeout = setTimeout(() => {
      this.#isOverflow();
    }, BaseTabs.delay);
  }

  @bound
  private _scrollLeft(): void {
    const container = this._tabList;
    const childrenArr = this.allTabs;
    let firstElementInView: BaseTab | undefined;
    let lastElementOutOfView: BaseTab | undefined;
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
  private _scrollRight(): void {
    const container = this._tabList;
    const childrenArr = this.allTabs;
    let lastElementInView: BaseTab | undefined;
    let firstElementOutOfView: BaseTab | undefined;
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
