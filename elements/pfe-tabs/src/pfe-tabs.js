// Import polyfills: find, findIndex
import "./polyfills--pfe-tabs.js";

import PFElement from "../../pfelement/dist/pfelement.js";

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

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeTabs extends PFElement {
  static get tag() {
    return "pfe-tabs";
  }

  get styleUrl() {
    return "pfe-tabs.scss";
  }

  get templateUrl() {
    return "pfe-tabs.html";
  }

  get schemaUrl() {
    return "pfe-tabs.json";
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "pfe-variant", "pfe-tab-history"];
  }

  static get events() {
    return {
      hiddenTab: `${this.tag}:hidden-tab`,
      shownTab: `${this.tag}:shown-tab`
    };
  }

  get selectedIndex() {
    return this.getAttribute("selected-index");
  }

  set selectedIndex(value) {
    this.setAttribute("selected-index", value);
  }

  get tabHistory() {
    return this.hasAttribute("pfe-tab-history");
  }

  constructor() {
    super(PfeTabs);

    this._linked = false;
    this._init = this._init.bind(this);
    this._onClick = this._onClick.bind(this);
    this._linkPanels = this._linkPanels.bind(this);
    this._popstateEventHandler = this._popstateEventHandler.bind(this);
    this._observer = new MutationObserver(this._init);
    this._updateHistory = true;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("click", this._onClick);

    Promise.all([
      customElements.whenDefined(PfeTab.tag),
      customElements.whenDefined(PfeTabPanel.tag)
    ]).then(() => {
      if (this.children.length) {
        this._init();
      }

      this._observer.observe(this, TABS_MUTATION_CONFIG);
    });
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this._allTabs().forEach(tab =>
      tab.removeEventListener("click", this._onClick)
    );
    this._observer.disconnect();

    if (this.tabHistory) {
      window.removeEventListener("popstate", this._popstateEventHandler);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-variant":
        if (this.getAttribute("pfe-variant") === "wind") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("pfe-variant", "wind")
          );
          this._allPanels().forEach(panel =>
            panel.setAttribute("pfe-variant", "wind")
          );
        } else if (this.getAttribute("pfe-variant") === "earth") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("pfe-variant", "earth")
          );
          this._allPanels().forEach(panel =>
            panel.setAttribute("pfe-variant", "earth")
          );
        }
        break;

      case "vertical":
        if (this.hasAttribute("vertical")) {
          this.setAttribute("aria-orientation", "vertical");
          this._allPanels().forEach(panel =>
            panel.setAttribute("vertical", "")
          );
          this._allTabs().forEach(tab => tab.setAttribute("vertical", ""));
        } else {
          this.removeAttribute("aria-orientation");
          this._allPanels().forEach(panel => panel.removeAttribute("vertical"));
          this._allTabs().forEach(tab => tab.removeAttribute("vertical"));
        }
        break;

      case "selected-index":
        Promise.all([
          customElements.whenDefined(PfeTab.tag),
          customElements.whenDefined(PfeTabPanel.tag)
        ]).then(() => {
          this._linkPanels();
          this.selectIndex(newValue);
          this._updateHistory = true;
        });
        break;

      case "pfe-tab-history":
        if (newValue === null) {
          window.removeEventListener("popstate", this._popstateEventHandler);
        } else {
          window.addEventListener("popstate", this._popstateEventHandler);
        }
    }
  }

  select(newTab) {
    if (!newTab) {
      return;
    }

    if (newTab.tagName.toLowerCase() !== "pfe-tab") {
      console.warn(`${PfeTabs.tag}: the tab must be a pfe-tab element`);
      return;
    }

    this.selectedIndex = this._getTabIndex(newTab);
  }

  selectIndex(_index) {
    if (_index === undefined) {
      return;
    }

    const index = parseInt(_index, 10);
    const tabs = this._allTabs();
    const tab = tabs[index];

    if (!tab) {
      console.warn(`${PfeTabs.tag}: tab ${_index} does not exist`);
      return;
    }

    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (
      this.selected &&
      this.tabHistory &&
      this._updateHistory &&
      CAN_USE_URLSEARCHPARAMS
    ) {
      // rebuild the url
      const pathname = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const property = this.id || this.getAttribute("pfe-id");
      const value = tab.id || tab.getAttribute("pfe-id");

      urlParams.set(property, value);
      history.pushState({}, "", `${pathname}?${urlParams.toString()}${hash}`);
    }

    this._selectTab(tab);
  }

  _init(mutationsList) {
    if (this.getAttribute("role") !== "tablist") {
      this.setAttribute("role", "tablist");
    }

    let urlParams;

    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (CAN_USE_URLSEARCHPARAMS) {
      urlParams = new URLSearchParams(window.location.search);
    }

    const tabIndexFromURL = this._getTabIndexFromURL();

    if (tabIndexFromURL > -1) {
      this._setFocus = true;
      this.selectedIndex = tabIndexFromURL;
    } else if (!this.hasAttribute("selected-index")) {
      this.selectedIndex = 0;
    }

    this._linked = false;
    this._linkPanels();

    if (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          [...mutation.addedNodes].forEach(addedNode => {
            if (!addedNode.tagName) {
              return;
            }

            if (
              addedNode.tagName.toLowerCase() === PfeTab.tag ||
              addedNode.tagName.toLowerCase() === PfeTabPanel.tag
            ) {
              if (this.variant.value) {
                addedNode.setAttribute("pfe-variant", this.variant.value);
              }
            }
          });
        }
      }
    }
  }

  _linkPanels() {
    if (this._linked) {
      return;
    }

    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== "pfe-tab-panel") {
        console.warn(
          `${PfeTabs.tag}: tab #${tab.pfeId} is not a sibling of a <pfe-tab-panel>`
        );
        return;
      }

      tab.setAttribute("aria-controls", panel.pfeId);
      panel.setAttribute("aria-labelledby", tab.pfeId);

      tab.addEventListener("click", this._onClick);
    });

    this._linked = true;

    if (window.ShadyCSS) {
      this._observer.observe(this, TABS_MUTATION_CONFIG);
    }
  }

  _allPanels() {
    return [...this.children].filter(child => child.matches("pfe-tab-panel"));
  }

  _allTabs() {
    return [...this.children].filter(child => child.matches("pfe-tab"));
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    return this.querySelector(`[pfe-id="${panelId}"]`);
  }

  _prevTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) - 1;
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
    let newIdx = tabs.findIndex(tab => tab.selected) + 1;
    return tabs[newIdx % tabs.length];
  }

  _getTabIndex(_tab) {
    const tabs = this._allTabs();
    const index = tabs.findIndex(tab => tab.pfeId === _tab.pfeId);
    return index;
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => (tab.selected = false));
    panels.forEach(panel => (panel.hidden = true));
  }

  _selectTab(newTab) {
    this.reset();

    const newPanel = this._panelForTab(newTab);
    let newTabSelected = false;

    if (!newPanel) {
      throw new Error(`No panel with pfeId ${newPanel.pfeId}`);
    }

    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.emitEvent(PfeTabs.events.hiddenTab, {
        detail: {
          tab: this.selected
        }
      });
    }

    newTab.selected = true;
    newPanel.hidden = false;

    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected);

    this.selected = newTab;

    if (newTabSelected) {
      if (this._setFocus) {
        newTab.focus();
      }

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

    this.selectedIndex = this._getTabIndex(newTab);
    this._setFocus = true;
  }

  _onClick(event) {
    const tabs = this._allTabs();
    const foundTab = tabs.find(tab => tab === event.currentTarget);

    if (!foundTab) {
      return;
    }

    this.selectedIndex = this._getTabIndex(event.currentTarget);
  }

  _getTabIndexFromURL() {
    let urlParams;
    let tabIndex = -1;

    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (CAN_USE_URLSEARCHPARAMS) {
      urlParams = new URLSearchParams(window.location.search);

      // @DEPRECATED
      // the "pfe-" prefix has been deprecated but we'll continue to support it
      // we'll give priority to the urlParams.has(`${this.id}`) attribute first
      // and fallback to urlParams.has(`pfe-${this.id}`) if it exists. We should
      // be able to remove the || part of the if statement in the future
      const tabsetInUrl =
        urlParams.has(`${this.id}`) ||
        urlParams.has(this.getAttribute("pfe-id")) ||
        urlParams.has(`pfe-${this.id}`); // remove this condition when it's no longer used in production

      if (urlParams && tabsetInUrl) {
        const id =
          urlParams.get(`${this.id}`) ||
          urlParams.get(this.getAttribute("pfe-id")) ||
          urlParams.get(`pfe-${this.id}`); // remove this condition when it's no longer used in production

        tabIndex = this._allTabs().findIndex(tab => {
          const tabId = tab.id || tab.getAttribute("pfe-id");
          return tabId === id;
        });
      }
    }

    return tabIndex;
  }

  _popstateEventHandler() {
    const tabIndexFromURL = this._getTabIndexFromURL();

    this._updateHistory = false;
    this.selectedIndex = tabIndexFromURL > -1 ? tabIndexFromURL : 0;
  }
}

