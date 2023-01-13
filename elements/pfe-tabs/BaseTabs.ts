import { LitElement, html } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { isElementInView } from '@patternfly/pfe-core/functions/isElementInView.js';

import { BaseTab, TabExpandEvent } from './BaseTab.js';
import { BaseTabPanel } from './BaseTabPanel.js';

import styles from './BaseTabs.scss';

/**
 * BaseTabs
 *
 * @attr [label-scroll-left="Scroll left"] - accessible label for the tab panel's scroll left button.
 * @attr [label-scroll-right="Scroll right"] - accessible label for the tab panel's scroll right button.
 *
 */
export abstract class BaseTabs extends LitElement {
  static readonly styles = [styles];

  static isTab(element: BaseTab): element is BaseTab {
    return element instanceof BaseTab;
  }

  static isPanel(element: BaseTabPanel): element is BaseTabPanel {
    return element instanceof BaseTabPanel;
  }

  /** Time in milliseconds to debounce between scroll events and updating scroll button state */
  protected static readonly scrollTimeoutDelay: number = 0;
  /** Icon name to use for the scroll left button */
  protected static readonly scrollIconLeft: string = 'angle-left';
  /** Icon name to use for the scroll right button */
  protected static readonly scrollIconRight: string = 'angle-right';
  /** Icon set to use for the scroll buttons */
  protected static readonly scrollIconSet: string = 'fas';

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

  #_allTabs: BaseTab[] = [];

  #_allPanels: BaseTabPanel[] = [];

  #_focusableTabs: BaseTab[] = [];

  #_focusTab?: BaseTab;

  #scrollTimeout?: ReturnType<typeof setTimeout>;

  #activeIndex = 0;

  id: string = this.id || getRandomId(this.localName);

  abstract inset?: string;

  @property({ attribute: false })
  get activeIndex() {
    return this.#activeIndex;
  }

  set activeIndex(index: number) {
    const oldIndex = this.activeIndex;
    const tab = this.#allTabs[index];
    if (tab) {
      if (tab.disabled) {
        this.#logger.warn(`Disabled tabs can not be active, setting first focusable tab to active`);
        this.#activate(this.#firstFocusable());
        index = this.#allTabs.findIndex(t => t === this.#firstFocusable());
        return;
      } else if (!tab.active) {
        // if the activeIndex was set through the CLI e.g.`$0.activeIndex = 2`
        tab.active = true;
        return;
      }
    }
    if (index === -1) {
      this.#logger.warn(`No active tab found, setting first focusable tab to active`);
      this.#activate(this.#firstFocusable());
      index = this.#allTabs.findIndex(t => t === this.#firstFocusable());
      return;
    }
    this.#activeIndex = index;
    this.requestUpdate('activeIndex', oldIndex);

    this.#allPanels[this.#activeIndex].hidden = false;
    // close all tabs that are not the activeIndex
    this.#deactivateExcept(this.#activeIndex);
  }

