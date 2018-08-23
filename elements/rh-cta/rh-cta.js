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
  --rh--cta--emphasis-color: #06c;
  --rh--cta--emphasis-color--hover: #004080;
  --rh--cta--emphasis-color--focus: #004080;
  --rh--cta--emphasis-color--visited: #7551a6;
  --rh--cta--complement-color: transparent;
  --rh--cta--complement-color--hover: transparent;
  --rh--cta--complement-color--focus: transparent;
  --rh--cta--complement-color--visited: transparent;
  --rh--cta--color: var(--rh--cta--emphasis-color);
  --rh--cta--color--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--color--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--color--visited: var(--rh--cta--emphasis-color--visited);
  --rh--cta--background-color: var(--rh--cta--complement-color);
  --rh--cta--background-color--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--background-color--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--background-color--visited: var(--rh--cta--complement-color--visited);
  --rh--cta--border-color: var(--rh--cta--complement-color);
  --rh--cta--border--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--border--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--border--visited: var(--rh--cta--complement-color--visited);
  --rh--cta--arrow--spacing: var(--rh-theme--spacing--xxs, 0.25rem);
  --rh--cta--padding-y: 0;
  --rh--cta--padding-x: 0;
  --rh--cta--BorderRadius: 0;
  --rh--cta--BorderWidth: 0;
  --rh--cta--TextDecoration: underline;
  --rh--cta--arrow--display: inline-block; }
  :host ::slotted(a) {
    display: inline-block;
    padding: var(--rh--cta--padding-y) var(--rh--cta--padding-x);
    text-decoration: var(--rh--cta--TextDecoration);
    border: var(--rh--cta--BorderWidth) solid transparent;
    border-radius: var(--rh--cta--BorderRadius);
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    color: var(--rh--cta--color);
    background-color: var(--rh--cta--background-color);
    border-color: var(--rh--cta--border-color); }
    :host ::slotted(a)::after {
      margin-left: var(--rh--cta--arrow--spacing);
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh--cta--color);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:hover) {
    color: var(--rh--cta--color--hover);
    background-color: var(--rh--cta--background-color--hover);
    border-color: var(--rh--cta--border-color--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh--cta--color--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh--cta--color--focus);
    background-color: var(--rh--cta--background-color--focus);
    border-color: var(--rh--cta--border-color--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh--cta--color--focus); }
  :host ::slotted(a:visited) {
    color: var(--rh--cta--color--visited);
    background-color: var(--rh--cta--background-color--visited);
    border-color: var(--rh--cta--border-color--visited); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh--cta--color--visited); }

:host(.secondary) {
  --rh--cta--emphasis-color: #464646;
  --rh--cta--emphasis-color--hover: #2d2d2d;
  --rh--cta--emphasis-color--focus: #2d2d2d; }

:host([solid].secondary, [solid][inverted].secondary) {
  --rh--cta--emphasis-color: #0076e0;
  --rh--cta--emphasis-color--hover: #005bad;
  --rh--cta--emphasis-color--focus: #005bad; }

:host(.accent, [solid].accent) {
  --rh--cta--emphasis-color: #c00;
  --rh--cta--emphasis-color--hover: #990000;
  --rh--cta--emphasis-color--focus: #990000; }

:host([inverted]) {
  --rh--cta--emphasis-color: #73bcf7;
  --rh--cta--emphasis-color--hover: #2b9af3;
  --rh--cta--emphasis-color--focus: #2b9af3;
  --rh--cta--emphasis-color--visited: #967abd; }

:host([inverted].secondary) {
  --rh--cta--emphasis-color: #fff;
  --rh--cta--emphasis-color--hover: #e6e6e6;
  --rh--cta--emphasis-color--focus: #e6e6e6; }

:host([inverted].accent) {
  --rh--cta--emphasis-color: #c00;
  --rh--cta--emphasis-color--hover: #ff3333;
  --rh--cta--emphasis-color--focus: #ff3333; }

:host([solid]) {
  --rh--cta--BorderRadius: 5em;
  --rh--cta--BorderWidth: 1px;
  --rh--cta--TextDecoration: none;
  --rh--cta--arrow--display: none;
  --rh--cta--padding-x: var(--rh-theme--spacing--lg, 2rem);
  --rh--cta--padding-y: var(--rh-theme--spacing--xs, 0.5rem);
  --rh--cta--emphasis-color: #6e6e6e;
  --rh--cta--emphasis-color--hover: #555555;
  --rh--cta--emphasis-color--focus: #555555;
  --rh--cta--emphasis-color--visited: #6e6e6e;
  --rh--cta--complement-color: #fff;
  --rh--cta--complement-color--hover: #fff;
  --rh--cta--complement-color--focus: #fff;
  --rh--cta--complement-color--visited: #fff;
  --rh--cta--color: var(--rh--cta--complement-color);
  --rh--cta--color--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--color--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--color--visited: var(--rh--cta--complement-color--visited);
  --rh--cta--background-color: var(--rh--cta--emphasis-color);
  --rh--cta--background-color--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--background-color--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--background-color--visited: var(--rh--cta--emphasis-color--visited);
  --rh--cta--border-color: var(--rh--cta--emphasis-color);
  --rh--cta--border--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--border--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--border--visited: var(--rh--cta--emphasis-color--visited); }
  :host([solid]) ::slotted(a)::after {
    display: none; }

:host([solid][inverted]) {
  --rh--cta--color: var(--rh--cta--emphasis-color);
  --rh--cta--color--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--color--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--color--visited: var(--rh--cta--emphasis-color--visited);
  --rh--cta--background-color: var(--rh--cta--complement-color);
  --rh--cta--background-color--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--background-color--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--background-color--visited: var(--rh--cta--complement-color--visited);
  --rh--cta--border-color: var(--rh--cta--complement-color);
  --rh--cta--border--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--border--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--border--visited: var(--rh--cta--complement-color--visited); }

:host([solid][bordered]) {
  --rh--cta--color: var(--rh--cta--emphasis-color);
  --rh--cta--color--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--color--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--color--visited: var(--rh--cta--emphasis-color--visited);
  --rh--cta--background-color: var(--rh--cta--complement-color);
  --rh--cta--background-color--hover: var(--rh--cta--complement-color--hover);
  --rh--cta--background-color--focus: var(--rh--cta--complement-color--focus);
  --rh--cta--background-color--visited: var(--rh--cta--complement-color--visited);
  --rh--cta--border-color: var(--rh--cta--emphasis-color);
  --rh--cta--border--hover: var(--rh--cta--emphasis-color--hover);
  --rh--cta--border--focus: var(--rh--cta--emphasis-color--focus);
  --rh--cta--border--visited: var(--rh--cta--emphasis-color--visited); }

:host([unfilled]) ::slotted(a) {
  background-color: transparent !important;
  border-color: transparent !important; }
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
