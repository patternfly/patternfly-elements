import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { provide } from '@lit/context';
import { classMap } from 'lit/directives/class-map.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { TabsAriaController } from '@patternfly/pfe-core/controllers/tabs-aria-controller.js';

import { PfTab } from './pf-tab.js';
import { PfTabPanel } from './pf-tab-panel.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { type PfTabsContext, TabExpandEvent, context } from './context.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-tabs.css';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

/**
 * **Tabs** allow users to navigate between views within the same page or context.
 * @csspart container - outer container
 * @csspart tabs-container - tabs container
 * @csspart tabs - tablist
 * @csspart panels - panels
 * @slot tab - Must contain one or more `<pf-tab>`
 * @slot - Must contain one or more `<pf-panel>`
 * @cssprop     {<length>} [--pf-c-tabs--Width=auto]
 * @cssprop     {<length>} [--pf-c-tabs--inset=0]
 * @cssprop     {<color>}   [--pf-c-tabs--before--BorderColor=#d2d2d2]
 * @cssprop     {<length>}  [--pf-c-tabs--before--BorderTopWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--before--BorderRightWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--before--BorderBottomWidth=1px]
 * @cssprop     {<length>}  [--pf-c-tabs--before---BorderLeftWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical--MaxWidth=15.625rem]
 * @cssprop     {<color>}   [--pf-c-tabs--m-vertical__list--before--BorderColor=#d2d2d2]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical__list--before--BorderTopWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical__list--before--BorderRightWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical__list--before--BorderBottomWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical__list--before--BorderLeftWidth=1px]
 * @cssprop     {<length>}  [--pf-c-tabs--m-vertical--m-box--inset=2rem]
 * @cssprop     {<display>} [--pf-c-tabs__list--Display=flex]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--Width=3rem]
 * @cssprop     {<color>}   [--pf-c-tabs__scroll-button--Color=#151515]
 * @cssprop     {<color>}   [--pf-c-tabs__scroll-button--BackgroundColor=#ffffff]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--OutlineOffset=-0.25rem]
 * @cssprop     {<time>}    [--pf-c-tabs__scroll-button--TransitionDuration--margin=.125s]
 * @cssprop     {<time>}    [--pf-c-tabs__scroll-button--TransitionDuration--transform=.125s]
 * @cssprop     {<color>}   [--pf-c-tabs__scroll-button--hover--Color=#06c]
 * @cssprop     {<color>}   [--pf-c-tabs__scroll-button--before--BorderColor=#d2d2d2]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--before--BorderRightWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--before--BorderBottomWidth=1px]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--before--BorderLeftWidth=0]
 * @cssprop     {<length>}  [--pf-c-tabs__scroll-button--before--border-width--base=1px]
 * @cssprop     {<color>} [--pf-c-tabs__scroll-button--disabled--Color=#d2d2d2]
 */
@customElement('pf-tabs')
export class PfTabs extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  protected static readonly scrollTimeoutDelay = 150;

  static isExpandEvent(event: Event): event is TabExpandEvent<PfTab> {
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

  @property({ attribute: false }) activeTab?: PfTab;

  get tabs(): PfTab[] {
    return this.#tabs.tabs;
  }

  @query('#tabs') private tabsContainer!: HTMLElement;

  get #ctx(): PfTabsContext {
    const { activeTab, borderBottom, box, fill, manual, vertical } = this;
    return { activeTab, borderBottom, box, fill, manual, vertical };
  }

  @provide({ context })
  private ctx: PfTabsContext = this.#ctx;

  #overflow = new OverflowController(this, { scrollTimeoutDelay: 200 });

  #tabs = new TabsAriaController<PfTab, PfTabPanel>(this, {
    isTab: (x): x is PfTab => (x as HTMLElement).localName === 'pf-tab',
    isPanel: (x): x is PfTabPanel => (x as HTMLElement).localName === 'pf-tab-panel',
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
      this.querySelectorAll<LitElement>('pf-tab, pf-tab-panel'),
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
  protected activeTabChanged(old?: PfTab, activeTab?: PfTab): void {
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
      <div part="container"
           class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.labelScrollLeft}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-icon icon="angle-left" set="fas" loading="eager"></pf-icon>
          </button>`}
          <div id="tabs" part="tabs" role="tablist">
            <slot name="tab" @slotchange="${this.#onSlotChange}" @scroll="${this.#overflow.onScroll}"></slot>
          </div>
          ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.labelScrollRight}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight}">
            <pf-icon icon="angle-right" set="fas" loading="eager"></pf-icon>
          </button>`}
        </div>
        <slot part="panels"></slot>
      </div>
    `;
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

  select(tab: PfTab | number): void {
    if (typeof tab === 'number') {
      this.activeIndex = tab;
    } else {
      this.activeIndex = this.tabs.indexOf(tab);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tabs': PfTabs;
  }
}
