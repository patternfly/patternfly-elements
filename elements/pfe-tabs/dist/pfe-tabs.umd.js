(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeTabs = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

  // @POLYFILL  Array.prototype.find
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function value(predicate) {
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
      value: function value(predicate) {
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

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

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

  var TAB_CONTENT_MUTATION_CONFIG = {
    characterData: true,
    childList: true,
    subtree: true
  };

  var PfeTab = function (_PFElement) {
    inherits(PfeTab, _PFElement);
    createClass(PfeTab, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{text-align:left;position:relative;display:block;cursor:pointer;margin:0 0 calc(1px * -1);margin:var(--pfe-tabs__tab--Margin,0 0 calc(var(--pfe-theme--ui--border-width,1px) * -1));padding:1rem calc(1rem * 2) 1rem calc(1rem * 2);padding:var(--pfe-tabs__tab--PaddingTop,var(--pfe-theme--container-padding,1rem)) var(--pfe-tabs__tab--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 2)) var(--pfe-tabs__tab--PaddingBottom,var(--pfe-theme--container-padding,1rem)) var(--pfe-tabs__tab--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 2));border-style:solid;border-style:var(--pfe-theme--ui--border-style,solid);border-width:1px;border-width:var(--pfe-theme--ui--border-width,1px);border-color:transparent;border-bottom-width:3px;border-bottom-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));background-color:none;background-color:var(--pfe-tabs--BackgroundColor--inactive,none);text-align:center;text-align:var(--pfe-tabs__tab--TextAlign,center);text-transform:none;text-transform:var(--pfe-tabs__tab--TextTransform,none);color:#6a6e73;color:var(--pfe-tabs--Color,var(--pfe-theme--color--text--muted,#6a6e73));font-size:1rem;font-size:var(--pfe-tabs__tab--FontSize,var(--pf-global--FontSize--md,1rem));font-family:\"Red Hat Text\",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-tabs__tab--LineHeight, var(--pfe-theme--font-family, \"Red Hat Text\", \"RedHatText\", \"Overpass\", Overpass, Arial, sans-serif));line-height:1.5;line-height:var(--pfe-tabs__tab--LineHeight,var(--pfe-theme--line-height,1.5));font-weight:400;font-weight:var(--pfe-tabs__tab--FontWeight,var(--pfe-theme--font-weight--normal,400));--pf-c--FontSize:var(--pfe-tabs--FontSize)}:host #tab{display:inline-block}:host #tab *{font-size:inherit;font-weight:inherit;color:inherit;margin:0}:host([aria-selected=true]){background-color:transparent;background-color:var(--pfe-tabs--BackgroundColor,transparent);border-bottom-color:#06c;border-bottom-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)))}:host([aria-selected=true]) #tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host(:active),:host(:focus),:host(:hover){background-color:transparent;background-color:var(--pfe-tabs--BackgroundColor,transparent);border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host(:active) #tab *,:host(:focus) #tab *,:host(:hover) #tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([variant=earth][vertical]) #tab{display:inline-block}@media screen and (min-width:768px){:host([vertical]){border-bottom-color:transparent;border-bottom-width:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:1px;border-left-width:var(--pfe-theme--ui--border-width,1px);padding:1rem;padding:var(--pfe-theme--container-padding,1rem);--pfe-tabs--Margin:0 calc(var(--pfe-theme--ui--border-width, 1px) * -1) 0 0}:host([vertical][aria-selected=true]){border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-left-width:3px}:host([vertical]:not([variant=earth])){border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);text-align:left!important}:host([vertical]:not([variant=earth])[aria-selected=true]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-left:3px solid #06c;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));padding-left:calc(1rem - 2px);padding-left:calc(var(--pfe-theme--container-padding,1rem) - 2px)}:host([vertical]:not([variant=earth])[aria-selected=false]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical]:not([variant=earth])[aria-selected=false]:hover){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-bottom:0;border-left:3px solid #b8bbbe;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor--hover,#b8bbbe);padding-left:calc(1rem - 2px);padding-left:calc(var(--pfe-theme--container-padding,1rem) - 2px)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]){background-color:#f0f0f0;color:#6a6e73}}:host(:not([vertical])[variant=earth]:not([aria-selected=true]):first-of-type){border-left-color:transparent}:host(:not([vertical])[variant=earth]:not([aria-selected=true]):last-of-type){border-right-color:transparent}:host([variant=earth][aria-selected=false]){background-color:#f0f0f0;background-color:var(--pfe-tabs--BackgroundColor--inactive,var(--pfe-theme--color--surface--lighter,#f0f0f0));border-color:#d2d2d2;border-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-width:3px;border-top-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));border-top-color:transparent;border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-bottom-width:1px;border-bottom-width:var(--pfe-theme--ui--border-width,1px)}:host([variant=earth][aria-selected=false]:hover){border-top-color:#b8bbbe;border-top-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host([variant=earth][aria-selected=true]){background-color:#fff;background-color:var(--pfe-tabs--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-bottom:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top:solid #06c 3px;border-top:solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c))) var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth][aria-selected=true]){color:#6a6e73;background-color:#fff;border-left:1px solid #d2d2d2;border-top:3px solid #06c;border-top:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-bottom:0}}:host([variant=earth][aria-selected=true]:last-of-type){border-right:1px solid #d2d2d2;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}@media screen and (min-width:768px){:host([vertical][variant=earth]){border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:3px;border-left-width:var(--pfe-theme--ui--border-width--active,3px);text-align:left}:host([vertical][variant=earth][aria-selected=false]:first-of-type){border-top-color:transparent;border-left:3px solid transparent;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical][variant=earth][aria-selected=false]:last-of-type){border-bottom-color:transparent}:host([vertical][variant=earth][aria-selected=false]){border-right:0;border-bottom-color:transparent;border-left-color:transparent}:host([vertical][variant=earth][aria-selected=false]:hover){border-left-color:#b8bbbe;border-left-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2)}:host([vertical][variant=earth][aria-selected=false]:first-of-type:hover){border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-color:transparent}:host([vertical][variant=earth][aria-selected=true]){border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-right-color:transparent;margin-right:-1px}}:host([on=dark][variant=earth]){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);border-right-color:#6a6e73;border-right-color:var(--pfe-theme--color--surface--border--darker,#6a6e73);border-left-color:#6a6e73;border-left-color:var(--pfe-theme--color--surface--border--darker,#6a6e73)}:host([on=dark][variant=earth][aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-tabs--BackgroundColor--inactive:var(--pfe-theme--color--surface--darker, #3c3f42)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark][variant=earth][aria-selected=false]){background-color:#fff!important;background-color:var(--pfe-theme--color--surface--lightest,#fff)!important}:host([on=dark][variant=earth][aria-selected=false]) #tab *{color:#151515!important}}:host([on=dark][variant=earth][aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515)}:host([variant=earth][on=saturated][aria-selected=false]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0)}:host([variant=earth][on=saturated][aria-selected=true]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([on=saturated]:not([variant=earth])){--pfe-tabs--Color:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated]:not([variant=earth])){background-color:transparent}:host([on=saturated]:not([variant=earth])) #tab *{color:#151515!important}}:host([on=saturated]:not([variant=earth])[aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--BorderColor:var(--pfe-theme--color--ui-base--on-saturated, #fff)}:host([on=saturated]:not([variant=earth])[aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)}:host([on=saturated]:not([variant=earth])[aria-selected=false]:hover){--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated]:not([variant=earth])[aria-selected=true]:last-of-type){border-left:0!important}}:host([on=dark]:not([variant=earth])){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark]:not([variant=earth])) #tab *{color:#151515!important}}:host([on=dark]:not([variant=earth])[aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)}:host([on=dark]:not([variant=earth])[aria-selected=false]:hover){--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);border-bottom-color:#f0f0f0;border-bottom-color:var(--pfe-theme--color--surface--base,#f0f0f0);--pfe-tabs__tab--BorderBottom:var(--pfe-tabs--BorderWidth, var(--pfe-theme--ui--border-width--active, 3px)) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([on=dark]:not([variant=earth])[vertical][aria-selected=false]:hover){border-bottom-color:transparent} /*# sourceMappingURL=pfe-tab.min.css.map */</style>\n<span id=\"tab\"></span>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-tab.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-tab.html";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-tab";
      }
    }, {
      key: "properties",
      get: function get() {
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

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeTab() {
      classCallCheck(this, PfeTab);

      var _this = possibleConstructorReturn(this, (PfeTab.__proto__ || Object.getPrototypeOf(PfeTab)).call(this, PfeTab, { type: PfeTab.PfeType }));

      _this._tabItem;
      _this._init = _this._init.bind(_this);
      _this._setTabContent = _this._setTabContent.bind(_this);
      _this._getTabElement = _this._getTabElement.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeTab, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeTab.prototype.__proto__ || Object.getPrototypeOf(PfeTab.prototype), "connectedCallback", this).call(this);

        this._tabItem = this.shadowRoot.querySelector("#tab");

        if (this.hasLightDOM()) this._init();

        this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeTab.prototype.__proto__ || Object.getPrototypeOf(PfeTab.prototype), "disconnectedCallback", this).call(this);
        this._observer.disconnect();
      }
    }, {
      key: "_selectedHandler",
      value: function _selectedHandler() {
        if (this.selected === "true") this.tabindex = 0;else this.tabindex = -1;
      }
    }, {
      key: "_oldPfeIdChanged",
      value: function _oldPfeIdChanged(oldVal, newVal) {
        if (!this.id) this.id = newVal;
      }
    }, {
      key: "_init",
      value: function _init() {
        if (window.ShadyCSS) this._observer.disconnect();

        // Force role to be set to tab
        this.role = "tab";

        // Copy the tab content into the template
        this._setTabContent();

        // If an ID is not defined, generate a random one
        if (!this.id) this.id = this.randomId;

        if (window.ShadyCSS) this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
      }
    }, {
      key: "_getTabElement",
      value: function _getTabElement() {
        // Check if there is no nested element or nested textNodes
        if (!this.firstElementChild && !this.firstChild) {
          this.warn("No tab content provided");
          return;
        }

        if (this.firstElementChild && this.firstElementChild.tagName) {
          // If the first element is a slot, query for it's content
          if (this.firstElementChild.tagName === "SLOT") {
            var slotted = this.firstElementChild.assignedNodes();
            // If there is no content inside the slot, return empty with a warning
            if (slotted.length === 0) {
              this.warn("No heading information exists within this slot.");
              return;
            }
            // If there is more than 1 element in the slot, capture the first h-tag
            if (slotted.length > 1) this.warn("Tab heading currently only supports 1 heading tag.");
            var htags = slotted.filter(function (slot) {
              return slot.tagName.match(/^H[1-6]/) || slot.tagName === "P";
            });
            if (htags.length > 0) return htags[0];else return;
          } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
            return this.firstElementChild;
          } else {
            this.warn("Tab heading should contain at least 1 heading tag for correct semantics.");
          }
        }

        return;
      }
    }, {
      key: "_setTabContent",
      value: function _setTabContent() {
        var label = "";
        var isTag = false;
        var tabElement = this._getTabElement();
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
          this.warn("There does not appear to be any content in the tab region.");
          return;
        }

        var semantics = "h3";

        if (isTag) {
          semantics = tabElement.tagName.toLowerCase();
        }

        // Create an h-level tag for the shadow tab, default h3
        // or use the provided semantics from light DOM
        var heading = document.createElement(semantics);

        // Assign the label content to the new heading
        heading.textContent = label;

        // Attach the heading to the tabItem
        if (this._tabItem) {
          this._tabItem.innerHTML = "";
          this._tabItem.appendChild(heading);
        }
      }
    }]);
    return PfeTab;
  }(PFElement);

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

  var TAB_PANEL_MUTATION_CONFIG = {
    childList: true,
    subtree: true
  };

  var PfeTabPanel = function (_PFElement) {
    inherits(PfeTabPanel, _PFElement);
    createClass(PfeTabPanel, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host(:focus){outline:0}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%}:host .container{margin:0;width:100%;background-color:transparent;background-color:var(--pfe-tabs__panel--BackgroundColor,transparent);border-top:0;border-top:var(--pfe-tabs__panel--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__panel--BorderRight,0);border-bottom:0;border-bottom:var(--pfe-tabs__panel--BorderBottom,0);border-left:0;border-left:var(--pfe-tabs__panel--BorderLeft,0);padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (min-width:1200px){:host .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-left:0;padding-left:var(--pfe-tabs__panel--PaddingLeft,0)}}:host .container::after{clear:both;content:\"\";display:table}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host .container{padding:1em;background-color:#fff!important;color:#151515!important}}:host([hidden]){display:none}:host([variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]) .container{background-color:#fff;padding:1em;border-right:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-left:1px solid #d2d2d2}}@media screen and (min-width:768px){:host([variant=wind][vertical]) .container{padding-top:0;padding-top:var(--pfe-tabs__panel--PaddingTop,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);margin:0 calc(1rem - 2px);margin:0 calc(var(--pfe-theme--container-spacer,1rem) - 2px)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=wind][vertical]) .container{padding:1em 0 1em 2em}}@media screen and (min-width:768px){:host([variant=earth][vertical]){border-top:0;border-top:var(--pfe-tabs--BorderTop,0);border-left:1px solid #d2d2d2;border-left:var(--pfe-tabs--BorderLeft,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2));height:100%;background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth][vertical]) .container{padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=earth][vertical]) .container{border-top:1px solid #d2d2d2}}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}:host([on=dark][variant=earth]){background-color:#151515;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated][variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([on=saturated]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=dark]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)} /*# sourceMappingURL=pfe-tab-panel.min.css.map */</style>\n<div tabindex=\"-1\" role=\"tabpanel\">\n  <div class=\"container\">\n    <slot></slot>\n  </div>\n</div>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-tab-panel.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-tab-panel.html";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-tab-panel";
      }
    }, {
      key: "properties",
      get: function get() {
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

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Container;
      }
    }]);

    function PfeTabPanel() {
      classCallCheck(this, PfeTabPanel);

      var _this = possibleConstructorReturn(this, (PfeTabPanel.__proto__ || Object.getPrototypeOf(PfeTabPanel)).call(this, PfeTabPanel, { type: PfeTabPanel.PfeType }));

      _this._init = _this._init.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeTabPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeTabPanel.prototype.__proto__ || Object.getPrototypeOf(PfeTabPanel.prototype), "connectedCallback", this).call(this);

        if (this.hasLightDOM()) this._init();
        this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeTabPanel.prototype.__proto__ || Object.getPrototypeOf(PfeTabPanel.prototype), "disconnectedCallback", this).call(this);
        this._observer.disconnect();
      }
    }, {
      key: "_init",
      value: function _init() {
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
    }, {
      key: "_oldPfeIdChanged",
      value: function _oldPfeIdChanged(oldVal, newVal) {
        if (!this.id) this.id = newVal;
      }
    }]);
    return PfeTabPanel;
  }(PFElement);

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

  var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35
  };

  // @IE11 doesn't support URLSearchParams
  // https://caniuse.com/#search=urlsearchparams
  var CAN_USE_URLSEARCHPARAMS = window.URLSearchParams ? true : false;

  var TABS_MUTATION_CONFIG = {
    childList: true,
    subtree: true
  };

  var PfeTabs = function (_PFElement) {
    inherits(PfeTabs, _PFElement);
    createClass(PfeTabs, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{display:block;display:var(--pfe-tabs--Display,block);padding:0;padding:var(--pfe-tabs--Padding,0)}:host .tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;flex-direction:var(--pfe-tabs__tabs--FlexDirection,row);width:auto;width:var(--pfe-tabs__tabs--Width,auto);border-top:0;border-top:var(--pfe-tabs__tabs--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__tabs--BorderRight,0);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-tabs__tabs--BorderBottom,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2)));border-left:0;border-left:var(--pfe-tabs__tabs--BorderLeft,0);padding:0;padding:var(--pfe-tabs__tabs--Padding,0)}:host .panels{width:auto;width:var(--pfe-tabs__panels--Width,auto)}:host(:not([vertical])[tab-align=center]) .tabs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}@media screen and (min-width:768px){:host([vertical]){--pfe-tabs--Display:flex;--pfe-tabs__tabs--FlexDirection:column;--pfe-tabs__tabs--Width:20%;--pfe-tabs__tabs--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor);--pfe-tabs__tabs--BorderBottom:0;--pfe-tabs__panels--Width:80%;--pfe-tabs__panels--PaddingRight:var(--pfe-theme--container-padding, 1rem)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([vertical]) .tabs{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:22.22%;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:0}:host([vertical]) .panels{width:77.8%;padding-right:1em}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][variant=earth]) .tabs{padding:1em 0 0 0}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not([variant=earth])){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#151515;color:var(--pfe-theme--color--text,#151515)}}:host([variant=earth]){--pfe-tabs__tabs--PaddingLeft:var(--pfe-theme--container-padding, 1rem)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]) .tabs{padding-left:1em}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([vertical]) .tabs-prefix,:host([vertical]) .tabs-suffix{left:0;top:0;content:\" \";height:calc(1rem * 2);height:calc(var(--pfe-theme--container-padding,1rem) * 2);width:1px;position:relative}@media screen and (min-width:768px){:host([vertical]:not([variant=earth])) .tabs-prefix,:host([vertical]:not([variant=earth])) .tabs-suffix{background-color:#d2d2d2;background-color:var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2))}}:host(:not([vertical])[variant=earth]) .tabs-prefix{left:0;top:0;content:\" \";height:1px;width:1rem;width:var(--pfe-theme--container-padding,1rem);position:relative}@media screen and (min-width:768px){:host(:not([vertical])[variant=earth]) .tabs-prefix{width:calc(1rem * 2);width:calc(var(--pfe-theme--container-padding,1rem) * 2)}}:host([hidden]){display:none} /*# sourceMappingURL=pfe-tabs.min.css.map */</style>\n<div class=\"tabs\">\n  <div class=\"tabs-prefix\"></div>\n  <slot name=\"tab\"></slot>\n  <div class=\"tabs-suffix\"></div>\n</div>\n<div class=\"panels\">\n  <slot name=\"panel\"></slot>\n</div>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-tabs.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-tabs.html";
      }

      // Each set contains a header and a panel

    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-tabs";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Tabs",
          description: "This element creates a tabbed interface."
        };
      }
    }, {
      key: "contentTemplate",
      get: function get() {
        return "\n      <pfe-tab content-type=\"header\" slot=\"tab\"></pfe-tab>\n      <pfe-tab-panel content-type=\"panel\" slot=\"panel\"></pfe-tab-panel>\n    ";
      }
    }, {
      key: "properties",
      get: function get() {
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
    }, {
      key: "slots",
      get: function get() {
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
    }, {
      key: "events",
      get: function get() {
        return {
          hiddenTab: this.tag + ":hidden-tab",
          shownTab: this.tag + ":shown-tab"
        };
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Combo;
      }
    }]);

    function PfeTabs() {
      classCallCheck(this, PfeTabs);

      var _this = possibleConstructorReturn(this, (PfeTabs.__proto__ || Object.getPrototypeOf(PfeTabs)).call(this, PfeTabs, { type: PfeTabs.PfeType }));

      _this._linked = false;
      _this._init = _this._init.bind(_this);
      _this._onClick = _this._onClick.bind(_this);
      _this._linkPanels = _this._linkPanels.bind(_this);
      _this._popstateEventHandler = _this._popstateEventHandler.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      _this._updateHistory = true;
      return _this;
    }

    createClass(PfeTabs, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
          get(PfeTabs.prototype.__proto__ || Object.getPrototypeOf(PfeTabs.prototype), "connectedCallback", _this2).call(_this2);

          if (_this2.hasLightDOM()) _this2._init();

          _this2._observer.observe(_this2, TABS_MUTATION_CONFIG);

          _this2.addEventListener("keydown", _this2._onKeyDown);
          _this2.addEventListener("click", _this2._onClick);
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        get(PfeTabs.prototype.__proto__ || Object.getPrototypeOf(PfeTabs.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener("keydown", this._onKeyDown);
        this._allTabs().forEach(function (tab) {
          return tab.removeEventListener("click", _this3._onClick);
        });
        this._observer.disconnect();

        if (this.tabHistory) window.removeEventListener("popstate", this._popstateEventHandler);
      }
    }, {
      key: "_verticalHandler",
      value: function _verticalHandler() {
        if (this.vertical) this.orientation = "vertical";else this.orientation = "horizontal";
      }
    }, {
      key: "_selectedIndexHandler",
      value: function _selectedIndexHandler(oldVal, newVal) {
        var _this4 = this;

        // Wait until the tab and panels are loaded
        Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
          _this4._linkPanels();
          _this4.selectIndex(newVal);
          _this4._updateHistory = true;
        });
      }
    }, {
      key: "_tabHistoryHandler",
      value: function _tabHistoryHandler() {
        if (!this.tabHistory) window.removeEventListener("popstate", this._popstateEventHandler);else window.addEventListener("popstate", this._popstateEventHandler);
      }
    }, {
      key: "_oldPfeIdChanged",
      value: function _oldPfeIdChanged(oldVal, newVal) {
        if (!this.id && newVal) this.id = newVal;
      }
    }, {
      key: "select",
      value: function select(newTab) {
        if (!newTab) return;

        if (newTab.tagName.toLowerCase() !== PfeTab.tag) {
          this.warn("the tab must be a " + PfeTab.tag + " element");
          return;
        }

        this.selectedIndex = this._getTabIndex(newTab);
      }
    }, {
      key: "selectIndex",
      value: function selectIndex(_index) {
        if (_index === undefined || _index === null) return;

        var index = parseInt(_index, 10);
        var tabs = this._allTabs();
        var tab = tabs[index];

        if (tabs.length > 0 && !tab) {
          this.warn("tab " + _index + " does not exist");
          return;
        } else if (!tabs && !tab) {
          // Wait for upgrade?
          return;
        }
        if (this.selected && this.tabHistory && this._updateHistory && CAN_USE_URLSEARCHPARAMS) {
          // @IE11 doesn't support URLSearchParams
          // https://caniuse.com/#search=urlsearchparams
          // rebuild the url
          var pathname = window.location.pathname;
          var urlParams = new URLSearchParams(window.location.search);
          var hash = window.location.hash;

          urlParams.set(this.id, tab.id);
          history.pushState({}, "", pathname + "?" + urlParams.toString() + hash);
        }

        this._selectTab(tab);

        return tab;
      }
    }, {
      key: "_init",
      value: function _init() {
        var tabIndexFromURL = this._getTabIndexFromURL();
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
    }, {
      key: "_linkPanels",
      value: function _linkPanels() {
        var _this5 = this;

        if (this._linked) return;

        if (window.ShadyCSS) this._observer.disconnect();

        this._allTabs().forEach(function (tab) {
          var panel = tab.nextElementSibling;
          if (panel.tagName.toLowerCase() !== PfeTabPanel.tag) {
            _this5.warn("not a sibling of a <" + PfeTabPanel.tag + ">");
            return;
          }

          // Connect the 2 items via appropriate aria attributes
          tab.controls = panel.id;
          panel.labelledby = tab.id;

          tab.addEventListener("click", _this5._onClick);
        });

        this._linked = true;

        if (window.ShadyCSS) this._observer.observe(this, TABS_MUTATION_CONFIG);
      }
    }, {
      key: "_allPanels",
      value: function _allPanels() {
        return [].concat(toConsumableArray(this.children)).filter(function (child) {
          return child.matches(PfeTabPanel.tag);
        });
      }
    }, {
      key: "_allTabs",
      value: function _allTabs() {
        return [].concat(toConsumableArray(this.children)).filter(function (child) {
          return child.matches(PfeTab.tag);
        });
      }
    }, {
      key: "_panelForTab",
      value: function _panelForTab(tab) {
        if (!tab || !tab.controls) return;

        return this.querySelector("#" + tab.controls);
      }
    }, {
      key: "_prevTab",
      value: function _prevTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected === "true";
        }) - 1;
        return tabs[(newIdx + tabs.length) % tabs.length];
      }
    }, {
      key: "_firstTab",
      value: function _firstTab() {
        var tabs = this._allTabs();
        return tabs[0];
      }
    }, {
      key: "_lastTab",
      value: function _lastTab() {
        var tabs = this._allTabs();
        return tabs[tabs.length - 1];
      }
    }, {
      key: "_nextTab",
      value: function _nextTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected === "true";
        }) + 1;
        return tabs[newIdx % tabs.length];
      }
    }, {
      key: "_getTabIndex",
      value: function _getTabIndex(_tab) {
        if (_tab) {
          var tabs = this._allTabs();
          return tabs.findIndex(function (tab) {
            return tab.id === _tab.id;
          });
        } else {
          this.warn("No tab was provided to _getTabIndex; required to return the index value.");
          return 0;
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        var tabs = this._allTabs();
        var panels = this._allPanels();

        tabs.forEach(function (tab) {
          return tab.selected = "false";
        });
        panels.forEach(function (panel) {
          return panel.hidden = true;
        });
      }
    }, {
      key: "_selectTab",
      value: function _selectTab(newTab) {
        if (!newTab) return;

        this.reset();

        var newPanel = this._panelForTab(newTab);
        var newTabSelected = false;

        if (!newPanel) this.warn("No panel was found for the selected tab" + (newTab.id ? ": pfe-tab#" + newTab.id : ""));

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
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var tabs = this._allTabs();
        var foundTab = tabs.find(function (tab) {
          return tab === event.target;
        });

        if (!foundTab) {
          return;
        }

        if (event.altKey) {
          return;
        }

        var newTab = void 0;

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
          this.warn("No new tab could be found.");
        }
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        // Find the clicked tab
        var foundTab = this._allTabs().find(function (tab) {
          return tab === event.currentTarget;
        });

        // If the tab wasn't found in the markup, exit the handler
        if (!foundTab) return;

        // Update the selected index to the clicked tab
        this.selectedIndex = this._getTabIndex(event.currentTarget);
      }
    }, {
      key: "_getTabIndexFromURL",
      value: function _getTabIndexFromURL() {
        var urlParams = void 0;

        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams

        // @Deprecated in 1.0
        // the "pfe-" prefix has been deprecated but we'll continue to support it
        // we'll give priority to the urlParams.has(`${this.id}`) attribute first
        // and fallback to urlParams.has(`pfe-${this.id}`) if it exists. We should
        // be able to remove the || part of the if statement in the future
        if (CAN_USE_URLSEARCHPARAMS) {
          urlParams = new URLSearchParams(window.location.search);

          var tabsetInUrl = urlParams.has("" + this.id) || urlParams.has("pfe-" + this.id); // remove this condition when it's no longer used in production

          if (urlParams && tabsetInUrl) {
            var id = urlParams.get("" + this.id) || urlParams.get("pfe-" + this.id); // remove this condition when it's no longer used in production
            return this._allTabs().findIndex(function (tab) {
              return tab.id === id;
            });
          }
        }

        return -1;
      }
    }, {
      key: "_popstateEventHandler",
      value: function _popstateEventHandler() {
        var tabIndexFromURL = this._getTabIndexFromURL();

        this._updateHistory = false;
        if (tabIndexFromURL > -1) this.selectedIndex = tabIndexFromURL;
      }
    }]);
    return PfeTabs;
  }(PFElement);

  PFElement.create(PfeTab);
  PFElement.create(PfeTabPanel);
  PFElement.create(PfeTabs);

  return PfeTabs;

})));
//# sourceMappingURL=pfe-tabs.umd.js.map
