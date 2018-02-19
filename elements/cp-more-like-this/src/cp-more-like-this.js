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
  constructor() {
    super(elementName);

    this.handleResponse = this.handleResponse.bind(this);
    this.q = this.getAttribute("q");
    this.contentType = this.getAttribute("content-type");

    if (!this.q || !this.contentType) {
      console.warn(
        "Both a q attribute and content-type attribute need to be provided"
      );
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
      contentType: this.contentType,
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
