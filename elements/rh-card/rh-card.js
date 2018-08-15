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

class RhCard extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block;
  padding: var(--rhe-theme--spacer, 1rem);
  border: var(--rhe-theme--border--BorderWidth, 1px) var(--rhe-theme--border--BorderStyle, solid) transparent; }

:host([theme="dark"]) {
  background: var(--rhe-theme--bg-color--shade7, #252527);
  color: var(--rhe-theme--text-color--shade7, #fff); }

:host([theme="light"]) {
  background: var(--rhe-theme--bg-color--shade2, #e7e7e7);
  color: var(--rhe-theme--text-color--shade2, #333); }

:host .rh-card__header::slotted(h1:first-child),
:host .rh-card__header::slotted(h2:first-child),
:host .rh-card__header::slotted(h3:first-child),
:host .rh-card__header::slotted(h4:first-child),
:host .rh-card__header::slotted(h5:first-child),
:host .rh-card__header::slotted(h6:first-child) {
  margin-top: 0 !important; }
</style>
<slot class="rh-card__header" name="header"></slot>
<slot class="rh-card__body"></slot>
<slot class="rh-card__footer" name="footer"></slot>`;
  }

  static get tag() {
    return "rh-card";
  }

  get styleUrl() {
    return "rh-card.scss";
  }

  get templateUrl() {
    return "rh-card.html";
  }

  constructor() {
    super(RhCard.tag);
  }
}

RHElement.create(RhCard);
