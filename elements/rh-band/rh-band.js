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
  --rh-band--paddingTop:                      calc(var(--rh-theme--container-spacer, 1rem) * 4);
  --rh-band--paddingRight:                    var(--rh-theme--container-spacer, 1rem);
  --rh-band--paddingBottom:                   calc(var(--rh-theme--container-spacer, 1rem) * 4);
  --rh-band--paddingLeft:                     var(--rh-theme--container-spacer, 1rem);
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
  --rh-broadcasted--color--text:              var(--rh-theme--color--surface--base--text, #333);
  --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--base--link, #00538c);
  --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--base--link--visited, #7551a6);
  --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--base--link--hover, #00305b);
  --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--base--link--focus, #00305b);
  --rh-band--width:                           auto; }
  @media screen and (min-width: 576px) {
    :host {
      --rh-band--width: calc(576px - calc(var(--rh-band--paddingRight) * 2)); } }
  @media screen and (min-width: 768px) {
    :host {
      --rh-band--width: calc(768px - calc(var(--rh-band--paddingRight) * 2)); } }
  @media screen and (min-width: 992px) {
    :host {
      --rh-band--width: calc(992px - calc(var(--rh-band--paddingRight) * 2)); } }
  @media screen and (min-width: 1200px) {
    :host {
      --rh-band--width: calc(1200px - calc(var(--rh-band--paddingRight) * 2)); } }
  @media print {
    :host {
      --rh-band--paddingTop:    calc(var(--rh-theme--container-spacer, 1rem) * 2);
      --rh-band--paddingBottom: calc(var(--rh-theme--container-spacer, 1rem) * 2); } }

:host([color="dark"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--dark, );
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--dark--text, );
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--dark--link, );
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--dark--link--visited, );
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--dark--link--hover, );
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--dark--link--focus, );
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

