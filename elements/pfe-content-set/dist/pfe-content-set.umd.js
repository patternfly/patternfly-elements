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

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /*!
   * PatternFly Elements: PfeContentSet 1.2.0
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
        return "\n<style>:host{display:block}#lightdom,:host([hidden]){display:none} /*# sourceMappingURL=pfe-content-set.min.css.map */</style>\n<div id=\"lightdom\" hidden>\n  <slot></slot>\n</div>\n<pfe-tabs hidden visible-at=\"large\"></pfe-tabs>\n<pfe-accordion hidden visible-at=\"small\"></pfe-accordion>";
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
      key: "isTab",
      get: function get() {
        var breakpointValue = this.breakpoint ? parseInt(this.breakpoint.replace(/\D/g, "")) : 700;
        return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
      }
    }, {
      key: "tabs",
      get: function get() {
        return this.shadowRoot.querySelector(PfeTabs.tag + "[visible-at=\"large\"]");
      }
    }, {
      key: "accordion",
      get: function get() {
        return this.shadowRoot.querySelector(PfeAccordion.tag + "[visible-at=\"small\"]");
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.2.0";
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
    }, {
      key: "properties",
      get: function get() {
        // @TODO: Move this logic to pfelement

        // This removes observers that live in the dependent components
        // and cascades the property to the relevant component if it's not
        // an aliased property (just cascade the source of truth instead of both)
        var inheritProperties = function inheritProperties(obj, tagName) {
          var newObj = Object.assign({}, obj);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.entries(newObj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _ref = _step.value;

              var _ref2 = slicedToArray(_ref, 2);

              var key = _ref2[0];
              var value = _ref2[1];

              // Delete the observer from the property
              if (value.observer) delete newObj[key].observer;
              if (value.cascade) delete newObj[key].cascade;

              // If alias exists, don't add cascade
              if (!value.alias) newObj[key].cascade = tagName;
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

          return newObj;
        };

        // Set up the inheritance for tabs and accordion
        var tabProps = inheritProperties(PfeTabs.properties, PfeTabs.tag);
        var accordionProps = inheritProperties(PfeAccordion.properties, PfeAccordion.tag);

        // Merge these two sets of properties
        var dependentProps = Object.assign(tabProps, accordionProps);

        // Assign these values to the combo along with it's own properties
        return Object.assign(dependentProps, {
          breakpoint: {
            title: "Custom breakpoint",
            type: String,
            observer: "_updateBreakpoint"
          },
          // @TODO: Deprecated in 1.0
          align: {
            type: String,
            enum: ["center"],
            alias: "tabAlign"
          },
          oldAlign: {
            attr: "pfe-align",
            alias: "tabAlign"
          },
          // @TODO: Deprecated in 1.0
          oldBreakpoint: {
            type: String,
            alias: "breakpoint",
            attr: "pfe-breakpoint"
          },
          // @TODO: Deprecated in 1.0
          pfeId: {
            type: String,
            attr: "pfe-id",
            observer: "_copyToId"
          }
        });
      }
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

      var _this = possibleConstructorReturn(this, (PfeContentSet.__proto__ || Object.getPrototypeOf(PfeContentSet)).call(this, PfeContentSet));

      _this._mutationHandler = _this._mutationHandler.bind(_this);
      _this._resizeHandler = _this._resizeHandler.bind(_this);

      _this._observer = new MutationObserver(_this._mutationHandler);
      if (window.ResizeObserver) _this._resizeObserver = new ResizeObserver(_this._resizeHandler);
      return _this;
    }

    createClass(PfeContentSet, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "connectedCallback", this).call(this);

        if (this.hasLightDOM()) {
          Promise.all([customElements.whenDefined(PfeTabs.tag), customElements.whenDefined(PfeAccordion.tag)]).then(function () {
            _this2._build();
          });
        }

        this._observer.observe(this, CONTENT_MUTATION_CONFIG);

        // If the browser supports the resizeObserver and the parentElement exists, set to observe
        if (window.ResizeObserver && this.parentElement) this._resizeObserver.observe(this.parentElement);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeContentSet.prototype.__proto__ || Object.getPrototypeOf(PfeContentSet.prototype), "disconnectedCallback", this).call(this);
        this._observer.disconnect();
        if (window.ResizeObserver) this._resizeObserver.disconnect();
      }
    }, {
      key: "_mutationHandler",
      value: function _mutationHandler(mutationsList) {
        var _this3 = this;

        if (window.ShadyCSS) {
          this._observer.disconnect();

          // Use the vanilla build tasks in IE11
          this._build();

          setTimeout(function () {
            _this3._observer.observe(_this3, CONTENT_MUTATION_CONFIG);
          }, 0);
          return;
        }

        if (mutationsList) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = mutationsList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var mutation = _step2.value;

              switch (mutation.type) {
                case "childList":
                  if (mutation.addedNodes) this._build(mutation.addedNodes);
                  if (mutation.removedNodes) this._removeNodes(mutation.removedNodes);
                  break;
                case "characterData":
                  if (mutation.target && mutation.target.parentNode) this._updateNode(mutation.target.parentNode, mutation.target.textContent);
                  break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          // If no mutation list is provided, rebuild the whole thing
          this._build();
        }
      }
    }, {
      key: "_isHeader",
      value: function _isHeader(el) {
        return el.hasAttribute(this.tag + "--header") || el.tagName.match(/H[1-6]/);
      }
    }, {
      key: "_isPanel",
      value: function _isPanel(el) {
        return el.hasAttribute(this.tag + "--panel");
      }
    }, {
      key: "_toggleVisible",
      value: function _toggleVisible() {
        if (this.isTab) {
          if (this.tabs) this.tabs.removeAttribute("hidden");
          if (this.accordion) this.accordion.setAttribute("hidden", "");
        } else {
          if (this.accordion) this.accordion.removeAttribute("hidden");
          if (this.tabs) this.tabs.setAttribute("hidden", "");
        }
      }
    }, {
      key: "_removeNodes",
      value: function _removeNodes(list) {
        var _this4 = this;

        list.forEach(function (item) {
          return _this4._removeNode(item);
        });

        // Check if the container is empty
        [this.tabs, this.accordion].forEach(function (host) {
          if (!host.hasChildNodes()) host.setAttribute("hidden", "");
        });
      }
    }, {
      key: "_findConnection",
      value: function _findConnection(node, host) {
        if (node.nodeName !== "#text") {
          // If this node is mapped to one in the shadow DOM
          if (node.hasAttribute("maps-to")) {
            var id = node.getAttribute("maps-to");
            if (id !== null) {
              var connection = host.querySelector("#" + id);
              if (connection) {
                return connection;
              } else {
                this.warn("no element could be found with #" + id);
              }
            }
          }
        }

        return null;
      }
    }, {
      key: "_removeNode",
      value: function _removeNode(node) {
        var _this5 = this;

        [this.tabs, this.accordion].forEach(function (host) {
          var connection = _findConnection(node, host);
          if (connection) host.removeChild(connection);
          // Fire a full rebuild if it can't determine the mapped element
          else _this5._build();
        });
      }
    }, {
      key: "_updateNode",
      value: function _updateNode(node, textContent) {
        var _this6 = this;

        [this.tabs, this.accordion].forEach(function (host) {
          var connection = _findConnection(node, host);
          if (connection) connection.textContent = textContent;
          // Fire a full rebuild if it can't determine the mapped element
          else _this6._build();
        });
      }
    }, {
      key: "_buildSets",
      value: function _buildSets(sets, template) {
        var _this7 = this;

        var fragment = document.createDocumentFragment();

        var _loop = function _loop(i) {
          var header = sets[i];
          var panel = sets[i + 1];

          // Set up the template for the sets of content
          var wrapper = document.createElement("template");
          wrapper.innerHTML = template.trim();
          var templateMarkup = wrapper.content.cloneNode(true);

          if (!header) _this7.warn("no element found at position " + i + " of the light DOM input.");
          if (!panel) _this7.warn("no element found at position " + (i + 1) + " of the light DOM input.");

          if (header && _this7._isHeader(header) && panel && _this7._isPanel(panel)) {
            // Capture the line-item from the template
            [header, panel].forEach(function (region, idx) {
              var section = idx === 0 ? "header" : "panel";

              var piece = templateMarkup.querySelector("[content-type=\"" + section + "\"]").cloneNode(true);

              var id = region.id || region.getAttribute("pfe-id") || _this7.randomId;
              var clone = region.cloneNode(true);

              // Remove the flag from the clone
              clone.removeAttribute(_this7.tag + "--" + section);

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
      key: "_build",
      value: function _build(addedNodes) {
        var _this8 = this;

        // Check if the appropriate tag exists already
        [this.tabs, this.accordion].forEach(function (host) {
          var template = host.tag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;
          // If no id is present, give it the id from the wrapper
          if (!host.id) host.id = _this8.id || _this8.pfeId || _this8.randomId;

          var rawSets = addedNodes ? addedNodes : _this8.children ? _this8.children : null;

          // Clear out the content of the host if we're using the full child list
          if (!addedNodes && rawSets) host.innerHTML = "";

          // If sets is not null, build them using the template
          if (rawSets) {
            var sets = _this8._buildSets(rawSets, template);
            if (sets) host.appendChild(sets);
          }

          _this8._toggleVisible();
        });

        // Wait until the tags upgrade before setting the selectedIndex value
        Promise.all([customElements.whenDefined(PfeTabs.tag), customElements.whenDefined(PfeAccordion.tag)]).then(function () {
          // pass the selectedIndex property down from pfe-content-set
          // to pfe-tabs if there is a selectedIndex value that's not 0
          if (_this8.isTab) {
            // Pass the selectedIndex down to the tabset
            if (_this8.selectedIndex) {
              _this8.tabs.selectedIndex = _this8.selectedIndex;
            }
          }
        });
      }
    }, {
      key: "_copyToId",
      value: function _copyToId() {
        // Don't overwrite an existing ID but backwards support pfe-id
        if (!this.id) this.id = this.pfeId;
      }
    }, {
      key: "_resizeHandler",
      value: function _resizeHandler() {
        this._toggleVisible();
      }
    }, {
      key: "_updateBreakpoint",
      value: function _updateBreakpoint(oldVal, newVal) {
        // If the correct rendering element isn't in use yet, build it from scratch
        this._toggleVisible();
      }
    }]);
    return PfeContentSet;
  }(PFElement);

  PFElement.create(PfeContentSet);

  return PfeContentSet;

})));
//# sourceMappingURL=pfe-content-set.umd.js.map
