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
  display: flex; }

:host([vertical]) .tabs {
  flex-direction: column; }

.tabs ::slotted(rh-tab) {
  background-color: var(--rhe-c-rh-tab-BackgroundColor, #1a1a1a);
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  cursor: pointer;
  width: 25%;
  padding: 16px;
  position: relative;
  border-right: 1px solid #8d8d8d;
  white-space: nowrap; }

.tabs ::slotted(rh-tab[selected]) {
  background-color: var(--rhe-c-rh-tab-selected-BackgroundColor, #fff);
  color: var(--rhe-c-rh-tab-selected-Color, #252527);
  border-right-color: transparent; }

:host([vertical]) {
  display: flex; }

:host([vertical]) .tabs {
  margin-right: 16px; }

:host([vertical]) .tabs ::slotted(rh-tab) {
  width: 256px; }

:host([vertical]) .tabs ::slotted(rh-tab) {
  text-transform: none;
  background: none;
  font-weight: normal;
  border: none;
  color: #8d8d8d;
  padding-left: 0;
  padding-right: 0; }

:host([vertical]) .tabs ::slotted(rh-tab[selected]) {
  color: var(--rhe-c-rh-tab-selected-Color, #252527); }</style>
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
  constructor() {
    super("rh-tabs", template);

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

  _onSlotChange() {
    this._linkPanels();
  }

  _linkPanels() {
    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== "rh-tab-panel") {
        console.error(`Tab #${tab.id} is not a sibling of a <rh-tab-panel>`);
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

  _selectTab(newTab) {
    this.reset();

    const newPanel = this._panelForTab(newTab);

    if (!newPanel) {
      throw new Error(`No panel with id ${newPanelId}`);
    }

    newTab.selected = true;
    newPanel.hidden = false;
    newTab.focus();

    const scrollmem = window.scrollY;
    window.location.href = `#${newTab.id}`;
    window.scrollTo(0, scrollmem);
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
    this._selectTab(newTab);
  }

  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") {
      return;
    }

    this._selectTab(event.target);
  }
}

window.customElements.define("rh-tabs", RhTabs);

const tabTemplate = document.createElement("template");
tabTemplate.innerHTML = `
  <style>
    :host {
  display: block; }

.indicator {
  height: 4px;
  width: 24px;
  background-color: #8d8d8d;
  position: absolute;
  bottom: 8px; }

:host(:hover) .indicator,
:host([selected]:hover) .indicator {
  background-color: var(--rhe-c-tab__indicator--hover--BackgroundColor, #2b9af3); }

:host([selected]) .indicator {
  background-color: var(--rhe-c-tab__indicator--selected--BackgroundColor, #06c); }

:host([vertical]) .indicator {
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #ededed; }

:host([selected][vertical]) .indicator {
  background-color: var(--rhe-c-tab__indicator--selected--BackgroundColor, #06c); }

  </style>
  <slot></slot>
<div class="indicator"></div>
`;

class RhTab extends Rhelement {
  static get observedAttributes() {
    return ["selected"];
  }

  constructor() {
    super("rh-tab", tabTemplate);
  }

  connectedCallback() {
    this.setAttribute("role", "tab");

    if (!this.id) {
      this.id = `rh-tab-${generateId()}`;
    }

    this.setAttribute("aria-selected", "false");
    this.setAttribute("tabindex", -1);

    if (this.parentNode.hasAttribute("vertical")) {
      this.setAttribute("vertical", "");
    }
  }

  attributeChangedCallback() {
    const value = this.hasAttribute("selected");
    this.setAttribute("aria-selected", value);
    this.setAttribute("tabindex", value ? 0 : -1);
  }

  set selected(value) {
    value = Boolean(value);

    if (value) {
      this.setAttribute("selected", "");
    } else {
      this.removeAttribute("selected");
    }
  }

  get selected() {
    return this.hasAttribute("selected");
  }

  show() {
    this.parentNode._selectTab(this);
  }
}

window.customElements.define("rh-tab", RhTab);

class RhTabPanel extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "tabpanel");

    if (!this.id) {
      this.id = `rh-tab-panel-${generateId()}`;
    }
  }
}

window.customElements.define("rh-tab-panel", RhTabPanel);
