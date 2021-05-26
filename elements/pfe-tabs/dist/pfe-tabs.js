import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  Array.prototype.find
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

// @POLYFILL  Array.prototype.findIndex
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

/*!
 * PatternFly Elements: PfeTabs 1.9.0
 * @license
 * Copyright 2021 Red Hat, Inc.
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

const TAB_CONTENT_MUTATION_CONFIG = {
  characterData: true,
  childList: true,
  subtree: true
};
class PfeTab extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.9.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{text-align:left;position:relative;display:block;cursor:pointer;margin:0 0 calc(1px * -1);margin:var(--pfe-tabs__tab--Margin,0 0 calc(var(--pfe-theme--ui--border-width,1px) * -1));padding:1rem calc(1rem * 2) 1rem calc(1rem * 2);padding:var(--pfe-tabs__tab--PaddingTop,var(--pfe-theme--container-padding,1rem)) var(--pfe-tabs__tab--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 2)) var(--pfe-tabs__tab--PaddingBottom,var(--pfe-theme--container-padding,1rem)) var(--pfe-tabs__tab--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 2));border-style:solid;border-style:var(--pfe-theme--ui--border-style,solid);border-width:1px;border-width:var(--pfe-theme--ui--border-width,1px);border-color:transparent;border-bottom-width:3px;border-bottom-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));background-color:none;background-color:var(--pfe-tabs--BackgroundColor--inactive,none);text-align:center;text-align:var(--pfe-tabs__tab--TextAlign,center);text-transform:none;text-transform:var(--pfe-tabs__tab--TextTransform,none);color:#6a6e73;color:var(--pfe-tabs--Color,var(--pfe-theme--color--text--muted,#6a6e73));font-size:1rem;font-size:var(--pfe-tabs__tab--FontSize,var(--pf-global--FontSize--md,1rem));font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-tabs__tab--LineHeight, var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif));line-height:1.5;line-height:var(--pfe-tabs__tab--LineHeight,var(--pfe-theme--line-height,1.5));font-weight:400;font-weight:var(--pfe-tabs__tab--FontWeight,var(--pfe-theme--font-weight--normal,400));--pf-c--FontSize:var(--pfe-tabs--FontSize)}:host #tab{display:inline-block}:host #tab *{font-size:inherit;font-weight:inherit;color:inherit;margin:0}:host([aria-selected=true]){background-color:transparent;background-color:var(--pfe-tabs--BackgroundColor,transparent);border-bottom-color:#06c;border-bottom-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)))}:host([aria-selected=true]) #tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host(:active),:host(:focus),:host(:hover){background-color:transparent;background-color:var(--pfe-tabs--BackgroundColor,transparent);border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host(:active) #tab *,:host(:focus) #tab *,:host(:hover) #tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([variant=earth][vertical]) #tab{display:inline-block}@media screen and (min-width:768px){:host([vertical]){border-bottom-color:transparent;border-bottom-width:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:1px;border-left-width:var(--pfe-theme--ui--border-width,1px);padding:1rem;padding:var(--pfe-theme--container-padding,1rem);--pfe-tabs--Margin:0 calc(var(--pfe-theme--ui--border-width, 1px) * -1) 0 0}:host([vertical][aria-selected=true]){border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-left-width:3px}:host([vertical]:not([variant=earth])){border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);text-align:left!important}:host([vertical]:not([variant=earth])[aria-selected=true]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-left:3px solid #06c;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));padding-left:calc(1rem - 2px);padding-left:calc(var(--pfe-theme--container-padding,1rem) - 2px)}:host([vertical]:not([variant=earth])[aria-selected=false]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical]:not([variant=earth])[aria-selected=false]:hover){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-bottom:0;border-left:3px solid #b8bbbe;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor--hover,#b8bbbe);padding-left:calc(1rem - 2px);padding-left:calc(var(--pfe-theme--container-padding,1rem) - 2px)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]){background-color:#f0f0f0;color:#6a6e73}}:host(:not([vertical])[variant=earth]:not([aria-selected=true]):first-of-type){border-left-color:transparent}:host(:not([vertical])[variant=earth]:not([aria-selected=true]):last-of-type){border-right-color:transparent}:host([variant=earth][aria-selected=false]){background-color:#f0f0f0;background-color:var(--pfe-tabs--BackgroundColor--inactive,var(--pfe-theme--color--surface--lighter,#f0f0f0));border-color:#d2d2d2;border-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-width:3px;border-top-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));border-top-color:transparent;border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-bottom-width:1px;border-bottom-width:var(--pfe-theme--ui--border-width,1px)}:host([variant=earth][aria-selected=false]:hover){border-top-color:#b8bbbe;border-top-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host([variant=earth][aria-selected=true]){background-color:#fff;background-color:var(--pfe-tabs--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-bottom:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top:solid #06c 3px;border-top:solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c))) var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth][aria-selected=true]){color:#6a6e73;background-color:#fff;border-left:1px solid #d2d2d2;border-top:3px solid #06c;border-top:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-bottom:0}}:host([variant=earth][aria-selected=true]:last-of-type){border-right:1px solid #d2d2d2;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}@media screen and (min-width:768px){:host([vertical][variant=earth]){border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:3px;border-left-width:var(--pfe-theme--ui--border-width--active,3px);text-align:left}:host([vertical][variant=earth][aria-selected=false]:first-of-type){border-top-color:transparent;border-left:3px solid transparent;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical][variant=earth][aria-selected=false]:last-of-type){border-bottom-color:transparent}:host([vertical][variant=earth][aria-selected=false]){border-right:0;border-bottom-color:transparent;border-left-color:transparent}:host([vertical][variant=earth][aria-selected=false]:hover){border-left-color:#b8bbbe;border-left-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2)}:host([vertical][variant=earth][aria-selected=false]:first-of-type:hover){border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-color:transparent}:host([vertical][variant=earth][aria-selected=true]){border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-right-color:transparent;margin-right:-1px}}:host([on=dark][variant=earth]){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);border-right-color:#6a6e73;border-right-color:var(--pfe-theme--color--surface--border--darker,#6a6e73);border-left-color:#6a6e73;border-left-color:var(--pfe-theme--color--surface--border--darker,#6a6e73)}:host([on=dark][variant=earth][aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-tabs--BackgroundColor--inactive:var(--pfe-theme--color--surface--darker, #3c3f42)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark][variant=earth][aria-selected=false]){background-color:#fff!important;background-color:var(--pfe-theme--color--surface--lightest,#fff)!important}:host([on=dark][variant=earth][aria-selected=false]) #tab *{color:#151515!important}}:host([on=dark][variant=earth][aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515)}:host([variant=earth][on=saturated][aria-selected=false]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0)}:host([variant=earth][on=saturated][aria-selected=true]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([on=saturated]:not([variant=earth])){--pfe-tabs--Color:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated]:not([variant=earth])){background-color:transparent}:host([on=saturated]:not([variant=earth])) #tab *{color:#151515!important}}:host([on=saturated]:not([variant=earth])[aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--BorderColor:var(--pfe-theme--color--ui-base--on-saturated, #fff)}:host([on=saturated]:not([variant=earth])[aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)}:host([on=saturated]:not([variant=earth])[aria-selected=false]:hover){--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated]:not([variant=earth])[aria-selected=true]:last-of-type){border-left:0!important}}:host([on=dark]:not([variant=earth])){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark]:not([variant=earth])) #tab *{color:#151515!important}}:host([on=dark]:not([variant=earth])[aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)}:host([on=dark]:not([variant=earth])[aria-selected=false]:hover){--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);border-bottom-color:#f0f0f0;border-bottom-color:var(--pfe-theme--color--surface--base,#f0f0f0);--pfe-tabs__tab--BorderBottom:var(--pfe-tabs--BorderWidth, var(--pfe-theme--ui--border-width--active, 3px)) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([on=dark]:not([variant=earth])[vertical][aria-selected=false]:hover){border-bottom-color:transparent} /*# sourceMappingURL=pfe-tab.min.css.map */</style>
<span id="tab"></span>`;
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

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: String,
        default: "false",
        attr: "aria-selected",
        values: ["true", "false"],
        observer: "_selectedHandler"
      },
      controls: {
        title: "Connected panel ID",
        type: String,
        attr: "aria-controls"
      },
      role: {
        type: String,
        default: "tab"
      },
      tabindex: {
        type: Number,
        default: -1
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"]
      },
      // @TODO: Deprecated in 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeTab, { type: PfeTab.PfeType });

    this._tabItem;
    this._init = this._init.bind(this);
    this._setTabContent = this._setTabContent.bind(this);
    this._getTabElement = this._getTabElement.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._tabItem = this.shadowRoot.querySelector(`#tab`);

    if (this.hasLightDOM()) this._init();

    this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _selectedHandler() {
    if (this.selected === "true") this.tabindex = 0;
    else this.tabindex = -1;
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id) this.id = newVal;
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // Force role to be set to tab
    this.role = "tab";

    // Copy the tab content into the template
    this._setTabContent();

    // If an ID is not defined, generate a random one
    if (!this.id) this.id = this.randomId;

    if (window.ShadyCSS) this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
  }

  _getTabElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No tab content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      // If the first element is a slot, query for it's content
      if (this.firstElementChild.tagName === "SLOT") {
        const slotted = this.firstElementChild.assignedNodes();
        // If there is no content inside the slot, return empty with a warning
        if (slotted.length === 0) {
          this.warn(`No heading information exists within this slot.`);
          return;
        }
        // If there is more than 1 element in the slot, capture the first h-tag
        if (slotted.length > 1) this.warn(`Tab heading currently only supports 1 heading tag.`);
        const htags = slotted.filter(slot => slot.tagName.match(/^H[1-6]/) || slot.tagName === "P");
        if (htags.length > 0) return htags[0];
        else return;
      } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
        return this.firstElementChild;
      } else {
        this.warn(`Tab heading should contain at least 1 heading tag for correct semantics.`);
      }
    }

    return;
  }

  _setTabContent() {
    let label = "";
    let isTag = false;
    let tabElement = this._getTabElement();
    if (tabElement) {
      // Copy the tab content into the template
      label = tabElement.textContent.trim().replace(/\s+/g, " ");
      isTag = true;
    }

    if (!tabElement) {
      // If no element is found, try for a text node
      if (this.textContent.trim().replace(/\s+/g, " ")) {
        label = this.textContent.trim().replace(/\s+/g, " ");
      }
    }

    if (!label) {
      this.warn(`There does not appear to be any content in the tab region.`);
      return;
    }

    let semantics = "h3";

    if (isTag) {
      semantics = tabElement.tagName.toLowerCase();
    }

    // Create an h-level tag for the shadow tab, default h3
    // or use the provided semantics from light DOM
    let heading = document.createElement(semantics);

    // Assign the label content to the new heading
    heading.textContent = label;

    // Attach the heading to the tabItem
    if (this._tabItem) {
      this._tabItem.innerHTML = "";
      this._tabItem.appendChild(heading);
    }
  }
}

