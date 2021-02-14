// Import polyfills: Array.includes
import "./polyfills--pfe-codeblock.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import Prism from "prismjs";

const observerConfig = {
  childList: true,
  subtree: true,
  characterData: true
};

class PfeCodeblock extends PFElement {
  static get tag() {
    return "pfe-codeblock";
  }

  static get meta() {
    return {
      title: "Codeblock",
      description: "Render code in a styled and formatted way"
    };
  }

  get templateUrl() {
    return "pfe-codeblock.html";
  }

  get styleUrl() {
    return "pfe-codeblock.scss";
  }

  static get events() {
    return {};
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      codeLanguage: {
        title: "Code Language",
        type: String,
        values: ["markup", "html", "xml", "svg", "mathml", "css", "clike", "javascript", "js"],
        default: "markup",
        observer: "_attributeChanged"
      },
      codeLineNumbers: {
        title: "Enable Line Numbers",
        type: Boolean,
        default: false,
        observer: "_attributeChanged"
      },
      codeLineNumberStart: {
        title: "Set Line Number Start Value",
        type: Number,
        default: 1,
        observer: "_attributeChanged"
      },
      codeTheme: {
        title: "Code Theme",
        type: String,
        values: ["dark", "light"],
        default: "light",
        observer: "_attributeChanged"
      }
    };
  }

  static get slots() {
    return {};
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

  constructor() {
    super(PfeCodeblock, { type: PfeCodeblock.PfeType });

    this._codeblock = null;
    this._codeblockRender = null;
    this._codeblockRenderOuterPreTag = null;
    this._codeblockContainer = null;
    this._readyStateChangeHandler = this._readyStateChangeHandler.bind(this);

    // Add mutation observer to track text changes in the dom
    this._observer = new MutationObserver((mutationList, observer) => {
      if (!this._codeblockContainer.textContent) {
        this._codeblockRender.innerHTML = "";
        return;
      }

      // TODO: when we stop supporting IE11, the need to disconnect and
      // then reconnect will no longer be needed
      if (window.ShadyCSS) {
        observer.disconnect();
      }

      this.codeblock = this._codeblockContainer.textContent;

      if (window.ShadyCSS) {
        this._muationObserve();
      }
    });
  }

  //return class for line numbers
  lineNumberCssClass() {
    return this.codeLineNumbers ? " line-numbers" : "";
  }

  //return a valid prism.js language css class
  codePrismLanguage() {
    return "language-" + this.codeLanguage;
  }

  //return a prism.js language lib
  codePrismLanguageLoad() {
    return Prism.languages[this.codeLanguage];
  }

  //return applied classes for pre
  appliedCssClasss() {
    return this.codePrismLanguage() + this.lineNumberCssClass();
  }

  //apply classes to the markup for prism.js
  setComponentClasses() {
    this._codeblockRender.setAttribute("class", this.codePrismLanguage());
    this._codeblockRenderOuterPreTag.setAttribute("class", this.appliedCssClasss());
    if (this.codeLineNumberStart !== 1) {
      this._codeblockRenderOuterPreTag.style.counterReset = "linenumber " + (this.codeLineNumberStart - 1);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    //create dom elements and attach language styles
    this._codeblockRenderOuterPreTag = document.createElement("pre");
    this._codeblockRender = document.createElement("code");
    this._codeblockRender.setAttribute("codeblock-render", "");
    this.setComponentClasses();
    this._codeblockRenderOuterPreTag.appendChild(this._codeblockRender);

    //Add to shadow-root
    this.shadowRoot.appendChild(this._codeblockRenderOuterPreTag);

    //Hide dom element and init prism.js
    if (!this._codeblockContainer) {
      this._codeblockContainer = this.querySelector("[codeblock-container]");
      this._codeblockContainer.style.display = "none";
      this._init();
    }
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _readyStateChangeHandler(event) {
    if (event.target.readyState === "complete") {
      document.removeEventListener("readystatechange", this._readyStateChangeHandler);
      this._init();
    }
  }

  _attributeChanged() {
    if (this._codeblockRender !== null && this._codeblockRenderOuterPreTag !== null) {
      this.updateCodeblock();
    }
  }

  _init() {
    if (this._codeblockContainer.textContent) {
      let tmpCodeblockObject = this.trimWhitespaceLines(this._codeblockContainer.textContent);
      this.codeblock = tmpCodeblockObject.stringValue;
    }
    this._muationObserve();
  }

  //Accepts string and Returns trimed string and new line count
  trimWhitespaceLines(stringToTrim) {
    //return if nothing passed
    if (!stringToTrim) {
      return "";
    }
    let returnValue = { stringValue: "", lineCount: 0 };

    let tmpTrimArray = stringToTrim.trim().split("\n");

    let tmpLineCount = tmpTrimArray.length;
    returnValue.stringValue = tmpTrimArray.join("\n");
    returnValue.lineCount = tmpLineCount;

    return returnValue;
  }

  processLineNumbers(htmlStringToProcess) {
    //return if nothing passed
    if (!htmlStringToProcess) {
      return "";
    }

    let returnHtmlString = htmlStringToProcess + '<span class="line-numbers-rows" aria-hidden="true">';
    let lineStringObject = this.trimWhitespaceLines(htmlStringToProcess);
    for (var i = 0, len = lineStringObject.lineCount; i < len; i++) {
      returnHtmlString = returnHtmlString + "<span></span>";
    }
    returnHtmlString = returnHtmlString + "</span>";
    return returnHtmlString;
  }

  updateCodeblock() {
    this.setComponentClasses();
    this.renderCodeblock();
  }

  renderCodeblock() {
    this._codeblockRender.innerHTML = Prism.highlight(
      this._codeblock,
      this.codePrismLanguageLoad(),
      this.codePrismLanguage()
    );

    if (this.codeLineNumbers) {
      let htmlString = this.processLineNumbers(this._codeblockRender.innerHTML);
      this._codeblockRender.innerHTML = htmlString;
    }
  }

  _muationObserve() {
    this._observer.observe(this._codeblockContainer, observerConfig);
  }
}

PFElement.create(PfeCodeblock);

export default PfeCodeblock;
