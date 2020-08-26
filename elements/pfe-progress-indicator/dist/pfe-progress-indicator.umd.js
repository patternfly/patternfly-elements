(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeProgressIndicator = factory(global.PFElement));
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
   * PatternFly Elements: PfeProgressIndicator 1.0.0-prerelease.55
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

  var PfeProgressIndicator = function (_PFElement) {
    inherits(PfeProgressIndicator, _PFElement);
    createClass(PfeProgressIndicator, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host([pfe-indeterminate]) ::slotted(*){position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host([hidden]){display:none}:host([pfe-indeterminate]){animation:spin 1s linear infinite;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;border-bottom:4px solid rgba(0,0,0,.25);border-bottom:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-left:4px solid rgba(0,0,0,.25);border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-right:4px solid rgba(0,0,0,.25);border-right:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-top:4px solid rgba(0,0,0,.75);border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.75);border-radius:100%;display:inline-block;height:2rem;height:var(--pfe-progress-indicator--Height,2rem);margin:0 auto;position:relative;width:2rem;width:var(--pfe-progress-indicator--Width,2rem);vertical-align:middle;visibility:visible}:host([size=sm]){height:1rem;width:1rem;border-width:calc(4px * .75);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * .75)}:host([size=md]){height:2rem;width:2rem;border-width:calc(4px * 1);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1)}:host([size=xl]){height:4rem;width:4rem;border-width:calc(4px * 1.5);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1.5)}@-webkit-keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}\n/*# sourceMappingURL=pfe-progress-indicator.min.css.map */\n</style><slot></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-progress-indicator.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-progress-indicator.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-progress-indicator.json";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "indeterminate": { "title": "Status", "type": "boolean", "default": true, "prefixed": true }, "size": { "title": "Size", "type": "string", "enum": ["sm", "md", "xl"], "default": "md" } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-progress-indicator";
      }
    }]);

    function PfeProgressIndicator() {
      classCallCheck(this, PfeProgressIndicator);

      var _this = possibleConstructorReturn(this, (PfeProgressIndicator.__proto__ || Object.getPrototypeOf(PfeProgressIndicator)).call(this, PfeProgressIndicator));

      _this._init = _this._init.bind(_this);
      _this._slot = _this.shadowRoot.querySelector("slot");
      _this._slot.addEventListener("slotchange", _this._init);
      return _this;
    }

    createClass(PfeProgressIndicator, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeProgressIndicator.prototype.__proto__ || Object.getPrototypeOf(PfeProgressIndicator.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._slot.removeEventListener("slotchange", this._init);
      }
    }, {
      key: "_init",
      value: function _init() {
        var firstChild = this.children[0];

        if (!firstChild) {
          console.warn(PfeProgressIndicator.tag + ": You do not have a backup loading message.");
        }
      }
    }]);
    return PfeProgressIndicator;
  }(PFElement);

  PFElement.create(PfeProgressIndicator);

  return PfeProgressIndicator;

})));
//# sourceMappingURL=pfe-progress-indicator.umd.js.map
