(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../pfelement/pfelement.umd'), require('../pfe-icon/pfe-icon.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd', '../pfe-icon/pfe-icon.umd'], factory) :
  (factory(global.PFElement));
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
   * PatternFly Elements: PfeIconPanel 1.0.0-prerelease.18
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

  var PfeIconPanel = function (_PFElement) {
    inherits(PfeIconPanel, _PFElement);
    createClass(PfeIconPanel, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}@media (min-width:576px){:host{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}}:host pfe-icon{--pfe-icon--spacing:var(--pfe-theme--container-spacer, 1rem);--pfe-icon--size:var(--pfe-theme--icon-size, 64px);margin-right:var(--pfe-icon--spacing);font-size:var(--pfe-icon--size);line-height:var(--pfe-icon--size);padding:.05em;min-width:var(--pfe-icon--size);max-width:var(--pfe-icon--size)}:host ::slotted([slot=footer]),:host ::slotted([slot=header]){display:block}:host ::slotted([slot=footer]){margin-top:1em}:host([stacked]){-webkit-box-orient:vertical!important;-webkit-box-direction:normal!important;-webkit-flex-direction:column!important;-ms-flex-direction:column!important;flex-direction:column!important}:host([stacked][centered]){-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}</style><pfe-icon></pfe-icon>\n<div class="content">\n  <slot class="header" name="header"></slot>\n  <slot class="body"></slot>\n  <slot class="footer" name="footer"></slot>\n</div>';
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-icon-panel.scss";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-icon-panel.html";
      }
    }], [{
      key: 'version',
      get: function get$$1() {
        return "1.0.0-prerelease.18";
      }
    }, {
      key: 'tag',
      get: function get$$1() {
        return "pfe-icon-panel";
      }
    }, {
      key: 'observedAttributes',
      get: function get$$1() {
        return ["icon", "circled"];
      }
    }, {
      key: 'cascadingAttributes',
      get: function get$$1() {
        return {
          icon: "pfe-icon",
          circled: "pfe-icon"
        };
      }
    }]);

    function PfeIconPanel() {
      classCallCheck(this, PfeIconPanel);
      return possibleConstructorReturn(this, (PfeIconPanel.__proto__ || Object.getPrototypeOf(PfeIconPanel)).call(this, PfeIconPanel));
    }

    return PfeIconPanel;
  }(PFElement);

  PFElement.create(PfeIconPanel);

})));
//# sourceMappingURL=pfe-icon-panel.umd.js.map
