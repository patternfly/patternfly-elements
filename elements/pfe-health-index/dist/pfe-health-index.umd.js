(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
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

  /*!
   * PatternFly Elements: PfeHealthIndex 1.0.0-prerelease.40
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

  var PfeHealthIndex = function (_PFElement) {
    inherits(PfeHealthIndex, _PFElement);
    createClass(PfeHealthIndex, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([hidden]){display:none}:host(:not([size=lg])) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:1px solid #d2d2d2;border:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);margin-left:calc(16px * .5);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .5)}:host(:not([size=lg])) .box-container .box{background:#fff;width:10px;height:20px;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:not([size=lg])) .box-container .box:last-child{border-right:0}:host(:not([size=lg])) .box-container .box.active.a{background-color:#3f9c35}:host(:not([size=lg])) .box-container .box.active.b{background-color:#92d400}:host(:not([size=lg])) .box-container .box.active.c{background-color:#efaa00}:host(:not([size=lg])) .box-container .box.active.d{background-color:#ec7a08}:host(:not([size=lg])) .box-container .box.active.e{background-color:#c00}:host(:not([size=lg])) .box-container .box.active.f{background-color:#a30000}:host([size=lg]) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:none;margin-left:0}:host([size=lg]) .grade{padding:6px 10px}:host([size=lg]) .box{background:#fff;color:#777;border-top:2px solid #ececec}:host([size=lg]) .box:first-child{margin-left:0;border-left:2px solid #ececec}:host([size=lg]) .box.active:first-child{border-left:none}:host([size=lg]) .box:last-child{margin-right:0;border-right:2px solid #ececec}:host([size=lg]) .box.active:last-child{border-right:none}:host([size=lg]) .box>.bottom{height:8px;margin:0 .5px}:host([size=lg]) .box.active .grade{color:#fff;margin:-2px .5px 0 .5px;padding-top:8px}:host([size=lg]) .box.a.active .grade,:host([size=lg]) .box.a>.bottom{background-color:#3f9c35}:host([size=lg]) .box.b.active .grade,:host([size=lg]) .box.b>.bottom{background-color:#92d400}:host([size=lg]) .box.c.active .grade,:host([size=lg]) .box.c>.bottom{background-color:#efaa00}:host([size=lg]) .box.d.active .grade,:host([size=lg]) .box.d>.bottom{background-color:#ec7a08}:host([size=lg]) .box.e.active .grade,:host([size=lg]) .box.e>.bottom{background-color:#c00}:host([size=lg]) .box.f.active .grade,:host([size=lg]) .box.f>.bottom{background-color:#a30000}\n/*# sourceMappingURL=pfe-health-index.min.css.map */\n</style>" + (this.size !== "lg" ? "\n<div id=\"healthIndex\"></div>\n<div class=\"box-container\">\n  <div class=\"box a\"></div>\n  <div class=\"box b\"></div>\n  <div class=\"box c\"></div>\n  <div class=\"box d\"></div>\n  <div class=\"box e\"></div>\n  <div class=\"box f\"></div>\n</div>\n" : "\n<div class=\"box-container\">\n  <div class=\"box a\">\n    <div class=\"grade\">A</div>\n    <div class=\"bottom\"></div>\n  </div>\n  <div class=\"box b\">\n    <div class=\"grade\">B</div>\n    <div class=\"bottom\"></div>\n  </div>\n  <div class=\"box c\">\n    <div class=\"grade\">C</div>\n    <div class=\"bottom\"></div>\n  </div>\n  <div class=\"box d\">\n    <div class=\"grade\">D</div>\n    <div class=\"bottom\"></div>\n  </div>\n  <div class=\"box e\">\n    <div class=\"grade\">E</div>\n    <div class=\"bottom\"></div>\n  </div>\n  <div class=\"box f\">\n    <div class=\"grade\">F</div>\n    <div class=\"bottom\"></div>\n  </div>\n</div>\n");
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-health-index.json";
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
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.40";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "health-index": { "title": "Health Index", "type": "string", "enum": ["A", "B", "C", "D", "E", "F"], "default": "A", "prefixed": false }, "size": { "title": "Size", "type": "string", "enum": ["lg"], "default": null, "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-health-index";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["health-index", "size"];
      }
    }]);

    function PfeHealthIndex() {
      classCallCheck(this, PfeHealthIndex);

      var _this = possibleConstructorReturn(this, (PfeHealthIndex.__proto__ || Object.getPrototypeOf(PfeHealthIndex)).call(this, PfeHealthIndex, { delayRender: true }));

      _this.size = null;
      return _this;
    }

    createClass(PfeHealthIndex, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case "size":
            this.size = newValue;
            this.render();
            this.updateHealthIndex(this.getAttribute("health-index"));
            break;
          case "health-index":
            this.render();
            this.updateHealthIndex(newValue);
            break;
          default:
            break;
        }
      }
    }, {
      key: "updateHealthIndex",
      value: function updateHealthIndex(grade) {
        var healthIndex = grade.toLowerCase();
        var healthIndexUpperCase = grade.toUpperCase();
        var boxes = [].concat(toConsumableArray(this.shadowRoot.querySelectorAll(".box")));
        this.innerHTML = healthIndexUpperCase;

        boxes.forEach(function (box) {
          if (box.classList.contains(healthIndex)) {
            box.classList.add("active");
          } else {
            box.classList.remove("active");
          }
        });

        if (this.size !== "lg") {
          this.shadowRoot.querySelector("#healthIndex").innerText = healthIndexUpperCase;
        }

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
