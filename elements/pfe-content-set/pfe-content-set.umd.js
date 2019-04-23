(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd'), require('../pfe-accordion/pfe-accordion.umd'), require('../pfe-tabs/pfe-tabs.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd', '../pfe-accordion/pfe-accordion.umd', '../pfe-tabs/pfe-tabs.umd'], factory) :
  (global.PfeContentSet = factory(global.PFElement));
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

  var PfeContentSet = function (_PFElement) {
    inherits(PfeContentSet, _PFElement);
    createClass(PfeContentSet, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host{display:block}:host([hidden]){display:none}</style><slot></slot>';
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-content-set.html";
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-content-set.scss";
      }
    }, {
      key: 'isTab',
      get: function get$$1() {
        return this.parentNode ? this.parentNode.offsetWidth > 768 : window.outerWidth > 768;
      }
    }, {
      key: 'orientation',
      get: function get$$1() {
        return this.hasAttribute("vertical") ? "vertical" : "horizontal";
      }
    }, {
      key: 'settings',
      get: function get$$1() {
        var settings = {};
        var variant = this.getAttribute("pfe-variant");
        var theme = this.getAttribute("on");

        if (variant) {
          settings.variant = variant;
        }

        if (theme) {
          settings.theme = theme;
        }

        return settings;
      }
    }], [{
      key: 'tag',
      get: function get$$1() {
        return "pfe-content-set";
      }
    }, {
      key: 'pfeType',
      get: function get$$1() {
        return PFElement.pfeType.combo;
      }
    }]);

    function PfeContentSet() {
      classCallCheck(this, PfeContentSet);
      return possibleConstructorReturn(this, (PfeContentSet.__proto__ || Object.getPrototypeOf(PfeContentSet)).call(this, PfeContentSet, { delayRender: true }));
    }

    createClass(PfeContentSet, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), 'connectedCallback', this).call(this);

        if (this.isTab) {
          this._buildTabs();
        } else {
          this._buildAccordion();
        }

        this.render();
      }
    }, {
      key: '_buildAccordion',
      value: function _buildAccordion() {
        // Use a document fragment for efficiency
        var fragment = document.createDocumentFragment();
        // Create the accordion wrapper component
        var accordion = document.createElement("pfe-accordion");

        // Iterate over each element in the light DOM
        [].concat(toConsumableArray(this.children)).forEach(function (child) {
          // If one of them has the attribute indicating they belong in the header region
          if (child.hasAttribute("pfe-content-set--header")) {
            // Create a header component
            var header = document.createElement("pfe-accordion-header");
            // Append the light DOM element to that component
            header.appendChild(child);
            // Append the component to the accordion parent
            accordion.appendChild(header);
          }
          // If one of them has the attribute indicating they belong in the panel region
          if (child.hasAttribute("pfe-content-set--panel")) {
            // Create a panel component
            var panel = document.createElement("pfe-accordion-panel");
            // Append the light DOM element to that component
            panel.appendChild(child);
            // Append the component to the accordion parent
            accordion.appendChild(panel);
          }
        });

        // Append the accordion to the document fragment
        fragment.appendChild(accordion);

        // Pass the theme property down to the accordion component
        if (this.settings.theme) {
          accordion.setAttribute("on", this.settings.theme);
        }

        // Append the fragment to the component
        this.appendChild(fragment);
      }
    }, {
      key: '_buildTabs',
      value: function _buildTabs() {
        // Use a document fragment for efficiency
        var fragment = document.createDocumentFragment();
        // Create the tabs wrapper component
        var tabs = document.createElement("pfe-tabs");

        // Iterate over each element in the light DOM
        [].concat(toConsumableArray(this.children)).forEach(function (child) {
          // If one of them has the attribute indicating they belong in the header region
          if (child.hasAttribute("pfe-content-set--header")) {
            // Create a tab component
            var header = document.createElement("pfe-tab");
            // Set the attribute indicating its slot
            header.setAttribute("slot", "tab");
            // Append the light DOM element to that component
            header.appendChild(child);
            // Append the component to the tabs parent
            tabs.appendChild(header);
          }
          // If one of them has the attribute indicating they belong in the panel region
          if (child.hasAttribute("pfe-content-set--panel")) {
            // Create the panel component
            var panel = document.createElement("pfe-tab-panel");
            // Set the attribute indicating its slot
            panel.setAttribute("slot", "panel");
            // Append the light DOM element to that component
            panel.appendChild(child);
            // Append the component to the tabs parent
            tabs.appendChild(panel);
          }
        });

        // Append the tabs to the document fragment
        fragment.appendChild(tabs);

        // If the orientation is set to vertical, add that attribute to the tabs
        if (this.orientation === "vertical") {
          tabs.setAttribute("vertical", true);
        }

        // Pass the variant attribute down to the tabs component
        if (this.settings.variant) {
          tabs.setAttribute("pfe-variant", this.settings.variant);
        }

        // Pass the theme property down to the accordion component
        if (this.settings.theme) {
          tabs.setAttribute("on", this.settings.theme);
        }

        // Append the fragment to the component
        this.appendChild(fragment);
      }
    }]);
    return PfeContentSet;
  }(PFElement);

  PFElement.create(PfeContentSet);

  return PfeContentSet;

})));
//# sourceMappingURL=pfe-content-set.umd.js.map
