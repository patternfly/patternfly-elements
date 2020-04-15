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

  //return a valid prism.js language type
  get codeLanguage() {
    let validLangs = [
      "markup",
      "html",
      "xml",
      "svg",
      "mathml",
      "css",
      "clike",
      "javascript",
      "js"
    ];
    let returnVal = "markup";
    let testVal = this.getAttribute("pfe-language") || "markup";
    if (validLangs.includes(testVal)) {
      returnVal = testVal;
    }
    return returnVal;
  }

  //return a valid prism.js language css class
  get codePrismLanguage() {
    return "language-" + this.codeLanguage;
  }

  //return a prism.js language lib
  get codePrismLanguageLoad() {
    return Prism.languages[this.codeLanguage];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super(PfeCodeblock, { type: PfeCodeblock.PfeType });

    this._codeblock = null;
    this._codeblockRender = null;
    this._codeblockRenderOuterPreTag = null;
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
      copyCodeblock();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    //create dom elements and attach language styles
    this._codeblockRenderOuterPreTag = document.createElement("pre");
    this._codeblockRender = document.createElement("code");
    this._codeblockRender.setAttribute("pfe-codeblock-render", "");
    this._codeblockRender.setAttribute("class", this.codePrismLanguage);
    this._codeblockRenderOuterPreTag.setAttribute(
      "class",
      this.codePrismLanguage
    );
    this._codeblockRenderOuterPreTag.appendChild(this._codeblockRender);

    //Add to shadow-root
    this.shadowRoot.appendChild(this._codeblockRenderOuterPreTag);

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
    this.observer.disconnect();
  }

  _readyStateChangeHandler(event) {
    if (event.target.readyState === "complete") {
      document.removeEventListener(
        "readystatechange",
        this._readyStateChangeHandler
      );
      this._init();
    }
  }

  _init() {
    if (this._codeblockContainer.textContent) {
      this.codeblock = this._codeblockContainer.textContent;
    }
    this._muationObserve();
  }

  renderCodeblock() {
    this._codeblockRender.innerHTML = Prism.highlight(
      this._codeblock,
      this.codePrismLanguageLoad,
      this.codePrismLanguage
    );
  }

  _muationObserve() {
    this.observer.observe(this._codeblockContainer, this._observerConfig);
  }
}

PFElement.create(PfeCodeblock);

export default PfeCodeblock;
