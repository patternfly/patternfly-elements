import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { eventOptions } from 'lit/decorators/event-options.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { provide } from '@lit/context';
import { classMap } from 'lit/directives/class-map.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { TabsAriaController } from '@patternfly/pfe-core/controllers/tabs-aria-controller.js';

import { PfV5Tab } from './pf-v5-tab.js';
import { PfV5TabPanel } from './pf-v5-tab-panel.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { type PfV5TabsContext, TabExpandEvent, context } from './context.js';

import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

import styles from './pf-v5-tabs.css';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

/**
 * **Tabs** allow users to navigate between views within the same page or context.
 * @alias Tabs
 */
@customElement('pf-v5-tabs')
export class PfV5Tabs extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  protected static readonly scrollTimeoutDelay = 150;

  static isExpandEvent(event: Event): event is TabExpandEvent<PfV5Tab> {
    return event instanceof TabExpandEvent;
  }

  /**
   * Aria Label for the left scroll button
   */
  @property({ reflect: false, attribute: 'label-scroll-left' }) labelScrollLeft = 'Scroll left';

  /**
   * Aria Label for the right scroll button
   */
  @property({ reflect: false, attribute: 'label-scroll-right' }) labelScrollRight = 'Scroll left';

  /**
   * Box styling on tabs. Defaults to null
   */
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  /**
   * Set to true to enable vertical tab styling.
   */
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Set to true to enable filled tab styling.
   */
  @property({ reflect: true, type: Boolean }) fill = false;

  /**
   * Border bottom tab styling on tabs. To remove the bottom border, set this prop to false.
   */
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  /**
   * Set's the tabs to be manually activated. This means that the tabs will not automatically select
   * unless a user clicks on them or uses the keyboard space or enter key to select them.  Roving
   * tabindex will still update allowing user to keyboard navigate through the tabs with arrow keys.
   */
  @property({ reflect: true, type: Boolean }) manual = false;

  #activeIndex = -1;

  /** The index of the active tab */
  @property({ attribute: 'active-index', reflect: true, type: Number })
  get activeIndex() {
    return this.#activeIndex;
  }

  set activeIndex(v: number) {
    this.#tabindex.atFocusedItemIndex = v;
    this.#activeIndex = v;
    this.activeTab = this.tabs[v];
    for (const tab of this.tabs) {
      if (!this.activeTab?.disabled) {
        tab.active = tab === this.activeTab;
      }
      this.#tabs.panelFor(tab)?.toggleAttribute('hidden', !tab.active);
    }
  }

  @property({ attribute: false }) activeTab?: PfV5Tab;

  get tabs(): PfV5Tab[] {
    return this.#tabs.tabs;
  }

  @query('#tabs') private tabsContainer!: HTMLElement;

  get #ctx(): PfV5TabsContext {
    const { activeTab, borderBottom, box, fill, manual, vertical } = this;
    return { activeTab, borderBottom, box, fill, manual, vertical };
  }

  @provide({ context })
  private ctx: PfV5TabsContext = this.#ctx;

  #overflow = new OverflowController(this, { scrollTimeoutDelay: 200 });

  #tabs = new TabsAriaController<PfV5Tab, PfV5TabPanel>(this, {
    isTab: (x): x is PfV5Tab => (x as HTMLElement).localName === 'pf-v5-tab',
    isPanel: (x): x is PfV5TabPanel => (x as HTMLElement).localName === 'pf-v5-tab-panel',
    isActiveTab: x => x.active,
  });

  #tabindex = RovingTabindexController.of(this, {
    getItemsContainer: () => this.tabsContainer ?? null,
    getItems: () => this.tabs ?? [],
  });

  #logger = new Logger(this);

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('expand', this.#onExpand);
    this.id ||= getRandomId(this.localName);
    this.activeIndex = this.#tabindex.atFocusedItemIndex;
  }

  protected override async getUpdateComplete(): Promise<boolean> {
    const here = await super.getUpdateComplete();
    const ps = await Promise.all(Array.from(
      this.querySelectorAll<LitElement>('pf-v5-tab, pf-v5-tab-panel'),
      x => x.updateComplete,
    ));
    return here && ps.every(x => !!x);
  }

  protected override willUpdate(): void {
    if (!this.manual && this.activeIndex !== this.#tabindex.atFocusedItemIndex) {
      this.activeIndex = this.#tabindex.atFocusedItemIndex;
    }
    this.#overflow.update();
    this.ctx = this.#ctx;
  }

  @observes('activeTab')
  protected activeTabChanged(old?: PfV5Tab, activeTab?: PfV5Tab): void {
    if (activeTab?.disabled) {
      this.#logger.warn('Active tab is disabled. Setting to first focusable tab');
      this.activeIndex = 0;
    } if (activeTab) {
      this.activeIndex = this.tabs.indexOf(activeTab);
    }
  }

  protected override firstUpdated(): void {
    if (this.tabs.length && this.activeIndex === -1) {
      this.select(this.tabs.findIndex(x => !x.disabled));
    }
  }

  render(): TemplateResult<1> {
    return html`
      <!-- outer container -->
      <div part="container"
           class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <!-- tabs container -->
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.labelScrollLeft}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-v5-icon icon="angle-left" set="fas" loading="eager"></pf-v5-icon>
          </button>`}
          <!-- tablist -->
          <div id="tabs" part="tabs" role="tablist">
            <!-- Must contain one or more \`<pf-v5-tab>\` -->
            <slot name="tab" @slotchange="${this.#onSlotChange}" @scroll="${this.onScroll}"></slot>
          </div>
          ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.labelScrollRight}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight}">
            <pf-v5-icon icon="angle-right" set="fas" loading="eager"></pf-v5-icon>
          </button>`}
        </div>
        <!--
          slot:
            summary: Must contain one or more \`<pf-v5-panel>\`
          part:
            summary: panels
        -->
        <slot part="panels"></slot>
      </div>
    `;
  }

  @eventOptions({ passive: true })
  private onScroll() {
    this.#overflow.onScroll();
  }

  #scrollLeft() {
    this.#overflow.scrollLeft();
  }

  #scrollRight() {
    this.#overflow.scrollRight();
  }

  #onSlotChange() {
    if (this.tabs) {
      this.#overflow.init(this.tabsContainer, this.tabs);
    }
  }

  #onExpand(event: Event) {
    if (event instanceof TabExpandEvent
      && !event.defaultPrevented && this.tabs.includes(event.tab)) {
      this.select(event.tab);
    }
  }

  select(tab: PfV5Tab | number): void {
    if (typeof tab === 'number') {
      this.activeIndex = tab;
    } else {
      this.activeIndex = this.tabs.indexOf(tab);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-tabs': PfV5Tabs;
  }
}
