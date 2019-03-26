(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*
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
      key: 'html',
      get: function get$$1() {
        var _this2 = this;

        return '<style>:host, .pfe-band__container, .pfe-band__header, .pfe-band__body, .pfe-band__aside, .pfe-band__footer {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: flex-start;\n  margin-bottom: var(--pfe-band--gutter--vertical); }\n\n.pfe-band__container, .pfe-band__header, .pfe-band__body, .pfe-band__aside, .pfe-band__footer {\n  display: grid;\n  grid-row-gap: var(--pfe-band--gutter--vertical);\n  grid-column-gap: var(--pfe-band--gutter--horizontal);\n  margin-bottom: 0; }\n\n:host {\n  display: block;\n  --pfe-band--Padding--vertical:               calc( var(--pfe-theme--container-spacer, 1rem) * 4);\n  --pfe-band--Padding--horizontal:             calc( var(--pfe-theme--container-spacer, 1rem) * 1);\n  --pfe-band--Padding:                         var(--pfe-band--Padding--vertical)  var(--pfe-band--Padding--horizontal);\n  --pfe-band--BackgroundColor:                 var(--pfe-theme--color--surface--base, #dfdfdf);\n  --pfe-band--BackgroundPosition:              center center;\n  --pfe-band--Border:                          var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;\n  --pfe-band--layout:                           1fr;\n  --pfe-band__header--layout:                   1fr;\n  --pfe-band__body--layout:                     1fr;\n  --pfe-band__footer--layout:                   1fr;\n  --pfe-band__aside--layout:                    1fr;\n  --pfe-band--gutter--vertical:                 var(--pfe-theme--container-spacer, 1rem);\n  --pfe-band--gutter--horizontal:               calc(var(--pfe-theme--container-spacer, 1rem) * 3);\n  --pfe-broadcasted--color--text:              var(--pfe-theme--color--surface--base--text, #333);\n  --pfe-broadcasted--color--ui-link:           var(--pfe-theme--color--surface--base--link, #00538c);\n  --pfe-broadcasted--color--ui-link--visited:  var(--pfe-theme--color--surface--base--link--visited, #7551a6);\n  --pfe-broadcasted--color--ui-link--hover:    var(--pfe-theme--color--surface--base--link--hover, #00305b);\n  --pfe-broadcasted--color--ui-link--focus:    var(--pfe-theme--color--surface--base--link--focus, #00305b);\n  --pfe-band--Width: auto;\n  --pfe-band--Width__aside--sm: 240px;\n  --pfe-band--Width__aside--lg: 300px;\n  position: relative;\n  padding: calc(var(--pfe-band--Padding--vertical) / 2) var(--pfe-band--Padding--horizontal);\n  border: var(--pfe-band--Border);\n  background-color: var(--pfe-band--BackgroundColor);\n  background-position: var(--pfe-band--BackgroundPosition);\n  color: var(--pfe-broadcasted--color--text); }\n  @media screen and (min-width: 768px) {\n    :host {\n      --pfe-band--Width: calc( 768px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }\n  @media screen and (min-width: 992px) {\n    :host {\n      --pfe-band--Width: calc( 992px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }\n  @media screen and (min-width: 1200px) {\n    :host {\n      --pfe-band--Width: calc( 1200px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }\n  @media print {\n    :host {\n      --pfe-band--Padding: calc(var(--pfe-band--Padding--vertical) / 2) var(--pfe-band--Padding--horizontal); } }\n  @media (min-width: 576px) {\n    :host {\n      padding: var(--pfe-band--Padding); } }\n  @media print {\n    :host {\n      background-color: white !important;\n      background-image: none !important;\n      box-shadow: none !important; } }\n  :host *, :host *::before, :host *::after {\n    box-sizing: border-box; }\n\n:host([pfe-color="darker"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }\n\n:host([pfe-color="darkest"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--darkest, #131313);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }\n\n:host([pfe-color="accent"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--accent, #fe460d);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }\n\n:host([pfe-color="complement"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--complement, #0477a4);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }\n\n:host([pfe-color="lighter"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }\n\n:host([pfe-color="lightest"]) {\n  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--lightest, #fff);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }\n\n:host([pfe-size="small"]) {\n  --pfe-band--Padding:   calc(var(--pfe-band--Padding--vertical) / 4)  var(--pfe-band--Padding--horizontal); }\n\n.pfe-band__container {\n  --pfe-band_region--width: calc(calc(1fr - var(--pfe-band--Width__aside--sm)) - var(--pfe-band--gutter--horizontal));\n  --pfe-band--gridTemplateArea_mobile: "body";\n  position: relative;\n  margin: 0 auto;\n  width: 100%;\n  max-width: var(--pfe-band--Width); }\n  .pfe-band__container[pfe-has-aside] {\n    --pfe-band--gridTemplateArea_mobile:\n        "body" "aside";\n    --pfe-band--gridTemplateArea_desktop:\n        "body aside"; }\n    @media (min-width: 768px) {\n      .pfe-band__container[pfe-has-aside] {\n        --pfe-band--layout: 1fr var(--pfe-band--Width__aside--sm); } }\n    @media (min-width: 992px) {\n      .pfe-band__container[pfe-has-aside] {\n        --pfe-band--layout: 1fr var(--pfe-band--Width__aside--lg); } }\n    .pfe-band__container[pfe-has-aside][pfe-aside-mobile="top"] {\n      --pfe-band--gridTemplateArea_mobile:\n          "aside" "body"; }\n    .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "aside body"; }\n      @media (min-width: 768px) {\n        .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {\n          --pfe-band--layout: var(--pfe-band--Width__aside--sm) 1fr; } }\n      @media (min-width: 992px) {\n        .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {\n          --pfe-band--layout: var(--pfe-band--Width__aside--lg) 1fr; } }\n  .pfe-band__container[pfe-has-header] {\n    --pfe-band--gridTemplateArea_mobile:\n        "header" "body"; }\n    .pfe-band__container[pfe-has-header][pfe-has-aside] {\n      --pfe-band--gridTemplateArea_mobile:  \n          "header" \n          "body" "aside";\n      --pfe-band--gridTemplateArea_desktop: \n          "header header" \n          "body aside"; }\n    .pfe-band__container[pfe-has-header][pfe-aside-mobile="top"] {\n      --pfe-band--gridTemplateArea_mobile:  \n          "aside" \n          "header" \n          "body"; }\n    .pfe-band__container[pfe-has-header][pfe-aside-height="full"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "header aside"\n          "body aside"; }\n    .pfe-band__container[pfe-has-header][pfe-aside-desktop="left"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "header header"\n          "aside body"; }\n      .pfe-band__container[pfe-has-header][pfe-aside-desktop="left"][pfe-aside-height="full"] {\n        --pfe-band--gridTemplateArea_desktop:\n            "aside header"\n            "aside body"; }\n  .pfe-band__container[pfe-has-footer] {\n    --pfe-band--gridTemplateArea_mobile:\n        "body"\n        "footer"; }\n    .pfe-band__container[pfe-has-footer][pfe-has-aside] {\n      --pfe-band--gridTemplateArea_mobile:\n          "body"\n          "aside"\n          "footer";\n      --pfe-band--gridTemplateArea_desktop:\n          "body aside"\n          "footer footer"; }\n    .pfe-band__container[pfe-has-footer][pfe-aside-mobile="top"] {\n      --pfe-band--gridTemplateArea_mobile:\n          "aside"\n          "body"\n          "footer"; }\n    .pfe-band__container[pfe-has-footer][pfe-aside-height="full"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "body aside"\n          "footer aside" ; }\n    .pfe-band__container[pfe-has-footer][pfe-aside-desktop="left"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "aside body"\n          "footer footer"; }\n      .pfe-band__container[pfe-has-footer][pfe-aside-desktop="left"][pfe-aside-height="full"] {\n        --pfe-band--gridTemplateArea_desktop:\n            "aside body"\n            "aside footer"; }\n  .pfe-band__container[pfe-has-header][pfe-has-footer] {\n    --pfe-band--gridTemplateArea_mobile:\n        "header"\n        "body"\n        "footer"; }\n    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside] {\n      --pfe-band--gridTemplateArea_mobile:\n          "header"\n          "body"\n          "footer"\n          "aside";\n      --pfe-band--gridTemplateArea_desktop:\n          "header header"\n          "body aside"\n          "footer footer"; }\n    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile="top"] {\n      --pfe-band--gridTemplateArea_mobile:\n          "aside"\n          "header"\n          "body"\n          "footer"; }\n    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height="full"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "header aside"\n          "body aside"\n          "footer aside" ; }\n    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop="left"] {\n      --pfe-band--gridTemplateArea_desktop:\n          "header header"\n          "aside body"\n          "footer footer"; }\n      .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop="left"][pfe-aside-height="full"] {\n        --pfe-band--gridTemplateArea_desktop:\n            "aside header"\n            "aside body"\n            "aside footer"; }\n  @supports (display: grid) {\n    .pfe-band__container {\n      grid-template-columns: var(--pfe-band--layout);\n      grid-template-rows: max-content;\n      grid-template-areas: var(--pfe-band--gridTemplateArea_mobile); }\n      @media (min-width: 768px) {\n        .pfe-band__container {\n          grid-template-areas: var(--pfe-band--gridTemplateArea_desktop); } } }\n\n@supports (display: grid) {\n  .pfe-band__header {\n    grid-area: header;\n    grid-template-columns: var(--pfe-band__header--layout); } }\n\n@supports (display: grid) {\n  .pfe-band__body {\n    grid-area: body;\n    grid-template-columns: var(--pfe-band__body--layout); } }\n\n@supports (display: grid) {\n  .pfe-band__aside {\n    grid-area: aside;\n    grid-template-columns: var(--pfe-band__aside--layout); } }\n\n@supports (display: grid) {\n  .pfe-band__footer {\n    grid-area: footer;\n    grid-template-columns: var(--pfe-band__footer--layout); } }</style>\n<section class="pfe-band__container"' + ["header", "footer", "aside"].map(function (slot) {
          return _this2.has_slot('pfe-band--' + slot) ? 'pfe-has-' + slot : "";
        }).join(" ") + '>\n  ' + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile === "top" ? '<slot class="pfe-band__aside" name="pfe-band--aside"></slot>' : "") + '\n  ' + (this.has_slot("pfe-band--header") ? '<slot class="pfe-band__header" name="pfe-band--header"></slot>' : "") + '\n  <slot class="pfe-band__body"></slot>\n  ' + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? '<slot class="pfe-band__aside" name="pfe-band--aside"></slot>' : "") + '\n  ' + (this.has_slot("pfe-band--footer") ? '<slot class="pfe-band__footer" name="pfe-band--footer"></slot>' : "") + '\n</section>';
      }
    }, {
      key: 'schemaUrl',
      get: function get$$1() {
        return "pfe-band.json";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-band.html";
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-band.scss";
      }
    }, {
      key: 'imageSrc',
      get: function get$$1() {
        return this.getAttribute("pfe-img-src");
      }
    }, {
      key: 'backgroundColor',
      get: function get$$1() {
        return this.getAttribute("pfe-color");
      }
    }, {
      key: 'asidePosition',
      get: function get$$1() {
        return {
          desktop: this.getAttribute("pfe-aside-desktop"),
          mobile: this.getAttribute("pfe-aside-mobile"),
          height: this.getAttribute("pfe-aside-height")
        };
      }
    }], [{
      key: 'properties',
      get: function get$$1() {
        return { "color": { "title": "Background color", "type": "string", "enum": ["lightest", "lighter", "base", "darker", "darkest", "complement", "accent"], "default": "base", "observer": "_colorChanged" }, "img-src": { "title": "Background image", "type": "string", "observer": "_imgSrcChanged" }, "aside-desktop": { "title": "Aside positioning (desktop)", "type": "string", "default": "right", "enum": ["right", "left"], "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-mobile": { "title": "Aside positioning (mobile)", "type": "string", "default": "bottom", "enum": ["top", "bottom"], "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-height": { "title": "Aside height", "type": "string", "default": "body", "enum": ["full", "body"], "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } } };
      }
    }, {
      key: 'slots',
      get: function get$$1() {
        return { "header": { "title": "Header", "type": "array", "namedSlot": true, "maxItems": 3, "items": { "title": "Body item", "oneOf": [{ "$ref": "raw" }] } }, "body": { "title": "Body", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "pfe-card" }, { "$ref": "raw" }] } }, "footer": { "title": "Footer", "type": "array", "namedSlot": true, "maxItems": 3, "items": { "oneOf": [{ "$ref": "pfe-cta" }, { "$ref": "raw" }] } }, "aside": { "title": "Aside", "type": "array", "namedSlot": true, "maxItems": 5, "items": { "oneOf": [{ "$ref": "pfe-card" }, { "$ref": "raw" }] } } };
      }
    }, {
      key: 'tag',
      get: function get$$1() {
        return "pfe-band";
      }
    }, {
      key: 'observedAttributes',
      get: function get$$1() {
        return ["pfe-aside-desktop", "pfe-aside-mobile", "pfe-aside-height", "pfe-color", "pfe-img-src"];
      }
    }, {
      key: 'cascadingAttributes',
      get: function get$$1() {
        return {
          "pfe-aside-desktop": ".pfe-band__container",
          "pfe-aside-mobile": ".pfe-band__container",
          "pfe-aside-height": ".pfe-band__container"
        };
      }

      // Declare the type of this component

    }, {
      key: 'PfeType',
      get: function get$$1() {
        return PFElement.PfeTypes.Container;
      }
    }]);

    function PfeBand() {
      classCallCheck(this, PfeBand);
      return possibleConstructorReturn(this, (PfeBand.__proto__ || Object.getPrototypeOf(PfeBand)).call(this, PfeBand, { type: PfeBand.PfeType }));
    }

    createClass(PfeBand, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        get(PfeBand.prototype.__proto__ || Object.getPrototypeOf(PfeBand.prototype), 'connectedCallback', this).call(this);
        // Initialize the background image attachment
        if (this.imageSrc) {
          this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
        }
        // Initialize the context setting for the children elements
        if (this.backgroundColor) {
          this._updateContext(this.backgroundColor);
        }
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeBand.prototype.__proto__ || Object.getPrototypeOf(PfeBand.prototype), 'attributeChangedCallback', this).call(this, attr, oldValue, newValue);
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
      key: '_basicAttributeChanged',
      value: function _basicAttributeChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
      }

      // Update the color attribute and contexts

    }, {
      key: '_colorChanged',
      value: function _colorChanged(attr, oldValue, newValue) {
        this[attr].value = newValue;
        // If the new value has a dark background, update children elements
        this._updateContext(newValue);
      }

      // Update the background image

    }, {
      key: '_imgSrcChanged',
      value: function _imgSrcChanged(attr, oldValue, newValue) {
        // Set the image as the background image
        this.style.backgroundImage = newValue ? 'url(\'' + newValue + '\')' : '';
      }

      // Set the children's context if parent background is dark

    }, {
      key: '_updateContext',
      value: function _updateContext(context) {
        var _this3 = this;

        if (["darkest", "darker", "complement", "accent"].includes(context)) {
          ["pfe-cta"].forEach(function (elementName) {
            var els = [].concat(toConsumableArray(_this3.querySelectorAll('' + elementName)));
            els.forEach(function (el) {
              var myContainer = el.closest("[pfe-type=container]");
              if (myContainer === _this3 || myContainer === null) {
                el.setAttribute("on", "dark");
              }
            });
          });
        }
      }
    }]);
    return PfeBand;
  }(PFElement);

  PFElement.create(PfeBand);

  return PfeBand;

})));
//# sourceMappingURL=pfe-band.umd.js.map
