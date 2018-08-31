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

class RhDropdownButton extends RHElement {
  static get tag() {
    return "rh-dropdown-button";
  }

  get styleUrl() {
    return "rh-dropdown-button.scss";
  }

  get templateUrl() {
    return "rh-dropdown-button.html";
  }

  static get observedAttributes() {
    return ["no-aria-haspopup"];
  }

  constructor() {
    super(RhDropdownButton);
    this.button = this.shadowRoot.querySelector("button");
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    const child = this.children[0];
    let isHeadingTag = false;

    if (child) {
      switch (child.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          isHeadingTag = true;
          break;
      }
      this.button.innerHTML = child.innerHTML;
    } else {
      this.button.innerHTML = this.textContent.trim();
    }

    if (!isHeadingTag) {
      console.warn(
        "The first child in the light DOM must be a heading level tag (h1, h2, h3, h4, h5, or h6)"
      );
    }

    if (!this.getAttribute("no-aria-haspopup")) {
      this.button.setAttribute("aria-haspopup", "true");
    }

    this.button.setAttribute("aria-expanded", "false");

    this.button.addEventListener("click", this._clickHandler);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this._clickHandler);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "no-aria-haspopup" && newVal === "true") {
      this.button.removeAttribute("aria-haspopup");
    } else {
      this.button.setAttribute("aria-haspopup", "true");
    }
  }

  get expanded() {
    return this.hasAttribute("data-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("data-expanded", true);
      this.button.setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("data-expanded");
      this.button.setAttribute("aria-expanded", false);
    }
  }

  _clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent("rh-dropdown-change", {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
  }
}

RHElement.create(RhDropdownButton);
