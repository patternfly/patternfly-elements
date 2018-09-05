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

import RHElement from "../rhelement/rhelement.js";

class RhCta extends RHElement {
  get html() {
    return `
<style>
:host {
  display: inline-block; }
  :host ::slotted(a) {
    color: var(--rh-theme--color--ui-link, #06c); }
    :host ::slotted(a)::after {
      margin-left: 0.25rem;
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-theme--color--ui-link, #06c);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:visited) {
    color: var(--rh-theme--color--ui-link--visited, #7551a6); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh-theme--color--ui-link--visited, #7551a6); }
  :host ::slotted(a:hover) {
    color: var(--rh-theme--color--ui-link--hover, #004080); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-theme--color--ui-link--hover, #004080); }
  :host ::slotted(a:focus) {
    color: var(--rh-theme--color--ui-link--focus, #004080); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-theme--color--ui-link--focus, #004080); }

:host([priority="primary"]) ::slotted(a),
:host([priority="secondary"]) ::slotted(a) {
  padding: 0.5rem 2rem;
  border-radius: 5em;
  border: 1px solid transparent;
  text-decoration: none; }
  :host([priority="primary"]) ::slotted(a)::after,
  :host([priority="secondary"]) ::slotted(a)::after {
    display: none; }

:host([priority="primary"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent, #c00);
  background: var(--rh-theme--color--ui-accent, #c00);
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([priority="primary"]) ::slotted(a:hover),
:host([priority="primary"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--hover, #990000);
  background: var(--rh-theme--color--ui-accent--hover, #990000);
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([priority="secondary"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-base, #06c);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-base, #06c); }

:host([priority="secondary"]) ::slotted(a:hover),
:host([priority="secondary"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-base--hover, #004080);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([palette="base"]) ::slotted(a) {
  color: var(--rh-theme--color--ui-base, #06c); }
  :host([palette="base"]) ::slotted(a)::after {
    border-top-color: var(--rh-theme--color--ui-base, #06c); }

:host([palette="base"]) ::slotted(a:visited) {
  color: var(--rh-theme--color--ui-base--visited, #7551a6); }
  :host([palette="base"]) ::slotted(a:visited)::after {
    border-top-color: var(--rh-theme--color--ui-base--visited, #7551a6); }

:host([palette="base"]) ::slotted(a:hover) {
  color: var(--rh-theme--color--ui-base--hover, #004080); }
  :host([palette="base"]) ::slotted(a:hover)::after {
    border-top-color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([palette="base"]) ::slotted(a:focus) {
  color: var(--rh-theme--color--ui-base--focus, #004080); }
  :host([palette="base"]) ::slotted(a:focus)::after {
    border-top-color: var(--rh-theme--color--ui-base--focus, #004080); }

:host([priority="primary"][palette="base"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-base, #06c);
  background: var(--rh-theme--color--ui-base, #06c);
  color: var(--rh-theme--color--ui-base--text, #fff); }

:host([priority="primary"][palette="base"]) ::slotted(a:hover),
:host([priority="primary"][palette="base"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-base--hover, #004080);
  background: var(--rh-theme--color--ui-base--hover, #004080);
  color: var(--rh-theme--color--ui-base--text, #fff); }

:host([priority="secondary"][palette="base"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-base, #06c);
  background: var(--rh-theme--color--ui-base--text, #fff);
  color: var(--rh-theme--color--ui-base, #06c); }

:host([priority="secondary"][palette="base"]) ::slotted(a:hover),
:host([priority="secondary"][palette="base"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-base--hover, #004080);
  background: var(--rh-theme--color--ui-base--text, #fff);
  color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([palette="complement"]) ::slotted(a) {
  color: var(--rh-theme--color--ui-complement, #464646); }
  :host([palette="complement"]) ::slotted(a)::after {
    border-top-color: var(--rh-theme--color--ui-complement, #464646); }

:host([palette="complement"]) ::slotted(a:visited) {
  color: var(--rh-theme--color--ui-complement--visited, #7551a6); }
  :host([palette="complement"]) ::slotted(a:visited)::after {
    border-top-color: var(--rh-theme--color--ui-complement--visited, #7551a6); }

:host([palette="complement"]) ::slotted(a:hover) {
  color: var(--rh-theme--color--ui-complement--hover, #2d2d2d); }
  :host([palette="complement"]) ::slotted(a:hover)::after {
    border-top-color: var(--rh-theme--color--ui-complement--hover, #2d2d2d); }

:host([palette="complement"]) ::slotted(a:focus) {
  color: var(--rh-theme--color--ui-complement--focus, #2d2d2d); }
  :host([palette="complement"]) ::slotted(a:focus)::after {
    border-top-color: var(--rh-theme--color--ui-complement--focus, #2d2d2d); }

:host([priority="primary"][palette="complement"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-complement, #464646);
  background: var(--rh-theme--color--ui-complement, #464646);
  color: var(--rh-theme--color--ui-complement--text, #fff); }

:host([priority="primary"][palette="complement"]) ::slotted(a:hover),
:host([priority="primary"][palette="complement"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  background: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  color: var(--rh-theme--color--ui-complement--text, #fff); }

:host([priority="secondary"][palette="complement"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-complement, #464646);
  background: var(--rh-theme--color--ui-complement--text, #fff);
  color: var(--rh-theme--color--ui-complement, #464646); }

:host([priority="secondary"][palette="complement"]) ::slotted(a:hover),
:host([priority="secondary"][palette="complement"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-complement--hover, #2d2d2d);
  background: var(--rh-theme--color--ui-complement--text, #fff);
  color: var(--rh-theme--color--ui-complement--hover, #2d2d2d); }

:host([palette="accent"]) ::slotted(a) {
  color: var(--rh-theme--color--ui-accent, #c00); }
  :host([palette="accent"]) ::slotted(a)::after {
    border-top-color: var(--rh-theme--color--ui-accent, #c00); }

:host([palette="accent"]) ::slotted(a:visited) {
  color: var(--rh-theme--color--ui-accent--visited, #7551a6); }
  :host([palette="accent"]) ::slotted(a:visited)::after {
    border-top-color: var(--rh-theme--color--ui-accent--visited, #7551a6); }

:host([palette="accent"]) ::slotted(a:hover) {
  color: var(--rh-theme--color--ui-accent--hover, #990000); }
  :host([palette="accent"]) ::slotted(a:hover)::after {
    border-top-color: var(--rh-theme--color--ui-accent--hover, #990000); }

:host([palette="accent"]) ::slotted(a:focus) {
  color: var(--rh-theme--color--ui-accent--focus, #990000); }
  :host([palette="accent"]) ::slotted(a:focus)::after {
    border-top-color: var(--rh-theme--color--ui-accent--focus, #990000); }

:host([priority="primary"][palette="accent"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent, #c00);
  background: var(--rh-theme--color--ui-accent, #c00);
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([priority="primary"][palette="accent"]) ::slotted(a:hover),
:host([priority="primary"][palette="accent"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--hover, #990000);
  background: var(--rh-theme--color--ui-accent--hover, #990000);
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([priority="secondary"][palette="accent"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent, #c00);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent, #c00); }

:host([priority="secondary"][palette="accent"]) ::slotted(a:hover),
:host([priority="secondary"][palette="accent"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--hover, #990000);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent--hover, #990000); }

:host([on-saturated]) ::slotted(a),
:host([on-saturated][palette="base"]) ::slotted(a),
:host([on-saturated][palette="complement"]) ::slotted(a),
:host([on-saturated][palette="accent"]) ::slotted(a) {
  color: var(--rh-theme--color--ui-link--on-dark, #fff); }
  :host([on-saturated]) ::slotted(a)::after,
  :host([on-saturated][palette="base"]) ::slotted(a)::after,
  :host([on-saturated][palette="complement"]) ::slotted(a)::after,
  :host([on-saturated][palette="accent"]) ::slotted(a)::after {
    border-top-color: var(--rh-theme--color--ui-link--on-dark, #fff); }

:host([on-saturated]) ::slotted(a:visited),
:host([on-saturated][palette="base"]) ::slotted(a:visited),
:host([on-saturated][palette="complement"]) ::slotted(a:visited),
:host([on-saturated][palette="accent"]) ::slotted(a:visited) {
  color: var(--rh-theme--color--ui-link--on-dark--visited, #fff); }
  :host([on-saturated]) ::slotted(a:visited)::after,
  :host([on-saturated][palette="base"]) ::slotted(a:visited)::after,
  :host([on-saturated][palette="complement"]) ::slotted(a:visited)::after,
  :host([on-saturated][palette="accent"]) ::slotted(a:visited)::after {
    border-top-color: var(--rh-theme--color--ui-link--on-dark--visited, #fff); }

:host([on-saturated]) ::slotted(a:hover),
:host([on-saturated][palette="base"]) ::slotted(a:hover),
:host([on-saturated][palette="complement"]) ::slotted(a:hover),
:host([on-saturated][palette="accent"]) ::slotted(a:hover) {
  color: var(--rh-theme--color--ui-link--on-dark--hover, #e6e6e6); }
  :host([on-saturated]) ::slotted(a:hover)::after,
  :host([on-saturated][palette="base"]) ::slotted(a:hover)::after,
  :host([on-saturated][palette="complement"]) ::slotted(a:hover)::after,
  :host([on-saturated][palette="accent"]) ::slotted(a:hover)::after {
    border-top-color: var(--rh-theme--color--ui-link--on-dark--hover, #e6e6e6); }

:host([on-saturated]) ::slotted(a:focus),
:host([on-saturated][palette="base"]) ::slotted(a:focus),
:host([on-saturated][palette="complement"]) ::slotted(a:focus),
:host([on-saturated][palette="accent"]) ::slotted(a:focus) {
  color: var(--rh-theme--color--ui-link--on-dark--focus, #e6e6e6); }
  :host([on-saturated]) ::slotted(a:focus)::after,
  :host([on-saturated][palette="base"]) ::slotted(a:focus)::after,
  :host([on-saturated][palette="complement"]) ::slotted(a:focus)::after,
  :host([on-saturated][palette="accent"]) ::slotted(a:focus)::after {
    border-top-color: var(--rh-theme--color--ui-link--on-dark--focus, #e6e6e6); }

:host([on-saturated][priority="primary"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent, #c00); }

:host([on-saturated][priority="primary"]) ::slotted(a:hover),
:host([on-saturated][priority="primary"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent--hover, #990000); }

:host([on-saturated][priority="secondary"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: transparent;
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([on-saturated][priority="secondary"]) ::slotted(a:hover),
:host([on-saturated][priority="secondary"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([on-saturated][priority="primary"][palette="base"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-base--text, #fff);
  background: var(--rh-theme--color--ui-base--text, #fff);
  color: var(--rh-theme--color--ui-base, #06c); }

:host([on-saturated][priority="primary"][palette="base"]) ::slotted(a:hover),
:host([on-saturated][priority="primary"][palette="base"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-base--text, #fff);
  background: var(--rh-theme--color--ui-base--text, #fff);
  color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([on-saturated][priority="secondary"][palette="base"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-base--text, #fff);
  background: transparent;
  color: var(--rh-theme--color--ui-base--text, #fff); }

:host([on-saturated][priority="secondary"][palette="base"]) ::slotted(a:hover),
:host([on-saturated][priority="secondary"][palette="base"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-base--text, #fff);
  background: var(--rh-theme--color--ui-base--text, #fff);
  color: var(--rh-theme--color--ui-base--hover, #004080); }

:host([on-saturated][priority="primary"][palette="complement"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-complement--text, #fff);
  background: var(--rh-theme--color--ui-complement--text, #fff);
  color: var(--rh-theme--color--ui-complement, #464646); }

:host([on-saturated][priority="primary"][palette="complement"]) ::slotted(a:hover),
:host([on-saturated][priority="primary"][palette="complement"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-complement--text, #fff);
  background: var(--rh-theme--color--ui-complement--text, #fff);
  color: var(--rh-theme--color--ui-complement--hover, #2d2d2d); }

:host([on-saturated][priority="secondary"][palette="complement"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-complement--text, #fff);
  background: transparent;
  color: var(--rh-theme--color--ui-complement--text, #fff); }

:host([on-saturated][priority="secondary"][palette="complement"]) ::slotted(a:hover),
:host([on-saturated][priority="secondary"][palette="complement"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-complement--text, #fff);
  background: var(--rh-theme--color--ui-complement--text, #fff);
  color: var(--rh-theme--color--ui-complement--hover, #2d2d2d); }

:host([on-saturated][priority="primary"][palette="accent"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent, #c00); }

:host([on-saturated][priority="primary"][palette="accent"]) ::slotted(a:hover),
:host([on-saturated][priority="primary"][palette="accent"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent--hover, #990000); }

:host([on-saturated][priority="secondary"][palette="accent"]) ::slotted(a) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: transparent;
  color: var(--rh-theme--color--ui-accent--text, #fff); }

:host([on-saturated][priority="secondary"][palette="accent"]) ::slotted(a:hover),
:host([on-saturated][priority="secondary"][palette="accent"]) ::slotted(a:focus) {
  border-color: var(--rh-theme--color--ui-accent--text, #fff);
  background: var(--rh-theme--color--ui-accent--text, #fff);
  color: var(--rh-theme--color--ui-accent--hover, #990000); }
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
