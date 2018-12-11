import RHElement from "../rhelement/rhelement.js";

/*
 * Copyright 2018 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

class RhTabs extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }

.tabs {
  --rh-tabs--border-color:          var(--rh-theme--color--surface--border, #dfdfdf);
  display: flex;
  border: 0;
  border-bottom: var(--rh-theme--ui--border-width, 1px) var(--rh-theme--ui--border-style, solid) var(--rh-tabs--border-color); }

.panels {
  padding: 0;
  padding-top: var(--rh-theme--container-padding, 1rem); }

:host([vertical]) {
  display: flex; }

:host([vertical]) .tabs {
  flex-direction: column;
  width: 25%;
  border: 0;
  border-right: var(--rh-theme--ui--border-width, 1px) var(--rh-theme--ui--border-style, solid) var(--rh-tabs--border-color); }

:host([vertical]) .tabs ::slotted(rh-tab) {
  margin: 0 -1px 0 0;
  border: var(--rh-theme--ui--border-width, 1px) var(--rh-theme--ui--border-style, solid) transparent;
  border-right: 0; }

:host([vertical]) .tabs ::slotted(rh-tab[aria-selected="true"]) {
  border-color: var(--rh-tabs--border-color);
  border-right: 0; }

:host([vertical]) .panels {
  padding: 0;
  padding-right: var(--rh-theme--container-padding, 1rem);
  padding-left: calc(var(--rh-theme--container-padding, 1rem) * 2); }

:host([rh-variant="primary"]) .tabs {
  border-bottom: transparent;
  border-right: transparent;
  justify-content: space-between; }

:host([vertical][rh-variant="primary"]) {
  align-items: flex-start; }

:host([rh-variant="secondary"]) .tabs {
  border-bottom: transparent;
  justify-content: space-between; }
</style>
<slot></slot>`;
  }

  static get tag() {
    return "rh-tabs";
  }

  get styleUrl() {
    return "rh-tabs.scss";
  }

  get templateUrl() {
    return "rh-tabs.html";
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "rh-variant"];
  }

  get selectedIndex() {
    return this.getAttribute("selected-index");
  }

  set selectedIndex(value) {
    this.setAttribute("selected-index", value);
  }

  constructor() {
    super(RhTabs);

    this._linked = false;

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

    if (!this.hasAttribute("selected-index")) {
      this.selectedIndex = 0;
    }

    Promise.all([
      customElements.whenDefined(RhTab.tag),
      customElements.whenDefined(RhTabPanel.tag)
    ]).then(() => this._linkPanels());
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "rh-variant":
        if (this.getAttribute("rh-variant") === "primary") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("rh-variant", "primary")
          );
        } else if (this.getAttribute("rh-variant") === "secondary") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("rh-variant", "secondary")
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
          customElements.whenDefined(RhTab.tag),
          customElements.whenDefined(RhTabPanel.tag)
        ]).then(() => {
          this._linkPanels();
          this.selectIndex(newValue);
        });
    }
  }

  select(newTab) {
    if (!newTab) {
      return;
    }

    if (newTab.tagName.toLowerCase() !== "rh-tab") {
      console.warn(`${RhTabs.tag}: the tab must be a rh-tab element`);
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
      console.warn(`${RhTabs.tag}: tab ${_index} does not exist`);
      return;
    }

    this._selectTab(tab);
  }

  _onSlotChange() {
    this._linked = false;
    this._linkPanels();
  }

  _linkPanels() {
    if (this._linked) {
      return;
    }

    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== "rh-tab-panel") {
        console.warn(
          `${RhTabs.tag}: tab #${tab.id} is not a sibling of a <rh-tab-panel>`
        );
        return;
      }

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    this._linked = true;
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

  _getTabIndex(_tab) {
    const tabs = this._allTabs();
    const index = tabs.findIndex(tab => tab.id === _tab.id);
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
      throw new Error(`No panel with id ${newPanel.id}`);
    }

    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.dispatchEvent(
        new CustomEvent(`${RhTabs.tag}:hidden-tab`, {
          bubbles: true,
          detail: {
            tab: this.selected
          }
        })
      );
    }

    newTab.selected = true;
    newPanel.hidden = false;

    if (this._setFocus) {
      newTab.focus();
      this._setFocus = false;
    }

    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected);

    this.selected = newTab;

    if (newTabSelected) {
      this.dispatchEvent(
        new CustomEvent(`${RhTabs.tag}:shown-tab`, {
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

    this.selectedIndex = this._getTabIndex(newTab);
    this._setFocus = true;
  }

  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") {
      return;
    }

    this.selectedIndex = this._getTabIndex(event.target);
  }
}

class RhTab extends RHElement {
  get html() {
    return `
<style>
:host {
  --rh-tabs--main:         transparent;
  --rh-tabs--aux:          var(--rh-theme--color--surface--lightest--text, #333);
  --rh-tabs--link:         var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-tabs--focus:        var(--rh-theme--color--surface--lightest--link--focus, #003366);
  position: relative;
  display: block;
  margin: 0 0 -1px;
  padding-top: var(--rh-theme--container-padding, 1rem);
  padding-right: calc(var(--rh-theme--container-padding, 1rem) * 3.375);
  padding-bottom: calc(var(--rh-theme--container-padding, 1rem) * 1.5);
  padding-left: var(--rh-theme--container-padding, 1rem);
  border: var(--rh-theme--ui--border-width, 1px) var(--rh-theme--ui--border-style, solid) transparent;
  border-bottom: 0;
  background-color: var(--rh-tabs--main);
  color: var(--rh-tabs--aux);
  text-transform: var(--rh-tabs__tab--TextTransform, none);
  font-weight: var(--rh-theme--font-weight--normal, 500);
  white-space: nowrap;
  cursor: pointer; }

:host([aria-selected="true"]) {
  --rh-tabs--main:         var(--rh-theme--color--surface--lightest, #fff);
  border-color: var(--rh-theme--color--surface--border, #dfdfdf);
  border-bottom: 0; }

.indicator {
  position: absolute;
  bottom: 12px;
  left: auto;
  display: var(--rh-tabs__indicator--Display, block);
  height: var(--rh-tabs__indicator--Height, 4px);
  width: var(--rh-tabs__indicator--Width, 22px);
  background-color: var(--rh-theme--color--surface--border--darkest, #464646); }

:host(:hover) .indicator {
  background-color: var(--rh-tabs--link); }

:host([aria-selected="true"]) .indicator,
:host([aria-selected="true"]:hover) .indicator {
  background-color: var(--rh-tabs--link); }

:host(:focus),
:host(:focus-visible) {
  outline: var(--rh-theme--ui--focus-outline-width, 1px) var(--rh-theme--ui--focus-outline-style, solid) var(--rh-tabs--focus); }

:host([rh-variant="primary"]) {
  text-align: center;
  padding: 0 5px 16px; }
  :host([rh-variant="primary"]) .indicator {
    width: 100%;
    left: 0; }

:host([rh-variant="primary"][aria-selected="true"]) {
  border: transparent; }

:host([rh-variant="primary"][aria-selected="false"]) {
  border: transparent; }
  :host([rh-variant="primary"][aria-selected="false"]) .indicator {
    display: none; }

:host([rh-variant="secondary"]) {
  text-align: center;
  padding: 10px 44px;
  border: 1px solid #252527; }
  :host([rh-variant="secondary"]) .indicator {
    position: absolute;
    display: block;
    bottom: -15px;
    width: 0;
    height: 0; }

:host([vertical][rh-variant="primary"]) {
  text-align: right;
  padding-right: 16px; }
  :host([vertical][rh-variant="primary"]) .indicator {
    left: auto;
    right: 0;
    top: 0;
    display: var(--rh-tabs__indicator--Display, block);
    height: var(--rh-tabs__indicator--Height, 22px);
    width: var(--rh-tabs__indicator--Width, 4px); }

:host([vertical][rh-variant="primary"][aria-selected="true"]) {
  border: transparent !important; }

:host([rh-variant="secondary"][aria-selected="true"]) {
  background-color: #252527;
  color: #ffffff; }
  :host([rh-variant="secondary"][aria-selected="true"]) .indicator {
    border-left: var(--rh-theme--container-spacer, 1rem) solid transparent;
    border-right: var(--rh-theme--container-spacer, 1rem) solid transparent;
    border-top: var(--rh-theme--container-spacer, 1rem) solid #252527;
    background-color: transparent; }

:host([rh-variant="secondary"][aria-selected="false"]) {
  color: #0477a4; }

:host([rh-variant="secondary"]:hover) {
  background-color: #252527;
  color: #ffffff; }
</style>
<slot></slot>
<div class="indicator"></div>`;
  }

  static get tag() {
    return "rh-tab";
  }

  get styleUrl() {
    return "rh-tab.scss";
  }

  get templateUrl() {
    return "rh-tab.html";
  }

  static get observedAttributes() {
    return ["aria-selected"];
  }

  constructor() {
    super(RhTab);

    if (!this.id) {
      this.id = `${RhTab.tag}-${generateId()}`;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tab");
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
}

class RhTabPanel extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }

:host([hidden]) {
  display: none; }
</style>
<slot></slot>`;
  }

  static get tag() {
    return "rh-tab-panel";
  }

  get styleUrl() {
    return "rh-tab-panel.scss";
  }

  get templateUrl() {
    return "rh-tab-panel.html";
  }

  constructor() {
    super(RhTabPanel);

    if (!this.id) {
      this.id = `${RhTabPanel.tag}-${generateId()}`;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tabpanel");
    this.setAttribute("tabindex", 0);
  }
}

class RhTabsGroup extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }
</style>
<div class="tabs">
  <slot name="header"></slot>
</div>
<div class="panels">
  <slot></slot>
</div>`;
  }

  static get tag() {
    return "rh-tabs-group";
  }

  get styleUrl() {
    return "rh-tabs-group.scss";
  }

  get templateUrl() {
    return "rh-tabs-group.html";
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "rh-variant"];
  }

  get selectedIndex() {
    return this.getAttribute("selected-index");
  }

  set selectedIndex(value) {
    this.setAttribute("selected-index", value);
  }

  constructor() {
    super(RhTabsGroup);

    this._linked = false;

    this._onSlotChange = this._onSlotChange.bind(this);

    this._tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name="panel"]');
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("click", this._onClick);

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "tablist");
    }

    if (!this.hasAttribute("selected-index")) {
      this.selectedIndex = 0;
    }

    Promise.all([
      customElements.whenDefined(RhTab.tag),
      customElements.whenDefined(RhTabPanel.tag)
    ]).then(() => this._linkPanels());
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "rh-variant":
        if (this.getAttribute("rh-variant") === "primary") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("rh-variant", "primary")
          );
        } else if (this.getAttribute("rh-variant") === "secondary") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("rh-variant", "secondary")
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
          customElements.whenDefined(RhTab.tag),
          customElements.whenDefined(RhTabPanel.tag)
        ]).then(() => {
          this._linkPanels();
          this.selectIndex(newValue);
        });
    }
  }

  select(newTab) {
    if (!newTab) {
      return;
    }

    if (newTab.tagName.toLowerCase() !== "rh-tab") {
      console.warn(`${RhTabs.tag}: the tab must be a rh-tab element`);
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
      console.warn(`${RhTabs.tag}: tab ${_index} does not exist`);
      return;
    }

    this._selectTab(tab);
  }

  _onSlotChange() {
    this._linked = false;
    this._linkPanels();
  }

  _linkPanels() {
    if (this._linked) {
      return;
    }

    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== "rh-tab-panel") {
        console.warn(
          `${RhTabs.tag}: tab #${tab.id} is not a sibling of a <rh-tab-panel>`
        );
        return;
      }

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    this._linked = true;
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

  _getTabIndex(_tab) {
    const tabs = this._allTabs();
    const index = tabs.findIndex(tab => tab.id === _tab.id);
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
      throw new Error(`No panel with id ${newPanel.id}`);
    }

    if (this.selected && this.selected !== newTab) {
      newTabSelected = true;

      this.dispatchEvent(
        new CustomEvent(`${RhTabs.tag}:hidden-tab`, {
          bubbles: true,
          detail: {
            tab: this.selected
          }
        })
      );
    }

    newTab.selected = true;
    newPanel.hidden = false;

    if (this._setFocus) {
      newTab.focus();
      this._setFocus = false;
    }

    const tabs = this._allTabs();
    const newIdx = tabs.findIndex(tab => tab.selected);

    this.selected = newTab;

    if (newTabSelected) {
      this.dispatchEvent(
        new CustomEvent(`${RhTabs.tag}:shown-tab`, {
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

    this.selectedIndex = this._getTabIndex(newTab);
    this._setFocus = true;
  }

  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") {
      return;
    }

    this.selectedIndex = this._getTabIndex(event.target);
  }
}
RHElement.create(RhTab);
RHElement.create(RhTabPanel);
RHElement.create(RhTabs);
RHElement.create(RhTabsGroup);
//# sourceMappingURL=rh-tabs.js.map