:host([color="darkest"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--darkest, #131313);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darkest--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darkest--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darkest--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darkest--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darkest--link--focus, #cce6ff);
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

:host([color="accent"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--accent, #fe460d);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--accent--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--accent--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--accent--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--accent--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--accent--link--focus, #cce6ff);
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

:host([color="complement"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--complement, #0477a4);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--complement--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--complement--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--complement--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--complement--link--focus, #cce6ff);
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

:host([color="light"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--light, );
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--light--text, );
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--light--link, );
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--light--link--visited, );
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--light--link--hover, );
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--light--link--focus, );
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

:host([color="lightest"]) {
  --rh-band--backgroundColor:                  var(--rh-theme--color--surface--lightest, #fff);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lightest--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lightest--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lightest--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lightest--link--focus, #003366);
  --rh-band_header-title--color:               var(--rh-theme--color--ui-accent, #fe460d); }

a {
  color: var(--rh-band--ui-link);
  text-transform: var(--rh-broadcasted--ui-link--textTransform); }
  a:visited {
    color: var(--rh-broadcasted--color--ui-link--visited); }
  a:hover {
    color: var(--rh-broadcasted--color--ui-link--hover); }
  a:focus {
    color: var(--rh-broadcasted--color--ui-link--focus); }

.rh-band__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding-top: var(--rh-band--paddingTop);
  padding-bottom: var(--rh-band--paddingBottom);
  border-top-width: var(--rh-band--borderTopWidth);
  border-bottom-width: var(--rh-band--borderBottomWidth);
  border-style: var(--rh-band--borderStyle);
  border-color: var(--rh-band--borderColor);
  background-color: var(--rh-band--backgroundColor);
  background-position-x: var(--rh-band--backgroundPositionX);
  background-position-y: var(--rh-band--backgroundPositionY);
  color: var(--rh-broadcasted--color--text); }
  @media print {
    .rh-band__wrapper {
      background-color: white !important;
      background-image: none !important;
      box-shadow: none !important; } }

.rh-band__container {
  padding-top: 0;
  padding-right: var(--rh-band--paddingRight);
  padding-bottom: 0;
  padding-left: var(--rh-band--paddingLeft);
  width: var(--rh-band--width);
  margin: 0 auto; }

.rh-band__container, .rh-band__content {
  display: flex;
  flex-direction: column; }
  @media (min-width: 768px) {
    .rh-band__container, .rh-band__content {
      flex-direction: row; } }
  .rh-band__container > *, .rh-band__content > * {
    flex-grow: 1; }
    @media (min-width: 588px) {
      .rh-band__container > *, .rh-band__content > * {
        float: left;
        width: 100%; } }
    @media (max-width: 767px) {
      .rh-band__container > *, .rh-band__content > * {
        margin-bottom: 2rem;
        clear: both; } }
    @media (min-width: 768px) {
      .rh-band__container > *:first-child, .rh-band__content > *:first-child {
        width: calc(100% - 250px + 2rem);
        margin-right: 2.5702331142%; } }
    @media (min-width: 992px) {
      .rh-band__container > *:first-child, .rh-band__content > *:first-child {
        width: calc(100% - 300px + 2rem); } }
    .rh-band__container > *:last-child, .rh-band__content > *:last-child {
      margin-bottom: 0; }
    @media (min-width: 588px) {
      [aside-position~="left"] .rh-band__container > *, [aside-position~="left"] .rh-band__content > * {
        float: right; } }
    @media (min-width: 768px) {
      [aside-position~="left"] .rh-band__container > *:first-child, [aside-position~="left"] .rh-band__content > *:first-child {
        margin-left: 2.5702331142%; } }
    [aside-position~="left"] .rh-band__container > *:last-child, [aside-position~="left"] .rh-band__content > *:last-child {
      order: -1; }

.rh-band__main > *:not(:last-child) {
  margin-bottom: var(--rh-theme--container-spacer, 1rem); }

.rh-band__header, .rh-band__body, .rh-band__footer, .rh-band__aside {
  display: block; }
  .rh-band__header::slotted(*), .rh-band__body::slotted(*), .rh-band__footer::slotted(*), .rh-band__aside::slotted(*) {
    margin-top: 0; }

.rh-band__header::slotted([typography="title"]) {
  font-size: var(--rh-theme--font-size--heading--gamma, 21px);
  font-weight: 600;
  line-height: 1;
  color: var(--rh-band_header-title--color);
  text-transform: uppercase;
  margin-top: 0; }
  .rh-band__header::slotted([typography="title"]):not(:last-child) {
    margin-bottom: .65em; }

.rh-band__header::slotted([typography="heading"]) {
  font-size: var(--rh-theme--font-size--heading--alpha, 32px);
  font-weight: 600;
  line-height: 1;
  color: var(--rh-theme--color--heading, );
  margin-top: 0; }
  .rh-band__header::slotted([typography="heading"]):not(:last-child) {
    margin-bottom: .2em; }

.rh-band__header::slotted([typography="summary"]) {
  font-size: var(--rh-theme--font-size--heading--delta, 18px);
  font-weight: 300;
  color: var(--rh-theme--color--text, #333);
  margin-top: 0;
  margin-bottom: 0; }

.rh-band__body {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--rh-theme--container-spacer, 1rem); }
  @media screen and (min-width: 768px) {
    .rh-band__body {
      grid-template-columns: var(--rh-band_body--layout); } }

.rh-band__footer {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--rh-theme--container-spacer, 1rem); }
  @media screen and (min-width: 768px) {
    .rh-band__footer {
      grid-template-columns: var(--rh-band_body--layout); } }

.rh-band__aside {
  max-width: 250px; }
  @media (min-width: 992px) {
    .rh-band__aside {
      width: 300px; } }
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
        this.has_slot("header") &&
        !(
          this.has_slot("header_title") ||
          this.has_slot("header_heading") ||
          this.has_slot("header_summary")
        )
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
    return this.getAttribute("aside-position").split(" ");
  }

  static get observedAttributes() {
    return ["img-src"];
  }

  constructor() {
    super(RhBand);
  }

  connectedCallback() {
    super.connectedCallback();
    this._queueAction({
      type: "copyAttribute",
      data: {
        name: "aside-position",
        to: ".rh-band__wrapper"
      }
    });
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
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

RHElement.create(RhBand, { type: "container" });

export default RhBand;
//# sourceMappingURL=rh-band.js.map
