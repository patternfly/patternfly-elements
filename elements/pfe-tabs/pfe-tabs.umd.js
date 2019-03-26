(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfeTabs = factory(global.PFElement));
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

  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, "find", {
      value: function value(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function");
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      },
      configurable: true,
      writable: true
    });
  }

  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, "findIndex", {
      value: function value(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== "function") {
          throw new TypeError("predicate must be a function");
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      },
      configurable: true,
      writable: true
    });
  }

  var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35
  };

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  var PfeTabs = function (_PFElement) {
    inherits(PfeTabs, _PFElement);
    createClass(PfeTabs, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host {\n  display: block; }\n\n.tabs {\n  --pfe-tabs--BorderColor: var(--pfe-theme--color--surface--border, #dfdfdf);\n  display: flex;\n  border: 0;\n  border-bottom: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor); }\n\n.panels {\n  padding: 0;\n  padding-top: var(--pfe-theme--container-padding, 1rem); }\n\n:host([vertical]) {\n  display: flex; }\n\n:host([vertical]) .tabs {\n  flex-direction: column;\n  width: 25%;\n  border: 0;\n  border-right: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor); }\n\n:host([vertical]) .tabs ::slotted(pfe-tab) {\n  margin: 0 -1px 0 0;\n  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;\n  border-right: 0;\n  position: relative; }\n\n:host([vertical]) .tabs ::slotted(pfe-tab[aria-selected="true"]) {\n  border-color: var(--pfe-tabs--BorderColor);\n  border-right: 0; }\n\n:host([vertical]) .panels {\n  padding: 0;\n  padding-right: var(--pfe-theme--container-padding, 1rem);\n  padding-left: calc(var(--pfe-theme--container-padding, 1rem) * 2); }\n\n:host([pfe-variant="primary"]) .tabs {\n  border-bottom: transparent;\n  border-right: transparent; }\n\n:host([vertical][pfe-variant="primary"]) {\n  align-items: flex-start; }\n\n:host([pfe-variant="secondary"]) .tabs {\n  border-bottom: transparent; }\n\n:host([vertical][pfe-variant="secondary"]) .tabs {\n  justify-content: flex-start; }</style>\n<div class="tabs">\n  <slot name="tab"></slot>\n</div>\n<div class="panels">\n  <slot name="panel"></slot>\n</div>';
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-tabs.scss";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-tabs.html";
      }
    }, {
      key: 'selectedIndex',
      get: function get$$1() {
        return this.getAttribute("selected-index");
      },
      set: function set$$1(value) {
        this.setAttribute("selected-index", value);
      }
    }], [{
      key: 'tag',
      get: function get$$1() {
        return "pfe-tabs";
      }
    }, {
      key: 'observedAttributes',
      get: function get$$1() {
        return ["vertical", "selected-index", "pfe-variant"];
      }
    }]);

    function PfeTabs() {
      classCallCheck(this, PfeTabs);

      var _this = possibleConstructorReturn(this, (PfeTabs.__proto__ || Object.getPrototypeOf(PfeTabs)).call(this, PfeTabs));

      _this._linked = false;

      _this._onSlotChange = _this._onSlotChange.bind(_this);
      _this._onClick = _this._onClick.bind(_this);

      _this._tabSlot = _this.shadowRoot.querySelector('slot[name="tab"]');
      _this._panelSlot = _this.shadowRoot.querySelector('slot[name="panel"]');

      _this._tabSlot.addEventListener("slotchange", _this._onSlotChange);
      _this._panelSlot.addEventListener("slotchange", _this._onSlotChange);
      return _this;
    }

    createClass(PfeTabs, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var _this2 = this;

        get(PfeTabs.prototype.__proto__ || Object.getPrototypeOf(PfeTabs.prototype), 'connectedCallback', this).call(this);

        this.addEventListener("keydown", this._onKeyDown);
        this.addEventListener("click", this._onClick);

        if (!this.hasAttribute("role")) {
          this.setAttribute("role", "tablist");
        }

        if (!this.hasAttribute("selected-index")) {
          this.selectedIndex = 0;
        }

        Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
          return _this2._linkPanels();
        });
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        var _this3 = this;

        this.removeEventListener("keydown", this._onKeyDown);
        this._allTabs().forEach(function (tab) {
          return tab.removeEventListener("click", _this3._onClick);
        });
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        var _this4 = this;

        switch (attr) {
          case "pfe-variant":
            if (this.getAttribute("pfe-variant") === "primary") {
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("pfe-variant", "primary");
              });
            } else if (this.getAttribute("pfe-variant") === "secondary") {
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("pfe-variant", "secondary");
              });
            }
            break;

          case "vertical":
            if (this.hasAttribute("vertical")) {
              this.setAttribute("aria-orientation", "vertical");
              this._allPanels().forEach(function (panel) {
                return panel.setAttribute("vertical", "");
              });
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("vertical", "");
              });
            } else {
              this.removeAttribute("aria-orientation");
              this._allPanels().forEach(function (panel) {
                return panel.removeAttribute("vertical");
              });
              this._allTabs().forEach(function (tab) {
                return tab.removeAttribute("vertical");
              });
            }
            break;

          case "selected-index":
            Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
              _this4._linkPanels();
              _this4.selectIndex(newValue);
            });
        }
      }
    }, {
      key: 'select',
      value: function select(newTab) {
        if (!newTab) {
          return;
        }

        if (newTab.tagName.toLowerCase() !== "pfe-tab") {
          console.warn(PfeTabs.tag + ': the tab must be a pfe-tab element');
          return;
        }

        this.selectedIndex = this._getTabIndex(newTab);
      }
    }, {
      key: 'selectIndex',
      value: function selectIndex(_index) {
        if (_index === undefined) {
          return;
        }

        var index = parseInt(_index, 10);
        var tabs = this._allTabs();
        var tab = tabs[index];

        if (!tab) {
          console.warn(PfeTabs.tag + ': tab ' + _index + ' does not exist');
          return;
        }

        this._selectTab(tab);
      }
    }, {
      key: '_onSlotChange',
      value: function _onSlotChange() {
        this._linked = false;
        this._linkPanels();
      }
    }, {
      key: '_linkPanels',
      value: function _linkPanels() {
        var _this5 = this;

        if (this._linked) {
          return;
        }

        var tabs = this._allTabs();

        tabs.forEach(function (tab) {
          var panel = tab.nextElementSibling;
          if (panel.tagName.toLowerCase() !== "pfe-tab-panel") {
            console.warn(PfeTabs.tag + ': tab #' + tab.pfeId + ' is not a sibling of a <pfe-tab-panel>');
            return;
          }

          tab.setAttribute("aria-controls", panel.pfeId);
          panel.setAttribute("aria-labelledby", tab.pfeId);

          tab.addEventListener("click", _this5._onClick);
        });

        this._linked = true;
      }
    }, {
      key: '_allPanels',
      value: function _allPanels() {
        return [].concat(toConsumableArray(this.querySelectorAll("pfe-tab-panel")));
      }
    }, {
      key: '_allTabs',
      value: function _allTabs() {
        return [].concat(toConsumableArray(this.querySelectorAll("pfe-tab")));
      }
    }, {
      key: '_panelForTab',
      value: function _panelForTab(tab) {
        var panelId = tab.getAttribute("aria-controls");
        return this.querySelector('[pfe-id="' + panelId + '"]');
      }
    }, {
      key: '_prevTab',
      value: function _prevTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        }) - 1;
        return tabs[(newIdx + tabs.length) % tabs.length];
      }
    }, {
      key: '_firstTab',
      value: function _firstTab() {
        var tabs = this._allTabs();
        return tabs[0];
      }
    }, {
      key: '_lastTab',
      value: function _lastTab() {
        var tabs = this._allTabs();
        return tabs[tabs.length - 1];
      }
    }, {
      key: '_nextTab',
      value: function _nextTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        }) + 1;
        return tabs[newIdx % tabs.length];
      }
    }, {
      key: '_getTabIndex',
      value: function _getTabIndex(_tab) {
        var tabs = this._allTabs();
        var index = tabs.findIndex(function (tab) {
          return tab.pfeId === _tab.pfeId;
        });
        return index;
      }
    }, {
      key: 'reset',
      value: function reset() {
        var tabs = this._allTabs();
        var panels = this._allPanels();

        tabs.forEach(function (tab) {
          return tab.selected = false;
        });
        panels.forEach(function (panel) {
          return panel.hidden = true;
        });
      }
    }, {
      key: '_selectTab',
      value: function _selectTab(newTab) {
        this.reset();

        var newPanel = this._panelForTab(newTab);
        var newTabSelected = false;

        if (!newPanel) {
          throw new Error('No panel with pfeId ' + newPanel.pfeId);
        }

        if (this.selected && this.selected !== newTab) {
          newTabSelected = true;

          this.dispatchEvent(new CustomEvent(PfeTabs.tag + ':hidden-tab', {
            bubbles: true,
            detail: {
              tab: this.selected
            }
          }));
        }

        newTab.selected = true;
        newPanel.hidden = false;

        if (this._setFocus) {
          newTab.focus();
          this._setFocus = false;
        }

        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        });

        this.selected = newTab;

        if (newTabSelected) {
          this.dispatchEvent(new CustomEvent(PfeTabs.tag + ':shown-tab', {
            bubbles: true,
            detail: {
              tab: this.selected
            }
          }));
        }
      }
    }, {
      key: '_onKeyDown',
      value: function _onKeyDown(event) {
        if (event.target.getAttribute("role") !== "tab") {
          return;
        }

        if (event.altKey) {
          return;
        }

        var newTab = void 0;

        switch (event.keyCode) {
          case KEYCODE.LEFT:
          case KEYCODE.UP:
            newTab = this._prevTab();
            break;

          case KEYCODE.RIGHT:
          case KEYCODE.DOWN:
            newTab = this._nextTab();
            break;

          case KEYCODE.HOME:
            newTab = this._firstTab();
            break;

          case KEYCODE.END:
            newTab = this._lastTab();
            break;

          default:
            return;
        }

        event.preventDefault();

        this.selectedIndex = this._getTabIndex(newTab);
        this._setFocus = true;
      }
    }, {
      key: '_onClick',
      value: function _onClick(event) {
        if (event.currentTarget.getAttribute("role") !== "tab") {
          return;
        }

        this.selectedIndex = this._getTabIndex(event.currentTarget);
      }
    }]);
    return PfeTabs;
  }(PFElement);

  var PfeTab = function (_PFElement2) {
    inherits(PfeTab, _PFElement2);
    createClass(PfeTab, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host {\n  --pfe-tabs--main:         transparent;\n  --pfe-tabs--aux:          var(--pfe-theme--color--surface--lightest--text, #333);\n  --pfe-tabs--link:         var(--pfe-theme--color--surface--lightest--link, #06c);\n  --pfe-tabs--focus:        var(--pfe-theme--color--surface--lightest--link--focus, #003366);\n  position: relative;\n  display: block;\n  margin: 0 0 -1px;\n  padding-top: var(--pfe-theme--container-padding, 1rem);\n  padding-right: calc(var(--pfe-theme--container-padding, 1rem) * 3.375);\n  padding-bottom: calc(var(--pfe-theme--container-padding, 1rem) * 1.5);\n  padding-left: var(--pfe-theme--container-padding, 1rem);\n  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;\n  border-bottom: 0;\n  background-color: var(--pfe-tabs--main);\n  color: var(--pfe-tabs--aux);\n  text-transform: var(--pfe-tabs__tab--TextTransform, none);\n  font-weight: var(--pfe-theme--font-weight--normal, 500);\n  white-space: nowrap;\n  cursor: pointer; }\n\n:host([aria-selected="true"]) {\n  --pfe-tabs--main: var(--pfe-theme--color--surface--lightest, #fff);\n  border-color: var(--pfe-theme--color--surface--border, #dfdfdf);\n  border-bottom: 0; }\n\n.indicator {\n  position: absolute;\n  bottom: 12px;\n  left: auto;\n  display: var(--pfe-tabs__indicator--Display, block);\n  height: var(--pfe-tabs__indicator--Height, 4px);\n  width: var(--pfe-tabs__indicator--Width, 22px);\n  background-color: var(--pfe-theme--color--surface--border--darkest, #464646); }\n\n:host(:hover) .indicator {\n  background-color: var(--pfe-tabs--link); }\n\n:host([aria-selected="true"]) .indicator,\n:host([aria-selected="true"]:hover) .indicator {\n  background-color: var(--pfe-tabs--link); }\n\n:host(:focus),\n:host(:focus-visible) {\n  outline: var(--pfe-theme--ui--focus-outline-width, 1px) var(--pfe-theme--ui--focus-outline-style, solid) var(--pfe-tabs--focus); }\n\n:host([pfe-variant="primary"]) {\n  text-align: center;\n  padding: 0 calc(var(--pfe-theme--container-padding, 1rem) / 3) var(--pfe-theme--container-padding, 1rem);\n  margin-right: 2%; }\n  :host([pfe-variant="primary"]) .indicator {\n    width: 100%;\n    left: 0; }\n\n:host([pfe-variant="primary"][aria-selected="true"]) {\n  border: transparent; }\n\n:host([pfe-variant="primary"][aria-selected="false"]) {\n  border: transparent; }\n  :host([pfe-variant="primary"][aria-selected="false"]) .indicator {\n    display: none; }\n\n:host([pfe-variant="secondary"]) {\n  text-align: center;\n  padding: calc(var(--pfe-theme--container-padding, 1rem) * .666) calc(var(--pfe-theme--container-padding, 1rem) * 2.75);\n  border: 1px solid var(--pfe-theme--color--surface--border--darkest, #464646);\n  margin-right: 2%; }\n  :host([pfe-variant="secondary"]) .indicator {\n    display: none; }\n\n:host([pfe-variant="secondary"][aria-selected="true"]) {\n  background-color: var(--pfe-theme--color--surface--darkest, #131313);\n  color: var(--pfe-theme--color--surface--darkest--text, #fff); }\n  :host([pfe-variant="secondary"][aria-selected="true"]) .indicator {\n    display: block;\n    bottom: -33%;\n    width: 0;\n    height: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    border-left: var(--pfe-theme--container-spacer, 1rem) solid transparent;\n    border-right: var(--pfe-theme--container-spacer, 1rem) solid transparent;\n    border-top: var(--pfe-theme--container-spacer, 1rem) solid #252527;\n    background-color: transparent; }\n\n:host([pfe-variant="secondary"][aria-selected="false"]) {\n  color: var(--pfe-theme--color--ui-base, #0477a4); }\n\n:host([pfe-variant="secondary"]:hover) {\n  background-color: var(--pfe-theme--color--surface--darkest, #131313);\n  color: var(--pfe-theme--color--surface--darkest--text, #fff); }\n\n:host([vertical][pfe-variant="primary"]) {\n  text-align: right;\n  padding-right: var(--pfe-theme--container-padding, 1rem); }\n  :host([vertical][pfe-variant="primary"]) .indicator {\n    left: auto;\n    right: 0;\n    top: 0;\n    display: var(--pfe-tabs__indicator--Display, block);\n    height: var(--pfe-tabs__indicator--Height, 22px);\n    width: var(--pfe-tabs__indicator--Width, 4px); }\n\n:host([vertical][pfe-variant="primary"][aria-selected="true"]) {\n  border: transparent !important; }\n\n:host([vertical][pfe-variant="secondary"][aria-selected="true"]) .indicator {\n  left: 99%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-top: var(--pfe-theme--container-spacer, 1rem) solid transparent;\n  border-left: var(--pfe-theme--container-spacer, 1rem) solid #252527;\n  border-bottom: var(--pfe-theme--container-spacer, 1rem) solid transparent;\n  background-color: transparent; }\n\n::slotted(h1),\n::slotted(h2),\n::slotted(h3),\n::slotted(h4),\n::slotted(h5),\n::slotted(h6) {\n  font-size: var(--pfe-theme--font-size, 16px);\n  font-weight: var(--pfe-theme--font-weight--normal, 500);\n  margin: 0;\n  user-select: none; }</style>\n<slot></slot>\n<div class="indicator"></div>';
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-tab.scss";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-tab.html";
      }
    }], [{
      key: 'tag',
      get: function get$$1() {
        return "pfe-tab";
      }
    }, {
      key: 'observedAttributes',
      get: function get$$1() {
        return ["aria-selected"];
      }
    }]);

    function PfeTab() {
      classCallCheck(this, PfeTab);
      return possibleConstructorReturn(this, (PfeTab.__proto__ || Object.getPrototypeOf(PfeTab)).call(this, PfeTab));
    }

    createClass(PfeTab, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        get(PfeTab.prototype.__proto__ || Object.getPrototypeOf(PfeTab.prototype), 'connectedCallback', this).call(this);

        if (!this.pfeId) {
          this.pfeId = PfeTab.tag + '-' + generateId();
        }

        this.setAttribute("role", "tab");
        this.setAttribute("aria-selected", "false");
        this.setAttribute("tabindex", -1);

        if (this.parentNode.hasAttribute("vertical")) {
          this.setAttribute("vertical", "");
        }
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback() {
        var value = Boolean(this.selected);
        this.setAttribute("tabindex", value ? 0 : -1);
      }
    }, {
      key: 'pfeId',
      get: function get$$1() {
        return this.getAttribute("pfe-id");
      },
      set: function set$$1(id) {
        if (!id) {
          return;
        }

        this.setAttribute("pfe-id", id);
      }
    }, {
      key: 'selected',
      set: function set$$1(value) {
        value = Boolean(value);
        this.setAttribute("aria-selected", value);
      },
      get: function get$$1() {
        return this.getAttribute("aria-selected") === "true" ? true : false;
      }
    }]);
    return PfeTab;
  }(PFElement);

  var PfeTabPanel = function (_PFElement3) {
    inherits(PfeTabPanel, _PFElement3);
    createClass(PfeTabPanel, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host {\n  display: block; }\n\n:host([hidden]) {\n  display: none; }</style>\n<slot></slot>';
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-tab-panel.scss";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-tab-panel.html";
      }
    }, {
      key: 'pfeId',
      get: function get$$1() {
        return this.getAttribute("pfe-id");
      },
      set: function set$$1(id) {
        if (!id) {
          return;
        }

        this.setAttribute("pfe-id", id);
      }
    }], [{
      key: 'tag',
      get: function get$$1() {
        return "pfe-tab-panel";
      }
    }]);

    function PfeTabPanel() {
      classCallCheck(this, PfeTabPanel);
      return possibleConstructorReturn(this, (PfeTabPanel.__proto__ || Object.getPrototypeOf(PfeTabPanel)).call(this, PfeTabPanel));
    }

    createClass(PfeTabPanel, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        get(PfeTabPanel.prototype.__proto__ || Object.getPrototypeOf(PfeTabPanel.prototype), 'connectedCallback', this).call(this);

        if (!this.pfeId) {
          this.pfeId = PfeTabPanel.tag + '-' + generateId();
        }

        this.setAttribute("role", "tabpanel");
        this.setAttribute("tabindex", 0);
      }
    }]);
    return PfeTabPanel;
  }(PFElement);

  PFElement.create(PfeTab);
  PFElement.create(PfeTabPanel);
  PFElement.create(PfeTabs);

  return PfeTabs;

})));
//# sourceMappingURL=pfe-tabs.umd.js.map
