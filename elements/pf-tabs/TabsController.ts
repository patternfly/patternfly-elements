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
  active: boolean;
  disabled: boolean;
}

export type Panel = HTMLElement

export interface Validations {
  isTab: (node: Node) => node is Tab;
  isPanel: (node: Node) => node is Panel;
}

export class TabsController implements ReactiveController {
  static #instances = new Set<TabsController>();

  static #tabsClasses = new WeakSet();

  static {
    window.addEventListener('expand', event => {
      if (!(event instanceof TabExpandEvent)) {
        return;
      }
      for (const instance of this.#instances) {
        if (instance.#isTab(event.tab) && instance.#tabs.has(event.tab)) {
          instance.#onTabExpand(event.tab);
        }
      }
    });

    window.addEventListener('disabled', event => {
      if (!(event instanceof TabDisabledEvent)) {
        return;
      }
      for (const instance of this.#instances) {
        if (instance.#isTab(event.tab) && instance.#tabs.has(event.tab)) {
          instance.#onTabDisabled();
        }
      }
    });
  }

  #logger: Logger;

  #host: ReactiveElement;

  #tabs = new Map<Tab, Panel>();

  #isTab: Required<Validations>['isTab'];

  #isPanel: Required<Validations>['isPanel'];

  #slottedTabs: Tab[] = [];

  #slottedPanels: Panel[] = [];

  #tabindex: RovingTabindexController<Tab>;

  #mo = new MutationObserver(this.#mutationsCallback.bind(this));

  #rebuilding: Promise<null> | null = null;

  #init = 0;

  get activeIndex() {
    if (!this.#activeTab) {
      return -1;
    }
    return this._tabs.indexOf(this.#activeTab);
  }

  /**
   * Sets the active index of the tabs element which will set the active tab.
   * document.querySelector('tabs-element-selector').activeIndex = 0
   */
  set activeIndex(index: number) {
    const firstFocusableTab = this.#tabindex.firstItem;
    if (!firstFocusableTab) {
      this.#logger.error(`No focusable tabs found.`);
      return;
    }

    let error = false;
    if (this._tabs[index] === undefined) {
      error = true;
      this.#logger.warn(`The index provided is out of bounds: ${index} in 0 - ${this._tabs.length - 1}. Setting first focusable tab active.`);
    } else if (this._tabs[index].disabled || this._tabs[index].hasAttribute('aria-disabled')) {
      error = true;
      this.#logger.warn(`The tab at index ${index} is disabled. Setting first focusable tab active.`);
    }
    if (error) {
      index = this._tabs.indexOf(firstFocusableTab);
    }
    this._tabs[index].active = true;
  }

  get activeTab(): Tab | undefined {
    if (!this.#activeTab) {
      return undefined;
    }
    return this.#activeTab;
  }

  set activeTab(tab: Tab) {
    if (!this.#tabs.has(tab)) {
      this.#logger.warn(`The tab provided is not a valid tab.`);
      return;
    }
    // get tab index
    const index = this._tabs.indexOf(tab);
    this.activeIndex = index;
  }

  protected get _tabs() {
    return [...this.#tabs.keys()] as Tab[];
  }

  get #activeTab() {
    return this._tabs.find(tab => tab.active);
  }

  /**
   * @param host - The host element of the tabs.
   * @param validations - A set of methods (isTab, isPanel) to validate tabs and panels.
   * @example new TabsController(this, {
   *    isTab: (x: Node): x is PfTab => x instanceof PfTab,
   *    isPanel: (x: Node): x is PfTabPanel => x instanceof PfTabPanel
   * });
   */
  constructor(host: ReactiveElement, validations: Validations) {
    this.#tabindex = new RovingTabindexController(host);
    this.#logger = new Logger(host);
    this.#isTab = validations.isTab;
    this.#isPanel = validations.isPanel;
    TabsController.#tabsClasses.add(host.constructor);
    if (host.isConnected) {
      TabsController.#instances.add(this);
    }
    (this.#host = host).addController(this);
    this.#mo.observe(host, { attributes: false, childList: true, subtree: false });
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

  async #mutationsCallback(mutations: MutationRecord[]): Promise<void> {
    for (const mutation of mutations) {
      if ([...mutation.addedNodes.values()].some(node => this.#isTab(node))) {
        this.#rebuild();
        break;
      }

      if ([...mutation.removedNodes.values()].some(node => this.#isTab(node))) {
        this.#rebuild();
        break;
      }
    }
  }

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

  #onTabExpand(tab: Tab) {
    this.#tabindex.updateActiveItem(tab);
    this.#deactivateExcept(this._tabs.indexOf(tab));
  }

  async #onTabDisabled() {
    await this.#rebuild();
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
