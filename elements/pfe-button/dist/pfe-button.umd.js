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
   * PatternFly Elements: PfeButton 1.0.0-prerelease.39
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
  var blackListedAttributes = ["style"];

  var PfeButton = function (_PFElement) {
    inherits(PfeButton, _PFElement);
    createClass(PfeButton, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:inline-block}:host([hidden]){display:none}:host([pfe-variant=primary]) button,button{background-color:#06c;color:#fff;font-size:16px;padding:8px 16px;cursor:pointer;border-radius:3px;border:0;position:relative}:host([pfe-variant=primary]) button:after,button:after{position:absolute;top:0;left:0;right:0;bottom:0;content:\"\"}:host([pfe-variant=primary]) button:focus,:host([pfe-variant=primary]) button:hover,button:focus,button:hover{background-color:#004080}:host([pfe-variant=secondary]) button{background-color:transparent;color:#06c}:host([pfe-variant=secondary]) button:after{border:1px solid #06c;border-radius:3px}:host([pfe-variant=secondary]) button:focus:after,:host([pfe-variant=secondary]) button:hover:after{border:2px solid #06c}:host([pfe-variant=tertiary]) button{background-color:transparent;color:#151515}:host([pfe-variant=tertiary]) button:after{border:1px solid #151515;border-radius:3px}:host([pfe-variant=tertiary]) button:focus:after,:host([pfe-variant=tertiary]) button:hover:after{border:2px solid #151515}:host([pfe-variant=danger]) button{background-color:#c9190b;color:#fff}:host([pfe-variant=danger]) button:focus,:host([pfe-variant=danger]) button:hover{background-color:#a30000}:host([pfe-variant=control]) button{background-color:transparent;color:#151515;border-radius:0}:host([pfe-variant=control]) button:after{border:1px solid #ededed;border-bottom-color:#8a8d90}:host([pfe-variant=control]) button:focus:after,:host([pfe-variant=control]) button:hover:after{border-bottom-width:2px;border-bottom-color:#06c}:host([pfe-variant=control][disabled]) button{background-color:transparent}:host([disabled]) button{background-color:#d2d2d2;color:#737679;pointer-events:none}:host([disabled]) button:focus,:host([disabled]) button:hover{background-color:#d2d2d2}:host([disabled]) button:focus:after,:host([disabled]) button:hover:after{border:0}:host([disabled]) button:after{border:0}\n/*# sourceMappingURL=pfe-button.min.css.map */\n</style><span id=\"internalBtn\"></span>";
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
        return "1.0.0-prerelease.39";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "variant": { "title": "Style variant", "type": "string", "prefixed": true, "enum": ["primary", "secondary", "tertiary", "danger", "control"] } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "default": { "title": "Default slot", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
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
        blackListedAttributes.forEach(function (attribute) {
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
