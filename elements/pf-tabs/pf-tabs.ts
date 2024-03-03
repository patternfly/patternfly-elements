import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { provide, createContext } from '@lit/context';
import { classMap } from 'lit/directives/class-map.js';

import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { TabsAriaController } from '@patternfly/pfe-core/controllers/tabs-aria-controller.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { PfTab, TabExpandEvent } from './pf-tab.js';
import { PfTabPanel } from './pf-tab-panel.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-tabs.css';

export const activeIndexContext = createContext<number>('pf-tabs-active-index');
export const boxContext = createContext<'light' | 'dark' | null>('pf-tabs-box');
export const fillContext = createContext<boolean>('pf-tabs-fill');
export const verticalContext = createContext<boolean>('pf-tabs-vertical');
export const manualContext = createContext<boolean>('pf-tabs-manual');
export const borderBottomContext = createContext<'true' | 'false'>('pf-tabs-border-bottom');

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
   * Box styling on tabs. Defaults to null
   */
  @provide({ context: boxContext })
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  /**
   * Set to true to enable vertical tab styling.
   */
  @provide({ context: verticalContext })
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Set to true to enable filled tab styling.
   */
  @provide({ context: fillContext })
  @property({ reflect: true, type: Boolean }) fill = false;

  /**
   * Border bottom tab styling on tabs. To remove the bottom border, set this prop to false.
   */
  @provide({ context: borderBottomContext })
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  /**
   * Set's the tabs to be manually activated. This means that the tabs will not automatically select
   * unless a user clicks on them or uses the keyboard space or enter key to select them.  Roving
   * tabindex will still update allowing user to keyboard navigate through the tabs with arrow keys.
   */
  @provide({ context: manualContext })
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
  @provide({ context: activeIndexContext })
  @property({ attribute: 'active-index', reflect: true, type: Number }) activeIndex = -1;

  get activeTab(): PfTab | undefined {
    return this.tabs?.find((_, i) => i === this.activeIndex);
  }

  set activeTab(tab: PfTab) {
    this.activeIndex = this.tabs?.indexOf(tab) ?? -1;
  }

  @query('#tabs') private tabsContainer!: HTMLElement;

  @queryAssignedElements({ slot: 'tab' }) private tabs?: PfTab[];

  #overflow = new OverflowController(this, { scrollTimeoutDelay: 200 });

  #tabs = new TabsAriaController<PfTab, PfTabPanel>(this, {
    isTab: (x): x is PfTab => x instanceof PfTab,
    isPanel: (x): x is PfTabPanel => x instanceof PfTabPanel,
    isActiveTab: x => x.active,
  });

  #tabindex = new RovingTabindexController(this, {
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
    if (!this.manual) {
      for (const tab of this.tabs ?? []) {
        this.#tabs.panelFor(tab)?.toggleAttribute('hidden', !tab.active);
      }
    }
    this.#overflow.update();
  }

  async firstUpdated() {
    await this.updateComplete;
    const active = this.tabs?.at(this.activeIndex);
    if (active) {
      this.activeTab = active;
    }
    for (const tab of this.tabs ?? []) {
      tab.active = tab === this.#tabs.activeTab;
      this.#tabs.panelFor(tab)?.toggleAttribute('hidden', !tab.active);
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
    if (event instanceof TabExpandEvent && event.tab instanceof PfTab) {
      this.select(event.tab);
    }
  }

  select(option: PfTab | number) {
    if (typeof option === 'number') {
      this.activeIndex = option;
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