class PfeTab extends PFElement {
  static get tag() {
    return "pfe-tab";
  }

  get styleUrl() {
    return "pfe-tab.scss";
  }

  get templateUrl() {
    return "pfe-tab.html";
  }

  static get observedAttributes() {
    return ["aria-selected"];
  }

  set selected(value) {
    value = Boolean(value);
    this.setAttribute("aria-selected", value);
  }

  get selected() {
    return this.getAttribute("aria-selected") === "true" ? true : false;
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  constructor() {
    super(PfeTab);

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length || this.textContent.trim().length) {
      this._init();
    }

    this._observer.observe(this, { childList: true });
  }

  attributeChangedCallback() {
    const value = Boolean(this.selected);
    this.setAttribute("tabindex", value ? 0 : -1);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeTab.tag}-${generateId()}`;
    }

    if (this.getAttribute("role") !== "tab") {
      this.setAttribute("role", "tab");
    }

    if (!this.hasAttribute("aria-selected")) {
      this.setAttribute("aria-selected", "false");
    }

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", -1);
    }

    if (this.parentNode.hasAttribute("vertical")) {
      this.setAttribute("vertical", "");
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }
}

class PfeTabPanel extends PFElement {
  static get tag() {
    return "pfe-tab-panel";
  }

  get styleUrl() {
    return "pfe-tab-panel.scss";
  }

  get templateUrl() {
    return "pfe-tab-panel.html";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  constructor() {
    super(PfeTabPanel);

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeTabPanel.tag}-${generateId()}`;
    }

    if (this.getAttribute("role") !== "tabpanel") {
      this.setAttribute("role", "tabpanel");
    }

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }

    if (this.previousElementSibling.getAttribute("aria-selected") !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }
}

PFElement.create(PfeTab);
PFElement.create(PfeTabPanel);
PFElement.create(PfeTabs);

export { PfeTabs as default };
