import type { ReactiveController, ReactiveElement } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { TabExpandEvent } from './BaseTab.js';

export interface Tab extends HTMLElement {
  active?: boolean;
  disabled?: boolean;
}

export type Panel = HTMLElement

export interface Options {
  isTab?: (node?: Node) => node is Tab;
  isPanel?: (node?: Node) => node is Panel;
}

function preceedes(supposedPredecessor: Node, nodeToCheck: Node) {
  return !!(nodeToCheck.compareDocumentPosition(supposedPredecessor) & Node.DOCUMENT_POSITION_FOLLOWING);
}

export class TabsController implements ReactiveController {
  static #tabsClasses = new WeakSet();
  static #tabClasses = new WeakSet();
  static #panelClasses = new WeakSet();

  static #instances = new Set<TabsController>();

  static isTabs(node?: Node) {
    return !!node && TabsController.#tabsClasses.has(node.constructor);
  }

  static isTab(node?: Node): node is Tab {
    return !!node && TabsController.#tabClasses.has(node.constructor);
  }

  static isPanel(node?: Node): node is Panel {
    return !!node && TabsController.#panelClasses.has(node.constructor);
  }

  static {
    window.addEventListener('expand', event => {
      for (const instance of this.#instances) {
        instance.#onTabExpand(event);
      }
    });
  }

  get activeItem() {
    return this.#tabindex.activeItem;
  }

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

    // close all tabs that are not the activeIndex
    this.#deactivateExcept(this.#activeIndex);

    this.#host.requestUpdate('activeIndex', oldIndex);
  }

  get tabs() {
    return [...this.#tabs.keys()];
  }

  get manual() {
    return this.#manual;
  }

  set manual(value) {
    if (value !== this.#manual) {
      this.#manual = value;
      this.#onSlotchange();
    }
  }

  get #root(): Document | ShadowRoot {
    return this.#host.getRootNode() as Document | ShadowRoot;
  }

  get #firstFocusable(): Tab | undefined {
    return this.#tabindex.firstItem;
  }

  get #activeItemIndex() {
    const { activeItem } = this.#tabindex;
    return [...this.#tabs.keys()].findIndex(t => t === activeItem);
  }

  /**
   * Tab activation
   * Tabs can be either [automatic](https://w3c.github.io/aria-practices/examples/tabs/tabs-automatic.html) activated
   * or [manual](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html)
   */
  #manual = false;

  #activeIndex = 0;

  #tabindex: RovingTabindexController<Tab>;

  #logger: Logger;

  #host: ReactiveElement;

  #rebuilding: Promise<null> | null = null;

  #slottedPanels: Panel[] = [];

  #slottedTabs: Tab[] = [];

  #tabs = new Map<Tab, Panel>();

  #isTab: Required<Options>['isTab'];

  #isPanel: Required<Options>['isPanel'];

  constructor(host: ReactiveElement, options?: Options) {
    this.#tabindex = new RovingTabindexController(host);
    this.#logger = new Logger(host);
    this.#isTab = options?.isTab ?? TabsController.isTab;
    this.#isPanel = options?.isPanel ?? TabsController.isPanel;
    TabsController.#tabsClasses.add(host.constructor);
    if (host.isConnected) {
      TabsController.#instances.add(this);
    }
    (this.#host = host).addController(this);
    host.addEventListener('slotchange', this.#onSlotchange);
  }

  hostConnected() {
    TabsController.#instances.add(this);
    this.#onSlotchange();
  }

  hostDisconnected() {
    TabsController.#instances.delete(this);
  }

  async hostUpdate() {
    this.#rebuilding ??= await this.#rebuild();
  }

  #onTabExpand = (event: Event): void => {
    if (event instanceof TabExpandEvent && this.#tabs.has(event.tab) && event.active) {
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

  #queryPanelForTab(tab: Tab): HTMLElement | undefined {
    if (tab.hasAttribute('for')) {
      const panelID = tab.getAttribute('for');
      return this.#root.getElementById(`${panelID}`) ?? undefined;
    } else if (tab.compareDocumentPosition(this.#host) & Node.DOCUMENT_POSITION_CONTAINS) {
      const index = this.#slottedTabs.indexOf(tab);
      const panelsWithoutDetachedTabs = this.#slottedPanels.filter(panel =>
        !this.#isTab(this.#root.querySelector(`[for="${panel.id}"]`) ?? undefined));
      return panelsWithoutDetachedTabs.at(index);
    }
  }

  #addPairForTab(tab: Tab) {
    const panel = this.#queryPanelForTab(tab);
    if (this.#isPanel(panel)) {
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
      if (this.#isTab(node)) {
        if (!arrivedAtBaseTabs && !(preceedes(node, this.#host))) {
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

  async #onSlotchange() {
    await this.#rebuilding;
    this.#host.requestUpdate();
  }

  async #rebuild() {
    const tabSlot = this.#host.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=tab]');
    const panelSlot = this.#host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    this.#slottedPanels = panelSlot?.assignedElements().filter(this.#isPanel) ?? [];
    this.#slottedTabs = tabSlot?.assignedElements().filter(this.#isTab) ?? [];
    this.#resetTabs();
    this.#matchingTabsAndPanelsUpgrade();
    await this.#host.updateComplete;
    return null;
  }

  #matchingTabsAndPanelsUpgrade() {
    this.#updateAccessibility();
    this.#slottedTabs?.at(0)?.classList.add('first');
    this.#slottedTabs?.at(-1)?.classList.add('last');
    const tabs = [...this.#tabs.keys()];
    this.#tabindex.initItems(tabs);
    const activeTab = tabs.find(tab => tab.active);
    if (activeTab) {
      this.#tabindex.updateActiveItem(activeTab);
      this.activeIndex = tabs.indexOf(activeTab);
      const { activeItem } = this.#tabindex;
      // If RTI has an activeItem, update the roving tabindex controller
      if (!this.manual &&
          activeItem &&
          activeItem !== activeTab &&
          activeItem.ariaDisabled !== 'true') {
        activeItem.active = true;
      }
    }
  }

  #updateAccessibility(): void {
    for (const [tab, panel] of this.#tabs) {
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    }
  }
}
