(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeBand = factory(global.PFElement));
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
   * PatternFly Elements: PfeBand 1.0.0-prerelease.28
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

  // -- Polyfill for supporting Element.closest
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

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

  // -- Polyfill for supporting Array.includes
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
      value: function value(valueToFind, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        // 1. Let O be ? ToObject(this value).
        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(valueToFind, elementK) is true, return true.
          if (sameValueZero(o[k], valueToFind)) {
            return true;
          }
          // c. Increase k by 1.
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

  var PfeBand = function (_PFElement) {
    inherits(PfeBand, _PFElement);
    createClass(PfeBand, [{
      key: "html",
      get: function get$$1() {
        var _this2 = this;

        return "<style>.pfe-band__aside,.pfe-band__body,.pfe-band__container,.pfe-band__footer,.pfe-band__header,:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.pfe-band__aside,.pfe-band__body,.pfe-band__container,.pfe-band__footer,.pfe-band__header{display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0}:host{display:block;--pfe-band--Padding--vertical:calc( var(--pfe-theme--container-spacer, 16px) * 4);--pfe-band--Padding--horizontal:calc( var(--pfe-theme--container-spacer, 16px) * 1);--pfe-band--Padding:var(--pfe-band--Padding--vertical) var(--pfe-band--Padding--horizontal);--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-band--BackgroundPosition:center center;--pfe-band--Border:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-band--layout:1fr;--pfe-band__header--layout:1fr;--pfe-band__body--layout:1fr;--pfe-band__footer--layout:1fr;--pfe-band__aside--layout:1fr;--pfe-band--gutter--vertical:var(--pfe-theme--container-spacer, 16px);--pfe-band--gutter--horizontal:calc(var(--pfe-theme--container-spacer, 16px) * 3);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--base--link, #00538c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--base--link--visited, #7551a6);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--base--link--hover, #00305b);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--base--link--focus, #00305b);--pfe-band--Width:auto;--pfe-band--Width__aside--sm:240px;--pfe-band--Width__aside--lg:300px;position:relative;padding:calc(var(--pfe-band--Padding--vertical)/ 2) var(--pfe-band--Padding--horizontal);border:var(--pfe-band--Border);background-color:var(--pfe-band--BackgroundColor);background-position:var(--pfe-band--BackgroundPosition);color:var(--pfe-broadcasted--color--text)}@media screen and (min-width:768px){:host{--pfe-band--Width:calc( 768px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media screen and (min-width:992px){:host{--pfe-band--Width:calc( 992px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media screen and (min-width:1200px){:host{--pfe-band--Width:calc( 1200px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media print{:host{--pfe-band--Padding:calc(var(--pfe-band--Padding--vertical) / 2) var(--pfe-band--Padding--horizontal)}}@media (min-width:576px){:host{padding:var(--pfe-band--Padding)}}@media print{:host{background-color:#fff!important;background-image:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host([pfe-color=darker]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darker--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darker--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darker--link--focus, #cce6ff)}:host([pfe-color=darkest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darkest--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff)}:host([pfe-color=accent]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--accent--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--accent--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--accent--link--focus, #cce6ff)}:host([pfe-color=complement]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--complement, #0477a4);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--complement--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--complement--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--complement--link--focus, #cce6ff)}:host([pfe-color=lighter]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lighter--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lighter--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lighter--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lighter--link--focus, #003366)}:host([pfe-color=lightest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lightest--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lightest--link--focus, #003366)}:host([pfe-size=small]){--pfe-band--Padding:calc(var(--pfe-band--Padding--vertical) / 4) var(--pfe-band--Padding--horizontal)}.pfe-band__container{--pfe-band_region--width:calc(calc(1fr - var(--pfe-band--Width__aside--sm)) - var(--pfe-band--gutter--horizontal));--pfe-band--gridTemplateArea_mobile:\"body\";position:relative;margin:0 auto;width:100%;max-width:var(--pfe-band--Width)}.pfe-band__container[pfe-has-aside]{--pfe-band--gridTemplateArea_mobile:\"body\" \"aside\";--pfe-band--gridTemplateArea_desktop:\"body aside\"}@media (min-width:768px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--sm)}}@media (min-width:992px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--lg)}}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]{--pfe-band--gridTemplateArea_mobile:\"aside\" \"body\"}.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{--pfe-band--gridTemplateArea_desktop:\"aside body\"}@media (min-width:768px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{--pfe-band--layout:var(--pfe-band--Width__aside--sm) 1fr}}@media (min-width:992px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{--pfe-band--layout:var(--pfe-band--Width__aside--lg) 1fr}}.pfe-band__container[pfe-has-header]{--pfe-band--gridTemplateArea_mobile:\"header\" \"body\"}.pfe-band__container[pfe-has-header][pfe-has-aside]{--pfe-band--gridTemplateArea_mobile:\"header\" \"body\" \"aside\";--pfe-band--gridTemplateArea_desktop:\"header header\" \"body aside\"}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]{--pfe-band--gridTemplateArea_mobile:\"aside\" \"header\" \"body\"}.pfe-band__container[pfe-has-header][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"header aside\" \"body aside\"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]{--pfe-band--gridTemplateArea_desktop:\"header header\" \"aside body\"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"aside header\" \"aside body\"}.pfe-band__container[pfe-has-footer]{--pfe-band--gridTemplateArea_mobile:\"body\" \"footer\"}.pfe-band__container[pfe-has-footer][pfe-has-aside]{--pfe-band--gridTemplateArea_mobile:\"body\" \"aside\" \"footer\";--pfe-band--gridTemplateArea_desktop:\"body aside\" \"footer footer\"}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]{--pfe-band--gridTemplateArea_mobile:\"aside\" \"body\" \"footer\"}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"body aside\" \"footer aside\"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]{--pfe-band--gridTemplateArea_desktop:\"aside body\" \"footer footer\"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"aside body\" \"aside footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer]{--pfe-band--gridTemplateArea_mobile:\"header\" \"body\" \"footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]{--pfe-band--gridTemplateArea_mobile:\"header\" \"body\" \"footer\" \"aside\";--pfe-band--gridTemplateArea_desktop:\"header header\" \"body aside\" \"footer footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]{--pfe-band--gridTemplateArea_mobile:\"aside\" \"header\" \"body\" \"footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"header aside\" \"body aside\" \"footer aside\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]{--pfe-band--gridTemplateArea_desktop:\"header header\" \"aside body\" \"footer footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{--pfe-band--gridTemplateArea_desktop:\"aside header\" \"aside body\" \"aside footer\"}@supports (display:grid){.pfe-band__container{-ms-grid-columns:var(--pfe-band--layout);grid-template-columns:var(--pfe-band--layout);-ms-grid-rows:-webkit-max-content;-ms-grid-rows:max-content;grid-template-rows:-webkit-max-content;grid-template-rows:max-content;grid-template-areas:var(--pfe-band--gridTemplateArea_mobile)}@media (min-width:768px){.pfe-band__container{grid-template-areas:var(--pfe-band--gridTemplateArea_desktop)}}}.pfe-band__header{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__header{grid-area:header;-ms-grid-columns:var(--pfe-band__header--layout);grid-template-columns:var(--pfe-band__header--layout)}}.pfe-band__body{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__body{grid-area:body;-ms-grid-columns:var(--pfe-band__body--layout);grid-template-columns:var(--pfe-band__body--layout)}}.pfe-band__aside{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__aside{grid-area:aside;-ms-grid-columns:var(--pfe-band__aside--layout);grid-template-columns:var(--pfe-band__aside--layout)}}.pfe-band__footer{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__footer{grid-area:footer;-ms-grid-columns:var(--pfe-band__footer--layout);grid-template-columns:var(--pfe-band__footer--layout)}}.pfe-band__aside{-webkit-align-self:stretch;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}\n/*# sourceMappingURL=pfe-band.min.css.map */\n</style><section class=\"pfe-band__container\"" + ["header", "footer", "aside"].map(function (slot) {
          return _this2.has_slot("pfe-band--" + slot) ? "pfe-has-" + slot : "";
        }).join(" ") + ">\n  " + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile === "top" ? "<slot class=\"pfe-band__aside\" name=\"pfe-band--aside\"></slot>" : "") + "\n  " + (this.has_slot("pfe-band--header") ? "<slot class=\"pfe-band__header\" name=\"pfe-band--header\"></slot>" : "") + "\n  <slot class=\"pfe-band__body\"></slot>\n  " + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? "<slot class=\"pfe-band__aside\" name=\"pfe-band--aside\"></slot>" : "") + "\n  " + (this.has_slot("pfe-band--footer") ? "<slot class=\"pfe-band__footer\" name=\"pfe-band--footer\"></slot>" : "") + "\n</section>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-band.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-band.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-band.scss";
      }
    }, {
      key: "imageSrc",
      get: function get$$1() {
        return this.getAttribute("pfe-img-src");
      }
    }, {
      key: "backgroundColor",
      get: function get$$1() {
        return this.getAttribute("pfe-color");
      }
    }, {
      key: "asidePosition",
      get: function get$$1() {
        return {
          desktop: this.getAttribute("pfe-aside-desktop"),
          mobile: this.getAttribute("pfe-aside-mobile"),
          height: this.getAttribute("pfe-aside-height")
        };
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.28";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "color": { "title": "Background color", "type": "string", "enum": ["lightest", "lighter", "base", "darker", "darkest", "complement", "accent"], "default": "base", "prefixed": true, "observer": "_colorChanged" }, "img-src": { "title": "Background image", "type": "string", "prefixed": true, "observer": "_imgSrcChanged" }, "aside-desktop": { "title": "Aside positioning (desktop)", "type": "string", "default": "right", "enum": ["right", "left"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-mobile": { "title": "Aside positioning (mobile)", "type": "string", "default": "bottom", "enum": ["top", "bottom"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-height": { "title": "Aside height", "type": "string", "default": "body", "enum": ["full", "body"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "header": { "title": "Header", "type": "array", "namedSlot": true, "maxItems": 3, "items": { "title": "Body item", "oneOf": [{ "$ref": "raw" }] } }, "body": { "title": "Body", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "pfe-card" }, { "$ref": "raw" }] } }, "footer": { "title": "Footer", "type": "array", "namedSlot": true, "maxItems": 3, "items": { "oneOf": [{ "$ref": "pfe-cta" }, { "$ref": "raw" }] } }, "aside": { "title": "Aside", "type": "array", "namedSlot": true, "maxItems": 5, "items": { "oneOf": [{ "$ref": "pfe-card" }, { "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-band";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-aside-desktop", "pfe-aside-mobile", "pfe-aside-height", "pfe-color", "pfe-img-src"];
      }
    }, {
      key: "cascadingAttributes",
      get: function get$$1() {
        return {
          "pfe-aside-desktop": ".pfe-band__container",
          "pfe-aside-mobile": ".pfe-band__container",
          "pfe-aside-height": ".pfe-band__container"
        };
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Container;
      }
    }]);

    function PfeBand() {
      classCallCheck(this, PfeBand);
      return possibleConstructorReturn(this, (PfeBand.__proto__ || Object.getPrototypeOf(PfeBand)).call(this, PfeBand, { type: PfeBand.PfeType }));
    }

    createClass(PfeBand, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeBand.prototype.__proto__ || Object.getPrototypeOf(PfeBand.prototype), "connectedCallback", this).call(this);
        // Initialize the background image attachment
        if (this.imageSrc) {
          this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeBand.prototype.__proto__ || Object.getPrototypeOf(PfeBand.prototype), "attributeChangedCallback", this).call(this, attr, oldValue, newValue);
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
    }, {
      key: "_basicAttributeChanged",
      value: function _basicAttributeChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
      }

      // Update the color attribute and contexts

    }, {
      key: "_colorChanged",
      value: function _colorChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
      }

      // Update the background image

    }, {
      key: "_imgSrcChanged",
      value: function _imgSrcChanged(attr, oldValue, newValue) {
        // Set the image as the background image
        this.style.backgroundImage = newValue ? "url('" + newValue + "')" : "";
      }
    }]);
    return PfeBand;
  }(PFElement);

  PFElement.create(PfeBand);

  return PfeBand;

})));
//# sourceMappingURL=pfe-band.umd.js.map
