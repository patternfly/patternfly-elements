import RHElement from "../rhelement/rhelement.js";

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

class RhBand extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block;
  --rh-band--padding__vertical:                 calc( var(--rh-theme--container-spacer, 1rem) * 4);
  --rh-band--padding__horizontal:               calc( var(--rh-theme--container-spacer, 1rem) * 1);
  --rh-band--padding:                         var(--rh-band--padding__vertical)  var(--rh-band--padding__horizontal);
  --rh-band--backgroundColor:                 var(--rh-theme--color--surface--base, #dfdfdf);
  --rh-band--backgroundPositionX:             center;
  --rh-band--backgroundPositionY:             center;
  --rh-band--borderColor:                     transparent;
  --rh-band--borderTopWidth:                  var(--rh-theme--surface--border-width, 1px);
  --rh-band--borderBottomWidth:               var(--rh-theme--surface--border-width, 1px);
  --rh-band--borderStyle:                     var(--rh-theme--surface--border-style, solid);
  --rh-band_header-title--color:             var(--rh-theme--color--ui-accent, #fe460d);
  --rh-band_header--layout:                   1fr;
  --rh-band_body--layout:                     1fr;
  --rh-band_footer--layout:                   1fr;
  --rh-band_aside--layout:                    300px;
  --rh-band--gutter:                          calc(var(--rh-theme--container-spacer, 1rem) * 2);
  --rh-broadcasted--color--text:              var(--rh-theme--color--surface--base--text, #333);
  --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--base--link, #00538c);
  --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--base--link--visited, #7551a6);
  --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--base--link--hover, #00305b);
  --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--base--link--focus, #00305b);
  --rh-band--width:                           auto; }
  :host *, :host *::before, :host *::after {
    box-sizing: border-box; }
  @media screen and (min-width: 768px) {
    :host {
      --rh-band--width: calc( 768px - calc(var(--rh-band--padding__horizontal) * 4) ); } }
  @media screen and (min-width: 992px) {
    :host {
      --rh-band--width: calc( 992px - calc(var(--rh-band--padding__horizontal) * 4) ); } }
  @media screen and (min-width: 1200px) {
    :host {
      --rh-band--width: calc( 1200px - calc(var(--rh-band--padding__horizontal) * 4) ); } }
  @media print {
    :host {
      --rh-band--padding:    calc(var(--rh-band--padding__vertical) / 2)  var(--rh-band--padding__horizontal); } }

:host([color="dark"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--dark, #464646);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--dark--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--dark--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--dark--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--dark--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--dark--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--darkest, #131313);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darkest--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darkest--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darkest--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darkest--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([color="accent"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--accent, #fe460d);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--accent--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--accent--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--accent--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--accent--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--accent--link--focus, #cce6ff); }

:host([color="complement"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--complement, #0477a4);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--complement--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--complement--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--complement--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--complement--link--focus, #cce6ff); }

:host([color="light"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--light, #ececec);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--light--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--light--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--light--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--light--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--light--link--focus, #003366); }

:host([color="lightest"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--lightest, #fff);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lightest--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lightest--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lightest--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lightest--link--focus, #003366); }

:host([size="small"]) {
  --rh-band--padding:   calc(var(--rh-band--padding__vertical) / 4)  var(--rh-band--padding__horizontal); }

.rh-band__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: calc(var(--rh-band--padding__vertical) / 2) var(--rh-band--padding__horizontal);
  border: 0px var(--rh-band--borderStyle) var(--rh-band--borderColor);
  border-top-width: var(--rh-band--borderTopWidth);
  border-bottom-width: var(--rh-band--borderBottomWidth);
  background-color: var(--rh-band--backgroundColor);
  background-position-x: var(--rh-band--backgroundPositionX);
  background-position-y: var(--rh-band--backgroundPositionY);
  color: var(--rh-broadcasted--color--text); }
  @media (min-width: 576px) {
    .rh-band__wrapper {
      padding: var(--rh-band--padding); } }
  @media print {
    .rh-band__wrapper {
      background-color: white !important;
      background-image: none !important;
      box-shadow: none !important; } }

.rh-band__container, .rh-band__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column; }
  @media (min-width: 768px) {
    .rh-band__container, .rh-band__content {
      flex-direction: row; } }

.rh-band__container {
  margin: 0 auto;
  max-width: var(--rh-band--width); }

@media (max-width: 768px) {
  .rh-band__container > *:not(:last-child), .rh-band__content > *:not(:last-child) {
    margin-bottom: var(--rh-theme--container-spacer, 1rem); } }

.rh-band__main, .rh-band__body {
  flex: 1; }
  .rh-band__main > *:not(:last-child), .rh-band__body > *:not(:last-child) {
    margin-bottom: var(--rh-theme--container-spacer, 1rem); }

.rh-band__header, .rh-band__body, .rh-band__footer, .rh-band__aside {
  display: block;
  display: grid;
  grid-column: 1fr;
  grid-gap: var(--rh-theme--container-spacer, 1rem); }
  .rh-band__header::slotted(*), .rh-band__body::slotted(*), .rh-band__footer::slotted(*), .rh-band__aside::slotted(*) {
    margin-top: 0; }

@media screen and (min-width: 768px) {
  .rh-band__header {
    grid-template-columns: var(--rh-band_header--layout); } }

.rh-band__body {
  flex-grow: 1; }
  @media screen and (min-width: 768px) {
    .rh-band__body {
      grid-template-columns: var(--rh-band_body--layout); }
      [aside~="full"] .rh-band__body {
        margin-right: 0;
        margin-left: 0; } }

@media screen and (min-width: 768px) {
  .rh-band__footer {
    grid-template-columns: var(--rh-band_footer--layout); } }

.rh-band__aside {
  min-width: 240px; }
  @media screen and (min-width: 768px) {
    .rh-band__aside {
      grid-template-columns: var(--rh-band_aside--layout);
      flex-basis: var(--rh-band_aside--layout); } }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .rh-band__aside {
      --rh-band_aside--layout: 240px; } }

@media screen and (min-width: 768px) {
  .rh-band__aside {
    margin: 0; }
    [aside~="left"] .rh-band__aside {
      order: -1;
      margin-right: var(--rh-band--gutter); }
    [aside~="right"] .rh-band__aside {
      order: 2;
      margin-left: var(--rh-band--gutter); } }
</style>
<div class="rh-band__wrapper">
  <div class="rh-band__container">
    ${
      this.has_slot("aside") &&
      this.asidePosition.includes("full") &&
      this.asidePosition.includes("top")
        ? `<slot class="rh-band__aside" name="aside"></slot>`
        : ""
    }
    <section class="rh-band__main">
      ${
        this.has_slot("header")
          ? `<slot class="rh-band__header" name="header"></slot>`
          : ""
      }
      <div class="rh-band__content">
        ${
          this.has_slot("aside") &&
          !this.asidePosition.includes("full") &&
          this.asidePosition.includes("top")
            ? `<slot class="rh-band__aside" name="aside"></slot>`
            : ""
        }
        <slot class="rh-band__body"></slot>
        ${
          this.has_slot("aside") &&
          !this.asidePosition.includes("full") &&
          !this.asidePosition.includes("top")
            ? `<slot class="rh-band__aside" name="aside"></slot>`
            : ""
        }
      </div>
      ${
        this.has_slot("footer")
          ? `<slot class="rh-band__footer" name="footer"></slot>`
          : ""
      }
    </section>
    ${
      this.has_slot("aside") &&
      this.asidePosition.includes("full") &&
      !this.asidePosition.includes("top")
        ? `<slot class="rh-band__aside" name="aside"></slot>`
        : ""
    }
  </div>
</div>`;
  }

  static get tag() {
    return "rh-band";
  }

  get templateUrl() {
    return "rh-band.html";
  }

  get styleUrl() {
    return "rh-band.scss";
  }

  get asidePosition() {
    // X: right, left
    // Y: full, body
    // MOBILE: top, bottom
    // Push the aside position selector to the wrappers
    return this.getAttribute("aside").split(" ");
  }

  static get observedAttributes() {
    return ["aside", "img-src"];
  }

  static get cascadingAttributes() {
    return {
      aside: ".rh-band__wrapper"
    };
  }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.container;
  }

  constructor() {
    super(RhBand);
  }

  connectedCallback() {
    super.connectedCallback();

    // This is where it has content and should have width!
    // this.shadowRoot.style.setProperty("--rh-eq--width", this.size().width);
    // this.shadowRoot.style.setProperty("--rh-eq--height", this.size().height);
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    switch (attr) {
      case "img-src": {
        // Set the image as the background image
        this.shadowRoot.querySelector(
          ".rh-band__wrapper"
        ).style.backgroundImage = newValue ? `url('${newValue}')` : ``;
        break;
      }
    }
  }
}

RHElement.create(RhBand);

export default RhBand;
//# sourceMappingURL=rh-band.js.map
