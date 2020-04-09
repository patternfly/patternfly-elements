import PFElement from "../../pfelement/dist/pfelement.js";
import Prism from "prismjs";

class PfeCodeblock extends PFElement {
  static get tag() {
    return "pfe-codeblock";
  }

  get schemaUrl() {
    return "pfe-codeblock.json";
  }

  get templateUrl() {
    return "pfe-codeblock.html";
  }

  get styleUrl() {
    return "pfe-codeblock.scss";
  }

  get codeLanguage() {
    return this.getAttribute("pfe-language") || "base";
  }

  static get observedAttributes() {
    return ["pfe-language"];
  }

  get codeblock() {
    return this._codeblock;
  }

  set codeblock(text) {
    if (!text) {
      return;
    }

    this._codeblock = text;
    this.renderCodeblock();
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return [];
  }

  constructor() {
    console.log("constructor");
    super(PfeCodeblock, { type: PfeCodeblock.PfeType });

    this._codeblock = null;
    this._codeblockRender = null;
    this._codeblockContainer = null;
    this._observerConfig = { childList: true, subtree: true };
    this._readyStateChangeHandler = this._readyStateChangeHandler.bind(this);

    this.observer = new MutationObserver((mutationList, observer) => {
      if (!this._codeblockContainer.textContent) {
        this._codeblockRender.innerHTML = "";
        return;
      }

      // TODO: when we stop supporting IE11, the need to disconnect and
      // then reconnect will no longer be needed
      observer.disconnect();
      this.codeblock = this._codeblockContainer.textContent;
      this._muationObserve();
    });
  }

  connectedCallback() {
    console.log("connectedCallback");
    super.connectedCallback();

    this._codeblockRender = document.createElement("div");
    this._codeblockRender.setAttribute("pfe-codeblock-render", "");
    this.appendChild(this._codeblockRender);

    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
      if (!this._codeblockContainer) {
        this._codeblockContainer = this.querySelector(
          "[pfe-codeblock-container]"
        );
        this._codeblockContainer.style.display = "none";

        this._init();
      }
    });
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
    this.observer.disconnect();
  }

  _readyStateChangeHandler(event) {
    console.log("_readyStateChangeHandler");
    if (event.target.readyState === "complete") {
      document.removeEventListener(
        "readystatechange",
        this._readyStateChangeHandler
      );
      this._init();
    }
  }

  _init() {
    console.log("_init");
    if (this._codeblockContainer.textContent) {
      this._codeblock = this._codeblockContainer.textContent;
    }

    this._muationObserve();
  }

  renderCodeblock() {
    console.log("renderCodeblock");
    this._codeblockRender.innerHTML = Prism.highlight(this.codeblock);
  }

  _muationObserve() {
    console.log("_muationObserve");
    this.observer.observe(this._codeblockContainer, this._observerConfig);
  }
}

PFElement.create(PfeCodeblock);

export default PfeCodeblock;
