(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeClipboard = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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
   * PatternFly Elements: PfeClipboard 1.8.0
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

  var PfeClipboard = function (_PFElement) {
    inherits(PfeClipboard, _PFElement);
    createClass(PfeClipboard, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;max-width:-webkit-fit-content;max-width:-moz-fit-content;max-width:fit-content;color:#06c!important;color:var(--pfe-clipboard--Color,var(--pfe-broadcasted--link,#06c))!important;cursor:pointer;padding:6px 16px;padding:var(--pfe-clipboard--Padding,6px 16px);font-weight:300;font-weight:var(--pfe-clipboard--FontWeight,var(--pfe-theme--font-weight--light,300));font-size:1rem;font-size:var(--pfe-clipboard--FontSize,var(--pf-global--FontSize--md,1rem))}:host([hidden]){display:none}.pfe-clipboard__icon{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:1em;width:var(--pfe-clipboard--icon--Width,var(--pfe-theme--icon-size,1em));height:auto;height:var(--pfe-clipboard--icon--Height,auto);margin:0 .4825rem 0 0;margin:var(--pfe-clipboard--icon--Margin,0 .4825rem 0 0);--pfe-icon--Color:var(--pfe-clipboard--icon--Color, var(--pfe-theme--color--text--muted, #6a6e73))}.pfe-clipboard__icon svg{fill:#6a6e73!important;fill:var(--pfe-clipboard--icon--Color,var(--pfe-theme--color--text--muted,#6a6e73))!important}.pfe-clipboard__text{color:#06c!important;color:var(--pfe-clipboard--Color,var(--pfe-broadcasted--link,#06c))!important}.pfe-clipboard__text--success{color:#3e8635!important;color:var(--pfe-clipboard--text--success--Color,var(--pfe-theme--color--feedback--success,#3e8635))!important}.pfe-clipboard[copied] .pfe-clipboard__text,:host([copied]) .pfe-clipboard__text{display:none!important}.pfe-clipboard:not([copied]) .pfe-clipboard__text--success,:host(:not([copied])) .pfe-clipboard__text--success{display:none!important}.pfe-clipboard__icon>*,::slotted([slot=icon]){width:100%}:host(:not([aria-disabled=true]).focus-within),:host(:not([aria-disabled=true]):focus){--pfe-clipboard--Color:var(--pfe-clipboard--Color--focus, var(--pfe-broadcasted--link--focus, #004080))}:host(:not([aria-disabled=true])) ::slotted(:hover),:host(:not([aria-disabled=true]):hover){--pfe-clipboard--Color:var(--pfe-clipboard--Color--hover, var(--pfe-broadcasted--link--hover, #004080))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{display:inline-block}.pfe-clipboard__icon{display:inline-block;margin-right:0}.pfe-clipboard__text{display:inline-block}.pfe-clipboard__text--success{display:inline-block}} /*# sourceMappingURL=pfe-clipboard.min.css.map */</style>\n" + (!this.noIcon ? "\n    <div class=\"pfe-clipboard__icon\">\n        <slot name=\"icon\" id=\"icon\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 15.277 16\"><g transform=\"translate(-2.077 -1.807)\"><path class=\"a\" d=\"M15.34,2.879a3.86,3.86,0,0,0-5.339,0L6.347,6.545a3.769,3.769,0,0,0,0,5.339.81.81,0,0,0,1.132,0,.823.823,0,0,0,0-1.145A2.144,2.144,0,0,1,7.5,7.677l3.641-3.654a2.161,2.161,0,1,1,3.049,3.062l-.8.8a.811.811,0,1,0,1.145,1.132l.8-.8a3.769,3.769,0,0,0,0-5.339Z\" transform=\"translate(0.906 0)\"/><path class=\"a\" d=\"M10.482,6.822a.823.823,0,0,0,0,1.145,2.161,2.161,0,0,1,0,3.049L7.343,14.155a2.161,2.161,0,0,1-3.062,0,2.187,2.187,0,0,1,0-3.062l.193-.116a.823.823,0,0,0,0-1.145.811.811,0,0,0-1.132,0l-.193.193a3.86,3.86,0,0,0,0,5.339,3.86,3.86,0,0,0,5.339,0l3.126-3.139A3.731,3.731,0,0,0,12.72,9.562a3.769,3.769,0,0,0-1.094-2.74A.823.823,0,0,0,10.482,6.822Z\" transform=\"translate(0 1.37)\"/></g></svg>\n        </slot>\n    </div>\n" : "") + "\n<div class=\"pfe-clipboard__text\">\n    <slot name=\"text\" id=\"text\">Copy URL</slot>\n</div>\n<div class=\"pfe-clipboard__text--success\" role=\"alert\">\n    <slot name=\"text--success\" id=\"text--success\">Copied</slot>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-clipboard.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-clipboard.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.8.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-clipboard";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Clipboard",
          description: "Copy current URL to clipboard."
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {
          copied: this.tag + ":copied"
        };
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
          noIcon: {
            title: "No icon",
            type: Boolean,
            observer: "_noIconChanged"
          },
          copiedDuration: {
            title: "Success message duration (in seconds)",
            type: Number,
            default: 3
          },
          role: {
            type: String,
            default: "button"
          },
          tabindex: {
            type: Number,
            default: 0
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          icon: {
            title: "Icon",
            description: "This field can accept an SVG, pfe-icon component, or other format for displaying an icon.",
            slotName: "icon",
            slotClass: "pfe-clipboard__icon",
            slotId: "icon"
          },
          text: {
            title: "Default text",
            slotName: "text",
            slotClass: "pfe-clipboard__text",
            slotId: "text"
          },
          textSuccess: {
            title: "Success message",
            description: "Shown when the URL is successfully copied to the clipboard.",
            slotName: "text--success",
            slotClass: "pfe-clipboard__text--success",
            slotId: "text--success"
          }
        };
      }
    }]);

    function PfeClipboard() {
      classCallCheck(this, PfeClipboard);
      return possibleConstructorReturn(this, (PfeClipboard.__proto__ || Object.getPrototypeOf(PfeClipboard)).call(this, PfeClipboard, { type: PfeClipboard.PfeType }));
    }

    createClass(PfeClipboard, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeClipboard.prototype.__proto__ || Object.getPrototypeOf(PfeClipboard.prototype), "connectedCallback", this).call(this);

        // Since this element as the role of button we are going to listen
        // for click and as well as 'enter' and 'space' commands to trigger
        // the copy functionality
        this.addEventListener("click", this._clickHandler.bind(this));
        this.addEventListener("keydown", this._keydownHandler.bind(this));
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("click", this._clickHandler.bind(this));
        this.removeEventListener("keydown", this._keydownHandler.bind(this));
        this.shadowRoot.removeEventListener("slotchange", this._slotchangeHandler.bind(this));
        get(PfeClipboard.prototype.__proto__ || Object.getPrototypeOf(PfeClipboard.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      key: "_noIconChanged",
      value: function _noIconChanged(previousValue) {
        // dirty check to see if we should rerender the template
        if (this._rendered && this.noIcon !== previousValue) {
          this.render();
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        var _this2 = this;

        // Execute the copy to clipboard functionality
        this.copyURLToClipboard().then(function (url) {
          // Emit event that lets others know the user has "copied"
          // the url. We are also going to include the url that was
          // copied.
          _this2.emitEvent(PfeClipboard.events.copied, {
            detail: {
              url: url
            }
          });
          // Toggle the copied state. Use the this._formattedCopiedTimeout function
          // to an appropraite setTimout length.
          _this2.setAttribute("copied", "");
          setTimeout(function () {
            _this2.removeAttribute("copied");
          }, _this2._formattedCopiedTimeout());
        }).catch(function (error) {
          _this2.warn(error);
        });
      }

      // Formatted copied timeout value. Use the formattedCopiedTimeout function
      // to get a type safe, millisecond value of the timeout duration.

    }, {
      key: "_formattedCopiedTimeout",
      value: function _formattedCopiedTimeout() {
        var copiedDuration = Number(this.copiedDuration * 1000);
        if (!(copiedDuration > -1)) {
          this.warn("copied-duration must be a valid number. Defaulting to 3 seconds.");
          // default to 3 seconds
          return 3000;
        } else {
          return copiedDuration;
        }
      }

      // Listen for keyboard events and map them to their
      // corresponding mouse events.

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

      /**
       * Copy url to the user's system clipboard
       *
       * If available, it will use the new Navigator API to access the system clipboard
       * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard
       *
       * If unavailable, it will use the legacy execCommand("copy")
       * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
       * @async
       * @return {Promise<string>} url
       */

    }, {
      key: "copyURLToClipboard",
      value: function copyURLToClipboard() {
        return new Promise(function (resolve, reject) {
          var url = window.location.href;
          // If the Clipboard API is available then use that
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(resolve(url));
          }
          // If execCommand("copy") exists then use that method
          else if (document.queryCommandEnabled("copy")) {
              var dummy = document.createElement("input");
              document.body.appendChild(dummy);
              dummy.value = url;
              dummy.select();
              document.execCommand("copy");
              document.body.removeChild(dummy);
              resolve(url);
            } else {
              reject(new Error("Your browser does not support copying to the clipboard."));
            }
        });
      }
    }]);
    return PfeClipboard;
  }(PFElement);

  PFElement.create(PfeClipboard);

  return PfeClipboard;

})));
//# sourceMappingURL=pfe-clipboard.umd.js.map
