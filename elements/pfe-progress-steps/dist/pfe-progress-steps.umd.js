(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeProgressSteps = factory(global.PFElement));
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
   * PatternFly Elements: PfeProgressSteps 1.6.0
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

  var PfeProgressStepsItem = function (_PFElement) {
    inherits(PfeProgressStepsItem, _PFElement);
    createClass(PfeProgressStepsItem, [{
      key: "renderIcon",
      value: function renderIcon() {
        if (this.state === "done") {
          return "<svg style=\"vertical-align:-0.125em\" fill=\"var(--pf-global--success-color--100)\" height=\"100%\" width=\"100%\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" role=\"img\" aria-describedby=\"pf-tooltip-183\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z\"></path></svg>";
        }
        if (this.state === "error") {
          return "<svg style=\"vertical-align:-0.125em\" fill=\"var(--pf-global--danger-color--100)\" height=\"100%\" width=\"100%\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" role=\"img\" aria-describedby=\"pf-tooltip-196\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path></svg>";
        }
        return "";
      }

      // static get events() {
      //   return {
      //   };
      // }

      // Declare the type of this component

    }, {
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block}:host([hidden]){display:none}.pfe-progress-steps-item__container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#151515;font-size:16px;width:auto;width:var(--pfe-progress-steps-item--Width,auto)}.pfe-progress-steps-item__circle-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative;width:32px;width:32px;width:var(--pfe-progress-steps-item__circle-wrapper--Width,var(--pfe-progress-steps-item__circle--Width,var(--pfe-progress-steps-item__circle--Size,32px)));height:32px;height:32px;height:var(--pfe-progress-steps-item__circle-wrapper--Height,var(--pfe-progress-steps-item__circle--Height,var(--pfe-progress-steps-item__circle--Size,32px)));margin:auto;position:relative}.pfe-progress-steps-item__circle--inner{display:block;position:absolute;content:\"\";border-radius:50%;border:2px solid #d2d2d2;width:32px;width:calc(32px / 2.2);width:calc(var(--pfe-progress-steps-item__circle-inner--Width,var(--pfe-progress-steps-item__circle--Width,var(--pfe-progress-steps-item__circle--Size,32px)))/ 2.2);height:32px;height:calc(32px / 2.2);height:calc(var(--pfe-progress-steps-item__circle-inner--Height,var(--pfe-progress-steps-item__circle--Height,var(--pfe-progress-steps-item__circle--Size,32px)))/ 2.2);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background:#fff;top:50%;left:50%;z-index:1}.pfe-progress-steps-item__circle--outer{display:none;position:absolute;content:\"\";border-radius:50%;opacity:.15;width:32px;width:32px;width:var(--pfe-progress-steps-item__circle-outer--Width,var(--pfe-progress-steps-item__circle--Width,var(--pfe-progress-steps-item__circle--Size,32px)));height:32px;height:32px;height:var(--pfe-progress-steps-item__circle-outer--Height,var(--pfe-progress-steps-item__circle--Height,var(--pfe-progress-steps-item__circle--Size,32px)));top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:1}.pfe-progress-steps-item__circle--icon{height:20px;width:20px}.pfe-progress-steps-item__title,.pfe-progress-steps-item__title slot::slotted(*){font-size:16px;color:#151515;color:var(--pfe-progress-steps-item__title--Color,#151515)}.pfe-progress-steps-item__description{color:#6a6e73;color:var(--pfe-progress-steps-item__description--Color,#6a6e73);font-size:14px;text-align:center}.pfe-progress-steps-item__spacer{width:auto;margin:calc(8px / 2);margin:calc(var(--pfe-progress-steps-item--spacer,8px)/ 2)}.pfe-progress-steps-item__content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}:host([hasLink]){cursor:pointer}:host([hasLink]:is(:focus,:hover)){--pfe-progress-steps-item__title--Color:var(--pfe-progress-steps-item__focus__text--Color, #0066CC);--pfe-progress-steps-item__description--Color:var(--pfe-progress-steps-item__focus__text--Color, #0066CC);text-decoration:none;-webkit-text-decoration:var(--pfe-progress-steps-item__focus--TextDecoration,none);text-decoration:var(--pfe-progress-steps-item__focus--TextDecoration,none)}:host([state=active]) .pfe-progress-steps-item__circle--inner{height:20px;width:20px;border:none;background-color:#06c;background-color:var(--pfe-progress-steps-item__circle--Color,#06c)}:host([state=active]) .pfe-progress-steps-item__circle--outer{display:block;background-color:#06c;background-color:var(--pfe-progress-steps-item__circle--Color,#06c)}:host([state=active]) .pfe-progress-steps-item__title,:host([state=active]) .pfe-progress-steps-item__title slot::slotted(*){color:#06c;color:var(--pfe-progress-steps-item__active__title--Color,#06c);font-weight:500}:host([state=done]) .pfe-progress-steps-item__circle--inner{display:none}:host([state=done]) .pfe-progress-steps-item__circle--icon{display:block;background:radial-gradient(circle,#fff 60%,rgba(255,255,255,0) 61%);background:var(--pfe-progress-steps-item__circle--Background,radial-gradient(circle,#fff 60%,rgba(255,255,255,0) 61%));--pf-global--success-color--100:#3E8635}:host([state=error]){--pfe-progress-steps-item__title--Color:#C9190B;--pfe-progress-steps-item__description--Color:#C9190B}:host([state=error]) .pfe-progress-steps-item__circle--inner{display:none}:host([state=error]) .pfe-progress-steps-item__circle--icon{display:block;background:radial-gradient(circle,#fff 60%,rgba(255,255,255,0) 61%);background:var(--pfe-progress-steps-item__circle--Background,radial-gradient(circle,#fff 60%,rgba(255,255,255,0) 61%));--pf-global--danger-color--100:#C9190B}:host([vertical]) .pfe-progress-steps-item__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}:host([vertical]) .pfe-progress-steps-item__circle-wrapper{margin:0}:host([vertical]) .pfe-progress-steps-item__title{margin-top:calc(32px / 6);margin-top:var(--pfe-progress-steps-item__vertical__title--MarginTop,calc(var(--pfe-progress-steps-item__circle--Size,32px)/ 6))}:host([vertical]) .pfe-progress-steps-item__content{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start} /*# sourceMappingURL=pfe-progress-steps-item.min.css.map */</style>\n<div class=\"pfe-progress-steps-item__container\">\n    <div class=\"pfe-progress-steps-item__circle-wrapper\">\n        <div class=\"pfe-progress-steps-item__circle--outer\"></div>\n        <div class=\"pfe-progress-steps-item__circle--inner\"></div>\n        <div class=\"pfe-progress-steps-item__circle--icon\">" + this.renderIcon() + "</div>\n    </div>\n    <div class=\"pfe-progress-steps-item__spacer\"></div>\n    <div class=\"pfe-progress-steps-item__content\">\n        <div class=\"pfe-progress-steps-item__title\">\n            <slot name=\"title\"></slot>\n        </div>\n        <div class=\"pfe-progress-steps-item__description\">\n            <slot name=\"description\"></slot>\n        </div>\n    </div>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-progress-steps-item.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-progress-steps-item.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.6.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-progress-steps-item";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Progress stepper item",
          description: "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
        };
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          state: { type: String, default: "inactive", observer: "_build" },
          vertical: { type: String, default: false },
          current: { type: Boolean, default: false, observer: "_build" }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {};
      }
    }]);

    function PfeProgressStepsItem() {
      classCallCheck(this, PfeProgressStepsItem);

      // programatically generate a link based on slot
      var _this = possibleConstructorReturn(this, (PfeProgressStepsItem.__proto__ || Object.getPrototypeOf(PfeProgressStepsItem)).call(this, PfeProgressStepsItem, { type: PfeProgressStepsItem.PfeType }));

      _this._hasLink = false;
      // programatically skip links based on state
      _this._skipLink = false;
      return _this;
    }

    createClass(PfeProgressStepsItem, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._build();
        get(PfeProgressStepsItem.prototype.__proto__ || Object.getPrototypeOf(PfeProgressStepsItem.prototype), "connectedCallback", this).call(this);
        this.addEventListener("click", this._clickHandler.bind(this));
        this.addEventListener("keydown", this._keydownHandler.bind(this));
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("click", this._clickHandler.bind(this));
        this.removeEventListener("keydown", this._keydownHandler.bind(this));
      }
    }, {
      key: "_build",
      value: function _build() {
        // decide if we should add aria-current
        if (this.current) {
          this.setAttribute("aria-current", "true");
        } else {
          this.removeAttribute("aria-current");
        }

        // find out if we should skip the link
        this._skipLink = this.current || this.state === "error";

        // Find out if there are any links
        var link = this.querySelector("a[slot=\"link\"]");
        if (link && !this._skipLink) {
          console.log(this._skipLink);
          // let the component know we have a link
          this._hasLink = true;
          this.setAttribute("hasLink", true);
          // store link in a local variable for later use.
          this._link = link;
          // Set accessibility attrs
          this.setAttribute("tabindex", "0");
          this.setAttribute("role", "link");
          var linkText = link.innerText;
          if (linkText) {
            this.setAttribute("aria-label", linkText);
          }
        } else {
          this.removeAttribute("tabindex");
          this.removeAttribute("role");
          this.removeAttribute("aria-label");
          this.removeAttribute("hasLink");
          this._hasLink = false;
        }
        this.render();
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        if (this._hasLink) {
          this._link.click();
        }
      }

      // Listen for keyboard events and map them to their
      // corresponding mouse events.

    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(event) {
        var key = event.key || event.keyCode;
        switch (key) {
          case "Enter" :
            this._clickHandler(event);
            break;
          case " " :
            // Prevent the browser from scolling when the user hits the space key
            event.stopPropagation();
            event.preventDefault();
            this._clickHandler(event);
            break;
        }
      }
    }]);
    return PfeProgressStepsItem;
  }(PFElement);

  PFElement.create(PfeProgressStepsItem);

  /*!
   * PatternFly Elements: PfeProgressSteps 1.6.0
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

  var PfeProgressSteps = function (_PFElement) {
    inherits(PfeProgressSteps, _PFElement);
    createClass(PfeProgressSteps, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;--pfe-progress-steps-item__circle--Size:var(--pfe-progress-steps__circle--Size, 32px)}:host([hidden]){display:none}.pfe-progress-steps__container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:auto;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;position:relative;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.pfe-progress-steps__progress-bar{top:15px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;height:2px;width:calc(100% - 75px);width:calc(100% - var(--pfe-progress-steps__item--Width,75px));background-color:#d2d2d2;background-color:var(--pfe-progress-steps__progress-bar--Color,#d2d2d2);left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.pfe-progress-steps__progress-bar-fill{display:block;height:2px;background:#06c;background:var(--pfe-progress-steps__progress-bar--Fill,#06c);width:0}:host(:not([vertical])){--pfe-progress-steps-item--Width:var(--pfe-progress-steps__item--Width, 75px)}:host([vertical]) .pfe-progress-steps__container{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([vertical]) .pfe-progress-steps__progress-bar{top:calc(var(--pfe-progress-steps-item__circle--Size)/ 2);left:calc(var(--pfe-progress-steps-item__circle--Size)/ 2);width:2px;width:var(--pfe-progress-steps__progress-bar--Width,2px);height:calc(100% - var(--pfe-progress-steps-item__circle--Size) * 1.3)}:host([vertical]) .pfe-progress-steps__progress-bar-fill{width:2px;width:var(--pfe-progress-steps__progress-bar--Width,2px);height:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-progress-steps{display:none}} /*# sourceMappingURL=pfe-progress-steps.min.css.map */</style>\n<div class=\"pfe-progress-steps__container\">\n    <div class=\"pfe-progress-steps__progress-bar\"><span class=\"pfe-progress-steps__progress-bar-fill\"></span></div>\n    <slot></slot>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-progress-steps.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-progress-steps.scss";
      }

      // static get events() {
      //   return {
      //   };
      // }

      // Declare the type of this component

    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.6.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-progress-steps";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Progress stepper",
          description: "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
        };
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          vertical: { type: Boolean, default: false, cascade: ["pfe-progress-steps-item"] }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {};
      }
    }]);

    function PfeProgressSteps() {
      classCallCheck(this, PfeProgressSteps);
      return possibleConstructorReturn(this, (PfeProgressSteps.__proto__ || Object.getPrototypeOf(PfeProgressSteps)).call(this, PfeProgressSteps, { type: PfeProgressSteps.PfeType }));
    }

    createClass(PfeProgressSteps, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeProgressSteps.prototype.__proto__ || Object.getPrototypeOf(PfeProgressSteps.prototype), "connectedCallback", this).call(this);
        this._build();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
    }, {
      key: "_build",
      value: function _build() {
        var stepItems = [].concat(toConsumableArray(this.querySelectorAll("pfe-progress-steps-item")));
        // find what child item has the active state
        var activeItemIndex = stepItems.findIndex(function (element) {
          return element.hasAttribute("current");
        });
        if (activeItemIndex >= 0) {
          // Calculate the width of the progress bar.
          var width = activeItemIndex / (stepItems.length - 1) * 100 + "%";
          if (this.vertical) {
            this.shadowRoot.querySelector(".pfe-progress-steps__progress-bar-fill").style.height = width;
          } else {
            this.shadowRoot.querySelector(".pfe-progress-steps__progress-bar-fill").style.width = width;
          }
        }

        // Add spacing to the each of the items except for the top item
        // @todo we have to do it in javascript until everyone supports
        // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-steps-item + pfe-progress-steps-item) { margin-top }
        if (this.vertical) {
          stepItems.forEach(function (item, index) {
            if (index === stepItems.length - 1) return;
            // @todo this needs to bee dynamic
            item.style.minHeight = "75px";
          });
        }
      }
    }]);
    return PfeProgressSteps;
  }(PFElement);

  PFElement.create(PfeProgressSteps);

  return PfeProgressSteps;

})));
//# sourceMappingURL=pfe-progress-steps.umd.js.map
