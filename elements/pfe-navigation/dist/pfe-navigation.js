import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-icon/dist/pfe-icon.js';

// @POLYFILL  Array.prototype.filter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(func, thisArg) {
    if (!((typeof func === "Function" || typeof func === "function") && this))
      throw new TypeError();

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this,
      c = 0,
      i = -1;

    var kValue;
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    } else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}

// @POLYFILL  Element.prototype.matches
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

// @POLYFILL  Element.prototype.closest
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

// @POLYFILL  Array.prototype.includes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function(searchElement, fromIndex) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

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
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// @POLYFILL  Event.prototype.path
// https://stackoverflow.com/questions/36845515/mouseevent-path-equivalent-in-firefox-safari
if (!("path" in Event.prototype)) {
  Object.defineProperty(Event.prototype, "path", {
    get: function() {
      var path = [];
      var currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1) path.push(window);
      return path;
    }
  });
}

/*!
 * PatternFly Elements: PfeNavigation 1.0.0-prerelease.55
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

class PfeNavigationItem extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray{position:relative;display:block;width:100%;padding:16px;padding:var(--pfe-theme--container-spacer,16px)}::slotted([slot=trigger]){font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:16px!important;font-size:var(--pfe-navigation__trigger--FontSize,var(--pfe-theme--font-size--heading--epsilon,16px))!important;font-weight:300;font-weight:var(--pfe-navigation--FontWeight,var(--pfe-theme--font-weight--light,300));color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));z-index:2;line-height:1.1;margin:0!important;max-width:100%;text-align:center}@media screen and (min-width:0){::slotted([slot=trigger]){max-width:100%}}@media screen and (min-width:1200px){::slotted([slot=trigger]){max-width:190px}}:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;line-height:1.2;height:100%;min-width:auto;min-width:var(--pfe-navigation--MinWidth,auto)}@media screen and (max-width:1200px){:host{width:100%}}@media screen and (min-width:500px){:host{--pfe-navigation__trigger--Padding:var(--pfe-theme--container-padding, 16px)}}:host([aria-current=location]){--pfe-navigation--BorderTopColor:var(--pfe-theme--color--ui-accent, #06c)}:host(.expanded){--pfe-navigation__trigger-icon--Visible:visible;--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--BorderTopColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--Color:var(--pfe-theme--color--text, #151515)}:host([pfe-icon]){--pfe-navigation--MinWidth:50px;--pfe-navigation__trigger--FontSize:12px;--pfe-navigation__trigger--Padding:calc(var(--pfe-theme--container-padding, 16px) * .625);--pfe-navigation__trigger-icon--Visible:hidden;-webkit-box-flex:1;-webkit-flex:auto;-ms-flex:auto;flex:auto;width:auto;min-width:65px}@media screen and (min-width:640px){:host([pfe-icon]){width:70px}}@media screen and (max-height:500px){:host([pfe-icon]){--pfe-navigation__trigger--Padding:calc(var(--pfe-theme--container-padding, 16px) / 3) calc(var(--pfe-theme--container-padding, 16px) *.5)}}@media screen and (min-width:1024px){:host([pfe-icon]){-webkit-box-flex:1;-webkit-flex:auto;-ms-flex:auto;flex:auto}}:host(:not([pfe-icon])){--pfe-navigation__trigger--Padding:calc(var(--pfe-theme--container-padding, 16px) * .75)}:host(:not([has_tray])),:host(:not([pfe-icon]):not([is_nested]):not(.expanded)){--pfe-navigation__trigger-icon--Visible:hidden}:host([is_nested]:not([parent_hidden])){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:0 auto;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;max-width:100%;max-width:var(--pfe-navigation--Width,100%)}.pfe-navigation-item__trigger{--pfe-theme--link--text-decoration:none;--pfe-theme--link--text-decoration--hover:none;--pfe-theme--link--text-decoration--focus:none;--pfe-broadcasted--text:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff));--pfe-broadcasted--link:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff));--pfe-broadcasted--link--hover:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff));--pfe-broadcasted--link--focus:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff));--pfe-broadcasted--link--visited:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff));--pfe-theme--font-size--alpha:var(--pfe-navigation__trigger--FontSize, var(--pfe-theme--font-size--heading--epsilon, 16px));--pfe-theme--font-weight--alpha:var(--pfe-navigation--FontWeight, var(--pfe-theme--font-weight--light, 300));--pfe-theme--font-size--beta:var(--pfe-navigation__trigger--FontSize, var(--pfe-theme--font-size--heading--epsilon, 16px));--pfe-theme--font-weight--beta:var(--pfe-navigation--FontWeight, var(--pfe-theme--font-weight--light, 300));--pfe-theme--font-size--gamma:var(--pfe-navigation__trigger--FontSize, var(--pfe-theme--font-size--heading--epsilon, 16px));--pfe-theme--font-weight--gamma:var(--pfe-navigation--FontWeight, var(--pfe-theme--font-weight--light, 300));border-top:4px solid transparent;border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderTopColor,transparent);border-right:1px dashed transparent;border-right:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor,transparent);border-bottom:1px dashed transparent;border-bottom:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor,transparent);border-left:1px dashed transparent;border-left:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor,transparent);background-color:transparent;background-color:var(--pfe-navigation--BackgroundColor,transparent);color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));padding:calc(16px * .5);padding:var(--pfe-navigation__trigger--Padding,calc(var(--pfe-theme--container-padding,16px) * .5));position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));outline:0;cursor:pointer}.pfe-navigation-item__trigger:hover{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-navigation__trigger-icon--Visible:visible}:host([variant=wind]) .pfe-navigation-item__trigger:hover{--pfe-navigation--Color:var(--pfe-theme--color--link--hover, #004080)}:host([has_tray]:not([pfe-icon]):not([is_nested]):not(.expanded)) .pfe-navigation-item__trigger:hover{--pfe-navigation__trigger-icon--Visible:visible;border-top-color:#fff;border-top-color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff))}@media screen and (min-width:1200px){:host([has_tray]:not(.expanded)) .pfe-navigation-item__trigger:hover{--pfe-navigation__trigger-icon--Visible:visible}}.pfe-navigation-item__trigger:focus{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([variant=wind]) .pfe-navigation-item__trigger:focus{--pfe-navigation--Color:var(--pfe-theme--color--link--focus, #004080)}:host(:not([pfe-icon])) .pfe-navigation-item__trigger::after{display:block;content:" ";visibility:hidden;visibility:var(--pfe-navigation__trigger-icon--Visible,hidden);border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:6px 6px 0;border-color:transparent;border-top-color:#4f5255;border-top-color:var(--pfe-theme--color--feedback--default,#4f5255);-webkit-transform:rotate(0);transform:rotate(0);position:absolute;bottom:calc(16px / 2);bottom:calc(var(--pfe-theme--container-spacer,16px)/ 2)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger{--pfe-navigation--Color:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text:var(--pfe-navigation__tray--Color, var(--pfe-theme--color--text, #151515));--pfe-broadcasted--link:var(--pfe-navigation__tray--Color, var(--pfe-theme--color--text, #151515));--pfe-broadcasted--link-decoration:var(--pfe-navigation__tray--Color, var(--pfe-theme--color--text, #151515));--pfe-navigation--BorderBottomWidth:0;--pfe-navigation--ZIndex:3;--pfe-navigation__trigger--Padding:var(--pfe-navigation__base--Padding) 50px var(--pfe-navigation__base--Padding) calc(var(--pfe-navigation__base--Padding) * 1.5);margin:0;width:100%;width:var(--pfe-navigation--Width,100%);max-width:calc(100% - 4px);max-width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:auto;position:relative;background-color:transparent;background-color:var(--pfe-navigation--BackgroundColor,transparent);color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));border:0 solid transparent;border:0 var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderColor,transparent);border-top-width:var(--pfe-navigation--BorderTopWidth);border-right-width:var(--pfe-navigation--BorderRightWidth);border-bottom-width:var(--pfe-navigation--BorderBottomWidth);border-left:var(--pfe-navigation--BorderLeftWidth) solid var(--pfe-navigation--BorderColor--accent);border-left:var(--pfe-navigation--BorderLeftWidth) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderColor--accent);-webkit-box-shadow:var(--pfe-navigation--BoxShadow);box-shadow:var(--pfe-navigation--BoxShadow);z-index:var(--pfe-navigation--ZIndex);cursor:pointer;font-family:inherit;font-size:calc(16px * 1.1);font-size:var(--pfe-navigation--FontSize--header,calc(var(--pfe-theme--font-size,16px) * 1.1));font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;text-align:var(--pfe-navigation--TextAlign,left);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(16px * .5);padding:var(--pfe-navigation__trigger--Padding,calc(var(--pfe-theme--container-padding,16px) * .5));-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:hover{--pfe-navigation--BorderColor--accent:var(--pfe-navigation--accent)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:hover{outline:0;border-left-width:4px;border-left-width:var(--pfe-theme--surface--border-width--heavy,4px)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:focus{outline:0;text-decoration:underline}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger::-moz-focus-inner{border:0}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__trigger{--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-navigation--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-navigation--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-navigation--BackgroundColor:white;--pfe-navigation--Color:var(--pfe-theme--color--text, #151515);--pfe-navigation--BorderColor--accent:var(--pfe-navigation--accent);--pfe-navigation--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-navigation--ZIndex:3}:host([is_nested][last]:not(.expanded):not([parent_hidden])) .pfe-navigation-item__trigger{--pfe-navigation--BorderBottomWidth:var(--pfe-theme--surface--border-width, 1px)}:host([is_nested]:not(.expanded):not([parent_hidden])) .pfe-navigation-item__trigger::after{content:"";position:absolute;top:calc(16px + 0px);top:calc(var(--pfe-theme--container-spacer,16px) + 0px);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(16px * 1.3125);right:calc(var(--pfe-theme--container-spacer,16px) * 1.3125)}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__trigger::after{content:"";position:absolute;top:calc(16px + 4px);top:calc(var(--pfe-theme--container-spacer,16px) + 4px);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:.1em .1em 0 0;border-bottom:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:calc(16px + 4px);top:calc(var(--pfe-theme--container-spacer,16px) + 4px);right:calc(16px * 1.3125);right:calc(var(--pfe-theme--container-spacer,16px) * 1.3125)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger::after{--pfe-navigation__trigger-icon--Visible:visible;border-color:#fff;border-color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff))}:host([is_nested]:not([has_tray]):not([parent_hidden])) .pfe-navigation-item__trigger::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([variant=wind]) .pfe-navigation-item__trigger{--pfe-navigation__trigger--Padding:calc(var(--pfe-theme--container-padding, 16px) / 2) 0 calc(var(--pfe-theme--container-padding, 16px) / 2) calc(var(--pfe-theme--container-spacer, 16px) * 1.5);--pfe-navigation--Color:pfe-var(link);--pfe-navigation--BackgroundColor:transparent!important;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;border:none}.pfe-navigation-item__trigger pfe-icon{--pfe-icon--Color:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff))}:host([variant=wind]) .pfe-navigation-item__trigger pfe-icon{margin-bottom:0;margin-right:calc(16px / 2);margin-right:calc(var(--pfe-theme--container-spacer,16px)/ 2)}.pfe-navigation-item__trigger pfe-icon[icon=web-plus]{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([pfe-icon]) ::slotted([slot=trigger]){margin:.25em 0 0 0!important;max-width:100px}::slotted(*){font-size:inherit!important;font-weight:300!important;font-weight:var(--pfe-navigation--FontWeight,var(--pfe-theme--font-weight--light,300))!important}.pfe-navigation-item__tray{--pfe-navigation--FontWeight:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none);-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-box-sizing:border-box;box-sizing:border-box;display:none;visibility:hidden}.pfe-navigation-item__tray[aria-expanded=true]{display:block;visibility:visible}:host([show_links]:not([parent_hidden])) .pfe-navigation-item__tray{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:visible;width:100%;padding-right:40px}:host(:not([pfe-icon=web-mobile-menu]):not([is_nested])) .pfe-navigation-item__tray,:host([is_nested][parent_hidden]) .pfe-navigation-item__tray,:host([pfe-icon=web-mobile-menu]:not([show_links])) .pfe-navigation-item__tray{position:absolute;top:100%;left:0;background-color:#fff;background-color:var(--pfe-navigation__tray--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));color:#151515;color:var(--pfe-navigation__tray--Color,var(--pfe-theme--color--text,#151515));padding:var(--pfe-navigation__tray--Padding);width:100%;max-height:calc(100vh - 84px);max-height:calc(100vh - var(--pfe-navigation--Height,84px));overflow-x:hidden;overflow-y:scroll;padding-right:9px}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray{display:none;overflow:hidden;will-change:height;border-color:transparent;opacity:0;margin:0;width:100%;width:var(--pfe-navigation--Width,100%);max-width:calc(100% - 4px);max-width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:auto;position:relative;background-color:transparent;background-color:var(--pfe-navigation--BackgroundColor,transparent);color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));border:0 solid transparent;border:0 var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderColor,transparent);border-top-width:var(--pfe-navigation--BorderTopWidth);border-right-width:var(--pfe-navigation--BorderRightWidth);border-bottom-width:var(--pfe-navigation--BorderBottomWidth);border-left:var(--pfe-navigation--BorderLeftWidth) solid var(--pfe-navigation--BorderColor--accent);border-left:var(--pfe-navigation--BorderLeftWidth) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderColor--accent);-webkit-box-shadow:var(--pfe-navigation--BoxShadow);box-shadow:var(--pfe-navigation--BoxShadow);z-index:var(--pfe-navigation--ZIndex);--pfe-navigation--BoxShadow:none;padding:var(--pfe-navigation__panel-container--Padding);padding:calc(var(--pfe-navigation--Padding--vertical)/ 2) calc(var(--pfe-navigation--Padding--horizontal) * 1.75)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray:hover{--pfe-navigation--BorderColor--accent:var(--pfe-navigation--accent)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray *,:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray ::after,:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__tray{--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-navigation--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-navigation--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-navigation--BackgroundColor:white;--pfe-navigation--Color:var(--pfe-theme--color--text, #151515);--pfe-navigation--BorderColor--accent:var(--pfe-navigation--accent);--pfe-navigation--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-navigation--ZIndex:3;--pfe-navigation--BorderTopWidth:0;--pfe-navigation--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);display:block;position:relative;opacity:1}::slotted([slot=tray]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}:host(:not(.expanded):not([show_links])) .pfe-navigation-item__tray,:host([hidden]) .pfe-navigation-item__tray,:host([hidden]) .pfe-navigation-item__trigger,:host([hidden]:not([show_tray])),:host([show_links])>.pfe-navigation-item__trigger{display:none;visibility:hidden}:host([show_links]) ::slotted([slot=tray][hidden]),:host([show_tray]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:visible;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}:host([is_nested]) ::slotted([slot=trigger]){text-align:left}:host([is_nested]) [slot=trigger]>a{color:#151515!important;color:var(--pfe-theme--color--text,#151515)!important}:host([pfe-icon=web-mobile-menu]){-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;-webkit-box-flex:0;-webkit-flex:0 1 99%;-ms-flex:0 1 99%;flex:0 1 99%}:host([is_nested][parent_hidden][pfe-full-width]) .pfe-navigation-item__tray{padding:var(--pfe-navigation__tray--Padding) 0 var(--pfe-navigation__tray--Padding)}
/*# sourceMappingURL=pfe-navigation-item.min.css.map */
</style><div class="pfe-navigation-item__trigger" aria-expanded="false" tabindex="0">
    ${this.hasIcon ? `<pfe-icon icon="${this.iconName}"></pfe-icon>` : ""}
    <slot name="trigger"></slot>
