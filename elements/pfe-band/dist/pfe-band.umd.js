(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeBand = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  // @POLYFILL  Element.matches
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

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

  // @POLYFILL  Array.includes
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
   * PatternFly Elements: PfeBand 1.0.0-prerelease.55
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

  var PfeBand = function (_PFElement) {
    inherits(PfeBand, _PFElement);
    createClass(PfeBand, [{
      key: "html",
      get: function get$$1() {
        var _this2 = this;

        return "<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-color=accent]),:host([pfe-color=base]),:host([pfe-color=complement]),:host([pfe-color=darker]),:host([pfe-color=darkest]),:host([pfe-color=lightest]){background-color:#fff!important;color:#151515!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{--theme:var(--pfe-band--theme, light);display:block;position:relative;padding:calc(calc(16px * 4)/ 2) calc(16px * 1);padding:calc(var(--pfe-band--Padding--vertical,calc(var(--pfe-theme--container-spacer,16px) * 4))/ 2) var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 1));border:1px solid transparent;border:var(--pfe-band--Border,var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent);background-color:#f0f0f0;background-color:var(--pfe-band--BackgroundColor,var(--pfe-theme--color--surface--base,#f0f0f0));background-position:center center;background-position:var(--pfe-band--BackgroundPosition,center center);color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}@media screen and (min-width:768px){:host{--pfe-band--Width:calc( 768px - calc(var(--pfe-band--Padding--horizontal, calc( var(--pfe-theme--container-spacer, 16px) * 1)) * 4))}}@media screen and (min-width:992px){:host{--pfe-band--Width:calc( 992px - calc(var(--pfe-band--Padding--horizontal, calc( var(--pfe-theme--container-spacer, 16px) * 1)) * 4))}}@media screen and (min-width:1200px){:host{--pfe-band--Width:calc( 1200px - calc(var(--pfe-band--Padding--horizontal, calc( var(--pfe-theme--container-spacer, 16px) * 1)) * 4))}}@media (min-width:576px){:host{padding:calc(16px * 4) calc(16px * 1);padding:var(--pfe-band--Padding,var(--pfe-band--Padding--vertical,calc(var(--pfe-theme--container-spacer,16px) * 4)) var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 1)))}}@media print{:host{background-color:#fff!important;background-image:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}}@media print{:host{border-radius:3px;border:1px solid #d2d2d2;padding:calc(16px * 4)/2 calc(16px * 1);padding:calc(var(--pfe-theme--container-spacer,16px) * 4)/2 calc(var(--pfe-theme--container-spacer,16px) * 1)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;color:#151515!important;background-image:none!important;padding:16px}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([pfe-color=darker]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darker, #3c3f42);--pfe-band--theme:var(--pfe-theme--color--surface--darker--theme, dark)}:host([pfe-color=darkest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-band--theme:var(--pfe-theme--color--surface--darkest--theme, dark)}:host([pfe-color=base]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--base, #f0f0f0);--pfe-band--theme:var(--pfe-theme--color--surface--base--theme, light)}:host([pfe-color=lightest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-band--theme:var(--pfe-theme--color--surface--lightest--theme, light)}:host([pfe-color=accent]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--accent, #004080);--pfe-band--theme:var(--pfe-theme--color--surface--accent--theme, saturated)}:host([pfe-color=complement]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--complement, #002952);--pfe-band--theme:var(--pfe-theme--color--surface--complement--theme, saturated)}:host([pfe-size=small]){--pfe-band--Padding:calc(var(--pfe-band--Padding--vertical, calc( var(--pfe-theme--container-spacer, 16px) * 4)) / 4) var(--pfe-band--Padding--horizontal, calc( var(--pfe-theme--container-spacer, 16px) * 1))}.pfe-band__container{--pfe-band__region--width:calc(1fr - var(--pfe-band--Width__aside--sm, 240px) - var(--pfe-band--gutter--horizontal, calc(var(--pfe-theme--container-spacer, 16px) * 3)));grid-template-areas:\"body\";position:relative;margin:0 auto;width:100%;max-width:auto;max-width:var(--pfe-band--Width,auto)}.pfe-band__container[pfe-has-aside]{grid-template-areas:\"body\" \"aside\"}@media (min-width:768px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--sm, 240px)}}@media (min-width:992px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--lg, 300px)}}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]{grid-template-areas:\"aside\" \"body\"}@media (min-width:768px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{grid-template-areas:\"aside body\";--pfe-band--layout:var(--pfe-band--Width__aside--sm, 240px) 1fr}.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}}@media (min-width:992px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{--pfe-band--layout:var(--pfe-band--Width__aside--lg, 300px) 1fr}}.pfe-band__container[pfe-has-header]{grid-template-areas:\"header\" \"body\"}.pfe-band__container[pfe-has-header][pfe-has-aside]{grid-template-areas:\"header\" \"body\" \"aside\"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-aside]{grid-template-areas:\"header header\" \"body aside\"}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:2}}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]{grid-template-areas:\"aside\" \"header\" \"body\"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-height=full]{grid-template-areas:\"header aside\" \"body aside\"}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]{grid-template-areas:\"header header\" \"aside body\"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:\"aside header\" \"aside body\"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}}.pfe-band__container[pfe-has-footer]{grid-template-areas:\"body\" \"footer\"}.pfe-band__container[pfe-has-footer][pfe-has-aside]{grid-template-areas:\"body\" \"aside\" \"footer\"}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-has-aside]{grid-template-areas:\"body aside\" \"footer footer\"}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]{grid-template-areas:\"aside\" \"body\" \"footer\"}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-height=full]{grid-template-areas:\"body aside\" \"footer aside\"}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]{grid-template-areas:\"aside body\" \"footer footer\"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:\"aside body\" \"aside footer\"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:2;-ms-grid-column-span:1}}.pfe-band__container[pfe-has-header][pfe-has-footer]{grid-template-areas:\"header\" \"body\" \"footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]{grid-template-areas:\"header\" \"body\" \"footer\" \"aside\"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]{grid-template-areas:\"header header\" \"body aside\" \"footer footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]{grid-template-areas:\"aside\" \"header\" \"body\" \"footer\"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]{grid-template-areas:\"header aside\" \"body aside\" \"footer aside\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]{grid-template-areas:\"header header\" \"aside body\" \"footer footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:\"aside header\" \"aside body\" \"aside footer\"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:2;-ms-grid-column-span:1}}@supports (display:grid){.pfe-band__container{display:-ms-grid;display:grid;grid-row-gap:16px;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px));grid-column-gap:calc(16px * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 3));margin-bottom:0;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band--layout,1fr);grid-template-columns:var(--pfe-band--layout,1fr);-ms-grid-rows:-webkit-max-content;-ms-grid-rows:max-content;grid-template-rows:-webkit-max-content;grid-template-rows:max-content}.pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}.pfe-band__header{margin-bottom:16px;margin-bottom:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px))}@supports (display:grid){.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:16px;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px));grid-column-gap:calc(16px * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 3));margin-bottom:0;grid-area:header;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__header--layout,1fr);grid-template-columns:var(--pfe-band__header--layout,1fr)}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}}.pfe-band__body{margin-bottom:16px;margin-bottom:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px))}@supports (display:grid){.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:16px;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px));grid-column-gap:calc(16px * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 3));margin-bottom:0;grid-area:body;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__body--layout,1fr);grid-template-columns:var(--pfe-band__body--layout,1fr)}.pfe-band__container[pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-footer]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}}.pfe-band__aside{margin-bottom:16px;margin-bottom:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px))}@supports (display:grid){.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:16px;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px));grid-column-gap:calc(16px * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 3));margin-bottom:0;grid-area:aside;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__aside--layout,1fr);grid-template-columns:var(--pfe-band__aside--layout,1fr)}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:4;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}}.pfe-band__footer{margin-bottom:16px;margin-bottom:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px))}@supports (display:grid){.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:16px;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,16px));grid-column-gap:calc(16px * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,16px) * 3));margin-bottom:0;grid-area:footer;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__footer--layout,1fr);grid-template-columns:var(--pfe-band__footer--layout,1fr)}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__footer{-ms-grid-row:4;-ms-grid-column:1;-ms-grid-column-span:1}}.pfe-band__aside{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-band__body{width:60%;float:left}.pfe-band__aside{float:left;width:35%;margin:0 2.5%}.pfe-band__footer{clear:both}.pfe-band__container::after{content:\" \";display:block;clear:both}}\n/*# sourceMappingURL=pfe-band.min.css.map */\n</style><section class=\"pfe-band__container\"" + ["header", "footer", "aside"].map(function (slot) {
          return _this2.has_slot("pfe-band--" + slot) ? "pfe-has-" + slot : "";
        }).join(" ") + ">\n  " + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile === "top" ? "<aside class=\"pfe-band__aside\" ><slot name=\"pfe-band--aside\"></slot></aside>" : "") + "\n  " + (this.has_slot("pfe-band--header") ? "<header class=\"pfe-band__header\"><slot name=\"pfe-band--header\"></slot></header>" : "") + "\n  <article class=\"pfe-band__body\"><slot></slot></article>\n  " + (this.has_slot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? "<aside class=\"pfe-band__aside\"><slot name=\"pfe-band--aside\"></slot></aside>" : "") + "\n  " + (this.has_slot("pfe-band--footer") ? "<footer class=\"pfe-band__footer\"><slot name=\"pfe-band--footer\"></slot></footer>" : "") + "\n</section>";
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
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "color": { "title": "Background color", "type": "string", "enum": ["lightest", "base", "darker", "darkest", "complement", "accent"], "default": "base", "prefixed": true, "observer": "_colorChanged" }, "img-src": { "title": "Background image", "type": "string", "prefixed": true, "observer": "_imgSrcChanged" }, "aside-desktop": { "title": "Aside positioning (desktop)", "type": "string", "default": "right", "enum": ["right", "left"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-mobile": { "title": "Aside positioning (mobile)", "type": "string", "default": "bottom", "enum": ["top", "bottom"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } }, "aside-height": { "title": "Aside height", "type": "string", "default": "body", "enum": ["full", "body"], "prefixed": true, "observer": "_basicAttributeChanged", "options": { "dependencies": [{ "type": "slot", "id": "aside" }] } } };
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
        // Trigger an update in nested components
        this.context_update();
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
