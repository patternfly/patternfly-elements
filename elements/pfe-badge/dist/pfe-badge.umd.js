(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeBadge = factory(global.PFElement));
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
   * PatternFly Elements: PfeBadge 1.0.0-prerelease.55
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

  var PfeBadge = function (_PFElement) {
    inherits(PfeBadge, _PFElement);
    createClass(PfeBadge, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:inline-block;line-height:calc(1.5 * .75);line-height:calc(var(--pfe-theme--line-height,1.5) * .75);text-align:center;text-rendering:optimizelegibility}span{background-color:#f0f0f0;background-color:var(--pfe-badge--BackgroundColor,var(--pfe-theme--color--feedback--default--lightest,#f0f0f0));border-radius:calc(2px * 30);border-radius:var(--pfe-badge--BorderRadius,calc(var(--pfe-theme--ui--border-radius,2px) * 30));color:#151515;color:var(--pfe-badge--Color,var(--pfe-theme--color--text,#151515));font-size:calc(16px * .75);font-size:var(--pfe-badge--FontSize,calc(var(--pfe-theme--font-size,16px) * .75));font-weight:600;font-weight:var(--pfe-badge--FontWeight,var(--pfe-theme--font-weight--semi-bold,600));min-width:calc(1px * 2);min-width:var(--pfe-badge--MinWidth,calc(var(--pfe-theme--ui--border-width,1px) * 2));padding-left:calc(16px / 2);padding-left:var(--pfe-badge--PaddingLeft,calc(var(--pfe-theme--container-padding,16px)/ 2));padding-right:calc(16px / 2);padding-right:var(--pfe-badge--PaddingRight,calc(var(--pfe-theme--container-padding,16px)/ 2))}:host([pfe-state=moderate]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #ffc024);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([pfe-state=important]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--important, #d73401);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([pfe-state=critical]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--critical, #bb0000);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([pfe-state=success]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--success, #2e7d32);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([pfe-state=info]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--info, #0277bd);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([hidden]){display:none}\n/*# sourceMappingURL=pfe-badge.min.css.map */\n</style><span></span>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-badge.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-badge.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-badge.json";
      }
    }, {
      key: "threshold",
      get: function get$$1() {
        return this.getAttribute("pfe-threshold");
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "state": { "title": "Background color", "type": "string", "enum": ["default", "moderate", "important", "critical", "success", "info"], "default": "default", "prefixed": true }, "number": { "title": "Numeric Value", "type": "number", "prefixed": false }, "pfe-threshold": { "title": "Threshold Value", "type": "number", "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-badge";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["number", "pfe-threshold"];
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
        switch (attr) {
          case "pfe-threshold":
            this.textContent = Number(this.threshold) < Number(this.textContent) ? this.threshold + "+" : this.textContent;
            break;
          case "number":
            this.textContent = this.threshold && Number(this.threshold) < Number(newVal) ? this.threshold + "+" : newVal;
            break;
          default:
            return;
        }
        this._textContainer.textContent = this.textContent;
      }
    }]);
    return PfeBadge;
  }(PFElement);

  PFElement.create(PfeBadge);

  return PfeBadge;

})));
//# sourceMappingURL=pfe-badge.umd.js.map
