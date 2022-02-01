(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-icon/dist/pfe-icon.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-icon/dist/pfe-icon.umd'], factory) :
  (global = global || self, global.PfeAccordion = factory(global.PFElement, global.PfeIcon));
}(this, (function (PFElement, pfeIcon_umd) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;
  pfeIcon_umd = pfeIcon_umd && Object.prototype.hasOwnProperty.call(pfeIcon_umd, 'default') ? pfeIcon_umd['default'] : pfeIcon_umd;

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
      }
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
   * PatternFly Elements: PfeAccordion 1.12.3
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

  var PfeAccordionHeader = function (_PFElement) {
    inherits(PfeAccordionHeader, _PFElement);
    createClass(PfeAccordionHeader, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle{background-color:#fff!important;color:#151515!important}}:host{position:relative;display:block;outline:0;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));-webkit-box-shadow:0 5px 4px transparent;box-shadow:0 5px 4px transparent;-webkit-box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);--pfe-icon--color:var(--pfe-accordion--Color, var(--pfe-broadcasted--text, #3c3f42));--pfe-icon--size:14px}:host([hidden]){display:none}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}#heading{margin:0}.pf-c-accordion__toggle{cursor:pointer;outline:0;position:relative;width:100%;margin:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;gap:calc(1rem * 1.5);gap:calc(var(--pfe-theme--container-padding,1rem) * 1.5);padding:1rem calc(1rem * 1.5);padding:var(--pfe-accordion--Padding,var(--pfe-theme--container-padding,1rem) calc(var(--pfe-theme--container-padding,1rem) * 1.5));background-color:transparent;color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));text-align:left;font-family:\"Red Hat Display\",RedHatDisplay,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, \"Red Hat Display\", \"RedHatDisplay\", \"Overpass\", Overpass, Arial, sans-serif);font-size:1.25rem;font-size:var(--pfe-accordion--FontSize--header,var(--pf-global--FontSize--xl,1.25rem));font-weight:400;font-weight:var(--pfe-accordion--FontWeight--header,var(--pfe-theme--font-weight--normal,400));text-align:left;text-align:var(--pfe-accordion--TextAlign,left);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);--_typography-offset:calc((1em * var(--pfe-theme--line-height, 1.5) - 1em) / 2);border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:1px;border-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-right-color:transparent;border-left-color:transparent}.pf-c-accordion__toggle::before{position:absolute;content:\"\";top:-2px;left:-2px;width:calc(100% + 3px);width:calc(100% + var(--pfe-theme--ui--border-width--active,3px));height:calc(100% + 3px);height:calc(100% + var(--pfe-theme--ui--border-width--active,3px));border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);border:2px solid transparent;border:var(--pfe-theme--ui--border-width--md,2px) var(--pfe-theme--ui--border-style,solid) transparent}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle::before{height:100%}}.pf-c-accordion__toggle:focus::before{border-color:#6b9ff0}.pf-c-accordion__toggle:focus:not(:focus-visible)::before{border:unset}.pf-c-accordion__toggle .pf-c-accordion__toggle-icon{--_typography-offset:calc((1em * var(--pfe-theme--line-height, 1.5) - var(--pfe-icon--size, 14px)) / 2)}.pf-c-accordion__toggle .pf-c-accordion__toggle-text{margin-top:calc(-1 * 5px);margin-top:calc(-1 * var(--_typography-offset,5px));margin-bottom:calc(-1 * 5px);margin-bottom:calc(-1 * var(--_typography-offset,5px))}.pf-c-accordion__toggle .pf-c-accordion__toggle-icon{margin-top:calc(5px / 4);margin-top:calc(var(--_typography-offset,5px)/ 4)}:host(:not(:first-of-type)) .pf-c-accordion__toggle{border-top-width:0}.pf-c-accordion__toggle::after{position:absolute;content:\"\";top:-1px;left:-1px;bottom:-1px;background-color:transparent;background-color:var(--pfe-accordion--accent,transparent);width:calc(3px - -1px);width:calc(var(--pfe-accordion--accent--width,var(--pfe-theme--surface--border-width--active,3px)) - -1px);height:calc(100% - -1px - -1px);z-index:4;z-index:calc(3 + 1);z-index:calc(var(--pfe-accordion--ZIndex,3) + 1)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle::after:active,.pf-c-accordion__toggle::after:hover,:host(.animating) .pf-c-accordion__toggle::after,:host(:not([expanded])) .pf-c-accordion__toggle::after:focus,:host([expanded]) .pf-c-accordion__toggle::after{background-color:#06c;background-color:var(--pfe-theme--color--ui-accent,#06c)}}.pf-c-accordion__toggle:active,.pf-c-accordion__toggle:hover,:host(:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, var(--pfe-theme--color--surface--lighter, #f0f0f0));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host(:not([expanded])) .pf-c-accordion__toggle:active,:host(:not([expanded])) .pf-c-accordion__toggle:focus,:host(:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent, #06c))}:host([on=dark]) .pf-c-accordion__toggle:active,:host([on=dark]) .pf-c-accordion__toggle:hover,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:active,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:focus,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([on=saturated]) .pf-c-accordion__toggle:active,:host([on=saturated]) .pf-c-accordion__toggle:hover,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:active,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:focus,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host(.animating) .pf-c-accordion__toggle,:host([expanded]) .pf-c-accordion__toggle{border-bottom-width:0}:host(.animating) .pf-c-accordion__toggle,:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle,:host([expanded]) .pf-c-accordion__toggle{border-right-color:#d2d2d2;border-right-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-left-color:#d2d2d2;border-left-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2))}:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle{gap:calc(1rem / 2);gap:calc(var(--pfe-theme--container-padding,1rem)/ 2);font-family:\"Red Hat Text\",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Red Hat Text\", \"RedHatText\", \"Overpass\", Overpass, Arial, sans-serif);font-size:1rem;font-size:var(--pfe-accordion--FontSize--header,var(--pf-global--FontSize--md,1rem));font-weight:600;font-weight:var(--pfe-accordion--FontWeight--header,var(--pfe-theme--font-weight--semi-bold,600))}.pf-c-accordion__toggle-wrapper{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;gap:calc(1rem * 1.5);gap:calc(var(--pfe-theme--container-padding,1rem) * 1.5)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle-wrapper::after{content:\"\";position:absolute;top:calc(1rem + 14px);top:calc(var(--pfe-theme--container-spacer,1rem) + 14px);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:14px;width:14px;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 2px 2px 0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:calc(1rem * 1.3125);right:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125);top:1em!important}:host(.animating) .pf-c-accordion__toggle-wrapper::after,:host([expanded]) .pf-c-accordion__toggle-wrapper::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}}.pf-c-accordion__toggle-text{max-width:80ch;max-width:var(--pfe-accordion--MaxWidth--content,80ch)}.pf-c-accordion__toggle-icon{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-duration:var(--pfe-theme--animation-speed,.3s);transition-duration:var(--pfe-theme--animation-speed,.3s);-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946))}:host([expanded]) .pf-c-accordion__toggle-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle-icon{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;order:-1}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle-icon{display:none!important}}.pf-c-accordion__toggle-accents{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}:host{-webkit-transition-property:border,-webkit-box-shadow;transition-property:border,-webkit-box-shadow;transition-property:box-shadow,border;transition-property:box-shadow,border,-webkit-box-shadow;-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-transition-duration:calc(pfe-var(animation-speed)/ 2);transition-duration:calc(pfe-var(animation-speed)/ 2)}:host(.animating),:host([expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, var(--pfe-theme--color--surface--lightest, #fff));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text, #3c3f42));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent, #06c))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, 0 5px 4px rgba(140, 140, 140, 0.35))}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-dark, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-saturated, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)} /*# sourceMappingURL=pfe-accordion-header.min.css.map */</style>\n<" + (this.headingTag || "h3") + " id=\"heading\">\n    <button aria-expanded=\"" + (this.expanded ? "true" : "false") + "\" id=\"button\" class=\"pf-c-accordion__toggle\">\n        <span class=\"pf-c-accordion__toggle-wrapper\">\n            <span class=\"pf-c-accordion__toggle-text\">" + (this.headingText || "<slot></slot>") + "</span>\n            " + (this.hasSlot("accents") ? "<span class=\"pf-c-accordion__toggle-accents\"><slot name=\"accents\"></slot></span>" : "") + "\n        </span>\n        <pfe-icon icon=\"web-icon-caret-thin-right\" on-fail=\"collapse\" class=\"pf-c-accordion__toggle-icon\"></pfe-icon>\n    </button>\n</" + (this.headingTag || "h3") + ">";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-accordion-header.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-accordion-header.html";
      }

      // @TODO this is for navigation 1.0 updates
      // get isDirectLink() {
      //   return this.hasAttribute("is-direct-link");
      // }

      // get link() {
      //   return this.querySelector("a[href]");
      // }

    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-accordion-header";
      }
    }, {
      key: "observer",
      get: function get() {
        return {
          childList: true
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          _id: {
            type: String,
            default: function _default(el) {
              return "" + el.randomId.replace("pfe", el.tag);
            },
            prefix: false
          },
          ariaControls: {
            type: String,
            prefix: false
          },
          // @TODO Deprecated pfe-id in 1.0
          oldPfeId: {
            type: String,
            alias: "_id",
            attr: "pfe-id"
          },
          expanded: {
            title: "Expanded",
            type: Boolean,
            observer: "_expandedChanged"
          }
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {
          change: "pfe-accordion:change"
        };
      }
    }]);

    function PfeAccordionHeader() {
      classCallCheck(this, PfeAccordionHeader);

      var _this = possibleConstructorReturn(this, (PfeAccordionHeader.__proto__ || Object.getPrototypeOf(PfeAccordionHeader)).call(this, PfeAccordionHeader));

      _this._init = _this._init.bind(_this);
      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      _this._slotObserver = new MutationObserver(_this._init);

      _this._getHeaderElement = _this._getHeaderElement.bind(_this);

      _this.headingTag = "h3";

      _this.addEventListener("click", _this._clickHandler);
      return _this;
    }

    createClass(PfeAccordionHeader, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAccordionHeader.prototype.__proto__ || Object.getPrototypeOf(PfeAccordionHeader.prototype), "connectedCallback", this).call(this);

        // Capture the button and the text
        this.button = this.shadowRoot.querySelector(".pf-c-accordion__toggle");
        this._buttonText = this.button.querySelector(".pf-c-accordion__toggle-text");

        if (this.hasLightDOM()) this._init();else {
          this._observer.observe(this, PfeAccordionHeader.observer);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeAccordionHeader.prototype.__proto__ || Object.getPrototypeOf(PfeAccordionHeader.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener("click", this._clickHandler);
        this._observer.disconnect();
      }
    }, {
      key: "_init",
      value: function _init() {
        this._observer.disconnect();

        var header = this._getHeaderElement();

        if (header) {
          this.headingTag = header.tagName ? header.tagName.toLowerCase() : "h3";
          this.headingText = header.textContent ? header.textContent.trim() : "";
        }

        // Update button text
        this._buttonText.innerHTML = this.headingText;

        // Remove the hidden attribute after upgrade
        this.removeAttribute("hidden");

        this._observer.observe(this, PfeAccordionHeader.observer);

        // @TODO this is for navigation 1.0 updates
        // Validate that headers with the `is-direct-link` attribute contain a link
        // if (this.isDirectLink && !this.link) {
        //   this.warn(`This component expects to find a link in the light DOM due to the "is-direct-link" attribute`);
        // }
      }
    }, {
      key: "_getHeaderElement",
      value: function _getHeaderElement() {
        // Check if there is no nested element or nested textNodes
        if (!this.firstElementChild && !this.firstChild) {
          this.warn("No header content provided");
          return;
        }

        if (this.firstElementChild && this.firstElementChild.tagName) {
          var htags = this.fetchElement(this.children, function (el) {
            return el.tagName && (el.tagName.match(/^H[1-6]/) || el.tagName === "P");
          }, this._slotObserver);

          // If there is no content inside the slot, return empty with a warning
          if (htags.length === 0) {
            this.warn("No heading information was provided.");
            return;
          }
          // If there is more than 1 element in the slot, capture the first h-tag
          else if (htags.length > 1) {
              this.warn("Heading currently only supports 1 tag; extra tags will be ignored.");
              return htags[0];
            } else return htags[0];
        } else {
          var htag = document.createElement("h3");

          if (this.firstChild && this.firstChild.nodeType === "#text") {
            // If a text node was provided but no semantics, default to an h3
            htag.textContent = this.firstChild.textContent;
          } else {
            this.warn("Header should contain at least 1 heading tag for correct semantics.");

            // If incorrect semantics were used, create an H3 and try to capture the content
            htag.textContent = this.textContent;
          }

          return htag;
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        this.emitEvent(PfeAccordionHeader.events.change, {
          detail: {
            expanded: !this.expanded,
            toggle: event.target
          }
        });
      }
    }, {
      key: "_expandedChanged",
      value: function _expandedChanged() {
        if (this.button) {
          this.button.setAttribute("aria-expanded", this.expanded ? "true" : "false");
        }
      }

      /**
       * Provides a standard way of fetching light DOM that may or may not be provided inside
       * of a slot; optional filtering of results and way to pass in an observer if you need to
       * track updates to the slot
       * @param  {NodeItem} el
       * @param  {function} filter [optional] Filter for the returned results of the NodeList
       * @param  {function} observer [optional] Pointer to the observer defined for that slot
       */

    }, {
      key: "fetchElement",
      value: function fetchElement(els, filter, observer) {
        if (!els) return [];
        var nodes = [].concat(toConsumableArray(els));

        // Parse the nodes for slotted content
        [].concat(toConsumableArray(nodes)).filter(function (node) {
          return node && node.tagName === "SLOT";
        }).forEach(function (node) {
          // Remove node from the list
          var idx = nodes.findIndex(function (item) {
            return item === node;
          });
          // Capture it's assigned nodes for validation
          var slotted = node.assignedNodes();
          // If slotted elements were found, add it to the nodeList
          if (slotted && slotted.length > 0) {
            // Remove the slot from the set, add the slotted content
            nodes.splice.apply(nodes, [idx, 1].concat(toConsumableArray(slotted)));
          } else {
            // If no content exists in the slot, check for default content in the slot template
            var defaults = node.children;
            if (defaults && defaults.length > 0) nodes[idx] = defaults[0];
          }

          // Attach the observer if provided to watch for updates to the slot
          // Useful if you are moving content from light DOM to shadow DOM
          if (typeof observer === "function") {
            observer.observer(node, PfeAccordionHeader.observer);
          }
        });

        if (typeof filter === "function") return nodes.filter(filter);else return nodes;
      }
    }]);
    return PfeAccordionHeader;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeAccordion 1.12.3
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

  var PfeAccordionPanel = function (_PFElement) {
    inherits(PfeAccordionPanel, _PFElement);
    createClass(PfeAccordionPanel, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:none;overflow:hidden;will-change:height}:host([expanded]){display:block;position:relative}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}.pf-c-accordion__expanded-content{position:relative;display:block;width:100%;padding:1rem;padding:var(--pfe-theme--container-padding,1rem)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;color:#151515!important}}:host{display:block;position:relative;-webkit-transition:height .3s cubic-bezier(.465,.183,.153,.946);transition:height .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:height var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:height var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));will-change:height;overflow-y:clip;height:0;width:100%;z-index:0;margin:0;padding:0;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));-webkit-box-shadow:0 5px 4px transparent;box-shadow:0 5px 4px transparent;-webkit-box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);-webkit-box-sizing:border-box;box-sizing:border-box;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-width:1px;border-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));border-top-width:0;border-bottom-width:0}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host ::slotted(*){--pfe-accordion--BoxShadow:none}:host::after{position:absolute;content:\"\";bottom:calc(-1 * 1px);bottom:calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px)));left:calc(-1 * 1px);left:calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px)));background-color:transparent;background-color:var(--pfe-accordion--accent,transparent);width:calc(3px - calc(-1 * 1px));width:calc(var(--pfe-accordion--accent--width,var(--pfe-theme--surface--border-width--active,3px)) - calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px))));height:calc(100% - calc(-1 * 1px));height:calc(100% - calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px))));z-index:calc(3 + 1);z-index:calc(var(--pfe-accordion--ZIndex,3) + 1)}.pf-c-accordion__expanded-content{display:inline-block;padding:1rem calc(1rem * 1.5);padding:var(--pfe-accordion--Padding,var(--pfe-theme--container-padding,1rem) calc(var(--pfe-theme--container-padding,1rem) * 1.5))}.pf-c-accordion__expanded-content::after{clear:both;content:\"\";display:table}:host([disclosure=true]) .pf-c-accordion__expanded-content{padding:0 calc(1rem * 3) calc(1rem) calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 calc(var(--pfe-theme--container-padding,1rem) * 3) calc(var(--pfe-theme--container-padding,1rem)) calc(var(--pfe-theme--container-padding,1rem) * 1.5))}:host(:not([full-width])) .pf-c-accordion__expanded-content{max-width:80ch;max-width:var(--pfe-accordion--MaxWidth--content,80ch)}:host(.animating){border-left-color:transparent;border-left-color:var(--pfe-accordion--accent,transparent)}:host([expanded]:not(.animating)){overflow:visible;margin-bottom:0;border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));opacity:1;height:auto}:host{-webkit-transition-property:border,-webkit-box-shadow;transition-property:border,-webkit-box-shadow;transition-property:box-shadow,border;transition-property:box-shadow,border,-webkit-box-shadow;-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-transition-duration:calc(pfe-var(animation-speed)/ 2);transition-duration:calc(pfe-var(animation-speed)/ 2)}:host(.animating),:host([expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, var(--pfe-theme--color--surface--lightest, #fff));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text, #3c3f42));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent, #06c))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, 0 5px 4px rgba(140, 140, 140, 0.35))}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-dark, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-saturated, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)} /*# sourceMappingURL=pfe-accordion-panel.min.css.map */</style>\n<div tabindex=\"-1\">\n  <div id=\"container\" class=\"pf-c-accordion__expanded-content\">\n    <slot></slot>\n  </div>\n</div>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-accordion-panel.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-accordion-panel.html";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-accordion-panel";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          _id: {
            type: String,
            default: function _default(el) {
              return "" + el.randomId.replace("pfe", el.tag);
            },
            prefix: false
          },
          role: {
            type: String,
            default: "region",
            prefix: false
          },
          // @TODO Deprecated pfe-id in 1.0
          oldPfeId: {
            type: String,
            alias: "_id",
            attr: "pfe-id"
          },
          expanded: {
            title: "Expanded",
            type: Boolean,
            default: false,
            observer: "_expandedChanged"
          },
          ariaLabelledby: {
            type: String,
            prefix: false
          }
        };
      }
    }]);

    function PfeAccordionPanel() {
      classCallCheck(this, PfeAccordionPanel);
      return possibleConstructorReturn(this, (PfeAccordionPanel.__proto__ || Object.getPrototypeOf(PfeAccordionPanel)).call(this, PfeAccordionPanel));
    }

    createClass(PfeAccordionPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAccordionPanel.prototype.__proto__ || Object.getPrototypeOf(PfeAccordionPanel.prototype), "connectedCallback", this).call(this);
        this._expandedChanged();
      }
    }, {
      key: "_expandedChanged",
      value: function _expandedChanged() {
        if (this.expanded) {
          this.removeAttribute("aria-hidden");
          this.removeAttribute("tabindex");
        } else {
          this.setAttribute("aria-hidden", "true");
          this.setAttribute("tabindex", "-1");
        }
      }
    }]);
    return PfeAccordionPanel;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeAccordion 1.12.3
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

  var PfeAccordion = function (_PFElement) {
    inherits(PfeAccordion, _PFElement);
    createClass(PfeAccordion, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;position:relative;overflow:hidden;margin:0;width:100%;width:var(--pfe-accordion--Width,100%)}:host{overflow:visible}:host([hidden]){display:none} /*# sourceMappingURL=pfe-accordion.min.css.map */</style>\n<slot></slot>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-accordion.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-accordion.html";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-accordion";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Accordion",
          description: "This element renders content sets in an expandable format."
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          disclosure: {
            // Leaving this as a string since it's an opt out
            title: "Disclosure",
            type: String,
            values: ["true", "false"],
            cascade: ["pfe-accordion-header", "pfe-accordion-panel"]
          },
          // @TODO: Deprecated pfe-disclosure in 1.0
          oldDisclosure: {
            type: String,
            alias: "disclosure",
            attr: "pfe-disclosure"
          },
          // Do not set a default of 0, it causes a the URL history to
          // be updated on load for every tab; infinite looping goodness
          // Seriously, don't set a default here unless you do a rewrite
          expandedIndex: {
            title: "Expanded index(es)",
            type: String,
            observer: "_expandedIndexHandler"
          },
          history: {
            title: "History",
            type: Boolean,
            default: false,
            observer: "_historyHandler"
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          default: {
            type: "array",
            namedSlot: false,
            items: {
              oneOf: [{
                $ref: "pfe-accordion-header"
              }, {
                $ref: "pfe-accordion-panel"
              }]
            }
          }
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {
          change: this.tag + ":change",
          expand: this.tag + ":expand",
          collapse: this.tag + ":collapse"
        };
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Container;
      }

      // Each set contains a header and a panel

    }, {
      key: "contentTemplate",
      get: function get() {
        return "\n    <pfe-accordion-header content-type=\"header\"></pfe-accordion-header>\n    <pfe-accordion-panel content-type=\"panel\"></pfe-accordion-panel>\n    ";
      }
    }]);

    function PfeAccordion() {
      classCallCheck(this, PfeAccordion);

      var _this = possibleConstructorReturn(this, (PfeAccordion.__proto__ || Object.getPrototypeOf(PfeAccordion)).call(this, PfeAccordion, { type: PfeAccordion.PfeType }));

      _this._manualDisclosure = null;
      _this._updateHistory = true;
      _this.expandedSets = [];

      _this._init = _this._init.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      _this._updateStateFromURL = _this._updateStateFromURL.bind(_this);
      _this._getIndexesFromURL = _this._getIndexesFromURL.bind(_this);
      _this._updateURLHistory = _this._updateURLHistory.bind(_this);
      return _this;
    }

    createClass(PfeAccordion, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAccordion.prototype.__proto__ || Object.getPrototypeOf(PfeAccordion.prototype), "connectedCallback", this).call(this);

        if (this.hasLightDOM()) {
          this._manualDisclosure = this.getAttribute("disclosure") || this.getAttribute("pfe-disclosure");

          Promise.all([customElements.whenDefined(PfeAccordionHeader.tag), customElements.whenDefined(PfeAccordionPanel.tag)]).then(this._init);
        }

        this.addEventListener(PfeAccordion.events.change, this._changeHandler);
        this.addEventListener("keydown", this._keydownHandler);

        // Set up the observer on the child tree
        this._observer.observe(this, {
          childList: true
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeAccordion.prototype.__proto__ || Object.getPrototypeOf(PfeAccordion.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
        this.removeEventListener("keydown", this._keydownHandler);
        this._observer.disconnect();

        window.removeEventListener("popstate", this._updateStateFromURL);
      }

      /**
       * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
       * @param {Number} index
       */

    }, {
      key: "toggle",
      value: function toggle(index) {
        var headers = this._allHeaders();
        var header = headers[index];

        if (!header.expanded) this.expand(index);else this.collapse(index);
      }

      /**
       * Accepts a 0-based index value (integer) for the set of accordion items to expand.
       * @param {Number} index
       */

    }, {
      key: "expand",
      value: function expand(_index) {
        if (_index === undefined || _index === null) return;

        // Ensure the input is a number
        var index = parseInt(_index, 10);

        // Get all the headers and capture the item by index value
        var headers = this._allHeaders();
        var header = headers[index];
        if (!header) return;

        var panel = this._panelForHeader(header);
        if (!header || !panel) return;

        // If the header and panel exist, open both
        this._expandHeader(header);
        this._expandPanel(panel);

        header.focus();

        this.emitEvent(PfeAccordion.events.expand, {
          detail: {
            toggle: header,
            panel: panel
          }
        });
      }

      /**
       * Expands all accordion items.
       */

    }, {
      key: "expandAll",
      value: function expandAll() {
        var _this2 = this;

        var headers = this._allHeaders();
        var panels = this._allPanels();

        headers.forEach(function (header) {
          return _this2._expandHeader(header);
        });
        panels.forEach(function (panel) {
          return _this2._expandPanel(panel);
        });
      }

      /**
       * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
       * @param {Number} index
       */

    }, {
      key: "collapse",
      value: function collapse(index) {
        var headers = this._allHeaders();
        var panels = this._allPanels();
        var header = headers[index];
        var panel = panels[index];

        if (!header || !panel) return;

        this._collapseHeader(header);
        this._collapsePanel(panel);

        this.emitEvent(PfeAccordion.events.collapse, {
          detail: {
            toggle: header,
            panel: panel
          }
        });
      }

      /**
       * Collapses all accordion items.
       */

    }, {
      key: "collapseAll",
      value: function collapseAll() {
        var _this3 = this;

        var headers = this._allHeaders();
        var panels = this._allPanels();

        headers.forEach(function (header) {
          return _this3._collapseHeader(header);
        });
        panels.forEach(function (panel) {
          return _this3._collapsePanel(panel);
        });
      }

      /**
       * Initialize the accordion by connecting headers and panels
       * with aria controls and labels; set up the default disclosure
       * state if not set by the author; and check the URL for default
       * open
       */

    }, {
      key: "_init",
      value: function _init() {
        var _this4 = this;

        var headers = this._allHeaders();
        // For each header in the accordion, attach the aria connections
        headers.forEach(function (header) {
          var panel = _this4._panelForHeader(header);
          // Escape if no matching panel can be found
          if (!panel) return;

          header.ariaControls = panel._id;
          panel.ariaLabelledby = header._id;
        });

        // If disclosure was not set by the author, set up the defaults
        if (!this._manualDisclosure) {
          if (headers.length === 1) {
            this.disclosure = "true";
          } else if (headers.length > 1) {
            this.disclosure = "false";
          }
        }

        // Update state if params exist in the URL
        if (!this.isIE11) this._updateStateFromURL();
      }
    }, {
      key: "_changeHandler",
      value: function _changeHandler(evt) {
        if (this.classList.contains("animating")) return;

        var index = this._getIndex(evt.target);

        if (evt.detail.expanded) this.expand(index);else this.collapse(index);

        this._updateURLHistory();
      }
    }, {
      key: "_historyHandler",
      value: function _historyHandler() {
        if (!this.history) window.removeEventListener("popstate", this._updateStateFromURL);else window.addEventListener("popstate", this._updateStateFromURL);
      }
    }, {
      key: "_expandHeader",
      value: function _expandHeader(header) {
        var index = this._getIndex(header);

        // If this index is not already listed in the expandedSets array, add it
        if (this.expandedSets.indexOf(index) < 0 && index > -1) this.expandedSets.push(index);

        header.expanded = true;
      }
    }, {
      key: "_expandPanel",
      value: function _expandPanel(panel) {
        if (!panel) {
          this.error("Trying to expand a panel that doesn't exist.");
          return;
        }

        if (panel.expanded) return;

        panel.expanded = true;

        var height = panel.getBoundingClientRect().height;
        this._animate(panel, 0, height);
      }
    }, {
      key: "_collapseHeader",
      value: function _collapseHeader(header) {
        var index = this._getIndex(header);

        // If this index is exists in the expanded array, remove it
        var idx = this.expandedSets.indexOf(index);
        if (idx >= 0) this.expandedSets.splice(idx, 1);

        header.expanded = false;
      }
    }, {
      key: "_collapsePanel",
      value: function _collapsePanel(panel) {
        if (!panel) {
          this.error("Trying to collapse a panel that doesn't exist");
          return;
        }

        if (!panel.expanded) return;

        var height = panel.getBoundingClientRect().height;
        panel.expanded = false;

        this._animate(panel, height, 0);
      }
    }, {
      key: "_animate",
      value: function _animate(panel, start, end) {
        var _this5 = this;

        if (panel) {
          var header = panel.previousElementSibling;
          if (header) {
            header.classList.add("animating");
          }
          panel.classList.add("animating");
          panel.style.height = start + "px";

          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              panel.style.height = end + "px";
              panel.addEventListener("transitionend", _this5._transitionEndHandler);
            });
          });
        }
      }
    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(evt) {
        var currentHeader = evt.target;

        if (!(currentHeader instanceof customElements.get(PfeAccordionHeader.tag))) {
          return;
        }

        var newHeader = void 0;

        switch (evt.key) {
          case "ArrowDown":
          case "Down":
          case "ArrowRight":
          case "Right":
            newHeader = this._nextHeader();
            break;
          case "ArrowUp":
          case "Up":
          case "ArrowLeft":
          case "Left":
            newHeader = this._previousHeader();
            break;
          case "Home":
            newHeader = this._firstHeader();
            break;
          case "End":
            newHeader = this._lastHeader();
            break;
          default:
            return;
        }

        if (newHeader) {
          newHeader.shadowRoot.querySelector("button").focus();
        }
      }
    }, {
      key: "_transitionEndHandler",
      value: function _transitionEndHandler(evt) {
        var header = evt.target.previousElementSibling;
        if (header) header.classList.remove("animating");

        evt.target.style.height = "";
        evt.target.classList.remove("animating");
        evt.target.removeEventListener("transitionend", this._transitionEndHandler);
      }
    }, {
      key: "_allHeaders",
      value: function _allHeaders() {
        if (!this.isIE11) return [].concat(toConsumableArray(this.querySelectorAll(":scope > pfe-accordion-header")));else return this.children.filter(function (el) {
          return el.tagName.toLowerCase() === "pfe-accordion-header";
        });
      }
    }, {
      key: "_allPanels",
      value: function _allPanels() {
        if (!this.isIE11) return [].concat(toConsumableArray(this.querySelectorAll(":scope > pfe-accordion-panel")));else return this.children.filter(function (el) {
          return el.tagName.toLowerCase() === "pfe-accordion-panel";
        });
      }
    }, {
      key: "_panelForHeader",
      value: function _panelForHeader(header) {
        var next = header.nextElementSibling;

        if (!next) return;

        if (next.tagName.toLowerCase() !== PfeAccordionPanel.tag) {
          this.error("Sibling element to a header needs to be a panel");
          return;
        }

        return next;
      }
    }, {
      key: "_previousHeader",
      value: function _previousHeader() {
        var headers = this._allHeaders();
        var newIndex = headers.findIndex(function (header) {
          return header === document.activeElement;
        }) - 1;
        return headers[(newIndex + headers.length) % headers.length];
      }
    }, {
      key: "_nextHeader",
      value: function _nextHeader() {
        var headers = this._allHeaders();
        var newIndex = headers.findIndex(function (header) {
          return header === document.activeElement;
        }) + 1;
        return headers[newIndex % headers.length];
      }
    }, {
      key: "_firstHeader",
      value: function _firstHeader() {
        var headers = this._allHeaders();
        return headers[0];
      }
    }, {
      key: "_lastHeader",
      value: function _lastHeader() {
        var headers = this._allHeaders();
        return headers[headers.length - 1];
      }
    }, {
      key: "_isHeader",
      value: function _isHeader(element) {
        return element.tagName.toLowerCase() === PfeAccordionHeader.tag;
      }
    }, {
      key: "_isPanel",
      value: function _isPanel(element) {
        return element.tagName.toLowerCase() === PfeAccordionPanel.tag;
      }
    }, {
      key: "_expandedIndexHandler",
      value: function _expandedIndexHandler(oldVal, newVal) {
        var _this6 = this;

        if (oldVal === newVal) return;
        var indexes = newVal.split(",").map(function (idx) {
          return parseInt(idx, 10) - 1;
        });
        indexes.reverse().forEach(function (index) {
          return _this6.expand(index);
        });
      }
    }, {
      key: "_getIndex",
      value: function _getIndex(_el) {
        if (this._isHeader(_el)) {
          var headers = this._allHeaders();
          return headers.findIndex(function (header) {
            return header.id === _el.id;
          });
        }

        if (this._isPanel(_el)) {
          var panels = this._allPanels();
          return panels.findIndex(function (panel) {
            return panel.id === _el.id;
          });
        }

        this.warn("The _getIndex method expects to receive a header or panel element.");
        return -1;
      }
    }, {
      key: "_getIndexesFromURL",
      value: function _getIndexesFromURL() {
        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams
        if (!window.URLSearchParams) return [];

        // Capture the URL parameters
        var urlParams = new URLSearchParams(window.location.search);

        // If parameters exist and they contain the ID for this accordion
        if (urlParams && urlParams.has(this.id)) {
          var params = urlParams.get(this.id);
          // Split the parameters by underscore to see if more than 1 item is expanded
          var indexes = params.split("-");
          if (indexes.length < 0) return [];

          // Clean up the results by converting to array count
          return indexes.map(function (item) {
            return parseInt(item.trim(), 10) - 1;
          });
        }
      }

      /**
       * This handles updating the URL parameters based on the current state
       * of the global this.expanded array
       * @requires this.expandedSets {Array}
       */

    }, {
      key: "_updateURLHistory",
      value: function _updateURLHistory() {
        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams
        if (!this.history || !this._updateHistory || !window.URLSearchParams) return;

        if (!this.id) {
          this.error("The history feature cannot update the URL without an ID added to the pfe-accordion tag.");
          return;
        }

        // Capture the URL and rebuild it using the new state
        var urlParams = new URLSearchParams(window.location.search);
        // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
        // sort values numerically and connect them using a dash
        var openIndexes = this.expandedSets.map(function (item) {
          return item + 1;
        }).sort(function (a, b) {
          return a - b;
        }).join("-");

        // If values exist in the array, add them to the parameter string
        if (this.expandedSets.length > 0) urlParams.set(this.id, openIndexes);
        // Otherwise delete the set entirely
        else urlParams.delete(this.id);

        // Note: Using replace state protects the user's back navigation
        history.replaceState({}, "", "" + window.location.pathname + (urlParams ? "?" + urlParams.toString() : "") + window.location.hash);
      }

      /**
       * This captures the URL parameters and expands each item in the array
       * @requires this._getIndexesFromURL {Method}
       */

    }, {
      key: "_updateStateFromURL",
      value: function _updateStateFromURL() {
        var _this7 = this;

        var indexesFromURL = this._getIndexesFromURL() || [];

        this._updateHistory = false;
        indexesFromURL.forEach(function (idx) {
          return _this7.expand(idx);
        });
        this._updateHistory = true;
      }
    }]);
    return PfeAccordion;
  }(PFElement);

  PFElement.create(PfeAccordionHeader);
  PFElement.create(PfeAccordionPanel);
  PFElement.create(PfeAccordion);

  return PfeAccordion;

})));
//# sourceMappingURL=pfe-accordion.umd.js.map
