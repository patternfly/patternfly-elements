(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-accordion/dist/pfe-accordion.umd'), require('../../pfe-tabs/dist/pfe-tabs.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-accordion/dist/pfe-accordion.umd', '../../pfe-tabs/dist/pfe-tabs.umd'], factory) :
  (global = global || self, global.PfeContentSet = factory(global.PFElement, global.PfeAccordion, global.PfeTabs));
}(this, (function (PFElement, PfeAccordion, PfeTabs) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;
  PfeAccordion = PfeAccordion && Object.prototype.hasOwnProperty.call(PfeAccordion, 'default') ? PfeAccordion['default'] : PfeAccordion;
  PfeTabs = PfeTabs && Object.prototype.hasOwnProperty.call(PfeTabs, 'default') ? PfeTabs['default'] : PfeTabs;

  // @POLYFILL  NodeList.prototype.forEach()
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

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
   * PatternFly Elements: PfeContentSet 1.9.2
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

  var CONTENT_MUTATION_CONFIG = {
    characterData: false,
    childList: true,
    subtree: false
  };

  var PfeContentSet = function (_PFElement) {
    inherits(PfeContentSet, _PFElement);
    createClass(PfeContentSet, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block}::slotted([hidden]),:host([hidden]),[hidden]{display:none!important}:host([align=center]),:host([align=right]){text-align:left} /*# sourceMappingURL=pfe-content-set.min.css.map */</style>\n<div id=\"container\"></div>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-content-set.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-content-set.html";
      }
    }, {
      key: "breakpointValue",
      get: function get() {
        return parseInt(this.breakpoint.replace(/\D/g, ""));
      }

      /**
       * Getter: should this be rendered as a tabset based on the breakpoint size
       * @returns {boolean} Is this a tabset?
       */

    }, {
      key: "isTab",
      get: function get() {
        return this.parentNode ? this.parentNode.offsetWidth > this.breakpointValue : window.outerWidth > this.breakpointValue;
      }

      /**
       * Getter: Alias now for this.view
       * @returns {NodeItem} The rendering component
       */

    }, {
      key: "viewAll",
      get: function get() {
        return this.view;
      }

      /**
       * Getter: Capture the rendering component from the shadow DOM
       * @returns {NodeItem} The rendering component from the shadow DOM
       */

    }, {
      key: "view",
      get: function get() {
        if (!this._rendered) return;
        return this.shadowRoot.querySelector(this.expectedTag);
      }

      /**
       * Getter: should this be rendered as a tabset based on the breakpoint size
       * @returns {boolean} Is this a tabset?
       */

    }, {
      key: "expectedTag",
      get: function get() {
        if (this.isIE11) return "pfe-accordion";else return this.isTab ? "pfe-tabs" : "pfe-accordion";
      }

      /**
       * Getter: Capture the tabs component from the _view slot (if it exists)
       * @returns {NodeItem} The tabs component from the _view slot
       */

    }, {
      key: "tabs",
      get: function get() {
        return this.querySelector("pfe-tabs[slot=\"_view\"]");
      }

      /**
       * Getter: Capture the accordion component from the _view slot (if it exists)
       * @returns {NodeItem} The accordion component from the _view slot
       */

    }, {
      key: "accordion",
      get: function get() {
        return this.querySelector("pfe-accordion[slot=\"_view\"]");
      }

      /**
       * Getter: Validates the incoming light DOM for some usable content
       * @returns {boolean} Returns true if some usable light DOM exists
       */

    }, {
      key: "hasValidLightDOM",
      get: function get() {
        var _this2 = this;

        // If any light DOM exists, validate it meets the requirements for rendering
        if (this.hasLightDOM()) {
          var valid = false;
          // Loop through the assigned nodes
          [].concat(toConsumableArray(this.children)).forEach(function (node) {
            // Validate that any non-text nodes have the right attributes present
            // They don't have to be in the right order, just that they exist at all lets us progress
            if (node.nodeName !== "#text" && (_this2._isHeader(node) || _this2._isPanel(node) || node.tagName && node.tagName.toLowerCase() === _this2.expectedTag)) valid = true;
          });
          return valid;
        } else return false;
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
        return "pfe-content-set";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Content set",
          description: "This element creates a flexible component that renders an accordion or tabset depending on screen size."
        };
      }
    }, {
      key: "pfeType",
      get: function get() {
        return PFElement.pfeType.combo;
      }

      /**
       * Property definitions for Content set combine the options available for Tabs & Accordion
       */

    }, {
      key: "properties",
      get: function get() {
        return {
          //-- PFE-TABS specific properties
          vertical: {
            title: "Vertical orientation",
            type: Boolean,
            default: false,
            cascade: "pfe-tabs"
          },
          selectedIndex: {
            title: "Index of the selected tab",
            type: Number,
            cascade: "pfe-tabs"
          },
          tabAlign: {
            title: "Tab alignment",
            type: String,
            enum: ["center"],
            cascade: "pfe-tabs"
          },
          variant: {
            title: "Variant",
            type: String,
            enum: ["wind", "earth"],
            default: "wind",
            cascade: "pfe-tabs"
          },
          // @TODO: Deprecated for 1.0
          oldVariant: {
            type: String,
            attr: "pfe-variant",
            alias: "variant"
          },
          // @TODO: Deprecated for 1.0
          oldTabHistory: {
            type: Boolean,
            alias: "tabHistory",
            attr: "pfe-tab-history"
          },
          tabHistory: {
            title: "Tab History",
            type: Boolean,
            default: false,
            cascade: "pfe-tabs"
          },
          //-- PFE-ACCORDION specific properties
          disclosure: {
            // Leaving this as a string since it's an opt out
            title: "Disclosure",
            type: String,
            values: ["true", "false"],
            cascade: "pfe-accordion"
          },
          // @TODO: Deprecated pfe-disclosure in 1.0
          oldDisclosure: {
            type: String,
            alias: "disclosure",
            attr: "pfe-disclosure"
          },
          //-- PFE-CONTENT-SET specific properties
          breakpoint: {
            title: "Custom breakpoint",
            type: String,
            default: "700",
            observer: "_updateBreakpoint"
          },
          // @TODO: Deprecated in 1.0
          oldBreakpoint: {
            type: String,
            alias: "breakpoint",
            attr: "pfe-breakpoint"
          },
          align: {
            type: String,
            enum: ["center"],
            observer: "_alignmentHandler"
          },
          // @TODO: Deprecated in 1.0
          oldAlign: {
            attr: "pfe-align",
            alias: "align"
          },
          // @TODO: Deprecated in 1.0
          pfeId: {
            type: String,
            attr: "pfe-id",
            observer: "_copyToId"
          }
        };
      }

      /**
       * Schema definition for slotted content
       * Useful for CMS dynamic imports of components
       */

    }, {
      key: "slots",
      get: function get() {
        return {
          default: {
            title: "Default",
            type: "array",
            namedSlot: false,
            items: {
              $ref: "raw"
            }
          }
        };
      }
    }]);

    function PfeContentSet() {
      classCallCheck(this, PfeContentSet);

      var _this = possibleConstructorReturn(this, (PfeContentSet.__proto__ || Object.getPrototypeOf(PfeContentSet)).call(this, PfeContentSet, { type: PfeContentSet.PfeType }));

      _this.build = _this.build.bind(_this);

      _this._mutationHandler = _this._mutationHandler.bind(_this);
      _this._alignmentHandler = _this._alignmentHandler.bind(_this);
      _this._resizeHandler = _this._resizeHandler.bind(_this);

      _this._build = _this._build.bind(_this);
      _this._buildSets = _this._buildSets.bind(_this);

      _this._isHeader = _this._isHeader.bind(_this);
      _this._isPanel = _this._isPanel.bind(_this);
      _this._addNodes = _this._addNodes.bind(_this);
      _this._removeNodes = _this._removeNodes.bind(_this);
      _this._findConnection = _this._findConnection.bind(_this);
      _this._addNode = _this._addNode.bind(_this);
      _this._removeNode = _this._removeNode.bind(_this);
      _this._updateNode = _this._updateNode.bind(_this);

      _this._copyToId = _this._copyToId.bind(_this);
      _this._updateBreakpoint = _this._updateBreakpoint.bind(_this);

      _this._observer = new MutationObserver(_this._mutationHandler);
      return _this;
    }

    createClass(PfeContentSet, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this3 = this;

        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "connectedCallback", this).call(this);

        // this.setAttribute("hidden", "");

        // Validate that the light DOM data exists before building
        if (this.hasValidLightDOM) this._build();

        if (!this.isIE11) {
          window.addEventListener("resize", function () {
            clearTimeout(_this3._resizeHandler._tId);
            _this3._resizeHandler._tId = setTimeout(_this3._resizeHandler, 100);
          });

          this._observer.observe(this, CONTENT_MUTATION_CONFIG);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this4 = this;

        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "disconnectedCallback", this).call(this);

        if (!this.isIE11) {
          this._observer.disconnect();

          window.removeEventListener("resize", function () {
            clearTimeout(_this4._resizeHandler._tId);
            _this4._resizeHandler._tId = setTimeout(_this4._resizeHandler, 100);
          });
        }
      }

      /**
       * Run the internal build task
       */

    }, {
      key: "build",
      value: function build() {
        // Fire the build of the internals for the new component
        return this._build();
      }

      /**
       * Mutation handler
       * Read in and parse the mutation list, rebuilding as necessary
       */

    }, {
      key: "_mutationHandler",
      value: function _mutationHandler(mutationsList) {
        if (!this.isIE11 && mutationsList) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var mutation = _step.value;

              if (mutation.type === "childList") {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                  // Check the added nodes to make sure it's not assigned to the _view slot
                  var nodes = mutation.addedNodes;
                  if (nodes.length > 0) this._addNodes(nodes);
                }
                if (mutation.removedNodes && mutation.removedNodes.length > 0) {
                  // Check the added nodes to make sure it's not assigned to the _view slot
                  var _nodes = mutation.removedNodes;
                  if (_nodes.length > 0) this._removeNodes(_nodes);
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return;
        }

        // If no mutation list is provided or it's IE11, rebuild the whole thing
        this._build();
      }

      /**
       * Checks if the element provided is a header region
       * @returns {boolean} True if the element provided is a header region
       */

    }, {
      key: "_isHeader",
      value: function _isHeader(el) {
        // Ensure that we don't throw an error if we encounter a web component
        // yet to be defined.
        if (typeof el.hasAttribute !== "undefined") {
          return !!(el.hasAttribute(this.tag + "--header") || el.tagName.match(/H[1-6]/));
        }
        return false;
      }

      /**
       * Checks if the element provided is a panel region
       * @returns {boolean} True if the element provided is a panel region
       */

    }, {
      key: "_isPanel",
      value: function _isPanel(el) {
        // Ensure that we don't throw an error if we encounter a web component
        // yet to be defined.
        if (typeof el.previousElementSibling !== "undefined") {
          return !!this._isHeader(el.previousElementSibling);
        }
        return false;
      }

      /**
       * Reflect the addition of nodes from light DOM into the rendered view
       */

    }, {
      key: "_addNodes",
      value: function _addNodes(list) {
        this._build(list);

        // @TODO: Build in some logic for injecting a single node rather than rebuild
        // list.forEach(item => this._addNode(item));
      }

      /**
       * Reflect the removal of nodes from light DOM into the rendered view
       */

    }, {
      key: "_removeNodes",
      value: function _removeNodes(list) {
        var _this5 = this;

        list.forEach(function (item) {
          return _this5._removeNode(item);
        });

        // If a container doesn't exist, escape now
        if (!this.view) return;

        // Check if the container is empty, hide
        if (!this.view.hasChildNodes()) this.view.setAttribute("hidden", "");else this.view.removeAttribute("hidden");
      }

      /**
       * Find a connection between a node in light DOM that was added or removed
       * and the matching node in the rendered component; this makes upgrades more
       * efficient so we're not rebuilding everything every time.
       * @returns {Node} Returns the node in the rendered component that maps to the light DOM node provided
       */

    }, {
      key: "_findConnection",
      value: function _findConnection(node) {
        var connection = null;

        if (!this.view) return connection;

        // If this node is mapped to one in the upgraded component
        if (node.nodeName !== "#text" && node.hasAttribute("slot")) {
          var _id = node.getAttribute("slot");
          if (_id) connection = this.view.querySelector("[name=\"" + _id + "\"]");
        }

        if (!connection) this.warn("no slot could be found with [name=\"" + id + "\"]");

        // Return the connection
        return connection;
      }

      /**
       * Reflect the removal of a node from light DOM into the rendered view
       */

    }, {
      key: "_addNode",
      value: function _addNode(node) {
        if (!this.view) return;

        // @TODO: Build in some logic for injecting a single node rather than rebuild

        // Fire a full rebuild if it can't determine the mapped element
        this._build();
      }

      /**
       * Reflect the removal of a node from light DOM into the rendered view
       */

    }, {
      key: "_removeNode",
      value: function _removeNode(node) {
        if (!this.view) return;

        var connection = this._findConnection(node);
        if (connection) {
          var header = void 0,
              panel = void 0;
          var el = connection.parentElement;

          // Look for the sibling element
          if (el.getAttribute("content-type") === "header" && el.nextElementSibling && el.nextElementSibling.getAttribute("content-type") === "panel") {
            header = el;
            panel = el.nextElementSibling;
          } else if (el.getAttribute("content-type") === "panel" && el.previousElementSibling && el.previousElementSibling.getAttribute("content-type") === "header") {
            header = el.previousElementSibling;
            panel = el;
          }

          // This will remove the sibling element from the
          // shadow template but not the light DOM
          if (header) header.remove();
          if (panel) panel.remove();
        }
        // Fire a full rebuild if it can't determine the mapped element
        else this._build();
      }
    }, {
      key: "_updateNode",
      value: function _updateNode(node, textContent) {
        if (!this.view) return;

        var connection = this._findConnection(node);
        if (connection) {
          if (textContent) connection.textContent = textContent;else connection.innerHTML = node.innerHTML;
        }
        // Fire a full rebuild if it can't determine the mapped element
        else this._build();
      }

      /**
       * Manage the building of the rendering component
       * Optionally accepts the input of new nodes added to the DOM
       */
      // @TODO: Add back a promise here post-IE11

    }, {
      key: "_build",
      value: function _build() {
        var _this6 = this;

        var addedNodes = this.children;

        // If sets is not null, build them using the template
        if (addedNodes.length > 0) {
          Promise.all([customElements.whenDefined(this.expectedTag)]).then(function () {
            var template = _this6.expectedTag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;
            var sets = _this6._buildSets(addedNodes, template);
            sets.id = _this6.id || _this6.randomId;

            var container = _this6.shadowRoot.querySelector("#container");

            if (sets && container) {
              if (!_this6.isIE11) {
                // Disconnect the observer while we parse it
                _this6._observer.disconnect();

                // This does not work in IE11 for some reason
                container.innerHTML = sets.outerHTML;

                // Context is irrelevant in IE11
                _this6.resetContext();
              } else {
                container.innerHTML = "";
                container.appendChild(sets);

                // In IE11, we need to hide the light DOM headers (b/c they're copied into shadow DOM on accordion)
                [].concat(toConsumableArray(_this6.querySelectorAll("[pfe-content-set--header]"))).map(function (item) {
                  item.style.display = "none";
                });
              }

              _this6.cascadeProperties();
              _this6.removeAttribute("hidden");

              // Attach the mutation observer
              if (!_this6.isIE11) _this6._observer.observe(_this6, CONTENT_MUTATION_CONFIG);
            }
          });
        } else {
          this.setAttribute("hidden", "");
        }
      }
    }, {
      key: "_buildSets",
      value: function _buildSets(sets, template) {
        var _this7 = this;

        var tagElement = document.createElement(this.expectedTag);

        var _loop = function _loop(i) {
          var header = sets[i];
          var panel = sets[i + 1];

          // Set up the template for the sets of content
          var wrapper = document.createElement("template");
          wrapper.innerHTML = template.trim();

          // Capture the template markup as a cloned node
          var templateMarkup = wrapper.content.cloneNode(true);

          if (!header) _this7.warn("no element found at position " + i + " of the light DOM input.");
          if (!panel) _this7.warn("no element found at position " + (i + 1) + " of the light DOM input.");

          if (header && _this7._isHeader(header) && panel && _this7._isPanel(panel)) {
            // Capture the line-item from the template
            [header, panel].forEach(function (region, idx) {
              var section = idx === 0 ? "header" : "panel";

              var piece = templateMarkup.querySelector("[content-type=\"" + section + "\"]").cloneNode(true);

              // Create a new slot for the shadow template and create a random name for it
              var slot = document.createElement("slot");
              slot.name = _this7.randomId.replace("pfe-", section + "-");

              // Append the new slot into the template item
              piece.appendChild(slot);

              // Connect the light DOM region to the newly create slot
              region.setAttribute("slot", slot.name);

              // Capture the ID from the region or the pfe-id if they exist
              if (region.id || region.getAttribute("pfe-id")) piece.id = region.id || region.getAttribute("pfe-id");

              // Attach the template item to the element tag
              tagElement.appendChild(piece);
            });
          }
        };

        for (var i = 0; i < sets.length; i = i + 2) {
          _loop(i);
        }

        return tagElement;
      }
    }, {
      key: "_copyToId",
      value: function _copyToId(oldVal, newVal) {
        if (oldVal !== newVal && !this.id) {
          // Don't overwrite an existing ID but backwards support pfe-id
          this.id = newVal;
        }
      }
    }, {
      key: "_alignmentHandler",
      value: function _alignmentHandler(oldVal, newVal) {
        if (oldVal !== newVal) this.tabAlign = newVal;
      }
    }, {
      key: "_resizeHandler",
      value: function _resizeHandler() {
        if (!this.view || this.view && this.view.tag !== this.expectedTag) {
          this._build();
        }
      }
    }, {
      key: "_updateBreakpoint",
      value: function _updateBreakpoint() {
        // If the correct rendering element isn't in use yet, build it from scratch
        if (!this.view || this.view && this.view.tag !== this.expectedTag) {
          this._build();
        }
      }
    }]);
    return PfeContentSet;
  }(PFElement);

  PFElement.create(PfeContentSet);

  return PfeContentSet;

})));
//# sourceMappingURL=pfe-content-set.umd.js.map
