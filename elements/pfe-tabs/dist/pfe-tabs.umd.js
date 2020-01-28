(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeTabs = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  // @POLYFILL  Array.prototype.find
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

  // @POLYFILL  Array.prototype.findIndex
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
   * PatternFly Elements: PfeTabs 1.0.0-prerelease.37
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
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-tabs__tabs--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);display:block;display:var(--pfe-tabs--Display,block);padding:0;padding:var(--pfe-tabs--Padding,0)}:host .tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;flex-direction:var(--pfe-tabs__tabs--FlexDirection,row);width:auto;width:var(--pfe-tabs__tabs--Width,auto);border-top:0;border-top:var(--pfe-tabs__tabs--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__tabs--BorderRight,0);border-bottom:1px solid var(--pfe-tabs__tabs--BorderColor);border-bottom:var(--pfe-tabs__tabs--BorderBottom,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tabs--BorderColor));border-left:0;border-left:var(--pfe-tabs__tabs--BorderLeft,0);padding:0;padding:var(--pfe-tabs__tabs--Padding,0)}:host .panels{width:auto;width:var(--pfe-tabs__panels--Width,auto);padding-top:0;padding-top:var(--pfe-tabs__panels--PaddingTop,0);padding-right:0;padding-right:var(--pfe-tabs__panels--PaddingRight,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panels--PaddingBottom,0);padding-left:0;padding-left:var(--pfe-tabs__panels--PaddingLeft,0)}:host(:not([vertical])[pfe-tab-align=center]) .tabs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}@media screen and (min-width:768px){:host([vertical]){--pfe-tabs--Display:flex;--pfe-tabs__tabs--FlexDirection:column;--pfe-tabs__tabs--Width:22.22%;--pfe-tabs__tabs--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor);--pfe-tabs__tabs--BorderBottom:0;--pfe-tabs__panels--Width:77.78%;--pfe-tabs__panels--PaddingRight:var(--pfe-theme--container-padding, 16px)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([vertical]) .tabs{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:22.22%;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:0}:host([vertical]) .panels{width:77.8%;padding-right:1em}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){--pfe-tabs__tabs--Padding:var(--pfe-theme--container-padding, 16px) 0 0 0}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth]) .tabs{padding:1em 0 0 0}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not([pfe-variant=earth])){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#333;color:var(--pfe-theme--color--text,#333)}}:host([pfe-variant=earth]){--pfe-tabs__tabs--PaddingLeft:var(--pfe-theme--container-padding, 16px)}:host([pfe-variant=earth]) .tabs ::slotted(pfe-tab[aria-selected=false]:not([vertical]):first-of-type){border-left:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]) .tabs{padding-left:1em}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}\n/*# sourceMappingURL=pfe-tabs.min.css.map */\n</style><div class=\"tabs\">\n  <slot name=\"tab\"></slot>\n</div>\n<div class=\"panels\">\n  <slot name=\"panel\"></slot>\n</div>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-tabs.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-tabs.html";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-tabs.json";
      }
    }, {
      key: "selectedIndex",
      get: function get$$1() {
        return this.getAttribute("selected-index");
      },
      set: function set$$1(value) {
        this.setAttribute("selected-index", value);
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.37";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "vertical": { "title": "Vertical orientation", "type": "boolean", "default": false, "prefixed": false }, "variant": { "title": "Variant", "type": "string", "enum": ["wind", "earth"], "default": "wind", "prefixed": true }, "on": { "title": "Context", "type": "string", "enum": ["light", "dark"], "default": "light", "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "tab": { "title": "Tab", "type": "array", "namedSlot": true, "items": { "oneOf": [{ "$ref": "raw" }] } }, "panel": { "title": "Panel", "type": "array", "namedSlot": true, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-tabs";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["vertical", "selected-index", "pfe-variant", "on"];
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          hiddenTab: this.tag + ":hidden-tab",
          shownTab: this.tag + ":shown-tab"
        };
      }
    }]);

    function PfeTabs() {
      classCallCheck(this, PfeTabs);

      var _this = possibleConstructorReturn(this, (PfeTabs.__proto__ || Object.getPrototypeOf(PfeTabs)).call(this, PfeTabs));

      _this._linked = false;
      _this._init = _this._init.bind(_this);
      _this._onClick = _this._onClick.bind(_this);
      _this._linkPanels = _this._linkPanels.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeTabs, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        get(PfeTabs.prototype.__proto__ || Object.getPrototypeOf(PfeTabs.prototype), "connectedCallback", this).call(this);

        this.addEventListener("keydown", this._onKeyDown);
        this.addEventListener("click", this._onClick);

        Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
          if (_this2.children.length) {
            _this2._init();
          }

          _this2._observer.observe(_this2, { childList: true });
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        this.removeEventListener("keydown", this._onKeyDown);
        this._allTabs().forEach(function (tab) {
          return tab.removeEventListener("click", _this3._onClick);
        });
        this._observer.disconnect();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        var _this4 = this;

        switch (attr) {
          case "pfe-variant":
            if (this.getAttribute("pfe-variant") === "wind") {
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("pfe-variant", "wind");
              });
              this._allPanels().forEach(function (panel) {
                return panel.setAttribute("pfe-variant", "wind");
              });
            } else if (this.getAttribute("pfe-variant") === "earth") {
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("pfe-variant", "earth");
              });
              this._allPanels().forEach(function (panel) {
                return panel.setAttribute("pfe-variant", "earth");
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

          case "on":
            if (this.getAttribute("on") === "dark") {
              this._allTabs().forEach(function (tab) {
                return tab.setAttribute("on", "dark");
              });
              this._allPanels().forEach(function (panel) {
                return panel.setAttribute("on", "dark");
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
      key: "select",
      value: function select(newTab) {
        if (!newTab) {
          return;
        }

        if (newTab.tagName.toLowerCase() !== "pfe-tab") {
          console.warn(PfeTabs.tag + ": the tab must be a pfe-tab element");
          return;
        }

        this.selectedIndex = this._getTabIndex(newTab);
      }
    }, {
      key: "selectIndex",
      value: function selectIndex(_index) {
        if (_index === undefined) {
          return;
        }

        var index = parseInt(_index, 10);
        var tabs = this._allTabs();
        var tab = tabs[index];

        if (!tab) {
          console.warn(PfeTabs.tag + ": tab " + _index + " does not exist");
          return;
        }

        this._selectTab(tab);
      }
    }, {
      key: "_init",
      value: function _init(mutationsList) {
        var _this5 = this;

        if (this.getAttribute("role") !== "tablist") {
          this.setAttribute("role", "tablist");
        }

        if (!this.hasAttribute("selected-index")) {
          this.selectedIndex = 0;
        }

        this._linked = false;
        this._linkPanels();

        if (mutationsList) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var mutation = _step.value;

              if (mutation.type === "childList" && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function (addedNode) {
                  if (addedNode.tagName.toLowerCase() === PfeTab.tag || addedNode.tagName.toLowerCase() === PfeTabPanel.tag) {
                    if (_this5.variant.value) {
                      addedNode.setAttribute("pfe-variant", _this5.variant.value);
                    }
                  }
                });
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
      }
    }, {
      key: "_linkPanels",
      value: function _linkPanels() {
        var _this6 = this;

        if (this._linked) {
          return;
        }

        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        var tabs = this._allTabs();

        tabs.forEach(function (tab) {
          var panel = tab.nextElementSibling;
          if (panel.tagName.toLowerCase() !== "pfe-tab-panel") {
            console.warn(PfeTabs.tag + ": tab #" + tab.pfeId + " is not a sibling of a <pfe-tab-panel>");
            return;
          }

          tab.setAttribute("aria-controls", panel.pfeId);
          panel.setAttribute("aria-labelledby", tab.pfeId);

          tab.addEventListener("click", _this6._onClick);
        });

        this._linked = true;

        if (window.ShadyCSS) {
          this._observer.observe(this, { childList: true });
        }
      }
    }, {
      key: "_allPanels",
      value: function _allPanels() {
        return [].concat(toConsumableArray(this.querySelectorAll("pfe-tab-panel")));
      }
    }, {
      key: "_allTabs",
      value: function _allTabs() {
        return [].concat(toConsumableArray(this.querySelectorAll("pfe-tab")));
      }
    }, {
      key: "_panelForTab",
      value: function _panelForTab(tab) {
        var panelId = tab.getAttribute("aria-controls");
        return this.querySelector("[pfe-id=\"" + panelId + "\"]");
      }
    }, {
      key: "_prevTab",
      value: function _prevTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        }) - 1;
        return tabs[(newIdx + tabs.length) % tabs.length];
      }
    }, {
      key: "_firstTab",
      value: function _firstTab() {
        var tabs = this._allTabs();
        return tabs[0];
      }
    }, {
      key: "_lastTab",
      value: function _lastTab() {
        var tabs = this._allTabs();
        return tabs[tabs.length - 1];
      }
    }, {
      key: "_nextTab",
      value: function _nextTab() {
        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        }) + 1;
        return tabs[newIdx % tabs.length];
      }
    }, {
      key: "_getTabIndex",
      value: function _getTabIndex(_tab) {
        var tabs = this._allTabs();
        var index = tabs.findIndex(function (tab) {
          return tab.pfeId === _tab.pfeId;
        });
        return index;
      }
    }, {
      key: "reset",
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
      key: "_selectTab",
      value: function _selectTab(newTab) {
        this.reset();

        var newPanel = this._panelForTab(newTab);
        var newTabSelected = false;

        if (!newPanel) {
          throw new Error("No panel with pfeId " + newPanel.pfeId);
        }

        if (this.selected && this.selected !== newTab) {
          newTabSelected = true;

          this.emitEvent(PfeTabs.events.hiddenTab, {
            detail: {
              tab: this.selected
            }
          });
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
          this.emitEvent(PfeTabs.events.shownTab, {
            detail: {
              tab: this.selected
            }
          });
        }
      }
    }, {
      key: "_onKeyDown",
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
      key: "_onClick",
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
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-tabs--BackgroundColor:transparent;--pfe-tabs--Color:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-tabs--link:var(--pfe-theme--color--link, #06c);--pfe-tabs--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-tabs--highlight:var(--pfe-theme--color--ui-accent, #e00);--pfe-tabs__tab--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * .666);--pfe-tabs__tab--PaddingRight:calc(var(--pfe-theme--container-padding, 16px) * 1.5);--pfe-tabs__tab--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * .666);--pfe-tabs__tab--PaddingLeft:calc(var(--pfe-theme--container-padding, 16px) * 1.5);position:relative;display:block;margin:0 0 -1px;margin:var(--pfe-tabs__tab--Margin,0 0 -1px);padding:var(--pfe-tabs__tab--PaddingTop) var(--pfe-tabs__tab--PaddingRight) var(--pfe-tabs__tab--PaddingBottom) var(--pfe-tabs__tab--PaddingLeft);border-top:1px solid transparent;border-top:var(--pfe-tabs__tab--BorderTop,var(--pfe-tabs__tab--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tab--BorderColor,transparent));border-right:1px solid transparent;border-right:var(--pfe-tabs__tab--BorderRight,var(--pfe-tabs__tab--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tab--BorderColor,transparent));border-bottom:0;border-bottom:var(--pfe-tabs__tab--BorderBottom,0);border-left:1px solid transparent;border-left:var(--pfe-tabs__tab--BorderLeft,var(--pfe-tabs__tab--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tab--BorderColor,transparent));background-color:var(--pfe-tabs--BackgroundColor);color:var(--pfe-tabs--Color);text-transform:none;text-transform:var(--pfe-tabs__tab--TextTransform,none);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);cursor:pointer;text-align:center;text-align:var(--pfe-tabs__tab--TextAlign,center)}:host ::slotted(*){color:var(--pfe-tabs--Color)!important}:host(:hover){--pfe-tabs--Color:var(--pfe-theme--color--text, #333)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:hover){color:#333;color:var(--pfe-theme--color--text,#333)}}:host(:focus){--pfe-tabs--Color:var(--pfe-theme--color--text, #333);outline:1px outset var(--pfe-tabs--focus);outline:var(--pfe-theme--ui--focus-outline-width,1px) outset var(--pfe-tabs--focus)}:host([on=dark]){--pfe-tabs--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff)}:host([on=saturated]){--pfe-tabs--Color:#cccccc;--pfe-tabs--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-tabs--highlight:var(--pfe-theme--color--text--on-saturated, #fff)}:host([aria-selected=true]){--pfe-tabs--Color:#131313;--pfe-tabs__tab--BorderColor:transparent;--pfe-tabs__tab--BorderBottom:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-tabs--highlight)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([aria-selected=true]){color:#131313;border-bottom:4px solid #e00;border-bottom:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#e00)}}@media screen and (min-width:768px){:host([vertical]){--pfe-tabs__tab--BorderTop:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;--pfe-tabs__tab--BorderRight:0;--pfe-tabs__tab--BorderBottom:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;--pfe-tabs__tab--BorderLeft:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;--pfe-tabs__tab--Margin:0 -1px 0 0;--pfe-tabs__tab--PadingLeft:calc(var(--pfe-theme--container-padding, 16px) * .75);--pfe-tabs__tab--TextAlign:left}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical]){border:1px solid transparent;border-right:0;margin:0 -1px 0 0;padding-left:12px;text-align:left}}@media screen and (min-width:768px){:host([vertical][aria-selected=true]){--pfe-tabs__tab--BorderTopColor:transparent;--pfe-tabs__tab--BorderRight:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-tabs--highlight)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][aria-selected=true]){border-top-color:transparent;border-right:4px solid #e00;border-right:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#e00)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]){background-color:#ececec;background-color:var(--pfe-theme--color--surface--lighter,#ececec);color:#333;color:var(--pfe-theme--color--text,#333)}}:host([aria-selected=true][on=dark]),:host([on=dark]:hover),:host([pfe-variant=wind][aria-selected=true][on=dark]),:host([pfe-variant=wind][on=dark]:hover){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([aria-selected=true][on=saturated]),:host([on=saturated]:hover),:host([pfe-variant=wind][aria-selected=true][on=saturated]),:host([pfe-variant=wind][on=saturated]:hover){--pfe-tabs--Color:var(--pfe-theme--color--text--on-saturated, #fff)}:host([aria-selected=true][on=light]),:host([on=light]:hover),:host([pfe-variant=wind][aria-selected=true][on=light]),:host([pfe-variant=wind][on=light]:hover){--pfe-tabs--Color:var(--pfe-theme--color--text, #333)}:host([pfe-variant=earth][aria-selected=false]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-tabs__tab--BorderLeft:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__tab--BorderBottom:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__tab--BorderTop:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--lighter, #ececec)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth][aria-selected=false]){border-top:3px solid #ececec;border-top:3px solid var(--pfe-theme--color--surface--lighter,#ececec);border-bottom:1px solid #d2d2d2;border-bottom:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-left:1px solid #d2d2d2;border-left:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}:host([pfe-variant=earth][aria-selected=true]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-tabs--Color:var(--pfe-theme--color--text, #333);--pfe-tabs__tab--BorderTop:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-tabs--highlight);--pfe-tabs__tab--BorderBottom:0;--pfe-tabs__tab--BorderLeft:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth][aria-selected=true]){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#333;color:var(--pfe-theme--color--text,#333);border-top:3px solid var(--pfe-tabs--highlight);border-bottom:0;border-left:1px solid #d2d2d2;border-left:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}:host([pfe-variant=earth][aria-selected=true]:last-of-type){--pfe-tabs__tab--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth][aria-selected=true]:last-of-type){border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){--pfe-tabs__tab--BorderTop:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth]){border-top:1px solid #d2d2d2;border-top:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]:first-of-type){--pfe-tabs__tab--BorderTop:0}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth]:first-of-type){border-top:0}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth][aria-selected=true]){--pfe-tabs__tab--BorderTop:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__tab--BorderRight:0;--pfe-tabs__tab--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-tabs--highlight)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth][aria-selected=true]){border-top:1px solid #d2d2d2;border-top:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-right:0;border-left:3px solid var(--pfe-tabs--highlight)}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth][aria-selected=false]){--pfe-tabs__tab--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__tab--BorderBottom:0;--pfe-tabs__tab--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--lighter, #ececec)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth][aria-selected=false]){border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:0;border-left:3px solid #ececec;border-left:3px solid var(--pfe-theme--color--surface--lighter,#ececec)}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth][aria-selected=true]:last-of-type){--pfe-tabs__tab--BorderBottom:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth][aria-selected=true]:last-of-type){border-bottom:1px solid #d2d2d2;border-bottom:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}\n/*# sourceMappingURL=pfe-tab.min.css.map */\n</style><slot></slot>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-tab.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-tab.html";
      }
    }, {
      key: "selected",
      set: function set$$1(value) {
        value = Boolean(value);
        this.setAttribute("aria-selected", value);
      },
      get: function get$$1() {
        return this.getAttribute("aria-selected") === "true" ? true : false;
      }
    }, {
      key: "pfeId",
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
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.37";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-tab";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["aria-selected"];
      }
    }]);

    function PfeTab() {
      classCallCheck(this, PfeTab);

      var _this7 = possibleConstructorReturn(this, (PfeTab.__proto__ || Object.getPrototypeOf(PfeTab)).call(this, PfeTab));

      _this7._init = _this7._init.bind(_this7);
      _this7._observer = new MutationObserver(_this7._init);
      return _this7;
    }

    createClass(PfeTab, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeTab.prototype.__proto__ || Object.getPrototypeOf(PfeTab.prototype), "connectedCallback", this).call(this);

        if (this.children.length || this.textContent.trim().length) {
          this._init();
        }

        this._observer.observe(this, { childList: true });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {
        var value = Boolean(this.selected);
        this.setAttribute("tabindex", value ? 0 : -1);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
      }
    }, {
      key: "_init",
      value: function _init() {
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        if (!this.pfeId) {
          this.pfeId = PfeTab.tag + "-" + generateId();
        }

        if (this.getAttribute("role") !== "tab") {
          this.setAttribute("role", "tab");
        }

        if (!this.hasAttribute("aria-selected")) {
          this.setAttribute("aria-selected", "false");
        }

        if (!this.hasAttribute("tabindex")) {
          this.setAttribute("tabindex", -1);
        }

        if (this.parentNode.hasAttribute("vertical")) {
          this.setAttribute("vertical", "");
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, { childList: true });
        }
      }
    }]);
    return PfeTab;
  }(PFElement);

  var PfeTabPanel = function (_PFElement3) {
    inherits(PfeTabPanel, _PFElement3);
    createClass(PfeTabPanel, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-tabs--focus:var(--pfe-theme--color--link, #06c);display:block}:host(:focus){outline:0}:host ::slotted(*){color:#333;color:var(--pfe-broadcasted--text,#333)}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host .container{margin:0;width:100%;padding:16px 0;padding:var(--pfe-tabs__panel--Padding,var(--pfe-theme--container-spacer,16px) 0);border-top:0;border-top:var(--pfe-tabs__panel--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__panel--BorderRight,0);border-bottom:0;border-bottom:var(--pfe-tabs__panel--BorderBottom,0);border-left:0;border-left:var(--pfe-tabs__panel--BorderLeft,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host .container{padding:1em;background-color:#fff!important;color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([pfe-variant=earth]){--pfe-tabs__panel--Padding:calc(var(--pfe-theme--container-spacer, 16px) * 2);--pfe-tabs__panel--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__panel--BorderBottom:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-tabs__panel--BorderLeft:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]) .container{padding:1em;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-left:1px solid #d2d2d2;border-left:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}@media screen and (min-width:768px){:host([pfe-variant=wind][vertical]){--pfe-tabs__panel--Padding:var(--pfe-theme--container-spacer, 16px) 0 var(--pfe-theme--container-spacer, 16px) calc(var(--pfe-theme--container-spacer, 16px) * 2)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([pfe-variant=wind][vertical]) .container{padding:1em 0 1em 2em}}@media screen and (min-width:768px){:host([pfe-variant=earth][vertical]){--pfe-tabs__panel--BorderTop:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([pfe-variant=earth][vertical]) .container{border-top:1px solid #d2d2d2;border-top:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}}:host([hidden]){display:none}\n/*# sourceMappingURL=pfe-tab-panel.min.css.map */\n</style><div tabindex=\"-1\" role=\"tabpanel\">\n  <div class=\"container\">\n    <slot></slot>\n  </div>\n</div>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-tab-panel.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-tab-panel.html";
      }
    }, {
      key: "pfeId",
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
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.37";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-tab-panel";
      }
    }]);

    function PfeTabPanel() {
      classCallCheck(this, PfeTabPanel);

      var _this8 = possibleConstructorReturn(this, (PfeTabPanel.__proto__ || Object.getPrototypeOf(PfeTabPanel)).call(this, PfeTabPanel));

      _this8._init = _this8._init.bind(_this8);
      _this8._observer = new MutationObserver(_this8._init);
      return _this8;
    }

    createClass(PfeTabPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeTabPanel.prototype.__proto__ || Object.getPrototypeOf(PfeTabPanel.prototype), "connectedCallback", this).call(this);

        this._init();
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
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        if (!this.pfeId) {
          this.pfeId = PfeTabPanel.tag + "-" + generateId();
        }

        if (this.getAttribute("role") !== "tabpanel") {
          this.setAttribute("role", "tabpanel");
        }

        if (!this.hasAttribute("tabindex")) {
          this.setAttribute("tabindex", 0);
        }

        if (this.previousElementSibling.getAttribute("aria-selected") !== "true") {
          this.hidden = true;
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, { childList: true });
        }
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
