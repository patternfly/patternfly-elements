(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfePageStatus = factory(global.PFElement));
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
   * PatternFly Elements: PfePageStatus 1.0.0-prerelease.20
   * @license
   * Copyright 2019 Red Hat, Inc.
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

  var PfePageStatus = function (_PFElement) {
    inherits(PfePageStatus, _PFElement);
    createClass(PfePageStatus, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--default, #606060);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--default--lightest, #ececec);--pfe-status--TextTransform:uppercase;background-color:var(--pfe-status--BackgroundColor);color:var(--pfe-broadcasted--color--text);position:fixed;right:0;top:0;height:100vh;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:3rem}:host([hidden]){display:none}.flag{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.flag>span{display:inline-block;font-weight:700;text-transform:var(--pfe-status--TextTransform);font-size:.875rem;line-height:1em;white-space:nowrap}:host([pfe-status=moderate]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #ffc024);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--moderate--lightest, #fffbf0)}:host([pfe-status=important]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--important, #d73401);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--important--lightest, #ffe1d8)}:host([pfe-status=critical]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--critical, #bb0000);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--critical--lightest, #ffeeee)}:host([pfe-status=success]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--success, #2e7d32);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--success--lightest, #f7fcec)}:host([pfe-status=info]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--info, #0277bd);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--info--lightest, #dcf5fe)}:host([pfe-status=warning]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #ffc024);--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--moderate--darkest, #8a6200)}:host([pfe-status=normal]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-base--text, #fff)}:host([pfe-status=complement]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-complement--text, #fff)}:host([pfe-status=accent]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-accent--text, #fff)}</style><div class=\"flag\" aria-hidden=\"true\"><span><slot></slot></span></div>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-page-status.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-page-status.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-page-status.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.20";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "status": { "title": "Status", "type": "string", "enum": ["default", "moderate", "warning", "important", "critical", "success", "info", "normal", "accent", "complement"], "default": "default", "prefixed": true, "observer": "_basicAttributeChanged" } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-page-status";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-status"];
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfePageStatus() {
      classCallCheck(this, PfePageStatus);
      return possibleConstructorReturn(this, (PfePageStatus.__proto__ || Object.getPrototypeOf(PfePageStatus)).call(this, PfePageStatus));
    }

    createClass(PfePageStatus, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfePageStatus.prototype.__proto__ || Object.getPrototypeOf(PfePageStatus.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfePageStatus.prototype.__proto__ || Object.getPrototypeOf(PfePageStatus.prototype), "attributeChangedCallback", this).call(this, attr, oldValue, newValue);
        // Strip the prefix form the attribute
        attr = attr.replace("pfe-", "");
        // If the observer is defined in the attribute properties
        if (this[attr] && this[attr].observer) {
          // Get the observer function
          var observer = this[this[attr].observer].bind(this);
          // If it's a function, allow it to run
          if (typeof observer === "function") observer(attr, oldValue, newValue);
        }
      }
    }, {
      key: "_basicAttributeChanged",
      value: function _basicAttributeChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
      }
    }]);
    return PfePageStatus;
  }(PFElement);

  PFElement.create(PfePageStatus);

  return PfePageStatus;

})));
//# sourceMappingURL=pfe-page-status.umd.js.map
