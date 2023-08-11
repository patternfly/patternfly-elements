import type { ReactiveController, ReactiveElement } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { ComposedEvent } from '@patternfly/pfe-core';

export class TabExpandEvent extends ComposedEvent {
  constructor(
    public tab: Tab,
  ) {
    super('expand');
  }
}

export class TabDisabledEvent extends ComposedEvent {
  constructor(
    public tab: Tab,
  ) {
    super('disabled');
  }
}

export interface Tab extends HTMLElement {
  active?: boolean;
  disabled?: boolean;
}

export type Panel = HTMLElement

export interface Options {
  isTab?: (node?: Node) => node is Tab;
  isPanel?: (node?: Node) => node is Panel;
}

export class TabsController implements ReactiveController {
  static #instances = new Set<TabsController>();

  static #tabsClasses = new WeakSet();
  static #tabClasses = new WeakSet();
  static #panelClasses = new WeakSet();

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
        instance.#onTabExpand(event as TabExpandEvent);
      }
    });

    window.addEventListener('disabled', event => {
      for (const instance of this.#instances) {
        instance.#onTabDisabled(event as TabDisabledEvent);
      }
    });
  }

  #logger: Logger;

  #host: ReactiveElement;

  #tabs = new Map<Tab, Panel>();

  #isTab: Required<Options>['isTab'];

  #isPanel: Required<Options>['isPanel'];

  #slottedTabs: Tab[] = [];

  #slottedPanels: Panel[] = [];

  #tabindex: RovingTabindexController<Tab>;

  #observer: MutationObserver;

  #rebuilding: Promise<null> | null = null;

  #init = 0;

  // Setting active tab from js/console (ie: $0.activeIndex = 2)
  set activeIndex(index: number) {
    const firstFocusableTab = this.#tabindex.firstItem;
    if (!firstFocusableTab) {
      this.#logger.error(`No focusable tabs found.`);
      return;
    }

    let error = false;
    if (this._tabs[index] === undefined) {
      error = true;
      this.#logger.warn(`The index provided is out of bounds: 0 - ${this._tabs.length - 1}. Setting to first focusable tab.`);
    }
    if (this._tabs[index].disabled || this._tabs[index].hasAttribute('aria-disabled')) {
      error = true;
      this.#logger.warn(`The tab at index ${index} is disabled. Setting to first focusable tab.`);
    }
    if (error) {
      index = this._tabs.indexOf(firstFocusableTab);
    }
    this._tabs[index].active = true;
  }

  protected get _tabs() {
    return [...this.#tabs.keys()] as Tab[];
  }

  get #activeTab() {
    return this._tabs.find(tab => tab.active);
  }

  constructor(host: ReactiveElement, options?: Options) {
    this.#tabindex = new RovingTabindexController(host);
    this.#logger = new Logger(host);
    this.#isTab = options?.isTab ?? TabsController.isTab;
    this.#isPanel = options?.isPanel ?? TabsController.isPanel;
    TabsController.#tabsClasses.add(host.constructor);
    if (host.isConnected) {
      TabsController.#instances.add(this);
    }
    this.#observer = new MutationObserver(this.#mutationsCallback);
    (this.#host = host).addController(this);
    this.#observer.observe(host, { attributes: true, childList: true, subtree: true });
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
    if (this.#init <= 1) {
      this.#rebuilding ??= await this.#rebuild();
      this.#host.requestUpdate();
    }
    this.#init++;
  }

  #mutationsCallback = async (mutations: MutationRecord[]): Promise<void> => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        if (this.#isTab(mutation.addedNodes[0])) {
          this.#rebuild();
        }
        if (this.#isTab(mutation.removedNodes[0])) {
          this.#rebuild();
        }
      }
    }
  };

  async #rebuild() {
    const tabSlot = this.#host.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=tab]');
    const panelSlot = this.#host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    this.#slottedPanels = panelSlot?.assignedElements().filter(this.#isPanel) ?? [];
    this.#slottedTabs = tabSlot?.assignedElements().filter(this.#isTab) ?? [];

    this.#tabs.clear();
    await this.#registerSlottedTabs();

    if (this._tabs.length > 0) {
      this.#updateAccessibility();
      await this.#tabindex.initItems(this._tabs, this.#host);
      this.#setActiveTab();
    }

    return null;
  }

  async #onSlotchange() {
    this.#host.requestUpdate();
  }

  #onTabExpand(event: TabExpandEvent) {
    if (event instanceof TabExpandEvent && this.#tabs.has(event.tab)) {
      this.#deactivateExcept(this._tabs.indexOf(event.tab));
    }
  }

  async #onTabDisabled(event: TabDisabledEvent) {
    if (event instanceof TabDisabledEvent && this.#tabs.has(event.tab)) {
      await this.#rebuild();
    }
  }

  async #registerSlottedTabs(): Promise<null> {
    for (const [index, slotted] of this.#slottedTabs.entries()) {
      this.#addPairForTab(index, slotted);
    }
    return null;
  }

  #addPairForTab(index: number, tab: Tab) {
    const panel = this.#slottedPanels[index];
    if (this.#isPanel(panel)) {
      this.#tabs.set(tab, panel);
    } else {
      this.#logger.warn(`Tab and panel do not match`, tab, panel);
    }
  }

  #deactivateExcept(indexToKeep: number) {
    [...this.#tabs].forEach(([tab, panel], currentIndex) => {
      tab.active = currentIndex === indexToKeep;
      panel.hidden = currentIndex !== indexToKeep;
    });
  }

  #setActiveTab() {
    // check for an active tab, if not set one
    if (!this.#activeTab) {
      this.#logger.warn('No active tab found. Setting to first focusable tab.');
      this.#setFirstFocusableTabActive();
      return;
    }
    if (this.#activeTab.disabled) {
      this.#logger.warn('Active tab is disabled. Setting to first focusable tab.');
      this.#setFirstFocusableTabActive();
      return;
    }

    // update RTI with active tab and deactivate others
    this.#tabindex.updateActiveItem(this.#activeTab);
    this.#deactivateExcept(this._tabs.indexOf(this.#activeTab));
  }

  #setFirstFocusableTabActive() {
    const first = this.#tabindex.firstItem;
    if (!first) {
      this.#logger.warn('No focusable tab found.');
      return;
    }
    const firstFocusable = this._tabs.find(tab => tab === first);
    if (firstFocusable) {
      firstFocusable.active = true;
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
