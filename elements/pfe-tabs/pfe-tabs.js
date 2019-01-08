import PFElement from "../pfelement/pfelement.js";

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

class PfeTabs extends PFElement {
  get html() {
    return `
<style>
:host {
  display: block; }

.tabs {
  --pfe-tabs--border-color:          var(--pfe-theme--color--surface--border, #dfdfdf);
  display: flex;
  border: 0;
  border-bottom: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--border-color); }

.panels {
  padding: 0; }

:host([vertical]) {
  display: flex; }

:host([vertical]) .tabs {
  flex-direction: column;
  width: 25%;
  border: 0;
  border-right: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--border-color); }

:host([vertical]) .tabs ::slotted(pfe-tab) {
  margin: 0 -1px 0 0;
  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;
  border-right: 0;
  position: relative; }

:host([vertical]) .tabs ::slotted(pfe-tab[aria-selected="true"]) {
  border-color: var(--pfe-tabs--border-color);
  border-right: 0; }

:host([vertical]) .panels {
  padding: 0;
  padding-right: var(--pfe-theme--container-padding, 1rem);
  padding-left: calc(var(--pfe-theme--container-padding, 1rem) * 2); }
</style>
<div class="tabs">
  <slot name="tab"></slot>
</div>
<div class="panels">
  <slot name="panel"></slot>
</div>`;
  }

  static get tag() {
    return "pfe-tabs";
  }

  get styleUrl() {
    return "pfe-tabs.scss";
  }

