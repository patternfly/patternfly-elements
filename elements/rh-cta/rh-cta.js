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
  display: inline-block;
  --rh-local-cta--arrow--spacing: var(--rh-cta--arrow--spacing, var(--rh-theme--spacing--xxs, 0.25rem));
  --rh-local-cta--link-color: var(--rh-cta--link-color, #06c);
  --rh-local-cta--link-color--visited: var(--rh-cta--link-color--visited, #7551a6);
  --rh-local-cta--link-color--hover: var(--rh-cta--link-color--hover, #004080);
  --rh-local-cta--link-color--focus: var(--rh-cta--link-color--focus, #004080); }
  :host ::slotted(a) {
    color: var(--rh-local-cta--link-color); }
    :host ::slotted(a)::after {
      margin-left: var(--rh-local-cta--arrow--spacing);
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-local-cta--link-color);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:visited) {
    color: var(--rh-local-cta--link-color--visited); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--link-color--visited); }
  :host ::slotted(a:hover) {
    color: var(--rh-local-cta--link-color--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--link-color--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh-local-cta--link-color--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--link-color--focus); }

:host(.primary) {
  --rh-cta--color: $rh-global--link-color;
  --rh-cta--color--hover: $rh-global--link-color--hover;
  --rh-cta--color--focus: $rh-global--link-color--focus;
  --rh-cta--color--visited: $rh-global--link-color--visited; }

:host(.secondary) {
  --rh-cta--color: $rh-global--color--gray-iron;
  --rh-cta--color--hover: darken($rh-global--color--gray-iron, 10%);
  --rh-cta--color--focus: darken($rh-global--color--gray-iron, 10%);
  --rh-cta--color--visited: $rh-global--link-color--visited; }

:host(.accent) {
  --rh-cta--color: $rh-global--color--red;
  --rh-cta--color--hover: darken($rh-global--color--red, 10%);
  --rh-cta--color--focus: darken($rh-global--color--red, 10%);
  --rh-cta--color--visited: $rh-global--link-color--visited; }

:host([inverted]) {
  --rh-cta--color: $rh-global--link-color--inverted;
  --rh-cta--color--hover: $rh-global--link-color--inverted--hover;
  --rh-cta--color--focus: $rh-global--link-color--inverted--focus;
  --rh-cta--color--visited: $rh-global--link-color--inverted--visited; }

:host([inverted].primary) {
  --rh-cta--color: $rh-global--link-color--inverted;
  --rh-cta--color--hover: $rh-global--link-color--inverted--hover;
  --rh-cta--color--focus: $rh-global--link-color--inverted--focus;
  --rh-cta--color--visited: $rh-global--link-color--inverted--visited; }

:host([inverted].secondary) {
  --rh-cta--color: $rh-global--color--white;
  --rh-cta--color--hover: darken($rh-global--color--white, 10%);
  --rh-cta--color--focus: darken($rh-global--color--white, 10%);
  --rh-cta--color--visited: $rh-global--link-color--inverted--visited; }

:host([inverted].accent) {
  --rh-cta--color: lighten($rh-global--color--red, 10%);
  --rh-cta--color--hover: lighten($rh-global--color--red, 20%);
  --rh-cta--color--focus: lighten($rh-global--color--red, 20%);
  --rh-cta--color--visited: $rh-global--link-color--inverted--visited; }

:host([solid]) {
  --rh-local-cta--solid--padding-y: var(--rh-cta--solid--padding-y, var(--rh-theme--spacing--xs, 0.5rem));
  --rh-local-cta--solid--padding-x: var(--rh-cta--solid--padding-x, var(--rh-theme--spacing--lg, 2rem));
  --rh-local-cta--solid--BorderRadius: var(--rh-cta--solid--BorderRadius, var(--rh-theme--cta--BorderRadius, 5em));
  --rh-local-cta--solid--BorderWidth: var(--rh-cta--solid--BorderWidth, var(--rh-theme--cta--BorderWidth, 1px));
  --rh-local-cta--color--solid: var(--rh-cta--color--solid, var(--rh-theme--color, #6e6e6e));
  --rh-local-cta--text-color--solid: var(--rh-cta--text-color--solid, var(--rh-theme--text-color, #fff));
  --rh-local-cta--color--solid--hover: var(--rh-cta--color--solid--hover, var(--rh-theme--color--hover, #555555));
  --rh-local-cta--text-color--solid--hover: var(--rh-cta--text-color--solid--hover, var(--rh-theme--text-color--hover, #fff)); }
  :host([solid])::slotted(a) {
    display: inline-block;
    padding: var(--rh-local-cta--solid--padding-y) var(--rh-local-cta--solid--padding-x);
    text-decoration: none;
    border: var(--rh-local-cta--solid--BorderWidth) solid transparent;
    border-radius: var(--rh-local-cta--solid--BorderRadius);
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    background: var(--rh-local-cta--color--solid);
    color: var(--rh-local-cta--text-color--solid); }
    :host([solid])::slotted(a)::after {
      display: none; }
  :host([solid]) ::slotted(a:hover),
  :host([solid]) ::slotted(a:focus) {
    background: var(--rh-local-cta--color--solid--hover) !important;
    color: var(--rh-local-cta--text-color--solid--hover) !important; }

:host([solid].primary) {
  --rh-cta--color--solid: $rh-global--color--blue-azure;
  --rh-cta--text-color--solid: $rh-global--color--white;
  --rh-cta--color--solid--hover: darken($rh-global--color--blue-azure, 10%);
  --rh-cta--text-color--solid--hover: $rh-global--color--white; }

:host([solid].secondary) {
  --rh-cta--color--solid: $rh-global--color--gray-iron;
  --rh-cta--text-color--solid: $rh-global--color--white;
  --rh-cta--color--solid--hover: darken($rh-global--color--gray-iron, 10%);
  --rh-cta--text-color--solid--hover: $rh-global--color--white; }

:host([solid].accent) {
  --rh-cta--color--solid: $rh-global--color--red;
  --rh-cta--text-color--solid: $rh-global--color--white;
  --rh-cta--color--solid--hover: darken($rh-global--color--red, 10%);
  --rh-cta--text-color--solid--hover: $rh-global--color--white; }

:host([solid][inverted]) {
  --rh-cta--color--solid: $rh-global--color--red;
  --rh-cta--text-color--solid: $rh-global--color--white;
  --rh-cta--color--solid--hover: darken($rh-global--color--red, 10%);
  --rh-cta--text-color--solid--hover: $rh-global--color--white; }

:host([unfilled])::slotted(a) {
  background: transparent !important; }
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
