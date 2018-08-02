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

class RhSearchResult extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }

::slotted([slot="heading"]) {
  display: none; }

article ::slotted([slot="meta"]) {
  display: block;
  font-size: var(--rhe-c-search-result_meta--FontSize, 0.875rem);
  line-height: var(--rhe-c-search-result_meta--LineHeight, 1.3125rem);
  margin: var(--rhe-c-search-result_meta--Margin, 0 0 0.375rem);
  color: var(--rhe-c-search-result_meta--Color, #6e6e6e);
  text-decoration: var(--rhe-c-search-result_meta--TextDecoration, none); }

article ::slotted([slot="meta"]:hover) {
  text-decoration: var(--rhe-c-search-result_meta--TextDecorationHover, none); }

header h1,
header h2,
header h3,
header h4,
header h5,
header h6 {
  margin: var(--rhe-c-search-result_heading--Margin, 0);
  font-size: var(--rhe-c-search-result_heading--FontSize, 1.125rem);
  line-height: var(--rhe-c-search-result_heading--LineHeight, 1.6875rem); }

header a {
  color: var(--rhe-c-search-result_heading--FontColor, #06c);
  text-decoration: var(--rhe-c-search-result_heading--TextDecoration, none);
  font-weight: var(--rhe-c-search-result_heading--FontWeight, 600); }

header a:hover,
header a:focus {
  color: var(--rhe-c-search-result_heading--FontColorHover, #004080);
  text-decoration: var(--rhe-c-search-result_heading--TextDecorationHover, underline); }
</style>
<slot name="heading"></slot>
<article>
  <header id="heading"></header>
  <slot name="meta"></slot>
  <slot></slot>
</article>`;
  }

  static get tag() {
    return "rh-search-result";
  }

  get styleUrl() {
    return "rh-search-result.scss";
  }

  get templateUrl() {
    return "rh-search-result.html";
  }

  constructor() {
    super(RhSearchResult.tag);

    this._headingId = "#heading";

    const headingSlot = this.shadowRoot.querySelector('[name="heading"]');
    headingSlot.addEventListener("slotchange", () => {
      this._transport(headingSlot, this._headingId);
    });

    this._transport(headingSlot, this._headingId);
  }

  _transport(slot, destination) {
    const nodes = slot.assignedNodes();

    if (!nodes.length) {
      return;
    }

    this.shadowRoot.querySelector(destination).innerHTML = nodes[0].outerHTML;
  }
}

RHElement.create(RhSearchResult);