  get templateUrl() {
    return "pfe-tabs.html";
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "pfe-variant", "color"];
  }

  get selectedIndex() {
    return this.getAttribute("selected-index");
  }

  set selectedIndex(value) {
    this.setAttribute("selected-index", value);
  }

  constructor() {
    super(PfeTabs);

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

  parentChildHandoff(attributeName, attributeValue) {
    this._allTabs().forEach(tab =>
      tab.setAttribute(attributeName, attributeValue)
    );
    this._allPanels().forEach(panel =>
      panel.setAttribute(attributeName, attributeValue)
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == "color" || attr == "pfe-variant") {
      var attributeValue = this.getAttribute(attr);
      this.parentChildHandoff(attr, attributeValue);
    } else {
      switch (attr) {
        // get values of attribute set on parent, pass onto tab & panel via parentChildHandoff()
        //case "color":
        //  var attributeValue = this.getAttribute( attr )
        //  this.parentChildHandoff( attr, attributeValue );
        //break;
        //case "pfe-variant":
        //  var attributeValue = this.getAttribute( attr )
        //  this.parentChildHandoff( attr, attributeValue );
        //break;

        case "vertical":
          if (this.hasAttribute("vertical")) {
            this.setAttribute("aria-orientation", "vertical");
            this._allPanels().forEach(panel =>
              panel.setAttribute("vertical", "")
            );
            this._allTabs().forEach(tab => tab.setAttribute("vertical", ""));
          } else {
            this.removeAttribute("aria-orientation");
            this._allPanels().forEach(panel =>
              panel.removeAttribute("vertical")
            );
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
      if (panel.tagName.toLowerCase() !== "pfe-tab-panel") {
        console.warn(
          `${PfeTabs.tag}: tab #${tab.id} is not a sibling of a <pfe-tab-panel>`
        );
        return;
      }

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    this._linked = true;
  }

  _allPanels() {
    return [...this.querySelectorAll("pfe-tab-panel")];
  }

  _allTabs() {
    return [...this.querySelectorAll("pfe-tab")];
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
        new CustomEvent(`${PfeTabs.tag}:hidden-tab`, {
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
        new CustomEvent(`${PfeTabs.tag}:shown-tab`, {
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

class RhTab extends PFElement {
  get html() {
    return `
<style>
:host {
  --pfe-tabs--main:         transparent;
  --pfe-tabs--aux:          var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-tabs--link:         var(--pfe-theme--color--surface--lightest--link, #06c);
  --pfe-tabs--focus:        var(--pfe-theme--color--surface--lightest--link--focus, #003366);
  position: relative;
  display: block;
  margin: 0 0 -1px;
  padding-top: var(--pfe-theme--container-padding, 1rem);
  padding-right: calc(var(--pfe-theme--container-padding, 1rem) * 3.375);
  padding-bottom: var(--pfe-theme--container-padding, 1rem);
  padding-left: var(--pfe-theme--container-padding, 1rem);
  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;
  background-color: var(--pfe-tabs--main);
  color: var(--pfe-tabs--aux);
  text-transform: var(--pfe-tabs__tab--TextTransform, none);
  font-weight: var(--pfe-theme--font-weight--normal, 500);
  white-space: nowrap;
  cursor: pointer; }

::slotted(*) {
  padding-bottom: calc(var(--pfe-theme--container-padding, 1rem) * 1.5); }

:host([aria-selected="true"]) {
  --pfe-tabs--main: var(--pfe-theme--color--surface--lightest, #fff);
  border: var(--pfe-theme--color--surface--border, #dfdfdf) solid 1px;
  border-bottom-color: transparent;
  z-index: 1; }

:host([aria-selected="false"]) {
  --pfe-tabs--main: var(--pfe-theme--color--surface--lightest, #fff);
  border-color: transparent;
  border-bottom-color: var(--pfe-theme--color--surface--border, #dfdfdf); }

.indicator {
  left: auto;
  display: var(--pfe-tabs__indicator--Display, block);
  height: var(--pfe-tabs__indicator--Height, 4px);
  width: var(--pfe-tabs__indicator--Width, 22px);
  background-color: var(--pfe-theme--color--surface--border--darkest, #464646); }

:host(:hover) .indicator {
  background-color: var(--pfe-tabs--link); }

:host([aria-selected="true"]) .indicator,
:host([aria-selected="true"]:hover) .indicator {
  background-color: var(--pfe-tabs--link); }

:host(:focus),
:host(:focus-visible) {
  outline: var(--pfe-theme--ui--focus-outline-width, 1px) var(--pfe-theme--ui--focus-outline-style, solid) var(--pfe-tabs--focus); }

:host([pfe-variant="primary"]) {
  background-color: transparent;
  text-align: center;
  padding: 0 calc(var(--pfe-theme--container-padding, 1rem) / 3) var(--pfe-theme--container-padding, 1rem);
  margin-right: 2%;
  border-color: transparent; }
  :host([pfe-variant="primary"]) .indicator {
    width: 100%;
    left: 0; }

:host([pfe-variant="primary"][aria-selected="true"]) {
  border: transparent; }

:host([pfe-variant="primary"][aria-selected="false"]) {
  border: transparent; }
  :host([pfe-variant="primary"][aria-selected="false"]) .indicator {
    display: none; }

:host([pfe-variant="secondary"]) {
  text-align: center;
  padding: calc(var(--pfe-theme--container-padding, 1rem) * .666) calc(var(--pfe-theme--container-padding, 1rem) * 2.75);
  border: 1px solid #252527;
  margin-right: 2%;
  display: flex;
  align-items: center; }
  :host([pfe-variant="secondary"]) .indicator {
    display: none; }

:host([pfe-variant="secondary"][aria-selected="true"]) {
  background-color: #252527;
  color: #ffffff; }
  :host([pfe-variant="secondary"][aria-selected="true"]) .indicator {
    display: block;
    bottom: calc(var(--pfe-theme--container-padding, 1rem) * -0.666);
    width: 0;
    height: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: var(--pfe-theme--container-spacer, 1rem) solid transparent;
    border-right: var(--pfe-theme--container-spacer, 1rem) solid transparent;
    border-top: var(--pfe-theme--container-spacer, 1rem) solid red;
    background-color: transparent; }

:host([pfe-variant="secondary"][aria-selected="false"]) {
  color: #0477a4; }

:host([pfe-variant="secondary"]:hover) {
  background-color: #252527;
  color: #ffffff; }

:host([vertical][pfe-variant="primary"]) {
  text-align: right;
  padding-right: var(--pfe-theme--container-padding, 1rem); }
  :host([vertical][pfe-variant="primary"]) .indicator {
    left: auto;
    right: 0;
    top: 0;
    display: var(--pfe-tabs__indicator--Display, block);
    height: var(--pfe-tabs__indicator--Height, 22px);
    width: var(--pfe-tabs__indicator--Width, 4px); }

:host([vertical][pfe-variant="primary"][aria-selected="true"]) {
  border: transparent !important; }

:host([vertical][pfe-variant="secondary"][aria-selected="true"]) .indicator {
  left: 99%;
  top: 50%;
  transform: translateY(-50%);
  border-top: var(--pfe-theme--container-spacer, 1rem) solid transparent;
  border-left: var(--pfe-theme--container-spacer, 1rem) solid #252527;
  border-bottom: var(--pfe-theme--container-spacer, 1rem) solid transparent;
  background-color: transparent; }

::slotted(h2) {
  font-size: var(--pfe-theme--font-size);
  font-weight: var(--pfe-theme--font-weight--normal, 500);
  margin: 0; }

:host([color="lightest"]) {
  background-color: var(--pfe-theme--color--surface--lightest, #fff); }

:host([color="light"]) {
  background-color: var(--pfe-theme--color--surface--light, ); }

:host([color="darkest"]) {
  background-color: var(--pfe-theme--color--surface--darkest, #131313); }

:host([color="dark"]) {
  background-color: var(--pfe-theme--color--surface--dark, ); }

:host([color="accent"]) {
  background-color: var(--pfe-theme--color--surface--accent, #fe460d); }

:host([color="complement"]) {
  background-color: var(--pfe-theme--color--surface--complement, #0477a4); }

:host([color="base"]) {
  background-color: var(--pfe-theme--color--surface--base, #dfdfdf); }
</style>
<slot></slot>
<div class="indicator"></div>`;
  }

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

class RhTabPanel extends PFElement {
  get html() {
    return `
<style>
:host {
  display: block;
  padding: var(--pfe-theme--container-padding, 1rem);
  border: solid 1px transparent;
  border-color: var(--pfe-theme--color--surface--border, #dfdfdf);
  border-top: transparent; }

:host([hidden]) {
  display: none; }

:host([color="lightest"]) {
  background-color: var(--pfe-theme--color--surface--lightest, #fff); }

:host([color="light"]) {
  background-color: var(--pfe-theme--color--surface--light, ); }

:host([color="darkest"]) {
  background-color: var(--pfe-theme--color--surface--darkest, #131313); }

:host([color="dark"]) {
  background-color: var(--pfe-theme--color--surface--dark, ); }

:host([color="accent"]) {
  background-color: var(--pfe-theme--color--surface--accent, #fe460d); }

:host([color="complement"]) {
  background-color: var(--pfe-theme--color--surface--complement, #0477a4); }

:host([color="base"]) {
  background-color: var(--pfe-theme--color--surface--base, #dfdfdf); }

:host([pfe-variant="primary"]) {
  border-color: transparent;
  padding: 0; }
</style>
<slot></slot>`;
  }

  static get tag() {
    return "pfe-tab-panel";
  }

  get styleUrl() {
    return "pfe-tab-panel.scss";
  }

  get templateUrl() {
    return "pfe-tab-panel.html";
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

PFElement.create(RhTab);
PFElement.create(RhTabPanel);
PFElement.create(PfeTabs);
//# sourceMappingURL=pfe-tabs.js.map
