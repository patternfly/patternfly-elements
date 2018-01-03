class Rhelement extends HTMLElement {
  constructor(id, template) {
    super();

    if (window.ShadyCSS && template) {
      ShadyCSS.prepareTemplate(template, id);
    }

    this.attachShadow({ mode: 'open' });

    if (template) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

export default Rhelement;
