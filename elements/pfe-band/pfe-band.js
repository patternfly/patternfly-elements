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
 */

class PfeBand extends PFElement {
  get html() {
    return `<style>:host {
  display: block;
  --pfe-band--padding__vertical:                 calc( var(--pfe-theme--container-spacer, 1rem) * 4);
  --pfe-band--padding__horizontal:               calc( var(--pfe-theme--container-spacer, 1rem) * 1);
  --pfe-band--padding:                         var(--pfe-band--padding__vertical)  var(--pfe-band--padding__horizontal);
  --pfe-band--backgroundColor:                 var(--pfe-theme--color--surface--base, #dfdfdf);
  --pfe-band--backgroundPositionX:             center;
  --pfe-band--backgroundPositionY:             center;
  --pfe-band--border:                          var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;
  --pfe-band_header-title--color:             var(--pfe-theme--color--ui-accent, #fe460d);
  --pfe-band_header--layout:                   1fr;
  --pfe-band_body--layout:                     1fr;
  --pfe-band_footer--layout:                   1fr;
  --pfe-band_aside--layout:                    300px;
  --pfe-band--gutter:                          calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-broadcasted--color--text:              var(--pfe-theme--color--surface--base--text, #333);
  --pfe-broadcasted--color--ui-link:           var(--pfe-theme--color--surface--base--link, #00538c);
  --pfe-broadcasted--color--ui-link--visited:  var(--pfe-theme--color--surface--base--link--visited, #7551a6);
  --pfe-broadcasted--color--ui-link--hover:    var(--pfe-theme--color--surface--base--link--hover, #00305b);
  --pfe-broadcasted--color--ui-link--focus:    var(--pfe-theme--color--surface--base--link--focus, #00305b);
  --pfe-band--width: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: calc(var(--pfe-band--padding__vertical) / 2) var(--pfe-band--padding__horizontal);
  border: var(--pfe-band--border);
  background-color: var(--pfe-band--backgroundColor);
  background-position-x: var(--pfe-band--backgroundPositionX);
  background-position-y: var(--pfe-band--backgroundPositionY);
  color: var(--pfe-broadcasted--color--text); }
  @media screen and (min-width: 768px) {
    :host {
      --pfe-band--width: calc( 768px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }
  @media screen and (min-width: 992px) {
    :host {
      --pfe-band--width: calc( 992px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }
  @media screen and (min-width: 1200px) {
    :host {
      --pfe-band--width: calc( 1200px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }
  @media print {
    :host {
      --pfe-band--padding: calc(var(--pfe-band--padding__vertical) / 2) var(--pfe-band--padding__horizontal); } }
  @media (min-width: 576px) {
    :host {
      padding: var(--pfe-band--padding); } }
  @media print {
    :host {
      background-color: white !important;
      background-image: none !important;
      box-shadow: none !important; } }
  :host *, :host *::before, :host *::after {
    box-sizing: border-box; }

:host([pfe-color="darker"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }

:host([pfe-color="darkest"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([pfe-color="accent"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--accent, #fe460d);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }

:host([pfe-color="complement"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--complement, #0477a4);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }

:host([pfe-color="lighter"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }

:host([pfe-color="lightest"]) {
  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }

:host([pfe-size="small"]) {
  --pfe-band--padding:   calc(var(--pfe-band--padding__vertical) / 4)  var(--pfe-band--padding__horizontal); }

.pfe-band__container, .pfe-band__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column; }
  @media (min-width: 768px) {
    .pfe-band__container, .pfe-band__content {
      flex-direction: row; } }

.pfe-band__container {
  margin: 0 auto;
  max-width: var(--pfe-band--width); }

@media (max-width: 768px - 1) {
  .pfe-band__container > *:not(:last-child), .pfe-band__content > *:not(:last-child) {
    margin-bottom: var(--pfe-theme--container-spacer, 1rem); } }

.pfe-band__main, .pfe-band__body {
  flex: 1; }
  .pfe-band__main > *:not(:last-child), .pfe-band__body > *:not(:last-child) {
    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }

.pfe-band__header, .pfe-band__body, .pfe-band__footer, .pfe-band__aside {
  display: block;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--pfe-theme--container-spacer, 1rem); }
  .pfe-band__header::slotted(*), .pfe-band__body::slotted(*), .pfe-band__footer::slotted(*), .pfe-band__aside::slotted(*) {
    margin-top: 0; }

@media screen and (min-width: 768px) {
  .pfe-band__header {
    grid-template-columns: var(--pfe-band_header--layout); } }

.pfe-band__body {
  flex-grow: 1; }
  @media screen and (min-width: 768px) {
    .pfe-band__body {
      grid-template-columns: var(--pfe-band_body--layout); }
      [pfe-aside-height="full"] .pfe-band__body {
        margin-right: 0;
        margin-left: 0; } }

@media screen and (min-width: 768px) {
  .pfe-band__footer {
    grid-template-columns: var(--pfe-band_footer--layout); } }

.pfe-band__aside {
  min-width: 240px; }
  @media screen and (min-width: 768px) {
    .pfe-band__aside {
      grid-template-columns: var(--pfe-band_aside--layout); } }
  @media screen and (min-width: 768px) and (max-width: 992px - 1) {
    .pfe-band__aside {
      --pfe-band_aside--layout: 240px; } }
  @media screen and (min-width: 768px) {
    .pfe-band__aside {
      margin-left: var(--pfe-band--gutter);
      order: 2; }
      [pfe-aside-desktop="left"] .pfe-band__aside {
        order: -1;
        margin-right: var(--pfe-band--gutter);
        margin-left: 0; } }</style>
<div class="pfe-band__container">
  ${
    this.has_slot("aside") &&
    this.asidePosition.height === "full" &&
    this.asidePosition.mobile === "top"
      ? `<slot class="pfe-band__aside" name="aside"></slot>`
      : ""
  }
  <section class="pfe-band__main">
    ${
      this.has_slot("header")
        ? `<slot class="pfe-band__header" name="header"></slot>`
        : ""
    }
    <div class="pfe-band__content">
      ${
        this.has_slot("aside") &&
        this.asidePosition.height !== "full" &&
        this.asidePosition.mobile === "top"
          ? `<slot class="pfe-band__aside" name="aside"></slot>`
          : ""
      }
      <slot class="pfe-band__body"></slot>
      ${
        this.has_slot("aside") &&
        this.asidePosition.height !== "full" &&
        this.asidePosition.mobile !== "top"
          ? `<slot class="pfe-band__aside" name="aside"></slot>`
          : ""
      }
    </div>
    ${
      this.has_slot("footer")
        ? `<slot class="pfe-band__footer" name="footer"></slot>`
        : ""
    }
  </section>
  ${
    this.has_slot("aside") &&
    this.asidePosition.height === "full" &&
    this.asidePosition.mobile !== "top"
      ? `<slot class="pfe-band__aside" name="aside"></slot>`
      : ""
  }
</div>`;
  }

