import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { classMap } from 'lit/directives/class-map.js';

import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { TabExpandEvent, TabsController } from '@patternfly/pfe-core/controllers/tabs-controller.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { cascades } from '@patternfly/pfe-core/decorators.js';

import { PfTab } from './pf-tab.js';
import { PfTabPanel } from './pf-tab-panel.js';

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

  /**
   * Box styling on tabs. Defaults to null
   */
  @cascades('pf-tab', 'pf-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  /**
   * Set to true to enable vertical tab styling.
   */
  @cascades('pf-tab', 'pf-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Set to true to enable filled tab styling.
   */
  @cascades('pf-tab')
  @property({ reflect: true, type: Boolean }) fill = false;

  /**
   * Border bottom tab styling on tabs. To remove the bottom border, set this prop to false.
   */
  @cascades('pf-tab')
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  /**
   * Set's the tabs to be manually activated. This means that the tabs will not automatically select
   * unless a user clicks on them or uses the keyboard space or enter key to select them.  Roving
   * tabindex will still update allowing user to keyboard navigate through the tabs with arrow keys.
   */
  @cascades('pf-tab')
  @property({ reflect: true, type: Boolean }) manual = false;

  /**
   * Aria Label for the left scroll button
   */
  @property({ reflect: false, attribute: 'label-scroll-left' }) labelScrollLeft = 'Scroll left';

  /**
   * Aria Label for the right scroll button
   */
  @property({ reflect: false, attribute: 'label-scroll-right' }) labelScrollRight = 'Scroll left';

  /**
   * The index of the active tab
   */
  @property({ attribute: 'active-index', reflect: true, type: Number })
  get activeIndex() {
    return this.#tabs.activeIndex;
  }

  set activeIndex(index: number) {
    this.#tabs.activeIndex = index;
  }

  get activeTab(): PfTab {
    return this.#tabs.activeTab as PfTab;
  }

  set activeTab(tab: PfTab) {
    this.#tabs.activeTab = tab;
  }

  @query('#tabs') private _tabsContainer!: HTMLElement;

  @queryAssignedElements({ slot: 'tab' }) private _tabs?: PfTab[];

  protected get canShowScrollButtons(): boolean {
    return !this.vertical;
  }

  #overflow = new OverflowController(this, { scrollTimeoutDelay: 200 });

  #tabs = new TabsController(this, {
    isTab: (x: Node): x is PfTab => x instanceof PfTab,
    isPanel: (x: Node): x is PfTabPanel => x instanceof PfTabPanel,
  });

  static isExpandEvent(event: Event): event is TabExpandEvent {
    return event instanceof TabExpandEvent;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
  }

  override willUpdate(): void {
    this.#overflow.update();
  }

  render() {
    return html`
      <div part="container" class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.labelScrollLeft}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-icon icon="angle-left" set="fas" loading="eager"></pf-icon>
          </button>`}
          <slot id="tabs"
                name="tab"
                part="tabs"
                role="tablist"
                @slotchange="${this.#onSlotChange}"
                @scroll="${this.#overflow.onScroll}"></slot> ${!this.#overflow.showScrollButtons ? '' : html`
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
    if (this._tabs) {
      this.#overflow.init(this._tabsContainer, this._tabs);
    }
  }

  select(option: PfTab | number) {
    if (typeof option === 'number') {
      this.#tabs.activeIndex = option;
    } else {
      this.activeTab = option;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tabs': PfTabs;
  }
}
