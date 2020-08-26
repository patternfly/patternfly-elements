(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeDropdown = factory(global.PFElement));
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

  /*!
   * PatternFly Elements: PfeDropdown 1.0.0-prerelease.55
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

  var PfeDropdownItem = function (_PFElement) {
    inherits(PfeDropdownItem, _PFElement);
    createClass(PfeDropdownItem, [{
      key: "html",
      get: function get$$1() {
        return "<style>::slotted(*){display:block;width:100%;padding:calc(16px * .5) calc(16px * .5);padding:var(--pfe-dropdown--spacing--vertical,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5))) var(--pfe-dropdown--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5)));color:#030303;color:var(--pfe-dropdown--Color,#030303);font-size:16px;font-size:var(--pfe-dropdown--FontSize,var(--pfe-theme--font-size,16px));font-weight:400;font-weight:var(--pfe-dropdown--FontWeight,400);line-height:1.5;line-height:var(--pfe-dropdown--LineHeight,var(--pfe-theme--line-height,1.5));text-align:left;text-align:var(--pfe-dropdown--TextAlign,left);white-space:nowrap;-webkit-box-sizing:border-box;box-sizing:border-box;text-decoration:none;font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);cursor:pointer}::slotted(button){background-color:transparent;background-color:var(--pfe-dropdown--BackgroundColor,transparent);border:none;border:var(--pfe-dropdown--Border,none)}.pfe-dropdown-item__container:active,.pfe-dropdown-item__container:focus,.pfe-dropdown-item__container:hover{background-color:#f0f0f0;background-color:var(--pfe-dropdown--BackgroundColor--hover,var(--pfe-theme--color--surface--lighter,#f0f0f0));color:#151515;color:var(--pfe-dropdown--Color--hover,#151515)}:host([pfe-item-type=separator]) .pfe-dropdown-item__container{height:1px;background-color:#f0f0f0}:host([is_disabled]) .pfe-dropdown-item__container{pointer-events:none;--pfe-dropdown--Color:#6a6e73}\n/*# sourceMappingURL=pfe-dropdown-item.min.css.map */\n</style><li class=\"pfe-dropdown-item__container\">\n  <slot></slot>\n</li>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-dropdown-item.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-dropdown-item.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-dropdown-item.json";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "item-type": { "title": "List item type", "type": "string", "enum": ["link", "action", "separator"], "default": null, "prefixed": true } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-dropdown-item";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-item-type", "is_disabled"];
      }
    }]);

    function PfeDropdownItem() {
      classCallCheck(this, PfeDropdownItem);

      var _this = possibleConstructorReturn(this, (PfeDropdownItem.__proto__ || Object.getPrototypeOf(PfeDropdownItem)).call(this, PfeDropdownItem));

      _this._container = _this.shadowRoot.querySelector("." + _this.tag + "__container");
      _this._item = _this.shadowRoot.querySelector("slot").assignedNodes()[1];
      return _this;
    }

    createClass(PfeDropdownItem, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case "pfe-item-type":
            this._setAccessibility();
            break;
          case "is_disabled":
            this._setDisabled();
            break;
          default:
            break;
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeDropdownItem.prototype.__proto__ || Object.getPrototypeOf(PfeDropdownItem.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "_setAccessibility",
      value: function _setAccessibility() {
        if (this._container) {
          var type = this.getAttribute("pfe-item-type");
          if (type) {
            switch (type) {
              case "link":
                this._container.setAttribute("role", "none");
                this._item && this._item.setAttribute("role", "menuitem");
                break;
              case "action":
                this._container.setAttribute("role", "menuitem");
                this._item && this._item.removeAttribute("role");
                break;
              case "separator":
                this._container.setAttribute("role", "separator");
                break;
              default:
                break;
            }
          }
        }
      }
    }, {
      key: "_setDisabled",
      value: function _setDisabled() {
        var isDisabled = this.hasAttribute("is_disabled");
        if (isDisabled) {
          this.removeAttribute("tabindex");
          this.setAttribute("aria-disabled", "true");
        } else {
          this.removeAttribute("is_disabled");
          this.setAttribute("tabindex", "0");
          this.setAttribute("aria-disabled", "false");
        }
      }
    }]);
    return PfeDropdownItem;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeDropdown 1.0.0-prerelease.55
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

  // @POLYFILL  Element.closest
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // @POLYFILL  Element.matches
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  var KEYCODE = {
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESC: 27,
    HOME: 36,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38,
    TAB: 9
  };

  var PfeDropdown = function (_PFElement) {
    inherits(PfeDropdown, _PFElement);
    createClass(PfeDropdown, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{position:relative;display:inline-block;max-width:100%}:host(:hover:not([is_disabled])){--pfe-dropdown__before--BorderBottomColor:var(--pfe-dropdown__before--BorderBottomColor--hover, var(--pfe-dropdown--BorderBottomColor--before--hover, var(--pfe-theme--color--ui-base, #6a6e73)))}:host(:active:not([is_disabled])),:host(:focus:not([is_disabled])){--pfe-dropdown__before--BorderBottomColor:var(--pfe-dropdown__before--BorderBottomColor--hover, var(--pfe-dropdown--BorderBottomColor--before--hover, var(--pfe-theme--color--ui-base, #6a6e73)));--pfe-dropdown__before--BorderWidth:var(--pfe-dropdown__before--BorderWidth--hover, var(--pfe-dropdown--BorderWidth--before--hover, calc(var(--pfe-theme--ui--border-width, 1px) * 2)))}:host([hidden]){display:none}:host([is_disabled]){--pfe-dropdown--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-dropdown--BorderWidth:0}:host([is_disabled]) .pfe-dropdown__container{pointer-events:none}.pfe-dropdown__toggle{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;min-width:calc(16px * 2);min-width:var(--pfe-dropdown--MinWidth,calc(var(--pfe-theme--container-spacer,16px) * 2));max-width:100%;max-width:var(--pfe-dropdown--MaxWidth,100%);padding:calc(16px * .5) calc(16px * .5);padding:var(--pfe-dropdown--spacing--vertical,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5))) var(--pfe-dropdown--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,calc(var(--pfe-theme--container-padding,16px) * .5)));font-size:16px;font-size:var(--pfe-dropdown--FontSize,var(--pfe-theme--font-size,16px));font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);font-weight:400;font-weight:var(--pfe-dropdown--FontWeight,400);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:#3c3f42;color:var(--pfe-dropdown--Color,var(--pfe-broadcasted--text,#3c3f42));background-color:transparent;background-color:var(--pfe-dropdown--BackgroundColor,transparent);border:none;border:var(--pfe-dropdown--Border,none);cursor:pointer}.pfe-dropdown__toggle::before{position:absolute;top:0;right:0;bottom:0;left:0;content:\"\";border-width:1px;border-width:var(--pfe-dropdown__before--BorderWidth,var(--pfe-dropdown--BorderWidth--before,var(--pfe-theme--ui--border-width,1px)));border-style:solid;border-style:var(--pfe-dropdown__before--BorderStyle,var(--pfe-dropdown--BorderStyle--before,var(--pfe-theme--ui--border-style,solid)));border-top-color:#f0f0f0;border-top-color:var(--pfe-dropdown__before--BorderTopColor,var(--pfe-dropdown--BorderTopColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-right-color:#f0f0f0;border-right-color:var(--pfe-dropdown__before--BorderRightColor,var(--pfe-dropdown--BorderRightColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)));border-bottom-color:#6a6e73;border-bottom-color:var(--pfe-dropdown__before--BorderBottomColor,var(--pfe-dropdown--BorderBottomColor--before,var(--pfe-theme--color--surface--border--darker,#6a6e73)));border-left-color:#f0f0f0;border-left-color:var(--pfe-dropdown__before--BorderLeftColor,var(--pfe-dropdown--BorderLeftColor--before,var(--pfe-theme--color--surface--lighter,#f0f0f0)))}.pfe-dropdown__toggle-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pfe-dropdown__toggle-icon{vertical-align:calc(16px * -.125);vertical-align:calc(var(--pfe-theme--container-spacer,16px) * -.125);fill:currentColor;height:1em;height:var(--pfe-theme--icon-size,1em);width:var(--pfe-dropdown__toggle-icon--Width);margin-right:calc(16px * .5);margin-right:calc(var(--pfe-theme--container-spacer,16px) * .5);margin-left:16px;margin-left:var(--pfe-theme--container-spacer,16px);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5)}.pfe-dropdown__menu{display:none;position:absolute;top:calc(100% + .25rem);z-index:97;z-index:var(--pfe-theme--zindex--overlay,97);padding:var(--pfe-dropdown__menu--spacing--vertical) 0;padding:var(--pfe-dropdown__menu--spacing--vertical) var(--pfe-dropdown__menu--spacing--horizontal,var(--pfe-dropdown--SpacingHorizontal,0));margin:0;margin:var(--pfe-dropdown__menu--Margin,0);background:#fff;background:var(--pfe-dropdown__menu--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));background-clip:padding-box;border-width:1px;border-width:var(--pfe-dropdown__menu--BorderWidth,var(--pfe-theme--ui--border-width,1px));border-style:solid;border-style:var(--pfe-dropdown__menu--BorderStyle,var(--pfe-theme--ui--border-style,solid));border-color:transparent;border-color:var(--pfe-dropdown__menu--BorderColor,transparent);-webkit-box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.2);box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.2);-webkit-box-shadow:var(--pfe-dropdown__menu--BoxShadow,var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.2)));box-shadow:var(--pfe-dropdown__menu--BoxShadow,var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.2)));list-style:none;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:100%;min-width:var(--pfe-dropdown__menu--MinWidth,100%)}.pfe-dropdown__menu.open{display:block}\n/*# sourceMappingURL=pfe-dropdown.min.css.map */\n</style><div class=\"pfe-dropdown__container\">\n  <button class=\"pfe-dropdown__toggle\" type=\"button\" aria-haspopup=\"menu\" aria-controls=\"pfe-dropdown-menu\"\n    id=\"pfe-dropdown-toggle\">\n    <span class=\"pfe-dropdown__toggle-text\"></span>\n    <svg class=\"pfe-dropdown__toggle-icon\" viewBox=\"0 0 320 512\" aria-hidden=\"true\" role=\"img\">\n      <path\n        d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\">\n      </path>\n    </svg>\n  </button>\n  <ul class=\"pfe-dropdown__menu\" role=\"menu\" aria-labelledby=\"pfe-dropdown-toggle\" id=\"pfe-dropdown-menu\">\n    <slot></slot>\n  </ul>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-dropdown.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-dropdown.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-dropdown.json";
      }
    }, {
      key: "pfeDropdownOptions",
      set: function set$$1(options) {
        this._modifyDOM(options);
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "label": { "title": "Menu button label", "type": "string", "default": "Dropdown", "prefixed": true }, "is_disabled": { "title": "Disable menu button", "type": "boolean", "default": false, "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-dropdown";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-label", "is_disabled"];
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          change: this.tag + ":change"
        };
      }
    }]);

    function PfeDropdown() {
      classCallCheck(this, PfeDropdown);

      // state
      var _this = possibleConstructorReturn(this, (PfeDropdown.__proto__ || Object.getPrototypeOf(PfeDropdown)).call(this, PfeDropdown));

      _this.isOpen = false;

      _this._init = _this._init.bind(_this);

      // elements
      _this._container = _this.shadowRoot.querySelector("#" + _this.tag + "-container");
      _this._toggle = _this.shadowRoot.querySelector("#" + _this.tag + "-toggle");
      _this._toggle_text = _this._toggle.querySelector("." + _this.tag + "__toggle-text");
      _this._menu = _this.shadowRoot.querySelector("#" + _this.tag + "-menu");

      // events
      _this.open = _this.open.bind(_this);
      _this.close = _this.close.bind(_this);

      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._toggleKeydownHandler = _this._toggleKeydownHandler.bind(_this);
      _this._itemKeydownHandler = _this._itemKeydownHandler.bind(_this);
      _this._itemClickHandler = _this._itemClickHandler.bind(_this);
      _this._outsideClickHandler = _this._outsideClickHandler.bind(_this);
      return _this;
    }

    createClass(PfeDropdown, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        get(PfeDropdown.prototype.__proto__ || Object.getPrototypeOf(PfeDropdown.prototype), "connectedCallback", this).call(this);
        document.addEventListener("click", this._outsideClickHandler);
        Promise.all([customElements.whenDefined(PfeDropdown.tag), customElements.whenDefined(PfeDropdownItem.tag)]).then(function () {
          _this2._init();
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        this._toggle.removeEventListener("click", this._clickHandler);
        this._toggle.removeEventListener("keydown", this._toggleKeydownHandler);
        this._allItems().forEach(function (item) {
          item.removeEventListener("keydown", _this3._itemKeydownHandler);
          item.removeEventListener("click", _this3._itemClickHandler);
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case "pfe-label":
            this._toggle_text.textContent = newValue;
            break;
          case "is_disabled":
            this._setDisabled();
            break;
          default:
            break;
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this4 = this;

        if (this.children.length) {
          if (!this.hasAttribute("is_disabled")) {
            this._toggle.addEventListener("click", this._clickHandler);
            this._toggle.addEventListener("keydown", this._toggleKeydownHandler);
            this._allItems().forEach(function (item) {
              item.addEventListener("keydown", _this4._itemKeydownHandler);
              item.addEventListener("click", _this4._itemClickHandler);
            });
          }
        }
      }

      // Event handler for click event on Dropdown button

    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        this.isOpen ? this.close(event) : this.open(event);
        return this;
      }

      // Event handler for click event on Dropdown Item

    }, {
      key: "_itemClickHandler",
      value: function _itemClickHandler(event) {
        var pfeType = void 0;
        if (event.target.parentElement.attributes["pfe-item-type"]) {
          pfeType = event.target.parentElement.attributes["pfe-item-type"].value;
        }
        this._selectItem(event.target, pfeType);
        return this;
      }

      // Event handler for keydown events on Dropdown Menu

    }, {
      key: "_itemKeydownHandler",
      value: function _itemKeydownHandler(event) {
        var newItem = void 0;
        var pfeType = void 0;
        if (event.target.attributes["pfe-item-type"]) {
          pfeType = event.target.attributes["pfe-item-type"].value;
        }
        // active dropdown item index
        var currentIndex = this._allItems().findIndex(function (item) {
          return item === document.activeElement;
        });
        switch (event.keyCode) {
          case KEYCODE.ENTER:
            this._selectItem(event.target.children[0], pfeType);
            break;
          case KEYCODE.ESC:
            this.close(event);
            break;
          case KEYCODE.RIGHT:
          case KEYCODE.DOWN:
            // get the following item
            newItem = this._itemContainer(this._nextItem(currentIndex, 1));
            break;
          case KEYCODE.LEFT:
          case KEYCODE.UP:
            // get the previous item
            newItem = this._itemContainer(this._nextItem(currentIndex, -1));
            break;
          case KEYCODE.HOME:
            newItem = this._firstItem();
            break;
          case KEYCODE.END:
            newItem = this._lastItem();
            break;
          case KEYCODE.TAB:
            this.close();
            break;
          default:
            break;
        }
        if (newItem) {
          newItem.setAttribute("tabindex", "-1");
          newItem.focus();
        }
        return this;
      }

      // Event handler for click event outside the Dropdown element

    }, {
      key: "_outsideClickHandler",
      value: function _outsideClickHandler(event) {
        // Check if the clicked element is the dropdown object
        var isSelf = event.target === this;
        // Check if the clicked element contains or is contained by the dropdown element
        var isChild = event.target.closest("pfe-dropdown");
        var insideWrapper = event.target.tagName.indexOf("-") > -1 ? event.target.shadowRoot.querySelector("pfe-dropdown") : null;
        // Check states to determine if the dropdown menu should close
        if (!isSelf && !(isChild || insideWrapper)) {
          this.close();
        }
      }

      // Event handler for keydown event on Dropdown

    }, {
      key: "_toggleKeydownHandler",
      value: function _toggleKeydownHandler(event) {
        switch (event.keyCode) {
          case KEYCODE.ENTER:
          case KEYCODE.DOWN:
            if (this._allDisabled()) {
              // toggle the dropdown if all items disabled
              this.toggle(event);
            } else {
              // otherwise, get the next enabled item
              this.open();
              var item = this._itemContainer(this._nextItem(-1, 1));
              item.setAttribute("tabindex", "-1");
              item.focus();
            }
            break;
          case KEYCODE.TAB:
            this.close();
            break;
          default:
            break;
        }
        return this;
      }

      // modify DOM if custom options are passed in an array

    }, {
      key: "_modifyDOM",
      value: function _modifyDOM(options) {
        var _this5 = this;

        options.forEach(function (el) {
          var item = void 0;
          switch (el.type) {
            case "link":
              item = document.createElement("a");
              item.setAttribute("href", el.href ? el.href : "#");
              break;
            case "action":
              item = document.createElement("button");
              break;
            default:
              break;
          }
          var option = document.createElement("pfe-dropdown-item");
          option.setAttribute("pfe-item-type", el.type);
          if (el.is_disabled) {
            option.setAttribute("is_disabled", el.is_disabled);
          }
          if (item) {
            item.innerText = el.text ? el.text : "";
            option.appendChild(item);
          }
          _this5.appendChild(option);
        });
      }
    }, {
      key: "_setDisabled",
      value: function _setDisabled() {
        var isDisabled = this.hasAttribute("is_disabled");
        if (isDisabled) {
          this.setAttribute("aria-disabled", "true");
          this.setAttribute("tabindex", "-1");
        } else {
          this.removeAttribute("is_disabled");
          this.setAttribute("aria-disabled", "false");
          this.removeAttribute("tabindex");
        }
      }
    }, {
      key: "_allItems",
      value: function _allItems() {
        return [].concat(toConsumableArray(this.querySelectorAll(this.tag + "-item:not([pfe-item-type='separator'])")));
      }
    }, {
      key: "_allDisabled",
      value: function _allDisabled() {
        return this._allItems().find(function (item) {
          return !item.hasAttribute("is_disabled");
        }) === undefined;
      }
    }, {
      key: "_nextItem",
      value: function _nextItem(currentPosition, direction) {
        var items = this._allItems();
        var index = (currentPosition + direction) % items.length;
        index = index < 0 ? index + items.length : index;
        var item = items[index];
        while (item && item.hasAttribute("is_disabled")) {
          index += direction;
          item = items[index % items.length];
        }
        return item;
      }
    }, {
      key: "_firstItem",
      value: function _firstItem() {
        var items = this._allItems();
        return items[0];
      }
    }, {
      key: "_lastItem",
      value: function _lastItem() {
        var items = this._allItems();
        return items[items.length - 1];
      }
    }, {
      key: "_selectItem",
      value: function _selectItem(item, type) {
        if (type === "action") {
          this.emitEvent(PfeDropdown.events.change, {
            detail: { action: item.innerText }
          });
          this.close(event);
        } else {
          item.click();
        }
      }
    }, {
      key: "addDropdownOptions",
      value: function addDropdownOptions(options) {
        this._modifyDOM(options);
      }
    }, {
      key: "open",
      value: function open(event) {
        if (event) {
          event.preventDefault();
        }
        this.isOpen = true;
        this._menu.classList.add("open");
        this._toggle.setAttribute("aria-expanded", true);
        return this;
      }
    }, {
      key: "close",
      value: function close(event) {
        if (event) {
          event.preventDefault();
        }
        this.isOpen = false;
        this._menu.classList.remove("open");
        this._toggle.setAttribute("aria-expanded", false);
        return this;
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        this.isOpen ? this.close(event) : this.open(event);
      }
    }, {
      key: "_itemContainer",
      value: function _itemContainer(item) {
        // used to apply the focus state to the item's container
        return item.shadowRoot.querySelector("." + this.tag + "-item__container");
      }
    }]);
    return PfeDropdown;
  }(PFElement);

  PFElement.create(PfeDropdownItem);
  PFElement.create(PfeDropdown);

  return PfeDropdown;

})));
//# sourceMappingURL=pfe-dropdown.umd.js.map
