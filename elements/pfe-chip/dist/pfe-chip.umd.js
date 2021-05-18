(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-badge/dist/pfe-badge.umd'), require('../../pfe-icon/dist/pfe-icon.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-badge/dist/pfe-badge.umd', '../../pfe-icon/dist/pfe-icon.umd'], factory) :
  (global = global || self, global.PfeChip = factory(global.PFElement, global.PfeBadge, global.PfeIcon));
}(this, (function (PFElement, pfeBadge_umd, PfeIcon) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;
  pfeBadge_umd = pfeBadge_umd && Object.prototype.hasOwnProperty.call(pfeBadge_umd, 'default') ? pfeBadge_umd['default'] : pfeBadge_umd;
  PfeIcon = PfeIcon && Object.prototype.hasOwnProperty.call(PfeIcon, 'default') ? PfeIcon['default'] : PfeIcon;

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
   * PatternFly Elements: PfeChip 1.7.0
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

  var PfeChip = function (_PFElement) {
    inherits(PfeChip, _PFElement);
    createClass(PfeChip, [{
      key: "hide",
      value: function hide() {
        this.setAttribute("hidden", "");
      }
    }, {
      key: "show",
      value: function show() {
        this.removeAttribute("hidden");
      }
    }, {
      key: "delete",
      value: function _delete() {
        this.parentNode.removeChild(this);
      }
    }, {
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>.pfe-chip__button,.pfe-chip__close{background-color:transparent;border:none;margin:0;padding:0;text-align:left}:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;color:#151515;color:var(--pfe-chip--Color,var(--pfe-theme--color--text,#151515));padding:0 0 0 .5rem;padding:var(--pfe-chip--Padding,var(--pfe-chip--PaddingTop,0) var(--pfe-chip--PaddingRight,0) var(--pfe-chip--PaddingBottom,0) var(--pfe-chip--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)));list-style:none;background-color:#fff;background-color:var(--pfe-chip--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-radius:2px;border-radius:var(--pfe-chip--BorderRadius,var(--pfe-theme--ui--border-radius,2px));border:1px solid #d2d2d2;border:var(--pfe-chip--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-chip--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-radius:2px;border-radius:var(--pfe-chip--BorderRadius,var(--pfe-theme--ui--border-radius,2px))}:host([hidden]){display:none}:host([on=dark]),:host([on=saturated]){border-width:0;border-width:var(--pfe-chip--BorderWidth,0)}.pfe-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:7.5rem;max-width:var(--pfe-chip__text--MaxWidth,7.5rem);font-size:.75rem;font-size:var(--pfe-chip__text--FontSize,var(--pf-global--FontSize--xs,.75rem));line-height:1.5;line-height:var(--pfe-chip__text--LineHeight,var(--pfe-theme--line-height,1.5));color:#151515;color:var(--pfe-chip__text--Color,var(--pfe-theme--color--text,#151515))}.pfe-chip__badge{margin-left:.25rem;margin-left:var(--pfe-chip__badge--MarginLeft,var(--pf-global--spacer--xs,.25rem))}.pfe-chip__button,.pfe-chip__close{position:relative;display:inline-block;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:.02344rem .5rem .02344rem .5rem;padding:var(--pfe-chip__button--Padding,var(--pfe-chip__button--PaddingTop,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip__button--PaddingRight,var(--pfe-theme--content-spacer--body--sm,.5rem)) var(--pfe-chip__button--PaddingBottom,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip__button--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)))}.pfe-chip__button::after,.pfe-chip__close::after{border:0 solid #3c3f42;border:var(--pfe-chip__button--BorderWidth,0) var(--pfe-theme--ui--border-style,solid) var(--pfe-chip__button--BorderColor,var(--pfe-theme--color--surface--border--darkest,#3c3f42));border-radius:2px;border-radius:var(--pfe-chip__button--BorderRadius,var(--pfe-theme--ui--border-radius,2px))}.pfe-chip__button pfe-icon,.pfe-chip__close pfe-icon{--pfe-icon--color:pfe-local(BackgroundColor, $region: button);display:inline-block;height:calc(.75rem * 1.5);height:calc(var(--pfe-chip__button--size,var(--pf-global--FontSize--xs,.75rem)) * 1.5);width:.75rem;width:var(--pfe-chip__button--size,var(--pf-global--FontSize--xs,.75rem));line-height:1;vertical-align:-.125em}.pfe-chip__button:hover,.pfe-chip__close:hover{cursor:pointer}.pfe-chip__button:hover::after,.pfe-chip__close:hover::after{border-width:var(--pfe-chip__button--BorderWidth--hover)}.pfe-chip__button:hover pfe-icon,.pfe-chip__close:hover pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--hover,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:hover::after,:host([on=dark]) .pfe-chip__close:hover::after{margin:1px}.pfe-chip__button:active::after,.pfe-chip__close:active::after{border-width:var(--pfe-chip__button--BorderWidth--active)}.pfe-chip__button:active pfe-icon,.pfe-chip__close:active pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--active,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:active::after,:host([on=dark]) .pfe-chip__close:active::after{margin:1px}.pfe-chip__button:focus::after,.pfe-chip__close:focus::after{border-width:var(--pfe-chip__button--BorderWidth--focus)}.pfe-chip__button:focus pfe-icon,.pfe-chip__close:focus pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--focus,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:focus::after,:host([on=dark]) .pfe-chip__close:focus::after{margin:1px}:host([read-only]){padding:.02344rem .5rem .02344rem .5rem;padding:var(--pfe-chip--Padding,var(--pfe-chip--PaddingTop,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip--PaddingRight,var(--pfe-theme--content-spacer--body--sm,.5rem)) var(--pfe-chip--PaddingBottom,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)))}:host([overflow]){padding-left:0;padding-left:var(--pfe-chip--PaddingLeft,0);border-width:0;border-width:var(--pfe-chip--BorderWidth,0);color:#06c;color:var(--pfe-chip--Color,var(--pfe-theme--color--link,#06c))}:host([overflow]) .pfe-chip__button:hover,:host([overflow]) .pfe-chip__close:hover{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--hover,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))}:host([overflow]) .pfe-chip__button:active,:host([overflow]) .pfe-chip__close:active{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--active,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))}:host([overflow]) .pfe-chip__button:focus,:host([overflow]) .pfe-chip__close:focus{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--focus,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))} /*# sourceMappingURL=pfe-chip.min.css.map */</style>\n<slot hidden aria-hidden=\"true\"></slot>\n\n" + (this.overflow ? "<button class=\"pfe-chip__button\" type=\"button\" aria-labelledby=\"chip\">" : "") + "\n  <span class=\"pfe-chip__text\" id=\"chip\" aria-hidden=\"true\"></span>\n  " + (this.hasSlot("pfe-chip--badge") ? "<pfe-badge class=\"pfe-chip__badge\">\n    <slot name=\"pfe-chip--badge\"></slot>\n  </pfe-badge>" : "") + "\n  " + (this.overflow ? "</button>" : "") + "\n\n" + (this.showCloseButton ? "<button class=\"pfe-chip__close\" type=\"button\" aria-labelledby=\"remove_chip\"\n  aria-label=\"Remove\" id=\"remove_chip\">\n  <pfe-icon icon=\"fas-times\"></pfe-icon>\n</button>" : "");
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-chip.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-chip.scss";
      }
    }, {
      key: "showCloseButton",
      get: function get() {
        return !this.readOnly && !this.overflow;
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-chip";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Chip",
          description: "A chip is used to display items that have been filtered or selected from a larger group. They comprise of a text element and a button component that is used to remove the chip from selection. When the text overflows it is truncated using ellipses."
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {
          close: this.tag + ":close",
          load: this.tag + ":load"
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          readOnly: {
            title: "Read only",
            type: Boolean,
            default: false
          },
          overflow: {
            title: "Overflow",
            type: Number
          },
          badge: {
            title: "Badge",
            type: Number
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          default: {
            title: "Default slot",
            type: "array",
            namedSlot: false,
            items: {
              oneOf: [{
                $ref: "raw"
              }]
            }
          },
          badge: {
            title: "Badge",
            type: "array",
            namedSlot: true,
            items: {
              title: "Badge item",
              oneOf: [{
                $ref: "raw"
              }]
            }
          }
        };
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeChip() {
      classCallCheck(this, PfeChip);

      var _this = possibleConstructorReturn(this, (PfeChip.__proto__ || Object.getPrototypeOf(PfeChip)).call(this, PfeChip, { type: PfeChip.PfeType }));

      _this._text = _this.shadowRoot.querySelector("." + _this.tag + "__text");
      _this._badge = _this.shadowRoot.querySelector("pfe-badge");
      _this._close = _this.shadowRoot.querySelector("." + _this.tag + "__close");
      _this._add = _this.shadowRoot.querySelector("." + _this.tag + "__button");

      _this._init = _this._init.bind(_this);
      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._keyupHandler = _this._keyupHandler.bind(_this);
      _this._badgeObserver = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeChip, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeChip.prototype.__proto__ || Object.getPrototypeOf(PfeChip.prototype), "connectedCallback", this).call(this);

        this.badge = this.querySelector("[slot=\"badge\"]");

        // Add a slotchange listener to the lightDOM trigger
        if (this.badge) {
          this._badgeObserver.observe(this.badge, {
            characterData: true,
            attributes: true,
            subtree: true,
            childList: true
          });
          // this.badge.addEventListener("slotchange", this._init);
        }

        // @TODO load icon using pfe-icon instead of hardcoding SVG
        Promise.all([customElements.whenDefined(PfeIcon.tag)]).then(function () {
          // Set up font-awesome icon set
          if (!PfeIcon._iconSets["fas"]) {
            PfeIcon.addIconSet("fas", "//unpkg.com/@fortawesome/fontawesome-free@5/svgs/solid", function (iconName, setName, path) {
              var name = iconName.replace("fas-", "");
              return path + "/" + name + ".svg";
            });
          }
        });

        this._init();
      }
    }, {
      key: "_init",
      value: function _init() {
        // Capture the text content and move it to the Shadow DOM
        if (this.firstChild && this.firstChild.textContent.trim()) {
          this._text.textContent = this.firstChild.textContent.trim();
        } else if (this.firstElementChild && this.firstElementChild.textContent.trim()) {
          this._text.textContent = this.firstElementChild.textContent.trim();
        }

        // If the badge element exists, check that it's value is numeric
        var badgeContent = "";
        if (this.badge) badgeContent = this.badge.textContent;

        if (badgeContent) {
          if (isNaN(badgeContent)) {
            console.warn(this.tag + ": The badge content must be numeric.");
          } else {
            this._badge.setAttribute("number", this.badge.textContent);
          }
        }

        // If this is not a read-only chip, attach event listeners
        if (this._close) {
          this._close.addEventListener("click", this._clickHandler);
          this._close.addEventListener("keyup", this._keyupHandler);
        }

        // If this is not a read-only chip, attach event listeners
        if (this._add) {
          this._add.addEventListener("click", this._clickHandler);
          this._add.addEventListener("keyup", this._keyupHandler);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.badge) {
          this.badge.removeEventListener("slotchange", this._init);
        }

        if (this._close) {
          this._close.removeEventListener("click", this._clickHandler);
          this._close.removeEventListener("keyup", this._keyupHandler);
        }

        if (this._add) {
          this._add.removeEventListener("click", this._clickHandler);
          this._add.removeEventListener("keyup", this._keyupHandler);
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        if (!this.overflow) {
          this.emitEvent(PfeChip.events.close);
        } else {
          this.emitEvent(PfeChip.events.load);
        }
      }
    }, {
      key: "_keyupHandler",
      value: function _keyupHandler(event) {
        var key = event.key || event.keyCode;
        switch (key) {
          case "Enter":
          case 13:
            if (!this.overflow) {
              this.emitEvent(PfeChip.events.close);
            } else {
              this.emitEvent(PfeChip.events.load);
            }
        }
      }
    }]);
    return PfeChip;
  }(PFElement);

  PFElement.create(PfeChip);

  return PfeChip;

})));
//# sourceMappingURL=pfe-chip.umd.js.map