</div>
${ this.has_slot("tray") ? `<div class="pfe-navigation-item__tray">
    <slot name="tray"></slot>
</div>` : ""}`;
  }

  static get properties() {
    return {"icon":{"title":"Icon name","type":"string","prefixed":true}};
  }

  static get slots() {
    return {"trigger":{"title":"Navigation trigger","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"tray":{"title":"Navigation tray","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-navigation-item";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["pfe-icon", "pfe-full-width"];
  }

  static get cascadingAttributes() {
    return {
      "pfe-full-width": ".pfe-navigation-item__tray"
    };
  }

  get hasIcon() {
    return this.hasAttribute("pfe-icon");
  }

  get iconName() {
    return this.getAttribute("pfe-icon");
  }

  get nested() {
    return this.hasAttribute("is_nested");
  }

  set nested(isNested) {
    isNested = Boolean(isNested);

    if (isNested) {
      this.setAttribute("is_nested", "");
    } else {
      this.removeAttribute("is_nested");
    }
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(isExpanded) {
    isExpanded = Boolean(isExpanded);

    if (isExpanded) {
      this.classList.add("expanded");

      if (this.iconName === "web-mobile-menu") {
        if (this._icon) this._icon.setAttribute("icon", "web-plus");
      }

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.removeAttribute("hidden");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.iconName === "web-mobile-menu") {
        if (this._icon) this._icon.setAttribute("icon", "web-mobile-menu");
      }

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", false);
      }

      if (this.tray) {
        this.tray.setAttribute("hidden", "");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", false);
      }
    }
  }

  get visible() {
    return !this.hasAttribute("hidden");
  }

  set visible(isVisible) {
    isVisible = Boolean(isVisible);

    if (isVisible) {
      this.removeAttribute("hidden");
    } else {
      this.setAttribute("hidden", "");
    }
  }

  open(event) {
    if (event) event.preventDefault();

    // Close the other active item(s) unless it's this item's parent
    if (this.navigationWrapper) {
      this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(
        item => {
          let stayOpen = item === this.parent;
          if (!stayOpen) item.close();
          return stayOpen;
        }
      );

      // Open that item and add it to the active array
      this.navigationWrapper._activeNavigationItems.push(this);

      this.expanded = true;
      this.navigationWrapper.overlay = true;
    }

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  close(event) {
    if (event) event.preventDefault();

    // Close the children elements
    this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(
      item => {
        let close = this.nestedItems && this.nestedItems.includes(item);
        if (close) item.close();
        return !close && item !== this;
      }
    );

    this.expanded = false;

    // Clear the overlay
    this.navigationWrapper.overlay =
      this.navigationWrapper._activeNavigationItems.length > 0;

    this.focus();

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  toggle(event) {
    if (event) event.preventDefault();

    if (this.visible && !this.expanded) {
      this.open(event);
    } else {
      this.close(event);
    }
  }

  constructor() {
    super(PfeNavigationItem);

    this._handlersAdded = false;

    // States
    this.nested = false;
    this.expanded = false;

    // Objects
    this.trigger = null;
    this.tray = null;
    this.directLink = null;
    this.linkUrl = null;

    // Lists
    this.nestedItems = [];

    // Shadow elements
    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._icon = this.shadowRoot.querySelector("pfe-icon");
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);

    // Externally accessible events
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);

    // Initializers
    this._init__trigger = this._init__trigger.bind(this);
    this._init__tray = this._init__tray.bind(this);

    // Event handlers
    this._keydownHandler = this._keydownHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._navigateToUrl = this._navigateToUrl.bind(this);
    this._directLinkHandler = this._directLinkHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init__trigger();
    this._init__tray();

    // Add a slotchange listeners to the lightDOM elements
    if (this.trigger)
      this.trigger.addEventListener("slotchange", this._init__trigger);
    if (this.tray) this.tray.addEventListener("slotchange", this._init__tray);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.tray.removeEventListener("slotchange", this._init);

      this.removeEventListener("keydown", this._keydownHandler);
      this.removeEventListener("keyup", this._exit);

      this._trigger.removeEventListener("click", this.toggle);
      this._trigger.removeEventListener("keyup", this._keyupHandler);
    } else {
      this._trigger.removeEventListener("click", this._navigateToUrl);
      this._trigger.removeEventListener("keyup", this._directLinkHandler);
    }
  }

  _init__trigger() {
    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(
      child => !child.hasAttribute("slot")
    );
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);

    // Check the light dom for the link
    if (this.trigger) {
      this.directLink = this.trigger.querySelector("a");
      // Check the slotted content for the link if it can't be found
      if (!this.directLink && this.trigger.tagName === "SLOT") {
        let slottedContent = this.trigger.assignedNodes();
        if (slottedContent.length > 0 && slottedContent[0].tagName === "A") {
          this.directLink = slottedContent[0];
        }
      }

      // Turn off the fallback link if the tray does not exist
      if (this.directLink) {
        this.directLink.setAttribute("tabindex", "-1");
        this.linkUrl = this.directLink.href;
      } else {
        this.linkUrl = "#";
      }

      this._trigger.addEventListener("click", this._navigateToUrl);
      this._trigger.addEventListener("keyup", this._directLinkHandler);
    }
  }

  _init__tray() {
    // Get the LightDOM trigger & tray content
    this.tray = this.querySelector(`[slot="tray"]`);

    //-- Check for any nested navigation items
    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([
        ...this.tray.querySelectorAll(`${this.tag}`)
      ]);
      let array = [];

      // Search the tray for nested slots
      if (!window.ShadyCSS) {
        [...this.tray.querySelectorAll("slot")].forEach(slot => {
          [...slot.assignedElements()].forEach(node => {
            array = array.concat([...node.querySelectorAll(`${this.tag}`)]);
          });
        });
      }

      this.nestedItems = this.nestedItems.concat(
        array.filter(el => {
          return !this.nestedItems.includes(el);
        })
      );

      this._init__handlers();
    }
  }

  _init__handlers() {
    this._trigger.removeEventListener("click", this._navigateToUrl);
    this._trigger.removeEventListener("keyup", this._directLinkHandler);

    if (this._handlersAdded) {
      return;
    }

    // Toggle the navigation when the trigger is clicked
    this._trigger.addEventListener("click", this.toggle);

    // Attaching to the parent element allows the exit key to work inside the tray too
    this.addEventListener("keyup", this._exit);
    this.addEventListener("keydown", this._keydownHandler);

    this._trigger.addEventListener("keyup", this._keyupHandler);
    this._handlersAdded = true;
  }

  _navigateToUrl(event) {
    event.preventDefault();
    window.location.href = this.linkUrl;
  }

  _directLinkHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
      case "Enter":
      case 13:
        this._navigateToUrl(event);
        break;
      default:
        return;
    }
  }

  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          event.preventDefault();
        }
        break;
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
      case "Enter":
      case 13:
        if (!["A"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
    }
  }

  // Note: Escape will always exit the entire menu
  _exit(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Esc":
      case "Escape":
      case 27:
        this.close(event);
        break;
    }
  }
}

/*!
 * PatternFly Elements: PfeNavigation 1.0.0-prerelease.55
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

class PfeNavigationMain extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{height:100%}::slotted(*){margin:0;padding:0;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap}:host([show_content]) ::slotted(*){-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}::slotted(ul){list-style-type:none}:host([show_content]) ::slotted(ul){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap}
/*# sourceMappingURL=pfe-navigation-main.min.css.map */
</style><slot></slot>`;
  }
  static get tag() {
    return "pfe-navigation-main";
  }

  get templateUrl() {
    return "pfe-navigation-main.html";
  }

  get styleUrl() {
    return "pfe-navigation-main.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["show_content"];
  }

  constructor() {
    super(PfeNavigationMain);

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this.removeEventListener("slotchange", this._init);
  }

  _init() {
    // Get all the nested navigation items
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Find the first nested element
    this.first = this.navItems.length > 0 ? this.navItems[0] : null;
    // Find the last nested element
    this.last = this.navItems[this.navItems.length - 1];

    // Ensure the necessary a11y is set
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main");

    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      item.nested = true;
    });

    // Tag the first and last navigation items for styling in mobile
    if (this.first) this.first.setAttribute("first", "");
    if (this.last) this.last.setAttribute("last", "");
  }
}

