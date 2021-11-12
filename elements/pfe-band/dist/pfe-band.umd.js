(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeBand = factory(global.PFElement));
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
   * PatternFly Elements: PfeBand 1.12.0
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

  var PfeBand = function (_PFElement) {
    inherits(PfeBand, _PFElement);
    createClass(PfeBand, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([color=accent]),:host([color=base]),:host([color=complement]),:host([color=darker]),:host([color=darkest]),:host([color=lighter]),:host([color=lightest]){background-color:#fff!important;color:#151515!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{--context:var(--pfe-band--context, light);display:block;border:1px solid transparent;border:var(--pfe-band--Border,var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent);background-color:#f0f0f0;background-color:var(--pfe-band--BackgroundColor,var(--pfe-theme--color--surface--base,#f0f0f0));background-position:center center;background-position:var(--pfe-band--BackgroundPosition,center center);color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);padding:calc(calc(1rem * 4)/ 2) calc(1rem * 1);padding:calc(var(--pfe-band--Padding--vertical,calc(var(--pfe-theme--container-spacer,1rem) * 4))/ 2) var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1))}@media (min-width:576px){:host{padding:calc(1rem * 4) calc(1rem * 1);padding:var(--pfe-band--Padding,var(--pfe-band--Padding--vertical,calc(var(--pfe-theme--container-spacer,1rem) * 4)) var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)))}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}@media print{:host{background-color:#fff!important;background-image:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}}@media print{:host{border-radius:3px;border:1px solid #d2d2d2;padding:2rem 1rem}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;background-image:none!important;color:#151515!important;padding:2rem 1rem}}@media screen and (-ms-high-contrast:active) and (min-width:576px),screen and (-ms-high-contrast:none) and (min-width:576px){:host{padding:4rem 1rem}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([color=darker]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darker, #3c3f42);--pfe-band--context:var(--pfe-theme--color--surface--darker--context, dark)}:host([color=darkest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-band--context:var(--pfe-theme--color--surface--darkest--context, dark)}:host([color=base]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--base, #f0f0f0);--pfe-band--context:var(--pfe-theme--color--surface--base--context, light)}:host([color=lighter]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lighter, #f0f0f0);--pfe-band--context:var(--pfe-theme--color--surface--lighter--context, light)}:host([color=lightest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-band--context:var(--pfe-theme--color--surface--lightest--context, light)}:host([color=accent]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--accent, #004080);--pfe-band--context:var(--pfe-theme--color--surface--accent--context, saturated)}:host([color=complement]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--complement, #002952);--pfe-band--context:var(--pfe-theme--color--surface--complement--context, saturated)}:host([size=small]){padding:calc(calc(1rem * 4)/ 4) calc(1rem * 1);padding:calc(var(--pfe-band--Padding--vertical,calc(var(--pfe-theme--container-spacer,1rem) * 4))/ 4) var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=small]){padding:1rem}}.pfe-band__container{margin:0 auto}:host(:not([full-width])) .pfe-band__container{max-width:auto;max-width:var(--pfe-band--Width,auto)}@media screen and (min-width:768px){:host(:not([full-width])) .pfe-band__container{max-width:calc(768px - (calc(1rem * 1) * 4));max-width:var(--pfe-band--Width,calc(768px - (var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 4)))}}@media screen and (min-width:992px){:host(:not([full-width])) .pfe-band__container{max-width:calc(992px - (calc(1rem * 1) * 4));max-width:var(--pfe-band--Width,calc(992px - (var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 4)))}}@media screen and (min-width:1200px){:host(:not([full-width])) .pfe-band__container{max-width:calc(1200px - (calc(1rem * 1) * 4));max-width:var(--pfe-band--Width,calc(1200px - (var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 4)))}}@supports (display:grid){.pfe-band__container{display:-ms-grid;display:grid;-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:auto;grid-template-columns:auto;grid-template-areas:\"body\";grid-row-gap:1rem;grid-row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,1rem));row-gap:1rem;row-gap:var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,1rem));grid-column-gap:calc(1rem * 3);grid-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-webkit-column-gap:calc(1rem * 3);-moz-column-gap:calc(1rem * 3);column-gap:calc(1rem * 3);-webkit-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-moz-column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));column-gap:var(--pfe-band--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3))}:host([has_header]) .pfe-band__container{grid-template-areas:\"header\" \"body\"}:host([has_aside]) .pfe-band__container{grid-template-areas:\"body\" \"aside\"}@media (max-width:767px){:host([has_aside][aside-mobile=top]) .pfe-band__container{grid-template-areas:\"aside\" \"body\"}}@media (min-width:768px){:host([has_aside]) .pfe-band__container{grid-template-areas:\"body aside\"}:host([has_aside][aside-desktop=left]) .pfe-band__container{grid-template-areas:\"aside body\"}}:host([has_footer]) .pfe-band__container{grid-template-areas:\"body\" \"footer\"}:host([has_header][has_aside]) .pfe-band__container{grid-template-areas:\"header\" \"body\" \"aside\"}@media (max-width:767px){:host([has_header][has_aside][aside-mobile=top]) .pfe-band__container{grid-template-areas:\"aside\" \"header\" \"body\"}}@media (min-width:768px){:host([has_header][has_aside]) .pfe-band__container{grid-template-areas:\"header header\" \"body aside\"}:host([has_header][has_aside][aside-desktop=left]) .pfe-band__container{grid-template-areas:\"header header\" \"aside body\"}:host([has_header][has_aside][aside-height=full]) .pfe-band__container{grid-template-areas:\"header aside\" \"body aside\"}:host([has_header][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container{grid-template-areas:\"aside header\" \"aside body\"}}:host([has_header][has_footer]) .pfe-band__container{grid-template-areas:\"header\" \"body\" \"footer\"}:host([has_footer][has_aside]) .pfe-band__container{grid-template-areas:\"body\" \"aside\" \"footer\"}@media (max-width:767px){:host([has_footer][has_aside][aside-mobile=top]) .pfe-band__container{grid-template-areas:\"aside\" \"body\" \"footer\"}}@media (min-width:768px){:host([has_footer][has_aside]) .pfe-band__container{grid-template-areas:\"body aside\" \"footer footer\"}:host([has_footer][has_aside][aside-desktop=left]) .pfe-band__container{grid-template-areas:\"aside body\" \"footer footer\"}:host([has_footer][has_aside][aside-height=full]) .pfe-band__container{grid-template-areas:\"body aside\" \"footer aside\"}:host([has_footer][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container{grid-template-areas:\"aside body\" \"aside footer\"}}:host([has_header][has_aside][has_footer]) .pfe-band__container{grid-template-areas:\"header\" \"body\" \"footer\" \"aside\"}@media (max-width:767px){:host([has_header][has_aside][has_footer][aside-mobile=top]) .pfe-band__container{grid-template-areas:\"aside\" \"header\" \"body\" \"footer\"}}@media (min-width:768px){:host([has_header][has_aside][has_footer]) .pfe-band__container{grid-template-areas:\"header header\" \"body aside\" \"footer footer\"}:host([has_header][has_aside][has_footer][aside-desktop=left]) .pfe-band__container{grid-template-areas:\"header header\" \"aside body\" \"footer footer\"}:host([has_header][has_aside][has_footer][aside-height=full]) .pfe-band__container{grid-template-areas:\"header aside\" \"body aside\" \"footer aside\"}:host([has_header][has_aside][has_footer][aside-desktop=left][aside-height=full]) .pfe-band__container{grid-template-areas:\"aside header\" \"aside body\" \"aside footer\"}}@media (min-width:768px){.pfe-band__container{-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr;grid-template-columns:1fr}.pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside]) .pfe-band__container{-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr 240px;grid-template-columns:1fr 240px;-ms-grid-columns:1fr var(--pfe-band--Width__aside--sm,240px);grid-template-columns:1fr var(--pfe-band--Width__aside--sm,240px)}:host([has_aside]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}:host([has_aside]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}:host([has_aside][aside-desktop=left]) .pfe-band__container{-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:240px 1fr;grid-template-columns:240px 1fr;-ms-grid-columns:var(--pfe-band--Width__aside--sm,240px) 1fr;grid-template-columns:var(--pfe-band--Width__aside--sm,240px) 1fr}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}}@media (min-width:992px){:host([has_aside]) .pfe-band__container{-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr 300px;grid-template-columns:1fr 300px;-ms-grid-columns:var(--pfe-band--layout,1fr var(--pfe-band--Width__aside--lg,300px));grid-template-columns:var(--pfe-band--layout,1fr var(--pfe-band--Width__aside--lg,300px))}:host([has_aside]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}:host([has_aside][aside-desktop=left]) .pfe-band__container{-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:300px 1fr;grid-template-columns:300px 1fr;-ms-grid-columns:var(--pfe-band--layout,var(--pfe-band--Width__aside--lg,300px) 1fr);grid-template-columns:var(--pfe-band--layout,var(--pfe-band--Width__aside--lg,300px) 1fr)}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([has_aside][aside-desktop=left]) .pfe-band__container>:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}}}:host([full-width]) .pfe-band__container{max-width:100%;max-width:var(--pfe-band--Width,100%)}@media screen and (min-width:768px){:host([full-width]) .pfe-band__container{width:calc(100% - calc(1rem * 1) * 4);width:calc(100% - var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 4)}}@media screen and (min-width:992px){:host([full-width]) .pfe-band__container{width:calc(100% - calc(1rem * 1) * 4);width:calc(100% - var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 4)}}@media screen and (min-width:1200px){:host([full-width]) .pfe-band__container{width:calc(100% - calc(1rem * 1) * 8);width:calc(100% - var(--pfe-band--Padding--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 1)) * 8)}}.pfe-band__container,.pfe-band__wrapper{width:100%;margin-bottom:calc(-1 * 1rem);margin-bottom:calc(-1 * var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,1rem)));margin-right:calc(-1 * 1rem);margin-right:calc(-1 * var(--pfe-band--gutter--vertical,var(--pfe-theme--container-spacer,1rem)))}@supports (display:grid){.pfe-band__container,.pfe-band__wrapper{margin:0 auto}}:host([full-width]) .pfe-band__wrapper{max-width:100%;max-width:var(--pfe-band--Width,100%)}.pfe-band__aside{height:100%}slot[name=pfe-band--aside]{display:block;height:100%}.pfe-band__header{margin-bottom:1rem;margin-bottom:var(--pfe-band__header--gutter--vertical,var(--pfe-theme--container-spacer,1rem));margin-right:1rem;margin-right:var(--pfe-band__header--gutter--vertical,var(--pfe-theme--container-spacer,1rem))}@supports (display:grid){.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;grid-area:header;margin-bottom:0;margin-right:0}:host([has_header][has_aside]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1}:host([has_header][has_footer]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}:host([use-grid]) .pfe-band__header{display:-ms-grid;display:grid;-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__header--layout,1fr);grid-template-columns:var(--pfe-band__header--layout,1fr);grid-row-gap:1rem;grid-row-gap:var(--pfe-band__header--gutter--vertical,var(--pfe-theme--container-spacer,1rem));row-gap:1rem;row-gap:var(--pfe-band__header--gutter--vertical,var(--pfe-theme--container-spacer,1rem));grid-column-gap:calc(1rem * 3);grid-column-gap:var(--pfe-band__header--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-webkit-column-gap:calc(1rem * 3);-moz-column-gap:calc(1rem * 3);column-gap:calc(1rem * 3);-webkit-column-gap:var(--pfe-band__header--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-moz-column-gap:var(--pfe-band__header--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));column-gap:var(--pfe-band__header--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3))}:host([use-grid]) .pfe-band__header>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([use-grid]) .pfe-band__header>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}.pfe-band__body{margin-bottom:1rem;margin-bottom:var(--pfe-band__body--gutter--vertical,var(--pfe-theme--container-spacer,1rem));margin-right:1rem;margin-right:var(--pfe-band__body--gutter--vertical,var(--pfe-theme--container-spacer,1rem))}@supports (display:grid){.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1;grid-area:body;margin-bottom:0;margin-right:0}:host([has_header]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_footer]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_header][has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_footer]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([use-grid]) .pfe-band__body{display:-ms-grid;display:grid;-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__body--layout,1fr);grid-template-columns:var(--pfe-band__body--layout,1fr);grid-row-gap:1rem;grid-row-gap:var(--pfe-band__body--gutter--vertical,var(--pfe-theme--container-spacer,1rem));row-gap:1rem;row-gap:var(--pfe-band__body--gutter--vertical,var(--pfe-theme--container-spacer,1rem));grid-column-gap:calc(1rem * 3);grid-column-gap:var(--pfe-band__body--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-webkit-column-gap:calc(1rem * 3);-moz-column-gap:calc(1rem * 3);column-gap:calc(1rem * 3);-webkit-column-gap:var(--pfe-band__body--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-moz-column-gap:var(--pfe-band__body--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));column-gap:var(--pfe-band__body--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3))}:host([use-grid]) .pfe-band__body>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([use-grid]) .pfe-band__body>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}.pfe-band__footer{margin-bottom:1rem;margin-bottom:var(--pfe-band__footer--gutter--vertical,var(--pfe-theme--container-spacer,1rem));margin-right:1rem;margin-right:var(--pfe-band__footer--gutter--vertical,var(--pfe-theme--container-spacer,1rem))}@supports (display:grid){.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;grid-area:footer;margin-bottom:0;margin-right:0}:host([has_header][has_footer]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}:host([use-grid]) .pfe-band__footer{display:-ms-grid;display:grid;-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__footer--layout,1fr);grid-template-columns:var(--pfe-band__footer--layout,1fr);grid-row-gap:1rem;grid-row-gap:var(--pfe-band__footer--gutter--vertical,var(--pfe-theme--container-spacer,1rem));row-gap:1rem;row-gap:var(--pfe-band__footer--gutter--vertical,var(--pfe-theme--container-spacer,1rem));grid-column-gap:calc(1rem * 3);grid-column-gap:var(--pfe-band__footer--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-webkit-column-gap:calc(1rem * 3);-moz-column-gap:calc(1rem * 3);column-gap:calc(1rem * 3);-webkit-column-gap:var(--pfe-band__footer--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-moz-column-gap:var(--pfe-band__footer--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));column-gap:var(--pfe-band__footer--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3))}:host([use-grid]) .pfe-band__footer>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([use-grid]) .pfe-band__footer>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}.pfe-band__aside{margin-bottom:1rem;margin-bottom:var(--pfe-band__aside--gutter--vertical,var(--pfe-theme--container-spacer,1rem));margin-right:1rem;margin-right:var(--pfe-band__aside--gutter--vertical,var(--pfe-theme--container-spacer,1rem))}@supports (display:grid){.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:1;grid-area:aside;margin-bottom:0;margin-right:0}:host([has_header][has_aside]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:3;-ms-grid-column:1}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:4;-ms-grid-row-span:1;-ms-grid-column:1}@media (max-width:767px){:host([has_header][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-mobile=top]) .pfe-band__container>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}:host([has_footer][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-mobile=top]) .pfe-band__container>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}:host([has_footer][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-mobile=top]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:4;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}:host([has_header][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}:host([has_footer][has_aside][aside-mobile=top]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-mobile=top]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}}@media (min-width:768px){:host([has_header][has_aside]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_header][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][has_footer][aside-desktop=left]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][has_footer][aside-height=full]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_header][has_aside][has_footer][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}:host([has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}:host([has_header][has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}:host([has_header][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_footer][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}:host([has_footer][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}:host([has_footer][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-desktop=left]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}:host([has_header][has_aside][has_footer][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_footer][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_footer][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_footer][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:2;-ms-grid-column-span:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][has_footer][aside-desktop=left]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}:host([has_header][has_aside][has_footer][aside-height=full]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}:host([has_header][has_aside][has_footer][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:2;-ms-grid-column-span:1}.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:2}:host([has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}:host([has_header][has_aside]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:2}:host([has_header][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:1}:host([has_header][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}:host([has_header][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}:host([has_footer][has_aside]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:2}:host([has_footer][has_aside][aside-desktop=left]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}:host([has_footer][has_aside][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}:host([has_footer][has_aside][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}:host([has_header][has_aside][has_footer]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:2}:host([has_header][has_aside][has_footer][aside-desktop=left]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}:host([has_header][has_aside][has_footer][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:2}:host([has_header][has_aside][has_footer][aside-desktop=left][aside-height=full]) .pfe-band__container>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:1}}:host([use-grid]) .pfe-band__aside{display:-ms-grid;display:grid;-ms-grid-rows:auto;grid-template-rows:auto;-ms-grid-columns:1fr;grid-template-columns:1fr;-ms-grid-columns:var(--pfe-band__aside--layout,1fr);grid-template-columns:var(--pfe-band__aside--layout,1fr);grid-row-gap:1rem;grid-row-gap:var(--pfe-band__aside--gutter--vertical,var(--pfe-theme--container-spacer,1rem));row-gap:1rem;row-gap:var(--pfe-band__aside--gutter--vertical,var(--pfe-theme--container-spacer,1rem));grid-column-gap:calc(1rem * 3);grid-column-gap:var(--pfe-band__aside--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-webkit-column-gap:calc(1rem * 3);-moz-column-gap:calc(1rem * 3);column-gap:calc(1rem * 3);-webkit-column-gap:var(--pfe-band__aside--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));-moz-column-gap:var(--pfe-band__aside--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3));column-gap:var(--pfe-band__aside--gutter--horizontal,calc(var(--pfe-theme--container-spacer,1rem) * 3))}:host([use-grid]) .pfe-band__aside>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}:host([use-grid]) .pfe-band__aside>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-band__container::after{clear:both;content:\"\";display:table}.pfe-band__body,.pfe-band__footer,.pfe-band__header{float:left}:host([aside-mobile=top]) .pfe-band__body,:host([aside-mobile=top]) .pfe-band__footer,:host([aside-mobile=top]) .pfe-band__header{float:right}:host(:not([aside-height=full])) .pfe-band__body,:host(:not([aside-height=full])) .pfe-band__footer,:host(:not([aside-height=full])) .pfe-band__header{width:60%}.pfe-band__footer{clear:both}.pfe-band__aside{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;float:right;width:35%;margin:0 1.9%}:host([aside-desktop=left]) .pfe-band__aside{float:left}.pfe-band__wrapper{width:60%;float:left}:host([aside-desktop=left]) .pfe-band__wrapper{float:right}} /*# sourceMappingURL=pfe-band.min.css.map */</style>\n<section class=\"pfe-band__container\">\n  " + (this.hasSlot("pfe-band--aside") && this.asidePosition.mobile === "top" ? "<aside class=\"pfe-band__aside\">\n    <slot name=\"pfe-band--aside\"></slot>\n  </aside>" : "") + "\n  " + (this.asideHeight === "full" ? "<div class=\"pfe-band__wrapper\">" : "") + "\n    " + (this.hasSlot("pfe-band--header") ? "<header class=\"pfe-band__header\">\n      <slot name=\"pfe-band--header\"></slot>\n    </header>" : "") + "\n    <article class=\"pfe-band__body\">\n      <slot></slot>\n    </article>\n    " + (this.asideHeight !== "full" && this.hasSlot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? "<aside\n      class=\"pfe-band__aside\">\n      <slot name=\"pfe-band--aside\"></slot>\n    </aside>" : "") + "\n    " + (this.hasSlot("pfe-band--footer") ? "<footer class=\"pfe-band__footer\">\n      <slot name=\"pfe-band--footer\"></slot>\n    </footer>" : "") + "\n    " + (this.asideHeight === "full" ? "</div>" : "") + "\n  " + (this.asideHeight === "full" && this.hasSlot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? "<aside\n    class=\"pfe-band__aside\">\n    <slot name=\"pfe-band--aside\"></slot>\n  </aside>" : "") + "\n</section>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-band.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-band.scss";
      }
    }, {
      key: "asidePosition",
      get: function get() {
        return {
          desktop: this.asideDesktop,
          mobile: this.asideMobile,
          height: this.asideHeight
        };
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-band";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Band",
          description: "This element creates a header, body, footer, and aside region in which to place content or other components."
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          imgSrc: {
            title: "Background image",
            type: String,
            observer: "_imgSrcChanged"
          },
          // @TODO: Deprecated property in 1.0
          oldImgSrc: {
            alias: "imgSrc",
            attr: "pfe-img-src"
          },
          color: {
            title: "Background color",
            type: String,
            values: ["lightest", "base", "darker", "darkest", "complement", "accent"],
            default: "base",
            observer: "_colorChanged"
          },
          // @TODO: Deprecated property in 1.0
          oldColor: {
            alias: "color",
            attr: "pfe-color"
          },
          asideDesktop: {
            title: "side positioning (desktop)",
            type: String,
            values: ["right", "left"],
            default: "right"
          },
          // @TODO: Deprecated property in 1.0
          oldAsideDesktop: {
            alias: "asideDesktop",
            attr: "pfe-aside-desktop"
          },
          asideMobile: {
            title: "Aside positioning (mobile)",
            type: String,
            values: ["top", "bottom"],
            default: "bottom"
          },
          // @TODO: Deprecated property in 1.0
          oldAsideMobile: {
            alias: "asideMobile",
            attr: "pfe-aside-mobile"
          },
          asideHeight: {
            title: "Aside height",
            type: String,
            values: ["full", "body"],
            default: "body"
          },
          // @TODO: Deprecated property in 1.0
          oldAsideHeight: {
            alias: "asideHeight",
            attr: "pfe-aside-height"
          },
          size: {
            title: "Padding size",
            type: String,
            values: ["small"]
          },
          // @TODO: Deprecated property in 1.0
          oldSize: {
            alias: "size",
            attr: "pfe-size"
          },
          useGrid: {
            title: "Default grid on for the light DOM regions (header, body, footer, aside)",
            type: Boolean,
            default: false
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          header: {
            title: "Header",
            type: "array",
            namedSlot: true,
            maxItems: 3,
            items: {
              $ref: "raw"
            }
          },
          body: {
            title: "Body",
            type: "array",
            namedSlot: false,
            items: {
              oneOf: [{
                $ref: "pfe-card"
              }, {
                $ref: "raw"
              }]
            }
          },
          footer: {
            title: "Footer",
            type: "array",
            namedSlot: true,
            maxItems: 3,
            items: {
              oneOf: [{
                $ref: "pfe-cta"
              }, {
                $ref: "raw"
              }]
            }
          },
          aside: {
            title: "Aside",
            type: "array",
            namedSlot: true,
            maxItems: 5,
            items: {
              oneOf: [{
                $ref: "pfe-card"
              }, {
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
        return PFElement.PfeTypes.Container;
      }
    }]);

    function PfeBand() {
      classCallCheck(this, PfeBand);
      return possibleConstructorReturn(this, (PfeBand.__proto__ || Object.getPrototypeOf(PfeBand)).call(this, PfeBand, { type: PfeBand.PfeType }));
    }

    createClass(PfeBand, [{
      key: "_colorChanged",
      value: function _colorChanged() {
        // Update the context
        this.resetContext();
      }

      // Update the background image

    }, {
      key: "_imgSrcChanged",
      value: function _imgSrcChanged(oldVal, newVal) {
        // Set the image as the background image
        this.style.backgroundImage = newVal ? "url('" + newVal + "')" : "";
      }
    }]);
    return PfeBand;
  }(PFElement);

  PFElement.create(PfeBand);

  return PfeBand;

})));
//# sourceMappingURL=pfe-band.umd.js.map
