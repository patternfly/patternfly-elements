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
  --rh-band--paddingTop:                       calc(var(--rh-theme--container-spacer, 1rem) * 4);
  --rh-band--paddingRight:                     var(--rh-theme--container-spacer, 1rem);
  --rh-band--paddingBottom:                    calc(var(--rh-theme--container-spacer, 1rem) * 4);
  --rh-band--paddingLeft:                      var(--rh-theme--container-spacer, 1rem);
  --rh-band--backgroundColor:                 var(--rh-theme--color--surface--base, #dfdfdf);
  --rh-band--backgroundPositionX:             center;
  --rh-band--backgroundPositionY:             center;
  --rh-band--borderColor:                      transparent;
  --rh-band--borderTopWidth:                   var(--rh-theme--surface--border-width, 1px);
  --rh-band--borderBottomWidth:                var(--rh-theme--surface--border-width, 1px);
  --rh-band--borderStyle:                      var(--rh-theme--surface--border-style, solid);
  --rh-band_header--title--size:               var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-band_header--heading--size:             var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-band_header--summary--size:             var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-band_header--title--weight:             var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-band_header--heading--weight:           var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-band_header--summary--weight:           var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--base--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--base--link, #00538c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--base--link--visited, #7551a6);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--base--link--hover, #00305b);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--base--link--focus, #00305b);
  --rh-band--width:                            auto; }
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
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--darker, #464646);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darker--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darker--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darker--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darker--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darker--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--darkest, #131313);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darkest--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darkest--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darkest--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darkest--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([color="light"]) {
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--lighter, #ececec);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lighter--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lighter--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lighter--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lighter--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lighter--link--focus, #003366); }

:host([color="lightest"]) {
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--lightest, #fff);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lightest--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lightest--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lightest--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lightest--link--focus, #003366); }

:host([color="complement"]) {
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--complement, #0477a4);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--complement--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--complement--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--complement--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--complement--link--focus, #cce6ff); }

:host([color="accent"]) {
  --rh-band--backgroundColor:                       var(--rh-theme--color--surface--accent, #fe460d);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--accent--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--accent--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--accent--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--accent--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--accent--link--focus, #cce6ff); }

:host([size="small"]) {
  --rh-band--paddingTop:        var(--rh-theme--container-spacer, 1rem);
  --rh-band--paddingBottom:     var(--rh-theme--container-spacer, 1rem); }

a {
  color: var(--rh-broadcasted--color--ui-link);
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

.rh-band__header, .rh-band__body, .rh-band__footer, .rh-band__aside {
  display: block;
  margin: 0; }
  .rh-band__header::slotted(*:nth-child(2)), .rh-band__body::slotted(*:nth-child(2)), .rh-band__footer::slotted(*:nth-child(2)), .rh-band__aside::slotted(*:nth-child(2)) {
    margin-top: 0 !important; }
  .rh-band__header::slotted(h1:first-child), .rh-band__body::slotted(h1:first-child), .rh-band__footer::slotted(h1:first-child), .rh-band__aside::slotted(h1:first-child) {
    margin-top: 0 !important;
    font-size: var(--rh-band_header--size); }
  .rh-band__header::slotted(h2:first-child), .rh-band__body::slotted(h2:first-child), .rh-band__footer::slotted(h2:first-child), .rh-band__aside::slotted(h2:first-child) {
    margin-top: 0 !important;
    font-size: var(--rh-band_header--size); }
  .rh-band__header::slotted(h3:first-child), .rh-band__body::slotted(h3:first-child), .rh-band__footer::slotted(h3:first-child), .rh-band__aside::slotted(h3:first-child) {
    margin-top: 0 !important;
    font-size: var(--rh-band_header--size); }
  .rh-band__header::slotted(h4:first-child), .rh-band__body::slotted(h4:first-child), .rh-band__footer::slotted(h4:first-child), .rh-band__aside::slotted(h4:first-child) {
    margin-top: 0 !important;
    font-size: var(--rh-band_header--size); }
  .rh-band__header::slotted(h5:first-child), .rh-band__body::slotted(h5:first-child), .rh-band__footer::slotted(h5:first-child), .rh-band__aside::slotted(h5:first-child) {
    margin-top: 0 !important;
    font-size: var(--rh-band_header--size); }

.rh-band__header--title {
  font-size: var(--rh-card_header--title--size);
  font-weight: var(--rh-card_header--title--weight); }

.rh-band__header--heading {
  font-size: var(--rh-card_header--heading--size);
  font-weight: var(--rh-card_header--heading--weight); }

.rh-band__header--summary {
  font-size: var(--rh-card_header--summary--size);
  font-weight: var(--rh-card_header--summary--weight); }
</style>
<div class="rh-band__wrapper">
  <div class="rh-band__container">
    <section class="rh-band__main">
      <slot class="rh-band__header" name="header">
        <slot class="rh-band__header--title" name="title"></slot>
        <slot class="rh-band__header--heading" name="heading"></slot>
        <slot class="rh-band__header--summary" name="summary"></slot>
      </slot>
      <slot class="rh-band__body"></slot>
      <slot class="rh-band__footer" name="footer"></slot>
    </section>
    <slot class="rh-band__aside" name="aside"></slot>
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

  static get observedAttributes() {
    return ["img-src"];
  }

  constructor() {
    super(RhBand.tag);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    const imgSrc = newValue;
    // Set the image as the background image
    if (imgSrc) {
      this.shadowRoot.querySelector(".rh-band__wrapper").style.backgroundImage =
        "url('" + imgSrc + "')";
    }
  }
}

RHElement.create(RhBand);

export default RhBand;
//# sourceMappingURL=rh-band.js.map
