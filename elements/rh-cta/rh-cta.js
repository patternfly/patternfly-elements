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

class RhCta extends RHElement {
  get html() {
    return `
<style>
:host {
  --rh-cta--main:                     var(--rh-theme--color--ui-link, #06c);
  --rh-cta--main--hover:              var(--rh-theme--color--ui-link--hover, #003366);
  --rh-cta--main--focus:              var(--rh-theme--color--ui-link--focus, #003366);
  --rh-cta--main--visited:            var(--rh-theme--color--ui-link--visited, rebeccapurple);
  --rh-cta--aux:                      transparent;
  --rh-cta--aux--hover:               transparent;
  display: inline-block;
  font-weight: bold; }
  :host ::slotted(a) {
    line-height: inherit;
    color: var(--rh-cta--main); }
    :host ::slotted(a)::after {
      display: block;
      margin-left: 0.25rem;
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-cta--main);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:hover) {
    color: var(--rh-cta--main--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-cta--main--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh-cta--main--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-cta--main--focus); }

:host([priority="primary"]) {
  --rh-cta--main:          var(--rh-theme--color--ui-accent, #fe460d);
  --rh-cta--main--hover:   var(--rh-theme--color--ui-accent--hover, #a42701);
  --rh-cta--aux:           var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--aux--hover:    var(--rh-theme--color--ui-accent--text--hover, #fff); }
  :host([priority="primary"]) ::slotted(a) {
    display: inline-block;
    padding: 8px 32px;
    border-radius: 5em;
    border: 1px solid transparent;
    text-decoration: none;
    line-height: 1.2;
    border-color: var(--rh-cta--main);
    background: var(--rh-cta--main);
    color: var(--rh-cta--aux); }
    :host([priority="primary"]) ::slotted(a)::after {
      display: none; }
  :host([priority="primary"]) ::slotted(a:hover),
  :host([priority="primary"]) ::slotted(a:focus) {
    border-color: var(--rh-cta--main--hover);
    background: var(--rh-cta--main--hover);
    color: var(--rh-cta--aux--hover); }

:host([priority="secondary"]) {
  --rh-cta--main:          var(--rh-theme--color--ui-base, #0477a4);
  --rh-cta--main--hover:   var(--rh-theme--color--ui-base--hover, #022f40);
  --rh-cta--aux:           var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--aux--hover:    var(--rh-theme--color--ui-base--text--hover, #fff); }
  :host([priority="secondary"]) ::slotted(a) {
    display: inline-block;
    padding: 8px 32px;
    border-radius: 5em;
    border: 1px solid var(--rh-cta--main);
    text-decoration: none;
    line-height: 1.2;
    border-color: var(--rh-cta--main);
    background: var(--rh-cta--aux);
    color: var(--rh-cta--main); }
    :host([priority="secondary"]) ::slotted(a)::after {
      display: none; }
  :host([priority="secondary"]) ::slotted(a:hover),
  :host([priority="secondary"]) ::slotted(a:focus) {
    border-color: var(--rh-cta--main--hover);
    background: var(--rh-cta--main--hover);
    color: var(--rh-cta--aux--hover); }

:host([on="dark"]) {
  --rh-cta--main:        var(--rh-theme--color--text--on-dark, #fff);
  --rh-cta--main--hover: var(--rh-theme--color--ui-link--on-dark--hover, #cce6ff);
  --rh-cta--aux:         transparent;
  --rh-cta--aux--hover:  transparent; }

:host([on="dark"][priority="primary"]) {
  --rh-cta--main:        var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--text--hover, #fff);
  --rh-cta--aux:         var(--rh-theme--color--ui-accent, #fe460d);
  --rh-cta--aux--hover:  var(--rh-theme--color--ui-accent--hover, #a42701); }

:host([on="dark"][priority="secondary"]) {
  --rh-cta--main:        var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--text--hover, #fff);
  --rh-cta--aux:         transparent;
  --rh-cta--aux--hover:  var(--rh-theme--color--ui-base--hover, #022f40); }

:host([color="base"]) {
  --rh-cta--main:        var(--rh-theme--color--ui-base, #0477a4) !important;
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #022f40) !important;
  --rh-cta--aux:         var(--rh-theme--color--ui-base--text, #fff) !important;
  --rh-cta--aux--hover:  var(--rh-theme--color--ui-base--text--hover, #fff) !important; }

:host([color="complement"]) {
  --rh-cta--main:        var(--rh-theme--color--ui-complement, #464646) !important;
  --rh-cta--main--hover: var(--rh-theme--color--ui-complement--hover, #131313) !important;
  --rh-cta--aux:         var(--rh-theme--color--ui-complement--text, #fff) !important;
  --rh-cta--aux--hover:  var(--rh-theme--color--ui-complement--text--hover, #fff) !important; }

:host([color="accent"]) {
  --rh-cta--main:        var(--rh-theme--color--ui-accent, #fe460d) !important;
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #a42701) !important;
  --rh-cta--aux:         var(--rh-theme--color--ui-accent--text, #fff) !important;
  --rh-cta--aux--hover:  var(--rh-theme--color--ui-accent--text--hover, #fff) !important; }
</style>
<slot></slot>`;
  }

  static get tag() {
    return "rh-cta";
  }

  get styleUrl() {
    return "rh-cta.scss";
  }

  get templateUrl() {
    return "rh-cta.html";
  }

  constructor() {
    super(RhCta);
  }

  connectedCallback() {
    super.connectedCallback();

    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else {
      this.link = this.querySelector("a");
    }
  }

  disconnectedCallback() {}
}

RHElement.create(RhCta);

export default RhCta;
//# sourceMappingURL=rh-cta.js.map
