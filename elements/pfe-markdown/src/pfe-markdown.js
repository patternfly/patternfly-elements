import PFElement from "../../pfelement/dist/pfelement.js";
import marked from "marked/marked.min.js";

class PfeMarkdown extends PFElement {
  static get tag() {
    return "pfe-markdown";
  }

  get templateUrl() {
    return "pfe-markdown.html";
  }

  get styleUrl() {
    return "pfe-markdown.scss";
  }

  static get meta() {
    return {
      title: "Markdown",
      description: "This element converts markdown into HTML."
    };
  }

  static get pfeType() {
    return PFElement.pfeType.content;
  }

  static get properties() {
    return {};
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
      if (window.ShadyCSS) observer.disconnect();
      this.markdown = this._markdownContainer.textContent;
      if (window.ShadyCSS) this._muationObserve();
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
    super.disconnectedCallback();
    if (this.observer) this.observer.disconnect();
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
    if (!text) return text;

    const lines = text.replace(/\t/g, "  ").split("\n");
    const indent = lines.reduce((prev, line) => {
      // Completely ignore blank lines.
      if (/^\s*$/.test(line)) return prev;

      const lineIndent = line.match(/^(\s*)/)[0].length;

      if (prev === null) return lineIndent;

      return lineIndent < prev ? lineIndent : prev;
    }, null);

    return lines.map(l => l.substr(indent)).join("\n");
  }
}

PFElement.create(PfeMarkdown);

export default PfeMarkdown;
