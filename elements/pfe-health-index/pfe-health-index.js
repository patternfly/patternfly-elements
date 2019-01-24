import PFElement from "../pfelement/pfelement.js";

/*
 * Copyright 2019 Red Hat, Inc.
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
 * 
*/

class PfeHealthIndex extends PFElement {
  get html() {
    return `
<style>
:host {
  display: inline-flex;
  align-items: center; }

:host([hidden]) {
  display: none; }

.box-container {
  display: flex;
  border: 1px solid var(--pfe-theme--color--surface--border, #dfdfdf);
  margin-left: calc(var(--pfe-theme--container-spacer, 1rem) * 0.5); }
  .box-container .box {
    background: #fff;
    width: 10px;
    height: 20px;
    border-right: 1px solid var(--pfe-theme--color--surface--border, #dfdfdf); }
    .box-container .box:last-child {
      border-right: 0; }
    .box-container .box.active.a {
      background-color: #3f9c35; }
    .box-container .box.active.b {
      background-color: #92d400; }
    .box-container .box.active.c {
      background-color: #efaa00; }
    .box-container .box.active.d {
      background-color: #ec7a08; }
    .box-container .box.active.e {
      background-color: #cc0000; }
    .box-container .box.active.f {
      background-color: #a30000; }
</style>
<div id="healthIndex"></div>
<div class="box-container">
  <div class="box a"></div>
  <div class="box b"></div>
  <div class="box c"></div>
  <div class="box d"></div>
  <div class="box e"></div>
  <div class="box f"></div>
</div>`;
  }

  static get tag() {
    return "pfe-health-index";
  }

  get templateUrl() {
    return "pfe-health-index.html";
  }

  get styleUrl() {
    return "pfe-health-index.scss";
  }

  static get observedAttributes() {
    return ["health-index"];
  }

  constructor() {
    super(PfeHealthIndex.tag);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const healthIndex = newValue.toLowerCase();
    const healthIndexUpperCase = newValue.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];

    this.innerHTML = healthIndexUpperCase;
    this.shadowRoot.querySelector(
      "#healthIndex"
    ).innerText = healthIndexUpperCase;

    boxes.forEach(box => {
      if (box.classList.contains(healthIndex)) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (!this.shadowRoot.querySelector(".box.active")) {
      console.warn(
        `${
          PfeHealthIndex.tag
        }: a valid health-index was not provided. Please use A, B, C, D, E, or F`
      );
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
//# sourceMappingURL=pfe-health-index.js.map
