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
  template.innerHTML = `
<style>:host {
  display: block; }

.card {
  display: flex;
  flex-direction: column;
  background: #e7e7e7;
  padding: 16px;
  margin-bottom: 32px; }
  .card p {
    margin-top: 0;
    flex: 1 1 auto; }
  .card a {
    color: #06c;
    text-decoration: none;
    font-weight: 700; }
  .card span {
    font-size: .9rem;
    font-weight: 400; }

@media (min-width: 768px) {
  .card-container {
    display: flex; }
    .card-container .card {
      width: 33%;
      margin: 16px;
      margin-top: 8px; }
      .card-container .card:first-child {
        margin-left: 0; }
      .card-container .card:last-child {
        margin-right: 0; } }</style>
<h3>People who viewed this ${data.contentType} also viewed</h3>
<div class="card-container">
  ${data.results
    .map(
      result => `
    <div class="card">
      <p><a href="${result.view_uri}">${result.allTitle}</a></p>
      <span>
        ${result.documentKind} - <rh-datetime
          datetime="${result.lastModifiedDate}"
          type="local"
          day="numeric"
          month="short"
          year="numeric">
          ${result.lastModifiedDate}
        </rh-datetime>
      </span>
    </div>
  `
    )
    .join("\n")}
</div>
`;
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
