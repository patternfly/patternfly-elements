import Rhelement from "../rhelement/rhelement.js";

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-tabs.html and css from
 * rh-tabs.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: block; }

.tabs {
  display: flex;
  background-color: var(--rhe-c-tabs__tabs--BackgroundColor, transparent);
  border-top: var(--rhe-c-tabs__tabs--BorderTop, 0);
  border-right: var(--rhe-c-tabs__tabs--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__tabs--BorderBottom, 1px solid #ccc);
  border-left: var(--rhe-c-tabs__tabs--BorderLeft, 0); }

.panels {
  padding-top: var(--rhe-c-tabs__panel--PaddingTop, 1rem);
  padding-right: var(--rhe-c-tabs__panel--PaddingTop, 0);
  padding-bottom: var(--rhe-c-tabs__panel--PaddingTop, 0);
  padding-left: var(--rhe-c-tabs__panel--PaddingTop, 0); }

:host([vertical]) {
  display: flex; }

:host([vertical]) .tabs {
  flex-direction: column;
  width: var(--rhe-c-tabs__tabs--vertical--Width, 25%);
  background-color: var(--rhe-c-tabs__tabs--vertical--BackgroundColor, transparent);
  border-top: var(--rhe-c-tabs__tabs--vertical--BorderTop, 0);
  border-right: var(--rhe-c-tabs__tabs--vertical--BorderRight, 1px solid #ccc);
  border-bottom: var(--rhe-c-tabs__tabs--vertical--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__tabs--vertical--BorderLeft, 0); }

:host([vertical]) .tabs ::slotted(rh-tab) {
  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid transparent);
  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 1px solid transparent);
  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid transparent); }