  static get properties() {
    return {
      "pfe-color": {
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
      "pfe-img-src": {
        title: "Background image",
        type: "string",
        default: "",
        observer: "_imgSrcChanged"
      },
      "pfe-aside-desktop": {
        title: "Aside positioning (desktop)",
        type: "string",
        default: "right",
        enum: ["right", "left"],
        observer: "_basicAttributeChanged"
      },
      "pfe-aside-mobile": {
        title: "Aside positioning (mobile)",
        type: "string",
        default: "bottom",
        enum: ["top", "bottom"],
        observer: "_basicAttributeChanged"
      },
      "pfe-aside-height": {
        title: "Aside height",
        type: "string",
        default: "body",
        enum: ["full", "body"],
        observer: "_basicAttributeChanged"
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
  static get pfeType() {
    return PFElement.pfeType.container;
  }

  constructor() {
    super(PfeBand);
  }

  connectedCallback() {
    super.connectedCallback();

    // If a color is defined, update context for children
    if (this["pfe-color"]) {
      this._updateContext(this["pfe-color"].value);
    }
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    // this.setAttribute(attr, newValue);
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    // this.setAttribute(attr, newValue);
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
    if (["darkest", "dark"].includes(context)) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(elementName)];
        els.forEach(el => {
          el.setAttribute("on", "dark");
        });
      });
    }
  }
}

PFElement.create(PfeBand);

export default PfeBand;
//# sourceMappingURL=pfe-band.js.map