  get #activeTab() {
    const [tab] = this.#_allTabs.filter(tab => tab.active);
    return tab;
  }

  get #allTabs() {
    return this.#_allTabs;
  }

  set #allTabs(tabs: BaseTab[]) {
    this.#_allTabs = tabs.filter(tab => (this.constructor as typeof BaseTabs).isTab(tab));
    this.#_focusableTabs = this.#_allTabs.filter(tab => !tab.disabled);
  }

  get #allPanels() {
    return this.#_allPanels;
  }

  set #allPanels(panels: BaseTabPanel[]) {
    this.#_allPanels = panels.filter(panel => (this.constructor as typeof BaseTabs).isPanel(panel));
  }

  get #focusTab(): BaseTab | undefined {
    return this.#_focusTab;
  }

  set #focusTab(tab: BaseTab | undefined) {
    this.#_focusTab = tab;
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
      <div part="container" class="${classMap({ [`inset-${this.inset}`]: !!this.inset })}">
        <div part="tabs-container">${!this.#showScrollButtons ? '' : html`
          <button id="previousTab"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflowOnLeft}"
              @click="${this.#scrollLeft}">
            <pfe-icon icon="${scrollIconLeft}" set="${scrollIconSet}" loading="eager"></pfe-icon>
          </button>`}
          <slot name="tab"
                part="tabs"
                role="tablist"
                @slotchange="${this.#onSlotchange}"></slot> ${!this.#showScrollButtons ? '' : html`
          <button id="nextTab"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflowOnRight}"
              @click="${this.#scrollRight}">
            <pfe-icon icon="${scrollIconRight}" set="${scrollIconSet}" loading="eager"></pfe-icon>
          </button>`}
        </div>
        <slot part="panels" @slotchange="${this.#onSlotchange}"></slot>
      </div>
    `;
  }

  async firstUpdated() {
    this.#onScroll();
    this.tabList.addEventListener('scroll', this.#onScroll);
  }

  #onSlotchange(event: { target: { name: string; }; }) {
    if (event.target.name === 'tab') {
      this.#allTabs = this.tabs;
    } else {
      this.#allPanels = this.panels;
    }
    if (this.#allTabs.length === this.#allPanels.length &&
      (this.#allTabs.length !== 0 || this.#allPanels.length !== 0)) {
      this.#updateAccessibility();
      this.activeIndex = this.#allTabs.findIndex(tab => tab.active);
      this.#firstLastClasses();
    }
  }

  #updateAccessibility(): void {
    this.#allTabs.forEach((tab, index) => {
      const panel = this.#allPanels[index];
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    });
  }

  #onTabExpand = (event: Event): void => {
    if (!(event instanceof TabExpandEvent) ||
        this.#allTabs.length === 0 || this.#allPanels.length === 0) {
      return;
    }

    const target = event as TabExpandEvent;
    if (target.active) {
      this.activeIndex = this.#allTabs.findIndex(tab => tab === target.tab);
    }
  };

  #deactivateExcept(index: number) {
    this.#allTabs.forEach((tab, i) => tab.active = i === index);
    this.#allPanels.forEach((panel, i) => panel.hidden = i !== index);
  }

  #firstFocusable(): BaseTab {
    const [firstTab] = this.#_focusableTabs;
    return firstTab;
  }

  #lastFocusable(): BaseTab {
    return this.#_focusableTabs.at(-1) as BaseTab;
  }

  get #firstTab(): BaseTab {
    const [tab] = this.#allTabs;
    return tab;
  }

  get #lastTab(): BaseTab {
    return this.#allTabs.at(-1) as BaseTab;
  }

  #next(): void {
    // find index of active tab in focusableTabs
    const currentIndex = this.#currentIndex();
    // increment focusable index and return focusable tab
    const nextFocusableIndex = currentIndex + 1;
    let nextTab: BaseTab;
    if (nextFocusableIndex >= this.#_focusableTabs.length) {
      // get the first focusable tab
      [nextTab] = this.#_focusableTabs;
    } else {
      // get index of that focusable tab from all tabs
      nextTab = this.#_focusableTabs[nextFocusableIndex];
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
      prevTab = this.#_focusableTabs[this.#_focusableTabs.length - 1];
    } else {
      // get index of that focusable tab from all tabs
      prevTab = this.#_focusableTabs[nextFocusableIndex];
    }
    this.#select(prevTab);
  }

  #currentIndex(): number {
    let current: BaseTab;
    // get current tab
    if (this.#focusTab?.ariaDisabled === 'true') {
      current = this.#focusTab;
    } else {
      current = this.#activeTab;
    }
    const index = this.#_focusableTabs.findIndex(tab => tab === current);
    return index;
  }

  #activate(selectedTab: BaseTab): void {
    if (selectedTab.ariaDisabled !== 'true') {
      selectedTab.active = true;
    }
  }

  async #select(selectedTab: BaseTab): Promise<void> {
    this.#activate(selectedTab);
    this.#focusTab = selectedTab;
    await this.updateComplete;
    this.#focusTab.focus();
  }

  #onKeydown = (event: KeyboardEvent): void => {
    const foundTab = this.#allTabs.find(tab => tab === event.target);
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
        this.#select(this.#firstFocusable());
        break;

      case 'End':
        event.preventDefault();
        this.#select(this.#lastFocusable());
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

  /** override to prevent scroll buttons from showing */
  protected get canShowScrollButtons() {
    return true;
  }

  #setOverflowState(): void {
    const { canShowScrollButtons } = this;
    this.#overflowOnLeft = canShowScrollButtons && !isElementInView(this.tabList, this.#firstTab);
    this.#overflowOnRight = canShowScrollButtons && !isElementInView(this.tabList, this.#lastTab);
    this.#showScrollButtons = canShowScrollButtons && (this.#overflowOnLeft || this.#overflowOnRight);
    this.requestUpdate();
  }

  #scrollLeft(): void {
    const container = this.tabList;
    const childrenArr = this.#allTabs;
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
    const childrenArr = this.#allTabs;
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
