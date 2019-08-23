import PFElement from '../pfelement/pfelement.js';

/*!
 * PatternFly Elements: PfeTabs 1.0.0-prerelease.21
 * @license
 * Copyright 2019 Red Hat, Inc.
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
 * 
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
  static get version() {
    return "1.0.0-prerelease.21";
  }

  get html() {
    return `<style>:host{display:block}:host .panels{padding:0}.tabs{--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--border, #dfdfdf);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:0;border-bottom:1px solid var(--pfe-tabs--BorderColor);border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor)}:host(:not([vertical])[pfe-tab-align=center]) .tabs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}@media screen and (min-width:768px){:host([vertical]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([vertical]) .tabs{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:22.22%;border:0;border-right:1px solid var(--pfe-tabs--BorderColor);border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor)}:host([vertical]) .panels{padding:0;width:77.78%;padding-right:1rem;padding-right:var(--pfe-theme--container-padding,1rem)}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){padding-top:1rem;padding-top:var(--pfe-theme--container-padding,1rem)}:host([vertical][pfe-variant=earth]) .tabs{padding-left:0;padding-top:1rem;padding-top:var(--pfe-theme--container-padding,1rem)}}:host([pfe-variant=earth]) .tabs{padding-left:1rem;padding-left:var(--pfe-theme--container-padding,1rem)}:host([pfe-variant=earth]) .tabs ::slotted(pfe-tab[aria-selected=false]:not([vertical]):first-of-type){border-left:0}:host([on=dark]){--pfe-broadcasted--color--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link--on-dark, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--on-dark--focus, #cce6ff)}:host([on=light]){--pfe-broadcasted--color--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--focus, #003366)}</style><div class="tabs">
  <slot name="tab"></slot>
</div>
<div class="panels">
  <slot name="panel"></slot>
</div>`;
  }

  static get properties() {
    return {"vertical":{"title":"Vertical orientation","type":"boolean","default":false,"prefixed":false},"variant":{"title":"Variant","type":"string","enum":["wind","earth"],"default":"wind","prefixed":true},"on":{"title":"Context","type":"string","enum":["light","dark"],"default":"light","prefixed":false}};
  }

  static get slots() {
    return {"tab":{"title":"Tab","type":"array","namedSlot":true,"items":{"oneOf":[{"$ref":"raw"}]}},"panel":{"title":"Panel","type":"array","namedSlot":true,"items":{"oneOf":[{"$ref":"raw"}]}}};
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

  get schemaUrl() {
    return "pfe-tabs.json";
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "pfe-variant", "on"];
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
    this._init = this._init.bind(this);
    this._onClick = this._onClick.bind(this);
    this._linkPanels = this._linkPanels.bind(this);
    this._observer = new MutationObserver(this._init);
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

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this._allTabs().forEach(tab => tab.removeEventListener("click", this._onClick));
    this._observer.disconnect();
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

      case "on":
        if (this.getAttribute("on") === "dark") {
          this._allTabs().forEach(tab =>
            tab.setAttribute("on", "dark")
          );
          this._allPanels().forEach(panel =>
            panel.setAttribute("on", "dark")
          );
         }
         break;

      case "selected-index":
        Promise.all([
          customElements.whenDefined(PfeTab.tag),
          customElements.whenDefined(PfeTabPanel.tag)
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

  _init() {
    if (this.getAttribute("role") !== "tablist") {
      this.setAttribute("role", "tablist");
    }

    if (!this.hasAttribute("selected-index")) {
      this.selectedIndex = 0;
    }

    this._linked = false;
    this._linkPanels();
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
      this._observer.observe(this, { childList: true });
    }
  }

  _allPanels() {
    return [...this.querySelectorAll("pfe-tab-panel")];
  }

  _allTabs() {
    return [...this.querySelectorAll("pfe-tab")];
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
    if (event.currentTarget.getAttribute("role") !== "tab") {
      return;
    }

    this.selectedIndex = this._getTabIndex(event.currentTarget);
  }
}

class PfeTab extends PFElement {
  static get version() {
    return "1.0.0-prerelease.21";
  }

  get html() {
    return `<style>:host{--pfe-tabs--main:transparent;--pfe-tabs--aux:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-tabs--link:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-tabs--focus:var(--pfe-theme--color--surface--lightest--link--focus, #003366);--pfe-tabs--highlight:var(--pfe-theme--color--ui-accent, #fe460d);position:relative;display:block;margin:0 0 -1px;padding:calc(1rem * .666) calc(1rem * 1.5);padding:calc(var(--pfe-theme--container-padding,1rem) * .666) calc(var(--pfe-theme--container-padding,1rem) * 1.5);border:1px solid transparent;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) transparent;border-bottom:0;background-color:var(--pfe-tabs--main);color:var(--pfe-tabs--aux);text-transform:none;text-transform:var(--pfe-tabs__tab--TextTransform,none);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);cursor:pointer;text-align:center}:host(:focus),:host(:focus-visible){outline:1px solid #036;outline:1px solid var(--pfe-tabs--focus);outline:var(--pfe-theme--ui--focus-outline-width,1px) var(--pfe-theme--ui--focus-outline-style,solid) var(--pfe-tabs--focus)}:host([aria-selected=true]){--pfe-tabs--aux:#131313;border:transparent;border-bottom:3px solid var(--pfe-tabs--highlight);border-bottom:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) var(--pfe-tabs--highlight)}:host(:hover){--pfe-tabs--aux:var(--pfe-theme--color--text, #333)}@media screen and (min-width:768px){:host([vertical]){text-align:left;margin:0 -1px 0 0;padding-left:calc(1rem * .75);padding-left:calc(var(--pfe-theme--container-padding,1rem) * .75);border:1px solid transparent;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) transparent;border-right:0;position:relative}:host([vertical][aria-selected=true]){border-color-top:transparent;border-right:3px solid var(--pfe-tabs--highlight);border-right:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) var(--pfe-tabs--highlight)}}:host([pfe-variant=wind][aria-selected=true][on=dark]),:host([pfe-variant=wind][on=dark]:hover){--pfe-tabs--aux:var(--pfe-theme--color--text--on-dark, #fff)}:host([pfe-variant=earth][aria-selected=false]){border-left:1px solid #dfdfdf;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-bottom:1px solid #dfdfdf;border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-top:3px solid #ececec;border-top:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--lighter,#ececec);--pfe-tabs--main:var(--pfe-theme--color--surface--lighter, #ececec)}:host([pfe-variant=earth][aria-selected=true]){--pfe-tabs--main:var(--pfe-theme--color--surface--lightest, #fff);border-top:3px solid var(--pfe-tabs--highlight);border-top:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) var(--pfe-tabs--highlight);border-bottom:0;border-left:1px solid #dfdfdf;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf)}:host([pfe-variant=earth][aria-selected=true]:last-of-type){border-right:1px solid #dfdfdf;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf)}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){border-top:1px solid #dfdfdf;border-top:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf)}:host([vertical][pfe-variant=earth]:first-of-type){border-top:0}:host([vertical][pfe-variant=earth][aria-selected=true]){border-top:1px solid #dfdfdf;border-top:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-right:0;border-left:3px solid var(--pfe-tabs--highlight);border-left:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) var(--pfe-tabs--highlight)}:host([vertical][pfe-variant=earth][aria-selected=false]){border-right:1px solid #dfdfdf;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-bottom:0;border-left:3px solid #ececec;border-left:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--lighter,#ececec)}:host([vertical][pfe-variant=earth][aria-selected=true]:last-of-type){border-bottom:1px solid #dfdfdf;border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf)}}</style><slot></slot>`;
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

    if  (!this.pfeId) {
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
  static get version() {
    return "1.0.0-prerelease.21";
  }

  get html() {
    return `<style>:host{display:block;color:var(--pfe-broadcasted--color--text)}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([hidden]){display:none}:host([on=dark]){color:pfe-colors(text--on-dark);--pfe-broadcasted--color--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link--on-dark, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--on-dark--focus, #cce6ff)}:host([pfe-variant=wind]) .container{margin:0;width:100%;padding:1rem 0;padding:var(--pfe-theme--container-spacer,1rem) 0}:host([pfe-variant=earth]) .container{margin:0;width:100%;padding:1rem 0;padding:var(--pfe-theme--container-spacer,1rem) 0;padding:calc(1rem * 2);padding:calc(var(--pfe-theme--container-spacer,1rem) * 2);border:1px solid #dfdfdf;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-top:none}@media screen and (min-width:768px){:host([pfe-variant=wind][vertical]) .container{margin:0;width:100%;padding:1rem 0;padding:var(--pfe-theme--container-spacer,1rem) 0;padding-left:calc(1rem * 2);padding-left:calc(var(--pfe-theme--container-spacer,1rem) * 2)}:host([pfe-variant=earth][vertical]) .container{margin:0;width:100%;padding:1rem 0;padding:var(--pfe-theme--container-spacer,1rem) 0;padding-left:calc(1rem * 2);padding-left:calc(var(--pfe-theme--container-spacer,1rem) * 2);padding:calc(1rem * 2);padding:calc(var(--pfe-theme--container-spacer,1rem) * 2);border:1px solid #dfdfdf;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#dfdfdf);border-left:none}}</style><div tabindex="-1" role="tabpanel">
  <div class="container">
    <slot></slot>
  </div>
</div>`;
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

export default PfeTabs;
//# sourceMappingURL=pfe-tabs.js.map