:host([vertical]) .tabs ::slotted(rh-tab[aria-selected="true"]) {
  padding-top: var(--rhe-c-tabs__tab--selected--PaddingTop, 14px);
  padding-right: var(--rhe-c-tabs__tab--selected--PaddingTop, 55px);
  padding-bottom: var(--rhe-c-tabs__tab--selected--PaddingTop, 24px);
  padding-left: var(--rhe-c-tabs__tab--selected--PaddingTop, 15px);
  margin-top: var(--rhe-c-tabs__tab--selected--MarginTop, 0);
  margin-right: var(--rhe-c-tabs__tab--selected--MarginRight, -1px);
  margin-bottom: var(--rhe-c-tabs__tab--selected--MarginBottom, 0);
  margin-left: var(--rhe-c-tabs__tab--selected--MarginLeft, 0);
  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid #ccc);
  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 1px solid #ccc);
  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid #ccc); }

:host([vertical]) .panels {
  padding-top: var(--rhe-c-tabs__panel-vertical--PaddingTop, 0);
  padding-right: var(--rhe-c-tabs__panel-vertical--PaddingTop, 1rem);
  padding-bottom: var(--rhe-c-tabs__panel-vertical--PaddingTop, 0);
  padding-left: var(--rhe-c-tabs__panel-vertical--PaddingTop, 2rem); }

:host([type="subtabs"]) .tabs ::slotted(rh-tab) {
  padding-top: var(--rhe-c-subtabs__tab--PaddingTop, 6px);
  padding-right: var(--rhe-c-subtabs__tab--PaddingTop, 0);
  padding-bottom: var(--rhe-c-subtabs__tab--PaddingTop, 24px);
  padding-left: var(--rhe-c-subtabs__tab--PaddingTop, 0);
  margin: 0;
  border: 0; }

:host([type="subtabs"]) rh-tab .indicator {
  bottom: var(--rhe-c-tabs__indicator--hover--Bottom, 12px); }</style>
<div class="tabs">
  <slot name="tab"></slot>
</div>
<div class="panels">
  <slot name="panel"></slot>
</div>
`;
/* end DO NOT EDIT */

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35
};

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class RhTabs extends Rhelement {
  static get is() {
    return "rh-tabs";
  }

  static get observedAttributes() {
    return ["vertical"];
  }

  constructor() {
    super(RhTabs.is, template);

    this._onSlotChange = this._onSlotChange.bind(this);

    this._tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name="panel"]');

    this._tabSlot.addEventListener("slotchange", this._onSlotChange);
    this._panelSlot.addEventListener("slotchange", this._onSlotChange);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("click", this._onClick);

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "tablist");
    }

    Promise.all([
      customElements.whenDefined("rh-tab"),
      customElements.whenDefined("rh-tab-panel")
    ]).then(() => this._linkPanels());
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback() {
    if (this.hasAttribute("vertical")) {
      this.setAttribute("aria-orientation", "vertical");
    } else {
      this.removeAttribute("aria-orientation");
    }
  }

  select(newTab) {
    if (!newTab) {
      return;
    }

    if (newTab.tagName.toLowerCase() !== "rh-tab") {
      console.warn(`${RhTabs.is}: the tab must be a rh-tab element`);
      return;
    }

    this._selectTab(newTab);
  }

  selectIndex(_index) {
    if (_index === null) {
      return;
    }

    const index = parseInt(_index, 10);
    const tabs = this._allTabs();
    const tab = tabs[index];

    if (!tab) {
      console.warn(`${RhTabs.is}: tab ${_index} does not exist`);
      return;
    }

    this._selectTab(tab);
  }

  _onSlotChange() {
    this._linkPanels();
  }

  _linkPanels() {
    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== "rh-tab-panel") {
        console.warn(
          `${RhTabs.is}: tab #${tab.id} is not a sibling of a <rh-tab-panel>`
        );
        return;
      }

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    const selectedTab = tabs.find(tab => tab.selected) || tabs[0];

    this._selectTab(selectedTab);
  }

  _allPanels() {
    return [...this.querySelectorAll("rh-tab-panel")];
  }

  _allTabs() {
    return [...this.querySelectorAll("rh-tab")];
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    return this.querySelector(`#${panelId}`);
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

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => (tab.selected = false));
    panels.forEach(panel => (panel.hidden = true));
  }

  _selectTab(newTab, setFocus = false) {
    this.reset();

    const newPanel = this._panelForTab(newTab);
    let newTabSelected = false;

    if (!newPanel) {
      throw new Error(`No panel with id ${newPanel.id}`);
    }

    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.dispatchEvent(
        new CustomEvent(`${RhTabs.is}:hidden-tab`, {
          bubbles: true,
          detail: {
            tab: this.selected
          }
        })
      );
    }

    newTab.selected = true;
    newPanel.hidden = false;

    if (setFocus) {
      newTab.focus();
    }

    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected);

    this.selected = newTab;
    this.selectedIndex = newIdx;

    if (newTabSelected) {
      this.dispatchEvent(
        new CustomEvent(`${RhTabs.is}:shown-tab`, {
          bubbles: true,
          detail: {
            tab: this.selected
          }
        })
      );
    }
  }

  _onKeyDown(event) {
    if (event.target.getAttribute("role") !== "tab") {
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
    this._selectTab(newTab, true);
  }

  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") {
      return;
    }

    this._selectTab(event.target);
  }
}

window.customElements.define(RhTabs.is, RhTabs);

