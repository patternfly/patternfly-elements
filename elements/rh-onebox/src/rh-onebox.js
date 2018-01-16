import Rhelement from "../rhelement/rhelement.js";
import "../../whatwg-fetch/fetch.js";

class RhOnebox extends Rhelement {
  get source() {
    return this._source;
  }
  set source(val) {
    if (this._source === val) return;
    this._source = val;
    this.setAttribute("source", this._source);
    this.getData();
  }

  get term() {
    return this._term;
  }
  set term(val) {
    if (this._term === val) return;
    this._term = val;
    this.setAttribute("term", this._term);
    this.getData();
  }

  get match() {
    return this._match;
  }
  set match(val) {
    if (this._match === val) return;
    this._match = val;
  }

  get data() {
    return this._data;
  }
  set data(val) {
    this._data = val;
    this._sources[this.source] = this._data;
    this.findMatch(this._data);
  }

  constructor(elementName, config) {
    super(elementName);

    if (!config.template) {
      console.warn("A template needs to be provided in the constructor");
    }

    this.elementName = elementName;
    this.config = config;
    this.htmlTemplate = config.template;
    this.loading = false;
    this._sources = {};
    this.getData = this.getData.bind(this);
    this.findMatch = this.findMatch.bind(this);
    this.successHandler = this.successHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  static get observedAttributes() {
    return ["source", "term"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this[attr] = newValue;
  }

  getData() {
    if (!this.htmlTemplate || !this.source || this.loading) {
      return;
    }

    if (this._sources[this.source]) {
      this.data = this._sources[this.source];
      this.successHandler();
    } else {
      this.loading = true;

      return fetch(this.source)
        .then(res => res.json(), error => this.errorHandler)
        .then(json => {
          this.data = json;
        })
        .then(this.successHandler)
        .then(() => (this.loading = false));
    }
  }

  successHandler() {
    this.render();
  }

  errorHandler(error) {
    console.log(error);
  }

  findMatch(data) {
    data[this.config.arrayName].forEach(obj => {
      obj[this.config.matchArrayName].forEach(keyword => {
        if (keyword.toLowerCase() === this.term.toLowerCase().trim()) {
          this.match = obj;
          return;
        }
      });
    });
  }

  render(data) {
    const template = this.match
      ? this.htmlTemplate(Object.assign({}, this.match, data))
      : "";

    if (window.ShadyCSS) {
      ShadyCSS.prepareTemplate(template, this.elementName);
    }

    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

export default RhOnebox;
