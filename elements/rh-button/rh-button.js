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

class RhButton extends RHElement {
  get html() {
    return `
<style>
:host {
  display: inline-block; }

:host button {
  padding: 0 var(--rhe-theme--spacer, 1rem);
  font-size: var(--rhe-theme--FontSize, 16px);
  line-height: var(--rhe-theme--spacer--lg, 2rem);
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: var(--rhe-theme--button-border--BorderRadius, 2px);
  background: var(--rh-button--theme--default-color--Background, #e7e7e7);
  color: var(--rh-button--theme--default-color--Color, #333); }

:host button:hover {
  background: var(--rh-button--theme--default-color--hover--Background, #bebebe);
  color: var(--rh-button--theme--default-color--hover--Color, #333); }

:host(.primary) button {
  background: var(--rh-button--theme--primary-color--Background, #0076e0);
  color: var(--rh-button--theme--primary-color--Color, #fff); }

:host(.primary) button:hover {
  background: var(--rh-button--theme--primary-color--hover--Background, #004080);
  color: var(--rh-button--theme--primary-color--hover--Color, #fff); }
</style>
<button><slot></slot></button>`;
  }

  static get tag() {
    return "rh-button";
  }

  get styleUrl() {
    return "rh-button.scss";
  }

  get templateUrl() {
    return "rh-button.html";
  }

  constructor() {
    super(RhButton.tag);
  }
}

RHElement.create(RhButton);

export default RhButton;
