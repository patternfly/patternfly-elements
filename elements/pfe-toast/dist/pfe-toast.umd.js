(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeToast = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

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

  /*!
   * PatternFly Elements: PfeToast 1.0.0-prerelease.55
   * @license
   * Copyright 2020 Red Hat, Inc.
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

  var PfeToast = function (_PFElement) {
    inherits(PfeToast, _PFElement);
    createClass(PfeToast, [{
      key: "html",
      get: function get$$1() {
        return "<style>@charset \"UTF-8\";:host{-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;position:absolute;right:calc(-1 * (500px + 50px));right:var(--pfe-toast--Right,calc(-1 * (var(--pfe-toast--MaxWidth,500px) + var(--pfe-toast--Right--offset,50px))));top:50px;top:var(--pfe-toast--Top,50px);-webkit-transition:right .3s cubic-bezier(.465,.183,.153,.946);transition:right .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:right var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:right var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));will-change:right;max-width:500px;max-width:var(--pfe-toast--MaxWidth,500px);min-width:250px;min-width:var(--pfe-toast--MinWidth,250px)}@media only screen and (max-width:575px){:host{max-width:calc(500px / 2);max-width:calc(var(--pfe-toast--MaxWidth,500px)/ 2);min-width:calc(250px / 2);min-width:calc(var(--pfe-toast--MinWidth,250px)/ 2)}}:host([hidden]){display:none}:host(.open){--pfe-toast--Right:50px}:host(:not(.open)){--pfe-toast--Right:calc(-1 * var(--pfe-toast--MaxWidth, 500px) + var(--pfe-toast--Right--offset, 50px))}::slotted(:first-child){margin-top:0}::slotted(button){background:0 0;border-radius:0;display:inline-block;margin-bottom:0;margin-right:1rem;padding: .5rem .75rem;text-align:center}.pfe-toast__container{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;background-color:#fff;background-color:var(--pfe-toast__container--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));-webkit-box-shadow:rgba(3,3,3,.13) 0 3px 7px 3px,rgba(3,3,3,.12) 0 11px 24px 16px;box-shadow:rgba(3,3,3,.13) 0 3px 7px 3px,rgba(3,3,3,.12) 0 11px 24px 16px;-webkit-box-shadow:var(--pfe-toast__container--BoxShadow,rgba(3,3,3,.13) 0 3px 7px 3px,rgba(3,3,3,.12) 0 11px 24px 16px);box-shadow:var(--pfe-toast__container--BoxShadow,rgba(3,3,3,.13) 0 3px 7px 3px,rgba(3,3,3,.12) 0 11px 24px 16px);color:#151515;color:var(--pfe-toast__container--Color,var(--pfe-theme--color--text,#151515));padding:1rem;padding:var(--pfe-toast__container--Padding,1rem)}.pfe-toast__content{-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto}.pfe-toast__close{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;background-color:transparent;border:none;cursor:pointer;margin:0;padding:0;padding:var(--pfe-toast__close--Padding,var(--pfe-toast__close--PaddingTop,0) var(--pfe-toast__close--PaddingRight,0) var(--pfe-toast__close--PaddingBottom,0) var(--pfe-toast__close--PaddingLeft,0))}.pfe-toast__close>svg{fill:#3c3f42;fill:var(--pfe-toast__close--svg--Fill,var(--pfe-theme--color--feedback--default--darkest,#3c3f42));height:12px;height:var(--pfe-toast__close--svg--Height,12px);width:12px;width:var(--pfe-toast__close--svg--Width,12px)}.pfe-toast__close:hover>svg{fill:#333;fill:var(--pfe-toast__close--svg--Fill--hover,#333)}\n/*# sourceMappingURL=pfe-toast.min.css.map */\n</style><div class=\"pfe-toast__container\">\n    <div class=\"pfe-toast__content\">\n        <slot></slot>\n    </div>\n    <button class=\"pfe-toast__close\">\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"32\"\n            height=\"32\" viewBox=\"-11 11 22 23\">\n            <path\n                d=\"M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z\"\n                transform=\"rotate(45)\" />\n        </svg>\n    </button>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-toast.html";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-toast.json";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-toast.scss";
      }
    }, {
      key: "closeLabel",
      get: function get$$1() {
        return this.getAttribute("close-label") || "Close";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "auto_dismiss": { "title": "Auto dismiss", "type": "string" }, "close_label": { "title": "Close label", "type": "string" } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-toast";
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Container;
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["auto-dismiss", "close-label"];
      }
    }]);

    function PfeToast() {
      classCallCheck(this, PfeToast);

      // state
      var _this = possibleConstructorReturn(this, (PfeToast.__proto__ || Object.getPrototypeOf(PfeToast)).call(this, PfeToast));

      _this.isOpen = false;
      _this.doesAutoDismiss = false;

      // elements
      _this._container = _this.shadowRoot.querySelector("." + _this.tag + "__container");
      _this._content = _this.shadowRoot.querySelector("." + _this.tag + "__content");
      _this._toastCloseButton = _this.shadowRoot.querySelector("." + _this.tag + "__close");

      // events
      _this.open = _this.open.bind(_this);
      _this.close = _this.close.bind(_this);
      _this.toggle = _this.toggle.bind(_this);
      return _this;
    }

    createClass(PfeToast, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case "close-label":
            this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
          case "auto-dismiss":
            this.doesAutoDismiss = !!newValue;
            this._setAccessibility();
          default:
            break;
        }
      }
    }, {
      key: "_setAccessibility",
      value: function _setAccessibility() {
        if (!this.doesAutoDismiss) {
          this.removeAttribute("aria-live");
          this.removeAttribute("aria-atomic");

          this.setAttribute("role", "alertdialog");
          // default if none provided
          if (!this.hasAttribute("aria-label")) {
            this.setAttribute("aria-label", "Alert dialog");
          }
          this.setAttribute("aria-describedby", this.tag + "__content");
        } else {
          this.removeAttribute("aria-label");
          this.removeAttribute("aria-describedby");

          this.setAttribute("role", "alert");
          this.setAttribute("aria-live", "polite");
          this.setAttribute("aria-atomic", "true");
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeToast.prototype.__proto__ || Object.getPrototypeOf(PfeToast.prototype), "connectedCallback", this).call(this);

        // get/set state
        this.doesAutoDismiss = this.hasAttribute("auto-dismiss");
        this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
        this._setAccessibility();
        this.setAttribute("hidden", "");

        // attach listeners
        this._toastCloseButton.addEventListener("click", this.close);
        this.addEventListener("keydown", this._keydownHandler);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._toastCloseButton.removeEventListener("click", this.close);
        this.removeEventListener("keydown", this._keydownHandler);
      }
    }, {
      key: "open",
      value: function open(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        this.isOpen = true;

        this.removeAttribute("hidden");
        setTimeout(function () {
          _this2.classList.add("open");
        }, 500);

        this.dispatchEvent(new CustomEvent(this.tag + ":open", {
          detail: {},
          bubbles: true
        }));

        if (this.doesAutoDismiss) {
          setTimeout(function () {
            _this2.close();
          }, this._toMilliseconds(this.getAttribute("auto-dismiss")));
        }

        return this;
      }
    }, {
      key: "close",
      value: function close(event) {
        var _this3 = this;

        if (event) {
          event.preventDefault();
        }

        this.isOpen = false;

        this.classList.remove("open");
        setTimeout(function () {
          _this3.setAttribute("hidden", "");
        }, 500);

        this.dispatchEvent(new CustomEvent(this.tag + ":close", {
          detail: {},
          bubbles: true
        }));

        return this;
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        this.isOpen ? this.close(event) : this.open(event);
        return this;
      }
    }, {
      key: "_toMilliseconds",
      value: function _toMilliseconds(value) {
        // set default delay if none provided
        var digits = value.match(/\d+/) || [8000];
        var unit = value.match(/\D+/) || "";
        return unit[0] === "s" ? digits[0] * 1000 : digits[0];
      }
    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(event) {
        var target = event.target || window.event.srcElement;
        var key = event.key || event.keyCode;
        switch (key) {
          case "Escape":
          case "Esc":
          case 27:
            this.close(event);
            break;
          case "Enter":
          case 13:
            if (target === this._toastCloseButton) {
              this.close(event);
            }
            break;
          default:
            break;
        }
      }
    }]);
    return PfeToast;
  }(PFElement);

  PFElement.create(PfeToast);

  return PfeToast;

})));
//# sourceMappingURL=pfe-toast.umd.js.map