/*!
 * PatternFly Elements: PfeTabs 1.9.0
 * @license
 * Copyright 2021 Red Hat, Inc.
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

const TAB_PANEL_MUTATION_CONFIG = {
  childList: true,
  subtree: true
};

class PfeTabPanel extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.9.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block;color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host(:focus){outline:0}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%}:host .container{margin:0;width:100%;background-color:transparent;background-color:var(--pfe-tabs__panel--BackgroundColor,transparent);border-top:0;border-top:var(--pfe-tabs__panel--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__panel--BorderRight,0);border-bottom:0;border-bottom:var(--pfe-tabs__panel--BorderBottom,0);border-left:0;border-left:var(--pfe-tabs__panel--BorderLeft,0);padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (min-width:1200px){:host .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-left:0;padding-left:var(--pfe-tabs__panel--PaddingLeft,0)}}:host .container::after{clear:both;content:"";display:table}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host .container{padding:1em;background-color:#fff!important;color:#151515!important}}:host([hidden]){display:none}:host([variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]) .container{background-color:#fff;padding:1em;border-right:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-left:1px solid #d2d2d2}}@media screen and (min-width:768px){:host([variant=wind][vertical]) .container{padding-top:0;padding-top:var(--pfe-tabs__panel--PaddingTop,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);margin:0 calc(1rem - 2px);margin:0 calc(var(--pfe-theme--container-spacer,1rem) - 2px)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=wind][vertical]) .container{padding:1em 0 1em 2em}}@media screen and (min-width:768px){:host([variant=earth][vertical]){border-top:0;border-top:var(--pfe-tabs--BorderTop,0);border-left:1px solid #d2d2d2;border-left:var(--pfe-tabs--BorderLeft,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2));height:100%;background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth][vertical]) .container{padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=earth][vertical]) .container{border-top:1px solid #d2d2d2}}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}:host([on=dark][variant=earth]){background-color:#151515;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated][variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([on=saturated]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=dark]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)} /*# sourceMappingURL=pfe-tab-panel.min.css.map */</style>
<div tabindex="-1" role="tabpanel">
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

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: Boolean,
        default: false,
        attr: "aria-selected",
        observer: "_selectedHandler"
      },
      hidden: {
        title: "Visibility",
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        default: "tabpanel"
      },
      tabindex: {
        type: Number,
        default: 0
      },
      labelledby: {
        type: String,
        attr: "aria-labelledby"
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"]
      },
      // @TODO: Deprecated in 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeTabPanel, { type: PfeTabPanel.PfeType });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();
    this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // If an ID is not defined, generate a random one
    if (!this.id) this.id = this.randomId;

    // Force role to be set to tab
    this.role = "tabpanel";

    if (this.previousElementSibling && this.previousElementSibling.selected !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id) this.id = newVal;
  }
}

