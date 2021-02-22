(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeButton = factory(global.PFElement));
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
   * PatternFly Elements: PfeButton 1.0.0-prerelease.56
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
      get: function get$$1() {
        return "<style>:host{display:inline-block}:host([hidden]){display:none}:host([pfe-variant=primary]) button,button{background-color:#06c;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--ui-accent,#06c));color:#fff;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-base--text,#fff));font-size:16px;font-size:var(--pfe-button--FontSize,var(--pfe-theme--font-size,16px));font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);padding:calc(16px / 2) 16px;padding:var(--pfe-button--Padding,calc(var(--pfe-theme--container-padding,16px)/ 2) var(--pfe-theme--container-padding,16px));cursor:pointer;border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px));border:0;border:var(--pfe-button--Border,0);position:relative;line-height:1.5;line-height:var(--pfe-button--LineHeight,var(--pfe-theme--line-height,1.5))}:host([pfe-variant=primary]) button::after,button::after{position:absolute;top:0;left:0;right:0;bottom:0;content:\"\";border:1px solid transparent;border:var(--pfe-button__after--Border,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-button__after--BorderColor,transparent));border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px))}:host([pfe-variant=primary]) button:focus,:host([pfe-variant=primary]) button:hover,button:focus,button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--ui-accent--hover, #004080));--pfe-button__after--Border:var(--pfe-button__after--Border--hover, var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor--hover, transparent))}:host([pfe-variant=secondary]){--pfe-button--BackgroundColor:transparent;--pfe-button--BackgroundColor--hover:transparent;--pfe-button--Color:var(--pfe-theme--color--ui-accent, #06c);--pfe-button__after--BorderColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-button__after--Border--hover:var(--pfe-theme--ui--border-width--md, 2px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent)}:host([pfe-variant=tertiary]){--pfe-button--BackgroundColor:transparent;--pfe-button--BackgroundColor--hover:transparent;--pfe-button--Color:var(--pfe-theme--color--text, #151515);--pfe-button__after--BorderColor:var(--pfe-theme--color--text, #151515);--pfe-button__after--Border--hover:var(--pfe-theme--ui--border-width--md, 2px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent)}:host([pfe-variant=danger]){--pfe-button--BackgroundColor:var(--pfe-theme--color--feedback--critical--lighter, #c9190b);--pfe-button--BackgroundColor--hover:var(--pfe-theme--color--feedback--critical, #a30000)}:host([pfe-variant=control]){--pfe-button--BackgroundColor:transparent;--pfe-button--BackgroundColor--hover:transparent;--pfe-button--Color:var(--pfe-theme--color--text, #151515);--pfe-button--BorderRadius:0;--pfe-button__after--BorderColor:var(--pfe-theme--color--ui--border--lightest, #f0f0f0);--pfe-button__after--BorderColor--hover:var(--pfe-theme--color--ui--border--lightest, #f0f0f0)}:host([pfe-variant=control]) button::after{border-bottom-color:#8a8d90;border-bottom-color:var(--pfe-theme--color--ui--border,#8a8d90)}:host([pfe-variant=control]) button:focus::after,:host([pfe-variant=control]) button:hover::after{border-bottom-width:2px;border-bottom-width:var(--pfe-theme--ui--border-width--md,2px);border-bottom-color:#06c;border-bottom-color:var(--pfe-theme--color--ui-accent,#06c)}:host([pfe-variant=control][disabled]){--pfe-button--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0)}:host([disabled]){--pfe-button--BackgroundColor:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-button--BackgroundColor--hover:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-button--Color:var(--pfe-theme--color--ui-disabled--text, #6a6e73);--pfe-button__after--Border:0;--pfe-button__after--Border--hover:0;pointer-events:none}\n/*# sourceMappingURL=pfe-button.min.css.map */\n</style><span id=\"internalBtn\"></span>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-button.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-button.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-button.scss";
      }
    }, {
      key: "disabled",
      get: function get$$1() {
        return this.hasAttribute("disabled");
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.56";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "variant": { "title": "Style variant", "type": "string", "prefixed": true, "enum": ["primary", "secondary", "tertiary", "danger", "control"] } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "default": { "title": "Default slot", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "button" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-button";
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          click: this.tag + ":click"
        };
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["disabled"];
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
        this._externalBtn = this.querySelector("button");

        if (this.children.length) {
          this._init();
        }

        this._observer.observe(this, parentObserverConfig);

        if (this._externalBtn) {
          this._externalBtnObserver.observe(this._externalBtn, externalBtnObserverConfig);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("click", this._clickHandler);
        this._observer.disconnect();
        this._externalBtnObserver.disconnect();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        get(PfeButton.prototype.__proto__ || Object.getPrototypeOf(PfeButton.prototype), "attributeChangedCallback", this).call(this, attr, oldVal, newVal);

        switch (attr) {
          case "disabled":
            if (!this._externalBtn) {
              return;
            }

            if (this.disabled) {
              this._externalBtn.setAttribute("disabled", "");
            } else {
              this._externalBtn.removeAttribute("disabled");
            }
            break;
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

        if (this._externalBtn.hasAttribute("disabled")) {
          this.setAttribute("disabled", "");
        } else {
          this.removeAttribute("disabled");
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
        if (!this.children.length) {
          console.warn(PfeButton.tag + ": You must have a button in the light DOM");
          return false;
        }

        if (this.children[0].tagName !== "BUTTON") {
          console.warn(PfeButton.tag + ": The only child in the light DOM must be a button tag");

          return false;
        }

        return true;
      }

      // when the parent changes, make sure the light DOM is valid,
      // set the _externalBtn, and initialize the component

    }, {
      key: "_parentObserverHandler",
      value: function _parentObserverHandler() {
        if (!this._isValidLightDom()) {
          return;
        }

        this._externalBtn = this.querySelector("button");
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
    }]);
    return PfeButton;
  }(PFElement);

  PFElement.create(PfeButton);

  return PfeButton;

})));
//# sourceMappingURL=pfe-button.umd.js.map
