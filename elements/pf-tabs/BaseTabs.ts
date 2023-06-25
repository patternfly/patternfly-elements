import { LitElement, html } from 'lit';

import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';

import { classMap } from 'lit/directives/class-map.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import { BaseTab, TabExpandEvent } from './BaseTab.js';
import { BaseTabPanel } from './BaseTabPanel.js';

import styles from './BaseTabs.css';

/**
 * BaseTabs
 *
 * @attr [label-scroll-left="Scroll left"] - accessible label for the tab panel's scroll left button.
 * @attr [label-scroll-right="Scroll right"] - accessible label for the tab panel's scroll right button.
 *
 */
export abstract class BaseTabs extends LitElement {
  static readonly styles = [styles];

  static isTab(element?: Node): element is BaseTab {
    return element instanceof BaseTab;
  }

  static isPanel(element?: Node): element is BaseTabPanel {
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
        instance.#overflow.onScroll();
      }
    }, { capture: false });
    window.addEventListener('expand', event => {
      for (const instance of this.#instances) {
        instance.#onTabExpand(event);
      }
    });
  }

  /**
   * Tab activation
   * Tabs can be either [automatic](https://w3c.github.io/aria-practices/examples/tabs/tabs-automatic.html) activated
   * or [manual](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html)
   */
  @property({ reflect: true, type: Boolean }) manual = false;

  @property({ attribute: false })
  get activeIndex() {
    return this.#activeIndex;
  }

  set activeIndex(index: number) {
    const oldIndex = this.activeIndex;
    const tab = [...this.#tabs.keys()][index];
    if (tab) {
      if (tab.disabled) {
        this.#logger.warn(`Disabled tabs can not be active, setting first focusable tab to active`);
        this.#tabindex.updateActiveItem(this.#firstFocusable);
        index = this.#activeItemIndex;
      } else {
        tab.active = true;
      }
    }

    if (index === -1) {
      this.#logger.warn(`No active tab found, setting first focusable tab to active`);
      const first = this.#tabindex.firstItem;
      this.#tabindex.updateActiveItem(first);
      index = this.#activeItemIndex;
    }

    this.#activeIndex = index;
    this.requestUpdate('activeIndex', oldIndex);

    // close all tabs that are not the activeIndex
    this.#deactivateExcept(this.#activeIndex);
  }

  #tabindex = new RovingTabindexController<BaseTab>(this);

  #overflow = new OverflowController(this);

  #logger = new Logger(this);

  #activeIndex = 0;

  #slottedPanels: BaseTabPanel[] = [];

  #slottedTabs: BaseTab[] = [];

  #tabs = new Map<BaseTab, BaseTabPanel>();

  get #activeTab() {
    return [...this.#tabs.keys()].find(tab => tab.active);
  }

  get #root(): Document | ShadowRoot {
    return this.getRootNode() as Document | ShadowRoot;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    BaseTabs.#instances.add(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    BaseTabs.#instances.delete(this);
  }

  override willUpdate(): void {
    const { activeItem } = this.#tabindex;
    // If RTI has an activeItem, update the roving tabindex controller
    if (!this.manual &&
        activeItem &&
        activeItem !== this.#activeTab &&
        activeItem.ariaDisabled !== 'true') {
      activeItem.active = true;
    }
  }

  override render() {
    const { scrollIconSet, scrollIconLeft, scrollIconRight } = this.constructor as typeof BaseTabs;
    return html`
      <div part="container" class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-icon icon="${scrollIconLeft}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
          <slot id="tabs"
                name="tab"
                part="tabs"
                role="tablist"
                @scroll="${this.#overflow.onScroll}"
                @slotchange="${this.#onSlotchange}"></slot> ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight}">
            <pf-icon icon="${scrollIconRight}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
        </div>
        <slot part="panels" @slotchange="${this.#onSlotchange}"></slot>
      </div>
    `;
  }

  #queryPanelForTab(tab: BaseTab): HTMLElement | undefined {
    if (tab.hasAttribute('for')) {
      const panelID = tab.getAttribute('for');
      return this.#root.getElementById(`${panelID}`) ?? undefined;
    } else if (tab.compareDocumentPosition(this) & Node.DOCUMENT_POSITION_CONTAINS) {
      const index = this.#slottedTabs.indexOf(tab);
      const panelsWithoutDetachedTabs = this.#slottedPanels.filter(panel =>
        !BaseTabs.isTab(this.#root.querySelector(`[for="${panel.id}"]`) ?? undefined));
      return panelsWithoutDetachedTabs.at(index);
    }
  }

  #addPairForTab(tab: BaseTab) {
    const panel = this.#queryPanelForTab(tab);
    if (BaseTabs.isPanel(panel)) {
      this.#tabs.set(tab, panel);
    } else {
      this.#logger.warn(`Tab and panel do not match`, tab, panel);
    }
  }

  #registerSlottedTabs() {
    for (const slotted of this.#slottedTabs) {
      this.#addPairForTab(slotted);
    }
  }

  /**
   * Interleave slotted and detached tabs, such that `this.#tabs` reflects the DOM order
   * @example combined tabs
   *          ```html
   *          <pf-tab id="for-a" for="a" slot="tabs">A</pf-tab>
   *          <pf-tabs>
   *            <pf-tab id="for-b" slot="tab">D</pf-tab>
   *            <pf-tab-panel id="a">A</pf-tab-panel>
   *            <pf-tab-panel id="b">B</pf-tab-panel>
   *            <pf-tab-panel id="c">C</pf-tab-panel>
   *          </pf-tabs>
   *          <pf-tab id="for-c" for="c" slot="tabs">C</pf-tab>
   *          ```
   *          ```js
   *          console.log(#this.tabs.keys())
   *          // => #for-a, #for-b, #for-c
   *          ```
   */
  #resetTabs() {
    this.#tabs.clear();
    let arrivedAtBaseTabs = false;
    for (const node of this.#root.querySelectorAll('[for]')) {
      if (BaseTabs.isTab(node)) {
        if (!arrivedAtBaseTabs && !(node.compareDocumentPosition(this) & Node.DOCUMENT_POSITION_FOLLOWING)) {
          this.#registerSlottedTabs();
          arrivedAtBaseTabs = true;
        }
        this.#addPairForTab(node);
      }
    }
    if (!arrivedAtBaseTabs) {
      this.#registerSlottedTabs();
    }
  }

  #rebuilding = false;

  async #onSlotchange() {
    if (!this.#rebuilding) {
      this.#rebuilding = true;
      const tabSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=tab]');
      const panelSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
      this.#slottedPanels = panelSlot?.assignedElements().filter(BaseTabs.isPanel) ?? [];
      this.#slottedTabs = tabSlot?.assignedElements().filter(BaseTabs.isTab) ?? [];
      this.#resetTabs();
      this.#matchingTabsAndPanelsUpgrade();
      await this.updateComplete;
      this.#rebuilding = false;
    }
  }

  #matchingTabsAndPanelsUpgrade() {
    this.#updateAccessibility();
    this.#slottedTabs?.at(0)?.classList.add('first');
    this.#slottedTabs?.at(-1)?.classList.add('last');
    const tabs = [...this.#tabs.keys()];
    this.#tabindex.initItems(tabs);
    this.activeIndex = tabs.findIndex(tab => tab.active);
    this.#tabindex.updateActiveItem(this.#activeTab);
    const tabsList = this.shadowRoot?.getElementById('tabs');
    if (tabsList) {
      this.#overflow.init(tabsList, tabs);
    }
  }

  #updateAccessibility(): void {
    [...this.#tabs].forEach(([tab, panel]) => {
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    });
  }

  #onTabExpand = (event: Event): void => {
    if (!(event instanceof TabExpandEvent) || !this.#tabs.has(event.tab)) {
      return;
    }

    if (event.active) {
      if (event.tab !== this.#tabindex.activeItem) {
        this.#tabindex.updateActiveItem(event.tab);
      }
      this.activeIndex = [...this.#tabs.keys()].findIndex(tab => tab === event.tab);
    }
  };

  #deactivateExcept(indexToKeep: number) {
    [...this.#tabs].forEach(([tab, panel], currentIndex) => {
      tab.active = currentIndex === indexToKeep;
      panel.hidden = currentIndex !== indexToKeep;
    });
  }

  get #firstFocusable(): BaseTab | undefined {
    return this.#tabindex.firstItem;
  }

  get #activeItemIndex() {
    const { activeItem } = this.#tabindex;
    return [...this.#tabs.keys()].findIndex(t => t === activeItem);
  }

  #scrollLeft() {
    this.#overflow.scrollLeft();
  }

  #scrollRight() {
    this.#overflow.scrollRight();
  }
}
