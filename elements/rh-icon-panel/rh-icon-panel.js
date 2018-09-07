import RHElement from "../rhelement/rhelement.js";
import "../rh-icon/rh-icon.js";

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

class RhIconPanel extends RHElement {
  get html() {
    return `
<style>
:host {
  display: flex;
  align-content: flex-start; }

:host rh-icon {
  margin-right: var(--rhe-c-icon-panel__icon--MarginRight, 1rem);
  font-size: var(--rhe-c-icon-panel__icon--size, 4rem);
  line-height: var(--rhe-c-icon-panel__icon--size, 4rem); }

:host ::slotted([slot="header"]),
:host ::slotted([slot="footer"]) {
  display: block; }

:host ::slotted([slot="footer"]) {
  margin-top: var(--rhe-c-icon-panel__footer--MarginTop, 16px); }
</style>
<rh-icon></rh-icon>
<div class="content">
  <slot class="header" name="header"></slot>
  <slot class="body"></slot>
  <slot class="footer" name="footer"></slot>
</div>`;
  }

  static get tag() {
    return "rh-icon-panel";
  }

  get styleUrl() {
    return "rh-icon-panel.scss";
  }

  get templateUrl() {
    return "rh-icon-panel.html";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  static get cascadingAttributes() {
    return {
      icon: "rh-icon"
    };
  }

  constructor() {
    super(RhIconPanel);
  }
}

RHElement.create(RhIconPanel);
//# sourceMappingURL=rh-icon-panel.js.map
