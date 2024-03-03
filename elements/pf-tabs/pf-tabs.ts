import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { provide } from '@lit/context';
import { classMap } from 'lit/directives/class-map.js';

import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { TabsAriaController } from '@patternfly/pfe-core/controllers/tabs-aria-controller.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { PfTab, TabExpandEvent } from './pf-tab.js';
import { PfTabPanel } from './pf-tab-panel.js';

import { activeTabCtx, boxCtx, fillCtx, verticalCtx, manualCtx, borderBottomCtx } from './context.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-tabs.css';

/**
 * **Tabs** allow users to navigate between views within the same page or context.
 *
 * @csspart container - outer container
 * @csspart tabs-container - tabs container
 * @csspart tabs - tablist
 * @csspart panels - panels
 *
 * @slot tab - Must contain one or more `<pf-tab>`
 * @slot - Must contain one or more `<pf-panel>`
 *
 * @cssprop     {<length>} --pf-c-tabs--Width {@default `auto`}
 * @cssprop     {<length>} --pf-c-tabs--inset {@default `0`}
 *
 * @cssprop     {<color>}   --pf-c-tabs--before--BorderColor       {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderTopWidth    {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderRightWidth  {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>}  --pf-c-tabs--before---BorderLeftWidth  {@default `0`}
 *
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical--MaxWidth      {@default `15.625rem`}
 *
 * @cssprop     {<color>}   --pf-c-tabs--m-vertical__list--before--BorderColor       {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderTopWidth    {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderRightWidth  {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderBottomWidth {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderLeftWidth   {@default `1px`}
 *
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical--m-box--inset  {@default `2rem`}
 *
 * @cssprop     {<display>} --pf-c-tabs__list--Display  {@default `flex`}
 *
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--Width                         {@default `3rem`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--Color                         {@default `#151515`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--BackgroundColor               {@default `#ffffff`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--OutlineOffset                 {@default `-0.25rem`}
 * @cssprop     {<time>}    --pf-c-tabs__scroll-button--TransitionDuration--margin    {@default `.125s`}
 * @cssprop     {<time>}    --pf-c-tabs__scroll-button--TransitionDuration--transform {@default `.125s`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--hover--Color                  {@default `#06c`}
 *
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--before--BorderColor           {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderRightWidth      {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderBottomWidth     {@default `1px`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderLeftWidth       {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--border-width--base    {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__scroll-button--disabled--Color                 {@default `#d2d2d2`}
 */
@customElement('pf-tabs')
export class PfTabs extends LitElement {
  static readonly styles = [styles];

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
  @provide({ context: boxCtx })
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  /**
   * Set to true to enable vertical tab styling.
   */
  @provide({ context: verticalCtx })
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Set to true to enable filled tab styling.
   */
  @provide({ context: fillCtx })
  @property({ reflect: true, type: Boolean }) fill = false;

  /**
   * Border bottom tab styling on tabs. To remove the bottom border, set this prop to false.
   */
  @provide({ context: borderBottomCtx })
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  /**
   * Set's the tabs to be manually activated. This means that the tabs will not automatically select
   * unless a user clicks on them or uses the keyboard space or enter key to select them.  Roving
   * tabindex will still update allowing user to keyboard navigate through the tabs with arrow keys.
   */
  @provide({ context: manualCtx })
  @property({ reflect: true, type: Boolean }) manual = false;

  /**
   * The index of the active tab
   */
  @property({ attribute: 'active-index', reflect: true, type: Number }) activeIndex = -1;

  @provide({ context: activeTabCtx }) @property({ attribute: false }) activeTab?: PfTab;

  @query('#tabs') private tabsContainer!: HTMLElement;

  @queryAssignedElements({ slot: 'tab' }) private tabs?: PfTab[];

  #overflow = new OverflowController(this, { scrollTimeoutDelay: 200 });

  #tabs = new TabsAriaController<PfTab, PfTabPanel>(this, {
    isTab: (x): x is PfTab => x instanceof PfTab,
    isPanel: (x): x is PfTabPanel => x instanceof PfTabPanel,
    isActiveTab: x => x.active,
  });

  #tabindex = new RovingTabindexController(this, {
    getHTMLElement: () => this.shadowRoot?.getElementById('tabs') ?? null,
    getItems: () => this.tabs ?? [],
  });

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('expand', this.#onExpand);
    this.id ||= getRandomId(this.localName);
  }

  protected override async getUpdateComplete(): Promise<boolean> {
    const here = await super.getUpdateComplete();
    const ps = await Promise.all(Array.from(
      this.querySelectorAll<LitElement>('pf-tab, pf-tab-panel'),
      x => x.updateComplete,
    ));
    return here && ps.every(x => !!x);
  }

  override willUpdate(): void {
    this.#updateActive();
    this.#overflow.update();
  }

  #updateActive() {
    if (!this.#tabindex.activeItem?.disabled) {
      this.tabs?.forEach((tab, i) => {
        if (!this.manual) {
          const active = tab === this.#tabindex.activeItem;
          tab.active = active;
          if (active) {
            this.activeIndex = i;
            this.activeTab = tab;
          }
          this.#tabs.panelFor(tab)?.toggleAttribute('hidden', !active);
        }
      });
    }
  }

  render() {
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
    if (event instanceof TabExpandEvent && event.tab instanceof PfTab && !event.defaultPrevented) {
      this.select(event.tab);
    }
  }

  select(option: PfTab | number) {
    if (typeof option === 'number') {
      this.#tabindex.setActiveItem(this.tabs?.at(option));
    } else {
      this.#tabindex.setActiveItem(option);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tabs': PfTabs;
  }
}
