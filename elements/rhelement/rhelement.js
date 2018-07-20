class Rhelement extends HTMLElement {
  static create(rhe) {
    window.customElements.define(rhe.tag, rhe);
  }

  constructor(tag) {
    super();

    this.tag = tag;

    this.template = document.createElement("template");
    this.template.innerHTML = this.html;

    if (window.ShadyCSS && this.html) {
      ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.attachShadow({ mode: "open" });

    if (this.html) {
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

export default Rhelement;
