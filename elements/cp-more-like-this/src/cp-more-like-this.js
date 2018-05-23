import Rhelement from "../rhelement/rhelement.js";
import "../rh-card/rh-card.js";
import "../rh-datetime/rh-datetime.js";
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
    return ["api-url", "content-type"];
  }

  constructor() {
    super(elementName);

    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;

    if (!this["api-url"] || !this["content-type"]) {
      return;
    }

    this.loading = true;

    fetch(this["api-url"])
      .then(res => res.json())
      .then(this.handleResponse, this.handleError);
  }

  handleResponse(data) {
    this.loading = false;

    if (!data.response.docs.length) {
      console.warn("No docs found");
      this.dispatchNoDataEvent();
    }

    this.data = {
      contentType: this["content-type"],
      results: data.response.docs
    };

    this.render();
  }

  handleError(err) {
    console.warn("Error in retrieving data", err);
    this.dispatchNoDataEvent();
  }

  dispatchNoDataEvent() {
    this.dispatchEvent(
      new CustomEvent("cp-more-like-this:no-data", {
        bubbles: true
      })
    );
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
