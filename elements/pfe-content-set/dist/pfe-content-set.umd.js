(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-accordion/dist/pfe-accordion.umd'), require('../../pfe-tabs/dist/pfe-tabs.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-accordion/dist/pfe-accordion.umd', '../../pfe-tabs/dist/pfe-tabs.umd'], factory) :
  (global.PfeContentSet = factory(global.PFElement,global.PfeAccordion,global.PfeTabs));
}(this, (function (PFElement,pfeAccordion_umd,pfeTabs_umd) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;
  pfeAccordion_umd = pfeAccordion_umd && pfeAccordion_umd.hasOwnProperty('default') ? pfeAccordion_umd['default'] : pfeAccordion_umd;
  pfeTabs_umd = pfeTabs_umd && pfeTabs_umd.hasOwnProperty('default') ? pfeTabs_umd['default'] : pfeTabs_umd;

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

  /*!
   * PatternFly Elements: PfeContentSet 1.0.0-prerelease.55
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

  var PfeContentSet = function (_PFElement) {
    inherits(PfeContentSet, _PFElement);
    createClass(PfeContentSet, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:block}:host([hidden]){display:none}\n/*# sourceMappingURL=pfe-content-set.min.css.map */\n</style><slot></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-content-set.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-content-set.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-content-set.json";
      }
    }, {
      key: "isTab",
      get: function get$$1() {
        var breakpointValue;
        if (this.hasAttribute("pfe-breakpoint")) {
          breakpointValue = this.getAttributeNode("pfe-breakpoint").value;
          breakpointValue = breakpointValue.replace(/\D/g, "");
        } else {
          breakpointValue = 700;
        }
        return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
      }
    }, {
      key: "contentSetId",
      get: function get$$1() {
        return this.id || this.getAttribute("pfe-id") || this.randomId;
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "vertical": { "title": "Vertical orientation", "type": "boolean", "default": false, "prefixed": false }, "variant": { "title": "Variant", "type": "string", "enum": ["wind", "earth"], "default": "wind", "prefixed": true }, "align": { "title": "Align", "type": "string", "enum": ["center"], "prefixed": true }, "breakpoint": { "title": "Custom breakpoint", "type": "string", "prefixed": true }, "tab-history": { "title": "Tab history", "type": "boolean", "default": false, "prefixed": true } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "default": { "title": "Default", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-content-set";
      }
    }, {
      key: "pfeType",
      get: function get$$1() {
        return PFElement.pfeType.combo;
      }
    }, {
      key: "cascadingAttributes",
      get: function get$$1() {
        return {
          "pfe-tab-history": "pfe-tabs"
        };
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-tab-history"];
      }
    }]);

    function PfeContentSet() {
      classCallCheck(this, PfeContentSet);

      var _this = possibleConstructorReturn(this, (PfeContentSet.__proto__ || Object.getPrototypeOf(PfeContentSet)).call(this, PfeContentSet, { delayRender: true }));

      _this._init = _this._init.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeContentSet, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "connectedCallback", this).call(this);

        if (this.children.length) {
          this._init();
        }

        this._observer.observe(this, { childList: true });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this2 = this;

        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        if (this.isTab) {
          this._buildTabs();
        } else {
          this._buildAccordion();
        }

        this.render();
        this.context_update();

        if (window.ShadyCSS) {
          setTimeout(function () {
            _this2._observer.observe(_this2, { childList: true });
          }, 0);
        }
      }
    }, {
      key: "_buildAccordion",
      value: function _buildAccordion() {
        var accordion = void 0;

        // Use the existing accordion if it exists
        var existingAccordion = this.querySelector("[pfe-id=\"" + this.contentSetId + "\"]");

        // Use a document fragment for efficiency
        var fragment = document.createDocumentFragment();

        // Create the accordion wrapper component or use the existing component
        if (!existingAccordion) {
          // Create the accordion wrapper component with a unique ID
          accordion = document.createElement("pfe-accordion");
          accordion.setAttribute("pfe-id", this.contentSetId);
        } else {
          accordion = existingAccordion;
        }

        // Iterate over each element in the light DOM
        [].concat(toConsumableArray(this.children)).forEach(function (child) {
          // If one of them has the attribute indicating they belong in the header region
          if (child.hasAttribute("pfe-content-set--header")) {
            var header = document.createElement("pfe-accordion-header");

            header.appendChild(child);
            accordion.appendChild(header);
          }

          if (child.hasAttribute("pfe-content-set--panel")) {
            var panel = document.createElement("pfe-accordion-panel");

            panel.appendChild(child);
            accordion.appendChild(panel);
          }
        });

        if (!existingAccordion) {
          fragment.appendChild(accordion);
          this.appendChild(fragment);
        }
      }
    }, {
      key: "_buildTabs",
      value: function _buildTabs() {
        var tabs = void 0;

        // Use the existing tabs if they exist
        var existingTabs = this.querySelector("[pfe-id=\"" + this.contentSetId + "\"]");

        // Use a document fragment for efficiency
        var fragment = document.createDocumentFragment();

        // Create the tabs wrapper component or use the existing tabs
        if (!existingTabs) {
          tabs = document.createElement("pfe-tabs");
          tabs.setAttribute("pfe-id", this.contentSetId);
        } else {
          tabs = existingTabs;
        }

        // Iterate over each element in the light DOM
        [].concat(toConsumableArray(this.children)).forEach(function (child) {
          // If one of them has the attribute indicating they belong in the panel region
          if (child.hasAttribute("pfe-content-set--header")) {
            var header = document.createElement("pfe-tab");

            header.setAttribute("slot", "tab");

            if (child.id) {
              header.setAttribute("pfe-id", child.id);
            }

            header.appendChild(child);
            tabs.appendChild(header);
          }

          if (child.hasAttribute("pfe-content-set--panel")) {
            var panel = document.createElement("pfe-tab-panel");

            panel.setAttribute("slot", "panel");

            if (child.id) {
              panel.setAttribute("pfe-id", child.id);
            }

            panel.appendChild(child);
            tabs.appendChild(panel);
          }
        });

        if (!existingTabs) {
          fragment.appendChild(tabs);
        }

        // If the orientation is set to vertical, add that attribute to the tabs
        if (this.vertical.value !== null && this.vertical.value !== false) {
          tabs.setAttribute("vertical", true);
        }

        // Pass the variant attribute down to the tabs component
        if (this.variant.value !== this.variant.default) {
          tabs.setAttribute("pfe-variant", this.variant.value);
        }

        if (this.align.value) {
          tabs.setAttribute("pfe-tab-align", this.align.value);
        }

        if (this.hasAttribute("pfe-tab-history")) {
          tabs.setAttribute("pfe-tab-history", true);
        }

        if (!existingTabs) {
          this.appendChild(fragment);
        }
      }
    }]);
    return PfeContentSet;
  }(PFElement);

  PFElement.create(PfeContentSet);

  return PfeContentSet;

})));
//# sourceMappingURL=pfe-content-set.umd.js.map
