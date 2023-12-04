import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

export interface Tab extends HTMLElement {
  active: boolean;
  disabled: boolean;
}

export type Panel = HTMLElement

export interface TabsControllerOptions {
  isTab: (node: unknown) => node is Tab;
  isPanel: (node: unknown) => node is Panel;
  getHTMLElement?: () => HTMLElement;
}

function isReactiveControllerHost(element: HTMLElement): element is HTMLElement & ReactiveControllerHost {
  return 'addController' in element;
}

export class TabExpandEvent extends Event {
  constructor(
    public tab: Tab,
  ) {
    super('expand', { bubbles: true, cancelable: true });
  }
}

export class TabDisabledEvent extends Event {
  constructor(
    public tab: Tab,
  ) {
    super('disabled', { bubbles: true, cancelable: true });
  }
}

export class TabsController implements ReactiveController {
  static #instances = new Set<TabsController>();

  static #tabsClasses = new WeakSet();

  static {
    window.addEventListener('expand', event => {
      if (event instanceof TabExpandEvent) {
        for (const instance of this.#instances) {
          if (instance.#isTab(event.tab) && instance.#tabPanelMap.has(event.tab)) {
            instance.#onTabExpand(event.tab);
          }
        }
      }
    });

    window.addEventListener('disabled', event => {
      if (event instanceof TabDisabledEvent) {
        for (const instance of this.#instances) {
          if (instance.#isTab(event.tab) && instance.#tabPanelMap.has(event.tab)) {
            instance.#onTabDisabled();
          }
        }
      }
    });
  }

  #logger: Logger;

  #host: ReactiveControllerHost;

  #element: HTMLElement;

  #tabPanelMap = new Map<Tab, Panel>();

  #isTab: TabsControllerOptions['isTab'];

  #isPanel: TabsControllerOptions['isPanel'];

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
    return this.#activeTab;
  }

  set activeTab(tab: Tab | undefined) {
    if (tab === undefined || !this.#tabPanelMap.has(tab)) {
      this.#logger.warn(`The tab provided is not a valid tab.`);
      return;
    }
    // get tab index
    const index = this._tabs.indexOf(tab);
    this.activeIndex = index;
  }

  protected get _tabs() {
    return [...this.#tabPanelMap.keys()] as Tab[];
  }

  get #activeTab(): Tab | undefined {
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
  constructor(host: ReactiveControllerHost, options: TabsControllerOptions) {
    this.#logger = new Logger(host);
    if (host instanceof HTMLElement) {
      this.#element = host;
      this.#tabindex = new RovingTabindexController(host);
    } else {
      const element = options.getHTMLElement?.();
      if (!element) {
        throw new Error('TabsController must be instantiated with an HTMLElement of a `getHTMLElement` function');
      }
      // TODO(bennypowers): remove after #2570, by forwarding the `getHTMLElement` options
      if (!isReactiveControllerHost(element)) {
        throw new Error('TabsController\'s host HTMLElement must be a controller host as well');
      }
      this.#element = element;
      this.#tabindex = new RovingTabindexController(element);
    }
    this.#isTab = options.isTab;
    this.#isPanel = options.isPanel;
    TabsController.#tabsClasses.add(host.constructor);
    if (this.#element.isConnected) {
      TabsController.#instances.add(this);
    }
    (this.#host = host).addController(this);
    this.#mo.observe(this.#element, { attributes: false, childList: true, subtree: false });
    this.#element.addEventListener('slotchange', this.#onSlotchange);
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
    const tabSlot = this.#element.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=tab]');
    const panelSlot = this.#element.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    this.#slottedPanels = panelSlot?.assignedElements().filter(this.#isPanel) ?? [];
    this.#slottedTabs = tabSlot?.assignedElements().filter(this.#isTab) ?? [];

    this.#tabPanelMap.clear();
    await this.#registerSlottedTabs();

    if (this._tabs.length > 0) {
      this.#updateAccessibility();
      // TODO(bennypowers): adjust to fit, in or after #2570
      this.#tabindex.initItems(this._tabs, this.#element);
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
      this.#tabPanelMap.set(tab, panel);
    } else {
      this.#logger.warn(`Tab and panel do not match`, tab, panel);
    }
  }

  #deactivateExcept(indexToKeep: number) {
    [...this.#tabPanelMap].forEach(([tab, panel], currentIndex) => {
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
    for (const [tab, panel] of this.#tabPanelMap) {
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    }
  }
}
