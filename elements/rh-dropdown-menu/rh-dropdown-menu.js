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

class RhDropdownMenu extends RHElement {
  get html() {
    return `
<style>
:host *, :host *::before, :host *::after {
  box-sizing: border-box; }

:host ul {
  position: absolute;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  border: 1px solid #ccc;
  background: #fff;
  width: 100%;
  min-width: 10em; }
  :host ul li {
    margin: 0;
    padding: 0; }
  :host ul a {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #333;
    line-height: 1.5; }
    :host ul a:hover, :host ul a:focus {
      background: #e7e7e7; }
    :host ul a:active {
      background: #06c;
      color: #fff; }
</style>
`;
  }

  static get tag() {
    return "rh-dropdown-menu";
  }

  get styleUrl() {
    return "rh-dropdown-menu.scss";
  }

  get templateUrl() {
    return "rh-dropdown-menu.html";
  }

  constructor() {
    super(RhDropdownMenu.tag);
  }

  connectedCallback() {
    const child = this.children[0];

    if (child && child.tagName == "UL") {
      this._assignMenuARIA(child);
      this.shadowRoot.appendChild(child);
    } else {
      console.warn(
        "The first child in the light DOM must be an unordered list"
      );
    }
  }

  disconnectedCallback() {}

  _assignMenuARIA(list) {
    list.setAttribute("role", "menu");
    list.setAttribute("hidden", "hidden");

    let listItems = list.childNodes;

    listItems.forEach(item => {
      if (item.nodeName == "LI") {
        item.setAttribute("role", "none");
        let achild = item.children[0];
        if (achild && achild.tagName == "A") {
          achild.setAttribute("role", "menuitem");
          achild.setAttribute("tabindex", "-1");
        }
      }
    });
  }
}

RHElement.create(RhDropdownMenu);
