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
   * PatternFly Elements: PfeDropdown 1.0.0-prerelease.31
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
        return "<style>:host{--pfe-dropdown-item--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown-item--PaddingRight:var(--pfe-theme--container-padding, 16px);--pfe-dropdown-item--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown-item--PaddingLeft:var(--pfe-theme--container-padding, 16px);--pfe-dropdown-item--FontSize:var(--pfe-theme--font-size, 16px);--pfe-dropdown-item--FontWeight:400;--pfe-dropdown-item--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown-item--Color:#151515;--pfe-dropdown-item--Color--hover:#151515;--pfe-dropdown-item--TextAlign:left;--pfe-dropdown-item--WhiteSpace:nowrap;--pfe-dropdown-item--BackgroundColor:transparent;--pfe-dropdown-item--BackgroundColor--hover:#ededed;--pfe-dropdown-item--Border:none;--pfe-dropdown-item--BoxSizing:border-box;--pfe-dropdown-item--TextDecoration:none;--pfe-dropdown-item--Height:1px;--pfe-dropdown-item--MarginTop:0.5rem;--pfe-dropdown-item--MarginBottom:0.5rem}::slotted(*){display:block;width:100%;padding-top:var(--pfe-dropdown-item--PaddingTop);padding-right:var(--pfe-dropdown-item--PaddingRight);padding-bottom:var(--pfe-dropdown-item--PaddingBottom);padding-left:var(--pfe-dropdown-item--PaddingLeft);font-size:var(--pfe-dropdown-item--FontSize);font-weight:var(--pfe-dropdown-item--FontWeight);line-height:var(--pfe-dropdown-item--LineHeight);color:var(--pfe-dropdown-item--Color);text-align:var(--pfe-dropdown-item--TextAlign);white-space:var(--pfe-dropdown-item--WhiteSpace);background-color:var(--pfe-dropdown-item--BackgroundColor);border:var(--pfe-dropdown-item--Border);-webkit-box-sizing:var(--pfe-dropdown-item--BoxSizing);box-sizing:var(--pfe-dropdown-item--BoxSizing);-webkit-text-decoration:var(--pfe-dropdown-item--TextDecoration);text-decoration:var(--pfe-dropdown-item--TextDecoration);font-family:inherit}::slotted(:hover){color:var(--pfe-dropdown-item--Color--hover);background-color:var(--pfe-dropdown-item--BackgroundColor--hover)}:host([pfe-type=separator]) .pfe-dropdown-item__container{height:var(--pfe-dropdown-item--Height);margin-top:var(--pfe-dropdown-item--MarginTop);background-color:#d2d2d2;border:0}:host([disabled]) .pfe-dropdown-item__container{pointer-events:none;--pfe-dropdown-item--Color:#737679;--pfe-dropdown-item--BackgroundColor:transparent}\n/*# sourceMappingURL=pfe-dropdown-item.min.css.map */\n</style><li class=\"pfe-dropdown-item__container\" id=\"pfe-dropdown-item\">\n  <slot></slot>\n</li>";
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
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.31";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-dropdown-item";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-type", "disabled"];
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
          case "pfe-type":
            this._setAccessibility();
            break;
          case "disabled":
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
        if (this._container && this._item) {
          var type = this.getAttribute("pfe-type");
          if (type) {
            switch (type) {
              case "link":
                this._container.setAttribute("role", "none");
                this._item.setAttribute("role", "menuitem");
                break;
              case "action":
                this._container.setAttribute("role", "menuitem");
                this._item.removeAttribute("role");
                break;
              case "separator":
                this._container.setAttribute("role", "separator");
              default:
                break;
            }
          }
        }
      }
    }, {
      key: "_setDisabled",
      value: function _setDisabled() {
        var isDisabled = this.hasAttribute("disabled");
        if (isDisabled) {
          this.removeAttribute("tabindex");
          this.setAttribute("aria-disabled", "true");
        } else {
          this.removeAttribute("disabled");
          this.setAttribute("tabindex", "0");
          this.setAttribute("aria-disabled", "false");
        }
      }
    }]);
    return PfeDropdownItem;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeDropdown 1.0.0-prerelease.31
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
    END: 35,
    ENTER: 13,
    ESC: 27,
    HOME: 36,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
  };

  var PfeDropdown = function (_PFElement) {
    inherits(PfeDropdown, _PFElement);
    createClass(PfeDropdown, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-dropdown__toggle--Position:relative;--pfe-dropdown__toggle--Display:flex;--pfe-dropdown__toggle--AlignItems:center;--pfe-dropdown__toggle--JustifyContent:space-between;--pfe-dropdown__toggle--MinWidth:calc(var(--pfe-theme--container-spacer, 16px) * 2);--pfe-dropdown__toggle--MaxWidth:100%;--pfe-dropdown__toggle--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.375);--pfe-dropdown__toggle--PaddingRight:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__toggle--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.375);--pfe-dropdown__toggle--PaddingLeft:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__toggle--FontSize:var(--pfe-theme--font-size, 16px);--pfe-dropdown__toggle--FontWeight:400;--pfe-dropdown__toggle--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown__toggle--Color:var(--pfe-theme--color--text, #333);--pfe-dropdown__toggle--BackgroundColor:transparent;--pfe-dropdown__toggle--Border:none;--pfe-dropdown__toggle--BorderBottomColor--before:#8a8d90;--pfe-dropdown__toggle--BorderBottomColor--before--hover:var(--pfe-theme--color--link, #06c);--pfe-dropdown__toggle--BorderWidth--before:var(--pfe-theme--ui--border-width, 1px);--pfe-dropdown__toggle--BorderWidth--before--hover:calc(var(--pfe-theme--ui--border-width, 1px) * 2);--pfe-dropdown__toggle--BorderTopColor--before:#ededed;--pfe-dropdown__toggle--BorderRightColor--before:#ededed;--pfe-dropdown__toggle--BorderLeftColor--before:#ededed;--pfe-dropdown__toggle--BorderStyle--before:solid;--pfe-dropdown__toggle-text--Overflow:hidden;--pfe-dropdown__toggle-text--TextOverflow:ellipsis;--pfe-dropdown__toggle-text--WhiteSpace:nowrap;--pfe-dropdown__toggle-icon--VerticalAlign:calc(var(--pfe-theme--container-spacer, 16px) * -0.125);--pfe-dropdown__toggle-icon--Height:var(--pfe-theme--icon-size, 1em);--pfe-dropdown__toggle-icon--Width:var(--pfe-theme--icon-size, 1em);--pfe-dropdown__toggle-icon--MarginRight:calc(var(--pfe-theme--container-spacer, 16px) * 0.5);--pfe-dropdown__toggle-icon--MarginLeft:var(--pfe-theme--container-spacer, 16px);--pfe-dropdown__toggle-icon--LineHeight:var(--pfe-theme--line-height, 1.5);--pfe-dropdown__menu--Top:calc(100% + 0.25rem);--pfe-dropdown__menu--ZIndex:200;--pfe-dropdown__menu--PaddingTop:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__menu--PaddingBottom:calc(var(--pfe-theme--container-padding, 16px) * 0.5);--pfe-dropdown__menu--PaddingRight:0;--pfe-dropdown__menu--PaddingLeft:0;--pfe-dropdown__menu--Margin:0;--pfe-dropdown__menu--Background:var(--pfe-theme--color--surface--lightest, #fff);--pfe-dropdown__menu--BackgroundClip:padding-box;--pfe-dropdown__menu--BorderWidth:var(--pfe-theme--ui--border-width, 1px);--pfe-dropdown__menu--BorderStyle:var(--pfe-theme--ui--border-style, solid);--pfe-dropdown__menu--BorderColor:transparent;--pfe-dropdown__menu--BoxShadow:var(--pfe-theme--box-shadow--sm, 0 0.0625rem 0.125rem 0 rgba(19, 19, 19, 0.2));--pfe-dropdown__menu--BoxSizing:border-box;--pfe-dropdown__menu--ListStyle:none;--pfe-dropdown__menu--MinWidth:100%;position:relative;display:inline-block;max-width:100%}:host([hidden]){display:none}:host([disabled]) .pfe-dropdown__container{pointer-events:none}:host([disabled]) .pfe-dropdown__toggle{--pfe-dropdown__toggle--BackgroundColor:#ededed}:host([disabled]) .pfe-dropdown__toggle::before{border:none}.pfe-dropdown__toggle{position:var(--pfe-dropdown__toggle--Position);display:var(--pfe-dropdown__toggle--Display);-webkit-box-align:var(--pfe-dropdown__toggle--AlignItems);-webkit-align-items:var(--pfe-dropdown__toggle--AlignItems);-ms-flex-align:var(--pfe-dropdown__toggle--AlignItems);align-items:var(--pfe-dropdown__toggle--AlignItems);-webkit-box-pack:var(--pfe-dropdown__toggle--JustifyContent);-webkit-justify-content:var(--pfe-dropdown__toggle--JustifyContent);-ms-flex-pack:var(--pfe-dropdown__toggle--JustifyContent);justify-content:var(--pfe-dropdown__toggle--JustifyContent);min-width:var(--pfe-dropdown__toggle--MinWidth);max-width:var(--pfe-dropdown__toggle--MaxWidth);padding-top:var(--pfe-dropdown__toggle--PaddingTop);padding-right:var(--pfe-dropdown__toggle--PaddingRight);padding-bottom:var(--pfe-dropdown__toggle--PaddingBottom);padding-left:var(--pfe-dropdown__toggle--PaddingLeft);font-size:var(--pfe-dropdown__toggle--FontSize);font-weight:var(--pfe-dropdown__toggle--FontWeight);line-height:var(--pfe-dropdown__toggle--LineHeight);color:var(--pfe-dropdown__toggle--Color);background-color:var(--pfe-dropdown__toggle--BackgroundColor);border:var(--pfe-dropdown__toggle--Border);font-family:inherit}.pfe-dropdown__toggle:active:before,.pfe-dropdown__toggle:focus:before,.pfe-dropdown__toggle:hover:before{border-bottom-color:var(--pfe-dropdown__toggle--BorderBottomColor--before--hover)}.pfe-dropdown__toggle:active:before,.pfe-dropdown__toggle:focus:before{border-width:var(--pfe-dropdown__toggle--BorderWidth--before--hover)}.pfe-dropdown__toggle:before{position:absolute;top:0;right:0;bottom:0;left:0;content:\"\";border-width:var(--pfe-dropdown__toggle--BorderWidth--before);border-style:var(--pfe-dropdown__toggle--BorderStyle--before);border-top-color:var(--pfe-dropdown__toggle--BorderTopColor--before);border-right-color:var(--pfe-dropdown__toggle--BorderRightColor--before);border-bottom-color:var(--pfe-dropdown__toggle--BorderBottomColor--before);border-left-color:var(--pfe-dropdown__toggle--BorderLeftColor--before)}.pfe-dropdown__toggle-text{overflow:var(--pfe-dropdown__toggle-text--Overflow);text-overflow:var(--pfe-dropdown__toggle-text--TextOverflow);white-space:var(--pfe-dropdown__toggle-text--WhiteSpace)}.pfe-dropdown__toggle-icon{vertical-align:var(--pfe-dropdown__toggle-icon--VerticalAlign);fill:currentColor;height:var(--pfe-dropdown__toggle-icon--Height);width:var(--pfe-dropdown__toggle-icon--Width);margin-right:var(--pfe-dropdown__toggle-icon--MarginRight);margin-left:var(--pfe-dropdown__toggle-icon--MarginLeft);line-height:var(--pfe-dropdown__toggle-icon--LineHeight)}.pfe-dropdown__menu{display:none;position:absolute;top:var(--pfe-dropdown__menu--Top);z-index:var(--pfe-dropdown__menu--ZIndex);padding-top:var(--pfe-dropdown__menu--PaddingTop);padding-bottom:var(--pfe-dropdown__menu--PaddingBottom);padding-right:var(--pfe-dropdown__menu--PaddingRight);padding-left:var(--pfe-dropdown__menu--PaddingLeft);margin:var(--pfe-dropdown__menu--Margin);background:var(--pfe-dropdown__menu--Background);background-clip:var(--pfe-dropdown__menu--BackgroundClip);border-width:var(--pfe-dropdown__menu--BorderWidth);border-style:var(--pfe-dropdown__menu--BorderStyle);border-color:var(--pfe-dropdown__menu--BorderColor);-webkit-box-shadow:var(--pfe-dropdown__menu--BoxShadow);box-shadow:var(--pfe-dropdown__menu--BoxShadow);-webkit-box-sizing:var(--pfe-dropdown__menu--BoxSizing);box-sizing:var(--pfe-dropdown__menu--BoxSizing);list-style:var(--pfe-dropdown__menu--ListStyle);min-width:var(--pfe-dropdown__menu--MinWidth)}.pfe-dropdown__menu.open{display:block}\n/*# sourceMappingURL=pfe-dropdown.min.css.map */\n</style><div class=\"pfe-dropdown__container\" id=\"pfe-dropdown-container\">\n  <button class=\"pfe-dropdown__toggle\" type=\"button\" aria-haspopup=\"menu\" aria-controls=\"pfe-dropdown-menu\"\n    id=\"pfe-dropdown-toggle\">\n    <span class=\"pfe-dropdown__toggle-text\"></span>\n    <svg class=\"pfe-dropdown__toggle-icon\" viewBox=\"0 0 320 512\" aria-hidden=\"true\" role=\"img\">\n      <path\n        d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\">\n      </path>\n    </svg>\n  </button>\n  <ul class=\"pfe-dropdown__menu\" role=\"menu\" aria-labelledby=\"pfe-dropdown-toggle\" id=\"pfe-dropdown-menu\">\n    <slot></slot>\n  </ul>\n</div>";
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
      key: "disabled",
      get: function get$$1() {
        return this.hasAttribute("disabled");
      }
    }, {
      key: "pfeDropdownOptions",
      set: function set$$1(options) {
        this._modifyDOM(options);
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.31";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-dropdown";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-label", "disabled"];
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

          case "disabled":
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
          if (!this.disabled) {
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

        if (event.target.parentElement.attributes["pfe-type"]) {
          pfeType = event.target.parentElement.attributes["pfe-type"].value;
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

        if (event.target.attributes["pfe-type"]) {
          pfeType = event.target.attributes["pfe-type"].value;
        }

        switch (event.keyCode) {
          case KEYCODE.ENTER:
            this._selectItem(event.target.children[0], pfeType);
            break;

          case KEYCODE.ESC:
            this.close(event);
            break;

          case KEYCODE.RIGHT:
          case KEYCODE.DOWN:
            newItem = this._nextItem().hasAttribute("disabled") ? this._skipItem(1) : this._nextItem();
            break;

          case KEYCODE.LEFT:
          case KEYCODE.UP:
            newItem = this._prevItem().hasAttribute("disabled") ? this._skipItem(-1) : this._prevItem();
            break;

          case KEYCODE.HOME:
            newItem = this._firstItem();
            break;

          case KEYCODE.END:
            newItem = this._lastItem();
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
        var insideWrapper = event.target.tagName.includes("-") ? event.target.shadowRoot.querySelector("pfe-dropdown") : null;

        // Check states to determine if the dropdown menu should close
        if (!isSelf && !(isChild || insideWrapper)) {
          this.close(event);
        }
      }

      // Event handler for keydown event on Dropdown

    }, {
      key: "_toggleKeydownHandler",
      value: function _toggleKeydownHandler(event) {
        if (event.keyCode === KEYCODE.DOWN || event.keyCode === KEYCODE.ENTER) {
          this.open(event);
          var newItem = this._firstItem();
          if (newItem) {
            if (newItem.hasAttribute("disabled")) {
              newItem = this._skipItem(1);
            }
            newItem.setAttribute("tabindex", "-1");
            newItem.focus();
          }
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
          option.setAttribute("pfe-type", el.type);
          if (el.disabled) {
            option.setAttribute("disabled", el.disabled);
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
        var isDisabled = this.hasAttribute("disabled");
        if (isDisabled) {
          this.setAttribute("aria-disabled", "true");
        } else {
          this.removeAttribute("disabled");
          this.setAttribute("aria-disabled", "false");
        }
      }
    }, {
      key: "_allItems",
      value: function _allItems() {
        return [].concat(toConsumableArray(this.querySelectorAll(this.tag + "-item:not([pfe-type='separator'])")));
      }
    }, {
      key: "_prevItem",
      value: function _prevItem() {
        var items = this._allItems();
        var newIdx = items.findIndex(function (item) {
          return item === document.activeElement;
        }) - 1;
        return items[(newIdx + items.length) % items.length];
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
      key: "_nextItem",
      value: function _nextItem() {
        var items = this._allItems();
        var newIdx = items.findIndex(function (item) {
          return item === document.activeElement;
        }) + 1;
        return items[newIdx % items.length];
      }
    }, {
      key: "_skipItem",
      value: function _skipItem(direction) {
        var items = this._allItems();
        var newIdx = items.findIndex(function (item) {
          return item === document.activeElement;
        }) + direction;
        return items[newIdx % items.length + direction];
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
    }]);
    return PfeDropdown;
  }(PFElement);

  PFElement.create(PfeDropdownItem);
  PFElement.create(PfeDropdown);

  return PfeDropdown;

})));
//# sourceMappingURL=pfe-dropdown.umd.js.map
