(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.PFElement = factory());
}(this, (function () { 'use strict';

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

  /*
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

  /*
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
  var prefix = "pfe-";

  var PFElement = function (_HTMLElement) {
    inherits(PFElement, _HTMLElement);
    createClass(PFElement, [{
      key: "has_slot",
      value: function has_slot(name) {
        return this.querySelector("[slot='" + name + "']");
      }
    }, {
      key: "has_slot",
      value: function has_slot(name) {
        return this.querySelector("[slot='" + name + "']");
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
      _this._queue = [];
      _this.template = document.createElement("template");

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
        _this.render();
      }
      return _this;
    }

    createClass(PFElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.connected = true;

        if (window.ShadyCSS) {
          window.ShadyCSS.styleElement(this);
        }

        this.classList.add("PFElement");

        if (_typeof(this.props) === "object") {
          this._mapSchemaToProperties(this.tag, this.props);
        }

        if (this._queue.length) {
          this._processQueue();
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.connected = false;
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

        // Loop over the properties provided by the schema
        Object.keys(properties).forEach(function (attr) {
          var data = properties[attr];
          // Set the attribute's property equal to the schema input
          _this2[attr] = data;
          // Initialize the value to null
          _this2[attr].value = null;

          // If the attribute exists on the host
          if (_this2.hasAttribute("" + prefix + attr)) {
            // Set property value based on the existing attribute
            _this2[attr].value = _this2.getAttribute("" + prefix + attr);
          }
          // Otherwise, look for a default and use that instead
          else if (data.default) {
              var dependency_exists = _this2._hasDependency(tag, data.options);
              var no_dependencies = !data.options || data.options && !data.options.dependencies.length;
              // If the dependency exists or there are no dependencies, set the default
              if (dependency_exists || no_dependencies) {
                _this2.setAttribute("" + prefix + attr, data.default);
                _this2[attr].value = data.default;
              }
            }
        });
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
          var slot_exists = dependencies[i].type === "slot" && this.has_slot(tag + "--" + dependencies[i].id);
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
    }, {
      key: "_queueAction",
      value: function _queueAction(action) {
        this._queue.push(action);
      }
    }, {
      key: "_processQueue",
      value: function _processQueue() {
        var _this3 = this;

        this._queue.forEach(function (action) {
          _this3["_" + action.type](action.data);
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
