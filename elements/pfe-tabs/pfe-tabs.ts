import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  bound,
  cascades,
  initializer,
  observed,
  pfelement,
} from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfeTab } from './pfe-tab.js';
import { PfeTabPanel } from './pfe-tab-panel.js';

import style from './pfe-tabs.scss';

/**
 * Tabs are used to organize and navigate between sections of content. They feature a horizontal or a vertical list of section text labels with a content panel below or to the right of the component.
 *
 * @summary Organizes content in a contained view on the same page
 * 
 * @attr {'light'|'dark'|'saturated'} context - Changes the context of the call-to-action to one of 3 possible options:
 *       This will override any context being passed from a parent component and will add a style attribute setting the `--context` variable.
 *       {@default 'light'}
 *
 * @slot - Place the `pfe-tab` and `pfe-tab-panel` elements here.
 *
 * @fires pfe-tabs:shown-tab - Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.
 * @fires pfe-tabs:hidden-tab - Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.
 *
 * @cssprop --pfe-theme--container-padding - Tab padding and panel padding {@default 16px}
 * @cssprop --pfe-theme--color--surface--border - Link color for default CTA {@default `$pfe-color--surface--border`}
 * @cssprop --pfe-theme--ui--border-style - Border style for selected tab {@default solid}
 * @cssprop --pfe-theme--ui--border-width - Border width for selected tab {@default 1px}
 * @cssprop --pfe-theme--color--surface--lightest - Selected tab background color {@default `$pfe-color--surface--lightest`}
 * @cssprop --pfe-theme--color--surface--lightest--text - Default tab text color {@default `$pfe-color--surface--lightest--text`}
 * @cssprop --pfe-theme--color--surface--lightest--link - Tab hover and selected indicator color {@default `$pfe-color--surface--lightest--link`}
 * @cssprop --pfe-theme--color--surface--lightest--link--focus - Focused tab outline color {@default `$pfe-color--surface--lightest--link--focus`}
 * @cssprop --pfe-tabs__indicator--Display - Tab indicator display {@default block}
 * @cssprop --pfe-tabs__indicator--Height - Tab indicator height {@default 4px}
 * @cssprop --pfe-tabs__indicator--Width - Tab indicator width {@default 22px}
 * @cssprop --pfe-tabs__tab--TextTransform - Tab text transform {@default none}
 */
@customElement('pfe-tabs') @pfelement()
export class PfeTabs extends LitElement {
  static readonly styles = [style];

  private logger = new Logger(this);

  private _linked = false;

  private _updateHistory = true;

  private _setFocus = false;

   /**
    * Values:
    * - `wind`: Borders are removed, only an accent colored indicator appears under the active heading.
    * - `earth`: Headings are encased in a block. The active heading has an accent colored border on one side.
    *
    * ```html
    * <pfe-tabs variant="wind">
    *   ...
    * </pfe-tabs>
    * ```
  */
   @cascades('pfe-tab', 'pfe-tab-panel')
   @property({ reflect: true })
     variant: 'wind'|'earth' = 'wind';

