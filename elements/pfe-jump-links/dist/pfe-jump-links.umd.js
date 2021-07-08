(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-accordion/dist/pfe-accordion.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-accordion/dist/pfe-accordion.umd'], factory) :
  (global = global || self, global.PfeJumpLinks = factory(global.PFElement, global.PfeAccordion));
}(this, (function (PFElement, pfeAccordion_umd) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;
  pfeAccordion_umd = pfeAccordion_umd && Object.prototype.hasOwnProperty.call(pfeAccordion_umd, 'default') ? pfeAccordion_umd['default'] : pfeAccordion_umd;

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
   * PatternFly Elements: PfeJumpLinks 1.10.0
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

  // @TODO This needs a click handler for if the accordion is stuck to the top
  // and the user clicks outside the accordion element (should close accordion).

  var PfeJumpLinksNav = function (_PFElement) {
    inherits(PfeJumpLinksNav, _PFElement);
    createClass(PfeJumpLinksNav, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>slot[name=heading][sr-only]{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:\"Red Hat Text\",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Red Hat Text\", \"RedHatText\", \"Overpass\", Overpass, Arial, sans-serif);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);display:block;position:-webkit-sticky;position:sticky;z-index:80;z-index:var(--pfe-theme--zindex--jumplinks,80);top:0;padding:0}@media (min-width:992px){:host([horizontal][color=darkest]){background-color:#151515;background-color:var(--pfe-theme--color--surface--darkest,#151515);--context:var(--pfe-theme--color--surface--darkest--context, dark);--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}}@media (min-width:992px){:host([horizontal][color=darker]){background-color:#3c3f42;background-color:var(--pfe-theme--color--surface--darker,#3c3f42);--context:var(--pfe-theme--color--surface--darker--context, dark);--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}}@media (min-width:992px){:host([horizontal][color=lightest]){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--context:var(--pfe-theme--color--surface--lightest--context, light);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}}@media (min-width:992px){:host([horizontal][color=lighter]){background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);--context:var(--pfe-theme--color--surface--lighter--context, light);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}}:host([stuck][horizontal]){-webkit-box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06) 0 .0625rem .125rem 0 rgba(3,3,3,.2);box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06) 0 .0625rem .125rem 0 rgba(3,3,3,.2);-webkit-box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06)0 .0625rem .125rem 0 rgba(3,3,3,.2));box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06)0 .0625rem .125rem 0 rgba(3,3,3,.2))}.pfe-jump-links-nav__heading{margin-top:0;margin-bottom:.5rem;margin-bottom:var(--pfe-theme--content-spacer--body--sm,.5rem)}.pfe-jump-links-nav__heading h3,::slotted([slot=heading]){color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);margin:0;font-size:.875rem;font-size:var(--pfe-jump-links__heading--FontSize,var(--pf-global--FontSize--sm,.875rem));font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);text-transform:uppercase;text-transform:var(--pfe-jump-links__heading--TextTransform,uppercase)}slot[name=logo]{display:none}slot[name=cta]{display:none}nav{visibility:visible;margin:0;list-style:none;padding:0}pfe-accordion-panel nav{width:100%}@media (min-width:992px){:host([horizontal][no-header]) nav{padding-top:1px;padding-bottom:0}}#container{padding:32px 0}pfe-accordion-panel #container{padding:24px 0}ul{padding:0;margin:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}li{display:block;position:relative;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}.sub-nav li{margin-left:0}li[expand] ul{height:auto;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}li[expand] .sub-nav{display:table;height:auto}li::before{position:absolute;content:\"\";top:0;left:0;width:4px;width:var(--pfe-theme--surface--border-width--heavy,4px);height:100%;background-color:transparent}li::before else{height:4px;height:var(--pfe-theme--surface--border-width--heavy,4px);width:100%}li :hover::before,li:not([expand]) li:hover::before{background-color:#d2d2d2;background-color:var(--pfe-theme--color--ui-disabled,#d2d2d2)}li[active]::before,li[expand]::before{background-color:#06c;background-color:var(--pfe-jump-links--accent,var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c)));z-index:2}a{position:relative;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:1rem;font-size:var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(calc(1.5rem / 6) * 2) calc(calc(1.5rem / 3) * 2);padding:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) * 2) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}a,a:focus+ul>li>a,li:hover a,li[expand] a{display:table}li>a:hover,li[active]>a{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host([on=dark]) a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-dark,#d2d2d2)}:host([on=saturated]) a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-saturated,#d2d2d2)}.has-sub-section a{padding-bottom:calc(1.5rem / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6))}.sub-section a{margin-left:calc(1rem * .75);margin-left:calc(var(--pfe-theme--container-spacer,1rem) * .75);font-size:calc(1rem * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem)) * .85);padding:calc(1.5rem / 6) calc(calc(1.5rem / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}@media (min-width:992px){.sub-section a{display:none}}.sub-section a:last-child{padding-bottom:calc(1.5rem / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3))}a:focus:focus-visible{outline:0}a:focus:focus-visible::after{position:absolute;content:\"\";top:0;left:0;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:2px solid #06c;border:2px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--link,#06c)}ul ul{margin:0;padding:0;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear}ul ul,ul ul li{border-left:none!important}pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2);--context:light;--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([color=darkest]) pfe-accordion{--context:dark;--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-theme--color--ui-accent--on-dark:transparent}pfe-accordion,pfe-accordion-panel.animating,pfe-accordion-panel[expanded]{--pfe-accordion--accent:transparent;--pfe-accordion--BorderColor:transparent;--pfe-accordion--BorderColor--accent:transparent;--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BorderBottomWidth:0;--pfe-accordion--panel-container--Padding:0 0 0 calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5)}@media screen and (min-width:992px){:host([horizontal]){width:100%;background-color:#fff;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--context:var(--pfe-jump-links--context, var(--pfe-theme--color--surface--lightest--context, light));z-index:calc(80 + 1);z-index:calc(var(--pfe-theme--zindex--jumplinks,80) + 1);border:none;padding:0}:host([horizontal]) .pfe-jump-links-nav__heading{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;-webkit-align-self:center;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;display:block;margin:0;padding-bottom:1rem;padding-bottom:var(--pfe-theme--container-padding,1rem);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host([horizontal]) .pfe-jump-links-nav__heading h3,:host([horizontal]) ::slotted([slot=heading]){text-align:center;text-align:var(--pfe-jump-links__heading--TextAlign,center)}:host([horizontal]) ::slotted([slot=logo]){position:absolute;max-height:calc(1rem * 3.5);max-height:calc(var(--pfe-theme--container-spacer,1rem) * 3.5);max-width:calc(1rem * 14);max-width:calc(var(--pfe-theme--container-spacer,1rem) * 14);top:1rem;top:var(--pfe-theme--container-spacer,1rem);left:calc(1rem * 4);left:calc(var(--pfe-theme--container-spacer,1rem) * 4)}:host([horizontal]) ::slotted([slot=cta]){position:absolute;top:calc(1rem * 1);top:calc(var(--pfe-theme--container-spacer,1rem) * 1);right:calc(1rem * 4);right:calc(var(--pfe-theme--container-spacer,1rem) * 4)}}@media screen and (min-width:992px){:host([horizontal]) nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;padding-top:32px;padding-bottom:8px;max-width:calc(992px - (var(--pfe-jump-links--Padding--horizontal) * 4));max-width:var(--pfe-jump-links--Width,calc(992px - (var(--pfe-jump-links--Padding--horizontal) * 4)))}}@media screen and (min-width:1200px){:host([horizontal]) nav{max-width:calc(1200px - (var(--pfe-jump-links--Padding--horizontal) * 4));max-width:var(--pfe-jump-links--Width,calc(1200px - (var(--pfe-jump-links--Padding--horizontal) * 4)))}}@media screen and (min-width:992px){:host([horizontal]) #container{padding:0;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{border:none;text-align:center;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0 auto}:host([horizontal]) li{margin-left:0;padding:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-top:calc(1px * -1);margin-top:calc(var(--pfe-theme--surface--border-width,1px) * -1)}:host([horizontal]) li::before{height:4px;height:var(--pfe-theme--surface--border-width--heavy,4px);width:100%}:host([horizontal]) a{padding:16px;text-decoration:none;font-size:16px;color:var(--pfe-broadcasted--text--muted,)}:host([horizontal]) a:hover,:host([horizontal]) a[active]{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}}:host([hidden]){display:none!important} /*# sourceMappingURL=pfe-jump-links-nav.min.css.map */</style>\n" + (this.isMobile ? "\n<pfe-accordion>\n  <pfe-accordion-header>\n    <slot class=\"pfe-jump-links-nav__heading\" name=\"heading\">\n      <h3>" + (this.srText || "Jump to section") + "</h3>\n    </slot>\n  </pfe-accordion-header>\n  <pfe-accordion-panel>\n" : "") + "\n\n<nav>\n  " + (!this.isMobile ? "<slot class=\"pfe-jump-links-nav__heading\" name=\"heading\"" + (this.noHeader ? " sr-only" : "") + ">\n    <h3>" + (this.srText || "Jump to section") + "</h3>\n  </slot>" : "") + "\n  " + (this.horizontal ? "<slot class=\"pfe-jump-links-nav__logo\" name=\"logo\"></slot>" : "") + "\n  <div id=\"container\"></div>\n  " + (this.horizontal ? "<slot class=\"pfe-jump-links-nav__cta\" name=\"cta\"></slot>" : "") + "\n</nav>\n\n" + (this.isMobile ? "\n  </pfe-accordion-panel>\n</pfe-accordion>\n" : "");
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-jump-links-nav.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-jump-links-nav.scss";
      }
    }, {
      key: "events",


      /**
       * Alias events to allow easier console logging
       */
      get: function get() {
        return PfeJumpLinksNav.events;
      }

      /**
       * Observe the children, subtree, and character changes to allow
       * custom-built navigation to migrate to shadow DOM if updated
       * @returns {Object} Mutation observer settings
       */

    }, {
      key: "isMobile",


      /**
       * @requires {this.mobileBreakpoint || PFElement.breakpoint}
       * @returns {Boolean} true if this is at or below the mobile breakpoint
       */
      get: function get() {
        if (this.mobileBreakpoint) return window.matchMedia("(max-width: " + this.mobileBreakpoint + ")").matches;

        // Default to the PFElement breakpoints
        var data = PFElement.breakpoint.lg.match(/([0-9]+)([a-z]*)/);
        if (data.length < 1) return "991px";

        // Subtract one because PFElement breakpoints uses mobile-first numbering
        return window.matchMedia("(max-width: " + (Number.parseInt(data[1], 10) - 1) + data[2] + ")").matches;
      }

      /**
       * @returns {NodeItem} Slot assigned to heading or pfe-jump-links-nav--heading
       * @TODO deprecating pfe-jump-links-nav--heading slot in 2.0
       */

    }, {
      key: "header",
      get: function get() {
        return this.getSlot(["heading", "pfe-jump-links-nav--heading"])[0];
      }

      /**
       * @returns {NodeItem} Slot assigned to cta or pfe-jump-links-nav--cta
       * @TODO deprecating pfe-jump-links-nav--cta slot in 2.0
       */

    }, {
      key: "cta",
      get: function get() {
        return this.getSlot(["link", "pfe-jump-links-nav--link"])[0];
      }

      /**
       * @returns {NodeItem} Slot assigned to logo or pfe-jump-links-nav--logo
       * @TODO deprecating pfe-jump-links-nav--logo slot in 2.0
       */

    }, {
      key: "logo",
      get: function get() {
        return this.getSlot(["logo", "pfe-jump-links-nav--logo"])[0];
      }

      /**
       * @returns {NodeItem} Container element from the shadow DOM for the nav list
       */

    }, {
      key: "container",
      get: function get() {
        return this.shadowRoot.querySelector("#container");
      }

      /**
       * This setter lets you pass in a custom panel NodeItem to the navigation
       * @param {NodeItem} Pointer to the panel content
       */

    }, {
      key: "panel",
      set: function set(NodeItem) {
        if (NodeItem) {
          this._panel = NodeItem;

          // Attach a scrolltarget attribute if one does not yet exist
          if (!this._panel.hasAttribute("scrolltarget")) {
            this._panel.setAttribute("scrolltarget", this.id);
          }

          // Emit an event to indicate a change in the panel
          this.emitEvent(PfeJumpLinksNav.events.change);
        }
      }

      /**
       * This getter returns the panel for the navigation item; if a custom pointer was set
       * it will return that, otherwise, it tries to find the panel
       * @returns {NodeItem} Pointer to the panel content
       */
      ,
      get: function get() {
        var _this2 = this;

        // If a custom panel is already set, use that
        if (this._panel) return this._panel;

        // Use the ID from the navigation to target the panel elements
        // Automatically if there's only one set of tags on the page
        if (this.id) {
          // Check for a scrolltarget element pointing to that ID
          // Note: include fallback for scrolltarget in case pfe-jump-links-panel has not upgraded yet?
          var target = document.querySelector("[scrolltarget=\"" + this.id + "\"],[pfe-c-scrolltarget=\"" + this.id + "\"]");
          if (target) return target;
        }

        // Get all instances of the panel components registered with the DOM
        var panels = [];
        Promise.all([customElements.whenDefined("pfe-jump-links-panel")]).then(function () {
          panels = customElements.get("pfe-jump-links-panel").instances || [];

          // Look for a panel with this scrolltarget (can capture the attribute better after component upgrades)
          var panelWithId = panels.filter(function (panel) {
            return panel.getAttribute("scrolltarget") === _this2.id;
          });
          if (panelWithId.length === 1) return panelWithId[0];

          // If only one panel is found, let's assume that goes to this nav
          if (panels.length === 1) {
            // Capture a random ID to connect this to the panel
            _this2.id = _this2.randomId;
            panels[0].setAttribute("scrolltarget", _this2.id);

            return panels[0];
          }

          // Throw a few warning messages suggesting how to connect the nav and panels
          if (panels.length > 1) {
            _this2.warn("Cannot locate which panel is connected to this navigation element." + (_this2.id ? " Please add scrolltarget=\"" + _this2.id + "\" to the appropriate panel." : ""));
          } else {
            _this2.warn("Cannot locate any panels on this page. Please see documentation for connecting the navigation and panel.");
          }
        });

        return;
      }

      /**
       * API hook for setting up custom sections without a panel
       */

    }, {
      key: "sections",
      set: function set(NodeList) {
        this._sections = NodeList;

        // Emit an event to indicate a change in the sections
        this.emitEvent(PfeJumpLinksNav.events.change);
      }

      /**
       * Capture the sections from inside the "panel"; default to this._sections first
       * then fallback to grepping the sections from the panel
       * @returns {NodeList} All sections inside the panel
       */
      ,
      get: function get() {
        // If a custom set of sections is already defined, use that
        if (this._sections) return this._sections;

        var panel = this.panel;

        // If we can't find a panel element and this is using autobuild, return b/c we can't determine the sections automatically
        if (!panel && this.autobuild) return;

        // If this is not autobuilt, use the IDs from the light DOM
        if (!this.autobuild) {
          var links = [].concat(toConsumableArray(this.querySelectorAll("ul > li > a[href]")));
          // Parse the links for the anchor tag and create a selector from it
          var ids = links.map(function (link) {
            return "[id=\"" + link.href.split("#").pop() + "\"]";
          });
          // Capture these from the panel or if nothing is returned, check the document
          return panel.querySelectorAll(ids.join(",")) || document.querySelectorAll(ids.join(","));
        }

        // NOTE: since the panel element is not necessarily pfe-jump-links-panel
        // it _could_ contain a shadowRoot with the sections defined in it
        return panel.querySelectorAll(".pfe-jump-links-panel__section") || panel.shadowRoot.querySelectorAll(".pfe-jump-links-panel__section") || panel.querySelectorAll("[id]");
      }
    }, {
      key: "links",
      get: function get() {
        return [].concat(toConsumableArray(this.container.querySelectorAll("a")));
      }
    }, {
      key: "items",
      get: function get() {
        return [].concat(toConsumableArray(this.shadowRoot.querySelectorAll("." + this.tag + "__item")));
      }

      // @TODO It seems like the offset is 0 when non-horizontal jumps links are mobile

    }, {
      key: "offsetValue",
      get: function get() {
        // If the offset attribute has been set, use that (no calculations)
        if (this.offset) return this.offset;

        // If the offset CSS variable has been set, use that (no calculations)
        // @TODO: deprecate --pfe-jump-links-panel--offset in 2.0 release
        // Note: deprecated @1.0 --jump-links-nav--nudge
        var offsetVariable = this.cssVariable("pfe-jump-links--offset") || this.cssVariable("pfe-jump-links-panel--offset");

        if (offsetVariable) {
          offsetVariable = this._castPropertyValue({
            type: Number
          }, Number.parseInt(offsetVariable, 10));
          if (offsetVariable && offsetVariable >= 0) return offsetVariable;
        }

        //--
        // If the offsets are not provided, calculate the height of what is currently sticky
        var height = 0;

        // Get the primary navigation height
        var navHeightVariable = this.cssVariable("pfe-navigation--Height--actual");
        if (navHeightVariable) {
          navHeightVariable = this._castPropertyValue({
            type: Number
          }, Number.parseInt(navHeightVariable, 10));
          if (navHeightVariable && navHeightVariable > 0) height = navHeightVariable;
        }

        // If this is mobile or horizontal & current stuck, return with the nav-height only
        if (this.stuck && (this.isMobile || this.horizontal)) return height;

        // If this is not a horizontal jump link, check if any other horizontal jump links exist
        var stickyJumpLinks = this.cssVariable("pfe-jump-links--Height--actual");
        if (stickyJumpLinks) {
          stickyJumpLinks = this._castPropertyValue({
            type: Number
          }, Number.parseInt(stickyJumpLinks, 10));
          if (stickyJumpLinks && stickyJumpLinks > 0) height = height + stickyJumpLinks;
        }

        // No offset if this is a horizontal element, should sit beneath the pfe-navigation (if it exists)
        return height;
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.10.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-jump-links-nav";
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }

      /**
       * List of all events in the component
       */

    }, {
      key: "events",
      get: function get() {
        return {
          activeNavItem: "pfe-jump-links-panel:active-navItem",
          change: "pfe-jump-links-panel:change",
          stuck: "pfe-jump-links-nav:stuck",
          resize: "resize",
          scroll: "scroll",
          keyup: "keyup"
        };
      }
    }, {
      key: "observer",
      get: function get() {
        return {
          childList: true,
          subtree: true,
          characterData: true
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          autobuild: {
            title: "Autobuild",
            type: Boolean
          },
          horizontal: {
            title: "Horizontal",
            type: Boolean,
            default: false
          },
          // @TODO: Document this more
          srText: {
            title: "Screen reader text",
            type: String,
            default: "Jump to section"
          },
          // Supports only lightest and darkest background colors
          color: {
            title: "Color",
            type: String,
            default: "lightest",
            values: ["lightest", "darkest"]
          },
          // @TODO Need to incorporate support for breakpoint customizations i.e., offset="@500px: 200, @800px: 150"
          offset: {
            title: "Offset",
            type: Number
          },
          // Breakpoint at which the nav switches to an accordion
          mobileBreakpoint: {
            title: "Mobile breakpoint (max-width)",
            type: String
          },
          accordionCollapseTiming: {
            title: "Number of ms to wait before collapsing the accordion on click",
            type: Number,
            default: 750
          },
          // Reflects if the nav is stuck in place
          // @TODO note this in the documentation as a readonly property
          stuck: {
            title: "Stickiness state",
            type: Boolean,
            attr: "stuck",
            observer: "_stickyHandler"
          },
          noHeader: {
            title: "Opt-out of the header region",
            type: Boolean
          },
          // @TODO: Deprecated in 2.0
          oldAutobuild: {
            alias: "autobuild",
            attr: "pfe-c-autobuild"
          },
          // @TODO: Deprecated in 2.0
          oldHorizontal: {
            alias: "horizontal",
            attr: "pfe-c-horizontal"
          },
          // @TODO: Deprecated in 2.0
          oldColor: {
            alias: "color",
            attr: "pfe-color"
          }
        };
      }
    }]);

    function PfeJumpLinksNav() {
      classCallCheck(this, PfeJumpLinksNav);

      var _this = possibleConstructorReturn(this, (PfeJumpLinksNav.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav)).call(this, PfeJumpLinksNav, {
        type: PfeJumpLinksNav.PfeType
      }));

      _this.currentActive;
      _this.isBuilding = false;
      _this.isVisible = false;

      // This flag indicates if the rebuild should update the light DOM
      _this.update = false;
      _this._panel, _this._sections;
      _this._clicked = false;

      _this.build = _this.build.bind(_this);
      _this.rebuild = _this.rebuild.bind(_this);
      _this.active = _this.active.bind(_this);
      _this.inactive = _this.inactive.bind(_this);
      _this.clearActive = _this.clearActive.bind(_this);
      _this.getActive = _this.getActive.bind(_this);
      _this.closeAccordion = _this.closeAccordion.bind(_this);
      _this.scrollToSection = _this.scrollToSection.bind(_this);
      _this.updateItem = _this.updateItem.bind(_this);
      _this.updateLightDOM = _this.updateLightDOM.bind(_this);

      _this._buildWrapper = _this._buildWrapper.bind(_this);
      _this._buildItem = _this._buildItem.bind(_this);
      _this._isValidLightDom = _this._isValidLightDom.bind(_this);
      _this._reportHeight = _this._reportHeight.bind(_this);
      _this._updateOffset = _this._updateOffset.bind(_this);
      _this._checkVisible = _this._checkVisible.bind(_this);

      _this._stickyHandler = _this._stickyHandler.bind(_this);
      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._scrollHandler = _this._scrollHandler.bind(_this);
      _this._resizeHandler = _this._resizeHandler.bind(_this);
      _this._mutationHandler = _this._mutationHandler.bind(_this);
      _this._panelChangedHandler = _this._panelChangedHandler.bind(_this);
      // this._keyboardHandler = this._keyboardHandler.bind(this);

      _this._observer = new MutationObserver(_this._mutationHandler);
      return _this;
    }

    createClass(PfeJumpLinksNav, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "connectedCallback", this).call(this);

        // Do not try to render navigation in IE11
        if (this.isIE11) {
          this.setAttribute("hidden", "");
          return;
        }

        // Attaches necessary listeners; does not include the mutation observer
        // because that is attached after processing the component
        this._attachListeners(PfeJumpLinksNav.events);

        // Check that the light DOM is there and accurate
        if (!this.autobuild && this._isValidLightDom()) {
          this.updateLightDOM();
        } else if (this.autobuild) {
          // Try to build the navigation based on the panel
          this.build();
        }

        // Capture the updated UL tag
        var menu = this.querySelector("ul, ol");
        // If the menu is found, process and move to the shadow DOM
        if (!menu) {
          // Throw a warning if the menu could not be built
          this.warn("Navigation could not be built.");
        } else {
          // Move the menu into the shadow DOM
          this._toShadowDOM(menu);
          // Update the offset if necessary
          this._updateOffset();

          // Check if this navigation element is visible
          var visible = this._checkVisible();
          var idx = this.getActive();

          // Activate initial active item
          if (visible && idx >= 0) this.active(idx);else if (visible) this.active(0);
          // @TODO: would be good to set the last item as active if the visible nav is below this one
        }

        // Trigger the mutation observer
        this._observer.observe(this, PfeJumpLinksNav.observer);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "disconnectedCallback", this).call(this);
        this._dettachListeners(PfeJumpLinksNav.events);
      }

      /**
       * Builds the navigation based on the provided data or the defined sections
       * @param {NodeList} [sections=this.sections] List of the sections the navigation should link to
       */

    }, {
      key: "build",
      value: function build() {
        var sections = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.sections;

        // Can't build the navigation dynamically without sections defined
        if (!sections) return;

        // Convert NodeList to array
        sections = [].concat(toConsumableArray(sections));

        this.isBuilding = true;

        // Validations complete, start the build
        var child = void 0;
        var wrapper = this._buildWrapper();
        var currentWrapper = wrapper;
        var previousWrapper = currentWrapper;

        // Build markup for the navigation
        for (var i = 0; i < sections.length; i++) {
          var sectionHeading = sections[i];
          var is_subsection = sectionHeading.classList.contains("sub-section");
          var has_subsection = sectionHeading.classList.contains("has-sub-section");

          // Get ID for the navigation
          var id = sectionHeading.id;
          if (!id) {
            var spacer = sectionHeading.previousElementSibling;
            if (spacer && spacer.classList.contains("pfe-jump-links__section--spacer") && spacer.id) {
              id = spacer.id;
            } else {
              sectionHeading.id = this.randomId.replace("pfe-", "pfe-jump-links--");
              id = sectionHeading.id;
            }
          }

          // Build the li tag; the child item
          child = this._buildItem({
            target: id,
            content: sectionHeading.getAttribute("nav-label") || sectionHeading.textContent,
            subsection: has_subsection
          }, is_subsection);

          // Add the item to the list
          currentWrapper.appendChild(child);

          if (has_subsection) {
            previousWrapper = currentWrapper;
            currentWrapper = this._buildWrapper("sub-nav");
            child.appendChild(currentWrapper);
          }

          // If the next item exists and is a sub-section, reset the ul build to the previous one
          if (sections[i + 1] && !sections[i + 1].classList.contains("sub-section")) {
            currentWrapper = previousWrapper || wrapper;
          }
        }

        this.isBuilding = false;

        // Return the mark-up
        this.innerHTML = "";
        this.appendChild(wrapper);
      }

      /**
       * Close the mobile accordion
       * @requires {Boolean} [this.isMobile] Indicates whether the navigation is in a mobile state
       * @requires {Boolean} [this.accordionCollapseTiming=750]
       */

    }, {
      key: "closeAccordion",
      value: function closeAccordion() {
        if (!this.isMobile) return;

        var accordion = this.shadowRoot.querySelector("pfe-accordion");
        // After a short wait, close the accordion
        setTimeout(function () {
          Promise.all([customElements.whenDefined("pfe-accordion")]).then(function () {
            accordion.collapseAll();
          });
        }, this.accordionCollapseTiming);
      }

      /**
       * Rebuild the navigation if the sections or panels are updated
       */

    }, {
      key: "rebuild",
      value: function rebuild() {
        var _this3 = this;

        // If the build is happening, wait until it is complete
        if (this.isBuilding) {
          setTimeout(this.rebuild, 10);
        } else {
          // Re-render the template if necessary
          // If this is a mobile state and it does use an accordion, or vise-versa
          if (this.isMobile && !this.shadowRoot.querySelector("pfe-accordion") || !this.isMobile && this.shadowRoot.querySelector("pfe-accordion")) {
            this.render();
          }

          var menu = void 0;

          if (this.autobuild && this.update) {
            menu = this.build();
          } else {
            menu = this.querySelector("ul");
          }

          // Move the menu into the shadow DOM
          if (menu && this.container.innerHTML !== menu.outerHTML.toString()) {
            this.container.innerHTML = menu.outerHTML.toString();
          }

          this._updateOffset();

          // Activate initial active item
          this.active(this.getActive());

          // Attach the event listeners
          this.items.forEach(function (item) {
            item.querySelector("a").addEventListener("click", _this3._clickHandler);
          });
        }

        this.update = false;
      }

      /**
       * @param {} item Accepts an index or the link element itself
       */

    }, {
      key: "active",
      value: function active(item) {
        var idx = void 0;
        var items = this.items;

        if (typeof item === "number") idx = item;else idx = items.findIndex(function (el) {
          return el === item;
        });

        // If idx is less than 0, it could not be found
        if (idx < 0 || idx >= items.length || !items[idx]) return;

        // If found, clear current active items
        this.clearActive();
        this.currentActive = idx;

        var li = items[idx].closest("li");
        var parentli = li.closest("ul").closest("li");
        var is_subsection = li.classList.contains("sub-section");
        var has_subsection = li.classList.contains("has-sub-section");

        // Set the item's active attribute
        li.setAttribute("active", "");

        if (has_subsection) li.setAttribute("expand", "");else if (is_subsection) parentli.setAttribute("expand", "");

        // Emit event for tracking
        this.emitEvent(PfeJumpLinksNav.events.activeNavItem, {
          detail: {
            activeNavItem: idx
          }
        });
      }
    }, {
      key: "getActive",
      value: function getActive() {
        // If there are no sections, we can't process
        // @TODO: should this processing even be happening?
        if (!this.sections) return;

        // Make an array from the node list
        var sections = [].concat(toConsumableArray(this.sections));

        // Capture the offset to prevent recalculation below
        var offset = this.offsetValue;

        // Get all the sections that match this point in the scroll
        var matches = sections.filter(function (section, idx) {
          var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

          // @TODO: The next logic only works for scrolling down; need to reverse for scrolling up
          var next = sections[idx + 1];
          var nextTop = next ? next.getBoundingClientRect().top : 0;
          var sectionTop = section.getBoundingClientRect().top;

          // If the top of this section is greater than/equal to the offset
          // and if there is a next item, that item is
          // or the bottom is less than the height of the window
          return sectionTop >= 0 && sectionTop <= viewportHeight && (!next || nextTop >= offset &&
          // Check whether the previous section is closer than the next section
          offset - sectionTop < nextTop - offset);
        });

        // Don't change anything if no items were found
        if (!matches || matches.length === 0) return;

        // Identify the first one queried as the current section
        return sections.indexOf(matches[0]);
      }
    }, {
      key: "inactive",
      value: function inactive(item) {
        var idx = void 0;
        var items = this.items;

        if (typeof item === "number") idx = item;else idx = items.findIndex(function (el) {
          return el === item;
        });

        // If idx is less than 0, it could not be found
        if (idx < 0 || idx >= items.length || !items[idx]) return;

        var li = items[idx].closest("li");
        var parentli = li.closest("ul").closest("li");
        var is_subsection = li.classList.contains("sub-section");
        var has_subsection = li.classList.contains("has-sub-section");

        li.removeAttribute("active");

        if (has_subsection) li.removeAttribute("expand");else if (is_subsection) parentli.removeAttribute("expand");
      }
    }, {
      key: "clearActive",
      value: function clearActive() {
        var _this4 = this;

        var items = this.items;
        items.forEach(function (item) {
          return _this4.inactive(item);
        });
      }

      /**
       * Attach the listeners
       * @param {Object} Definition of available events
       */

    }, {
      key: "_attachListeners",
      value: function _attachListeners(events) {
        // Listen for a change in the panel content if the navigation is autobuilt
        // need to reflect changes in the navigation markup
        if (this.autobuild) {
          document.addEventListener(PfeJumpLinksNav.events.change, this._panelChangedHandler);
        }

        window.addEventListener(events.resize, this._resizeHandler);
        window.addEventListener(events.scroll, this._scrollHandler);
        // window.addEventListener(events.keyup, this._keyboardHandler);

        // If the stickiness changes, update the sticky navigation offset
        window.addEventListener(events.stuck, this._updateOffset);

        // @TODO respond to URL change? Ensure anchor link alignment accounts for sticky nav(s)
        // window.addEventListener("locationchange", (evt) => console.log("locationchange", evt));
        // window.addEventListener("hashchange", (evt) => console.log("hashchange", evt));
      }

      /**
       * Remove the listeners
       * @param {Object} Definition of available events
       */

    }, {
      key: "_dettachListeners",
      value: function _dettachListeners(events) {
        this._observer.disconnect();

        document.removeEventListener(events.change, this._panelChangedHandler);

        window.removeEventListener(events.resize, this._resizeHandler);
        window.removeEventListener(events.scroll, this._scrollHandler);
        window.removeEventListener(events.keyup, this._keyboardHandler);

        // If the stickiness changes, update the sticky navigation offset
        window.removeEventListener(events.stuck, this._updateOffset);

        // @TODO respond to URL change? Ensure anchor link alignment accounts for sticky nav(s)
        // window.removeEventListener("locationchange", (evt) => console.log("locationchange", evt));
        // window.removeEventListener("hashchange", (evt) => console.log("hashchange", evt));
      }
    }, {
      key: "_buildItem",
      value: function _buildItem(data) {
        var isSubSection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var item = document.createElement("li");
        item.className = this.tag + "__item";

        var link = document.createElement("a");
        link.className = this.tag + "__link";
        link.href = "#" + data.target;
        link.setAttribute("data-target", data.target);
        link.innerHTML = data.content;

        if (data.subsection) item.classList.add("has-sub-section");
        if (isSubSection) item.classList.add("sub-section");

        item.appendChild(link);
        return item;
      }
    }, {
      key: "_buildWrapper",
      value: function _buildWrapper() {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "pfe-jump-links-nav";

        var wrapper = document.createElement("ul");
        wrapper.className = className;
        return wrapper;
      }
    }, {
      key: "_siblingJumpLinks",
      value: function _siblingJumpLinks() {
        var _this5 = this;

        var filterMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (item) {
          return item !== _this5;
        };

        return PfeJumpLinksNav.instances.filter(filterMethod);
      }

      /**
       * Report the height of the jump links navigation
       */

    }, {
      key: "_reportHeight",
      value: function _reportHeight() {
        var height = 0;

        // Check all elements to see if any are sticky and in horizontal or mobile state
        var stuckItems = this._siblingJumpLinks(function (item) {
          return item.stuck && (item.horizontal || item.isMobile);
        });

        if (stuckItems.length > 0) {
          // Get the height of the last sticky element in the DOM tree
          height = stuckItems[stuckItems.length - 1].getBoundingClientRect().height;

          // @TODO Do other items in the stack need to be unstuck?
          // Unstick the other items by popping off the last item in the array
          // stuckItems.pop();
          // Set the rest of the items stuck attribute to false
          // stuckItems.forEach(item => item.stuck = false);
        }

        // Check if we need to update the variable:
        var currentHeight = this.cssVariable("pfe-jump-links--Height--actual", null, document.body);
        if (!currentHeight || Number.parseInt(currentHeight, 10) !== height) {
          // If there are no other sticky jump links, set the height on the body
          // Note: we set it on the body to be consistent with pfe-navigation
          this.cssVariable("pfe-jump-links--Height--actual", height + "px", document.body);
        }
      }

      /**
       * Validate the provided light DOM and provide helpful console messages
       * to facilitate debugging
       */

    }, {
      key: "_isValidLightDom",
      value: function _isValidLightDom() {
        var valid = true;

        if ((!this.hasLightDOM() || !this.querySelector("ul") && !this.querySelector("ol")) && !this.autobuild) {
          this.warn("This component requires a list in the light DOM to .\nAlternatively, add the `autobuild` attribute to dynamically generate the list from the provided panel.");
          valid = false;
        }

        if (this.logo && !this.horizontal) {
          this.warn("The logo slot is NOT supported in vertical jump links.");
          // Gentle warning, CSS force-hides this content
          // valid = false;
        }

        if (this.cta && !this.horizontal) {
          this.warn("The link slot is NOT supported in vertical jump links.");
          // Gentle warning, CSS force-hides this content
          // valid = false;
        }

        // Gentle warning
        if (Number.isInteger(Number(this.customVar))) {
          this.warn("Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly.");
        }

        return valid;
      }
    }, {
      key: "updateItem",
      value: function updateItem(item) {
        var _this6 = this;

        var nested = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        item.classList = this.tag + "__item" + (nested ? " sub-section" : "");
        var link = item.querySelector("a");
        link.classList = this.tag + "__link";
        var nestedList = item.querySelector("ul");
        if (nestedList) {
          item.classList.add("has-sub-section");
          nestedList.querySelectorAll(":scope > li").forEach(function (item) {
            return _this6.updateItem(item, true);
          });
        }
      }
    }, {
      key: "updateLightDOM",
      value: function updateLightDOM() {
        var _this7 = this;

        var menu = this.querySelector("ul");

        // Update the mark-up in the light DOM if necessary
        // If the class is not already on the list wrapper
        menu.classList = this.tag;

        // Ensure valid identifiers on the provided mark-up
        menu.querySelectorAll(":scope > li").forEach(function (item) {
          return _this7.updateItem(item);
        });
      }
    }, {
      key: "_toShadowDOM",
      value: function _toShadowDOM(menu) {
        var _this8 = this;

        if (this.container.innerHTML !== menu.outerHTML.toString()) {
          this.container.innerHTML = menu.outerHTML.toString();
        }

        // Attach the event listeners
        this.links.forEach(function (link) {
          link.addEventListener("click", _this8._clickHandler);
        });
      }
    }, {
      key: "_checkVisible",
      value: function _checkVisible() {
        this.isVisible = this.getBoundingClientRect().top <= document.documentElement.clientHeight && this.getBoundingClientRect().right >= 0 && this.getBoundingClientRect().bottom >= 0 && this.getBoundingClientRect().left <= document.documentElement.clientWidth;

        return this.isVisible;
      }

      // This updates the offset value on this component based on the reported offset height on the document

    }, {
      key: "_updateOffset",
      value: function _updateOffset() {
        this._reportHeight();

        // Set the offset on the nav element
        if (this.horizontal) this.style.top = this.offsetValue + "px";else this.style.top = this.offsetValue + 20 + "px";
      }

      /**
       * Click events on the navigation items
       * Prevents conflicts between scroll state and user choice
       * @param {ClickEvent} evt
       */

    }, {
      key: "_clickHandler",
      value: function _clickHandler(evt) {
        var link = evt.target;
        var li = link.closest("." + this.tag + "__item");

        // Set this item as active
        this.active(li);

        // Escaping here if no sections are defined and letting default behavior
        // handle the scrolling
        if (!this.sections) return;

        var idx = [].concat(toConsumableArray(this.sections)).findIndex(function (item) {
          return item.id === link.hash.replace("#", "");
        });

        // Escaping if we can't find this link in our sections
        if (idx < 0) return;

        // If we have defined sections, use custom scrolling placement
        evt.preventDefault();

        this._clicked = true;

        // Update the URL but don't impact the back button
        history.replaceState({}, "", link.href);

        this.scrollToSection(idx);
      }

      /**
       * This handles scrolling to a section in the panel on click
       * @param {Number} Index of the section to scroll-to
       * @TODO On page load, if an anchor exists, fire this event
       */

    }, {
      key: "scrollToSection",
      value: function scrollToSection(idx) {
        var _this9 = this;

        // Get the offset value to scroll-to
        var section = this.sections[idx];
        var offset = this.offsetValue;

        // Update stickiness if necessary
        this.stuck = !!(this.getBoundingClientRect().top === offset);

        // Initialize the target we want to scroll to
        var scrollTarget = window.pageYOffset + section.getBoundingClientRect().top;

        // If the section uses the spacers, don't include the calculations below
        if (!section.classList.contains("pfe-jump-links__section--spacer")) {
          // Top of the section minus the calculated offset via nav
          scrollTarget = scrollTarget - offset;

          // Account for it's height as well
          // this.offsetVar does not account for this because this only affects scrolling to sections
          var height = 0;

          if (this.horizontal) height = this.getBoundingClientRect().height;

          // On mobile, get the accordion-header height rather than the height of the full component
          // this prevents the height from taking into account the open accordion tray
          if (this.isMobile) {
            var accordionHeader = this.shadowRoot.querySelector("pfe-accordion-header");
            height = accordionHeader.getBoundingClientRect().height - this.getBoundingClientRect().height;
          }

          if (height > 0) scrollTarget = scrollTarget - height;
        }

        // If the section has a custom offset attribute defined, use that; default to 20
        // 20 default is so that the headings aren't smooshed against the sticky navigation
        var itemOffset = 20;
        if (section.hasAttribute("offset")) {
          // Use the property casting from PFElement
          var sectionOffsetProp = this._castPropertyValue({
            type: Number
          }, Number.parseInt(section.getAttribute("offset"), 10));
          if (sectionOffsetProp) itemOffset = sectionOffsetProp;
        } else if (this.panel && this.panel.offset) {
          itemOffset = this.panel.offset;
        }

        // This is the point that we're scrolling to
        scrollTarget = scrollTarget - itemOffset;

        // Prevent negative position scrolling
        if (scrollTarget < 0) scrollTarget = 0;

        // Use JS to fire the scroll event
        // smooth-scroll CSS support is spotty and complicated
        // especially as relates to offsets; this was a faster
        // solution for managing state changes
        window.scroll({
          top: scrollTarget,
          behavior: "smooth"
        });

        // Close the accordion
        this.closeAccordion();

        // Update stickiness if necessary
        this.stuck = !!(this.getBoundingClientRect().top === offset);

        setTimeout(function () {
          // Update the focus state
          section.focus();

          _this9._clicked = false;
        }, 1000);
      }

      /**
       * Sticky state handler; emits event with change in sticky state
       * @param {String} oldVal
       * @param {String} newVal
       */

    }, {
      key: "_stickyHandler",
      value: function _stickyHandler(oldVal, newVal) {
        // If there is no change, do nothing
        if (oldVal === newVal) return;

        this._reportHeight();

        this.emitEvent(PfeJumpLinksNav.events.stuck, {
          detail: {
            stuck: newVal
          }
        });
      }

      /**
       * Scrolling event processing; control stickiness and active state
       */

    }, {
      key: "_scrollHandler",
      value: function _scrollHandler() {
        var _this10 = this;

        // If this is from a click event, do nothing
        if (this._clicked) return;

        clearTimeout(this._scrollHandler._tId);
        this._scrollHandler._tId = setTimeout(function () {
          // Check the current visibility of this jump links navigation
          _this10._checkVisible();

          // If this navigation is not visible, exit processing now
          if (!_this10.isVisible) return;

          _this10.stuck = !!(_this10.getBoundingClientRect().top === _this10.offsetValue);

          var currentIdx = _this10.getActive();

          // If that section isn't already active,
          // remove active from the other links and make it active
          if (currentIdx >= 0 && currentIdx !== _this10.currentActive) {
            _this10.currentActive = currentIdx;

            _this10.active(currentIdx);
          }
        }, 10);
      }

      /**
       * Rebuild the navigation on resize if the view has changed from mobile->desktop or vise versa
       */

    }, {
      key: "_resizeHandler",
      value: function _resizeHandler() {
        this.rebuild();
      }

      /**
       * Run the rebuild when the mutation observer sees change
       */

    }, {
      key: "_mutationHandler",
      value: function _mutationHandler() {
        // Ignore the mutation if using autobuild
        if (this.autobuild) return;

        this.update = true;
        this.rebuild();
      }

      /**
       * Panel changed event
       */

    }, {
      key: "_panelChangedHandler",
      value: function _panelChangedHandler() {
        // If this is manually built, we don't need to process the panel change
        if (!this.autobuild) return;

        this.update = true;

        // Reset the sections object to allow refetching
        this._sections = null;

        this.rebuild();
      }

      /**
       * Keyboard event manager
       */
      // @TODO: Add a keyboard handler when focus is set on the parent via keyboard; should expand
      // _keyboardHandler() {
      // Handle the focus state to expand parent when child is focused
      // }

    }]);
    return PfeJumpLinksNav;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeJumpLinks 1.10.0
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

  var PfeJumpLinksPanel = function (_PFElement) {
    inherits(PfeJumpLinksPanel, _PFElement);
    createClass(PfeJumpLinksPanel, [{
      key: "html",


      /**
       * No custom styles for the panel or template mark-up; just a slot
       */
      get: function get() {
        return "<slot></slot>";
      }
    }, {
      key: "sections",

      /**
       * @param {NodeList} Returns all elements from the panel's light DOM with the class .pfe-jump-links-panel__section
       */
      get: function get() {
        return this.querySelectorAll("." + this.tag + "__section");
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.10.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-jump-links-panel";
      }
    }, {
      key: "events",
      get: function get() {
        return {
          change: this.tag + ":change"
        };
      }
    }, {
      key: "observer",
      get: function get() {
        return {
          childList: true,
          subtree: true
          // characterData: true,
          // attributes: true,
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
          offset: {
            title: "Offset",
            type: Number
          },
          scrolltarget: {
            title: "Scroll target",
            type: String
          },
          spacers: {
            title: "Inject spacers",
            type: Boolean,
            default: false,
            observer: "_makeSpacers"
          },
          // @TODO: Deprecated in 1.0
          oldOffset: {
            alias: "offset",
            attr: "pfe-c-offset"
          },
          // @TODO: Deprecated in 1.0
          oldScrolltarget: {
            alias: "scrolltarget",
            attr: "pfe-c-scrolltarget"
          }
        };
      }
    }]);

    function PfeJumpLinksPanel() {
      classCallCheck(this, PfeJumpLinksPanel);

      var _this = possibleConstructorReturn(this, (PfeJumpLinksPanel.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel)).call(this, PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType }));

      _this._init = _this._init.bind(_this);
      _this._makeSpacers = _this._makeSpacers.bind(_this);
      _this._isValidMarkup = _this._isValidMarkup.bind(_this);

      _this._observer = new MutationObserver(function () {
        _this._init();

        // Emit an event indicating a change to the panel
        _this.emitEvent(PfeJumpLinksPanel.events.change, {});
      });
      return _this;
    }

    createClass(PfeJumpLinksPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "connectedCallback", this).call(this);

        this._init();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "disconnectedCallback", this).call(this);
        this._observer.disconnect();
      }
    }, {
      key: "_isValidMarkup",
      value: function _isValidMarkup() {
        if ([].concat(toConsumableArray(this.sections)).length === 0) {
          this.warn("This panel does not contain any headings labeled with the " + this.tag + "__section class. Please add that class and an ID to any heading you would like surfaced in the jump links navigation.");
        }
      }
    }, {
      key: "_makeSpacers",
      value: function _makeSpacers() {
        if (!this.spacers) return;
        if (!this.sections || [].concat(toConsumableArray(this.sections)).length <= 0) return;

        // Disconnect the mutation observer to update the spacers
        this._observer.disconnect();

        [].concat(toConsumableArray(this.sections)).forEach(function (section) {
          var parentEl = section.parentNode;
          var spacer = section.previousElementSibling;

          // If the previous element is not a spacer, create one
          if (!spacer || !spacer.classList.contains("pfe-jump-links__section--spacer")) {
            spacer = document.createElement("div");
            spacer.classList.add("pfe-jump-links__section--spacer");
            parentEl.insertBefore(spacer, section);
          }

          // Move the ID from the section to the spacer
          if (section.id && (!spacer.id || spacer.id !== section.id)) {
            spacer.id = section.id;
            section.removeAttribute("id");
            section.setAttribute("data-target", spacer.id);
          }

          spacer.style.marginTop = "calc(-1 * (var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px)))";
          spacer.style.height = "calc(var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px))";
        });

        // Set up the mutation observer
        this._observer.observe(this, PfeJumpLinksPanel.observer);
      }
    }, {
      key: "_init",
      value: function _init() {
        // Validate and throw warnings about improper markup
        this._isValidMarkup();

        // Adding spacers to the panel is opt-in
        // note: this was because determining the scroll-to point
        // was easier with the scroll animation than working through
        // cross-browser support for smooth scroll CSS (looking at Safari)
        this._makeSpacers();
      }
    }]);
    return PfeJumpLinksPanel;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeJumpLinks 1.10.0
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

  // @TODO Migrate pfe-jump-links-nav to pfe-jump-links in 2.0?
  // class PfeJumpLinks extends PfeJumpLinksNav {
  //     static get tag() {
  //       return "pfe-jump-links";
  //     }
  // }
  // PFElement.create(PfeJumpLinks);

  PFElement.create(PfeJumpLinksNav);
  PFElement.create(PfeJumpLinksPanel);

  var pfeJumpLinks_umd = { PfeJumpLinksNav: PfeJumpLinksNav, PfeJumpLinksPanel: PfeJumpLinksPanel };

  return pfeJumpLinks_umd;

})));
//# sourceMappingURL=pfe-jump-links.umd.js.map