/*!
 * PatternFly Elements: PfeNavigation 1.0.0-prerelease.55
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

class PfeNavigation extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>.pfe-navigation__skip{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host{--pfe-navigation--sm-mobile:500px;--pfe-navigation--lg-mobile:640px;--pfe-navigation--sm-desktop:1024px;--pfe-navigation--Padding--vertical:var(--pfe-theme--container-padding, 16px);--pfe-navigation--Padding--horizontal:var(--pfe-theme--container-padding, 16px);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-navigation--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-navigation--BorderTopColor:transparent;--pfe-navigation--BorderColor:transparent;--pfe-navigation--MaxHeight:72px;--pfe-navigation--MobileMenuHeight:60px;--pfe-navigation--MaxWidth:calc(var(--pfe-theme--container-padding, 16px) * 4);--pfe-navigation--icon:none;--pfe-navigation__overlay--BackgroundColor:var(--pfe-theme--color--overlay, rgba(37, 37, 37, 0.5));--pfe-navigation__trigger--FontSize:16px;--pfe-navigation__trigger--FontWeight:100;--pfe-navigation__tray--Padding:var(--pfe-theme--container-padding, 16px);--pfe-navigation__logo--MinWidth:135px;--pfe-navigation--Padding:0 var(--pfe-navigation--Padding--horizontal, var(--pfe-theme--container-padding, 16px));--pfe-navigation--Border:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-navigation--BorderColor, transparent);display:block;--pfe-accordion__base--Padding:var(--pfe-theme--container-spacer, 16px);--pfe-accordion__panel-container--Padding:0 calc(var(--pfe-accordion__base--Padding) * 3) var(--pfe-accordion__base--Padding) calc(var(--pfe-accordion__base--Padding) * 1.5);z-index:0;z-index:var(--pfe-theme--zindex--content,0);width:100%}@media print{:host{--pfe-navigation--Padding:calc(var(--pfe-navigation--Padding--vertical, var(--pfe-theme--container-padding, 16px)) / 2) var(--pfe-navigation--Padding--horizontal, var(--pfe-theme--container-padding, 16px))}}:host(.pfe-sticky){position:-webkit-sticky;position:sticky;top:0;left:0;z-index:98;z-index:var(--pfe-theme--zindex--navigation,98)}@media screen and (min-width:768px){:host([pfe-full-width]) .pfe-navigation__container{--pfe-navigation--Width:calc(100% - var(--pfe-navigation--Padding--horizontal, var(--pfe-theme--container-padding, 16px)) * 4)}}@media screen and (min-width:992px){:host([pfe-full-width]) .pfe-navigation__container{--pfe-navigation--Width:calc(100% - var(--pfe-navigation--Padding--horizontal, var(--pfe-theme--container-padding, 16px)) * 4)}}@media screen and (min-width:1200px){:host([pfe-full-width]) .pfe-navigation__container{--pfe-navigation--Width:calc(100% - var(--pfe-navigation--Padding--horizontal, var(--pfe-theme--container-padding, 16px)) * 8)}}pfe-icon{--pfe-icon--Color:var(--pfe-navigation--Color, var(--pfe-theme--color--text--on-dark, #fff))}::slotted([slot=logo]){margin:0!important;max-width:100%;max-height:72px;max-height:var(--pfe-navigation--MaxHeight,72px);min-width:135px;min-width:var(--pfe-navigation__logo--MinWidth,135px);display:block}::slotted([slot=mobile-language]),::slotted([slot=mobile-login]){color:#06c;color:var(--pfe-broadcasted--link,#06c);text-decoration:none;-webkit-text-decoration:var(--pfe-broadcasted--link-decoration,none);text-decoration:var(--pfe-broadcasted--link-decoration,none)}::slotted([slot=mobile-menu--label]){font-family:var(--pfe-navigation--font-family);font-size:var(--pfe-navigation--FontSize);font-weight:var(--pfe-navigation--FontWeight);color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));margin-bottom:0}.pfe-navigation__wrapper{--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;z-index:98;z-index:var(--pfe-theme--zindex--navigation,98);background-color:#151515;background-color:var(--pfe-navigation--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff));min-height:72px;min-height:var(--pfe-navigation--MaxHeight,72px)}@media only screen and (max-height:500px){.pfe-navigation__wrapper{min-height:60px;min-height:var(--pfe-navigation--MobileMenuHeight,60px)}}.pfe-navigation__container{width:100%;margin:0 auto;padding:0 16px;padding:0 var(--pfe-navigation--Padding--horizontal,var(--pfe-theme--container-padding,16px));display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (min-width:768px){.pfe-navigation__container{padding:0;max-width:var(--pfe-navigation--Width)}}@media screen and (min-width:768px){.pfe-navigation__container{--pfe-navigation--Width:calc(768px - var(--pfe-navigation--MaxWidth, calc(var(--pfe-theme--container-padding, 16px) * 4)))}}@media screen and (min-width:992px){.pfe-navigation__container{--pfe-navigation--Width:calc(992px - var(--pfe-navigation--MaxWidth, calc(var(--pfe-theme--container-padding, 16px) * 4)))}}@media screen and (min-width:1200px){.pfe-navigation__container{--pfe-navigation--Width:calc(1200px - var(--pfe-navigation--MaxWidth, calc(var(--pfe-theme--container-padding, 16px) * 4)))}}.pfe-navigation__overlay{display:block;background-color:rgba(37,37,37,.5);background-color:var(--pfe-navigation__overlay--BackgroundColor,var(--pfe-theme--color--overlay,rgba(37,37,37,.5)));position:fixed;top:0;left:0;width:100%;height:100%;z-index:97;z-index:var(--pfe-theme--zindex--overlay,97)}.pfe-navigation__overlay[hidden]{display:none}.pfe-navigation__logo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:155px;width:var(--pfe-navigation__logo--MinWidth,155px);-webkit-box-flex:0;-webkit-flex:0 0 135px;-ms-flex:0 0 135px;flex:0 0 135px;-webkit-flex:0 0 var(--pfe-navigation__logo--MinWidth,135px);-ms-flex:0 0 var(--pfe-navigation__logo--MinWidth,135px);flex:0 0 var(--pfe-navigation__logo--MinWidth,135px);padding-top:16px;padding-top:var(--pfe-navigation--Padding--vertical,var(--pfe-theme--container-padding,16px));padding-bottom:16px;padding-bottom:var(--pfe-navigation--Padding--vertical,var(--pfe-theme--container-padding,16px));padding-right:calc(16px + 9px);padding-right:calc(var(--pfe-theme--container-padding,16px) + 9px)}@media screen and (min-width:768px){.pfe-navigation__logo{padding-right:calc(16px * 3);padding-right:calc(var(--pfe-theme--container-padding,16px) * 3)}}@media screen and (max-height:500px){.pfe-navigation__logo{padding-top:calc(16px/2);padding-top:calc(var(--pfe-navigation--Padding--vertical,var(--pfe-theme--container-padding,16px))/ 2);padding-bottom:calc(16px/2);padding-bottom:calc(var(--pfe-navigation--Padding--vertical,var(--pfe-theme--container-padding,16px))/ 2)}}@media screen and (min-width:640px){.pfe-navigation__logo{-webkit-box-flex:0;-webkit-flex:0 1 10%;-ms-flex:0 1 10%;flex:0 1 10%}}.pfe-navigation__logo>*{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-navigation__logo{-webkit-box-flex:1;-webkit-flex:1 0 15%;-ms-flex:1 0 15%;flex:1 0 15%}}.pfe-navigation__skip{display:block;margin:0 -2em -1px -1px}.pfe-navigation__main{display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));height:100%;width:100%}.pfe-navigation__main--menu-label{color:#fff;color:var(--pfe-navigation--Color,var(--pfe-theme--color--text--on-dark,#fff))}[show_login][show_language] .pfe-navigation__main,[show_search] .pfe-navigation__main{grid-gap:16px;grid-gap:var(--pfe-theme--container-spacer,16px)}.pfe-navigation__main ::slotted(:not([hidden])){display:block;grid-column:1/-1}.pfe-navigation__utility{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-flex:1;-webkit-flex:auto;-ms-flex:auto;flex:auto}@media screen and (min-width:1024px){.pfe-navigation__utility{-webkit-box-flex:1;-webkit-flex:auto;-ms-flex:auto;flex:auto;margin-left:auto}}
/*# sourceMappingURL=pfe-navigation.min.css.map */
</style><div class="pfe-navigation__wrapper">
  <div class="pfe-navigation__container">
    ${ this.has_slot("logo") ? `<div class="pfe-navigation__logo">
      <slot name="logo" tabindex="2"></slot>
    </div>` : ""}
    ${ this.has_slot("skip") ? `<div class="pfe-navigation__skip">
      <slot name="skip" tabindex="1"></slot>
    </div>` : ""}
    <pfe-navigation-item pfe-icon="web-mobile-menu">
      ${this.hasAttribute("pfe-menu-label") ? `<h2 slot="trigger" class="pfe-navigation__main--menu-label">${this.getAttribute("pfe-menu-label")}</h2>` : `<span slot="trigger"></span>`}
      <div slot="tray">
        <div class="pfe-navigation__main">
          <slot name="mobile-search"></slot>
          <slot></slot>
          ${ this.has_slot("mobile-login") ? `<pfe-navigation-item pfe-icon="web-user" variant="wind" hidden>
            <slot name="mobile-login"></slot>
          </pfe-navigation-item>` : ``}
          ${ this.has_slot("mobile-language") ? `<pfe-navigation-item pfe-icon="web-globe" variant="wind" hidden>
            <slot name="mobile-language"></slot>
          </pfe-navigation-item>` : ``}
        </div>
      </div>
    </pfe-navigation-item>
    ${ this.has_slot("language") || this.has_slot("search") || this.has_slot("login") || this.has_slot("site-switcher") ? `<div class="pfe-navigation__utility">
      <slot name="language"></slot>
      <slot name="search"></slot>
      <slot name="login"></slot>
      <slot name="site-switcher"></slot>
    </div>` : ""}
  </div>
