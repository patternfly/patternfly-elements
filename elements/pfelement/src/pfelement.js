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

import { autoReveal } from "./reveal.js";

class PFElement extends HTMLElement {
  static create(pfe) {
    window.customElements.define(pfe.tag, pfe);
  }

  /**
   * Register a class-level event listener.
   */
  static addEventListener(type, listener) {
    this._listeners[this.name] = this._listeners[this.name] || {};
    this._listeners[this.name][type] = listener;
  }

  static debugLog(preference = null) {
    if (preference !== null) {
      PFElement._debugLog = !!preference;
    }
    return PFElement._debugLog;
  }

  static log(...msgs) {
    if (PFElement.debugLog()) {
      console.log(...msgs);
    }
  }

  /**
   * Get any class-level event listeners.
   */
  static get listeners() {
    return PFElement._listeners[this.name] || {};
  }

  static get PfeTypes() {
    return {
      Container: "container",
      Content: "content",
      Pattern: "pattern"
    };
  }

  get pfeType() {
    return this.getAttribute("pfe-type");
  }

  set pfeType(value) {
    this.setAttribute("pfe-type", value);
  }

  constructor(pfeClass, { type = pfeClass.type, delayRender = false } = {}) {
    super();

    this._pfeClass = pfeClass;
    this.tag = pfeClass.tag;
    this.template = document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (pfeClass.type) {
      this.addEventListener("connected", () => {
        this.pfeType = type;
      });
    }

    if (!delayRender) {
      this.render();
    }
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleElement(this);
    }

    this.classList.add("PFElement");

    // if there's a class-level connected listener, trigger it
    const listener = this._pfeClass.listeners["connected"];
    if (listener) {
      listener.call(this, { target: this });
    }

    // if there are any a element-level connected listeners, trigger them
    this.dispatchEvent(
      new CustomEvent(`connected`, {
        bubbles: false
      })
    );
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._pfeClass.cascadingAttributes) {
      return;
    }

    const cascadeTo = this._pfeClass.cascadingAttributes[attr];
    if (cascadeTo) {
      this._copyAttribute(attr, cascadeTo);
    }
  }

  _copyAttribute(name, to) {
    const recipients = [
      ...this.querySelectorAll(to),
      ...this.shadowRoot.querySelectorAll(to)
    ];
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  log(...msgs) {
    PFElement.log(`[${this.tag}]`, ...msgs);
  }
}

PFElement._listeners = {}; // holds class-level event listeners

autoReveal(PFElement.log);

export default PFElement;
//# sourceMappingURL=PFElement.js.map
