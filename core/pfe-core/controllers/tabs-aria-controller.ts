import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

export interface TabsControllerOptions<Tab, Panel> {
  /** Add an `isTab` predicate to ensure this tabs instance' state does not leak into parent tabs' state */
  isTab: (node: unknown) => node is Tab;
  isActiveTab: (tab: Tab) => boolean;
  /** Add an `isPanel` predicate to ensure this tabs instance' state does not leak into parent tabs' state */
  isPanel: (node: unknown) => node is Panel;
  getHTMLElement?: () => HTMLElement;
}

export class TabsAriaController<
  Tab extends HTMLElement = HTMLElement,
  Panel extends HTMLElement = HTMLElement,
> implements ReactiveController {
  #logger: Logger;

  #host: ReactiveControllerHost;

  #element: HTMLElement;

  #tabPanelMap = new Map<Tab, Panel>();

  #options: TabsControllerOptions<Tab, Panel>;

  #mo = new MutationObserver(this.#onSlotchange.bind(this));

  get #tabs() {
    return [...this.#tabPanelMap.keys()] as Tab[];
  }

  get activeTab(): Tab | undefined {
    return this.#tabs.find(x => this.#options.isActiveTab(x));
  }

  /**
   * @example Usage in PfTab
   *          ```ts
   *          new TabsController(this, {
   *             isTab: (x): x is PfTab => x instanceof PfTab,
   *             isPanel: (x): x is PfTabPanel => x instanceof PfTabPanel
   *          });
   *          ```
   */
  constructor(
    host: ReactiveControllerHost,
    options: TabsControllerOptions<Tab, Panel>,
  ) {
    this.#options = options;
    this.#logger = new Logger(host);
    if (host instanceof HTMLElement) {
      this.#element = host;
    } else {
      const element = options.getHTMLElement?.();
      if (!element) {
        throw new Error('TabsController must be instantiated with an HTMLElement or a `getHTMLElement()` option');
      }
      this.#element = element;
    }
    (this.#host = host).addController(this);
    this.#element.addEventListener('slotchange', this.#onSlotchange);
    if (this.#element.isConnected) {
      this.hostConnected();
    }
  }

  hostConnected() {
    this.#mo.observe(this.#element, { attributes: false, childList: true, subtree: false });
    this.#onSlotchange();
  }

  hostUpdated() {
    for (const [tab, panel] of this.#tabPanelMap) {
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', tab.id);
      }
      tab.setAttribute('aria-controls', panel.id);
    }
  }

  hostDisconnected(): void {
    this.#mo.disconnect();
  }

  /**
   * zip the tabs and panels together into #tabPanelMap
   */
  #onSlotchange() {
    this.#tabPanelMap.clear();
    const tabs = [];
    const panels = [];
    for (const child of this.#element.children) {
      if (this.#options.isTab(child)) {
        tabs.push(child);
      } else if (this.#options.isPanel(child)) {
        panels.push(child);
      }
    }
    if (tabs.length > panels.length) {
      this.#logger.warn('Too many tabs!');
    } else if (panels.length > tabs.length) {
      this.#logger.warn('Too many panels!');
    }
    while (tabs.length) {
      this.#tabPanelMap.set(tabs.shift()!, panels.shift()!);
    }
    this.#host.requestUpdate();
  }

  panelFor(tab: Tab): Panel | undefined {
    return this.#tabPanelMap.get(tab);
  }

  tabFor(panel: Panel): Tab | undefined {
    for (const [tab, panelToCheck] of this.#tabPanelMap) {
      if (panel === panelToCheck) {
        return tab;
      }
    }
  }
}