const tabTemplate = document.createElement("template");
tabTemplate.innerHTML = `
  <style>
    :host {
  position: relative;
  display: block;
  padding-top: var(--rhe-c-tabs__tab--PaddingTop, 14px);
  padding-right: var(--rhe-c-tabs__tab--PaddingTop, 54px);
  padding-bottom: var(--rhe-c-tabs__tab--PaddingTop, 24px);
  padding-left: var(--rhe-c-tabs__tab--PaddingTop, 15px);
  margin-top: var(--rhe-c-tabs__tab--MarginTop, 0);
  margin-right: var(--rhe-c-tabs__tab--MarginRight, 0);
  margin-bottom: var(--rhe-c-tabs__tab--MarginBottom, 0);
  margin-left: var(--rhe-c-tabs__tab--MarginLeft, 0);
  border-top: var(--rhe-c-tabs__tab--BorderTop, 1px solid transparent);
  border-right: var(--rhe-c-tabs__tab--BorderRight, 1px solid transparent);
  border-bottom: var(--rhe-c-tabs__tab--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__tab--BorderLeft, 1px solid transparent);
  background-color: var(--rhe-c-tabs__tab--BackgroundColor, transparent);
  text-transform: var(--rhe-c-tabs__tab--TextTransform, none);
  font-weight: var(--rhe-c-tabs__tab--FontWeight, normal);
  color: var(--rhe-c-tabs__tab--Color, #333);
  white-space: nowrap;
  cursor: pointer; }

:host([aria-selected="true"]) {
  padding-top: var(--rhe-c-tabs__tab--selected--PaddingTop, 14px);
  padding-right: var(--rhe-c-tabs__tab--selected--PaddingTop, 54px);
  padding-bottom: var(--rhe-c-tabs__tab--selected--PaddingTop, 25px);
  padding-left: var(--rhe-c-tabs__tab--selected--PaddingTop, 15px);
  margin-top: var(--rhe-c-tabs__tab--selected--MarginTop, 0);
  margin-right: var(--rhe-c-tabs__tab--selected--MarginRight, 0);
  margin-bottom: var(--rhe-c-tabs__tab--selected--MarginBottom, -1px);
  margin-left: var(--rhe-c-tabs__tab--selected--MarginLeft, 0);
  border-top: var(--rhe-c-tabs__tab--selected--BorderTop, 1px solid #ccc);
  border-right: var(--rhe-c-tabs__tab--selected--BorderRight, 1px solid #ccc);
  border-bottom: var(--rhe-c-tabs__tab--selected--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__tab--selected--BorderLeft, 1px solid #ccc);
  background-color: var(--rhe-c-tabs__tab--selected--BackgroundColor, #fff);
  text-transform: var(--rhe-c-tabs__tab--selected--TextTransform, none);
  font-weight: var(--rhe-c-tabs__tab--selected--FontWeight, normal);
  color: var(--rhe-c-tabs__tab--selected--Color, #333); }

.indicator {
  display: var(--rhe-c-tabs__indicator--Display, block);
  position: absolute;
  top: var(--rhe-c-tabs__indicator--Top, auto);
  right: var(--rhe-c-tabs__indicator--Right, auto);
  bottom: var(--rhe-c-tabs__indicator--Bottom, 12px);
  left: var(--rhe-c-tabs__indicator--Left, auto);
  height: var(--rhe-c-tabs__indicator--Height, 4px);
  width: var(--rhe-c-tabs__indicator--Width, 22px);
  background-color: var(----rhe-c-tabs__indicator--BackgroundColor, #828282);
  border-top: var(--rhe-c-tabs__indicator--BorderTop, 0);
  border-right: var(--rhe-c-tabs__indicator--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__indicator--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__indicator--BorderLeft, 0); }

:host(:hover) .indicator {
  display: var(--rhe-c-tabs__indicator--hover--Display, block);
  top: var(--rhe-c-tabs__indicator--hover--Top, auto);
  right: var(--rhe-c-tabs__indicator--hover--Right, auto);
  bottom: var(--rhe-c-tabs__indicator--hover--Bottom, 12px);
  left: var(--rhe-c-tabs__indicator--hover--Left, auto);
  height: var(--rhe-c-tabs__indicator--hover--Height, 4px);
  width: var(--rhe-c-tabs__indicator--hover--Width, 22px);
  background-color: var(--rhe-c-tabs__indicator--hover--BackgroundColor, #2b9af3);
  border-top: var(--rhe-c-tabs__indicator--hover--BorderTop, 0);
  border-right: var(--rhe-c-tabs__indicator--hover--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__indicator--hover--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__indicator--hover--BorderLeft, 0); }

:host(:focus) {
  outline: var(--rhe-c-tabs__tab--focus--Outline, 2px solid #2b9af3); }

:host([aria-selected="true"]) .indicator,
:host([aria-selected="true"]:hover) .indicator {
  display: var(--rhe-c-tabs__indicator--selected--Display, block);
  top: var(--rhe-c-tabs__indicator--selected--Top, auto);
  right: var(--rhe-c-tabs__indicator--selected--Right, auto);
  bottom: var(--rhe-c-tabs__indicator--selected--Bottom, 13px);
  left: var(--rhe-c-tabs__indicator--selected--Left, auto);
  height: var(--rhe-c-tabs__indicator--selected--Height, 4px);
  width: var(--rhe-c-tabs__indicator--selected--Width, 22px);
  background-color: var(--rhe-c-tabs__indicator--selected--BackgroundColor, #06c);
  border-top: var(--rhe-c-tabs__indicator--selected--BorderTop, #828282);
  border-right: var(--rhe-c-tabs__indicator--selected--BorderRight, #828282);
  border-bottom: var(--rhe-c-tabs__indicator--selected--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__indicator--selected--BorderLeft, #828282); }

:host([vertical]) .indicator {
  top: var(--rhe-c-tabs__indicator--vertical--Top, auto);
  right: var(--rhe-c-tabs__indicator--vertical--Right, auto);
  bottom: var(--rhe-c-tabs__indicator--vertical--Bottom, 13px);
  left: var(--rhe-c-tabs__indicator--vertical--Left, auto);
  height: var(--rhe-c-tabs__indicator--vertical--Height, 4px);
  width: var(--rhe-c-tabs__indicator--vertical--Width, 22px);
  background-color: var(----rhe-c-tabs__indicator--vertical--BackgroundColor, #828282);
  border-top: var(--rhe-c-tabs__indicator--vertical--BorderTop, 0);
  border-right: var(--rhe-c-tabs__indicator--vertical--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__indicator--vertical--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__indicator--vertical--BorderLeft, 0); }

:host([aria-selected="true"][vertical]) .indicator {
  display: var(--rhe-c-tabs__indicator--vertical--selected--Display, block);
  top: var(--rhe-c-tabs__indicator--vertical--selected--Top, auto);
  right: var(--rhe-c-tabs__indicator--vertical--selected--Right, auto);
  bottom: var(--rhe-c-tabs__indicator--vertical--selected--Bottom, 13px);
  left: var(--rhe-c-tabs__indicator--vertical--selected--Left, auto);
  height: var(--rhe-c-tabs__indicator--vertical--selected--Height, 4px);
  width: var(--rhe-c-tabs__indicator--vertical--selected--Width, 22px);
  background-color: var(--rhe-c-tabs__indicator--vertical--selected--BackgroundColor, #06c);
  border-top: var(--rhe-c-tabs__indicator--vertical--selected--BorderTop, 0);
  border-right: var(--rhe-c-tabs__indicator--vertical--selected--BorderRight, 0);
  border-bottom: var(--rhe-c-tabs__indicator--vertical--selected--BorderBottom, 0);
  border-left: var(--rhe-c-tabs__indicator--vertical--selected--BorderLeft, 0); }

  </style>
  <slot></slot>
<div class="indicator"></div>
`;

