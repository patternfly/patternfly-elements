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
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #06c);
  --rh-local-cta--emphasis-color--visited: var(--rh-cta--emphasis-color--visited, #7551a6);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #004080);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #004080);
  --rh-local-cta--arrow--spacing: var(--rh-cta--arrow--spacing, var(--rh-theme--spacing--xxs, 0.25rem));
  --rh-local-cta--padding-y: var(--rh-cta--padding-y, 0);
  --rh-local-cta--padding-x: var(--rh-cta--padding-x, 0);
  --rh-local-cta--BorderRadius: var(--rh-cta--BorderRadius, 0);
  --rh-local-cta--BorderWidth: var(--rh-cta--BorderWidth, 0);
  --rh-local-cta--TextDecoration: var(--rh-cta--TextDecoration, underline);
  --rh-local-cta--arrow--display: var(--rh-cta--arrow--display, inline-block); }
  :host ::slotted(a) {
    display: inline-block;
    padding: var(--rh-local-cta--padding-y) var(--rh-local-cta--padding-x);
    text-decoration: var(--rh-local-cta--TextDecoration);
    border: var(--rh-local-cta--BorderWidth) solid transparent;
    border-radius: var(--rh-local-cta--BorderRadius);
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    color: var(--rh-local-cta--emphasis-color); }
    :host ::slotted(a)::after {
      margin-left: var(--rh-local-cta--arrow--spacing);
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-local-cta--emphasis-color);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:hover) {
    color: var(--rh-local-cta--emphasis-color--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--emphasis-color--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh-local-cta--emphasis-color--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--emphasis-color--focus); }
  :host ::slotted(a:visited) {
    color: var(--rh-local-cta--emphasis-color--visited); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--emphasis-color--visited); }

:host(.primary) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #06c);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #004080);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #004080);
  --rh-local-cta--emphasis-color--visited: var(--rh-cta--emphasis-color--visited, #7551a6); }

:host(.secondary) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #464646);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #2d2d2d);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #2d2d2d); }

:host(.accent) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #c00);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #990000);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #990000); }

:host([inverted]) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #73bcf7);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #2b9af3);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #2b9af3);
  --rh-local-cta--emphasis-color--visited: var(--rh-cta--emphasis-color--visited, #967abd); }

:host([inverted].secondary) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #fff);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #e6e6e6);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #e6e6e6); }

:host([inverted].accent) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #c00);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #ff3333);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #ff3333); }

:host([solid]) {
  --rh-local-cta--BorderRadius: var(--rh-cta--BorderRadius, 5em);
  --rh-local-cta--BorderWidth: var(--rh-cta--BorderWidth, 1px);
  --rh-local-cta--TextDecoration: var(--rh-cta--TextDecoration, none);
  --rh-local-cta--arrow--display: var(--rh-cta--arrow--display, none);
  --rh-local-cta--padding-x: var(--rh-cta--padding-x, var(--rh-theme--spacing--lg, 2rem));
  --rh-local-cta--padding-y: var(--rh-cta--padding-y, var(--rh-theme--spacing--xs, 0.5rem));
  --rh-local-cta--complement-color: var(--rh-cta--complement-color, #fff);
  --rh-local-cta--complement-color--hover: var(--rh-cta--complement-color--hover, #fff);
  --rh-local-cta--complement-color--focus: var(--rh-cta--complement-color--focus, #fff);
  --rh-local-cta--complement-color--visited: var(--rh-cta--complement-color--visited, #fff);
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #6e6e6e);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #555555);
  --rh-local-cta--emphasis-color--focus: var(--rh-cta--emphasis-color--focus, #555555); }
  :host([solid]) ::slotted(a) {
    color: var(--rh-local-cta--complement-color);
    background-color: var(--rh-local-cta--emphasis-color);
    border-color: var(--rh-local-cta--emphasis-color); }
    :host([solid]) ::slotted(a)::after {
      display: none; }
  :host([solid]) ::slotted(a:hover) {
    color: var(--rh-local-cta--complement-color--hover);
    background-color: var(--rh-local-cta--emphasis-color--hover);
    border-color: var(--rh-local-cta--emphasis-color--hover); }
  :host([solid]) ::slotted(a:focus) {
    color: var(--rh-local-cta--complement-color--focus);
    background-color: var(--rh-local-cta--emphasis-color--focus);
    border-color: var(--rh-local-cta--emphasis-color--focus); }

:host([solid].primary) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #0076e0);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #005bad); }

:host([solid].secondary) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #464646);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #2d2d2d); }

:host([solid].accent) {
  --rh-local-cta--emphasis-color: var(--rh-cta--emphasis-color, #c00);
  --rh-local-cta--emphasis-color--hover: var(--rh-cta--emphasis-color--hover, #990000); }

:host([solid][inverted]) ::slotted(a) {
  color: var(--rh-local-cta--emphasis-color);
  background-color: var(--rh-local-cta--complement-color);
  border-color: var(--rh-local-cta--complement-color); }

:host([solid][inverted]) ::slotted(a:hover) {
  color: var(--rh-local-cta--emphasis-color--hover);
  background-color: var(--rh-local-cta--complement-color--hover);
  border-color: var(--rh-local-cta--complement-color--hover); }

:host([solid][inverted]) ::slotted(a:focus) {
  color: var(--rh-local-cta--emphasis-color--focus);
  background-color: var(--rh-local-cta--complement-color--focus);
  border-color: var(--rh-local-cta--complement-color--focus); }

:host([solid][bordered]) ::slotted(a) {
  color: var(--rh-local-cta--emphasis-color);
  background-color: var(--rh-local-cta--complement-color);
  border-color: var(--rh-local-cta--emphasis-color); }

:host([solid][bordered]) ::slotted(a:hover) {
  color: var(--rh-local-cta--emphasis-color--hover);
  background-color: var(--rh-local-cta--complement-color--hover);
  border-color: var(--rh-local-cta--emphasis-color--hover); }

:host([solid][bordered]) ::slotted(a:focus) {
  color: var(--rh-local-cta--emphasis-color--focus);
  background-color: var(--rh-local-cta--complement-color--focus);
  border-color: var(--rh-local-cta--emphasis-color--focus); }

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
