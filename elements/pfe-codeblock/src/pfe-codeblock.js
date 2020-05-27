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
    return [
      "pfe-language",
      "pfe-line-numbers",
      "pfe-line-count-start",
      "pfe-debug"
    ];
  }

  get codeblock() {
    return this._codeblock;
  }

  get isDebug() {
    return false;
  }

  set codeblock(text) {
    if (!text) {
      return;
    }

    this._codeblock = text;
    this.renderCodeblock();
  }

  get hasLineNumbers() {
    let returnVal = this.hasAttribute("pfe-line-numbers");
    return returnVal;
  }

  //return class for line numbers
  get lineNumberCssClass() {
    let returnVal = this.hasAttribute("pfe-line-numbers")
      ? " line-numbers"
      : "";
    return returnVal;
  }

  //return class for line numbers
  get lineCountStart() {
    let returnVal = parseInt(
      this.getAttribute("pfe-line-count-start") || "1",
      10
    );
    return returnVal;
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

  //get applied classes for pre
  get appliedCssClasss() {
    return this.codePrismLanguage + this.lineNumberCssClass;
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
    });
  }

  setComponentClasses() {
    this._codeblockRender.setAttribute("class", this.codePrismLanguage);
    this._codeblockRenderOuterPreTag.setAttribute(
      "class",
      this.appliedCssClasss
    );
    if (this.lineCountStart !== 1) {
      this._codeblockRenderOuterPreTag.style.counterReset =
        "linenumber " + (this.lineCountStart - 1);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    //create dom elements and attach language styles
    this._codeblockRenderOuterPreTag = document.createElement("pre");
    this._codeblockRender = document.createElement("code");
    this._codeblockRender.setAttribute("pfe-codeblock-render", "");
    this.setComponentClasses();
    this._codeblockRenderOuterPreTag.appendChild(this._codeblockRender);

    //Add to shadow-root
    //this.appendChild(this._codeblockRenderOuterPreTag);
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

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  debugLog(templateString) {
    if (!templateString) {
      return;
    }
    if (this.isDebug) {
      console.log(templateString);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this.debugLog(
      `_basicAttributeChanged Old Value: ${oldValue} New Value: ${newValue}`
    );
    this[attr].value = newValue;
    this.updateCodeblock();
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
      let tmpCodeblockObject = this.trimWhitespaceLines(
        this._codeblockContainer.textContent
      );
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
    let tmpTrimArray = stringToTrim.split("\n").filter(function(entry) {
      return /\S/.test(entry);
    });
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

    let returnHtmlString =
      htmlStringToProcess +
      '<span class="line-numbers-rows" aria-hidden="true">';
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
      this.codePrismLanguageLoad,
      this.codePrismLanguage
    );
    if (this.hasLineNumbers) {
      let htmlString = this.processLineNumbers(this._codeblockRender.innerHTML);
      this._codeblockRender.innerHTML = htmlString;
    }
  }

  _muationObserve() {
    this.observer.observe(this._codeblockContainer, this._observerConfig);
  }
}

PFElement.create(PfeCodeblock);

export default PfeCodeblock;
