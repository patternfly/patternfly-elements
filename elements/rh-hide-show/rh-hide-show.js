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

class RhHideShow extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }

:host([hidden]) {
  display: none; }

:host {
  --rh-card--padding:                          calc(var(--rh-theme--container-spacer, 1rem) * 2);
  --rh-card_header--size:                      var(--rh-theme--font-size--heading--gamma, 21px);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--base--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--base--link, #00538c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--base--link--visited, #7551a6);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--base--link--hover, #00305b);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--base--link--focus, #00305b);
  width: 900px;
  padding: var(--rh-card--padding);
  border: var(--rh-theme--surface--border-width, 1px) var(--rh-theme--surface--border-style, solid) transparent;
  border-radius: var(--rh-theme--surface--border-radius, 0);
  background: var(--rh-card--bg);
  color: var(--rh-broadcasted--color--text); }

a {
  color: var(--rh-broadcasted--color--ui-link); }

a:visited {
  color: var(--rh-broadcasted--color--ui-link--visited); }

a:hover {
  color: var(--rh-broadcasted--color--ui-link--hover); }

a:focus {
  color: var(--rh-broadcasted--color--ui-link--focus); }

:host([color="dark"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--darker, #464646);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darker--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darker--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darker--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darker--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darker--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--darkest, #131313);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darkest--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darkest--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darkest--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darkest--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([color="light"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--lighter, #ececec);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lighter--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lighter--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lighter--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lighter--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lighter--link--focus, #003366); }

:host([color="lightest"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--lightest, #fff);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lightest--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lightest--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lightest--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lightest--link--focus, #003366); }

:host([color="complement"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--complement, #0477a4);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--complement--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--complement--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--complement--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--complement--link--focus, #cce6ff); }

:host([color="accent"]) {
  --rh-card--bg:                               var(--rh-theme--color--surface--accent, #fe460d);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--accent--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--accent--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--accent--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--accent--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--accent--link--focus, #cce6ff); }

:host([size="small"]) {
  --rh-card--padding:        var(--rh-theme--container-spacer, 1rem); }

.rh-card__header,
.rh-card__body,
.rh-card__footer {
  display: block;
  margin: 0; }

.rh-card__header::slotted(h1:first-child),
.rh-card__header::slotted(h2:first-child),
.rh-card__header::slotted(h3:first-child),
.rh-card__header::slotted(h4:first-child),
.rh-card__header::slotted(h5:first-child),
.rh-card__header::slotted(h6:first-child) {
  margin-top: 0 !important;
  font-size: var(--rh-card_header--size); }

.rh-card__body::slotted(*:nth-child(2)) {
  margin-top: 0 !important; }

.rh-card__footer {
  margin-top: auto;
  justify-self: flex-end; }
</style>


<slot></slot>
${this.connectedCallback() ? `<p>these are tabs</p>` : ``}
${this.connectedCallback()}`;
  }

  static get tag() {
    return "rh-hide-show";
  }

  get templateUrl() {
    return "rh-hide-show.html";
  }

  get styleUrl() {
    return "rh-hide-show.scss";
  }

  documentIsFinishedLoading() {
    return /^complete|^i|^c/.test(document.readyState);
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(RhHideShow.tag);

    this._hideShowContainer = this.querySelector("rh-hide-show");
    this.tabsSet;
  }

  size() {
    return {
      width: this.offsetWidth,
      height: this.offsetHeight
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // This is where it has content and should have width!
    // console.log(this.width());

    var tabsSet = false;
    var hideshowWidth = this.size().width;
    if (hideshowWidth > 768) {
      console.log("This should display as tabs.");
      var tabsSet = true;
    }
    console.log(hideshowWidth);
    console.log(tabsSet);

    return tabsSet;
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhHideShow);

export default RhHideShow;
//# sourceMappingURL=rh-hide-show.js.map
