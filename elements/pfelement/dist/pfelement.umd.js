(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.PFElement = factory());
}(this, (function () { 'use strict';

  var logger = function logger() {
    return null;
  };

  function reveal() {
    logger("[reveal] elements ready, revealing the body");
    window.document.body.removeAttribute("unresolved");
  }

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

  function handleWebComponentsReady() {
    logger("[reveal] web components ready");
    reveal();
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
   * PatternFly Elements: PFElement 1.0.0-prerelease.55
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
  var prefix = "pfe-";

  var PFElement = function (_HTMLElement) {
    inherits(PFElement, _HTMLElement);
    createClass(PFElement, [{
      key: "cssVariable",
      value: function cssVariable(name, value) {
        var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

        name = name.substr(0, 2) !== "--" ? "--" + name : name;
        if (value) {
          element.style.setProperty(name, value);
        }
        return window.getComputedStyle(element).getPropertyValue(name).trim();
      }

      // Returns a single element assigned to that slot; if multiple, it returns the first

    }, {
      key: "has_slot",
      value: function has_slot(name) {
        return this.querySelector("[slot='" + name + "']");
      }

      // Returns an array with all elements assigned to that slot

    }, {
      key: "has_slots",
      value: function has_slots(name) {
        return [].concat(toConsumableArray(this.querySelectorAll("[slot='" + name + "']")));
      }

      // Update the theme context for self and children

    }, {
      key: "context_update",
      value: function context_update() {
        // TODO: update this to use :defined?
        var children = this.querySelectorAll("[pfelement]");
        var theme = this.cssVariable("theme");

        // Manually adding `pfe-theme` overrides the css variable
        if (this.hasAttribute("pfe-theme")) {
          theme = this.getAttribute("pfe-theme");
          // Update the css variable to match the data attribute
          this.cssVariable("theme", theme);
        }

        // Update theme for self
        this.context_set(theme);

        // For each nested, already upgraded component
        // set the context based on the child's value of --theme
        // Note: this prevents contexts from parents overriding
        // the child's context should it exist
        [].concat(toConsumableArray(children)).map(function (child) {
          if (child.connected) {
            child.context_set(theme);
          }
        });
      }

      // Get the theme variable if it exists, set it as an attribute

    }, {
      key: "context_set",
      value: function context_set(fallback) {
        var theme = this.cssVariable("theme");
        if (!theme) {
          theme = this.getAttribute("pfe-theme");
        }
        if (!theme && fallback) {
          theme = fallback;
        }
        if (theme && this.hasAttribute("pfelement")) {
          this.setAttribute("on", theme);
        }
      }
    }, {
      key: "randomId",
      get: function get$$1() {
        return "pfe-" + Math.random().toString(36).substr(2, 9);
      }
    }, {
      key: "version",
      get: function get$$1() {
        return this._pfeClass.version;
      }
    }, {
      key: "pfeType",
      get: function get$$1() {
        return this.getAttribute(prefix + "type");
      },
      set: function set$$1(value) {
        this.setAttribute(prefix + "type", value);
      }
    }], [{
      key: "create",
      value: function create(pfe) {
        window.customElements.define(pfe.tag, pfe);
      }
    }, {
      key: "debugLog",
      value: function debugLog() {
        var preference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (preference !== null) {
          PFElement._debugLog = !!preference;
        }
        return PFElement._debugLog;
      }
    }, {
      key: "log",
      value: function log() {
        if (PFElement.debugLog()) {
          var _console;

          (_console = console).log.apply(_console, arguments);
        }
      }
    }, {
      key: "PfeTypes",
      get: function get$$1() {
        return {
          Container: "container",
          Content: "content",
          Combo: "combo"
        };
      }
    }, {
      key: "version",
      get: function get$$1() {
        return "{{version}}";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-theme"];
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

      _this.connected = false;
      _this._pfeClass = pfeClass;
      _this.tag = pfeClass.tag;
      _this.props = pfeClass.properties;
      _this.slots = pfeClass.slots;
      _this._queue = [];
      _this.template = document.createElement("template");

      _this.log("Constructing...");

      _this.attachShadow({ mode: "open" });

      if (type) {
        _this._queueAction({
          type: "setProperty",
          data: {
            name: "pfeType",
            value: type
          }
        });
      }

      if (!delayRender) {
        _this.log("Render...");
        _this.render();
        _this.log("Rendered.");
      }

      _this.log("Constructed.");
      return _this;
    }

    createClass(PFElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.connected = true;
        this.log("Connecting...");

        if (window.ShadyCSS) {
          this.log("Styling...");
          window.ShadyCSS.styleElement(this);
          this.log("Styled.");
        }

        // Throw a warning if the on attribute was manually added before upgrade
        if (!this.hasAttribute("pfelement") && this.hasAttribute("on")) {
          console.warn("" + this.tag + (this.id ? "[#" + this.id + "]" : "") + ": The \"on\" attribute is protected and should not be manually added to a component. The base class will manage this value for you on upgrade.");
        }

        // @TODO maybe we should use just the attribute instead of the class?
        // https://github.com/angular/angular/issues/15399#issuecomment-318785677
        this.classList.add("PFElement");
        this.setAttribute("pfelement", "");

        if (_typeof(this.props) === "object") {
          this._mapSchemaToProperties(this.tag, this.props);
          this.log("Properties attached.");
        }

        if (_typeof(this.slots) === "object") {
          this._mapSchemaToSlots(this.tag, this.slots);
          this.log("Slots attached.");
        }

        if (this._queue.length) {
          this._processQueue();
        }

        // Initialize the on attribute if a theme variable is set
        // do not update the on attribute if a user has manually added it
        // then trigger an update in nested components
        this.context_update();

        this.log("Connected.");
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.log("Disconnecting...");

        this.connected = false;

        this.log("Disconnected.");
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        if (!this._pfeClass.cascadingAttributes) {
          return;
        }

        var cascadeTo = this._pfeClass.cascadingAttributes[attr];
        if (cascadeTo) {
          this._copyAttribute(attr, cascadeTo);
        }

        if (attr === "pfe-theme") {
          this.context_update();
        }
      }
    }, {
      key: "_copyAttribute",
      value: function _copyAttribute(name, to) {
        var recipients = [].concat(toConsumableArray(this.querySelectorAll(to)), toConsumableArray(this.shadowRoot.querySelectorAll(to)));
        var value = this.getAttribute(name);
        var fname = value == null ? "removeAttribute" : "setAttribute";
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = recipients[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            node[fname](name, value);
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

      // Map the imported properties json to real props on the element
      // @notice static getter of properties is built via tooling
      // to edit modify src/element.json

    }, {
      key: "_mapSchemaToProperties",
      value: function _mapSchemaToProperties(tag, properties) {
        var _this2 = this;

        this.log("Mapping properties...");
        // Loop over the properties provided by the schema
        Object.keys(properties).forEach(function (attr) {
          var data = properties[attr];

          // Only attach the information if the data provided is a schema object
          if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
            // Prefix default is true
            var hasPrefix = true;
            var attrName = attr;
            // Set the attribute's property equal to the schema input
            _this2[attr] = data;
            // Initialize the value to null
            _this2[attr].value = null;

            if (typeof _this2[attr].prefixed !== "undefined") {
              hasPrefix = _this2[attr].prefixed;
            }

            if (hasPrefix) {
              attrName = "" + prefix + attr;
            }

            // If the attribute exists on the host
            if (_this2.hasAttribute(attrName)) {
              // Set property value based on the existing attribute
              _this2[attr].value = _this2.getAttribute(attrName);
            }
            // Otherwise, look for a default and use that instead
            else if (data.default) {
                var dependency_exists = _this2._hasDependency(tag, data.options);
                var no_dependencies = !data.options || data.options && !data.options.dependencies.length;
                // If the dependency exists or there are no dependencies, set the default
                if (dependency_exists || no_dependencies) {
                  _this2.setAttribute(attrName, data.default);
                  _this2[attr].value = data.default;
                }
              }
          }
        });

        this.log("Properties mapped.");
      }

      // Test whether expected dependencies exist

    }, {
      key: "_hasDependency",
      value: function _hasDependency(tag, opts) {
        // Get any possible dependencies for this attribute to exist
        var dependencies = opts ? opts.dependencies : [];
        // Initialize the dependency return value
        var hasDependency = false;
        // Check that dependent item exists
        // Loop through the dependencies defined
        for (var i = 0; i < dependencies.length; i += 1) {
          var slot_exists = dependencies[i].type === "slot" && this.has_slots(tag + "--" + dependencies[i].id).length > 0;
          var attribute_exists = dependencies[i].type === "attribute" && this.getAttribute("" + prefix + dependencies[i].id);
          // If the type is slot, check that it exists OR
          // if the type is an attribute, check if the attribute is defined
          if (slot_exists || attribute_exists) {
            // If the slot does exist, add the attribute with the default value
            hasDependency = true;
            // Exit the loop
            break;
          }
        }
        // Return a boolean if the dependency exists
        return hasDependency;
      }

      // Map the imported slots json
      // @notice static getter of properties is built via tooling
      // to edit modify src/element.json

    }, {
      key: "_mapSchemaToSlots",
      value: function _mapSchemaToSlots(tag, slots) {
        var _this3 = this;

        this.log("Validate slots...");
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
              result = _this3.has_slots(tag + "--" + slot);
              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }

              // Check for unprefixed slots
              result = _this3.has_slots("" + slot);
              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }
              // If it's the default slot, look for direct children not assigned to a slot
            } else {
              result = [].concat(toConsumableArray(_this3.children)).filter(function (child) {
                return !child.hasAttribute("slot");
              });

              if (result.length > 0) {
                slotObj.nodes = result;
                slotExists = true;
              }
            }

            // If the slot exists, attach an attribute to the parent to indicate that
            if (slotExists) {
              _this3.setAttribute("has_" + slot, "");
            } else {
              _this3.removeAttribute("has_" + slot);
            }
          }
        });
        this.log("Slots validated.");
      }
    }, {
      key: "_queueAction",
      value: function _queueAction(action) {
        this._queue.push(action);
      }
    }, {
      key: "_processQueue",
      value: function _processQueue() {
        var _this4 = this;

        this._queue.forEach(function (action) {
          _this4["_" + action.type](action.data);
        });

        this._queue = [];
      }
    }, {
      key: "_setProperty",
      value: function _setProperty(_ref2) {
        var name = _ref2.name,
            value = _ref2.value;

        this[name] = value;
      }

      // @TODO This is a duplicate function to cssVariable above, combine them

    }, {
      key: "var",
      value: function _var(name) {
        return PFElement.var(name, this);
      }
    }, {
      key: "render",
      value: function render() {
        this.shadowRoot.innerHTML = "";
        this.template.innerHTML = this.html;

        if (window.ShadyCSS) {
          window.ShadyCSS.prepareTemplate(this.template, this.tag);
        }

        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      }
    }, {
      key: "log",
      value: function log() {
        for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
          msgs[_key] = arguments[_key];
        }

        PFElement.log.apply(PFElement, ["[" + this.tag + "]"].concat(msgs));
      }
    }, {
      key: "emitEvent",
      value: function emitEvent(name) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$bubbles = _ref3.bubbles,
            bubbles = _ref3$bubbles === undefined ? true : _ref3$bubbles,
            _ref3$cancelable = _ref3.cancelable,
            cancelable = _ref3$cancelable === undefined ? false : _ref3$cancelable,
            _ref3$composed = _ref3.composed,
            composed = _ref3$composed === undefined ? false : _ref3$composed,
            _ref3$detail = _ref3.detail,
            detail = _ref3$detail === undefined ? {} : _ref3$detail;

        this.log("Custom event: " + name);
        this.dispatchEvent(new CustomEvent(name, {
          bubbles: bubbles,
          cancelable: cancelable,
          composed: composed,
          detail: detail
        }));
      }
    }], [{
      key: "var",
      value: function _var(name) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

        return window.getComputedStyle(element).getPropertyValue(name).trim();
      }
    }]);
    return PFElement;
  }(HTMLElement);

  autoReveal(PFElement.log);

  return PFElement;

})));
//# sourceMappingURL=pfelement.umd.js.map
