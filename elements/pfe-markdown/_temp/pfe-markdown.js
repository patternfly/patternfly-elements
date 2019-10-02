/*!
 * PatternFly Elements: PfeMarkdown 1.0.0-prerelease.24
 * @license
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

import PFElement from "../pfelement/pfelement.js";
import marked from "marked/marked.min.js";

class PfeMarkdown extends PFElement {
  static get version() {
    return "1.0.0-prerelease.24";
  }

  get html() {
    return `<style>:host{display:block}:host([hidden]){display:none}</style><slot></slot>`;
  }

  static get properties() {
    return {"on":{"title":"Context","type":"string","enum":["light","dark"],"default":"light","prefixed":false}};
  }

  static get slots() {
    return {"default":{"title":"Markdown","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-markdown";
  }

  get templateUrl() {
    return "pfe-markdown.html";
  }

  get styleUrl() {
    return "pfe-markdown.scss";
  }

  get schemaUrl() {
    return "pfe-markdown.json";
  }

  get markdown() {
    return this._markdown;
  }

  set markdown(text) {
    if (!text) {
      return;
    }

    this._markdown = this._unindent(text);
    this.renderMarkdown();
  }

  constructor() {
    super(PfeMarkdown);

    this._markdown = null;
    this._markdownRender = null;
    this._markdownContainer = null;
    this._observerConfig = { childList: true, subtree: true };
    this._readyStateChangeHandler = this._readyStateChangeHandler.bind(this);

    this.observer = new MutationObserver((mutationList, observer) => {
      if (!this._markdownContainer.textContent) {
        this._markdownRender.innerHTML = "";
        return;
      }

      // TODO: when we stop supporting IE11, the need to disconnect and
      // then reconnect will no longer be needed
      observer.disconnect();
      this.markdown = this._markdownContainer.textContent;
      this._muationObserve();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._markdownRender = document.createElement("div");
    this._markdownRender.setAttribute("pfe-markdown-render", "");
    this.appendChild(this._markdownRender);

    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
      if (!this._markdownContainer) {
        this._markdownContainer = this.querySelector("[pfe-markdown-container]");
        this._markdownContainer.style.display = "none";

        this._init();
      }
    });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  _readyStateChangeHandler(event) {
    if (event.target.readyState === "complete") {
      document.removeEventListener("readystatechange", this._readyStateChangeHandler);
      this._init();
    }
  }

  _init() {
    if (this._markdownContainer.textContent) {
      this.markdown = this._markdownContainer.textContent;
    }

    this._muationObserve();
  }

  renderMarkdown() {
    this._markdownRender.innerHTML = marked(this.markdown);
  }

  _muationObserve() {
    this.observer.observe(this._markdownContainer, this._observerConfig);
  }

  // pulled from https://github.com/PolymerElements/marked-element/blob/master/marked-element.js#L340
  _unindent(text) {
    if (!text) {
      return text;
    }

    const lines = text.replace(/\t/g, "  ").split("\n");
    const indent = lines.reduce(function(prev, line) {
      if (/^\s*$/.test(line)) {
        return prev; // Completely ignore blank lines.
      }

      const lineIndent = line.match(/^(\s*)/)[0].length;

      if (prev === null) {
        return lineIndent;
      }

      return lineIndent < prev ? lineIndent : prev;
    }, null);

    return lines
      .map(function(l) {
        return l.substr(indent);
      })
      .join("\n");
  }
}

PFElement.create(PfeMarkdown);

export default PfeMarkdown;
