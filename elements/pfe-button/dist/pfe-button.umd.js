(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeButton = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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
   * PatternFly Elements: PfeButton 1.9.3
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

  // @IE11
  // watching for addition and removal of nodes so
  // we can make sure we have the correct light DOM
  // and so we can set the _externalBtn property
  var parentObserverConfig = {
    childList: true
  };

  // watching for changes on the _externalBtn so we can
  // update text in our shadow DOM when the _externalBtn
  // changes
  var externalBtnObserverConfig = {
    characterData: true,
    attributes: true,
    subtree: true,
    childList: true
  };

  // list of attributes that we DO NOT want to pass from
  // the _externalBtn to our shadow DOM button. For example,
  // the style attribute could ruin our encapsulated styles
  // in the shadow DOM
  var denylistAttributes = ["style"];

  var PfeButton = function (_PFElement) {
    inherits(PfeButton, _PFElement);
    createClass(PfeButton, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:inline-block}:host([hidden]){display:none}:host([variant=primary]) button,button{background-color:#06c;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--ui-accent,#06c));color:#fff;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-base--text,#fff));font-size:1rem;font-size:var(--pfe-button--FontSize,var(--pf-global--FontSize--md,1rem));font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);padding:calc(1rem / 2) 1rem;padding:var(--pfe-button--Padding,calc(var(--pfe-theme--container-padding,1rem)/ 2) var(--pfe-theme--container-padding,1rem));cursor:pointer;border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px));border:0;border:var(--pfe-button--Border,0);position:relative;line-height:1.5;line-height:var(--pfe-button--LineHeight,var(--pfe-theme--line-height,1.5))}:host([variant=primary]) button::after,button::after{position:absolute;top:0;left:0;right:0;bottom:0;content:\"\";border:1px solid transparent;border:var(--pfe-button__after--Border,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-button__after--BorderColor,transparent));border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px))}:host([variant=primary]) button:focus,:host([variant=primary]) button:hover,button:focus,button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--ui-accent--hover, #004080));--pfe-button__after--Border:var(--pfe-button__after--Border--hover, var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor--hover, transparent))}:host([variant=danger]) button{background-color:#c9190b;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--feedback--critical--lighter,#c9190b))}:host([variant=danger]) button:focus,:host([variant=danger]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--feedback--critical, #a30000))}:host([variant=control]) button,:host([variant=secondary]) button,:host([variant=tertiary]) button{background-color:transparent;background-color:var(--pfe-button--BackgroundColor,transparent)}:host([variant=control]) button:focus,:host([variant=control]) button:hover,:host([variant=secondary]) button:focus,:host([variant=secondary]) button:hover,:host([variant=tertiary]) button:focus,:host([variant=tertiary]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, transparent);--pfe-button__after--Border:var(--pfe-button__after--Border--hover, var(--pfe-theme--ui--border-width--md, 2px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent))}:host([variant=secondary]) button{color:#06c;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-accent,#06c))}:host([variant=secondary]) button::after{border-color:#06c;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}:host([variant=tertiary]) button{color:#151515;color:var(--pfe-button--Color,var(--pfe-theme--color--text,#151515))}:host([variant=tertiary]) button::after{border-color:#151515;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--text,#151515))}:host([variant=control]) button{color:#151515;color:var(--pfe-button--Color,var(--pfe-theme--color--text,#151515));border-radius:0;border-radius:var(--pfe-button--BorderRadius,0)}:host([variant=control]) button:focus,:host([variant=control]) button:hover{--pfe-button__after--BorderColor:var(--pfe-button--BorderColor--hover, var(--pfe-theme--color--ui--border--lightest, #f0f0f0))}:host([variant=control]) button:focus::after,:host([variant=control]) button:hover::after{border-bottom-width:2px;border-bottom-width:var(--pfe-theme--ui--border-width--md,2px);border-bottom-color:#06c;border-bottom-color:var(--pfe-theme--color--ui-accent,#06c)}:host([variant=control]) button::after{border-color:#f0f0f0;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--ui--border--lightest,#f0f0f0));border-bottom-color:#8a8d90;border-bottom-color:var(--pfe-theme--color--ui--border,#8a8d90)}:host([variant=control][disabled]) button{background-color:#f0f0f0;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--surface--lighter,#f0f0f0))}:host([disabled]) button{background-color:#d2d2d2;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--ui-disabled,#d2d2d2));color:#6a6e73;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-disabled--text,#6a6e73));pointer-events:none}:host([disabled]) button::after{border:0;border:var(--pfe-button__after--Border,0)}:host([disabled]) button:focus,:host([disabled]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--ui-disabled, #d2d2d2));--pfe-button__after--Border:var(--pfe-button__after--Border--hover, 0)} /*# sourceMappingURL=pfe-button.min.css.map */</style>\n<span id=\"internalBtn\"></span>";
      }

      // Injected at build-time

    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-button.json";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-button.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-button.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.3";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "default": { "title": "Default slot", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "button" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-button";
      }
    }, {
      key: "events",
      get: function get() {
        return {
          click: this.tag + ":click"
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
          variant: {
            title: "Style variant",
            type: String,
            values: ["primary", "secondary", "tertiary", "danger", "control"]
          },
          pfeVariant: {
            type: String,
            values: ["primary", "secondary", "tertiary", "danger", "control"],
            alias: "variant"
          },
          disabled: {
            title: "Disabled",
            type: Boolean,
            prefix: false,
            observer: "_disabledChanged"
          }
        };
      }
    }]);

    function PfeButton() {
      classCallCheck(this, PfeButton);

      var _this = possibleConstructorReturn(this, (PfeButton.__proto__ || Object.getPrototypeOf(PfeButton)).call(this, PfeButton, { type: PfeButton.PfeType }));

      _this._init = _this._init.bind(_this);
      _this._parentObserverHandler = _this._parentObserverHandler.bind(_this);
      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._internalBtnContainer = _this.shadowRoot.querySelector("#internalBtn");
      _this._observer = new MutationObserver(_this._parentObserverHandler);
      _this._externalBtnClickHandler = _this._externalBtnClickHandler.bind(_this);
      _this._externalBtnObserver = new MutationObserver(_this._init);

      _this.addEventListener("click", _this._clickHandler);
      return _this;
    }

    createClass(PfeButton, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeButton.prototype.__proto__ || Object.getPrototypeOf(PfeButton.prototype), "connectedCallback", this).call(this);

        if (this.hasLightDOM()) this._init();

        this._observer.observe(this, parentObserverConfig);

        if (this._externalBtn) {
          this._externalBtnObserver.observe(this._externalBtn, externalBtnObserverConfig);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeButton.prototype.__proto__ || Object.getPrototypeOf(PfeButton.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener("click", this._clickHandler);
        this._observer.disconnect();
        this._externalBtnObserver.disconnect();
      }
    }, {
      key: "_disabledChanged",
      value: function _disabledChanged(oldVal, newVal) {
        if (!this._externalBtn) {
          return;
        }

        if (newVal) {
          this._externalBtn.setAttribute("disabled", "");
        } else {
          this._externalBtn.removeAttribute("disabled");
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        if (!this._isValidLightDom()) {
          return;
        }

        if (!this._externalBtn) {
          return;
        }

        this._externalBtnObserver.disconnect();

        // If the external button has a disabled attribute
        if (this._externalBtn.hasAttribute("disabled")) {
          // Set it on the wrapper too
          this.setAttribute("disabled", "");
        }

        var clone = this._externalBtn.cloneNode(true);
        denylistAttributes.forEach(function (attribute) {
          if (clone.hasAttribute) {
            clone.removeAttribute(attribute);
          }
        });

        this._internalBtnContainer.innerHTML = clone.outerHTML;
        this._externalBtnObserver.observe(this._externalBtn, externalBtnObserverConfig);

        this._externalBtn.addEventListener("click", this._externalBtnClickHandler);
      }
    }, {
      key: "_isValidLightDom",
      value: function _isValidLightDom() {
        if (!this.hasLightDOM()) {
          this.warn("You must have a button in the light DOM");
          return false;
        }
        if (this.children[0].tagName !== "BUTTON") {
          this.warn("The only child in the light DOM must be a button tag");

          return false;
        }

        return true;
      }

      // when the parent changes, make sure the light DOM is valid,
      // initialize the component

    }, {
      key: "_parentObserverHandler",
      value: function _parentObserverHandler() {
        if (!this._isValidLightDom()) {
          return;
        }

        this._init();
      }

      // programmatically clicking the _externalBtn is what makes
      // this web component button work in a form as you'd expect

    }, {
      key: "_clickHandler",
      value: function _clickHandler() {
        this._externalBtn.click();
      }
    }, {
      key: "_externalBtnClickHandler",
      value: function _externalBtnClickHandler() {
        this.emitEvent(PfeButton.events.click);
      }
    }, {
      key: "_externalBtn",
      get: function get() {
        return this.querySelector("button");
      }
    }]);
    return PfeButton;
  }(PFElement);

  PFElement.create(PfeButton);

  return PfeButton;

})));
//# sourceMappingURL=pfe-button.umd.js.map
