(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeProgressSteps = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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
      }
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
   * PatternFly Elements: PfeProgressSteps 1.9.3
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

  var PfeProgressStepsItem = function (_PFElement) {
    inherits(PfeProgressStepsItem, _PFElement);
    createClass(PfeProgressStepsItem, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([vertical]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}:host(:not([vertical])){width:75px;width:var(--pfe-progress-steps__item--size,75px);min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content}:host([vertical]:not(:last-child)){min-height:75px;min-height:var(--pfe-progress-steps__item--size,75px)}:host([hidden]){display:none}:host([is_link]){cursor:pointer}:host([vertical]:not([has_description]):last-child){margin-bottom:1em}.pfe-progress-steps-item__circle{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;border-radius:50%;border:2px solid #d2d2d2;border:var(--pfe-theme--ui--border-width--md,2px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2);width:20px;width:var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px));height:20px;height:var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px));z-index:2;background-color:#fff;background-color:var(--pfe-progress-steps-item__circle--color,var(--pfe-theme--color--surface--lightest,#fff));margin:auto;margin:calc((32px - 20px)/ 2) auto;margin:calc((var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) - var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px)))/ 2) auto;-webkit-transform:translateX(2px);transform:translateX(2px);-webkit-transform:translateX(var(--pfe-theme--ui--border-width--md,2px));transform:translateX(var(--pfe-theme--ui--border-width--md,2px))}:host([variant=count]) .pfe-progress-steps-item__circle::before{content:attr(count);text-align:center;line-height:calc(32px * .8);line-height:calc(var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) * .8);font-size:.75rem;font-size:var(--pf-global--FontSize--xs,.75rem);font-weight:600;position:absolute;top:-.2em;left:-.2em;width:20px;height:20px}:host([state=active]) .pfe-progress-steps-item__circle{border-color:#06c;border-color:var(--pfe-progress-steps-item__circle--color--active,var(--pfe-theme--color--ui-accent,#06c));background-color:#06c;background-color:var(--pfe-progress-steps-item__circle--color--active,var(--pfe-theme--color--ui-accent,#06c));color:#fff;color:var(--pfe-theme--color--text--on-saturated,#fff)}.pfe-progress-steps-item__circle::after{display:none;position:absolute;content:\"\";border-radius:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#6a6e73;color:var(--pfe-theme--color--text--muted,#6a6e73);top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;width:32px;width:var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px));height:32px;height:var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px))}:host([state=active]) .pfe-progress-steps-item__circle::after{display:block;background-color:#06c;background-color:var(--pfe-progress-steps-item__circle--color--active,var(--pfe-theme--color--ui-accent,#06c));opacity:.09;opacity:var(--pfe-theme--opacity,.09)}.pfe-progress-steps-item__circle svg{z-index:1;height:20px;height:var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px));width:20px;width:var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px));position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);top:50%;left:50%;vertical-align:-.125em}:host([state=done]) .pfe-progress-steps-item__circle svg{fill:#3e8635;fill:var(--pfe-theme--color--feedback--success,#3e8635)}:host([state=error]) .pfe-progress-steps-item__circle svg{fill:#c9190b;fill:var(--pfe-theme--color--feedback--important,#c9190b)}.pfe-progress-steps-item__content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:.5rem;margin-top:var(--pfe-progress-steps-item--spacer,var(--pfe-theme--content-spacer--body--sm,.5rem))}:host([vertical]) .pfe-progress-steps-item__content{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;margin-top:calc((32px - 20px)/ 2);margin-top:calc((var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) - var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px)))/ 2);margin-left:calc(((32px - 20px)/ 2) + .5rem);margin-left:calc(((var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) - var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px)))/ 2) + var(--pfe-progress-steps-item--spacer,var(--pfe-theme--content-spacer--body--sm,.5rem)))}.pfe-progress-steps-item__content--title,.pfe-progress-steps-item__content--title slot::slotted(*){font-size:1rem;font-size:var(--pf-global--FontSize--md,1rem);color:#151515;color:var(--pfe-progress-steps-item__title--Color,var(--pfe-theme--color--text,#151515))}:host([is_link]) .pfe-progress-steps-item__content--title,:host([is_link]) .pfe-progress-steps-item__content--title slot::slotted(*){color:inherit}:host([is_link]:hover) .pfe-progress-steps-item__content--title,:host([is_link]:hover) .pfe-progress-steps-item__content--title slot::slotted(*){color:#004080;color:var(--pfe-progress-steps-item__title--Color,var(--pfe-broadcasted--link--hover,#004080));text-decoration:underline;-webkit-text-decoration:var(--pfe-broadcasted--link-decoration--hover,underline);text-decoration:var(--pfe-broadcasted--link-decoration--hover,underline)}:host([is_link]:focus) .pfe-progress-steps-item__content--title,:host([is_link]:focus) .pfe-progress-steps-item__content--title slot::slotted(*){color:#004080;color:var(--pfe-progress-steps-item__title--Color,var(--pfe-broadcasted--link--focus,#004080));text-decoration:underline;-webkit-text-decoration:var(--pfe-broadcasted--link-decoration--focus,underline);text-decoration:var(--pfe-broadcasted--link-decoration--focus,underline)}:host([is_link]:visited) .pfe-progress-steps-item__content--title,:host([is_link]:visited) .pfe-progress-steps-item__content--title slot::slotted(*){color:#6753ac;color:var(--pfe-progress-steps-item__title--Color,var(--pfe-broadcasted--link--visited,#6753ac));text-decoration:none;-webkit-text-decoration:var(--pfe-broadcasted--link-decoration--visited,none);text-decoration:var(--pfe-broadcasted--link-decoration--visited,none)}:host([state=active]) .pfe-progress-steps-item__content--title,:host([state=active]) .pfe-progress-steps-item__content--title slot::slotted(*){color:#06c;color:var(--pfe-progress-steps-item__title--Color--active,var(--pfe-theme--color--feedback--info,#06c));font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400)}:host([state=error]) .pfe-progress-steps-item__content--title,:host([state=error]) .pfe-progress-steps-item__content--title slot::slotted(*){color:#c9190b;color:var(--pfe-progress-steps-item__title--Color--error,var(--pfe-theme--color--feedback--critical--lighter,#c9190b))}.pfe-progress-steps-item__content--description{color:#6a6e73;color:var(--pfe-progress-steps-item__description--Color,var(--pfe-theme--color--text--muted,#6a6e73));font-size:.875rem;font-size:var(--pf-global--FontSize--sm,.875rem);text-align:center}:host([state=error]) .pfe-progress-steps-item__content--description{color:#c9190b;color:var(--pfe-progress-steps-item__title--Color--error,var(--pfe-theme--color--feedback--critical--lighter,#c9190b))} /*# sourceMappingURL=pfe-progress-steps-item.min.css.map */</style>\n<div class=\"pfe-progress-steps-item__circle\">" + this.icon + "</div>\n" + (this.hasSlot("title") || this.hasSlot("description") ? "\n<div class=\"pfe-progress-steps-item__content\">" + (this.hasSlot("title") ? "\n    <div class=\"pfe-progress-steps-item__content--title\">\n        <slot name=\"title\"></slot>\n    </div>" : "") + (this.hasSlot("description") ? "\n    <div class=\"pfe-progress-steps-item__content--description\">\n        <slot name=\"description\"></slot>\n    </div>" : "") + "\n</div>" : "");
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-progress-steps-item.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-progress-steps-item.scss";
      }
    }, {
      key: "icon",
      get: function get() {
        if (this.state === "done") {
          return "<svg height=\"100%\" width=\"100%\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" role=\"img\" aria-describedby=\"pf-tooltip-183\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z\"></path></svg>";
        }
        if (this.state === "error") {
          return "<svg height=\"100%\" width=\"100%\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" role=\"img\" aria-describedby=\"pf-tooltip-196\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"></path></svg>";
        }
        return "";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.3";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-progress-steps-item";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Progress stepper item",
          description: "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {};
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          state: {
            type: String,
            default: "inactive",
            values: ["inactive", "done", "error"],
            observer: "_build"
          },
          vertical: {
            type: String,
            default: false
          },
          current: {
            type: Boolean,
            default: false,
            observer: "_currentHandler"
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          title: {
            title: "Title",
            type: "array",
            namedSlot: true,
            maxItems: 1,
            items: {
              $ref: "raw"
            }
          },
          description: {
            title: "Description",
            type: "array",
            namedSlot: true,
            items: {
              $ref: "raw"
            }
          }
        };
      }
    }]);

    function PfeProgressStepsItem() {
      classCallCheck(this, PfeProgressStepsItem);

      // programatically generate a link based on slot
      var _this = possibleConstructorReturn(this, (PfeProgressStepsItem.__proto__ || Object.getPrototypeOf(PfeProgressStepsItem)).call(this, PfeProgressStepsItem, {
        type: PfeProgressStepsItem.PfeType
      }));

      _this.isLink = false;
      // programatically skip links based on state
      _this._skipLink = false;

      _this.addEventListener("click", _this._clickHandler.bind(_this));
      _this.addEventListener("keydown", _this._keydownHandler.bind(_this));
      return _this;
    }

    createClass(PfeProgressStepsItem, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeProgressStepsItem.prototype.__proto__ || Object.getPrototypeOf(PfeProgressStepsItem.prototype), "connectedCallback", this).call(this);
        this._build();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("click", this._clickHandler.bind(this));
        this.removeEventListener("keydown", this._keydownHandler.bind(this));
      }
    }, {
      key: "_build",
      value: function _build() {
        if (this.isIE11) return;

        // find out if we should skip the link
        this._skipLink = this.current || this.state === "error";

        // Find out if there are any links
        var link = this.querySelector("a[slot=link]");
        if (link && !this._skipLink) {
          // Let the component know we have a link
          this.isLink = true;
          // store link in a local variable for later use.
          this._link = link;
          var linkText = link.innerText;
          if (linkText) this.setAttribute("aria-label", linkText);
        } else this.isLink = false;

        // Rerender
        this.render();
      }
    }, {
      key: "_currentHandler",
      value: function _currentHandler(oldVal, newVal) {
        if (oldVal === newVal) return;

        if (newVal) this.setAttribute("aria-current", "true");else this.removeAttribute("aria-current");
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        if (this.isLink) this._link.click();
      }

      // Listen for keyboard events and map them to their
      // corresponding mouse events.
      // @TODO This needs AT

    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(event) {
        var key = event.key || event.keyCode;
        switch (key) {
          case "Enter" :
            this._clickHandler(event);
            break;
          case " " :
            // Prevent the browser from scolling when the user hits the space key
            event.stopPropagation();
            event.preventDefault();
            this._clickHandler(event);
            break;
        }
      }
    }, {
      key: "isLink",
      set: function set(state) {
        // Convert to boolean if not already
        state = Boolean(state);

        if (state) {
          this.setAttribute("is_link", "");
          // Set accessibility attrs
          this.setAttribute("tabindex", "0");
          this.setAttribute("role", "link");
        } else {
          this.removeAttribute("is_link");
          // Remove accessibility attrs
          this.removeAttribute("tabindex");
          this.removeAttribute("role");
          this.removeAttribute("aria-label");
        }
      }
    }]);
    return PfeProgressStepsItem;
  }(PFElement);

  PFElement.create(PfeProgressStepsItem);

  /*!
   * PatternFly Elements: PfeProgressSteps 1.9.3
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

  var PfeProgressSteps = function (_PFElement) {
    inherits(PfeProgressSteps, _PFElement);
    createClass(PfeProgressSteps, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:auto;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;position:relative;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{display:none}}:host([vertical]){-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([hidden]){display:none}.pfe-progress-steps__progress-bar{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;top:calc(32px - 20px + 2px);top:calc(var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) - var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px)) + var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px)));left:calc(75px / 2);left:calc(var(--pfe-progress-steps__item--size--first,75px)/ 2);height:2px;height:var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px));width:calc(100% - 75px / 2 - 75px / 2);width:calc(100% - var(--pfe-progress-steps__item--size--first,75px)/ 2 - var(--pfe-progress-steps__item--size--last,75px)/ 2);background-color:#d2d2d2;background-color:var(--pfe-progress-steps__progress-bar--color,var(--pfe-theme--color--ui--border--lighter,#d2d2d2))}:host([vertical]) .pfe-progress-steps__progress-bar{width:2px;width:var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px));top:calc(32px / 2);top:calc(var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px))/ 2);left:calc((20px / 2) + 2px);left:calc((var(--pfe-progress-steps-item__circle--size,var(--pfe-theme--ui--element--size,20px))/ 2) + var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px)));height:calc(100% - 32px - 1em);height:calc(100% - var(--pfe-progress-steps-item__circle--size--active,var(--pfe-theme--ui--element--size--md,32px)) - 1em)}.pfe-progress-steps__progress-bar--fill{display:block;height:2px;height:var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px));background-color:#06c;background-color:var(--pfe-progress-steps__progress-bar--color--active,var(--pfe-theme--color--ui-accent,#06c));width:0}:host([vertical]) .pfe-progress-steps__progress-bar--fill{width:2px;width:var(--pfe-progress-steps__progress-bar--thickness,var(--pfe-theme--ui--border-width--md,2px));height:0} /*# sourceMappingURL=pfe-progress-steps.min.css.map */</style>\n<div class=\"pfe-progress-steps__progress-bar\">\n    <span class=\"pfe-progress-steps__progress-bar--fill\"></span>\n</div>\n<slot></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-progress-steps.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-progress-steps.scss";
      }

      // Declare the type of this component

    }, {
      key: "stepItems",
      get: function get() {
        return [].concat(toConsumableArray(this.querySelectorAll("pfe-progress-steps-item")));
      }
    }, {
      key: "_progressBar",
      get: function get() {
        return this.shadowRoot.querySelector("." + this.tag + "__progress-bar--fill");
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.3";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-progress-steps";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Progress stepper",
          description: "A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form)."
        };
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          vertical: {
            type: Boolean,
            default: false,
            cascade: ["pfe-progress-steps-item"]
          },
          variant: {
            type: String,
            values: ["count"],
            cascade: ["pfe-progress-steps-item"]
          }
        };
      }
    }]);

    function PfeProgressSteps() {
      classCallCheck(this, PfeProgressSteps);
      return possibleConstructorReturn(this, (PfeProgressSteps.__proto__ || Object.getPrototypeOf(PfeProgressSteps)).call(this, PfeProgressSteps, { type: PfeProgressSteps.PfeType }));
    }

    createClass(PfeProgressSteps, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeProgressSteps.prototype.__proto__ || Object.getPrototypeOf(PfeProgressSteps.prototype), "connectedCallback", this).call(this);
        this._build();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
    }, {
      key: "_build",
      value: function _build() {
        var _this2 = this;

        if (this.isIE11) return;

        var items = this.stepItems;

        // find what child item has the active state
        var activeItemIndex = items.findIndex(function (element) {
          return element.current;
        });
        if (activeItemIndex >= 0) {
          // Calculate the size of the progress bar.
          var size = activeItemIndex / (items.length - 1) * 100 + "%";
          var dimension = this.vertical ? "height" : "width";
          this._progressBar.style[dimension] = size;
        }

        var _loop = function _loop(index) {
          var item = items[index];

          // Set the count on the children
          if (_this2.variant === "count") item.setAttribute("count", index + 1);

          if (!_this2.vertical) {
            Promise.all([customElements.whenDefined(item.tagName.toLowerCase())]).then(function () {
              if (index === 0) {
                _this2.style.setProperty("--" + _this2.tag + "__item--size--first", parseInt(item.getBoundingClientRect().width) + "px");
              } else if (index === items.length - 1) {
                _this2.style.setProperty("--" + _this2.tag + "__item--size--last", parseInt(item.getBoundingClientRect().width) + "px");
              }
            });
          }

          // Add spacing to the each of the items except for the top item
          // @todo we have to do it in javascript until everyone supports
          // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-steps-item + pfe-progress-steps-item) { margin-top }
          else {
              // if it's the last item then we'll explicitly set the min-height
              // to 0 so the circle and lines stop at the top of the last item.
              if (index === items.length - 1) item.style.minHeight = "0";
              // if it's not the last item then unset any inline min-height style
              // that was set.
              else item.style.minHeight = "";
            }
        };

        for (var index = 0; index < items.length; index++) {
          _loop(index);
        }
      }
    }]);
    return PfeProgressSteps;
  }(PFElement);

  PFElement.create(PfeProgressSteps);

  return PfeProgressSteps;

})));
//# sourceMappingURL=pfe-progress-steps.umd.js.map
