import { LitElement, html } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

import { BaseTab, TabExpandEvent } from './BaseTab.js';
import { BaseTabPanel } from './BaseTabPanel.js';

import style from './BaseTab.scss';

/**
 * @attr [label-scroll-left="Scroll left"] - accessible label for the tab panel's scroll left button.
 * @attr [label-scroll-right="Scroll right"] - accessible label for the tab panel's scroll right button.
 *
 */
export abstract class BaseTabs extends LitElement {
  static readonly styles = [style];

  static isTab(element: BaseTab): element is BaseTab {
    return element instanceof BaseTab;
  }

  static isPanel(element: BaseTabPanel): element is BaseTabPanel {
    return element instanceof BaseTabPanel;
  }

  protected static readonly scrollTimeoutDelay = 0;
  protected static readonly scrollIconLeft = 'angle-left';
  protected static readonly scrollIconRight = 'angle-right';
  protected static readonly scrollIconSet = 'fas';

  static #instances = new Set<BaseTabs>();

  static {
    // on resize check for overflows to add or remove scroll buttons
    window.addEventListener('resize', () => {
      for (const instance of this.#instances) {
        instance.#onScroll();
      }
    }, { capture: false });
  }

  @queryAssignedElements({ slot: 'tab' }) private tabs!: BaseTab[];

  @queryAssignedElements() private panels!: BaseTabPanel[];

  @query('[part="tabs"]') private tabList!: HTMLElement;

  #showScrollButtons = false;

  #overflowOnLeft = false;

  #overflowOnRight = false;

  #logger = new Logger(this);

  #allTabs: BaseTab[] = [];

  #allPanels: BaseTabPanel[] = [];

  #focusableTabs: BaseTab[] = [];

  #focusTab?: BaseTab;

  #scrollTimeout?: ReturnType<typeof setTimeout>;

  #activeIndex = 0;

  id: string = this.id || getRandomId(this.localName);

  @property({ attribute: false })
  get activeIndex() {
    return this.#activeIndex;
  }

  set activeIndex(index: number) {
    const oldIndex = this.activeIndex;
    let tab = this.allTabs[index];
    if (tab === undefined || tab.disabled) {
      if (tab === undefined) {
        this.#logger.warn(`No active tab set, setting first focusable tab to active`);
      } else {
        this.#logger.warn(`Disabled tabs can not be set as active, setting first focusable tab to active`);
      }
      [tab] = this.focusableTabs;
      index = this.allTabs.findIndex(focusable => focusable === tab);
      if (index === -1) {
        this.#logger.warn(`No available tabs to activate`);
        return;
      }
    }
    tab.active = true;
    this.allPanels[index].hidden = false;
    this.#deactivateExcept(index);

    this.#activeIndex = index;
    this.requestUpdate('activeIndex', oldIndex);
  }

  private get activeTab() {
    const [tab] = this.#allTabs.filter(tab => tab.active);
    return tab;
  }

  private get allTabs() {
    return this.#allTabs;
  }

  private set allTabs(tabs: BaseTab[]) {
    this.#allTabs = tabs.filter(tab => (this.constructor as typeof BaseTabs).isTab(tab));
    this.#focusableTabs = this.#allTabs.filter(tab => !tab.disabled);
  }

  private get allPanels() {
    return this.#allPanels;
  }

  private set allPanels(panels: BaseTabPanel[]) {
    this.#allPanels = panels.filter(panel => (this.constructor as typeof BaseTabs).isPanel(panel));
  }

  private get focusableTabs() {
    return this.#focusableTabs;
  }

  private get focusTab(): BaseTab | undefined {
    return this.#focusTab;
  }