/*!
 * PatternFly Elements: PfeTabs 1.9.0
 * @license
 * Copyright 2021 Red Hat, Inc.
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

  // Injected at build-time
  static get version() {
    return "1.9.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{display:block;display:var(--pfe-tabs--Display,block);padding:0;padding:var(--pfe-tabs--Padding,0)}:host .tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;flex-direction:var(--pfe-tabs__tabs--FlexDirection,row);width:auto;width:var(--pfe-tabs__tabs--Width,auto);border-top:0;border-top:var(--pfe-tabs__tabs--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__tabs--BorderRight,0);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-tabs__tabs--BorderBottom,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2)));border-left:0;border-left:var(--pfe-tabs__tabs--BorderLeft,0);padding:0;padding:var(--pfe-tabs__tabs--Padding,0)}:host .panels{width:auto;width:var(--pfe-tabs__panels--Width,auto)}:host(:not([vertical])[tab-align=center]) .tabs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}@media screen and (min-width:768px){:host([vertical]){--pfe-tabs--Display:flex;--pfe-tabs__tabs--FlexDirection:column;--pfe-tabs__tabs--Width:20%;--pfe-tabs__tabs--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor);--pfe-tabs__tabs--BorderBottom:0;--pfe-tabs__panels--Width:80%;--pfe-tabs__panels--PaddingRight:var(--pfe-theme--container-padding, 1rem)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([vertical]) .tabs{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:22.22%;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:0}:host([vertical]) .panels{width:77.8%;padding-right:1em}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][variant=earth]) .tabs{padding:1em 0 0 0}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not([variant=earth])){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#151515;color:var(--pfe-theme--color--text,#151515)}}:host([variant=earth]){--pfe-tabs__tabs--PaddingLeft:var(--pfe-theme--container-padding, 1rem)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]) .tabs{padding-left:1em}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([vertical]) .tabs-prefix,:host([vertical]) .tabs-suffix{left:0;top:0;content:" ";height:calc(1rem * 2);height:calc(var(--pfe-theme--container-padding,1rem) * 2);width:1px;position:relative}@media screen and (min-width:768px){:host([vertical]:not([variant=earth])) .tabs-prefix,:host([vertical]:not([variant=earth])) .tabs-suffix{background-color:#d2d2d2;background-color:var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2))}}:host(:not([vertical])[variant=earth]) .tabs-prefix{left:0;top:0;content:" ";height:1px;width:1rem;width:var(--pfe-theme--container-padding,1rem);position:relative}@media screen and (min-width:768px){:host(:not([vertical])[variant=earth]) .tabs-prefix{width:calc(1rem * 2);width:calc(var(--pfe-theme--container-padding,1rem) * 2)}}:host([hidden]){display:none} /*# sourceMappingURL=pfe-tabs.min.css.map */</style>
<div class="tabs">
  <div class="tabs-prefix"></div>
  <slot name="tab"></slot>
  <div class="tabs-suffix"></div>
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

export default PfeTabs;
//# sourceMappingURL=pfe-tabs.js.map
