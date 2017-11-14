class Rhelement extends HTMLElement {
  constructor(id, template) {
    super();

    if (window.ShadyCSS) {
      ShadyCSS.prepareTemplate(template, id);
    }

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

export default Rhelement;
