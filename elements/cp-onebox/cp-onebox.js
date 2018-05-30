import RhOnebox from "../rh-onebox/rh-onebox.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-onebox.html and css from
 * cp-onebox.scss
 */
const template = document.createElement("template");
const bindTemplate = data => {
  template.innerHTML = `
<style>:host {
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  background-color: #f7f7f7; }

:host([expanded]) .description,
:host([expanded]) .product_links {
  display: block; }

.content {
  padding: 0 16px; }

.info_links {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0; }

.info_links li {
  width: 50%; }

.info_links li a {
  padding: 16px; }

.description {
  display: none;
  order: 1; }

.product_links {
  display: none;
  order: 2; }

.expander {
  position: relative;
  text-align: center;
  border-top: 1px solid #ececec;
  padding-top: 16px;
  padding-bottom: 16px; }

:host([expanded]) .expander {
  border-bottom: 1px solid #ececec; }

#expandButton {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: -15px;
  left: calc(50% - 15px);
  background: white;
  border: 1px solid #ececec;
  border-radius: 50%; }

.caret {
  width: 0;
  height: 0;
  margin-bottom: -2px;
  border-top: 5px solid #333;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent; }

:host([expanded]) .caret {
  margin-bottom: 0;
  border-top: none;
  border-bottom: 5px solid #333; }

@media (min-width: 768px) {
  :host {
    background-color: transparent; }
  .expander {
    display: none; }
  .description,
  .product_links {
    display: block; }
  .description {
    order: 0; } }</style>
<!-- Rule Type (Product, Product Suite or Vulnerability) -->
<h2 class="content">${data.product ||
    data.product_suite ||
    data.vulnerability_name}</h2>

<!-- Description (Every Rule has a description) -->
<p class="description content">${data.description}</p>

<!-- Subtitle is only for Product type of rule -->
${(data.subtitle || "") && `<p class="subtitle">${data.subtitle}</p>`}

<!-- Page Link and Produc list are only for Product Suite type of rule -->
${(data.page_link || "") && `<p class="page-link">${data.page_link}</p>`}

${
    data.products
      ? `
  <div class="content">
      <h4>Products</h4>
    <ul class="products">
      ${data.products
        .map(
          product => `
        <li>
            ${product}
        </li>
      `
        )
        .join("\n")}
    </ul>
  </div>
`
      : ""
  }

<!-- CVE, Common Name, Severity are only for Vulnerability type of rule -->
${(data.cve || "") && `<p class="cve">${data.cve}</p>`}
${(data.common_name || "") && `<p class="common-name">${data.common_name}</p>`}
${(data.severity || "") && `<p class="severity">${data.severity}</p>`}

<!-- Info and Knowledgebase Links for every type of rule (Every Rule has a description) -->
${data.links.info &&
    `
  <div class="content">
      <h4>Info Links</h4>
    <ul class="info_links">
      ${data.links.info
        .map(
          link => `
        <li>
          <a href="${link.link}">
            <div>
              <div class="icon"></div>
              ${link.text}
            </div>
          </a>
        </li>
      `
        )
        .join("\n")}
    </ul>
  </div>
`}
<div class="expander content">
  <button id="expandButton">
    <span class="caret"></span>
  </button>
  About ${data.product}
</div>


${data.links.knowledgebase &&
    `
  <div class="product_links content">
    <h4>Knowledgebase Links</h4>
    <ul>
    ${data.links.knowledgebase
      .map(
        link => `
      <li><a href="${link.link}">${link.text}</a></li>
    `
      )
      .join("\n")}
    </ul>
  </div>
`}
`;
  return template;
};
/* end DO NOT EDIT */

class CpOnebox extends RhOnebox {
  constructor() {
    super("cp-onebox", {
      template: bindTemplate,
      arrayName: "rules",
      matchArrayName: "keywords"
    });

    this.expandButton = null;
    this.expanded = false;
    this.expandButtonHandler = this.expandButtonHandler.bind(this);
  }

  render() {
    super.render();

    this.expandButton = this.shadowRoot.querySelector("#expandButton");
    this.expandButton.addEventListener("click", this.expandButtonHandler);
  }

  expandButtonHandler() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
}

window.customElements.define("cp-onebox", CpOnebox);
