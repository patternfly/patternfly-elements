(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeBadge = factory(global.PFElement));
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
   * PatternFly Elements: PfeBadge 1.9.2
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

  var PfeBadge = function (_PFElement) {
    inherits(PfeBadge, _PFElement);
    createClass(PfeBadge, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:inline-block;line-height:calc(1.5 * .75);line-height:calc(var(--pfe-theme--line-height,1.5) * .75);text-align:center;text-rendering:optimizelegibility}span{background-color:#f0f0f0;background-color:var(--pfe-badge--BackgroundColor,var(--pfe-theme--color--feedback--default--lightest,#f0f0f0));border-radius:calc(2px * 30);border-radius:var(--pfe-badge--BorderRadius,calc(var(--pfe-theme--ui--border-radius,2px) * 30));color:#151515;color:var(--pfe-badge--Color,var(--pfe-theme--color--text,#151515));font-size:calc(1rem * .75);font-size:var(--pfe-badge--FontSize,calc(var(--pfe-theme--font-size,1rem) * .75));font-weight:600;font-weight:var(--pfe-badge--FontWeight,var(--pfe-theme--font-weight--semi-bold,600));min-width:calc(1px * 2);min-width:var(--pfe-badge--MinWidth,calc(var(--pfe-theme--ui--border-width,1px) * 2));padding-left:calc(1rem / 2);padding-left:var(--pfe-badge--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem)/ 2));padding-right:calc(1rem / 2);padding-right:var(--pfe-badge--PaddingRight,calc(var(--pfe-theme--container-padding,1rem)/ 2))}:host([state=moderate]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #f0ab00);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=important]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--important, #c9190b);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=critical]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--critical, #a30000);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=success]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--success, #3e8635);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=info]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--info, #06c);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([hidden]){display:none} /*# sourceMappingURL=pfe-badge.min.css.map */</style>\n<span></span>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-badge.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-badge.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.2";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-badge";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          state: {
            title: "State",
            type: String,
            values: ["default", "moderate", "important", "critical", "success", "info"],
            default: "default"
          },
          // @TODO: Deprecated property in 1.0
          pfeState: {
            type: String,
            prefix: false,
            alias: "state"
          },
          number: {
            title: "Number",
            type: Number,
            observer: "_numberChanged"
          },
          threshold: {
            title: "Threshold",
            type: Number,
            observer: "_thresholdChanged"
          },
          // @TODO: Deprecated property in 1.0
          pfeThreshold: {
            type: Number,
            alias: "threshold",
            prefix: false
          }
        };
      }
    }]);

    function PfeBadge() {
      classCallCheck(this, PfeBadge);

      var _this = possibleConstructorReturn(this, (PfeBadge.__proto__ || Object.getPrototypeOf(PfeBadge)).call(this, PfeBadge));

      _this._textContainer = _this.shadowRoot.querySelector("span");
      return _this;
    }

    createClass(PfeBadge, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        get(PfeBadge.prototype.__proto__ || Object.getPrototypeOf(PfeBadge.prototype), "attributeChangedCallback", this).apply(this, arguments);
        this._textContainer.textContent = this.textContent;
      }
    }, {
      key: "_thresholdChanged",
      value: function _thresholdChanged(oldVal, newVal) {
        this.textContent = Number(this.threshold) < Number(this.textContent) ? this.threshold + "+" : this.textContent;
      }
    }, {
      key: "_numberChanged",
      value: function _numberChanged(oldVal, newVal) {
        this.textContent = this.threshold && Number(this.threshold) < Number(newVal) ? this.threshold + "+" : newVal;
      }
    }]);
    return PfeBadge;
  }(PFElement);

  PFElement.create(PfeBadge);

  return PfeBadge;

})));
//# sourceMappingURL=pfe-badge.umd.js.map
