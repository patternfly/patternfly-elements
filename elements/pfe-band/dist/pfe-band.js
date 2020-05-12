import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  Element.matches
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

// @POLYFILL  Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
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
    value: function(valueToFind, fromIndex) {
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
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
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

/*!
 * PatternFly Elements: PfeBand 1.0.0-prerelease.45
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

class PfeBand extends PFElement {
  static get version() {
    return "1.0.0-prerelease.45";
  }

  get html() {
    return `<style>:host{--pfe-band--Padding--vertical:calc( var(--pfe-theme--container-spacer, 16px) * 4);--pfe-band--Padding--horizontal:calc( var(--pfe-theme--container-spacer, 16px) * 1);--pfe-band--Padding:var(--pfe-band--Padding--vertical) var(--pfe-band--Padding--horizontal);--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-band--BackgroundPosition:center center;--pfe-band--Border:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-band--layout:1fr;--pfe-band__header--layout:1fr;--pfe-band__body--layout:1fr;--pfe-band__footer--layout:1fr;--pfe-band__aside--layout:1fr;--pfe-band--gutter--vertical:var(--pfe-theme--container-spacer, 16px);--pfe-band--gutter--horizontal:calc(var(--pfe-theme--container-spacer, 16px) * 3);--pfe-band--Width:auto;--pfe-band--Width__aside--sm:240px;--pfe-band--Width__aside--lg:300px;--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none;--theme:light;display:block;position:relative;padding:calc(var(--pfe-band--Padding--vertical)/ 2) var(--pfe-band--Padding--horizontal);border:var(--pfe-band--Border);background-color:var(--pfe-band--BackgroundColor);background-position:var(--pfe-band--BackgroundPosition);color:#333;color:var(--pfe-broadcasted--text,#333)}@media screen and (min-width:768px){:host{--pfe-band--Width:calc( 768px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media screen and (min-width:992px){:host{--pfe-band--Width:calc( 992px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media screen and (min-width:1200px){:host{--pfe-band--Width:calc( 1200px - calc(var(--pfe-band--Padding--horizontal) * 4) )}}@media (min-width:576px){:host{padding:var(--pfe-band--Padding)}}@media print{:host{background-color:#fff!important;background-image:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}}@media print{:host{border-radius:3px;border:1px solid #d2d2d2;padding:calc(var(--pfe-band--Padding--vertical)/ 2) var(--pfe-band--Padding--horizontal)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;background-color:var(--pfe-theme--color--surface--lightest,#fff)!important;color:#333!important;color:var(--pfe-theme--color--text,#333)!important;background-image:none!important;padding:calc(16px);padding:calc(var(--pfe-theme--container-spacer,16px))}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([pfe-color=darker]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--theme:var(--pfe-theme--color--surface--darker--theme, dark)}:host([pfe-color=darkest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--theme:var(--pfe-theme--color--surface--darkest--theme, dark)}:host([pfe-color=base]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--theme:var(--pfe-theme--color--surface--base--theme, light)}:host([pfe-color=lighter]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--theme:var(--pfe-theme--color--surface--lighter--theme, light)}:host([pfe-color=lightest]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--theme:var(--pfe-theme--color--surface--lightest--theme, light)}:host([pfe-color=accent]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--accent, #e00);--theme:var(--pfe-theme--color--surface--accent--theme, saturated)}:host([pfe-color=complement]){--pfe-band--BackgroundColor:var(--pfe-theme--color--surface--complement, #0477a4);--theme:var(--pfe-theme--color--surface--complement--theme, saturated)}:host([pfe-size=small]){--pfe-band--Padding:calc(var(--pfe-band--Padding--vertical) / 4) var(--pfe-band--Padding--horizontal)}.pfe-band__container{--pfe-band_region--width:calc(calc(1fr - var(--pfe-band--Width__aside--sm)) - var(--pfe-band--gutter--horizontal));grid-template-areas:"body";position:relative;margin:0 auto;width:100%;max-width:var(--pfe-band--Width)}.pfe-band__container[pfe-has-aside]{grid-template-areas:"body" "aside"}@media (min-width:768px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--sm)}}@media (min-width:992px){.pfe-band__container[pfe-has-aside]{--pfe-band--layout:1fr var(--pfe-band--Width__aside--lg)}}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]{grid-template-areas:"aside" "body"}@media (min-width:768px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{grid-template-areas:"aside body";--pfe-band--layout:var(--pfe-band--Width__aside--sm) 1fr}.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}}@media (min-width:992px){.pfe-band__container[pfe-has-aside][pfe-aside-desktop=left]{--pfe-band--layout:var(--pfe-band--Width__aside--lg) 1fr}}.pfe-band__container[pfe-has-header]{grid-template-areas:"header" "body"}.pfe-band__container[pfe-has-header][pfe-has-aside]{grid-template-areas:"header" "body" "aside"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-aside]{grid-template-areas:"header header" "body aside"}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:2}}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]{grid-template-areas:"aside" "header" "body"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-height=full]{grid-template-areas:"header aside" "body aside"}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]{grid-template-areas:"header header" "aside body"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:"aside header" "aside body"}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}}.pfe-band__container[pfe-has-footer]{grid-template-areas:"body" "footer"}.pfe-band__container[pfe-has-footer][pfe-has-aside]{grid-template-areas:"body" "aside" "footer"}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-has-aside]{grid-template-areas:"body aside" "footer footer"}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]{grid-template-areas:"aside" "body" "footer"}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-height=full]{grid-template-areas:"body aside" "footer aside"}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]{grid-template-areas:"aside body" "footer footer"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:2}}@media (min-width:768px){.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:"aside body" "aside footer"}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:2}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:2;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:2;-ms-grid-column-span:1}}.pfe-band__container[pfe-has-header][pfe-has-footer]{grid-template-areas:"header" "body" "footer"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]{grid-template-areas:"header" "body" "footer" "aside"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]{grid-template-areas:"header header" "body aside" "footer footer"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]{grid-template-areas:"aside" "header" "body" "footer"}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]{grid-template-areas:"header aside" "body aside" "footer aside"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]{grid-template-areas:"header header" "aside body" "footer footer"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:2}}@media (min-width:768px){.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]{grid-template-areas:"aside header" "aside body" "aside footer"}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:2;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:2}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:3;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop=left][pfe-aside-height=full]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:2;-ms-grid-column-span:1}}@supports (display:grid){.pfe-band__container{display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0;-ms-grid-columns:var(--pfe-band--layout);grid-template-columns:var(--pfe-band--layout);-ms-grid-rows:-webkit-max-content;-ms-grid-rows:max-content;grid-template-rows:-webkit-max-content;grid-template-rows:max-content}.pfe-band__container>:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}}.pfe-band__header{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0;grid-area:header;-ms-grid-columns:var(--pfe-band__header--layout);grid-template-columns:var(--pfe-band__header--layout)}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__header{-ms-grid-row:1;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__header{-ms-grid-row:2;-ms-grid-column:1;-ms-grid-column-span:1}}.pfe-band__body{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0;grid-area:body;-ms-grid-columns:var(--pfe-band__body--layout);grid-template-columns:var(--pfe-band__body--layout)}.pfe-band__container[pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-footer]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__body{-ms-grid-row:2;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__body{-ms-grid-row:3;-ms-grid-column:1}}.pfe-band__aside{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__aside{-ms-grid-row:2;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0;grid-area:aside;-ms-grid-columns:var(--pfe-band__aside--layout);grid-template-columns:var(--pfe-band__aside--layout)}.pfe-band__container[pfe-has-aside][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:2;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__aside{-ms-grid-row:4;-ms-grid-row-span:1;-ms-grid-column:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__aside{-ms-grid-row:1;-ms-grid-row-span:1;-ms-grid-column:1}}.pfe-band__footer{margin-bottom:var(--pfe-band--gutter--vertical)}@supports (display:grid){.pfe-band__footer{-ms-grid-row:2;-ms-grid-column:1;display:-ms-grid;display:grid;grid-row-gap:var(--pfe-band--gutter--vertical);grid-column-gap:var(--pfe-band--gutter--horizontal);margin-bottom:0;grid-area:footer;-ms-grid-columns:var(--pfe-band__footer--layout);grid-template-columns:var(--pfe-band__footer--layout)}.pfe-band__container[pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1}.pfe-band__container[pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside]>.pfe-band__footer{-ms-grid-row:3;-ms-grid-column:1;-ms-grid-column-span:1}.pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile=top]>.pfe-band__footer{-ms-grid-row:4;-ms-grid-column:1;-ms-grid-column-span:1}}.pfe-band__aside{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-band__body{width:60%;float:left}.pfe-band__aside{float:left;width:35%;margin:0 2.5%}.pfe-band__footer{clear:both}.pfe-band__container::after{content:" ";display:block;clear:both}}
/*# sourceMappingURL=pfe-band.min.css.map */
</style><section class="pfe-band__container"${["header", "footer", "aside"].map(slot => this.has_slot(`pfe-band--${slot}`) ? `pfe-has-${slot}` : "").join(" ")}>
  ${this.has_slot("pfe-band--aside") && this.asidePosition.mobile === "top" ? `<aside class="pfe-band__aside" ><slot name="pfe-band--aside"></slot></aside>` : ""}
  ${this.has_slot("pfe-band--header") ? `<header class="pfe-band__header"><slot name="pfe-band--header"></slot></header>` : ""}
  <article class="pfe-band__body"><slot></slot></article>
  ${this.has_slot("pfe-band--aside") && this.asidePosition.mobile !== "top" ? `<aside class="pfe-band__aside"><slot name="pfe-band--aside"></slot></aside>` : ""}
  ${this.has_slot("pfe-band--footer") ? `<footer class="pfe-band__footer"><slot name="pfe-band--footer"></slot></footer>` : ""}
</section>`;
  }

  static get properties() {
    return {"color":{"title":"Background color","type":"string","enum":["lightest","lighter","base","darker","darkest","complement","accent"],"default":"base","prefixed":true,"observer":"_colorChanged"},"img-src":{"title":"Background image","type":"string","prefixed":true,"observer":"_imgSrcChanged"},"aside-desktop":{"title":"Aside positioning (desktop)","type":"string","default":"right","enum":["right","left"],"prefixed":true,"observer":"_basicAttributeChanged","options":{"dependencies":[{"type":"slot","id":"aside"}]}},"aside-mobile":{"title":"Aside positioning (mobile)","type":"string","default":"bottom","enum":["top","bottom"],"prefixed":true,"observer":"_basicAttributeChanged","options":{"dependencies":[{"type":"slot","id":"aside"}]}},"aside-height":{"title":"Aside height","type":"string","default":"body","enum":["full","body"],"prefixed":true,"observer":"_basicAttributeChanged","options":{"dependencies":[{"type":"slot","id":"aside"}]}}};
  }

  static get slots() {
    return {"header":{"title":"Header","type":"array","namedSlot":true,"maxItems":3,"items":{"title":"Body item","oneOf":[{"$ref":"raw"}]}},"body":{"title":"Body","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-card"},{"$ref":"raw"}]}},"footer":{"title":"Footer","type":"array","namedSlot":true,"maxItems":3,"items":{"oneOf":[{"$ref":"pfe-cta"},{"$ref":"raw"}]}},"aside":{"title":"Aside","type":"array","namedSlot":true,"maxItems":5,"items":{"oneOf":[{"$ref":"pfe-card"},{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-band";
  }

  get schemaUrl() {
    return "pfe-band.json";
  }

  get templateUrl() {
    return "pfe-band.html";
  }

  get styleUrl() {
    return "pfe-band.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return this.getAttribute("pfe-color");
  }

  get asidePosition() {
    return {
      desktop: this.getAttribute("pfe-aside-desktop"),
      mobile: this.getAttribute("pfe-aside-mobile"),
      height: this.getAttribute("pfe-aside-height")
    };
  }

  static get observedAttributes() {
    return [
      "pfe-aside-desktop",
      "pfe-aside-mobile",
      "pfe-aside-height",
      "pfe-color",
      "pfe-img-src"
    ];
  }

  static get cascadingAttributes() {
    return {
      "pfe-aside-desktop": ".pfe-band__container",
      "pfe-aside-mobile": ".pfe-band__container",
      "pfe-aside-height": ".pfe-band__container"
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeBand, { type: PfeBand.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix form the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
    // Trigger an update in nested components
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeBand);

export default PfeBand;
//# sourceMappingURL=pfe-band.js.map