  private set focusTab(tab: BaseTab | undefined) {
    this.#focusTab = tab;
    this.#focusTab?.focus();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('expand', this.#onTabExpand);
    this.addEventListener('keydown', this.#onKeydown);
    BaseTabs.#instances.add(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    BaseTabs.#instances.delete(this);
  }

  override render() {
    const { scrollIconSet, scrollIconLeft, scrollIconRight } = this.constructor as typeof BaseTabs;
    return html`
      <div part="container">
        <div part="tabs-container">${!this.#showScrollButtons ? '' : html`
          <button id="previousTab"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflowOnLeft}"
              @click="${this.#scrollLeft}">
            <pfe-icon icon="${scrollIconLeft}" set="${scrollIconSet}" loading="eager"></pfe-icon>
          </button>`}
          <div part="tabs" role="tablist">
            <slot name="tab" @slotchange="${this.onSlotchange}"></slot>
          </div>${!this.#showScrollButtons ? '' : html`
          <button id="nextTab"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflowOnRight}"
              @click="${this.#scrollRight}">
            <pfe-icon icon="${scrollIconRight}" set="${scrollIconSet}" loading="eager"></pfe-icon>
          </button>`}
        </div>
        <div part="panels">
          <slot @slotchange="${this.onSlotchange}"></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    if (this.activeIndex === -1) {
      this.activeIndex = 0;
    }
    this.#onScroll();
    this.tabList.addEventListener('scroll', this.#onScroll);
  }

  protected onSlotchange(event: { target: { name: string; }; }) {
    if (event.target.name === 'tab') {
      this.allTabs = this.tabs;
    } else {
      this.allPanels = this.panels;
    }
    if (this.allTabs.length === this.allPanels.length &&
      (this.allTabs.length !== 0 || this.allPanels.length !== 0)) {
      this.#updateAccessibility();
      this.activeIndex = this.allTabs.findIndex(tab => tab.active);
      this.#firstLastClasses();
    }
  }

  #updateAccessibility(): void {
    this.allTabs.forEach((tab, index) => {
      const panel = this.allPanels[index];
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    });
  }

  #onTabExpand = (event: Event): void => {
    if (!(event instanceof TabExpandEvent) || this.allTabs.length === 0) {
      return;
    }

    if (event.active) {
      this.activeIndex = this.allTabs.findIndex(tab => tab === event.tab);
      // close all tabs that are not the activeIndex
      this.#deactivateExcept(this.activeIndex);
    } else {
      if (this.activeTab === undefined) {
        // if activeTab is invalid set to first focusable tab
        const index = this.allTabs.findIndex(tab => tab === this.#firstFocusable());
        this.activeIndex = index;
      }
    }
  };

  #deactivateExcept(index: number) {
    this.allTabs.forEach((tab, i) => tab.active = i === index);
    this.allPanels.forEach((panel, i) => panel.hidden = i !== index);
  }

  #firstFocusable(): BaseTab {
    const [firstTab] = this.focusableTabs;
    return firstTab;
  }

  #lastFocusable(): BaseTab {
    return this.focusableTabs[this.focusableTabs.length - 1];
  }

  get #firstTab(): BaseTab {
    const [tab] = this.allTabs;
    return tab;
  }

  get #lastTab(): BaseTab {
    return this.allTabs.at(-1) as BaseTab;
  }

  #next(): void {
    // find index of active tab in focusableTabs
    const currentIndex = this.#currentIndex();
    // increment focusable index and return focusable tab
    const nextFocusableIndex = currentIndex + 1;
    let nextTab: BaseTab;
    if (nextFocusableIndex >= this.focusableTabs.length) {
      // get the first focusable tab
      [nextTab] = this.#focusableTabs;
    } else {
      // get index of that focusable tab from all tabs
      nextTab = this.#focusableTabs[nextFocusableIndex];
    }

    this.#select(nextTab);
  }

  #prev(): void {
    const currentIndex = this.#currentIndex();
    // increment focusable index and return focusable tab
    const nextFocusableIndex = currentIndex - 1;
    let prevTab: BaseTab;
    if (nextFocusableIndex < 0) {
      // get the last focusable tab
      prevTab = this.#focusableTabs[this.#focusableTabs.length - 1];
    } else {
      // get index of that focusable tab from all tabs
      prevTab = this.#focusableTabs[nextFocusableIndex];
    }
    this.#select(prevTab);
  }

  #currentIndex(): number {
    let current: BaseTab;
    // get current tab
    if (this.focusTab?.ariaDisabled) {
      current = this.focusTab;
    } else {
      current = this.activeTab;
    }
    const index = this.focusableTabs.findIndex(tab => tab === current);
    return index;
  }

  #select(selectedTab: BaseTab): void {
    if (selectedTab.ariaDisabled === null || selectedTab.ariaDisabled === 'false') {
      const index = this.#allTabs.findIndex(tab => tab === selectedTab);
      this.activeIndex = index;
    }
    this.focusTab = selectedTab;
  }

  #onKeydown = (event: KeyboardEvent): void => {
    const foundTab = this.allTabs.find(tab => tab === event.target);
    if (!foundTab) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.#prev();
        break;

      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.#next();
        break;

      case 'Home':
        event.preventDefault();
        this.activeIndex = this.allTabs.findIndex(tab => tab === this.#firstFocusable());
        this.focusTab = this.#firstFocusable();
        break;

      case 'End':
        event.preventDefault();
        this.activeIndex = this.allTabs.findIndex(tab => tab === this.#lastFocusable());
        this.focusTab = this.#lastFocusable();
        break;

      default:
        return;
    }
  };

  #onScroll = () => {
    clearTimeout(this.#scrollTimeout);
    const { scrollTimeoutDelay } = (this.constructor as typeof BaseTabs);
    this.#scrollTimeout = setTimeout(() => this.#setOverflowState(), scrollTimeoutDelay);
  };

  #firstLastClasses() {
    this.#firstTab.classList.add('first');
    this.#lastTab.classList.add('last');
  }

  #setOverflowState(): void {
    this.#overflowOnLeft = !isElementInView(this.tabList, this.#firstTab);
    this.#overflowOnRight = !isElementInView(this.tabList, this.#lastTab);
    this.#showScrollButtons = (this.#overflowOnLeft || this.#overflowOnRight);
    this.requestUpdate();
  }

  #scrollLeft(): void {
    const container = this.tabList;
    const childrenArr = this.allTabs;
    let firstElementInView: BaseTab | undefined;
    let lastElementOutOfView: BaseTab | undefined;
    for (let i = 0; i < childrenArr.length && !firstElementInView; i++) {
      if (isElementInView(container, childrenArr[i] as HTMLElement, false)) {
        firstElementInView = childrenArr[i];
        lastElementOutOfView = childrenArr[i - 1];
      }
    }
    if (lastElementOutOfView) {
      container.scrollLeft -= lastElementOutOfView.scrollWidth;
    }
    this.#setOverflowState();
  }

  #scrollRight(): void {
    const container = this.tabList;
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
    this.#setOverflowState();
  }
}
