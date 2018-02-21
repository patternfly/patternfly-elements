import Rhelement from "../rhelement/rhelement.js";
import "../rh-datetime/rh-datetime.js";
import "../cp-styles/cp-styles.js";
import "../../whatwg-fetch/fetch.js";

const elementName = "cp-more-like-this";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-dialog.html and css from
 * cp-dialog.scss
 */
const template = document.createElement("template");
const bindTemplate = data => {
  template.innerHTML = ``;
  return template;
};
/* end DO NOT EDIT */

class CpMoreLikeThis extends Rhelement {
  static get observedAttributes() {
    return ["q", "content-type"];
  }

  constructor() {
    super(elementName);
    this.handleResponse = this.handleResponse.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;

    if (!this.q || !this["content-type"]) {
      return;
    }

    const apiUrl = `https://api.access.redhat.com/rs/search?start=0&rows=3&q=${
      this.q
    }&fl=uri,allTitle,score,documentKind,lastModifiedDate,view_uri&mltDocSearch=true`;

    this.loading = true;

    fetch(apiUrl)
      .then(res => res.json())
      .then(this.handleResponse);
  }

  handleResponse(data) {
    this.loading = false;

    this.data = {
      contentType: this["content-type"],
      results: data.response.docs
    };

    this.render();
  }

  render() {
    const template = bindTemplate(this.data);

    if (window.ShadyCSS) {
      ShadyCSS.prepareTemplate(template, elementName);
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

window.customElements.define(elementName, CpMoreLikeThis);
