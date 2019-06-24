(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfeHealthIndex = factory(global.PFElement));
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*
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

  var PfeHealthIndex = function (_PFElement) {
    inherits(PfeHealthIndex, _PFElement);
    createClass(PfeHealthIndex, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([hidden]){display:none}.box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:1px solid #d2d2d2;border:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);margin-left:calc(1rem * .5);margin-left:calc(var(--pfe-theme--container-spacer,1rem) * .5)}.box-container .box{background:#fff;width:10px;height:20px;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}.box-container .box:last-child{border-right:0}.box-container .box.active.a{background-color:#3f9c35}.box-container .box.active.b{background-color:#92d400}.box-container .box.active.c{background-color:#efaa00}.box-container .box.active.d{background-color:#ec7a08}.box-container .box.active.e{background-color:#c00}.box-container .box.active.f{background-color:#a30000}</style><div id=\"healthIndex\"></div>\n<div class=\"box-container\">\n  <div class=\"box a\"></div>\n  <div class=\"box b\"></div>\n  <div class=\"box c\"></div>\n  <div class=\"box d\"></div>\n  <div class=\"box e\"></div>\n  <div class=\"box f\"></div>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-health-index.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-health-index.scss";
      }
    }], [{
      key: "tag",
      get: function get$$1() {
        return "pfe-health-index";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["health-index"];
      }
    }]);

    function PfeHealthIndex() {
      classCallCheck(this, PfeHealthIndex);
      return possibleConstructorReturn(this, (PfeHealthIndex.__proto__ || Object.getPrototypeOf(PfeHealthIndex)).call(this, PfeHealthIndex.tag));
    }

    createClass(PfeHealthIndex, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        var healthIndex = newValue.toLowerCase();
        var healthIndexUpperCase = newValue.toUpperCase();
        var boxes = [].concat(toConsumableArray(this.shadowRoot.querySelectorAll(".box")));

        this.innerHTML = healthIndexUpperCase;
        this.shadowRoot.querySelector("#healthIndex").innerText = healthIndexUpperCase;

        boxes.forEach(function (box) {
          if (box.classList.contains(healthIndex)) {
            box.classList.add("active");
          } else {
            box.classList.remove("active");
          }
        });

        if (!this.shadowRoot.querySelector(".box.active")) {
          console.warn(PfeHealthIndex.tag + ": a valid health-index was not provided. Please use A, B, C, D, E, or F");
        }
      }
    }]);
    return PfeHealthIndex;
  }(PFElement);

  PFElement.create(PfeHealthIndex);

  return PfeHealthIndex;

})));
//# sourceMappingURL=pfe-health-index.umd.js.map