class RhTab extends Rhelement {
  static get is() {
    return "rh-tab";
  }

  static get observedAttributes() {
    return ["aria-selected"];
  }

  constructor() {
    super(RhTab.is, tabTemplate);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tab");

    if (!this.id) {
      this.id = `${RhTab.is}-${generateId()}`;
    }

    this.setAttribute("aria-selected", "false");
    this.setAttribute("tabindex", -1);

    if (this.parentNode.hasAttribute("vertical")) {
      this.setAttribute("vertical", "");
    }
  }

  attributeChangedCallback() {
    const value = Boolean(this.selected);
    this.setAttribute("tabindex", value ? 0 : -1);
  }

  set selected(value) {
    value = Boolean(value);
    this.setAttribute("aria-selected", value);
  }

  get selected() {
    return this.getAttribute("aria-selected") === "true" ? true : false;
  }

  show() {
    this.parentNode._selectTab(this);
  }
}

window.customElements.define(RhTab.is, RhTab);

const tabPanelTemplate = document.createElement("template");
tabPanelTemplate.innerHTML = `
  <style>
    :host {
  display: block; }

:host([hidden]) {
  display: none; }

  </style>
  <slot></slot>
`;

class RhTabPanel extends Rhelement {
  static get is() {
    return "rh-tab-panel";
  }

  constructor() {
    super(RhTabPanel.is, tabPanelTemplate);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tabpanel");
    this.setAttribute("tabindex", 0);

    if (!this.id) {
      this.id = `${RhTabPanel.is}-${generateId()}`;
    }
  }
}

window.customElements.define(RhTabPanel.is, RhTabPanel);
