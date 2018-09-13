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
  align-content: flex-start;
  flex-direction: column; }
  @media (min-width: 576px) {
    :host {
      flex-direction: row; } }

:host rh-icon {
  --rh-icon--spacing:                 var(--rh-theme--container-spacer, 1rem);
  --rh-icon--size:                    var(--rh-theme--icon-size, 64px);
  margin-right: var(--rh-icon--spacing);
  font-size: var(--rh-icon--size);
  line-height: var(--rh-icon--size);
  padding: 0.05em;
  min-width: var(--rh-icon--size);
  max-width: var(--rh-icon--size); }

:host ::slotted([slot="header"]),
:host ::slotted([slot="footer"]) {
  display: block; }

:host ::slotted([slot="footer"]) {
  margin-top: 1em; }

:host([stacked]) {
  flex-direction: column !important; }

:host([stacked][centered]) {
  align-items: center;
  text-align: center; }
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
    return ["icon", "circled"];
  }

  static get cascadingAttributes() {
    return {
      icon: "rh-icon",
      circled: "rh-icon"
    };
  }

  constructor() {
    super(RhIconPanel);
  }
}

RHElement.create(RhIconPanel);
//# sourceMappingURL=rh-icon-panel.js.map
