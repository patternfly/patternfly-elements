import PFElement from "../pfelement/pfelement.js";

/*
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

class PfeCard extends PFElement {
  get html() {
    return `
<style>
:host {
  --pfe-card--padding:                          calc(var(--pfe-theme--container-spacer, 1rem) * 2);
  --pfe-card_header--size:                      var(--pfe-theme--font-size--heading--gamma, 21px);
  --pfe-card--bg:                               var(--pfe-theme--color--surface--base, #dfdfdf);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--base--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--base--link, #00538c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--base--link--visited, #7551a6);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--base--link--hover, #00305b);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--base--link--focus, #00305b);
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding: var(--pfe-card--padding);
  border: var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;
  border-radius: var(--pfe-theme--surface--border-radius, 0);
  background: var(--pfe-card--bg);
  color: var(--pfe-broadcasted--color--text); }

a {
  color: var(--pfe-broadcasted--color--ui-link); }

a:visited {
  color: var(--pfe-broadcasted--color--ui-link--visited); }

a:hover {
  color: var(--pfe-broadcasted--color--ui-link--hover); }

a:focus {
  color: var(--pfe-broadcasted--color--ui-link--focus); }

:host([color="dark"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--darker, #464646);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([color="light"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }

:host([color="lightest"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }

:host([color="complement"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--complement, #0477a4);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }

:host([color="accent"]) {
  --pfe-card--bg:                               var(--pfe-theme--color--surface--accent, #fe460d);
  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);
  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);
  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }

:host([size="small"]) {
  --pfe-card--padding:        var(--pfe-theme--container-spacer, 1rem); }

.pfe-card__header,
.pfe-card__body,
.pfe-card__footer {
  display: block;
  margin: 0; }

.pfe-card__header::slotted(h1:first-child),
.pfe-card__header::slotted(h2:first-child),
.pfe-card__header::slotted(h3:first-child),
.pfe-card__header::slotted(h4:first-child),
.pfe-card__header::slotted(h5:first-child),
.pfe-card__header::slotted(h6:first-child) {
  margin-top: 0 !important;
  font-size: var(--pfe-card_header--size); }

.pfe-card__body::slotted(*:nth-child(2)) {
  margin-top: 0 !important; }

.pfe-card__footer {
  margin-top: auto;
  justify-self: flex-end; }
</style>
<slot class="pfe-card__header" name="header"></slot>
<slot class="pfe-card__body"></slot>
<slot class="pfe-card__footer" name="footer"></slot>`;
  }

  static get tag() {
    return "pfe-card";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  constructor() {
    super(PfeCard);
  }
}

PFElement.create(PfeCard);

export default PfeCard;
//# sourceMappingURL=pfe-card.js.map
