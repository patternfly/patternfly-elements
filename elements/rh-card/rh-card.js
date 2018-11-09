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

class RhCard extends RHElement {
  get html() {
    return `
<style>
:host {
  --rh-card--padding:                          calc(var(--rh-theme--container-spacer, 1rem) * 2);
  --rh-card--paddingTop:                       var(--rh-card--padding);
  --rh-card--paddingRight:                     var(--rh-card--padding);
  --rh-card--paddingBottom:                    var(--rh-card--padding);
  --rh-card--paddingLeft:                      var(--rh-card--padding);
  --rh-card--spacing:                          var(--rh-theme--container-spacer, 1rem);
  --rh-card--bg:                               var(--rh-theme--color--surface--base, #dfdfdf);
  --rh-card--backgroundColor:                  var(--rh-card--bg);
  --rh-card--borderColor:                      transparent;
  --rh-card__header--size:                     var(--rh-theme--font-size--heading--delta, 18px);
  --rh-card__header--fontWeight:               var(--rh-theme--font-weight--heading--delta, );
  --rh-card__header--textTransform:            uppercase;
  --rh-card__header--backgroundColor:          var(--rh-theme--color--surface--base--harmony, #c6c6c6);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--base--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--base--link, #00538c);
  --rh-broadcasted--link--text-decoration:     underline;
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--base--link--visited, #7551a6);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--base--link--hover, #00305b);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--base--link--focus, #00305b);
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  border-width: 0;
  border-style: var(--rh-theme--surface--border-style, solid);
  border-color: var(--rh-card--borderColor, transparent);
  border-radius: var(--rh-theme--surface--border-radius, 0);
  background: var(--rh-card--backgroundColor);
  color: var(--rh-broadcasted--color--text); }

:host([color="dark"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--darker, #464646);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darker--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darker--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darker--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darker--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darker--link--focus, #cce6ff); }
  :host([color="dark"]) .rh-card__header {
    --rh-card__header--backgroundColor:         var(--rh-theme--color--surface--darker--harmony, #2d2d2d);
    --rh-broadcasted--color--text:              var(--rh-theme--color--surface--darker--harmony--text, #fff);
    --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--darker--harmony--text, #fff);
    --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--darker--harmony--link--visited, #b38cd9);
    --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--darker--harmony--link--hover, #cce6ff);
    --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--darker--harmony--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--darkest, #131313);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--darkest--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--darkest--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--darkest--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--darkest--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--darkest--link--focus, #cce6ff); }
  :host([color="darkest"]) .rh-card__header {
    --rh-card__header--backgroundColor:            var(--rh-theme--color--surface--darkest--harmony, black);
    --rh-broadcasted--color--text:                 var(--rh-theme--color--surface--darkest--harmony--text, #fff);
    --rh-broadcasted--color--ui-link:              var(--rh-theme--color--surface--darkest--harmony--text, #fff);
    --rh-broadcasted--color--ui-link--visited:     var(--rh-theme--color--surface--darkest--harmony--link--visited, #b38cd9);
    --rh-broadcasted--color--ui-link--hover:       var(--rh-theme--color--surface--darkest--harmony--link--hover, #cce6ff);
    --rh-broadcasted--color--ui-link--focus:       var(--rh-theme--color--surface--darkest--harmony--link--focus, #cce6ff); }

:host([color="light"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--lighter, #ececec);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lighter--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lighter--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lighter--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lighter--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lighter--link--focus, #003366); }
  :host([color="light"]) .rh-card__header {
    --rh-card__header--backgroundColor:         var(--rh-theme--color--surface--lighter--harmony, #d2d2d2);
    --rh-broadcasted--color--text:              var(--rh-theme--color--surface--lighter--harmony--text, #333);
    --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--lighter--harmony--text, #333);
    --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--lighter--harmony--link--visited, rebeccapurple);
    --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--lighter--harmony--link--hover, #003366);
    --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--lighter--harmony--link--focus, #003366); }

:host([color="lightest"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--lightest, #fff);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--lightest--text, #333);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--lightest--link, #06c);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--lightest--link--visited, rebeccapurple);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--lightest--link--hover, #003366);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--lightest--link--focus, #003366); }
  :host([color="lightest"]) .rh-card__header {
    --rh-card__header--backgroundColor:         var(--rh-theme--color--surface--lightest--harmony, #e6e6e6);
    --rh-broadcasted--color--text:              var(--rh-theme--color--surface--lightest--harmony--text, #333);
    --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--lightest--harmony--text, #333);
    --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--lightest--harmony--link--visited, rebeccapurple);
    --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--lightest--harmony--link--hover, #003366);
    --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--lightest--harmony--link--focus, #003366); }

:host([color="complement"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--complement, #0477a4);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--complement--text, #fff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--complement--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--complement--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--complement--link--focus, #cce6ff); }
  :host([color="complement"]) .rh-card__header {
    --rh-card__header--backgroundColor:         var(--rh-theme--color--surface--complement--harmony, #035372);
    --rh-broadcasted--color--text:              var(--rh-theme--color--surface--complement--harmony--text, #fff);
    --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--complement--harmony--text, #fff);
    --rh-broadcasted--color--ui-link---visited: var(--rh-theme--color--surface--complement--harmony--link--visited, #b38cd9);
    --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--complement--harmony--link--hover, #cce6ff);
    --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--complement--harmony--link--focus, #cce6ff); }

:host([color="accent"]) {
  --rh-card--backgroundColor:                  var(--rh-theme--color--surface--accent, #fe460d);
  --rh-broadcasted--color--text:               var(--rh-theme--color--surface--accent--text, #fff);
  --rh-broadcasted--color--ui-link:            var(--rh-theme--color--surface--accent--link, #99ccff);
  --rh-broadcasted--color--ui-link--visited:   var(--rh-theme--color--surface--accent--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:     var(--rh-theme--color--surface--accent--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:     var(--rh-theme--color--surface--accent--link--focus, #cce6ff); }
  :host([color="accent"]) .rh-card__header {
    --rh-card__header--backgroundColor:         var(--rh-theme--color--surface--accent--harmony, #d73401);
    --rh-broadcasted--color--text:              var(--rh-theme--color--surface--accent--harmony--text, #fff);
    --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--accent--harmony--text, #fff);
    --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--accent--harmony--link--visited, #b38cd9);
    --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--accent--harmony--link--hover, #cce6ff);
    --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--accent--harmony--link--focus, #cce6ff); }

:host([size="small"]) {
  --rh-card--padding:        var(--rh-theme--container-spacer, 1rem); }

.rh-card__header,
.rh-card__body,
.rh-card__footer {
  display: block;
  margin: 0; }

.rh-card__header {
  --rh-broadcasted--color--text:              var(--rh-theme--color--surface--base--harmony--text, #fff);
  --rh-broadcasted--color--ui-link:           var(--rh-theme--color--surface--base--harmony--link, #fff);
  --rh-broadcasted--link--text-decoration:    none;
  --rh-broadcasted--color--ui-link--visited:  var(--rh-theme--color--surface--base--harmony--link--visited, #b38cd9);
  --rh-broadcasted--color--ui-link--hover:    var(--rh-theme--color--surface--base--harmony--link--hover, #cce6ff);
  --rh-broadcasted--color--ui-link--focus:    var(--rh-theme--color--surface--base--harmony--link--focus, #cce6ff);
  background-color: var(--rh-card__header--backgroundColor);
  padding: var(--rh-card--spacing) var(--rh-card--paddingRight) var(--rh-card--spacing) var(--rh-card--paddingLeft); }
  .rh-card__header::slotted(h1:first-child) {
    font-size: var(--rh-card__header--size);
    text-transform: var(--rh-card__header--textTransform);
    color: var(--rh-broadcasted--color--text);
    margin-top: 0;
    margin-bottom: 0; }
  .rh-card__header::slotted(*:last-of-type) {
    margin-bottom: 0; }
  .rh-card__header::slotted(h2:first-child) {
    font-size: var(--rh-card__header--size);
    text-transform: var(--rh-card__header--textTransform);
    color: var(--rh-broadcasted--color--text);
    margin-top: 0;
    margin-bottom: 0; }
  .rh-card__header::slotted(*:last-of-type) {
    margin-bottom: 0; }
  .rh-card__header::slotted(h3:first-child) {
    font-size: var(--rh-card__header--size);
    text-transform: var(--rh-card__header--textTransform);
    color: var(--rh-broadcasted--color--text);
    margin-top: 0;
    margin-bottom: 0; }
  .rh-card__header::slotted(*:last-of-type) {
    margin-bottom: 0; }
  .rh-card__header::slotted(h4:first-child) {
    font-size: var(--rh-card__header--size);
    text-transform: var(--rh-card__header--textTransform);
    color: var(--rh-broadcasted--color--text);
    margin-top: 0;
    margin-bottom: 0; }
  .rh-card__header::slotted(*:last-of-type) {
    margin-bottom: 0; }
  .rh-card__header::slotted(h5:first-child) {
    font-size: var(--rh-card__header--size);
    text-transform: var(--rh-card__header--textTransform);
    color: var(--rh-broadcasted--color--text);
    margin-top: 0;
    margin-bottom: 0; }
  .rh-card__header::slotted(*:last-of-type) {
    margin-bottom: 0; }

.rh-card__body {
  padding: var(--rh-card--spacing) var(--rh-card--paddingRight) var(--rh-card--spacing) var(--rh-card--paddingLeft); }
  .rh-card__body::slotted(*:nth-child(2)) {
    margin-top: 0 !important; }

.rh-card__footer {
  margin-top: auto;
  justify-self: flex-end;
  padding: var(--rh-card--spacing) var(--rh-card--paddingRight) var(--rh-card--paddingBottom) var(--rh-card--paddingLeft); }
</style>
<slot class="rh-card__header" name="header"></slot>
<slot class="rh-card__body"></slot>
<slot class="rh-card__footer" name="footer"></slot>
<slot class="rh-card__absolute" name="absolute"></slot>`;
  }

  static get tag() {
    return "rh-card";
  }

  get styleUrl() {
    return "rh-card.scss";
  }

  get templateUrl() {
    return "rh-card.html";
  }

  constructor() {
    super(RhCard);
  }
}

RHElement.create(RhCard);

export default RhCard;
//# sourceMappingURL=rh-card.js.map
