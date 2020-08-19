(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeSelect = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  // -- POLYFILLS: Object.assign, for IE11
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
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

  /*!
   * PatternFly Elements: PfeSelect 1.0.0-prerelease.55
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

  var PfeSelect = function (_PFElement) {
    inherits(PfeSelect, _PFElement);
    createClass(PfeSelect, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{position:relative;display:inline-block;width:100%;line-height:1.5em;font-weight:400;text-align:left;text-rendering:optimizelegibility;border-top:1px solid #f0f0f0;border-top:var(--pfe-select--BorderTop,var(--pfe-select--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-select--BorderColor,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-right:1px solid #f0f0f0;border-right:var(--pfe-select--BorderRight,var(--pfe-select--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-select--BorderColor,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-bottom:1px solid #3c3f42;border-bottom:var(--pfe-select--BorderBottom,var(--pfe-select--BorderBottomWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-select--BorderBottomColor,var(--pfe-theme--color--surface--darker,#3c3f42)));border-left:1px solid #f0f0f0;border-left:var(--pfe-select--BorderLeft,var(--pfe-select--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-select--BorderColor,var(--pfe-theme--color--surface--lighter,#f0f0f0)));background-color:#fff;background-color:var(--pfe-select--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));color:#151515;color:var(--pfe-select--Color,var(--pfe-theme--color--text,#151515))}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host::after{border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:6px 6px 0;border-color:transparent;border-top-color:#030303;-webkit-transform:rotate(0);transform:rotate(0);display:inline-block;content:\"\";position:absolute;top:calc(16px * .875);top:calc(var(--pfe-theme--container-padding,16px) * .875);right:calc(16px * .75);right:calc(var(--pfe-theme--container-padding,16px) * .75)}:host([hidden]){display:none}:host(:hover){border-bottom:1px solid #06c;border-bottom:var(--pfe-select--BorderBottom--hover,var(--pfe-select--BorderBottomWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-select--BorderBottomColor--hover,var(--pfe-theme--color--link,#06c)))}:host(:focus-within){border-bottom-width:calc(4px / 2);border-bottom-width:calc(var(--pfe-theme--surface--border-width--heavy,4px)/ 2);border-bottom-color:#06c;border-bottom-color:var(--pfe-select--BorderBottomColor--hover,var(--pfe-theme--color--link,#06c))}:host(:focus-within) ::slotted(select){padding-bottom:calc(1rem * .438);padding-bottom:calc(var(--pfe-theme-container-padding,1rem) * .438)}:host ::slotted(select){text-rendering:auto!important;background-color:#fff;background-color:var(--pfe-select--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));color:#151515;color:var(--pfe-select--Color,var(--pfe-theme--color--text,#151515));border-radius:0;width:100%;min-width:100%;font-size:16px;font-size:var(--pfe-theme--font-size,16px);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-select--FontFamily, var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif));-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-shadow:none;box-shadow:none;border:none;padding:calc(16px * .5);padding:calc(var(--pfe-theme--container-padding,16px) * .5);padding-right:calc(16px * 1.5);padding-right:calc(var(--pfe-theme--container-padding,16px) * 1.5)}:host([pfe-invalid]){border-bottom-width:calc(4px / 2);border-bottom-width:calc(var(--pfe-theme--surface--border-width--heavy,4px)/ 2);border-bottom-color:#b00;border-bottom-color:var(--pfe-select--BorderBottomColor--error,var(--pfe-theme--color--feedback--critical,#b00))}:host([pfe-invalid]) ::slotted(select){padding-bottom:calc(16px * .438);padding-bottom:calc(var(--pfe-theme--container-padding,16px) * .438);background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23c9190b' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E\");background-size:.875rem;background-repeat:no-repeat;background-position:calc(100% - calc(16px * 2)) center;background-position:calc(100% - calc(var(--pfe-theme--container-padding,16px) * 2)) center}\n/*# sourceMappingURL=pfe-select.min.css.map */\n</style><slot></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-select.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-select.scss";
      }
    }, {
      key: "pfeOptions",
      get: function get$$1() {
        return this._pfeOptions;
      },
      set: function set$$1(options) {
        this._pfeOptions = options.filter(function (el) {
          return el.selected;
        }).length > 1 ? this._handleMultipleSelectedValues(options) : options;
        this._modifyDOM();
      }
    }, {
      key: "pfeInvalid",
      get: function get$$1() {
        return this.getAttribute("pfe-invalid");
      },
      set: function set$$1(invalidAttr) {
        if (!invalidAttr) {
          return;
        }
        this.querySelector("select").setAttribute("aria-invalid", invalidAttr);
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-select";
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          change: this.tag + ":change"
        };
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-invalid"];
      }
    }]);

    function PfeSelect() {
      classCallCheck(this, PfeSelect);

      var _this = possibleConstructorReturn(this, (PfeSelect.__proto__ || Object.getPrototypeOf(PfeSelect)).call(this, PfeSelect));

      _this._pfeOptions = null;
      _this._init = _this._init.bind(_this);
      _this._inputChanged = _this._inputChanged.bind(_this);

      _this.observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeSelect, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        get(PfeSelect.prototype.__proto__ || Object.getPrototypeOf(PfeSelect.prototype), "connectedCallback", this).call(this);
        customElements.whenDefined(PfeSelect.tag).then(function () {
          if (_this2.pfeOptions) {
            _this2._modifyDOM();
            _this2._init();
          } else {
            if (_this2.children.length) {
              _this2._init();
            } else {
              console.warn(PfeSelect.tag + ": The first child in the light DOM must be a supported select tag");
            }
          }
        });
        this.observer.observe(this, { childList: true });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeSelect.prototype.__proto__ || Object.getPrototypeOf(PfeSelect.prototype), "attributeChangedCallback", this).call(this, attr, oldValue, newValue);
        this.pfeInvalid = newValue;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.observer.disconnect();
        this._input.removeEventListener("input", this._inputChanged);
      }
    }, {
      key: "addOptions",
      value: function addOptions(options) {
        // Reset the pfeOptions by concatenating newly added options with _pfeOptions
        this._pfeOptions = this._pfeOptions ? this._pfeOptions.concat(options) : options;
      }
    }, {
      key: "_handleMultipleSelectedValues",
      value: function _handleMultipleSelectedValues(options) {
        // Warn if options array has more than one selected value set as true
        console.warn(PfeSelect.tag + ": The first 'selected' option will take precedence over others incase of multiple 'selected' options");
        // Get the index of the first element with selected "true"
        var firstIndex = options.findIndex(function (el) {
          return el.selected;
        });
        // Update the options array with precedence to first element with selected value as true
        return options.map(function (el, idx) {
          el.selected = firstIndex == idx;
          return el;
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        this._input = this.querySelector("select");
        if (!this._input) {
          console.warn(PfeSelect.tag + ": The first child needs to be a select element");
          return;
        }
        this._input.addEventListener("change", this._inputChanged);
      }
    }, {
      key: "_inputChanged",
      value: function _inputChanged() {
        this.emitEvent(PfeSelect.events.change, {
          detail: {
            value: this._input.value
          }
        });
      }
    }, {
      key: "_modifyDOM",
      value: function _modifyDOM() {
        // Create select element
        var pfeSelect = document.createElement("select");
        // Create option element for each element in _pfeOptions array
        this._pfeOptions.map(function (el) {
          var option = Object.assign(document.createElement("option"), el);
          pfeSelect.add(option, null);
        });
        // if select already exists in the DOM then replace the old select with the new _pfeOptions array
        if (this.children.length) {
          var select = this.querySelector("select");
          select.parentNode.replaceChild(pfeSelect, select);
        } else {
          // Otherwise create a new select element
          this.appendChild(pfeSelect);
        }
      }
    }]);
    return PfeSelect;
  }(PFElement);

  PFElement.create(PfeSelect);

  return PfeSelect;

})));
//# sourceMappingURL=pfe-select.umd.js.map
