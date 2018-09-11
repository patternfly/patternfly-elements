import { autoReveal } from "./utilities/reveal.js";

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

class RHElement extends HTMLElement {
  static create(rhe) {
    window.customElements.define(rhe.tag, rhe);
  }

  static get RhTypes() {
    return {
      Container: "container",
      Content: "content",
      Pattern: "pattern"
    };
  }

  get rhType() {
    return this.getAttribute("rh-type");
  }

  set rhType(value) {
    this.setAttribute("rh-type", value);
  }

  constructor(rhClass, { type = null, delayRender = false } = {}) {
    super();

    this._rhClass = rhClass;
    this.tag = rhClass.tag;
    this._queue = [];
    this.template = document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (type) {
      this._queueAction({
        type: "setProperty",
        data: {
          name: "rhType",
          value: type
        }
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

    if (this._queue.length) {
      this._processQueue();
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    const cascadeTo = this._rhClass.cascadingAttributes[attr];
    if (cascadeTo) {
      this._copyAttribute(attr, cascadeTo);
    }
  }

  _copyAttribute(name, to) {
    const recipients = this.shadowRoot.querySelectorAll(to);
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  _queueAction(action) {
    this._queue.push(action);
  }

  _processQueue() {
    this._queue.forEach(action => {
      this[`_${action.type}`](action.data);
    });

    this._queue = [];
  }

  _setProperty({ name, value }) {
    this[name] = value;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}

autoReveal();

export default RHElement;
//# sourceMappingURL=rhelement.js.map