  /**
   * Orients the tabs vertically on the left and pushes the content panes to the right.
   *
   * ```html
   * <pfe-tabs vertical>
   *   ...
   * </pfe-tabs>
   * ```
   */
  @observed
  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ type: Boolean, reflect: true })
    vertical = false;

  /**
   * Sets and reflects the currently selected tab index.
   *
   * ```html
   * <pfe-tabs selected-index="2">
   *   ...
   * </pfe-tabs>
   * ```
   */
  @observed
  @property({ type: Number, reflect: true, attribute: 'selected-index' })
    selectedIndex = 0;

  /** Orientation */
  @property({ type: String, attribute: 'aria-orientation', reflect: true })
    orientation: 'horizontal'|'vertical' = 'horizontal';

  /** Tab alignment */
  @property({ reflect: true }) tabAlign?: 'center';

  @property({ reflect: true, attribute: 'aria-controls' }) controls?: string;

  /**
   * Updates window.history and the URL to create sharable links. With the
   * `tab-history` attribute, the tabs and each tab *must* have an `id`.
   *
   * The URL pattern will be `?{id-of-tabs}={id-of-selected-tab}`. In the example
   * below, selecting "Tab 2" will update the URL as follows: `?my-tabs=tab2`.
   *
   * ```html
   * <pfe-tabs tab-history id="my-tabs">
   *   <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
   *   <pfe-tab-panel role="region" slot="panel">
   *     <h2>Content 1</h2>
   *     <p>Tab 1 panel content.</p>
   *   </pfe-tab-panel>
   *   <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
   *   <pfe-tab-panel role="region" slot="panel">
   *     <h2>Content 2</h2>
   *     <p>Tab 2 panel content.</p>
   *   </pfe-tab-panel>
   * </pfe-tabs>
   * ```
   *
   * ### Using the URL to open a specific tab
   *
   * By default, `pfe-tabs` will read the URL and look for a query string parameter
   * that matches the id of a `pfe-tabs` component and a value of a specific
   * `pfe-tab`.
   *
   * For example, `?my-tabs=tab2` would open the second tab in the code sample below.
   * "my-tabs" is equal to the id of the `pfe-tabs` component and "tab2" is equal to
   * the id of the second tab in the tab set.
   *
   * ```html
   * <pfe-tabs id="my-tabs">
   *   <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
   *   <pfe-tab-panel role="region" slot="panel">
   *     <h2>Content 1</h2>
   *     <p>Tab 1 panel content.</p>
   *   </pfe-tab-panel>
   *   <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
   *   <pfe-tab-panel role="region" slot="panel">
   *     <h2>Content 2</h2>
   *     <p>Tab 2 panel content.</p>
   *   </pfe-tab-panel>
   * </pfe-tabs>
   * ```
   *
   * In the event that a tab with the supplied id in the URL does not exist,
   * `pfe-tabs` will fall back to the `selected-index` attribute if one is supplied
   * in the markup, or the first tab if `selected-index` is not provided.
   */
  @observed
  @property({ type: Boolean, reflect: true, attribute: 'tab-history' })
    tabHistory = false;

  @property({ type: Boolean, reflect: true }) selected?: boolean|PfeTab;

  @property({ reflect: true }) role = 'tablist';

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);
  }

  render() {
    return html`
      <div class="tabs">
        <div class="tabs-prefix"></div>
        <slot name="tab"></slot>
        <div class="tabs-suffix"></div>
      </div>
      <div class="panels">
        <slot name="panel"></slot>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onKeyDown);
    this._allTabs().forEach(tab => tab.removeEventListener('click', this._onClick));

    if (this.tabHistory) {
      window.removeEventListener('popstate', this._popstateEventHandler);
    }
  }

  protected _verticalChanged() {
    if (this.vertical) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  protected async _selectedIndexChanged(oldVal?: number, newVal?: number) {
    if (newVal != null && oldVal !== newVal) {
      // Wait until the tab and panels are loaded
      await this.updateComplete;
      this._linkPanels();
      this.selectIndex(newVal);
      this._updateHistory = true;
    }
  }

  protected _tabHistoryChanged() {
    if (!this.tabHistory) {
      window.removeEventListener('popstate', this._popstateEventHandler);
    } else {
      window.addEventListener('popstate', this._popstateEventHandler);
    }
  }

  @initializer({ observe: {
    childList: true,
    subtree: true,
  } }) protected async _init() {
    await this.updateComplete;
    const tabIndexFromURL = this._getTabIndexFromURL();
    this._linked = false;
    this._linkPanels();

    this.role = 'tablist';

    if (tabIndexFromURL > -1) {
      this._setFocus = true;
      this.selectedIndex = tabIndexFromURL;
    }
  }

  @bound private _linkPanels() {
    if (this._linked) {
      return;
    }

    this.updateAccessibility();

    this._linked = true;
  }

  private _allPanels(): PfeTabPanel[] {
    return [...this.children].filter(child => child.matches('pfe-tab-panel')) as PfeTabPanel[];
  }

  private _allTabs(): PfeTab[] {
    return [...this.children].filter(child => child.matches('pfe-tab')) as PfeTab[];
  }

  private _panelForTab(tab: PfeTab): PfeTabPanel|null {
    if (!tab || !tab.controls) {
      return null;
    }

    const panel = this.querySelector(`#${tab.controls}`);
    if (panel instanceof PfeTabPanel) {
      return panel;
    } else {
      return null;
    }
  }

  private _prevTab() {
    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected === 'true') - 1;
    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  private _firstTab() {
    const tabs = this._allTabs();
    return tabs[0];
  }

  private _lastTab() {
    const tabs = this._allTabs();
    return tabs[tabs.length - 1];
  }

  private _nextTab() {
    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected === 'true') + 1;
    return tabs[newIdx % tabs.length];
  }

  private _getTabIndex(_tab: EventTarget|null) {
    if (_tab instanceof PfeTab) {
      const tabs = this._allTabs();
      return tabs.findIndex(tab => tab.id === _tab.id);
    } else {
      this.logger.warn(`No tab was provided to _getTabIndex; required to return the index value.`);
      return 0;
    }
  }

  private _selectTab(newTab?: PfeTab) {
    if (!newTab) {
      return;
    }

    this.reset();

    const newPanel = this._panelForTab(newTab);
    let newTabSelected = false;

    if (!newPanel) {
      this.logger.warn(`No panel was found for the selected tab${newTab.id ? `: pfe-tab#${newTab.id}` : ''}`);
    }

    // this.selected on tabs contains a pointer to the selected tab element
    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.dispatchEvent(pfeEvent('pfe-tabs:hidden-tab', { tab: this.selected }));
    }

    newTab.selected = 'true';
    if (newPanel) {
      newPanel.hidden = false;
    }

    // Update the value of the selected pointer to the new tab
    this.selected = newTab;

    if (newTabSelected) {
      if (this._setFocus) {
        newTab.focus();
      }

      this.dispatchEvent(pfeEvent('pfe-tabs:shown-tab', { tab: this.selected }));
    }

    this._setFocus = false;
  }

  @bound private _onKeyDown(event: KeyboardEvent) {
    const tabs = this._allTabs();
    const foundTab = tabs.find(tab => tab === event.target);

    if (!foundTab) {
      return;
    }

    if (event.altKey) {
      return;
    }

    let newTab;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newTab = this._prevTab();
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        newTab = this._nextTab();
        break;

      case 'Home':
        newTab = this._firstTab();
        break;

      case 'End':
        newTab = this._lastTab();
        break;

      default:
        return;
    }

    event.preventDefault();

    if (newTab) {
      this.selectedIndex = this._getTabIndex(newTab);
      this._setFocus = true;
    } else {
      this.logger.warn(`No new tab could be found.`);
    }
  }

  @bound private _onClick(event: MouseEvent) {
    // Find the clicked tab
    const foundTab = this._allTabs().find(tab => tab === event.currentTarget);

    // If the tab wasn't found in the markup, exit the handler
    if (!foundTab) {
      return;
    }

    // Update the selected index to the clicked tab
    this.selectedIndex = this._getTabIndex(event.currentTarget);
  }

  private _getTabIndexFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    const tabsetInUrl = urlParams.has(this.id);

    if (urlParams && tabsetInUrl) {
      const id = urlParams.get(this.id);
      return this._allTabs().findIndex(tab => tab.id === id);
    }

    return -1;
  }

  @bound private _popstateEventHandler() {
    const tabIndexFromURL = this._getTabIndexFromURL();

    this._updateHistory = false;
    if (tabIndexFromURL > -1) {
      this.selectedIndex = tabIndexFromURL;
    }
  }

  select(newTab: Element) {
    if (!(newTab instanceof PfeTab)) {
      this.logger.warn(`the tab must be a pfe-tab element`);
      return;
    }

    this.selectedIndex = this._getTabIndex(newTab);
  }

  selectIndex(_index: number|string) {
    if (_index == null) {
      return;
    }

    const index = typeof _index === 'string' ? parseInt(_index, 10) : _index;
    const tabs = this._allTabs();
    const tab = tabs[index];

    if (tabs.length > 0 && !tab) {
      this.logger.warn(`tab ${_index} does not exist`);
      return;
    } else if (!tabs && !tab) {
      // Wait for upgrade?
      return;
    }

    if (this.selected && this.tabHistory && this._updateHistory) {
      // rebuild the url
      const { pathname } = window.location;
      const urlParams = new URLSearchParams(window.location.search);
      const { hash } = window.location;

      urlParams.set(this.id, tab.id);
      history.pushState({}, '', `${pathname}?${urlParams.toString()}${hash}`);
    }

    this._selectTab(tab);

    return tab;
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => (tab.selected = 'false'));
    panels.forEach(panel => (panel.hidden = true));
  }

  updateAccessibility() {
    this._allTabs().forEach(tab => {
      const panel = tab.nextElementSibling;
      if (!(panel instanceof PfeTabPanel)) {
        this.logger.warn(`not a sibling of a <pfe-tab-panel>`);
        return;
      }

      // Connect the 2 items via appropriate aria attributes
      tab.controls = panel.id;
      panel.labelledby = tab.id;

      tab.addEventListener('click', this._onClick);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
