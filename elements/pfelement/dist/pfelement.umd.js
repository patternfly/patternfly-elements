(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PFElement = factory());
}(this, (function () { 'use strict';

  var logger = function logger() {
    return null;
  };

  /**
   * Reveal web components when loading is complete by removing the unresolved attribute
   * from the body tag; log the event.
   * @throws debugging log indicating the reveal event
   */
  function reveal() {
    logger("[reveal] elements ready, revealing the body");
    window.document.body.removeAttribute("unresolved");
  }

  /**
   * Auto-reveal functionality prevents a flash of unstyled content before components
   * have finished loading.
   * @param {function} logFunction
   * @see https://github.com/github/webcomponentsjs#webcomponents-loaderjs
   */
  function autoReveal(logFunction) {
    logger = logFunction;
    // If Web Components are already ready, run the handler right away.  If they
    // are not yet ready, wait.
    //
    // see https://github.com/github/webcomponentsjs#webcomponents-loaderjs for
    // info about web component readiness events
    var polyfillPresent = window.WebComponents;
    var polyfillReady = polyfillPresent && window.WebComponents.ready;

    if (!polyfillPresent || polyfillReady) {
      handleWebComponentsReady();
    } else {
      window.addEventListener("WebComponentsReady", handleWebComponentsReady);
    }
  }

  /**
   * Reveal web components when loading is complete and log event.
   * @throws debugging log indicating the web components are ready
   */
  function handleWebComponentsReady() {
    logger("[reveal] web components ready");
    reveal();
  }

  /**
   * Verify that a property definition's `type` field contains one of the allowed
   * types.  If the definition type resolves to falsy, assumes String type.
   * @param {constructor} definition
   * @default String
   * @return {Boolean} True if the definition type is one of String, Number, or Boolean
   */
  function isAllowedType(definition) {
    return [String, Number, Boolean].includes(definition.type || String);
  }

  /**
   * Verify that a property definition's `default` value is of the correct type.
   *
   * A `default` value is valid if it's of the same type as the `type`
   * definition.  Or, if there is no `type` definition, then it must be a String
   * (the default value for `type`).
   * @param {type} definition
   * @return {Boolean} True if the default value matches the type of the definition object.
   */
  function isValidDefaultType(definition) {
    return definition.hasOwnProperty("default") && definition.default.constructor === definition.type;
  }

  // @POLYFILL  Array.includes
  /** @see https://tc39.github.io/ecma262/#sec-array.prototype.includes */
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
      value: function value(valueToFind, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        // 1. Let O be ? ToObject(this value).
        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(valueToFind, elementK) is true, return true.
          if (sameValueZero(o[k], valueToFind)) {
            return true;
          }
          // c. Increase k by 1.
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

  // @POLYFILL Object.entries
  /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries */
  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }return resArray;
    };
  }

  // @POLYFILL String.startsWith
  /** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#polyfill */
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
      value: function value(search, rawPos) {
        var pos = rawPos > 0 ? rawPos | 0 : 0;
        return this.substring(pos, pos + search.length) === search;
      }
    });
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*!
   * PatternFly Elements: PFElement 1.7.0
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

  // /**
  //  * Global prefix used for all components in the project.
  //  * @constant {String}
  //  * */
  var prefix = "pfe";

  /**
   * @class PFElement
   * @extends HTMLElement
   * @version 1.7.0
   * @classdesc Serves as the baseline for all PatternFly Element components.
   */

  var PFElement = function (_HTMLElement) {
    inherits(PFElement, _HTMLElement);
    createClass(PFElement, [{
      key: "log",


      /**
       * Local logging that outputs the tag name as a prefix automatically
       *
       * @example this.log("Hello");
       */
      value: function log() {
        for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
          msgs[_key] = arguments[_key];
        }

        PFElement.log.apply(PFElement, ["[" + this.tag + (this.id ? "#" + this.id : "") + "]"].concat(msgs));
      }

      /**
       * A console warning wrapper which formats your output with useful debugging information.
       *
       * @example PFElement.warn("Hello");
       */

    }, {
      key: "warn",


      /**
       * Local warning wrapper that outputs the tag name as a prefix automatically.
       * For use inside a component's function.
       * @example this.warn("Hello");
       */
      value: function warn() {
        for (var _len2 = arguments.length, msgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          msgs[_key2] = arguments[_key2];
        }

        PFElement.warn.apply(PFElement, ["[" + this.tag + (this.id ? "#" + this.id : "") + "]"].concat(msgs));
      }

      /**
       * A console error wrapper which formats your output with useful debugging information.
       * For use inside a component's function.
       * @example PFElement.error("Hello");
       */

    }, {
      key: "error",


      /**
       * Local error wrapper that outputs the tag name as a prefix automatically.
       * For use inside a component's function.
       * @example this.error("Hello");
       */
      value: function error() {
        for (var _len3 = arguments.length, msgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          msgs[_key3] = arguments[_key3];
        }

        PFElement.error.apply(PFElement, ["[" + this.tag + (this.id ? "#" + this.id : "") + "]"].concat(msgs));
      }

      /**
       * A global definition of component types (a general way of defining the purpose of a
       * component and how it is put together).
       */

    }, {
      key: "hasLightDOM",


      /**
       * Returns a boolean statement of whether or not this component contains any light DOM.
       * @returns {boolean}
       * @example if(this.hasLightDOM()) this._init();
       */
      value: function hasLightDOM() {
        return this.children.length || this.textContent.trim().length;
      }

      /**
       * Returns a boolean statement of whether or not that slot exists in the light DOM.
       *
       * @example this.hasSlot("header");
       */

    }, {
      key: "hasSlot",
      value: function hasSlot(name) {
        var _this2 = this;

        if (!name) {
          this.warn("Please provide at least one slot name for which to search.");
          return;
        }

        switch (typeof name === "undefined" ? "undefined" : _typeof(name)) {
          case "string":
            return [].concat(toConsumableArray(this.children)).filter(function (child) {
              return child.hasAttribute("slot") && child.getAttribute("slot") === name;
            }).length > 0;
          case "array":
            return name.reduce(function (n) {
              return [].concat(toConsumableArray(_this2.children)).filter(function (child) {
                return child.hasAttribute("slot") && child.getAttribute("slot") === n;
              }).length > 0;
            });
          default:
            this.warn("Did not recognize the type of the name provided to hasSlot; this funciton can accept a string or an array.");
            return;
        }
      }

      /**
       * Given a slot name, returns elements assigned to the slot as an arry.
       * If no value is provided (i.e., `this.getSlot()`), it returns all children not assigned to a slot (without a slot attribute).
       *
       * @example: `this.getSlot("header")`
       */

    }, {
      key: "getSlot",
      value: function getSlot() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "unassigned";

        if (name !== "unassigned") {
          return [].concat(toConsumableArray(this.children)).filter(function (child) {
            return child.hasAttribute("slot") && child.getAttribute("slot") === name;
          });
        } else {
          return [].concat(toConsumableArray(this.children)).filter(function (child) {
            return !child.hasAttribute("slot");
          });
        }
      }
    }, {
      key: "cssVariable",
      value: function cssVariable(name, value) {
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

        name = name.substr(0, 2) !== "--" ? "--" + name : name;
        if (value) {
          element.style.setProperty(name, value);
          return value;
        }
        return window.getComputedStyle(element).getPropertyValue(name).trim() || null;
      }

      /**
       * This alerts nested components to a change in the context
       */

    }, {
      key: "contextUpdate",
      value: function contextUpdate() {
        var _this3 = this;

        // Loop over light DOM elements, find direct descendants that are components
        var lightEls = [].concat(toConsumableArray(this.querySelectorAll("*"))).filter(function (item) {
          return item.tagName.toLowerCase().slice(0, 4) === prefix + "-";
        })
        // Closest will return itself or it's ancestor matching that selector
        .filter(function (item) {
          // If there is no parent element, return null
          if (!item.parentElement) return;
          // Otherwise, find the closest component that's this one
          else return item.parentElement.closest("[" + _this3._pfeClass._getCache("prop2attr").pfelement + "]") === _this3;
        });

        // Loop over shadow elements, find direct descendants that are components
        var shadowEls = [].concat(toConsumableArray(this.shadowRoot.querySelectorAll("*"))).filter(function (item) {
          return item.tagName.toLowerCase().slice(0, 4) === prefix + "-";
        })
        // Closest will return itself or it's ancestor matching that selector
        .filter(function (item) {
          // If there is a parent element and we can find another web component in the ancestor tree
          if (item.parentElement && item.parentElement.closest("[" + _this3._pfeClass._getCache("prop2attr").pfelement + "]")) {
            return item.parentElement.closest("[" + _this3._pfeClass._getCache("prop2attr").pfelement + "]") === _this3;
          }
          // Otherwise, check if the host matches this context
          if (item.getRootNode().host === _this3) return true;

          // If neither state is true, return false
          return false;
        });

        var nestedEls = lightEls.concat(shadowEls);

        // If nested elements don't exist, return without processing
        if (nestedEls.length === 0) return;

        // Loop over the nested elements and reset their context
        nestedEls.map(function (child) {
          _this3.log("Update context of " + child.tagName.toLowerCase());
          Promise.all([customElements.whenDefined(child.tagName.toLowerCase())]).then(function () {
            // Ask the component to recheck it's context in case it changed
            child.resetContext(_this3.on);
          });
        });
      }
    }, {
      key: "resetContext",
      value: function resetContext(fallback) {
        if (this.isIE11) return;

        // Priority order for context values to be pulled from:
        //--> 1. context (OLD: pfe-theme)
        //--> 2. --context (OLD: --theme)
        var value = this.context || this.contextVariable || fallback;

        // Validate that the current context (this.on) and the new context (value) are the same OR
        // no context is set and there isn't a new context being set
        if (this.on === value || !this.on && !value) return;

        this.log("Resetting context from " + this.on + " to " + (value || "null"));
        this.on = value;
      }
    }, {
      key: "version",


      /**
       * A local alias to the static version.
       * For use in the console to validate version being loaded.
       * @example PfeAccordion.version
       */
      get: function get() {
        return this._pfeClass.version;
      }

      /**
       * Global property definitions: properties managed by the base class that apply to all components.
       */

    }, {
      key: "randomId",


      /**
       * A quick way to fetch a random ID value.
       * _Note:_ All values are prefixes with `pfe` automatically to ensure an ID-safe value is returned.
       *
       * @example this.id = this.randomID;
       */
      get: function get() {
        return prefix + "-" + Math.random().toString(36).substr(2, 9);
      }

      /**
       * Set the --context variable with the provided value in this component.
       */

    }, {
      key: "contextVariable",
      set: function set(value) {
        this.cssVariable("context", value);
      }

      /**
       * Get the current value of the --context variable in this component.
       * @return {string} [dark|light|saturated]
       */
      ,
      get: function get() {
        /* @DEPRECATED --theme in 1.0, to be removed in 2.0 */
        return this.cssVariable("context") || this.cssVariable("theme");
      }
    }], [{
      key: "debugLog",

      /**
       * A boolean value that indicates if the logging should be printed to the console; used for debugging.
       * For use in a JS file or script tag; can also be added in the constructor of a component during development.
       * @example PFElement._debugLog = true;
       * @tags debug
       */
      value: function debugLog() {
        var preference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (preference !== null) {
          PFElement._debugLog = !!preference;
        }
        return PFElement._debugLog;
      }

      /**
       * A boolean value that indicates if the performance should be tracked.
       * For use in a JS file or script tag; can also be added in the constructor of a component during development.
       * @example PFElement._trackPerformance = true;
       */

    }, {
      key: "trackPerformance",
      value: function trackPerformance() {
        var preference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (preference !== null) {
          PFElement._trackPerformance = !!preference;
        }
        return PFElement._trackPerformance;
      }

      /**
       * A logging wrapper which checks the debugLog boolean and prints to the console if true.
       *
       * @example PFElement.log("Hello");
       */

    }, {
      key: "log",
      value: function log() {
        if (PFElement.debugLog()) {
          var _console;

          (_console = console).log.apply(_console, arguments);
        }
      }
    }, {
      key: "warn",
      value: function warn() {
        var _console2;

        (_console2 = console).warn.apply(_console2, arguments);
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len4 = arguments.length, msgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          msgs[_key4] = arguments[_key4];
        }

        throw new Error([].concat(msgs).join(" "));
      }
    }, {
      key: "PfeTypes",
      get: function get() {
        return {
          Container: "container",
          Content: "content",
          Combo: "combo"
        };
      }

      /**
       * The current version of a component; set by the compiler using the package.json data.
       */

    }, {
      key: "version",
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          pfelement: {
            title: "Upgraded flag",
            type: Boolean,
            default: true,
            observer: "_upgradeObserver"
          },
          on: {
            title: "Context",
            description: "Describes the visual context (backgrounds).",
            type: String,
            values: ["light", "dark", "saturated"],
            default: function _default(el) {
              return el.contextVariable;
            },
            observer: "_onObserver"
          },
          context: {
            title: "Context hook",
            description: "Lets you override the system-set context.",
            type: String,
            values: ["light", "dark", "saturated"],
            observer: "_contextObserver"
          },
          // @TODO: Deprecated with 1.0
          oldTheme: {
            type: String,
            values: ["light", "dark", "saturated"],
            alias: "context",
            attr: "pfe-theme"
          },
          _style: {
            title: "Custom styles",
            type: String,
            attr: "style",
            observer: "_inlineStyleObserver"
          },
          type: {
            title: "Component type",
            type: String,
            values: ["container", "content", "combo"]
          }
        };
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        var _this4 = this;

        var properties = this.allProperties;
        if (properties) {
          var oa = Object.keys(properties).filter(function (prop) {
            return properties[prop].observer || properties[prop].cascade || properties[prop].alias;
          }).map(function (p) {
            return _this4._convertPropNameToAttrName(p);
          });
          return [].concat(toConsumableArray(oa));
        }
      }
    }]);

    function PFElement(pfeClass) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$type = _ref.type,
          type = _ref$type === undefined ? null : _ref$type,
          _ref$delayRender = _ref.delayRender,
          delayRender = _ref$delayRender === undefined ? false : _ref$delayRender;

      classCallCheck(this, PFElement);

      var _this = possibleConstructorReturn(this, (PFElement.__proto__ || Object.getPrototypeOf(PFElement)).call(this));

      _this._pfeClass = pfeClass;
      _this.tag = pfeClass.tag;
      _this._parseObserver = _this._parseObserver.bind(_this);
      _this.isIE11 = /MSIE|Trident|Edge\//.test(window.navigator.userAgent);

      // Set up the mark ID based on existing ID on component if it exists
      if (!_this.id) {
        _this._markId = _this.randomId.replace("pfe", _this.tag);
      } else if (_this.id.startsWith("pfe-") && !_this.id.startsWith(_this.tag)) {
        _this._markId = _this.id.replace("pfe", _this.tag);
      } else {
        _this._markId = _this.tag + "-" + _this.id;
      }

      _this._markCount = 0;

      // TODO: Deprecated for 1.0 release
      _this.schemaProps = pfeClass.schemaProperties;

      // TODO: Migrate this out of schema for 1.0
      _this.slots = pfeClass.slots;

      _this.template = document.createElement("template");

      // Set the default value to the passed in type
      if (type && _this._pfeClass.allProperties.type) _this._pfeClass.allProperties.type.default = type;

      // Initalize the properties and attributes from the property getter
      _this._initializeProperties();

      _this.attachShadow({ mode: "open" });

      // Tracks if the component has been initially rendered. Useful if for debouncing
      // template updates.
      _this._rendered = false;

      if (!delayRender) _this.render();
      return _this;
    }

    /**
     * Standard connected callback; fires when the component is added to the DOM.
     */


    createClass(PFElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this5 = this;

        this._initializeAttributeDefaults();

        if (window.ShadyCSS) window.ShadyCSS.styleElement(this);

        // If the slot definition exists, set up an observer
        if (_typeof(this.slots) === "object") {
          this._slotsObserver = new MutationObserver(function () {
            return _this5._initializeSlots(_this5.tag, _this5.slots);
          });
          this._initializeSlots(this.tag, this.slots);
        }
      }

      /**
       * Standard disconnected callback; fires when a componet is removed from the DOM.
       * Add your removeEventListeners here.
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this._cascadeObserver) this._cascadeObserver.disconnect();
        if (this._slotsObserver) this._slotsObserver.disconnect();
      }

      /**
       * Attribute changed callback fires when attributes are updated.
       * This combines the global and the component-specific logic.
       */

    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        if (!this._pfeClass.allProperties) return;

        var propName = this._pfeClass._attr2prop(attr);

        var propDef = this._pfeClass.allProperties[propName];

        // If the attribute that changed derives from a property definition
        if (propDef) {
          // If the property/attribute pair has an alias, copy the new value to the alias target
          if (propDef.alias) {
            var aliasedPropDef = this._pfeClass.allProperties[propDef.alias];
            var aliasedAttr = this._pfeClass._prop2attr(propDef.alias);
            var aliasedAttrVal = this.getAttribute(aliasedAttr);
            if (aliasedAttrVal !== newVal) {
              this[propDef.alias] = this._castPropertyValue(aliasedPropDef, newVal);
            }
          }

          // If the property/attribute pair has an observer, fire it
          // Observers receive the oldValue and the newValue from the attribute changed callback
          if (propDef.observer) {
            this[propDef.observer](this._castPropertyValue(propDef, oldVal), this._castPropertyValue(propDef, newVal));
          }

          // If the property/attribute pair has a cascade target, copy the attribute to the matching elements
          // Note: this handles the cascading of new/updated attributes
          if (propDef.cascade) {
            this._copyAttribute(attr, this._pfeClass._convertSelectorsToArray(propDef.cascade));
          }
        }
      }

      /**
       * Standard render function.
       */

    }, {
      key: "render",
      value: function render() {
        this.shadowRoot.innerHTML = "";
        this.template.innerHTML = this.html;

        if (window.ShadyCSS) {
          window.ShadyCSS.prepareTemplate(this.template, this.tag);
        }

        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        this.log("render");

        // Cascade properties to the rendered template
        this.cascadeProperties();

        // Update the display context
        this.contextUpdate();

        if (PFElement.trackPerformance()) {
          try {
            performance.mark(this._markId + "-rendered");

            if (this._markCount < 1) {
              this._markCount = this._markCount + 1;

              // Navigation start, i.e., the browser first sees that the user has navigated to the page
              performance.measure(this._markId + "-from-navigation-to-first-render", undefined, this._markId + "-rendered");

              // Render is run before connection unless delayRender is used
              performance.measure(this._markId + "-from-defined-to-first-render", this._markId + "-defined", this._markId + "-rendered");
            }
          } catch (err) {
            this.log("Performance marks are not supported by this browser.");
          }
        }

        // If the slot definition exists, set up an observer
        if (_typeof(this.slots) === "object" && this._slotsObserver) {
          this._slotsObserver.observe(this, { childList: true });
        }

        // If an observer was defined, set it to begin observing here
        if (this._cascadeObserver) {
          this._cascadeObserver.observe(this, {
            attributes: true,
            childList: true,
            subtree: true
          });
        }

        this._rendered = true;
      }

      /**
       * A wrapper around an event dispatch to standardize formatting.
       */

    }, {
      key: "emitEvent",
      value: function emitEvent(name) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$bubbles = _ref2.bubbles,
            bubbles = _ref2$bubbles === undefined ? true : _ref2$bubbles,
            _ref2$cancelable = _ref2.cancelable,
            cancelable = _ref2$cancelable === undefined ? false : _ref2$cancelable,
            _ref2$composed = _ref2.composed,
            composed = _ref2$composed === undefined ? true : _ref2$composed,
            _ref2$detail = _ref2.detail,
            detail = _ref2$detail === undefined ? {} : _ref2$detail;

        if (detail) this.log("Custom event: " + name, detail);else this.log("Custom event: " + name);

        this.dispatchEvent(new CustomEvent(name, {
          bubbles: bubbles,
          cancelable: cancelable,
          composed: composed,
          detail: detail
        }));
      }

      /**
       * Handles the cascading of properties to nested components when new elements are added
       * Attribute updates/additions are handled by the attribute callback
       */

    }, {
      key: "cascadeProperties",
      value: function cascadeProperties(nodeList) {
        var _this6 = this;

        var cascade = this._pfeClass._getCache("cascadingProperties");

        if (cascade) {
          if (this._cascadeObserver) this._cascadeObserver.disconnect();

          var selectors = Object.keys(cascade);
          // Find out if anything in the nodeList matches any of the observed selectors for cacading properties
          if (nodeList) {
            selectors = [];
            [].concat(toConsumableArray(nodeList)).forEach(function (nodeItem) {
              Object.keys(cascade).map(function (selector) {
                // if this node has a match function (i.e., it's an HTMLElement, not
                // a text node), see if it matches the selector, otherwise drop it (like it's hot).
                if (nodeItem.matches && nodeItem.matches(selector)) {
                  selectors.push(selector);
                }
              });
            });
          }

          // If a match was found, cascade each attribute to the element
          if (selectors) {
            var components = selectors.filter(function (item) {
              return item.slice(0, prefix.length + 1) === prefix + "-";
            }).map(function (name) {
              return customElements.whenDefined(name);
            });

            if (components) Promise.all(components).then(function () {
              _this6._copyAttributes(selectors, cascade);
            });else this._copyAttributes(selectors, cascade);
          }

          // @TODO This is here for IE11 processing; can move this after deprecation
          if (this._rendered && this._cascadeObserver) this._cascadeObserver.observe(this, {
            attributes: true,
            childList: true,
            subtree: true
          });
        }
      }

      /* --- Observers for global properties --- */

      /**
       * This responds to changes in the pfelement attribute; indicates if the component upgraded
       * @TODO maybe we should use just the attribute instead of the class?
       * https://github.com/angular/angular/issues/15399#issuecomment-318785677
       */

    }, {
      key: "_upgradeObserver",
      value: function _upgradeObserver() {
        this.classList.add("PFElement");
      }

      /**
       * This responds to changes in the context attribute; manual override tool
       */

    }, {
      key: "_contextObserver",
      value: function _contextObserver(oldValue, newValue) {
        if (newValue && (oldValue && oldValue !== newValue || !oldValue)) {
          this.log("Running the context observer");
          this.on = newValue;
          this.cssVariable("context", newValue);
        }
      }

      /**
       * This responds to changes in the context; source of truth for components
       */

    }, {
      key: "_onObserver",
      value: function _onObserver(oldValue, newValue) {
        if (oldValue && oldValue !== newValue || newValue && !oldValue) {
          this.log("Context update");
          // Fire an event for child components
          this.contextUpdate();
        }
      }

      /**
       * This responds to inline style changes and greps for context or theme updates.
       * @TODO: --theme will be deprecated in 2.0
       */

    }, {
      key: "_inlineStyleObserver",
      value: function _inlineStyleObserver(oldValue, newValue) {
        if (oldValue === newValue) return;
        // If there are no inline styles, a context might have been deleted, so call resetContext
        if (!newValue) this.resetContext();else {
          this.log("Style observer activated on " + this.tag, "" + (newValue || "null"));
          // Grep for context/theme
          var regex = /--[\w|-]*(?:context|theme):\s*(?:\"*(light|dark|saturated)\"*)/gi;
          var match = regex.exec(newValue);

          // If no match is returned, exit the observer
          if (!match) return;

          var newContext = match[1];
          // If the new context value differs from the on value, update
          if (newContext !== this.on && !this.context) this.on = newContext;
        }
      }

      /**
       * This is connected with a mutation observer that watches for updates to the light DOM
       * and pushes down the cascading values
       */

    }, {
      key: "_parseObserver",
      value: function _parseObserver(mutationsList) {
        // Iterate over the mutation list, look for cascade updates
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mutation = _step.value;

            // If a new node is added, attempt to cascade attributes to it
            if (mutation.type === "childList" && mutation.addedNodes.length) {
              this.cascadeProperties(mutation.addedNodes);
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
      }
      /* --- End observers --- */

      /**
       * Validate that the property meets the requirements for type and naming.
       */

    }, {
      key: "_castPropertyValue",


      /**
       * Convert provided property value to the correct type as defined in the properties method.
       */
      value: function _castPropertyValue(propDef, attrValue) {
        var _attrValue$null$NaN$u, _attrValue$undefined$;

        switch (propDef.type) {
          case Number:
            // map various attribute string values to their respective
            // desired property values
            return (_attrValue$null$NaN$u = {}, defineProperty(_attrValue$null$NaN$u, attrValue, Number(attrValue)), defineProperty(_attrValue$null$NaN$u, "null", null), defineProperty(_attrValue$null$NaN$u, "NaN", NaN), defineProperty(_attrValue$null$NaN$u, "undefined", undefined), _attrValue$null$NaN$u)[attrValue];

          case Boolean:
            return attrValue !== null;

          case String:
            return (_attrValue$undefined$ = {}, defineProperty(_attrValue$undefined$, attrValue, attrValue), defineProperty(_attrValue$undefined$, "undefined", undefined), _attrValue$undefined$)[attrValue];

          default:
            return attrValue;
        }
      }

      /**
       * Map provided value to the attribute name on the component.
       */

    }, {
      key: "_assignValueToAttribute",
      value: function _assignValueToAttribute(obj, attr, value) {
        // If the default is false and the property is boolean, we don't need to do anything
        var isBooleanFalse = obj.type === Boolean && !value;
        var isNull = value === null;
        var isUndefined = typeof value === "undefined";

        // If the attribute is not defined, set the default value
        if (isBooleanFalse || isNull || isUndefined) {
          this.removeAttribute(attr);
        } else {
          // Boolean values get an empty string: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
          if (obj.type === Boolean && typeof value === "boolean") {
            this.setAttribute(attr, "");
          } else {
            // Validate against the provided values
            if (obj.values) {
              this._validateAttributeValue(obj, attr, value);
            }

            // Still accept the value provided even if it's not valid
            this.setAttribute(attr, value);
          }
        }
      }

      /**
       * Maps the defined slots into an object that is easier to query
       */

    }, {
      key: "_initializeSlots",
      value: function _initializeSlots(tag, slots) {
        var _this7 = this;

        this.log("Validate slots...");

        if (this._slotsObserver) this._slotsObserver.disconnect();

        // Loop over the properties provided by the schema
        Object.keys(slots).forEach(function (slot) {
          var slotObj = slots[slot];

          // Only attach the information if the data provided is a schema object
          if ((typeof slotObj === "undefined" ? "undefined" : _typeof(slotObj)) === "object") {
            var slotExists = false;
            var result = [];
            // If it's a named slot, look for that slot definition
            if (slotObj.namedSlot) {
              // Check prefixed slots
              result = _this7.getSlot(tag + "--" + slot);
              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }

              // Check for unprefixed slots
              result = _this7.getSlot("" + slot);
              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }
              // If it's the default slot, look for direct children not assigned to a slot
            } else {
              result = [].concat(toConsumableArray(_this7.children)).filter(function (child) {
                return !child.hasAttribute("slot");
              });

              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }
            }

            // If the slot exists, attach an attribute to the parent to indicate that
            if (slotExists) {
              _this7.setAttribute("has_" + slot, "");
            } else {
              _this7.removeAttribute("has_" + slot);
            }
          }
        });

        this.log("Slots validated.");

        if (this._slotsObserver) this._slotsObserver.observe(this, { childList: true });
      }

      /**
       * Sets up the property definitions based on the properties method.
       */

    }, {
      key: "_initializeProperties",
      value: function _initializeProperties() {
        var _this8 = this;

        var properties = this._pfeClass.allProperties;
        var hasCascade = false;

        if (Object.keys(properties).length > 0) this.log("Initialize properties");

        var _loop = function _loop(propName) {
          var propDef = properties[propName];

          // Check if the property exists, throw a warning if it does.
          // HTMLElements have a LOT of properties; it wouldn't be hard
          // to overwrite one accidentally.
          if (typeof _this8[propName] !== "undefined") {
            _this8.log("Property \"" + propName + "\" on " + _this8.constructor.name + " cannot be defined because the property name is reserved");
          } else {
            var attrName = _this8._pfeClass._prop2attr(propName);
            if (propDef.cascade) hasCascade = true;

            Object.defineProperty(_this8, propName, {
              get: function get() {
                var attrValue = _this8.getAttribute(attrName);

                return _this8._castPropertyValue(propDef, attrValue);
              },
              set: function set(rawNewVal) {
                // Assign the value to the attribute
                _this8._assignValueToAttribute(propDef, attrName, rawNewVal);

                return rawNewVal;
              },
              writeable: true,
              enumerable: true,
              configurable: false
            });
          }
        };

        for (var propName in properties) {
          _loop(propName);
        }

        // If any of the properties has cascade, attach a new mutation observer to the component
        if (hasCascade) {
          this._cascadeObserver = new MutationObserver(this._parseObserver);
        }
      }

      /**
       * Intialize the default value for an attribute.
       */

    }, {
      key: "_initializeAttributeDefaults",
      value: function _initializeAttributeDefaults() {
        var properties = this._pfeClass.allProperties;

        for (var propName in properties) {
          var _propDef = properties[propName];

          var attrName = this._pfeClass._prop2attr(propName);

          if (_propDef.hasOwnProperty("default")) {
            var value = _propDef.default;

            // Check if default is a function
            if (typeof _propDef.default === "function") {
              value = _propDef.default(this);
            }

            // If the attribute has not already been set, assign the default value
            if (!this.hasAttribute(attrName)) {
              // Assign the value to the attribute
              this._assignValueToAttribute(_propDef, attrName, value);
            }
          }
        }
      }

      /**
       * Validate the value against provided values.
       */
      // @TODO add support for a validation function

    }, {
      key: "_validateAttributeValue",
      value: function _validateAttributeValue(propDef, attr, value) {
        if (Array.isArray(propDef.values) && propDef.values.length > 0 && !propDef.values.includes(value) // ||
        // (typeof propDef.values === "string" && propDef.values !== value) ||
        // (typeof propDef.values === "function" && !propDef.values(value))
        ) {
            this.warn(value + " is not a valid value for " + attr + ". Please provide one of the following values: " + propDef.values.join(", "));
          }

        return value;
      }

      /**
       * Look up an attribute name linked to a given property name.
       */

    }, {
      key: "_copyAttributes",
      value: function _copyAttributes(selectors, set) {
        var _this9 = this;

        selectors.forEach(function (selector) {
          set[selector].forEach(function (attr) {
            _this9._copyAttribute(attr, selector);
          });
        });
      }
    }, {
      key: "_copyAttribute",
      value: function _copyAttribute(name, to) {
        var recipients = [].concat(toConsumableArray(this.querySelectorAll(to)), toConsumableArray(this.shadowRoot.querySelectorAll(to)));
        var value = this.getAttribute(name);
        var fname = value == null ? "removeAttribute" : "setAttribute";
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = recipients[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var node = _step2.value;

            node[fname](name, value);
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
      }
    }], [{
      key: "_validateProperties",
      value: function _validateProperties() {
        for (var propName in this.allProperties) {
          var _propDef2 = this.allProperties[propName];

          // Verify that properties conform to the allowed data types
          if (!isAllowedType(_propDef2)) {
            this.error("Property \"" + propName + "\" on " + this.name + " must have type String, Number, or Boolean.");
          }

          // Verify the property name conforms to our naming rules
          if (!/^[a-z_]/.test(propName)) {
            this.error("Property " + this.name + "." + propName + " defined, but prop names must begin with a lower-case letter or an underscore");
          }

          var isFunction = typeof _propDef2.default === "function";

          // If the default value is not the same type as defined by the property
          // and it's not a function (we can't validate the output of the function
          // on the class level), throw a warning
          if (_propDef2.default && !isValidDefaultType(_propDef2) && !isFunction) this.error("[" + this.name + "] The default value `" + _propDef2.default + "` does not match the assigned type " + _propDef2.type.name + " for the '" + propName + "' property");
        }
      }
    }, {
      key: "_prop2attr",
      value: function _prop2attr(propName) {
        return this._getCache("prop2attr")[propName];
      }

      /**
       * Look up an property name linked to a given attribute name.
       */

    }, {
      key: "_attr2prop",
      value: function _attr2prop(attrName) {
        return this._getCache("attr2prop")[attrName];
      }

      /**
       * Convert a property name to an attribute name.
       */

    }, {
      key: "_convertPropNameToAttrName",
      value: function _convertPropNameToAttrName(propName) {
        var propDef = this.allProperties[propName];

        if (propDef.attr) {
          return propDef.attr;
        }

        return propName.replace(/^_/, "").replace(/^[A-Z]/, function (l) {
          return l.toLowerCase();
        }).replace(/[A-Z]/g, function (l) {
          return "-" + l.toLowerCase();
        });
      }

      /**
       * Convert an attribute name to a property name.
       */

    }, {
      key: "_convertAttrNameToPropName",
      value: function _convertAttrNameToPropName(attrName) {
        for (var prop in this.allProperties) {
          if (this.allProperties[prop].attr === attrName) {
            return prop;
          }
        }

        // Convert the property name to kebab case
        var propName = attrName.replace(/-([A-Za-z])/g, function (l) {
          return l[1].toUpperCase();
        });
        return propName;
      }
    }, {
      key: "_convertSelectorsToArray",
      value: function _convertSelectorsToArray(selectors) {
        if (selectors) {
          if (typeof selectors === "string") return selectors.split(",");else if ((typeof selectors === "undefined" ? "undefined" : _typeof(selectors)) === "object") return selectors;else {
            this.warn("selectors should be provided as a string, array, or object; received: " + (typeof selectors === "undefined" ? "undefined" : _typeof(selectors)) + ".");
          }
        }

        return;
      }
    }, {
      key: "_parsePropertiesForCascade",
      value: function _parsePropertiesForCascade(mergedProperties) {
        var _this10 = this;

        var cascadingProperties = {};
        // Parse the properties to pull out attributes that cascade

        var _loop2 = function _loop2(propName, config) {
          var cascadeTo = _this10._convertSelectorsToArray(config.cascade);

          // Iterate over each node in the cascade list for this property
          if (cascadeTo) cascadeTo.map(function (nodeItem) {
            var attr = _this10._prop2attr(propName);
            // Create an object with the node as the key and an array of attributes
            // that are to be cascaded down to it
            if (!cascadingProperties[nodeItem]) cascadingProperties[nodeItem] = [attr];else cascadingProperties[nodeItem].push(attr);
          });
        };

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.entries(mergedProperties)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _ref3 = _step3.value;

            var _ref4 = slicedToArray(_ref3, 2);

            var propName = _ref4[0];
            var config = _ref4[1];

            _loop2(propName, config);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return cascadingProperties;
      }

      /**
       * Caching the attributes and properties data for efficiency
       */

    }, {
      key: "create",
      value: function create(pfe) {
        pfe._createCache();
        pfe._populateCache(pfe);
        pfe._validateProperties();
        window.customElements.define(pfe.tag, pfe);

        if (PFElement.trackPerformance()) {
          try {
            performance.mark(this._markId + "-defined");
          } catch (err) {
            this.log("Performance marks are not supported by this browser.");
          }
        }
      }
    }, {
      key: "_createCache",
      value: function _createCache() {
        this._cache = {
          properties: {},
          globalProperties: {},
          componentProperties: {},
          cascadingProperties: {},
          attr2prop: {},
          prop2attr: {}
        };
      }

      /**
       * Cache an object in a given cache namespace.  This overwrites anything
       * already in that namespace.
       */

    }, {
      key: "_setCache",
      value: function _setCache(namespace, object) {
        this._cache[namespace] = object;
      }

      /**
       * Get a cached object by namespace, or get all cached objects.
       */

    }, {
      key: "_getCache",
      value: function _getCache(namespace) {
        return namespace ? this._cache[namespace] : this._cache;
      }

      /**
       * Populate initial values for properties cache.
       */

    }, {
      key: "_populateCache",
      value: function _populateCache(pfe) {
        // @TODO add a warning when a component property conflicts with a global property.
        var mergedProperties = _extends({}, pfe.properties, PFElement.properties);

        pfe._setCache("componentProperties", pfe.properties);
        pfe._setCache("globalProperties", PFElement.properties);
        pfe._setCache("properties", mergedProperties);

        // create mapping objects to go from prop name to attrname and back
        var prop2attr = {};
        var attr2prop = {};
        for (var propName in mergedProperties) {
          var attrName = this._convertPropNameToAttrName(propName);
          prop2attr[propName] = attrName;
          attr2prop[attrName] = propName;
        }
        pfe._setCache("attr2prop", attr2prop);
        pfe._setCache("prop2attr", prop2attr);

        var cascadingProperties = this._parsePropertiesForCascade(mergedProperties);
        if (Object.keys(cascadingProperties)) pfe._setCache("cascadingProperties", cascadingProperties);
      }

      /**
       * allProperties returns an object containing PFElement's global properties
       * and the descendents' (such as PfeCard, etc) component properties.  The two
       * objects are merged together and in the case of a property name conflict,
       * PFElement's properties override the component's properties.
       */

    }, {
      key: "allProperties",
      get: function get() {
        return this._getCache("properties");
      }

      /**
       * cascadingProperties returns an object containing PFElement's global properties
       * and the descendents' (such as PfeCard, etc) component properties.  The two
       * objects are merged together and in the case of a property name conflict,
       * PFElement's properties override the component's properties.
       */

    }, {
      key: "cascadingProperties",
      get: function get() {
        return this._getCache("cascadingProperties");
      }
    }]);
    return PFElement;
  }(HTMLElement);

  autoReveal(PFElement.log);

  return PFElement;

})));
//# sourceMappingURL=pfelement.umd.js.map
