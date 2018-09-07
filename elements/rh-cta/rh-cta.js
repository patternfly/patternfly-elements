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
  display: inline-block;
  --rh-cta--main: var(--rh-broadcasted--color--ui-link, var(--rh-theme--color--ui-link, #06c));
  --rh-cta--main--visited: var(--rh-broadcasted--color--ui-link--visited, var(--rh-theme--color--ui-link--visited, #7551a6));
  --rh-cta--main--hover: var(--rh-broadcasted--color--ui-link--hover, var(--rh-theme--color--ui-link--hover, #004080));
  --rh-cta--main--focus: var(--rh-broadcasted--color--ui-link--focus, var(--rh-theme--color--ui-link--focus, #004080));
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--visited: var(--rh-cta--main--visited);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--text-color--focus: var(--rh-cta--main--focus); }
  :host ::slotted(a) {
    line-height: inherit;
    color: var(--rh-cta--text-color); }
    :host ::slotted(a)::after {
      display: block;
      margin-left: 0.25rem;
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-cta--text-color);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:visited) {
    color: var(--rh-cta--text-color--visited); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh-cta--text-color--visited); }
  :host ::slotted(a:hover) {
    color: var(--rh-cta--text-color--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-cta--text-color--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh-cta--text-color--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-cta--text-color--focus); }

:host([color="base"]) {
  --rh-cta--main: var(--rh-broadcasted--color--ui-link, var(--rh-theme--color--ui-accent, #0076e0));
  --rh-cta--main--visited: var(--rh-broadcasted--color--ui-link--visited, var(--rh-theme--color--ui-accent--visited, #004080));
  --rh-cta--main--hover: var(--rh-broadcasted--color--ui-link--hover, var(--rh-theme--color--ui-accent--hover, #004080));
  --rh-cta--main--focus: var(--rh-broadcasted--color--ui-link--focus, var(--rh-theme--color--ui-accent--focus, #004080)); }

:host([color="complement"]) {
  --rh-cta--main: var(--rh-broadcasted--color--ui-link, var(--rh-theme--color--ui-complement, #464646));
  --rh-cta--main--visited: var(--rh-broadcasted--color--ui-link--visited, var(--rh-theme--color--ui-complement--visited, #7551a6));
  --rh-cta--main--hover: var(--rh-broadcasted--color--ui-link--hover, var(--rh-theme--color--ui-complement--hover, #2d2d2d));
  --rh-cta--main--focus: var(--rh-broadcasted--color--ui-link--focus, var(--rh-theme--color--ui-complement--focus, #2d2d2d)); }

:host([color="accent"]) {
  --rh-cta--main: var(--rh-broadcasted--color--ui-link, var(--rh-theme--color--ui-accent, #c00));
  --rh-cta--main--visited: var(--rh-broadcasted--color--ui-link--visited, var(--rh-theme--color--ui-accent--visited, #7551a6));
  --rh-cta--main--hover: var(--rh-broadcasted--color--ui-link--hover, var(--rh-theme--color--ui-accent--hover, #990000));
  --rh-cta--main--focus: var(--rh-broadcasted--color--ui-link--focus, var(--rh-theme--color--ui-accent--focus, #990000)); }

:host([on="dark"]) {
  --rh-cta--main: var(--rh-broadcasted--color--ui-link, var(--rh-theme--color--ui-link--on-dark, #fff));
  --rh-cta--main--visited: var(--rh-broadcasted--color--ui-link--visited, var(--rh-theme--color--ui-link--on-dark--visited, #fff));
  --rh-cta--main--hover: var(--rh-broadcasted--color--ui-link--hover, var(--rh-theme--color--ui-link--on-dark--hover, #e6e6e6));
  --rh-cta--main--focus: var(--rh-broadcasted--color--ui-link--focus, var(--rh-theme--color--ui-link--on-dark--focus, #e6e6e6)); }

:host([priority="primary"]),
:host([priority="secondary"]) {
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--aux);
  --rh-cta--bg-color: var(--rh-cta--main);
  --rh-cta--bg-color--hover: var(--rh-cta--main--hover);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }
  :host([priority="primary"]) ::slotted(a),
  :host([priority="secondary"]) ::slotted(a) {
    display: inline-block;
    padding: 8px 32px;
    border-radius: 5em;
    border: 1px solid transparent;
    text-decoration: none;
    line-height: 1.2;
    border-color: var(--rh-cta--border-color);
    background: var(--rh-cta--bg-color);
    color: var(--rh-cta--text-color); }
    :host([priority="primary"]) ::slotted(a)::after,
    :host([priority="secondary"]) ::slotted(a)::after {
      display: none; }
  :host([priority="primary"]) ::slotted(a:visited),
  :host([priority="primary"]) ::slotted(a:hover),
  :host([priority="primary"]) ::slotted(a:focus),
  :host([priority="secondary"]) ::slotted(a:visited),
  :host([priority="secondary"]) ::slotted(a:hover),
  :host([priority="secondary"]) ::slotted(a:focus) {
    border-color: var(--rh-cta--border--hover);
    background: var(--rh-cta--bg-color--hover);
    color: var(--rh-cta--text-color--hover); }

:host([priority="primary"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--visited: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--main--focus: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff); }

:host([priority="secondary"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="primary"][color="base"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-baset--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--aux);
  --rh-cta--bg-color: var(--rh-cta--main);
  --rh-cta--bg-color--hover: var(--rh-cta--main--hover);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="secondary"][color="base"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="primary"][color="complement"]) {
  --rh-cta--main: var(--rh-theme--color--ui-complement, #464646);
  --rh-cta--main--hover: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  --rh-cta--aux: var(--rh-theme--color--ui-complement--text, #fff);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--aux);
  --rh-cta--bg-color: var(--rh-cta--main);
  --rh-cta--bg-color--hover: var(--rh-cta--main--hover);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="secondary"][color="complement"]) {
  --rh-cta--main: var(--rh-theme--color--ui-complement, #464646);
  --rh-cta--main--hover: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  --rh-cta--aux: var(--rh-theme--color--ui-complement--text, #fff);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="primary"][color="accent"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--aux);
  --rh-cta--bg-color: var(--rh-cta--main);
  --rh-cta--bg-color--hover: var(--rh-cta--main--hover);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([priority="secondary"][color="accent"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux);
  --rh-cta--border-color: var(--rh-cta--main);
  --rh-cta--border--hover: var(--rh-cta--main--hover); }

:host([on="dark"][priority="primary"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-accent--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-theme--color--ui-accent);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="secondary"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-base--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: transparent;
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="primary"][color="base"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-base--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="secondary"][color="base"]) {
  --rh-cta--main: var(--rh-theme--color--ui-base, #0076e0);
  --rh-cta--main--hover: var(--rh-theme--color--ui-base--hover, #004080);
  --rh-cta--aux: var(--rh-theme--color--ui-base--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-base--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: transparent;
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="primary"][color="complement"]) {
  --rh-cta--main: var(--rh-theme--color--ui-complement, #464646);
  --rh-cta--main--hover: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  --rh-cta--aux: var(--rh-theme--color--ui-complement--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-complement--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="secondary"][color="complement"]) {
  --rh-cta--main: var(--rh-theme--color--ui-complement, #464646);
  --rh-cta--main--hover: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  --rh-cta--aux: var(--rh-theme--color--ui-complement--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-complement--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: transparent;
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="primary"][color="accent"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-accent--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--main);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: var(--rh-cta--aux);
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }

:host([on="dark"][priority="secondary"][color="accent"]) {
  --rh-cta--main: var(--rh-theme--color--ui-accent, #c00);
  --rh-cta--main--hover: var(--rh-theme--color--ui-accent--hover, #990000);
  --rh-cta--aux: var(--rh-theme--color--ui-accent--text, #fff);
  --rh-cta--aux--hover: var(--rh-theme--color--ui-accent--text--hover, #e6e6e6);
  --rh-cta--text-color: var(--rh-cta--aux);
  --rh-cta--text-color--hover: var(--rh-cta--main--hover);
  --rh-cta--bg-color: transparent;
  --rh-cta--bg-color--hover: var(--rh-cta--aux--hover);
  --rh-cta--border-color: var(--rh-cta--aux);
  --rh-cta--border--hover: var(--rh-cta--aux--hover); }
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
    super(RhCta.tag);
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
