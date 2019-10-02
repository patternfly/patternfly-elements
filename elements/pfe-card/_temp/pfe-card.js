/*!
 * PatternFly Elements: PfeCard 1.0.0-prerelease.24
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

import PFElement from "../pfelement/pfelement.js";

// -- Polyfill for supporting Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

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

// -- Polyfill for supporting Array.includes
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

class PfeCard extends PFElement {
  static get version() {
    return "1.0.0-prerelease.24";
  }

  get html() {
    return `<style>:host{--pfe-card--PaddingTop:calc(var(--pfe-theme--container-spacer, 1rem) * 2);--pfe-card--PaddingRight:calc(var(--pfe-theme--container-spacer, 1rem) * 2);--pfe-card--PaddingBottom:calc(var(--pfe-theme--container-spacer, 1rem) * 2);--pfe-card--PaddingLeft:calc(var(--pfe-theme--container-spacer, 1rem) * 2);--pfe-card--Padding:var(--pfe-card--PaddingTop) var(--pfe-card--PaddingRight) var(--pfe-card--PaddingBottom) var(--pfe-card--PaddingLeft);--pfe-card--spacing:var(--pfe-theme--container-spacer, 1rem);--pfe-card--BorderRadius:var(--pfe-theme--surface--border-radius, 3px);--pfe-card--Border:var(--pfe-card--BorderWeight, 0) var(--pfe-card--BorderStyle, solid) var(--pfe-card--BorderColor, transparent);--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-card--BackgroundPosition:center center;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--base--link, #00538c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--base--link--visited, #7551a6);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--base--link--hover, #00305b);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--base--link--focus, #00305b);--pfe-card__header--BackgroundColor:rgba(45, 45, 45, var(--pfe-theme--opacity, 0.3));--pfe-card__header--Color:var(--pfe-broadcasted--color--text);--pfe-card--padding:var(--pfe-card--Padding);--pfe-card--bg:var(--pfe-card--BackgroundColor)}:host([pfelement]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;justify-items:flex-start;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;padding:var(--pfe-card--Padding);border:var(--pfe-card--Border);border-radius:var(--pfe-card--BorderRadius);overflow:hidden;background-color:var(--pfe-card--BackgroundColor);background-position:var(--pfe-card--BackgroundPosition);color:var(--pfe-broadcasted--color--text)}:host([color=dark]),:host([pfe-color=dark]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darker--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darker--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darker--link--focus, #cce6ff)}:host([color=darker]),:host([pfe-color=darker]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darker--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darker--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darker--link--focus, #cce6ff)}:host([color=darkest]),:host([pfe-color=darkest]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darkest--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff)}:host([color=light]),:host([pfe-color=light]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lighter--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lighter--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lighter--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lighter--link--focus, #003366)}:host([color=lighter]),:host([pfe-color=lighter]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lighter--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lighter--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lighter--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lighter--link--focus, #003366)}:host([color=lightest]),:host([pfe-color=lightest]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lightest--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lightest--link--focus, #003366)}:host([color=complement]),:host([pfe-color=complement]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--complement, #0477a4);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--complement--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--complement--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--complement--link--focus, #cce6ff)}:host([color=accent]),:host([pfe-color=accent]){--pfe-card--BackgroundColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--accent--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--accent--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--accent--link--focus, #cce6ff)}:host([pfe-size=small]),:host([size=small]){--pfe-card--PaddingTop:var(--pfe-theme--container-spacer, 1rem);--pfe-card--PaddingRight:var(--pfe-theme--container-spacer, 1rem);--pfe-card--PaddingBottom:var(--pfe-theme--container-spacer, 1rem);--pfe-card--PaddingLeft:var(--pfe-theme--container-spacer, 1rem)}::slotted([pfe-overflow~=top]){z-index:1;margin-top:-2rem;margin-top:calc(-1 * var(--pfe-card--PaddingTop))!important}:host([has_header]) ::slotted([pfe-overflow~=top]){padding-top:var(--pfe-card--spacing)}::slotted([pfe-overflow~=right]){margin-right:-2rem;margin-right:calc(-1 * var(--pfe-card--PaddingRight))}::slotted([pfe-overflow~=bottom]){margin-bottom:-2rem;margin-bottom:calc(-1 * calc(var(--pfe-card--PaddingBottom) + var(--pfe-card--BorderRadius)));-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}::slotted([pfe-overflow~=left]){margin-left:-2rem;margin-left:calc(-1 * var(--pfe-card--PaddingLeft))}::slotted(img){max-width:100%}::slotted(img[pfe-overflow~=right]){max-width:calc(100% + 2rem);max-width:calc(100% + var(--pfe-card--PaddingRight))}::slotted(img[pfe-overflow~=left]){max-width:calc(100% + 2rem);max-width:calc(100% + var(--pfe-card--PaddingLeft))}::slotted(img[pfe-overflow~=right][pfe-overflow~=left]){max-width:calc(100% + 4rem);max-width:calc(100% + calc(var(--pfe-card--PaddingRight) + var(--pfe-card--PaddingLeft)))}::slotted(p){margin-top:0}::slotted(h1){margin-top:0}::slotted(h2){margin-top:0}::slotted(h3){margin-top:0}::slotted(h4){margin-top:0}::slotted(h5){margin-top:0}::slotted(h6){margin-top:0}::slotted([slot=pfe-card--header]){display:block;z-index:2;background-color:var(--pfe-card__header--BackgroundColor);color:var(--pfe-card__header--Color);margin-top:-2rem;margin-top:calc(-1 * var(--pfe-card--PaddingTop))!important;margin-right:-2rem;margin-right:calc(-1 * var(--pfe-card--PaddingRight));margin-bottom:var(--pfe-card--spacing);margin-left:-2rem;margin-left:calc(-1 * var(--pfe-card--PaddingLeft));padding-top:var(--pfe-card--spacing);padding-right:var(--pfe-card--PaddingRight);padding-left:var(--pfe-card--PaddingLeft);padding-bottom:var(--pfe-card--spacing)}::slotted(:not([slot])){display:block;margin-bottom:var(--pfe-card--spacing)}::slotted([slot=pfe-card--footer]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column wrap;-ms-flex-flow:column wrap;flex-flow:column wrap;margin-top:auto;justify-self:flex-end}.pfe-card__body:last-child,.pfe-card__header:last-child{margin-bottom:0}</style><slot class="pfe-card__header" name="pfe-card--header"></slot>
<slot class="pfe-card__body"></slot>
<slot class="pfe-card__footer" name="pfe-card--footer"></slot>`;
  }

  static get properties() {
    return {"color":{"title":"Background color","type":"string","enum":["lightest","lighter","base","darker","darkest","complement","accent"],"default":"base","observer":"_colorChanged"},"img-src":{"title":"Background image","type":"string","observer":"_imgSrcChanged"},"size":{"title":"Padding size","type":"string","enum":["small"],"observer":"_basicAttributeChanged"}};
  }

  static get slots() {
    return {"header":{"title":"Header","type":"array","namedSlot":true,"maxItems":3,"items":{"title":"Body item","oneOf":[{"$ref":"raw"}]}},"body":{"title":"Body","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-card"},{"$ref":"raw"}]}},"footer":{"title":"Footer","type":"array","namedSlot":true,"maxItems":3,"items":{"oneOf":[{"$ref":"pfe-cta"},{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-card";
  }

  get schemaUrl() {
    return "pfe-card.json";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return (
      this.getAttribute("pfe-color") || this.getAttribute("color") || "base"
    );
  }

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src", "pfe-size"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
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

  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

}

PFElement.create(PfeCard);

export { PfeCard as default };