</div>
<div class="pfe-navigation__overlay" hidden></div>`;
  }

  static get properties() {
    return {"sticky":{"title":"Sticky navigation","type":"boolean","default":true,"prefixed":true},"full-width":{"title":"Full width navigation","type":"boolean","default":false,"prefixed":true},"close-on-click":{"title":"Close navigation on click event","type":"string","enum":["external"],"default":"external","prefixed":true},"menu-label":{"title":"Mobile menu label","type":"string","default":"Menu","prefixed":true}};
  }

  static get slots() {
    return {"skip":{"title":"Skip navigation","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"logo":{"title":"Logo","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"search":{"title":"Search","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-search":{"title":"Mobile search functionality","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"main":{"title":"Main navigation","type":"array","namedSlot":false,"items":{"title":"Item","oneOf":[{"$ref":"nav"},{"$ref":"raw"}]}},"language":{"title":"Language switcher","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-language":{"title":"Mobile link to language page","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"a"}]}},"login":{"title":"Log in","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-login":{"title":"Mobile link to log in page","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"a"}]}},"site-switcher":{"title":"Site switcher","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}}};
  }
  static get tag() {
    return "pfe-navigation";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(state) {
    if (state) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");

      // This prevents background scroll while nav is open
      // document.body.style.overflow = "hidden";

      this._wrapper.setAttribute("expanded", "");
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");

      // Allow background to scroll again
      // document.body.style.overflow = "auto";

      this._wrapper.removeAttribute("expanded");
    }
  }

  static get cascadingAttributes() {
    return {
      "pfe-full-width": "pfe-navigation-item"
    };
  }

  static get observedAttributes() {
    return ["pfe-full-width"];
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setVisibility = this._setVisibility.bind(this);

    // -- handlers
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._observer = new MutationObserver(this._init);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._wrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._menuItem = this.shadowRoot.querySelector(
      `${PfeNavigationItem.tag}[pfe-icon="web-mobile-menu"]`
    );

    this._slots = {
      language: this.shadowRoot.querySelector(
        `${PfeNavigationItem.tag}[pfe-icon="web-user"]`
      ),
      login: this.shadowRoot.querySelector(
        `${PfeNavigationItem.tag}[pfe-icon="web-globe"]`
      )
    };

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    this.overlay = false;

    // make sure we close all of the nav items and hide the overlay when
    // the mobile menu button is closed
    this._menuItem.shadowRoot
      .querySelector(".pfe-navigation-item__trigger")
      .addEventListener("click", this._menuItemClickHandler);

    // make sure we close all of the nav items and hide the overlay
    // when it's clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
      // If this element contains light DOM, initialize it
      if (this.children.length) {
        // If only one value exists in the array, it starts at that size and goes up
        this.breakpoints = {
          main: [0, 1023], // visible from 0 - 1200px
          search: [640], // visible from 768px +
          "mobile-search": [0, 639],
          language: [640],
          "mobile-language": [0, 639],
          login: [640],
          "mobile-login": [0, 639]
        };

        // Kick off the initialization of the light DOM elements
        this._init();

        // Watch for screen resizing
        window.addEventListener("resize", this._resizeHandler);
      } else {
        console.error(
          "This component does not have any light DOM children.  Please check documentation for requirements."
        );
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if (
      this.hasAttribute("pfe-close-on-click") &&
      this.getAttribute("pfe-close-on-click") === "external"
    ) {
      document.removeEventListener("click", this._outsideListener);
    }

    if (
      this.hasAttribute("pfe-sticky") &&
      this.getAttribute("pfe-sticky") != "false"
    ) {
      window.removeEventListener("scroll", this._stickyHandler);
    }

    this._menuItem.shadowRoot
      .querySelector(".pfe-navigation-item__trigger")
      .removeEventListener("click", this._menuItemClickHandler);
    this._overlay.removeEventListener("click", this._overlayClickHandler);

    this._observer.disconnect();
  }

  _resizeHandler(event) {
    // Set the visibility of items
    this._setVisibility(this.offsetWidth);

    // Check what the active item is
    this._activeNavigationItems.forEach(item => {
      // If the item is open but not visible, update it to hidden
      if (item.expanded && !item.visible) {
        item.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter(
          i => i !== item
        );
      } else if (item.expanded && item.parent && item.parent.visible) {
        // if the parent is the mobile menu item and the size of the window is within
        // the main breakpoint, make sure that the mobile menu is expanded
        if (
          item.parent === this._menuItem &&
          window.innerWidth <= this.breakpoints.main[1]
        ) {
          item.parent.expanded = true; // Ensure the parent is open
          // If the parent item doesn't exist in the active array, add it
          if (!this._activeNavigationItems.includes(item.parent)) {
            this._activeNavigationItems.push(item.parent);
          }
        }
      }
    });

    this.overlay = this._activeNavigationItems.length > 0;

    // update the reported height
    this._reportHeight();
  }

  _stickyHandler() {
    if (window.pageYOffset >= this.top) {
      this.classList.add("pfe-sticky");
    } else {
      this.classList.remove("pfe-sticky");
    }
  }

  _outsideListener(event) {
    // Check if the clicked element is the navigation object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the navigation element
    let isChild = event.target.closest("pfe-navigation");
    let insideWrapper = event.target.tagName.includes("-")
      ? event.target.shadowRoot.querySelector("pfe-navigation")
      : null;

    // Check states to determine if the navigation items should close
    if (!isSelf && !(isChild || insideWrapper)) {
      this._activeNavigationItems.map(item => item.close());
    }
  }

  _setVisibility(width) {
    Object.keys(this.breakpoints).forEach(label => {
      let bps = this.breakpoints[label];
      let start = bps[0];
      let end = bps[1];
      let isVisible = false;

      // If the slot exists, set attribute based on supported breakpoints
      if (
        this.slots[label] &&
        this.slots[label].nodes &&
        this.slots[label].nodes.length > 0
      ) {
        if (width >= start && (!end || (end && width <= end))) {
          isVisible = true;
        }

        this.slots[label].nodes.forEach(node => {
          switch (label) {
            case "main":
              if (isVisible) {
                node.removeAttribute("show_content");
                this._menuItem.removeAttribute("show_links");
              } else {
                node.setAttribute("show_content", "");
                this._menuItem.setAttribute("show_links", "");
                this._menuItem.expanded = false;
                this._menuItem.tray.removeAttribute("hidden");
                // Remove menuItem from active items
                this._activeNavigationItems = this._activeNavigationItems.filter(
                  item => item !== this._menuItem
                );
              }
              node.navItems.forEach(item => {
                if (isVisible) {
                  item.removeAttribute("parent_hidden");
                } else {
                  item.setAttribute("parent_hidden", "");
                }
              });
              break;
            case (label.match(/^mobile/) || {}).input:
              if (isVisible) {
                // Set an attribute to show this region (strip the mobile prefix)
                this._menuItem.setAttribute(`show_${label.slice(7)}`, "");
                if (this._slots[label.slice(7)])
                  this._slots[label.slice(7)].removeAttribute("hidden");
                node.removeAttribute("hidden");
              } else {
                this._menuItem.removeAttribute(`show_${label.slice(7)}`);
                if (this._slots[label.slice(7)])
                  this._slots[label.slice(7)].setAttribute("hidden", "");
                node.setAttribute("hidden", "");
              }
              break;
            default:
              node.visible = isVisible;
              break;
          }
        });
      }
    });
  }

  _init() {
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Add the menu element to the list of navigation items
    // do this manually because menu item is in the shadow dom
    if (this._menuItem) this.navItems.push(this._menuItem);

    // Attach a reference to the navigation container to the children
    this.navItems.forEach(item => {
      item.navigationWrapper = this;
    });

    // Connect the shadow menu with the main component
    let mainNav = this.querySelector("pfe-navigation-main");
    if (mainNav && mainNav.navItems) {
      mainNav.navItems.forEach(item => {
        item.parent = this._menuItem;
      });
    }

    // Start by setting the visibility of the slots
    this._setVisibility(this.offsetWidth);

    // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
    if (
      this.hasAttribute("pfe-sticky") &&
      this.getAttribute("pfe-sticky") != "false"
    ) {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", this._stickyHandler);
    }

    // Listen for clicks outside the navigation element
    if (
      this.hasAttribute("pfe-close-on-click") &&
      this.getAttribute("pfe-close-on-click") === "external"
    ) {
      document.addEventListener("click", this._outsideListener);
    }

    // report the height of this pfe-navigation element
    this._reportHeight();

    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }, 0);
    }
  }

  _menuItemClickHandler(event) {
    if (event.currentTarget.getAttribute("aria-expanded") === "false") {
      this._activeNavigationItems.map(item => item.close());
      this.overlay = false;
    }
  }

  _overlayClickHandler(event) {
    this._activeNavigationItems.map(item => item.close());
    this.overlay = false;
  }

  /**
   * Set a global CSS variable reporting the height of this navigation item.
   * Used to position sticky subnavigation items under this.
   *
   * The name of the global CSS variable is `--pfe-navigation--Height--actual`.
   */
  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const height = this.clientHeight + "px";
    document.body.style.setProperty(cssVarName, height);
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
//# sourceMappingURL=pfe-navigation.js.map
