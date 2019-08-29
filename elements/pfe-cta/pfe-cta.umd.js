(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
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
   * PatternFly Elements: PfeCta 1.0.0-prerelease.23
   * @license
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

  var PfeCta = function (_PFElement) {
    inherits(PfeCta, _PFElement);
    createClass(PfeCta, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-cta--BorderRadius:0;--pfe-cta__arrow--Display:inline;--pfe-cta__arrow--Padding:0 .125rem 0 .375rem;--pfe-cta--BackgroundColor:transparent;--pfe-cta--BackgroundColor--focus:transparent;--pfe-cta--SecondaryBackgroundColor--focus:rgba(21,21,21, .05);--pfe-cta--BorderColor:transparent;--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:pfe-color(ui-link);--pfe-cta--Padding:.6rem 0;--pfe-cta--BackgroundColor--hover:transparent;--pfe-cta--BorderColor--hover:transparent;--pfe-cta--Color--hover:pfe-color(ui-link--hover);--pfe-cta--BorderColor--focus:transparent;--pfe-cta__inner--BorderColor--focus:transparent;--pfe-cta--Color--focus:pfe-color(ui-link--focus);display:inline-block;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:16px;font-size:var(--pfe-theme--font-size,16px);font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);background-color:var(--pfe-cta--BackgroundColor);border-color:var(--pfe-cta--BorderColor);position:relative;-webkit-transition:.3s ease padding;transition:.3s ease padding;line-height:inherit;vertical-align:middle;background-color:var(--pfe-cta--BackgroundColor);border-radius:var(--pfe-cta--BorderRadius);border:1px solid var(--pfe-cta--BorderColor);border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-cta--BorderColor)}:host .pfe-cta--arrow{display:var(--pfe-cta__arrow--arrow--Display);padding:var(--pfe-cta__arrow--Padding);fill:var(--pfe-cta--Color);position:relative;top:.1rem;width:13px;height:13px;-webkit-transition:.3s ease padding;transition:.3s ease padding}:host(::after){margin-left:calc(1rem * .25);margin-left:calc(var(--pfe-theme--content-spacer,1rem) * .25)}:host(:hover){--pfe-cta__arrow--Padding:0 0 0 .5rem;background-color:var(--pfe-cta--BackgroundColor--hover);border-color:var(--pfe-cta--BorderColor--hover);cursor:pointer}:host(:hover) ::slotted(*){color:var(--pfe-cta--Color--hover)!important}:host(:hover) ::slotted(*)::before{border:1px solid var(--pfe-cta__inner--BorderColor--hover)}:host(:hover) .pfe-cta--arrow{fill:var(--pfe-cta--Color--hover)}:host(.focus-within){outline:0!important;background-color:var(--pfe-cta--BackgroundColor--focus);border-color:var(--pfe-cta--BorderColor--focus)}:host(.focus-within) ::slotted(*){color:var(--pfe-cta--Color--focus)!important}:host(.focus-within) .pfe-cta--arrow{fill:var(--pfe-cta--Color--focus)}:host([pfe-priority]){padding:var(--pfe-cta--Padding);--pfe-cta--Padding:var(--pfe-theme--container-padding, 1rem) calc(var(--pfe-theme--container-padding, 1rem) * 2)}:host([pfe-priority]) .pfe-cta--wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}::slotted(*){display:inline;color:#036!important;color:var(--pfe-cta--Color,#036)!important;text-decoration:none}::slotted(*)::before{content:\"\";display:block;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid var(--pfe-cta__inner--BorderColor);outline:0;position:absolute;top:2px;left:2px;bottom:2px;right:2px;border-radius:2px}::slotted(:hover){color:var(--pfe-cta--Color--hover)!important}::slotted(:focus){outline:0!important;color:var(--pfe-cta--Color--focus)!important}::slotted(:focus)::before{border:1px solid var(--pfe-cta__inner--BorderColor--focus)}::slotted(:focus) .pfe-cta--arrow{fill:var(--pfe-cta--Color--focus)}:host(:not([pfe-priority])){--pfe-cta--Color:var(--pfe-broadcasted--color--ui-link, var(--pfe-theme--color--ui-link, #06c));--pfe-cta--inner--BorderColor--hover:var(--pfe-broadcasted--color--ui-link--hover, var(--pfe-theme--color--ui-link--hover, #003366));--pfe-cta--Color--hover:var(--pfe-broadcasted--color--ui-link--hover, var(--pfe-theme--color--ui-link--hover, #003366));--pfe-cta--BackgroundColor--focus:rgba(40, 151, 240, 0.2);--pfe-cta--Color--focus:var(--pfe-broadcasted--color--ui-link--focus, var(--pfe-theme--color--ui-link--focus, #003366))}:host([pfe-priority=secondary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-broadcasted--color--text, var(--pfe-theme--color--ui-complement, #464646));--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-broadcasted--color--text, var(--pfe-theme--color--ui-complement, #464646));--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--hover:var(--pfe-broadcasted--color--text, var(--pfe-theme--color--ui-complement, #464646));--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor--focus:var(--pfe-broadcasted--color--text, var(--pfe-theme--color--ui-complement, #464646));--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement, #464646)}:host([pfe-priority=primary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent--hover, #a42701);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent--hover, #a42701);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent--text, #fff)}:host([pfe-priority=primary][pfe-color=lightest]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--Color--hover:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #131313);--pfe-cta--Color--focus:var(--pfe-theme--color--surface--lightest--text, #333)}:host(:not([pfe-priority])[pfe-color=accent]){--pfe-cta--Color:var(--pfe-theme--color--ui-accent, #fe460d)}:host([pfe-priority=secondary][pfe-color=accent]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent, #fe460d);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent, #fe460d)}:host([pfe-priority=secondary][pfe-color=lightest]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--Color--hover:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #131313);--pfe-cta--Color--focus:var(--pfe-theme--color--surface--lightest--text, #333)}:host([pfe-priority=secondary][pfe-color=accent].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent, #fe460d)}:host([pfe-priority=primary][pfe-color=base]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base--hover, #022f40);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base--hover, #022f40);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--darker, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base--text, #fff)}:host([pfe-priority=secondary][pfe-color=base]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:rgba(40, 151, 240, 0.2);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base, #0477a4)}:host([pfe-priority=secondary][pfe-color=base].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base, #0477a4)}:host(:not([pfe-priority])[pfe-color=complement]){--pfe-cta--Color:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--hover, #131313)}:host([pfe-priority=primary][pfe-color=complement]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement--hover, #131313);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-complement--hover, #131313);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--darker, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement--text, #fff)}:host([pfe-priority=secondary][pfe-color=complement]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor:transparent;--pfe-cta--Color:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement, #464646)}:host([pfe-priority=secondary][pfe-color=complement].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement, #464646)}</style><span class=\"pfe-cta--wrapper\">\n    <slot></slot>\n    " + (this.defaultStyle ? "<svg class=\"pfe-cta--arrow\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 31.56 31.56\"><path d=\"M15.78 0l-3.1 3.1 10.5 10.49H0v4.38h23.18l-10.5 10.49 3.1 3.1 15.78-15.78L15.78 0z\"/></svg>" : "") + "\n</span>";
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
      key: "defaultStyle",
      get: function get$$1() {
        return this.hasAttribute("pfe-priority") ? false : true;
      }

      // Declare the type of this component

    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.23";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "priority": { "title": "Priority", "type": "string", "enum": ["default", "primary", "secondary"], "observer": "_basicAttributeChanged" }, "color": { "title": "Color", "type": "string", "enum": ["accent", "base", "complement", "lightest"], "observer": "_basicAttributeChanged" } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "link": { "title": "Link", "type": "array", "maxItems": 1, "namedSlot": false, "items": { "oneOf": [{ "$ref": "a" }, { "$ref": "input" }, { "$ref": "button" }] } } };
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
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-priority", "pfe-color"];
      }
    }]);

    function PfeCta() {
      classCallCheck(this, PfeCta);

      var _this = possibleConstructorReturn(this, (PfeCta.__proto__ || Object.getPrototypeOf(PfeCta)).call(this, PfeCta));

      _this.cta = null;

      _this._init = _this._init.bind(_this);
      _this._focusHandler = _this._focusHandler.bind(_this);
      _this._blurHandler = _this._blurHandler.bind(_this);
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
        // Get the first child of the web component (light DOM)
        var firstChild = this.children[0];
        var supportedTags = ["a", "button", "input"];
        var supportedTag = false;

        // If the first child does not exist or that child is not a supported tag
        if (firstChild) {
          supportedTags.forEach(function (tag) {
            if (firstChild.tagName.toLowerCase() === tag) {
              supportedTag = true;
            }
          });
        }

        if (!firstChild || !supportedTag) {
          console.warn(PfeCta.tag + ":The first child in the light DOM must be a supported call-to-action tag (<a>, <button>, <input>)");
        } else {
          // Capture the first child as the CTA element
          this.cta = firstChild;

          // Watch the light DOM link for focus and blur events
          this.cta.addEventListener("focus", this._focusHandler);
          this.cta.addEventListener("blur", this._blurHandler);
        }
      }

      // On focus, add a class

    }, {
      key: "_focusHandler",
      value: function _focusHandler(event) {
        this.classList.add("focus-within");
      }

      // On focus out, remove that class

    }, {
      key: "_blurHandler",
      value: function _blurHandler(event) {
        this.classList.remove("focus-within");
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
