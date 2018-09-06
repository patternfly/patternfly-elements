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

const templateId = "rh-icon-head";
if (!document.getElementById(templateId)) {
  const cpRHIconTemplate = document.createElement("div");

  cpRHIconTemplate.setAttribute("style", "display: none;");
  cpRHIconTemplate.setAttribute("id", templateId);

  cpRHIconTemplate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
  document.head.appendChild(cpRHIconTemplate);
}

class RhIcon extends RHElement {
  static get tag() {
    return "rh-icon";
  }

  get styleUrl() {
    return "rh-icon.scss";
  }

  get templateUrl() {
    return "rh-icon.html";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super(RhIcon);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "icon") {
      if (!newVal) {
        console.warn(`rh-icon: no icon name provided`);
        return;
      }

      const svgPath = this.ownerDocument.head.querySelector(`#${newVal} path`);

      if (!svgPath) {
        console.warn(`rh-icon: unable to find svg path for ${newVal}`);
        return;
      }

      this.shadowRoot
        .querySelector("svg g path")
        .setAttribute("d", svgPath.getAttribute("d"));
    }
  }
}

RHElement.create(RhIcon);
