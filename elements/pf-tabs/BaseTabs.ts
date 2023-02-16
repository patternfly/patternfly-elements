import { LitElement, html } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

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
        instance.#overflow.onScroll();
      }
    }, { capture: false });
  }

  @queryAssignedElements({ slot: 'tab' }) private tabs!: BaseTab[];

  @queryAssignedElements() private panels!: BaseTabPanel[];

  @query('[part="tabs"]') private tabList!: HTMLElement;

  #tabindex = new RovingTabindexController(this);

  #overflow = new OverflowController(this);

  #logger = new Logger(this);

  #_allTabs: BaseTab[] = [];

  #_allPanels: BaseTabPanel[] = [];

  #activeIndex = 0;

  id: string = this.id || getRandomId(this.localName);

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
    const tab = this.#allTabs[index];
    if (tab) {
      if (tab.disabled) {
        this.#logger.warn(`Disabled tabs can not be active, setting first focusable tab to active`);
        this.#tabindex.updateActiveItem(this.#firstFocusable);
        index = this.#activeItemIndex;
      } else if (!tab.active) {
        // if the activeIndex was set through the CLI e.g.`$0.activeIndex = 2`
        tab.active = true;
        return;
      }
    }

    if (index === -1) {
      this.#logger.warn(`No active tab found, setting first focusable tab to active`);
      const first = this.#tabindex.firstItem as BaseTab;
      this.#tabindex.updateActiveItem(first);
      index = this.#activeItemIndex;
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
  }

  get #allPanels() {
    return this.#_allPanels;
  }

  set #allPanels(panels: BaseTabPanel[]) {
    this.#_allPanels = panels.filter(panel => (this.constructor as typeof BaseTabs).isPanel(panel));
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

  async firstUpdated() {
    this.tabList.addEventListener('scroll', this.#overflow.onScroll);
  }

  override render() {
    const { scrollIconSet, scrollIconLeft, scrollIconRight } = this.constructor as typeof BaseTabs;
    return html`
      <div part="container" class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft.bind(this)}">
            <pf-icon icon="${scrollIconLeft}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
          <slot name="tab"
                part="tabs"
                role="tablist"
                @slotchange="${this.#onSlotchange}"></slot> ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight.bind(this)}">
            <pf-icon icon="${scrollIconRight}" set="${scrollIconSet}" loading="eager"></pf-icon>
          </button>`}
        </div>
        <slot part="panels" @slotchange="${this.#onSlotchange}"></slot>
      </div>
    `;
  }

  #onSlotchange(event: { target: { name: string; }; }) {
    if (event.target.name === 'tab') {
      this.#allTabs = this.tabs;
    } else {
      this.#allPanels = this.panels;
    }

    if ((this.#allTabs.length === this.#allPanels.length) &&
      (this.#allTabs.length !== 0 || this.#allPanels.length !== 0)) {
      this.#updateAccessibility();
      this.#firstLastClasses();
      this.#tabindex.initItems(this.#allTabs);
      this.activeIndex = this.#allTabs.findIndex(tab => tab.active);
      this.#tabindex.updateActiveItem(this.#activeTab);
      this.#overflow.init(this.tabList, this.#allTabs);
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

  get #firstFocusable(): BaseTab {
    return this.#tabindex.firstItem as BaseTab;
  }

  get #lastFocusable(): BaseTab {
    return this.#tabindex.lastItem as BaseTab;
  }

  get #firstTab(): BaseTab {
    const [tab] = this.#allTabs;
    return tab;
  }

  get #lastTab(): BaseTab {
    return this.#allTabs.at(-1) as BaseTab;
  }

  get #activeItemIndex() {
    const { activeItem } = this.#tabindex;
    return this.#allTabs.findIndex(t => t === activeItem);
  }

  #activate(selectedTab: BaseTab): void {
    if (selectedTab.ariaDisabled !== 'true') {
      selectedTab.active = true;
    }
  }

  async #select(selectedTab: BaseTab): Promise<void> {
    if (!this.manual) {
      this.#activate(selectedTab);
    }
  }

  // RTI: will handle key events
  #onKeydown = (event: KeyboardEvent): void => {
    const foundTab = this.#allTabs.find(tab => tab === event.target);
    if (!foundTab) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.#select(this.#tabindex.activeItem as BaseTab);
        break;

      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.#select(this.#tabindex.activeItem as BaseTab);
        break;

      case 'Home':
        event.preventDefault();
        this.#select(this.#firstFocusable);
        break;

      case 'End':
        event.preventDefault();
        this.#select(this.#lastFocusable);
        break;

      default:
        return;
    }
  };

  #firstLastClasses() {
    this.#firstTab.classList.add('first');
    this.#lastTab.classList.add('last');
  }

  #scrollLeft() {
    this.#overflow.scrollLeft();
  }

  #scrollRight() {
    this.#overflow.scrollRight();
  }
}
