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

  // @POLYFILL  Object.prototype.assign()
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
  if (typeof Object.assign !== "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {

        if (target === null || target === undefined) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
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
   * PatternFly Elements: PfeContentSet 1.3.3
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
    characterData: true,
    childList: true,
    subtree: true
  };

  var PfeContentSet = function (_PFElement) {
    inherits(PfeContentSet, _PFElement);
    createClass(PfeContentSet, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block}::slotted(:not(pfe-accordion,pfe-tabs)),::slotted([hidden]),:host([hidden]),[hidden]{display:none!important}:host([align=center]),:host([align=right]){text-align:left} /*# sourceMappingURL=pfe-content-set.min.css.map */</style>\n<div hidden><slot id=\"lightdom\"></slot></div>\n<slot name=\"_view\" private></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-content-set.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-content-set.scss";
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
       * Getter: Capture all components in the _view slot
       * @returns {NodeList} All components in the _view slot
       */

    }, {
      key: "viewAll",
      get: function get() {
        return this.querySelectorAll("[slot=\"_view\"]");
      }

      /**
       * Getter: Capture the rendering component from the _view slot
       * @returns {NodeItem} The rendering component from the _view slot
       */

    }, {
      key: "view",
      get: function get() {
        var views = [].concat(toConsumableArray(this.viewAll)).filter(function (view) {
          return [PfeTabs.tag, PfeAccordion.tag].includes(view.tag);
        });
        if (views.length <= 0) return null;
        return views[0];
      }

      /**
       * Getter: should this be rendered as a tabset based on the breakpoint size
       * @returns {boolean} Is this a tabset?
       */

    }, {
      key: "expectedTag",
      get: function get() {
        return this.isTab ? PfeTabs.tag : PfeAccordion.tag;
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
        return "1.3.3";
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

      var _this = possibleConstructorReturn(this, (PfeContentSet.__proto__ || Object.getPrototypeOf(PfeContentSet)).call(this, PfeContentSet, { type: PfeContentSet.PfeType, delayRender: true }));

      _this.isIE11 = /MSIE|Trident|Edge\//.test(window.navigator.userAgent);

      _this.build = _this.build.bind(_this);

      _this._mutationHandler = _this._mutationHandler.bind(_this);
      _this._resizeHandler = _this._resizeHandler.bind(_this);

      _this._cleanSet = _this._cleanSet.bind(_this);
      _this._build = _this._build.bind(_this);
      _this._buildWrapper = _this._buildWrapper.bind(_this);
      _this._buildSets = _this._buildSets.bind(_this);

      _this._observer = new MutationObserver(_this._mutationHandler);
      if (window.ResizeObserver) _this._resizeObserver = new ResizeObserver(_this._resizeHandler);
      if (_this.isIE11) _this.render();
      return _this;
    }

    createClass(PfeContentSet, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "connectedCallback", this).call(this);

        // If the element has an ID, postfix container
        if (this.id) this.id = this.id.replace(/-container$/, "") + "-container";

        // Validate that the light DOM data exists before building
        if (this.hasValidLightDOM) {
          this._build();
          if (!this.isIE11) this.render();

          if (!this.isIE11 && window.ResizeObserver && this.parentElement) {
            this._resizeObserver.observe(this.parentElement);
          }
        } else if (!this.isIE11) this._observer.observe(this, CONTENT_MUTATION_CONFIG);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "disconnectedCallback", this).call(this);
        this._observer.disconnect();
        if (window.ResizeObserver) this._resizeObserver.disconnect();
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

              switch (mutation.type) {
                case "childList":
                  if (mutation.addedNodes) {
                    // Check the added nodes to make sure it's not assigned to the _view slot
                    var nodes = this._cleanSet(mutation.addedNodes);
                    if (nodes.length > 0) this._build(nodes);
                  }
                  if (mutation.removedNodes) {
                    // Check the added nodes to make sure it's not assigned to the _view slot
                    var _nodes = this._cleanSet(mutation.removedNodes);
                    if (_nodes.length > 0) this._removeNodes(_nodes);
                  }
                  break;
                case "characterData":
                  if (mutation.target && mutation.target.parentNode) this._updateNode(mutation.target.parentNode, mutation.target.textContent);
                  break;
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
        return !!(el.hasAttribute(this.tag + "--header") || el.tagName.match(/H[1-6]/));
      }

      /**
       * Checks if the element provided is a panel region
       * @returns {boolean} True if the element provided is a panel region
       */

    }, {
      key: "_isPanel",
      value: function _isPanel(el) {
        return !!el.hasAttribute(this.tag + "--panel");
      }

      /**
       * Reflect the removal of nodes from light DOM into the rendered view
       */

    }, {
      key: "_removeNodes",
      value: function _removeNodes(list) {
        var _this3 = this;

        list.forEach(function (item) {
          return _this3._removeNode(item);
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
        if (node.nodeName !== "#text" && node.hasAttribute("maps-to")) {
          var id = node.getAttribute("maps-to");
          if (!id) return connection;

          connection = this.view.querySelector("#" + id);
          if (!connection) this.warn("no element could be found with #" + id);
        }

        // Return the connection
        return connection;
      }

      /**
       * Reflect the removal of a node from light DOM into the rendered view
       */

    }, {
      key: "_removeNode",
      value: function _removeNode(node) {
        if (!this.view) return;

        var connection = _findConnection(node);
        if (connection) this.view.removeChild(connection);
        // Fire a full rebuild if it can't determine the mapped element
        else this._build();
      }
    }, {
      key: "_updateNode",
      value: function _updateNode(node, textContent) {
        if (!this.view) return;

        var connection = _findConnection(node);
        if (connection) connection.textContent = textContent;
        // Fire a full rebuild if it can't determine the mapped element
        else this._build();
      }
    }, {
      key: "_cleanSet",
      value: function _cleanSet(set) {
        var _this4 = this;

        return [].concat(toConsumableArray(set)).filter(function (item) {
          return item !== _this4.view;
        });
      }

      /**
       * Manage the building of the rendering component
       * Optionally accepts the input of new nodes added to the DOM
       */

    }, {
      key: "_build",
      value: function _build(addedNodes) {
        var _this5 = this;

        // @TODO: Add back a promise here post-IE11
        var view = this.view;
        if (!view || view.tag !== this.expectedTag) {
          view = this._buildWrapper();
        }

        // Disconnect the observer while we parse it
        this._observer.disconnect();

        var template = view.tag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;

        // If no id is present, give it the id from the wrapper
        if (!view.id) view.id = this.id || this.pfeId || this.randomId;

        var rawSets = null;
        if (addedNodes) rawSets = addedNodes;
        if (!rawSets && [].concat(toConsumableArray(this.children)).length) rawSets = this.children;

        // Clear out the content of the host if we're using the full child list
        if (!addedNodes && rawSets) view.innerHTML = "";

        // If sets is not null, build them using the template
        if (rawSets) {
          var sets = this._buildSets(rawSets, template);
          if (sets) view.appendChild(sets);
        }

        // Render or re-cascade properties to the component after update
        if (!this._rendered) this.render();else this.cascadeProperties(this.viewAll);

        // Wait until the tabs upgrade before setting the selectedIndex value
        Promise.all([customElements.whenDefined(PfeTabs.tag)]).then(function () {
          // pass the selectedIndex property down from pfe-content-set
          // to pfe-tabs if there is a selectedIndex value that's not 0
          // Pass the selectedIndex down to the tabset
          if (_this5.isTab && _this5.selectedIndex) {
            view.selectedIndex = _this5.selectedIndex;
          }

          // Attach the mutation observer
          if (!_this5.isIE11) _this5._observer.observe(_this5, CONTENT_MUTATION_CONFIG);

          return;
        });
      }

      /*
       * Note: be sure to disconnect the observer before running this
       */

    }, {
      key: "_buildWrapper",
      value: function _buildWrapper() {
        if (this.view && this.view.tag === this.expectedTag) return this.view;

        // If the upgraded component matches the tag name of the expected rendering component, return now;
        if (this.view) {
          // One option was to just remove the existing element: existingEl.remove();
          // But it seems safer to clear out the entire slot to make sure nothing snuck in unexpectedly
          this.viewAll.forEach(function (item) {
            return item.remove();
          });
        }

        // If there was no rendering component or it was the wrong one (and thus removed), create one!
        var newEl = document.createElement(this.expectedTag);
        newEl.setAttribute("slot", "_view");
        if (this.id) newEl.id = this.id.replace(/-container$/, "");
        this.appendChild(newEl);

        return newEl;
      }
    }, {
      key: "_buildSets",
      value: function _buildSets(sets, template) {
        var _this6 = this;

        sets = this._cleanSet(sets);
        var fragment = document.createDocumentFragment();

        var _loop = function _loop(i) {
          var header = sets[i];
          var panel = sets[i + 1];

          // Set up the template for the sets of content
          var wrapper = document.createElement("template");
          wrapper.innerHTML = template.trim();
          var templateMarkup = wrapper.content.cloneNode(true);

          if (!header) _this6.warn("no element found at position " + i + " of the light DOM input.");
          if (!panel) _this6.warn("no element found at position " + (i + 1) + " of the light DOM input.");

          if (header && _this6._isHeader(header) && panel && _this6._isPanel(panel)) {
            // Capture the line-item from the template
            [header, panel].forEach(function (region, idx) {
              var section = idx === 0 ? "header" : "panel";

              var piece = templateMarkup.querySelector("[content-type=\"" + section + "\"]").cloneNode(true);

              // Remove the section from the ID name in case it was already upgraded
              var regionId = region.id;
              if (region.hasAttribute("upgraded") && regionId) {
                regionId = regionId.replace(new RegExp("--" + section + "$"), "");
              }
              // Capture the ID from the region, the pfe-id, a previous "maps-to" attr, or generate a random one
              var id = regionId || region.getAttribute("pfe-id") || region.getAttribute("maps-to") || _this6.randomId;

              // Update the region ID with a postfix to prevent duplication
              if (region.id) region.id = regionId + "--" + section;
              // Flag that this element was upgraded
              region.setAttribute("upgraded", "");

              var clone = region.cloneNode(true);

              // Remove the flag from the clone
              clone.removeAttribute(_this6.tag + "--" + section);

              // Append a clone of the region to the template item
              piece.appendChild(clone);

              // Flag light DOM as upgraded
              region.setAttribute("maps-to", id);

              piece.id = id;

              // Attach the template item to the fragment
              fragment.appendChild(piece);
            });
          }
        };

        for (var i = 0; i < sets.length; i = i + 2) {
          _loop(i);
        }

        return fragment;
      }
    }, {
      key: "_cleanSet",
      value: function _cleanSet(set) {
        var _this7 = this;

        return [].concat(toConsumableArray(set)).filter(function (item) {
          return item !== _this7.view;
        });
      }
    }, {
      key: "_copyToId",
      value: function _copyToId() {
        // Don't overwrite an existing ID but backwards support pfe-id
        if (!this.id) this.id = this.pfeId;
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
