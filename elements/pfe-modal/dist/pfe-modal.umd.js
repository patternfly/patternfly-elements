(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeModal = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

  // @POLYFILL  Array.prototype.filter
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {

      if (!((typeof func === "Function" || typeof func === "function") && this)) throw new TypeError();

      var len = this.length >>> 0,
          res = new Array(len),
          // preallocate array
      t = this,
          c = 0,
          i = -1;

      var kValue;
      if (thisArg === undefined) {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            kValue = t[i]; // in case t is changed in callback
            if (func(t[i], i, t)) {
              res[c++] = kValue;
            }
          }
        }
      } else {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            kValue = t[i];
            if (func.call(thisArg, t[i], i, t)) {
              res[c++] = kValue;
            }
          }
        }
      }

      res.length = c; // shrink down array to proper size
      return res;
    };
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
   * PatternFly Elements: PfeModal 1.11.1
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

  var PfeModal = function (_PFElement) {
    inherits(PfeModal, _PFElement);
    createClass(PfeModal, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>.pfe-modal__close{background-color:transparent;border:none;margin:0;padding:0;text-align:left}:host{display:block;position:relative}.pfe-modal__outer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:fixed;height:100%;width:100%;top:0;left:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;z-index:99;z-index:var(--pfe-theme--zindex--modal,99)}.pfe-modal__outer[hidden]{display:none}.pfe-modal__overlay{position:fixed;height:100%;width:100%;top:0;left:0;background-color:rgba(21,21,21,.5);background-color:var(--pfe-modal__overlay--BackgroundColor,var(--pfe-theme--color--overlay,rgba(21,21,21,.5)));cursor:pointer}.pfe-modal__overlay[hidden]{display:none}.pfe-modal__window{--context:var(--pfe-modal--context, light);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none);position:relative;max-width:94vw;max-width:var(--pfe-modal--MaxWidth--mobile,94vw);min-width:0;min-width:var(--pfe-modal--MinWidth,0);max-height:90vh;max-height:var(--pfe-modal--MaxHeight,90vh);margin:0 auto;-webkit-box-shadow:0 .1875rem .4375rem .1875rem rgba(3,3,3,.13),0 .6875rem 1.5rem 1rem rgba(3,3,3,.12);box-shadow:0 .1875rem .4375rem .1875rem rgba(3,3,3,.13),0 .6875rem 1.5rem 1rem rgba(3,3,3,.12);-webkit-box-shadow:var(--pfe-theme--box-shadow--lg,0 .1875rem .4375rem .1875rem rgba(3,3,3,.13),0 .6875rem 1.5rem 1rem rgba(3,3,3,.12));box-shadow:var(--pfe-theme--box-shadow--lg,0 .1875rem .4375rem .1875rem rgba(3,3,3,.13),0 .6875rem 1.5rem 1rem rgba(3,3,3,.12));background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#151515;color:var(--pfe-theme--color--text,#151515);border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px)}@media screen and (min-width:640px){.pfe-modal__window{max-width:min(70rem,94vw);max-width:var(--pfe-modal-width,var(--pfe-modal--MaxWidth--large,min(70rem,94vw)))}}:host([width=small]) .pfe-modal__window{max-width:min(35rem,94vw);max-width:var(--pfe-modal--MaxWidth--small,min(35rem,94vw))}:host([width=medium]) .pfe-modal__window{max-width:min(52.5rem,94vw);max-width:var(--pfe-modal--MaxWidth--medium,min(52.5rem,94vw))}:host([width=large]) .pfe-modal__window{max-width:min(70rem,94vw);max-width:var(--pfe-modal--MaxWidth--large,min(70rem,94vw))}.pfe-modal__container{position:relative;max-height:inherit}.pfe-modal__container[hidden]{display:none}.pfe-modal__content{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain;max-height:90vh;max-height:var(--pfe-modal--MaxHeight,90vh);padding:calc(1rem * 2) calc(1rem * 3.5) calc(1rem * 2) calc(1rem * 2);padding:var(--pfe-modal--Padding,calc(var(--pfe-theme--container-padding,1rem) * 2) calc(var(--pfe-theme--container-padding,1rem) * 3.5) calc(var(--pfe-theme--container-padding,1rem) * 2) calc(var(--pfe-theme--container-padding,1rem) * 2));-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (max-height:640px){.pfe-modal__content{padding:1rem calc(1rem * 3) 1rem 1rem;padding:var(--pfe-modal--Padding,var(--pfe-theme--container-padding,1rem) calc(var(--pfe-theme--container-padding,1rem) * 3) var(--pfe-theme--container-padding,1rem) var(--pfe-theme--container-padding,1rem))}}:host(:not([has_header])) .pfe-modal__content ::slotted(:nth-child(1)),:host(:not([has_header])) .pfe-modal__content ::slotted(:nth-child(2)){margin-top:0!important}.pfe-modal__content ::slotted([slot=pfe-modal--header]){margin-top:0!important}.pfe-modal__close{position:absolute;top:calc(1rem * .25);top:calc(var(--pfe-theme--container-padding,1rem) * .25);right:calc(1rem * .25);right:calc(var(--pfe-theme--container-padding,1rem) * .25);cursor:pointer;line-height:.5;padding:1rem;padding:var(--pfe-theme--container-padding,1rem)}@media screen and (min-width:640px){.pfe-modal__close{top:1rem;top:var(--pfe-theme--container-padding,1rem);right:1rem;right:var(--pfe-theme--container-padding,1rem)}}@media screen and (max-height:640px) and (min-width:640px){.pfe-modal__close{top:calc(1rem / 2);top:calc(var(--pfe-theme--container-padding,1rem)/ 2);right:calc(1rem / 2);right:calc(var(--pfe-theme--container-padding,1rem)/ 2)}}.pfe-modal__close>svg{fill:#151515;fill:var(--pfe-theme--color--text,#151515);height:20px;height:var(--pfe-theme--ui--element--size,20px);width:20px;width:var(--pfe-theme--ui--element--size,20px);height:calc(20px - 4px);height:var(--pfe-modal__close--size,calc(var(--pfe-theme--ui--element--size,20px) - 4px));width:calc(20px - 4px);width:var(--pfe-modal__close--size,calc(var(--pfe-theme--ui--element--size,20px) - 4px))} /*# sourceMappingURL=pfe-modal.min.css.map */</style>\n<slot name=\"pfe-modal--trigger\"></slot>\n<section class=\"pfe-modal__outer\" hidden>\n\t<div class=\"pfe-modal__overlay\"></div>\n\t<div class=\"pfe-modal__window\" tabindex=\"0\" role=\"dialog\" hidden>\n\t\t<div class=\"pfe-modal__container\">\n\t\t\t<div class=\"pfe-modal__content\">\n\t\t\t\t<slot name=\"pfe-modal--header\"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t</div>\n\t\t\t<button class=\"pfe-modal__close\" aria-label=\"Close dialog\">\n\t\t\t\t<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"32\" height=\"32\" viewBox=\"-11 11 22 23\">\n\t\t\t\t\t<path d=\"M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z\" transform=\"rotate(45)\"/>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n</section>";
      }

      // Injected at build-time

    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-modal.html";
      }
    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-modal.json";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-modal.scss";
      }

      // Declare the type of this component

    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.11.1";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "trigger": { "title": "Trigger", "type": "array", "namedSlot": true, "items": { "oneOf": [{ "$ref": "raw" }] } }, "header": { "title": "Header", "type": "array", "namedSlot": true, "items": { "oneOf": [{ "$ref": "raw" }] } }, "body": { "title": "Body", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-modal";
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Container;
      }
    }, {
      key: "events",
      get: function get() {
        return {
          open: this.tag + ":open",
          close: this.tag + ":close"
        };
      }
    }]);

    function PfeModal() {
      classCallCheck(this, PfeModal);

      var _this = possibleConstructorReturn(this, (PfeModal.__proto__ || Object.getPrototypeOf(PfeModal)).call(this, PfeModal, { type: PfeModal.PfeType }));

      _this.header_id = _this.randomId;
      _this.isOpen = false;

      _this._keydownHandler = _this._keydownHandler.bind(_this);
      _this.toggle = _this.toggle.bind(_this);

      // These fire custom events
      _this.open = _this.open.bind(_this);
      _this.close = _this.close.bind(_this);
      _this._init = _this._init.bind(_this);

      _this._modalWindow = _this.shadowRoot.querySelector("." + _this.tag + "__window");
      _this._modalCloseButton = _this.shadowRoot.querySelector("." + _this.tag + "__close");
      _this._overlay = _this.shadowRoot.querySelector("." + _this.tag + "__overlay");
      _this._container = _this.shadowRoot.querySelector("." + _this.tag + "__container");
      _this._outer = _this.shadowRoot.querySelector("." + _this.tag + "__outer");

      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeModal, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeModal.prototype.__proto__ || Object.getPrototypeOf(PfeModal.prototype), "connectedCallback", this).call(this);

        this._init();

        this.addEventListener("keydown", this._keydownHandler);
        this._modalCloseButton.addEventListener("keydown", this._keydownHandler);
        this._modalCloseButton.addEventListener("click", this.close);
        this._overlay.addEventListener("click", this.close);

        this._observer.observe(this, { childList: true });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeModal.prototype.__proto__ || Object.getPrototypeOf(PfeModal.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener("keydown", this._keydownHandler);
        this._modalCloseButton.removeEventListener("click", this.close);
        this._modalCloseButton.removeEventListener("click", this.close);
        this._overlay.removeEventListener("click", this.close);

        if (this.trigger) {
          this.trigger.removeEventListener("click", this.open);
        }

        this._observer.disconnect();
      }
    }, {
      key: "_init",
      value: function _init() {
        if (window.ShadyCSS) this._observer.disconnect();

        this.trigger = this.querySelector("[slot=\"" + this.tag + "--trigger\"]");
        this.header = this.querySelector("[slot=\"" + this.tag + "--header\"]");
        this.body = [].concat(toConsumableArray(this.querySelectorAll("*:not([slot])")));

        if (this.trigger) {
          this.trigger.addEventListener("click", this.open);
          this.removeAttribute("hidden");
        }

        if (this.header) {
          this.header.id = this.header_id;
          this._modalWindow.setAttribute("aria-labelledby", this.header_id);
        } else {
          // Get the first heading in the modal if it exists
          var headings = this.body.filter(function (el) {
            return el.tagName.slice(0, 1) === "H";
          });
          if (headings.length > 0) {
            headings[0].id = this.header_id;
            this._modalWindow.setAttribute("aria-labelledby", this.header_id);
          } else if (this.trigger) {
            this._modalWindow.setAttribute("aria-label", this.trigger.innerText);
          }
        }

        if (window.ShadyCSS) this._observer.observe(this, { childList: true });
      }
    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(event) {
        var target = event.target || window.event.srcElement;
        var key = event.key || event.keyCode;
        switch (key) {
          case "Tab":
          case 9:
            if (target === this._modalCloseButton) {
              event.preventDefault();
              this._modalWindow.focus();
            }
            return;
          case "Escape":
          case "Esc":
          case 27:
            this.close(event);
            return;
          case "Enter":
          case 13:
            if (target === this.trigger) {
              this.open(event);
            }
            return;
        }
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        this.isOpen ? this.close(event) : this.open(event);
        return this;
      }
    }, {
      key: "open",
      value: function open(event) {
        if (event) {
          event.preventDefault();
          this.trigger = event ? event.target : window.event.srcElement;
        }

        var detail = {
          open: true
        };

        if (event && this.trigger) {
          detail.trigger = this.trigger;
        }

        this.isOpen = true;
        // Reveal the container and overlay
        this._modalWindow.removeAttribute("hidden");
        this._overlay.removeAttribute("hidden");
        this._outer.removeAttribute("hidden");
        // This prevents background scroll
        document.body.style.overflow = "hidden";
        // Set the focus to the container
        this._modalWindow.focus();

        this.emitEvent(PfeModal.events.open, { detail: detail });

        return this;
      }
    }, {
      key: "close",
      value: function close(event) {
        if (event) {
          event.preventDefault();
        }

        this.isOpen = false;
        // Hide the container and overlay
        this._modalWindow.setAttribute("hidden", true);
        this._overlay.setAttribute("hidden", true);
        this._outer.setAttribute("hidden", true);
        // Return scrollability
        document.body.style.overflow = "auto";

        if (this.trigger) {
          // Move focus back to the trigger element
          this.trigger.focus();
          this.trigger = null;
        }

        this.emitEvent(PfeModal.events.close, {
          detail: {
            open: false
          }
        });

        return this;
      }
    }]);
    return PfeModal;
  }(PFElement);

  PFElement.create(PfeModal);

  return PfeModal;

})));
//# sourceMappingURL=pfe-modal.umd.js.map
