// Import polyfills: find, findIndex
import "./polyfills--pfe-tabs.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeTab from "./pfe-tab.js";
import PfeTabPanel from "./pfe-tab-panel.js";

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35
};

// @IE11 doesn't support URLSearchParams
// https://caniuse.com/#search=urlsearchparams
const CAN_USE_URLSEARCHPARAMS = window.URLSearchParams ? true : false;

const TABS_MUTATION_CONFIG = {
  childList: true,
  subtree: true
};

class PfeTabs extends PFElement {
  static get tag() {
    return "pfe-tabs";
  }

  get styleUrl() {
    return "pfe-tabs.scss";
  }

  static get meta() {
    return {
      title: "Tabs",
      description: "This element creates a tabbed interface."
    };
  }

  get templateUrl() {
    return "pfe-tabs.html";
  }

  // Each set contains a header and a panel
  static get contentTemplate() {
    return `
      <pfe-tab content-type="header" slot="tab"></pfe-tab>
      <pfe-tab-panel content-type="panel" slot="panel"></pfe-tab-panel>
    `;
  }

  static get properties() {
    return {
      vertical: {
        title: "Vertical orientation",
        type: Boolean,
        default: false,
        cascade: "pfe-tab,pfe-tab-panel",
        observer: "_verticalHandler"
      },
      orientation: {
        title: "Orientation",
        type: String,
        attr: "aria-orientation",
        default: "horizontal",
        values: ["horizontal", "vertical"]
      },
      // Do not set a default of 0, it causes a the URL history to
      // be updated on load for every tab; infinite looping goodness
      // Seriously, don't set a default here unless you do a rewrite
      selectedIndex: {
        title: "Index of the selected tab",
        type: Number,
        observer: "_selectedIndexHandler"
      },
      tabAlign: {
        title: "Tab alignment",
        type: String,
        enum: ["center"]
      },
      controls: {
        type: String,
        attr: "aria-controls"
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"],
        default: "wind",
        cascade: "pfe-tab,pfe-tab-panel"
      },
      tabHistory: {
        title: "Tab History",
        type: Boolean,
        default: false,
        observer: "_tabHistoryHandler"
      },
      role: {
        type: String,
        default: "tablist"
      },
      // @TODO: Deprecated for 1.0
      oldVariant: {
        type: String,
        attr: "pfe-variant",
        alias: "variant"
      },
      // @TODO: Deprecated for 1.0
      oldTabHistory: {
        type: Boolean,
        alias: "tabHistory",
        attr: "pfe-tab-history"
      },
      // @TODO: Deprecated for 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged"
      }
    };
  }

  static get slots() {
    return {
      tab: {
        title: "Tab",
        type: "array",
        namedSlot: true,
        items: {
          $ref: "pfe-tab"
        }
      },
      panel: {
        title: "Panel",
        type: "array",
        namedSlot: true,
        items: {
          $ref: "pfe-tab-panel"
        }
      }
    };
  }

  static get events() {
    return {
      hiddenTab: `${this.tag}:hidden-tab`,
      shownTab: `${this.tag}:shown-tab`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  constructor() {
    super(PfeTabs, { type: PfeTabs.PfeType });

    this._linked = false;
    this._init = this._init.bind(this);
    this._onClick = this._onClick.bind(this);
    this._linkPanels = this._linkPanels.bind(this);
    this._popstateEventHandler = this._popstateEventHandler.bind(this);
    this._observer = new MutationObserver(this._init);
    this._updateHistory = true;
  }

  connectedCallback() {
    Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(() => {
      super.connectedCallback();

      if (this.hasLightDOM()) this._init();

      this._observer.observe(this, TABS_MUTATION_CONFIG);

      this.addEventListener("keydown", this._onKeyDown);
      this.addEventListener("click", this._onClick);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keydown", this._onKeyDown);
    this._allTabs().forEach(tab => tab.removeEventListener("click", this._onClick));
    this._observer.disconnect();

    if (this.tabHistory) window.removeEventListener("popstate", this._popstateEventHandler);
  }

  _verticalHandler() {
    if (this.vertical) this.orientation = "vertical";
    else this.orientation = "horizontal";
  }

  _selectedIndexHandler(oldVal, newVal) {
    // Wait until the tab and panels are loaded
    Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(() => {
      this._linkPanels();
      this.selectIndex(newVal);
      this._updateHistory = true;
    });
  }

  _tabHistoryHandler() {
    if (!this.tabHistory) window.removeEventListener("popstate", this._popstateEventHandler);
    else window.addEventListener("popstate", this._popstateEventHandler);
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id && newVal) this.id = newVal;
  }

  select(newTab) {
    if (!newTab) return;

    if (newTab.tagName.toLowerCase() !== PfeTab.tag) {
      this.warn(`the tab must be a ${PfeTab.tag} element`);
      return;
    }

    this.selectedIndex = this._getTabIndex(newTab);
  }

  selectIndex(_index) {
    if (_index === undefined || _index === null) return;

    const index = parseInt(_index, 10);
    const tabs = this._allTabs();
    const tab = tabs[index];

    if (tabs.length > 0 && !tab) {
      this.warn(`tab ${_index} does not exist`);
      return;
    } else if (!tabs && !tab) {
      // Wait for upgrade?
      return;
    }
    if (this.selected && this.tabHistory && this._updateHistory && CAN_USE_URLSEARCHPARAMS) {
      // @IE11 doesn't support URLSearchParams
      // https://caniuse.com/#search=urlsearchparams
      // rebuild the url
      const pathname = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      urlParams.set(this.id, tab.id);
      history.pushState({}, "", `${pathname}?${urlParams.toString()}${hash}`);
    }

    this._selectTab(tab);

    return tab;
  }

  _init() {
    const tabIndexFromURL = this._getTabIndexFromURL();
    this._linked = false;
    this._linkPanels();

    // Force role to be set to tablist
    if (window.ShadyCSS) this._observer.disconnect();

    this.role = "tablist";

    if (tabIndexFromURL > -1) {
      this._setFocus = true;
      this.selectedIndex = tabIndexFromURL;
    }

    if (!this.selectedIndex) this.selectedIndex = 0;

    if (window.ShadyCSS) this._observer.observe(this, TABS_MUTATION_CONFIG);
  }

  _linkPanels() {
    if (this._linked) return;

    if (window.ShadyCSS) this._observer.disconnect();

    this._allTabs().forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== PfeTabPanel.tag) {
        this.warn(`not a sibling of a <${PfeTabPanel.tag}>`);
        return;
      }

      // Connect the 2 items via appropriate aria attributes
      tab.controls = panel.id;
      panel.labelledby = tab.id;

      tab.addEventListener("click", this._onClick);
    });

    this._linked = true;

    if (window.ShadyCSS) this._observer.observe(this, TABS_MUTATION_CONFIG);
  }

  _allPanels() {
    return [...this.children].filter(child => child.matches(PfeTabPanel.tag));
  }

  _allTabs() {
    return [...this.children].filter(child => child.matches(PfeTab.tag));
  }

  _panelForTab(tab) {
    if (!tab || !tab.controls) return;

    return this.querySelector(`#${tab.controls}`);
  }

  _prevTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected === "true") - 1;
    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  _firstTab() {
    const tabs = this._allTabs();
    return tabs[0];
  }

  _lastTab() {
    const tabs = this._allTabs();
    return tabs[tabs.length - 1];
  }

  _nextTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected === "true") + 1;
    return tabs[newIdx % tabs.length];
  }

  _getTabIndex(_tab) {
    if (_tab) {
      const tabs = this._allTabs();
      return tabs.findIndex(tab => tab.id === _tab.id);
    } else {
      this.warn(`No tab was provided to _getTabIndex; required to return the index value.`);
      return 0;
    }
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => (tab.selected = "false"));
    panels.forEach(panel => (panel.hidden = true));
  }

  _selectTab(newTab) {
    if (!newTab) return;

    this.reset();

    const newPanel = this._panelForTab(newTab);
    let newTabSelected = false;

    if (!newPanel) this.warn(`No panel was found for the selected tab${newTab.id ? `: pfe-tab#${newTab.id}` : ""}`);

    // this.selected on tabs contains a pointer to the selected tab element
    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.emitEvent(PfeTabs.events.hiddenTab, {
        detail: {
          tab: this.selected
        }
      });
    }

    newTab.selected = "true";
    newPanel.hidden = false;

    // Update the value of the selected pointer to the new tab
    this.selected = newTab;

    if (newTabSelected) {
      if (this._setFocus) newTab.focus();

      this.emitEvent(PfeTabs.events.shownTab, {
        detail: {
          tab: this.selected
        }
      });
    }

    this._setFocus = false;
  }

  _onKeyDown(event) {
    const tabs = this._allTabs();
    const foundTab = tabs.find(tab => tab === event.target);

    if (!foundTab) {
      return;
    }

    if (event.altKey) {
      return;
    }

    let newTab;

    switch (event.keyCode) {
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newTab = this._prevTab();
        break;

      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        newTab = this._nextTab();
        break;

      case KEYCODE.HOME:
        newTab = this._firstTab();
        break;

      case KEYCODE.END:
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
      this.warn(`No new tab could be found.`);
    }
  }

  _onClick(event) {
    // Find the clicked tab
    const foundTab = this._allTabs().find(tab => tab === event.currentTarget);

    // If the tab wasn't found in the markup, exit the handler
    if (!foundTab) return;

    // Update the selected index to the clicked tab
    this.selectedIndex = this._getTabIndex(event.currentTarget);
  }

  _getTabIndexFromURL() {
    let urlParams;

    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams

    // @Deprecated in 1.0
    // the "pfe-" prefix has been deprecated but we'll continue to support it
    // we'll give priority to the urlParams.has(`${this.id}`) attribute first
    // and fallback to urlParams.has(`pfe-${this.id}`) if it exists. We should
    // be able to remove the || part of the if statement in the future
    if (CAN_USE_URLSEARCHPARAMS) {
      urlParams = new URLSearchParams(window.location.search);

      const tabsetInUrl = urlParams.has(`${this.id}`) || urlParams.has(`pfe-${this.id}`); // remove this condition when it's no longer used in production

      if (urlParams && tabsetInUrl) {
        let id = urlParams.get(`${this.id}`) || urlParams.get(`pfe-${this.id}`); // remove this condition when it's no longer used in production
        return this._allTabs().findIndex(tab => tab.id === id);
      }
    }

    return -1;
  }

  _popstateEventHandler() {
    const tabIndexFromURL = this._getTabIndexFromURL();

    this._updateHistory = false;
    if (tabIndexFromURL > -1) this.selectedIndex = tabIndexFromURL;
  }
}

PFElement.create(PfeTab);
PFElement.create(PfeTabPanel);
PFElement.create(PfeTabs);

export { PfeTabs as default };
