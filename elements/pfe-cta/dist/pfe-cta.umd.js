(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeCta = factory(global.PFElement));
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

  /*!
   * PatternFly Elements: PfeCta 1.0.0-prerelease.55
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

  var PfeCta = function (_PFElement) {
    inherits(PfeCta, _PFElement);
    createClass(PfeCta, [{
      key: "click",
      value: function click(event) {
        this.emitEvent(PfeCta.events.select, {
          detail: Object.assign(this.data, {
            originEvent: event
          })
        });
      }
    }, {
      key: "html",
      get: function get$$1() {
        return "<style>.pfe-cta--wrapper button,.pfe-cta--wrapper input,::slotted(button),::slotted(input){background-color:transparent;border:none;margin:0;padding:0;text-align:left}:host{display:inline-block;position:relative;z-index:0;vertical-align:middle;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content;max-width:var(--pfe-cta--MaxWidth,-webkit-max-content);max-width:var(--pfe-cta--MaxWidth,-moz-max-content);max-width:var(--pfe-cta--MaxWidth,max-content);background-color:transparent;background-color:var(--pfe-cta--BackgroundColor,transparent);border-radius:0;border-radius:var(--pfe-cta--BorderRadius,0);border:1px solid transparent;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-cta--BorderColor,transparent);cursor:pointer}::slotted(*){white-space:normal;display:inline;padding:.6rem 0!important;padding:var(--pfe-cta--Padding,.6rem 0)!important;color:#06c!important;color:var(--pfe-cta--Color,var(--pfe-broadcasted--link,#06c))!important;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-cta--FontFamily, var(--pfe-theme--font-family--heading, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif));font-size:16px;font-size:var(--pfe-cta--FontSize,var(--pfe-theme--font-size,16px));font-weight:700;font-weight:var(--pfe-cta--FontWeight,var(--pfe-theme--font-weight--bold,700));line-height:1.5;line-height:var(--pfe-cta--LineHeight,var(--pfe-theme--line-height,1.5));text-decoration:none!important;-webkit-text-decoration:var(--pfe-cta--TextDecoration,none)!important;text-decoration:var(--pfe-cta--TextDecoration,none)!important}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){::slotted(*){padding:0!important}}@supports (-ms-ime-align:auto){::slotted(*){padding:0!important}}:host([pfe-priority]) ::slotted(*){text-align:center;font-size:calc(16px/1.125);font-size:var(--pfe-cta--FontSize--priority,calc(var(--pfe-cta--FontSize,var(--pfe-theme--font-size,16px))/ 1.125))}:host([aria-disabled=true]) ::slotted(*){cursor:default!important}:host(:not([aria-disabled=true])) ::slotted(:focus),:host(:not([aria-disabled=true]).focus-within),:host(:not([aria-disabled=true]).focus-within) ::slotted(*),:host(:not([aria-disabled=true]):focus){outline:0!important}.pfe-cta--wrapper{display:block;white-space:nowrap;min-width:100%}:host([aria-disabled=true]) .pfe-cta--wrapper,:host([pfe-priority]) .pfe-cta--wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:100%}@media all and (min--moz-device-pixel-ratio:0){:host(:not([pfe-priority]):not([aria-disabled=true])) .pfe-cta--wrapper{max-width:calc(100% - 1ch - 13px);max-width:calc(100% - 1ch - var(--pfe-cta__arrow--size,13px))}}.pfe-cta--inner{display:block;height:calc(100% - 4px);width:calc(100% - 4px);-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;top:2px;left:2px;z-index:-1;border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-cta__inner--BorderColor,transparent);border-radius:2px;outline:0}.pfe-cta--arrow{display:inline;display:var(--pfe-cta__arrow--Display,inline);padding:0 3px;padding:var(--pfe-cta__arrow--Padding,0 3px);fill:#06c;fill:var(--pfe-cta--Color,var(--pfe-broadcasted--link,#06c));width:13px;width:var(--pfe-cta__arrow--size,13px);height:13px;height:var(--pfe-cta__arrow--size,13px);-webkit-transition:padding .3s cubic-bezier(.465,.183,.153,.946);transition:padding .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));margin-bottom:-1px}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-cta--arrow{width:18px}}@supports (-ms-ime-align:auto){.pfe-cta--arrow{width:18px}}:host([pfe-priority]) svg{display:none}:host([aria-disabled=true]),:host([pfe-priority]){--pfe-cta--Padding:var(--pfe-theme--container-padding, 16px) calc(var(--pfe-theme--container-padding, 16px) * 2)}:host([pfe-priority=primary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--Color:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent--hover, #004080);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent--hover, #004080);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta__arrow--Display:none;--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent--text, #fff)}:host([pfe-priority=secondary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-broadcasted--text, #3c3f42);--pfe-cta--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-cta--BackgroundColor--hover:var(--pfe-broadcasted--text, #3c3f42);--pfe-cta--BorderColor--hover:var(--pfe-broadcasted--text, #3c3f42);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta__arrow--Display:none;--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base, #6a6e73)}:host([pfe-priority=primary][on=dark]),:host([pfe-priority=primary][on=saturated]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color:var(--pfe-theme--color--text, #151515);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--Color--hover:var(--pfe-theme--color--text, #151515);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color--focus:var(--pfe-theme--color--text, #151515);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #151515)}:host([pfe-priority=secondary][on=dark]),:host([pfe-priority=secondary][on=saturated]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--Color--hover:var(--pfe-theme--color--text, #151515);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color--focus:var(--pfe-theme--color--text, #151515);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #151515)}:host([pfe-priority=secondary][pfe-color=accent]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--Color:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent, #06c);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent, #06c)}:host([pfe-priority=primary][pfe-color=base]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--Color:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base--hover, #151515);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base--hover, #151515);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--darker, #3c3f42);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base--text, #fff)}:host([pfe-priority=secondary][pfe-color=base]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--Color:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base--hover, #151515);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base--hover, #151515);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:rgba(40, 151, 240, 0.2);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base, #6a6e73);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base, #6a6e73)}:host([pfe-priority=secondary][pfe-variant=wind]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta--Color:var(--pfe-broadcasted--link, #06c);--pfe-cta--FontWeight:var(--pfe-theme--font-weight--normal, 500);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--border--lightest, #f5f5f5);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta--Color--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-cta--TextDecoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-cta--Color--focus:var(--pfe-theme--color--link--hover, #004080);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta__inner--BorderColor--focus:var(--pfe-cta--BorderColor--focus, transparent)}:host([aria-disabled=true]){--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-cta--Color:var(--pfe-theme--color--ui-disabled--text, #6a6e73)}:host(:not([aria-disabled=true]).focus-within),:host(:not([aria-disabled=true]):focus){--pfe-cta--BackgroundColor:var(--pfe-cta--BackgroundColor--focus, rgba(40, 151, 240, 0.2));--pfe-cta--BorderColor:var(--pfe-cta--BorderColor--focus, transparent);--pfe-cta--Color:var(--pfe-cta--Color--focus, var(--pfe-broadcasted--link--focus, #004080));--pfe-cta--TextDecoration:var(--pfe-cta--TextDecoration--focus, none);--pfe-cta__inner--BorderColor:var(--pfe-cta__inner--BorderColor--focus, transparent)}:host(:not([aria-disabled=true])) ::slotted(:hover),:host(:not([aria-disabled=true]):hover){--pfe-cta--BackgroundColor:var(--pfe-cta--BackgroundColor--hover, transparent);--pfe-cta--BorderColor:var(--pfe-cta--BorderColor--hover, transparent);--pfe-cta--Color:var(--pfe-cta--Color--hover, var(--pfe-broadcasted--link--hover, #004080));--pfe-cta--TextDecoration:var(--pfe-cta--TextDecoration--hover, none);--pfe-cta__inner--BorderColor:var(--pfe-cta__inner--BorderColor--hover, transparent);--pfe-cta__arrow--Padding:0 0 0 6px}\n/*# sourceMappingURL=pfe-cta.min.css.map */\n</style><span class=\"pfe-cta--wrapper\">\n  <slot></slot>" + (this.isDefault ? "&#160;<svg class=\"pfe-cta--arrow\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 31.56 31.56\" focusable=\"false\"><path d=\"M15.78 0l-3.1 3.1 10.5 10.49H0v4.38h23.18l-10.5 10.49 3.1 3.1 15.78-15.78L15.78 0z\"/></svg>" : "") + "\n  <span class=\"pfe-cta--inner\"></span>\n</span>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-cta.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-cta.html";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-cta.json";
      }
    }, {
      key: "isDefault",
      get: function get$$1() {
        return this.hasAttribute("pfe-priority") ? false : true;
      }

      // Declare the type of this component

    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "priority": { "title": "Priority", "type": "string", "prefixed": true, "enum": ["primary", "secondary"], "observer": "_basicAttributeChanged" }, "color": { "title": "Color", "type": "string", "prefixed": true, "enum": ["accent", "base", "complement", "lightest"], "observer": "_basicAttributeChanged" }, "variant": { "title": "Style variant", "type": "string", "prefixed": true, "enum": ["wind"], "observer": "_basicAttributeChanged" } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "link": { "title": "Link", "type": "array", "maxItems": 1, "namedSlot": false, "items": { "oneOf": [{ "$ref": "a" }, { "$ref": "button" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-cta";
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          select: this.tag + ":select"
        };
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-priority", "pfe-color", "pfe-variant"];
      }
    }]);

    function PfeCta() {
      classCallCheck(this, PfeCta);

      var _this = possibleConstructorReturn(this, (PfeCta.__proto__ || Object.getPrototypeOf(PfeCta)).call(this, PfeCta));

      _this.cta = null;

      _this._init = _this._init.bind(_this);
      _this._focusHandler = _this._focusHandler.bind(_this);
      _this._blurHandler = _this._blurHandler.bind(_this);
      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._keyupHandler = _this._keyupHandler.bind(_this);
      return _this;
    }

    createClass(PfeCta, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeCta.prototype.__proto__ || Object.getPrototypeOf(PfeCta.prototype), "connectedCallback", this).call(this);

        // Get the slot
        this._slot = this.shadowRoot.querySelector("slot");

        // Attach the slotchange listener
        this._slot.addEventListener("slotchange", this._init);

        if (this.children.length) {
          this._init();
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        // Remove the slot change listeners
        this._slot.removeEventListener("slotchange", this._init);

        // Remove the focus state listeners
        if (this.cta) {
          this.cta.removeEventListener("focus", this._focusHandler);
          this.cta.removeEventListener("blur", this._blurHandler);
          this.cta.removeEventListener("click", this._clickHandler);
          this.cta.removeEventListener("keyup", this._keyupHandler);
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeCta.prototype.__proto__ || Object.getPrototypeOf(PfeCta.prototype), "attributeChangedCallback", this).call(this, attr, oldValue, newValue);
        // Strip the prefix form the attribute
        attr = attr.replace("pfe-", "");
        // If the observer is defined in the attribute properties
        if (this[attr] && this[attr].observer) {
          // Get the observer function
          var observer = this[this[attr].observer].bind(this);
          // If it's a function, allow it to run
          if (typeof observer === "function") observer(attr, oldValue, newValue);
        }
      }

      // Initialize the component

    }, {
      key: "_init",
      value: function _init() {
        var _this2 = this;

        var supportedTags = ["a", "button"]; // add input later
        var supportedTag = false;

        // If the first child does not exist or that child is not a supported tag
        if (this.firstElementChild) {
          supportedTags.forEach(function (tag) {
            if (_this2.firstElementChild.tagName.toLowerCase() === tag) {
              supportedTag = true;
            }
          });
        }

        if (!this.firstElementChild || !supportedTag) {
          console.warn(PfeCta.tag + ": The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)");
        } else if (this.firstElementChild.tagName.toLowerCase() === "button" && this.props.priority.value === null && this.getAttribute("aria-disabled") !== "true") {
          console.warn(PfeCta.tag + ": Button tag is not supported semantically by the default link styles");
        } else {
          // Capture the first child as the CTA element
          this.cta = this.firstElementChild;

          this.data = {
            href: this.cta.href,
            text: this.cta.text,
            title: this.cta.title,
            color: this.props.color.value
          };

          // Set the value for the priority property
          this.props.priority.value = this.isDefault ? "default" : this.getAttribute("pfe-priority");

          // Add the priority value to the data set for the event
          this.data.type = this.props.priority.value;

          // Append the variant to the data type
          if (this.props.variant.value) {
            this.data.type = this.data.type + " " + this.props.variant.value;
          }

          // Override type if set to disabled
          if (this.getAttribute("aria-disabled")) {
            this.data.type = "disabled";
          }

          // Watch the light DOM link for focus and blur events
          this.cta.addEventListener("focus", this._focusHandler);
          this.cta.addEventListener("blur", this._blurHandler);

          // Attach the click listener
          this.cta.addEventListener("click", this._clickHandler);
          this.cta.addEventListener("keyup", this._keyupHandler);
        }
      }

      // On focus, add a focus class

    }, {
      key: "_focusHandler",
      value: function _focusHandler(event) {
        this.classList.add("focus-within");
      }

      // On focus out, remove the focus class

    }, {
      key: "_blurHandler",
      value: function _blurHandler(event) {
        this.classList.remove("focus-within");
      }

      // On enter press, trigger click event

    }, {
      key: "_keyupHandler",
      value: function _keyupHandler(event) {
        var key = event.key || event.keyCode;
        switch (key) {
          case "Enter":
          case 13:
            this.click(event);
        }
      }

      // On click, trigger click event

    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        this.click(event);
      }
    }, {
      key: "_basicAttributeChanged",
      value: function _basicAttributeChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
      }
    }]);
    return PfeCta;
  }(PFElement);

  PFElement.create(PfeCta);

  return PfeCta;

})));
//# sourceMappingURL=pfe-cta.umd.js.map
