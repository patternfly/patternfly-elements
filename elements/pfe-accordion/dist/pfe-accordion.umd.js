(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeAccordion = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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
   * PatternFly Elements: PfeAccordion 1.7.0
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
        return "\n<style>:host{-webkit-transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946),-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946)),-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));display:block}:host([hidden]){display:none}:host>*{margin:0}:host button{--pfe-accordion--BorderBottomWidth:0;--pfe-accordion--ZIndex:3;--pfe-accordion__trigger--Padding:var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) 50px var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) calc(var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) * 1.5);margin:0;width:100%;width:var(--pfe-accordion--Width,100%);max-width:100%;height:auto;position:relative;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));border-width:0;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-top-width:1px;border-top-width:var(--pfe-accordion--BorderTopWidth,var(--pfe-theme--surface--border-width,1px));border-right-width:0;border-right-width:var(--pfe-accordion--BorderRightWidth,0);border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderBottomWidth,var(--pfe-theme--surface--border-width,1px));border-left-width:4px;border-left-width:var(--pfe-accordion--BorderLeftWidth,var(--pfe-theme--surface--border-width--heavy,4px));border-left-color:transparent;border-left-color:var(--pfe-accordion--BorderColor--accent,transparent);-webkit-box-shadow:var(--pfe-accordion--BoxShadow);box-shadow:var(--pfe-accordion--BoxShadow);z-index:var(--pfe-accordion--ZIndex);cursor:pointer;font-family:inherit;font-size:calc(1rem * 1.1);font-size:var(--pfe-accordion--FontSize--header,calc(var(--pfe-theme--font-size,1rem) * 1.1));font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;text-align:var(--pfe-accordion--TextAlign,left);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:var(--pfe-accordion__trigger--Padding)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button{border-top-width:1px;border-right-width:0;border-bottom-width:1px;border-left-width:4px}}:host button:focus,:host button:hover{--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button:focus,:host button:hover{border-left-color:#06c}}:host button:hover{outline:0;border-left-width:4px;border-left-width:var(--pfe-theme--surface--border-width--heavy,4px)}:host button:focus{outline:0;text-decoration:underline}:host button::-moz-focus-inner{border:0}@supports (-ms-ime-align:auto){:host button{text-align:left}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button{padding:16px 24px}:host button:hover{border-left-color:#06c}}:host button[aria-expanded=true]{--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--BackgroundColor:white;--pfe-accordion--Color:var(--pfe-theme--color--text, #151515);--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c));--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-accordion--ZIndex:3}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button[aria-expanded=true]{border-bottom-width:0;border-left-color:#06c;border-right-color:#d2d2d2}}:host(:not([disclosure=true])) button::after{content:\"\";position:absolute;top:calc(1rem + .4em);top:calc(var(--pfe-theme--container-spacer,1rem) + .4em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(1rem * 1.3125);right:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125)}:host(:not([disclosure=true])) button[aria-expanded=true]::after{-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}:host(:last-of-type) button:not([aria-expanded=true]){--pfe-accordion--BorderBottomWidth:var(--pfe-theme--surface--border-width, 1px)}:host(:last-of-type.animating) button{--pfe-accordion--BorderBottomWidth:0}:host([on=dark]) button[aria-expanded=true]{--pfe-accordion--BackgroundColor:rgba(247, 247, 249, 0.1);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7);--pfe-accordion--BoxShadow:none}:host([on=saturated]) button[aria-expanded=true]{--pfe-accordion--BackgroundColor:rgba(0, 0, 0, 0.2);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff);--pfe-accordion--BoxShadow:none}:host([disclosure=true]) button{padding-left:calc(1rem * 3);padding-left:calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([disclosure=true]) button{padding:16px 24px 16px 47px;border-right-color:#d2d2d2;border-left-color:#d2d2d2;border-left-width:1px}}:host([disclosure=true]) button::before{content:\"\";position:absolute;top:calc(1rem + .55em);top:calc(var(--pfe-theme--container-spacer,1rem) + .55em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);left:calc(1rem * 1.3125);left:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125);-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([disclosure=true]) button[aria-expanded=true]::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host([disclosure=true]) button:not([aria-expanded=true]):hover,:host([disclosure=true]) button[aria-expanded=true]{padding-left:calc(1rem * 3 - 4px + 1px);padding-left:calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3 - var(--pfe-theme--surface--border-width--heavy,4px) + var(--pfe-theme--surface--border-width,1px))}:host([disclosure=true]) button:not([aria-expanded=true]):hover::before,:host([disclosure=true]) button[aria-expanded=true]::before{margin-left:calc((4px - 1px) * -1);margin-left:calc((var(--pfe-theme--surface--border-width--heavy,4px) - var(--pfe-theme--surface--border-width,1px)) * -1)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([disclosure=true]) button:not([aria-expanded=true]):hover,:host([disclosure=true]) button[aria-expanded=true]{border-left-color:#06c;border-left-width:4px;border-right-color:#d2d2d2}} /*# sourceMappingURL=pfe-accordion-header.min.css.map */</style>\n";
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
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-accordion-header";
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
            cascade: "#pfe-accordion-header--button",
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
      _this._createButton = _this._createButton.bind(_this);
      return _this;
    }

    createClass(PfeAccordionHeader, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAccordionHeader.prototype.__proto__ || Object.getPrototypeOf(PfeAccordionHeader.prototype), "connectedCallback", this).call(this);

        if (this.hasLightDOM()) this._init();

        this.addEventListener("click", this._clickHandler);
        this._observer.observe(this, {
          childList: true
        });
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
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        var existingButton = this.shadowRoot.querySelector("#" + this.tag + "--button");
        var button = existingButton || this._createButton();
        var existingHeader = existingButton ? existingButton.parentElement : null;
        var header = this._getHeaderElement();

        if (header) {
          var wrapperTag = document.createElement(header.tagName.toLowerCase() || "h3");
          if (existingHeader && existingHeader.tagName === header.tagName) {
            wrapperTag = existingHeader;
          } else if (existingHeader && existingHeader.tagName !== header.tagName) {
            existingHeader.remove();
          }

          button.innerText = header.innerText;

          wrapperTag.appendChild(button);
          this.shadowRoot.appendChild(wrapperTag);
        } else {
          button.innerText = this.textContent.trim();
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, {
            childList: true
          });
        }
      }
    }, {
      key: "_getHeaderElement",
      value: function _getHeaderElement() {
        var _this2 = this;

        // Check if there is no nested element or nested textNodes
        if (!this.firstElementChild && !this.firstChild) {
          this.warn("No header content provided");
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
            if (slotted.length > 1) this.warn("Heading currently only supports 1 tag.");
            var htags = slotted.filter(function (slot) {
              return slot.tagName.match(/^H[1-6]/) || slot.tagName === "P";
            });
            if (htags.length > 0) {
              // Return the first htag and attach an observer event to watch for it
              slotted.forEach(function (slot) {
                return _this2._slotObserver.observe(slot, {
                  characterData: true,
                  childList: true,
                  subtree: true
                });
              });
              return htags[0];
            } else return;
          } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
            return this.firstElementChild;
          } else {
            this.warn("Heading should contain at least 1 heading tag for correct semantics.");
          }
        }

        return;
      }
    }, {
      key: "_createButton",
      value: function _createButton() {
        var expanded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "false";

        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-expanded", expanded);
        button.id = this.tag + "--button";
        return button;
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        this.emitEvent(PfeAccordionHeader.events.change, {
          detail: {
            expanded: !this.expanded
          }
        });
      }
    }, {
      key: "_expandedChanged",
      value: function _expandedChanged() {
        this.setAttribute("aria-expanded", this.expanded);

        var button = this.shadowRoot.querySelector("#" + this.tag + "--button");
        if (button) button.setAttribute("aria-expanded", this.expanded);
      }
    }]);
    return PfeAccordionHeader;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeAccordion 1.7.0
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
        return "\n<style>.container{position:relative;display:block;width:100%;padding:1rem;padding:var(--pfe-theme--container-spacer,1rem)}:host{display:none;overflow:hidden;will-change:height;border-color:transparent;opacity:0;margin:0;width:100%;width:var(--pfe-accordion--Width,100%);max-width:100%;height:auto;position:relative;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));border-width:0;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-top-width:1px;border-top-width:var(--pfe-accordion--BorderTopWidth,var(--pfe-theme--surface--border-width,1px));border-right-width:0;border-right-width:var(--pfe-accordion--BorderRightWidth,0);border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderBottomWidth,var(--pfe-theme--surface--border-width,1px));border-left-width:4px;border-left-width:var(--pfe-accordion--BorderLeftWidth,var(--pfe-theme--surface--border-width--heavy,4px));border-left-color:transparent;border-left-color:var(--pfe-accordion--BorderColor--accent,transparent);-webkit-box-shadow:var(--pfe-accordion--BoxShadow);box-shadow:var(--pfe-accordion--BoxShadow);z-index:var(--pfe-accordion--ZIndex);-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{border-top-width:1px;border-right-width:0;border-bottom-width:1px;border-left-width:4px}}:host:focus,:host:hover{--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host:focus,:host:hover{border-left-color:#06c}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}.container{--pfe-accordion--BoxShadow:none;padding:var(--pfe-accordion__panel-container--Padding);padding:0 calc(1rem * 3) 1rem calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 var(--pfe-accordion__panel--Padding,calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3)) var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) var(--pfe-accordion__panel--Padding,calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5)))}.container::after{clear:both;content:\"\";display:table}:host([disclosure=true]) .container{padding:0 calc(1rem * 3) calc(1rem) calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3) calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem))) calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5))}pfe-jump-links-nav .container{padding:0;padding:var(--pfe-accordion__panel-container--Padding,0);--pfe-accordion__panel-container--Padding:0}@media (max-width:767px){pfe-jump-links-nav .container{padding:0;padding:var(--pfe-accordion__panel-container--Padding,0)}}:host(:last-of-type[expanded]){margin-bottom:0}:host(.animating),:host([expanded]){--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--BackgroundColor:white;--pfe-accordion--Color:var(--pfe-theme--color--text, #151515);--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c));--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-accordion--ZIndex:3;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);display:block;position:relative;opacity:1}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(.animating),:host([expanded]){border-top-width:0;border-left-color:#06c;border-left-color:var(--pfe-theme--color--ui-accent,#06c);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2)}}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:rgba(247, 247, 249, 0.1);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7);--pfe-accordion--BoxShadow:none;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:none}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:rgba(0, 0, 0, 0.2);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff);--pfe-accordion--BoxShadow:none;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:none} /*# sourceMappingURL=pfe-accordion-panel.min.css.map */</style>\n<div tabindex=\"-1\">\n  <div class=\"container\">\n    <slot></slot>\n  </div>\n</div>";
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
        return "1.7.0";
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
            default: false
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
      }
    }]);
    return PfeAccordionPanel;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeAccordion 1.7.0
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
        return "\n<style>:host{--pfe-accordion--BorderColor--accent:transparent;--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderTopWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderRightWidth:0;--pfe-accordion--BorderBottomWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--TextAlign:left;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion__base--Padding:var(--pfe-theme--container-spacer, 1rem);display:block;position:relative;overflow:hidden;margin:0;color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;color:#151515!important}}:host([on=dark]){--pfe-accordion--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7)}:host([on=saturated]){--pfe-accordion--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff)}:host([disclosure=true]){--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--surface--border, #d2d2d2)}:host([hidden]){display:none} /*# sourceMappingURL=pfe-accordion.min.css.map */</style>\n<slot></slot>";
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
        return "1.7.0";
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
      _this.expanded = [];

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

        this.emitEvent(PfeAccordion.events.expand);
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

        this.emitEvent(PfeAccordion.events.collapse);
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

        // If this index is not already listed in the expanded array, add it
        if (this.expanded.indexOf(index) < 0 && index > -1) this.expanded.push(index);

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
        var idx = this.expanded.indexOf(index);
        if (idx >= 0) this.expanded.splice(idx, 1);

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

        if (!this._isHeader(currentHeader)) {
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

          var index = this._getIndex(newHeader);
          this.expand(index);
          this._setFocus = true;
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
        indexes.reverse().map(function (index) {
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
       * @requires this.expanded {Array}
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
        var openIndexes = this.expanded.map(function (item) {
          return item + 1;
        }).sort(function (a, b) {
          return a - b;
        }).join("-");

        // If values exist in the array, add them to the parameter string
        if (this.expanded.length > 0) urlParams.set(this.id, openIndexes);
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
