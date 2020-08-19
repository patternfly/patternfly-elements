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

  // @POLYFILL Element.prototype.matches
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
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
   * PatternFly Elements: PfeTabs 1.0.0-prerelease.55
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

  // @IE11 doesn't support URLSearchParams
  // https://caniuse.com/#search=urlsearchparams
  var CAN_USE_URLSEARCHPARAMS = window.URLSearchParams ? true : false;

  var TABS_MUTATION_CONFIG = {
    childList: true,
    subtree: true
  };

  var TAB_CONTENT_MUTATION_CONFIG = {
    characterData: true,
    childList: true,
    subtree: true
  };

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  var PfeTabs = function (_PFElement) {
    inherits(PfeTabs, _PFElement);
    createClass(PfeTabs, [{
      key: "html",
      get: function get$$1() {
        return "<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{display:block;display:var(--pfe-tabs--Display,block);padding:0;padding:var(--pfe-tabs--Padding,0)}:host .tabs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;flex-direction:var(--pfe-tabs__tabs--FlexDirection,row);width:auto;width:var(--pfe-tabs__tabs--Width,auto);border-top:0;border-top:var(--pfe-tabs__tabs--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__tabs--BorderRight,0);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-tabs__tabs--BorderBottom,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2)));border-left:0;border-left:var(--pfe-tabs__tabs--BorderLeft,0);padding:0;padding:var(--pfe-tabs__tabs--Padding,0)}:host .panels{width:auto;width:var(--pfe-tabs__panels--Width,auto)}:host(:not([vertical])[pfe-tab-align=center]) .tabs{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}@media screen and (min-width:768px){:host([vertical]){--pfe-tabs--Display:flex;--pfe-tabs__tabs--FlexDirection:column;--pfe-tabs__tabs--Width:20%;--pfe-tabs__tabs--BorderRight:var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs--BorderColor);--pfe-tabs__tabs--BorderBottom:0;--pfe-tabs__panels--Width:80%;--pfe-tabs__panels--PaddingRight:var(--pfe-theme--container-padding, 16px)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host([vertical]) .tabs{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:22.22%;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:0}:host([vertical]) .panels{width:77.8%;padding-right:1em}}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){--pfe-tabs__tabs--Padding:var(--pfe-theme--container-padding, 16px) 0 0 0}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([vertical][pfe-variant=earth]) .tabs{padding:1em 0 0 0}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not([pfe-variant=earth])){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#151515;color:var(--pfe-theme--color--text,#151515)}}:host([pfe-variant=earth]){--pfe-tabs__tabs--PaddingLeft:var(--pfe-theme--container-padding, 16px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]) .tabs{padding-left:1em}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}@media screen and (min-width:768px){:host([vertical][pfe-variant=wind]) .tabs-prefix,:host([vertical][pfe-variant=wind]) .tabs-suffix{left:0;top:0;content:\" \";height:32px;width:1px;background-color:#d2d2d2;background-color:var(--pfe-tabs__tabs--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));position:relative}:host(:not([vertical])[pfe-variant=earth]) .tabs-prefix{left:0;top:0;content:\" \";height:1px;width:calc(16px * 2);width:calc(var(--pfe-theme--container-padding,16px) * 2);position:relative}}\n/*# sourceMappingURL=pfe-tabs.min.css.map */\n</style><div class=\"tabs\">\n  <div class=\"tabs-prefix\"></div>\n  <slot name=\"tab\"></slot>\n  <div class=\"tabs-suffix\"></div>\n</div>\n<div class=\"panels\">\n  <slot name=\"panel\"></slot>\n</div>";
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
    }, {
      key: "tabHistory",
      get: function get$$1() {
        return this.hasAttribute("pfe-tab-history");
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "vertical": { "title": "Vertical orientation", "type": "boolean", "default": false, "prefixed": false }, "variant": { "title": "Variant", "type": "string", "enum": ["wind", "earth"], "default": "wind", "prefixed": true }, "tab-history": { "title": "Tab history", "type": "boolean", "default": false, "prefixed": true } };
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
        return ["vertical", "selected-index", "pfe-variant", "pfe-tab-history"];
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
      _this._popstateEventHandler = _this._popstateEventHandler.bind(_this);
      _this._observer = new MutationObserver(_this._init);
      _this._updateHistory = true;
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

          _this2._observer.observe(_this2, TABS_MUTATION_CONFIG);
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

        if (this.tabHistory) {
          window.removeEventListener("popstate", this._popstateEventHandler);
        }
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

          case "selected-index":
            Promise.all([customElements.whenDefined(PfeTab.tag), customElements.whenDefined(PfeTabPanel.tag)]).then(function () {
              _this4._linkPanels();
              _this4.selectIndex(newValue);
              _this4._updateHistory = true;
            });
            break;

          case "pfe-tab-history":
            if (newValue === null) {
              window.removeEventListener("popstate", this._popstateEventHandler);
            } else {
              window.addEventListener("popstate", this._popstateEventHandler);
            }
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

        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams
        if (this.selected && this.tabHistory && this._updateHistory && CAN_USE_URLSEARCHPARAMS) {
          // rebuild the url
          var pathname = window.location.pathname;
          var urlParams = new URLSearchParams(window.location.search);
          var hash = window.location.hash;
          var property = this.id || this.getAttribute("pfe-id");
          var value = tab.id || tab.getAttribute("pfe-id");

          urlParams.set(property, value);
          history.pushState({}, "", pathname + "?" + urlParams.toString() + hash);
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

        var urlParams = void 0;

        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams
        if (CAN_USE_URLSEARCHPARAMS) {
          urlParams = new URLSearchParams(window.location.search);
        }

        var tabIndexFromURL = this._getTabIndexFromURL();

        if (tabIndexFromURL > -1) {
          this._setFocus = true;
          this.selectedIndex = tabIndexFromURL;
        } else if (!this.hasAttribute("selected-index")) {
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
                [].concat(toConsumableArray(mutation.addedNodes)).forEach(function (addedNode) {
                  if (!addedNode.tagName) {
                    return;
                  }

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
          this._observer.observe(this, TABS_MUTATION_CONFIG);
        }
      }
    }, {
      key: "_allPanels",
      value: function _allPanels() {
        return [].concat(toConsumableArray(this.children)).filter(function (child) {
          return child.matches("pfe-tab-panel");
        });
      }
    }, {
      key: "_allTabs",
      value: function _allTabs() {
        return [].concat(toConsumableArray(this.children)).filter(function (child) {
          return child.matches("pfe-tab");
        });
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

        var tabs = this._allTabs();
        var newIdx = tabs.findIndex(function (tab) {
          return tab.selected;
        });

        this.selected = newTab;

        if (newTabSelected) {
          if (this._setFocus) {
            newTab.focus();
          }

          this.emitEvent(PfeTabs.events.shownTab, {
            detail: {
              tab: this.selected
            }
          });
        }

        this._setFocus = false;
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var tabs = this._allTabs();
        var foundTab = tabs.find(function (tab) {
          return tab === event.target;
        });

        if (!foundTab) {
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
        var tabs = this._allTabs();
        var foundTab = tabs.find(function (tab) {
          return tab === event.currentTarget;
        });

        if (!foundTab) {
          return;
        }

        this.selectedIndex = this._getTabIndex(event.currentTarget);
      }
    }, {
      key: "_getTabIndexFromURL",
      value: function _getTabIndexFromURL() {
        var urlParams = void 0;
        var tabIndex = -1;

        // @IE11 doesn't support URLSearchParams
        // https://caniuse.com/#search=urlsearchparams
        if (CAN_USE_URLSEARCHPARAMS) {
          urlParams = new URLSearchParams(window.location.search);

          // @DEPRECATED
          // the "pfe-" prefix has been deprecated but we'll continue to support it
          // we'll give priority to the urlParams.has(`${this.id}`) attribute first
          // and fallback to urlParams.has(`pfe-${this.id}`) if it exists. We should
          // be able to remove the || part of the if statement in the future
          var tabsetInUrl = urlParams.has("" + this.id) || urlParams.has(this.getAttribute("pfe-id")) || urlParams.has("pfe-" + this.id); // remove this condition when it's no longer used in production

          if (urlParams && tabsetInUrl) {
            var id = urlParams.get("" + this.id) || urlParams.get(this.getAttribute("pfe-id")) || urlParams.get("pfe-" + this.id); // remove this condition when it's no longer used in production

            tabIndex = this._allTabs().findIndex(function (tab) {
              var tabId = tab.id || tab.getAttribute("pfe-id");
              return tabId === id;
            });
          }
        }

        return tabIndex;
      }
    }, {
      key: "_popstateEventHandler",
      value: function _popstateEventHandler() {
        var tabIndexFromURL = this._getTabIndexFromURL();

        this._updateHistory = false;
        this.selectedIndex = tabIndexFromURL > -1 ? tabIndexFromURL : 0;
      }
    }]);
    return PfeTabs;
  }(PFElement);

  var PfeTab = function (_PFElement2) {
    inherits(PfeTab, _PFElement2);
    createClass(PfeTab, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{text-align:left;position:relative;display:block;margin:0 0 calc(1px * -1);margin:var(--pfe-tabs__tab--Margin,0 0 calc(var(--pfe-theme--ui--border-width,1px) * -1));padding:16px calc(16px * 2) 16px calc(16px * 2);padding:var(--pfe-tabs__tab--PaddingTop,var(--pfe-theme--container-padding,16px)) var(--pfe-tabs__tab--PaddingRight,calc(var(--pfe-theme--container-padding,16px) * 2)) var(--pfe-tabs__tab--PaddingBottom,var(--pfe-theme--container-padding,16px)) var(--pfe-tabs__tab--PaddingLeft,calc(var(--pfe-theme--container-padding,16px) * 2));border-style:solid;border-style:var(--pfe-theme--ui--border-style,solid);border-width:1px;border-width:var(--pfe-theme--ui--border-width,1px);border-color:transparent;border-bottom-width:3px;border-bottom-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));background-color:transparent;background-color:var(--pfe-tabs--BackgroundColor,transparent);cursor:pointer;text-align:center;text-align:var(--pfe-tabs__tab--TextAlign,center);text-transform:none;text-transform:var(--pfe-tabs__tab--TextTransform,none);font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);font-size:16px;font-size:var(--pfe-tabs__tab--FontSize,var(--pfe-theme--font-size,16px))}:host .pfe-tab{display:inline-block}:host .pfe-tab *{font-size:inherit;font-weight:inherit;margin:0;color:#6a6e73;color:var(--pfe-tabs--Color,var(--pfe-theme--color--text--muted,#6a6e73))}:host(:hover){border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host(:hover) .pfe-tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host(:active){border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host(:active) .pfe-tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host(:focus){border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host(:focus) .pfe-tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([aria-selected=true]){border-bottom-color:#06c;border-bottom-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)))}:host([aria-selected=true]) .pfe-tab *{color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([pfe-variant=earth][vertical]) .pfe-tab{display:inline-block}@media screen and (min-width:768px){:host([vertical]){border-bottom-color:transparent;border-bottom-width:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:1px;border-left-width:var(--pfe-theme--ui--border-width,1px);padding:16px;padding:var(--pfe-theme--container-padding,16px);--pfe-tabs--Margin:0 calc(var(--pfe-theme--ui--border-width, 1px) * -1) 0 0}:host([vertical][aria-selected=true]){border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-left-width:3px}:host([vertical][pfe-variant=wind]){border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);text-align:left!important}:host([vertical][pfe-variant=wind][aria-selected=true]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-left:3px solid #06c;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));padding-left:calc(16px - 2px);padding-left:calc(var(--pfe-theme--container-padding,16px) - 2px)}:host([vertical][pfe-variant=wind][aria-selected=false]){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical][pfe-variant=wind][aria-selected=false]:hover){border-right:3px solid transparent;border-right:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent;border-bottom:0;border-left:3px solid #b8bbbe;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-tabs--BorderColor--hover,#b8bbbe);padding-left:calc(16px - 2px);padding-left:calc(var(--pfe-theme--container-padding,16px) - 2px)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]){background-color:#f0f0f0;color:#6a6e73}}:host(:not([vertical])[pfe-variant=earth]:not([aria-selected=true]):first-of-type){border-left-color:transparent}:host(:not([vertical])[pfe-variant=earth]:not([aria-selected=true]):last-of-type){border-right-color:transparent}:host([pfe-variant=earth][aria-selected=false]){background-color:#f0f0f0;background-color:var(--pfe-tabs--BackgroundColor--inactive,var(--pfe-theme--color--surface--lighter,#f0f0f0));border-color:#d2d2d2;border-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-width:3px;border-top-width:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px));border-top-color:transparent;border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-bottom-width:1px;border-bottom-width:var(--pfe-theme--ui--border-width,1px)}:host([pfe-variant=earth][aria-selected=false]:hover){border-top-color:#b8bbbe;border-top-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}:host([pfe-variant=earth][aria-selected=true]){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);border-bottom:0;border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top:solid #06c 3px;border-top:solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c))) var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth][aria-selected=true]){color:#6a6e73;background-color:#fff;border-left:1px solid #d2d2d2;border-top:3px solid #06c;border-top:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) solid var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-bottom:0}}:host([pfe-variant=earth][aria-selected=true]:last-of-type){border-right:1px solid #d2d2d2;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}@media screen and (min-width:768px){:host([vertical][pfe-variant=earth]){border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-left-width:3px;border-left-width:var(--pfe-theme--ui--border-width--active,3px);text-align:left}:host([vertical][pfe-variant=earth][aria-selected=false]:first-of-type){border-top-color:transparent;border-left:3px solid transparent;border-left:var(--pfe-tabs--BorderWidth,var(--pfe-theme--ui--border-width--active,3px)) var(--pfe-theme--ui--border-style,solid) transparent}:host([vertical][pfe-variant=earth][aria-selected=false]:last-of-type){border-bottom-color:transparent}:host([vertical][pfe-variant=earth][aria-selected=false]){border-right:0;border-bottom-color:transparent;border-left-color:transparent}:host([vertical][pfe-variant=earth][aria-selected=false]:hover){border-left-color:#b8bbbe;border-left-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe);border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2)}:host([vertical][pfe-variant=earth][aria-selected=false]:first-of-type:hover){border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-top-color:transparent}:host([vertical][pfe-variant=earth][aria-selected=true]){border-top-color:#d2d2d2;border-top-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-left-color:#06c;border-left-color:var(--pfe-tabs--BorderColor,var(--pfe-tabs--highlight,var(--pfe-theme--color--ui-accent,#06c)));border-right-color:transparent;margin-right:-1px}}:host([on=dark][pfe-variant=earth]){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);border-right-color:#6a6e73;border-right-color:var(--pfe-theme--color--surface--border--darker,#6a6e73);border-left-color:#6a6e73;border-left-color:var(--pfe-theme--color--surface--border--darker,#6a6e73)}:host([on=dark][pfe-variant=earth][aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);background-color:#3c3f42;background-color:var(--pfe-theme--color--surface--darker,#3c3f42)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark][pfe-variant=earth][aria-selected=false]){background-color:#fff!important;background-color:var(--pfe-theme--color--surface--lightest,#fff)!important}:host([on=dark][pfe-variant=earth][aria-selected=false]) .pfe-tab *{color:#151515!important}}:host([on=dark][pfe-variant=earth][aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff);background-color:#151515;background-color:var(--pfe-theme--color--surface--darkest,#151515)}:host([pfe-variant=earth][on=saturated][aria-selected=false]){--pfe-tabs--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0)}:host([pfe-variant=earth][on=saturated][aria-selected=true]){color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([pfe-variant=earth][on=saturated]:hover){color:#151515;color:var(--pfe-tabs--Color--focus,var(--pfe-tabs--focus,var(--pfe-theme--color--text,#151515)))}:host([pfe-variant=earth][on=saturated][aria-selected=true]){--pfe-tabs--Color:var(--pfe-theme--color--text, #151515)}:host([on=saturated][pfe-variant=wind]){--pfe-tabs--Color:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated][pfe-variant=wind]){background-color:transparent}:host([on=saturated][pfe-variant=wind]) .pfe-tab *{color:#151515!important}}:host([on=saturated][pfe-variant=wind][aria-selected=true]){--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-tabs--BorderColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([on=saturated][pfe-variant=wind][aria-selected=false]){--pfe-tabs--Color:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)}:host([on=saturated][pfe-variant=wind][aria-selected=false]:hover){border-bottom-color:#b8bbbe;border-bottom-color:var(--pfe-tabs--BorderColor--hover,#b8bbbe)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=saturated][pfe-variant=wind][aria-selected=true]:last-of-type){border-left:0!important}}:host([on=dark][pfe-variant=wind]){--pfe-tabs--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-tabs--Color--focus:var(--pfe-theme--color--text--on-dark, #fff)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([on=dark][pfe-variant=wind]) .pfe-tab *{color:#151515!important}}:host([on=dark][pfe-variant=wind][aria-selected=false]:hover){border-bottom-color:#f0f0f0;border-bottom-color:var(--pfe-theme--color--surface--base,#f0f0f0);--pfe-tabs__tab--BorderBottom:var(--pfe-tabs--BorderWidth, var(--pfe-theme--ui--border-width--active, 3px)) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([on=dark][pfe-variant=wind][vertical][aria-selected=false]:hover){border-bottom:0}\n/*# sourceMappingURL=pfe-tab.min.css.map */\n</style><span class=\"pfe-tab\"></span>";
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
        return "1.0.0-prerelease.55";
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

      _this7._tabItem;
      _this7._init = _this7._init.bind(_this7);
      _this7._setTabContent = _this7._setTabContent.bind(_this7);
      _this7._observer = new MutationObserver(_this7._init);
      return _this7;
    }

    createClass(PfeTab, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeTab.prototype.__proto__ || Object.getPrototypeOf(PfeTab.prototype), "connectedCallback", this).call(this);

        this._tabItem = this.shadowRoot.querySelector("." + this.tag);

        if (this.children.length || this.textContent.trim().length) {
          this._init();
        }

        this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
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

        // Copy the tab content into the template
        this._setTabContent();

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
          this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
        }
      }
    }, {
      key: "_setTabContent",
      value: function _setTabContent() {
        // Copy the tab content into the template
        var label = this.textContent.trim().replace(/\s+/g, " ");

        if (!label) {
          console.warn(this.tag + ": There does not appear to be any content in the tab region.");
          return;
        }

        var semantics = "";
        // Get the semantics of the content
        if (this.children.length > 0) {
          // We only care about the first child that is a tag
          if (this.firstElementChild && this.firstElementChild.tagName.match(/^H[1-6]/)) {
            semantics = this.firstElementChild.tagName.toLowerCase();
          }
        }

        // Create an h-level tag for the shadow tab, default h3
        var heading = document.createElement("h3");

        // Use the provided semantics if provided
        if (semantics.length > 0) {
          heading = document.createElement(semantics);
        }

        // Assign the label content to the new heading
        heading.textContent = label;

        // Attach the heading to the tabItem
        this._tabItem.innerHTML = "";
        this._tabItem.appendChild(heading);
      }
    }]);
    return PfeTab;
  }(PFElement);

  var PfeTabPanel = function (_PFElement3) {
    inherits(PfeTabPanel, _PFElement3);
    createClass(PfeTabPanel, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:block;color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host(:focus){outline:0}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%}:host .container{margin:0;width:100%;background-color:transparent;background-color:var(--pfe-tabs__panel--BackgroundColor,transparent);border-top:0;border-top:var(--pfe-tabs__panel--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__panel--BorderRight,0);border-bottom:0;border-bottom:var(--pfe-tabs__panel--BorderBottom,0);border-left:0;border-left:var(--pfe-tabs__panel--BorderLeft,0);padding:16px;padding:var(--pfe-tabs__panel--Padding,var(--pfe-theme--container-spacer,16px))}@media screen and (min-width:768px){:host .container{padding:calc(16px * 2);padding:calc(var(--pfe-tabs__panel--Padding,var(--pfe-theme--container-spacer,16px)) * 2)}}@media screen and (min-width:992px){:host .container{padding:calc(16px * 3);padding:calc(var(--pfe-tabs__panel--Padding,var(--pfe-theme--container-spacer,16px)) * 3)}}@media screen and (min-width:1200px){:host .container{padding:calc(16px * 4);padding:calc(var(--pfe-tabs__panel--Padding,var(--pfe-theme--container-spacer,16px)) * 4)}}:host .container::after{clear:both;content:\"\";display:table}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host .container{padding:1em;background-color:#fff!important;color:#151515!important}}:host([hidden]){display:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-variant=earth]) .container{background-color:#fff;padding:1em;border-right:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-left:1px solid #d2d2d2}}@media screen and (min-width:768px){:host([pfe-variant=wind][vertical]){padding-top:0;padding-bottom:0;padding-right:0}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([pfe-variant=wind][vertical]) .container{padding:1em 0 1em 2em}}@media screen and (min-width:768px){:host([pfe-variant=earth][vertical]){border-top:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);height:100%}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([pfe-variant=earth][vertical]) .container{border-top:1px solid #d2d2d2}}:host([pfe-variant=earth][on=dark]){--pfe-tabs__panel--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([pfe-variant=earth][on=saturated]){--pfe-tabs__panel--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([pfe-variant=wind][on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([pfe-variant=wind][on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}\n/*# sourceMappingURL=pfe-tab-panel.min.css.map */\n</style><div tabindex=\"-1\" role=\"tabpanel\">\n  <div class=\"container\">\n    <slot></slot>\n  </div>\n</div>";
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
        return "1.0.0-prerelease.55";
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
        this._observer.observe(this, TABS_MUTATION_CONFIG);
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
          this._observer.observe(this, TABS_MUTATION_CONFIG);
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
