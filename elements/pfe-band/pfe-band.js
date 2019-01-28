import PFElement from "../pfelement/pfelement.js";

/*
 * Copyright 2018 Red Hat, Inc.
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

class PfeBand extends PFElement {
  get html() {
    return `<style>:host {
  display: block;
  --pfe-band--Padding--vertical:               calc( var(--pfe-theme--container-spacer, 1rem) * 4);
  --pfe-band--Padding--horizontal:             calc( var(--pfe-theme--container-spacer, 1rem) * 1);
  --pfe-band--Padding:                         var(--pfe-band--Padding--vertical)  var(--pfe-band--Padding--horizontal);
  --pfe-band--BackgroundColor:                 var(--pfe-theme--color--surface--base, #dfdfdf);
  --pfe-band--BackgroundPosition:              center center;
  --pfe-band--Border:                          var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;
  --pfe-band--layout:                           1fr;
  --pfe-band__header--layout:                   1fr;
  --pfe-band__body--layout:                     1fr;
  --pfe-band__footer--layout:                   1fr;
  --pfe-band__aside--layout:                    1fr;
  --pfe-band--gutter--vertical:                 var(--pfe-theme--container-spacer, 1rem);
  --pfe-band--gutter--horizontal:               calc(var(--pfe-theme--container-spacer, 1rem) * 3);
  --pfe-broadcasted--color--text:              var(--pfe-theme--color--surface--base--text, #333);
  --pfe-broadcasted--color--ui-link:           var(--pfe-theme--color--surface--base--link, #00538c);
  --pfe-broadcasted--color--ui-link--visited:  var(--pfe-theme--color--surface--base--link--visited, #7551a6);
  --pfe-broadcasted--color--ui-link--hover:    var(--pfe-theme--color--surface--base--link--hover, #00305b);
  --pfe-broadcasted--color--ui-link--focus:    var(--pfe-theme--color--surface--base--link--focus, #00305b);
  --pfe-band--Width: auto;
  --pfe-band--Width__aside--sm: 240px;
  --pfe-band--Width__aside--lg: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: calc(var(--pfe-band--Padding--vertical) / 2) var(--pfe-band--Padding--horizontal);
  border: var(--pfe-band--Border);
  background-color: var(--pfe-band--BackgroundColor);
  background-position: var(--pfe-band--BackgroundPosition);
  color: var(--pfe-broadcasted--color--text); }
  @media screen and (min-width: 768px) {
    :host {
      --pfe-band--Width: calc( 768px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }
  @media screen and (min-width: 992px) {
    :host {
      --pfe-band--Width: calc( 992px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }
  @media screen and (min-width: 1200px) {
    :host {
      --pfe-band--Width: calc( 1200px - calc(var(--pfe-band--Padding--horizontal) * 4) ); } }
  @media print {
    :host {
      --pfe-band--Padding: calc(var(--pfe-band--Padding--vertical) / 2) var(--pfe-band--Padding--horizontal); } }
  @media (min-width: 576px) {
    :host {
      padding: var(--pfe-band--Padding); } }
  @media print {
    :host {
      background-color: white !important;
      background-image: none !important;
      box-shadow: none !important; } }
  :host *, :host *::before, :host *::after {
    box-sizing: border-box; }

:host([pfe-color="darker"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }

:host([pfe-color="darkest"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([pfe-color="accent"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--accent, #fe460d);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }

:host([pfe-color="complement"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--complement, #0477a4);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }

:host([pfe-color="lighter"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }

:host([pfe-color="lightest"]) {
  --pfe-band--BackgroundColor:                  var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }

:host([pfe-size="small"]) {
  --pfe-band--Padding:   calc(var(--pfe-band--Padding--vertical) / 4)  var(--pfe-band--Padding--horizontal); }

.pfe-band__body {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start; }
  @supports (display: grid) {
    .pfe-band__body {
      grid-area: body;
      display: grid;
      grid-row-gap: var(--pfe-band--gutter--vertical);
      grid-column-gap: var(--pfe-band--gutter--horizontal);
      grid-template-columns: var(--pfe-band__body--layout); } }

::slotted(*) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted(*) {
      margin-bottom: 0; } }

::slotted(*) {
  margin: 0; }

::slotted(*) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted(*) {
      margin-bottom: 0; } }

.pfe-band__header {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start; }
  @supports (display: grid) {
    .pfe-band__header {
      grid-area: header;
      display: grid;
      grid-row-gap: var(--pfe-band--gutter--vertical);
      grid-column-gap: var(--pfe-band--gutter--horizontal);
      grid-template-columns: var(--pfe-band__header--layout); } }

::slotted([slot="pfe-band--header"]:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--header"]:not(:last-child)) {
      margin-bottom: 0; } }

::slotted([slot="pfe-band--header"] > *) {
  margin: 0; }

::slotted([slot="pfe-band--header"] > *:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--header"] > *:not(:last-child)) {
      margin-bottom: 0; } }

.pfe-band__footer {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start; }
  @supports (display: grid) {
    .pfe-band__footer {
      grid-area: footer;
      display: grid;
      grid-row-gap: var(--pfe-band--gutter--vertical);
      grid-column-gap: var(--pfe-band--gutter--horizontal);
      grid-template-columns: var(--pfe-band__footer--layout); } }

::slotted([slot="pfe-band--footer"]:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--footer"]:not(:last-child)) {
      margin-bottom: 0; } }

::slotted([slot="pfe-band--footer"] > *) {
  margin: 0; }

::slotted([slot="pfe-band--footer"] > *:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--footer"] > *:not(:last-child)) {
      margin-bottom: 0; } }

.pfe-band__aside {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start; }
  @supports (display: grid) {
    .pfe-band__aside {
      grid-area: aside;
      display: grid;
      grid-row-gap: var(--pfe-band--gutter--vertical);
      grid-column-gap: var(--pfe-band--gutter--horizontal);
      grid-template-columns: var(--pfe-band__aside--layout); } }

::slotted([slot="pfe-band--aside"]:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--aside"]:not(:last-child)) {
      margin-bottom: 0; } }

::slotted([slot="pfe-band--aside"] > *) {
  margin: 0; }

::slotted([slot="pfe-band--aside"] > *:not(:last-child)) {
  margin-bottom: var(--pfe-band--gutter--vertical); }
  @supports (display: grid) {
    ::slotted([slot="pfe-band--aside"] > *:not(:last-child)) {
      margin-bottom: 0; } }

.pfe-band__container {
  --pfe-band_region--width: calc(calc(1fr - var(--pfe-band--Width__aside--sm)) - var(--pfe-band--gutter--horizontal));
  --pfe-band--gridTemplateArea_mobile: "body";
  position: relative;
  margin: 0 auto;
  width: var(--pfe-band--Width); }
  .pfe-band__container[pfe-has-aside] {
    --pfe-band--gridTemplateArea_mobile: "body" "aside";
    --pfe-band--gridTemplateArea_desktop: "body aside"; }
    @media (min-width: 768px) {
      .pfe-band__container[pfe-has-aside] {
        --pfe-band--layout: 1fr var(--pfe-band--Width__aside--sm); } }
    @media (min-width: 992px) {
      .pfe-band__container[pfe-has-aside] {
        --pfe-band--layout: 1fr var(--pfe-band--Width__aside--lg); } }
    .pfe-band__container[pfe-has-aside][pfe-aside-mobile="top"] {
      --pfe-band--gridTemplateArea_mobile: "aside" "body"; }
    .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {
      --pfe-band--gridTemplateArea_desktop: "aside body"; }
      @media (min-width: 768px) {
        .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {
          --pfe-band--layout: var(--pfe-band--Width__aside--sm) 1fr; } }
      @media (min-width: 992px) {
        .pfe-band__container[pfe-has-aside][pfe-aside-desktop="left"] {
          --pfe-band--layout: var(--pfe-band--Width__aside--lg) 1fr; } }
  .pfe-band__container[pfe-has-header] {
    --pfe-band--gridTemplateArea_mobile: "header" "body"; }
    .pfe-band__container[pfe-has-header][pfe-has-aside] {
      --pfe-band--gridTemplateArea_mobile: "header" "body" "aside";
      --pfe-band--gridTemplateArea_desktop: "header header" "body aside"; }
    .pfe-band__container[pfe-has-header][pfe-aside-mobile="top"] {
      --pfe-band--gridTemplateArea_mobile: "aside" "header" "body"; }
    .pfe-band__container[pfe-has-header][pfe-aside-height="full"] {
      --pfe-band--gridTemplateArea_desktop: "header aside" "body aside"; }
    .pfe-band__container[pfe-has-header][pfe-aside-desktop="left"] {
      --pfe-band--gridTemplateArea_desktop: "header header" "aside body"; }
      .pfe-band__container[pfe-has-header][pfe-aside-desktop="left"][pfe-aside-height="full"] {
        --pfe-band--gridTemplateArea_desktop: "aside header" "aside body"; }
  .pfe-band__container[pfe-has-footer] {
    --pfe-band--gridTemplateArea_mobile: "body" "footer"; }
    .pfe-band__container[pfe-has-footer][pfe-has-aside] {
      --pfe-band--gridTemplateArea_mobile: "body" "aside" "footer";
      --pfe-band--gridTemplateArea_desktop: "body aside" "footer footer"; }
    .pfe-band__container[pfe-has-footer][pfe-aside-mobile="top"] {
      --pfe-band--gridTemplateArea_mobile: "aside" "body" "footer"; }
    .pfe-band__container[pfe-has-footer][pfe-aside-height="full"] {
      --pfe-band--gridTemplateArea_desktop: "body aside" "footer aside" ; }
    .pfe-band__container[pfe-has-footer][pfe-aside-desktop="left"] {
      --pfe-band--gridTemplateArea_desktop: "aside body" "footer footer"; }
      .pfe-band__container[pfe-has-footer][pfe-aside-desktop="left"][pfe-aside-height="full"] {
        --pfe-band--gridTemplateArea_desktop: "aside body" "aside footer"; }
  .pfe-band__container[pfe-has-header][pfe-has-footer] {
    --pfe-band--gridTemplateArea_mobile: "header" "body" "footer"; }
    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-has-aside] {
      --pfe-band--gridTemplateArea_mobile: "header" "body" "footer" "aside";
      --pfe-band--gridTemplateArea_desktop: "header header" "body aside" "footer footer"; }
    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-mobile="top"] {
      --pfe-band--gridTemplateArea_mobile: "aside" "header" "body" "footer"; }
    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-height="full"] {
      --pfe-band--gridTemplateArea_desktop: "header aside" "body aside" "footer aside" ; }
    .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop="left"] {
      --pfe-band--gridTemplateArea_desktop: "header header" "aside body" "footer footer"; }
      .pfe-band__container[pfe-has-header][pfe-has-footer][pfe-aside-desktop="left"][pfe-aside-height="full"] {
        --pfe-band--gridTemplateArea_desktop: "aside header" "aside body" "aside footer"; }
  @supports (display: grid) {
    .pfe-band__container {
      display: grid;
      grid-row-gap: var(--pfe-band--gutter--vertical);
      grid-column-gap: var(--pfe-band--gutter--horizontal);
      grid-template-columns: var(--pfe-band--layout);
      grid-template-rows: max-content;
      grid-template-areas: var(--pfe-band--gridTemplateArea_mobile); }
      @media (min-width: 768px) {
        .pfe-band__container {
          grid-template-areas: var(--pfe-band--gridTemplateArea_desktop); } } }</style>
<section class="pfe-band__container"${["header", "footer", "aside"]
      .map(
        slot => (this.has_slot(`pfe-band--${slot}`) ? `pfe-has-${slot}` : "")
      )
      .join(" ")}>
  ${
    this.has_slot("pfe-band--aside") && this.asidePosition.mobile === "top"
      ? `<slot class="pfe-band__aside" name="pfe-band--aside"></slot>`
      : ""
  }
  ${
    this.has_slot("pfe-band--header")
      ? `<slot class="pfe-band__header" name="pfe-band--header"></slot>`
      : ""
  }
  <slot class="pfe-band__body"></slot>
  ${
    this.has_slot("pfe-band--aside") && this.asidePosition.mobile !== "top"
      ? `<slot class="pfe-band__aside" name="pfe-band--aside"></slot>`
      : ""
  }
  ${
    this.has_slot("pfe-band--footer")
      ? `<slot class="pfe-band__footer" name="pfe-band--footer"></slot>`
      : ""
  }
</section>`;
  }

  static get properties() {
    return {
      color: {
        title: "Background color",
        type: "string",
        enum: [
          "lightest",
          "lighter",
          "base",
          "darker",
          "darkest",
          "complement",
          "accent"
        ],
        default: "base",
        observer: "_colorChanged"
      },
      "img-src": {
        title: "Background image",
        type: "string",
        observer: "_imgSrcChanged"
      },
      "aside-desktop": {
        title: "Aside positioning (desktop)",
        type: "string",
        default: "right",
        enum: ["right", "left"],
        observer: "_basicAttributeChanged",
        options: { dependencies: [{ type: "slot", id: "aside" }] }
      },
      "aside-mobile": {
        title: "Aside positioning (mobile)",
        type: "string",
        default: "bottom",
        enum: ["top", "bottom"],
        observer: "_basicAttributeChanged",
        options: { dependencies: [{ type: "slot", id: "aside" }] }
      },
      "aside-height": {
        title: "Aside height",
        type: "string",
        default: "body",
        enum: ["full", "body"],
        observer: "_basicAttributeChanged",
        options: { dependencies: [{ type: "slot", id: "aside" }] }
      }
    };
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: { title: "Body item", oneOf: [{ $ref: "raw" }] }
      },
      body: {
        title: "Body",
        type: "array",
        namedSlot: false,
        items: { oneOf: [{ $ref: "pfe-card" }, { $ref: "raw" }] }
      },
      footer: {
        title: "Footer",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: { oneOf: [{ $ref: "pfe-cta" }, { $ref: "raw" }] }
      },
      aside: {
        title: "Aside",
        type: "array",
        namedSlot: true,
        maxItems: 5,
        items: { oneOf: [{ $ref: "pfe-card" }, { $ref: "raw" }] }
      }
    };
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
    // Initialize the context setting for the children elements
    if (this.backgroundColor) {
      this._updateContext(this.backgroundColor);
    }
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
    // If the new value has a dark background, update children elements
    this._updateContext(newValue);
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

  // Set the children's context if parent background is dark
  _updateContext(context) {
    if (["darkest", "darker", "complement", "accent"].includes(context)) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(`${elementName}`)];
        els.forEach(el => {
          const myContainer = el.closest("[pfe-type=container]");
          if (myContainer === this || myContainer === null) {
            el.setAttribute("on", "dark");
          }
        });
      });
    }
  }
}

PFElement.create(PfeBand);

export default PfeBand;
//# sourceMappingURL=pfe-band.js.map
