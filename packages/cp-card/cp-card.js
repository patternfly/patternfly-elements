import "../cp-styles/cp-styles.js";

const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <style>:host {
  display: block;
  padding: 30px;
  background: #252527;
  color: white;
  border: 1px solid #252527; }

:host(.light) {
  background: #f0f0f0;
  color: #252525;
  border-color: #f0f0f0; }

:host(.accent) {
  background: #08c0fc;
  border-color: #08c0fc; }

:host(.bordered) {
  background: none;
  border-color: #d1d1d1;
  color: #252525; }</style>

  <h3></h3>
  <slot></slot>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(cardTemplate, 'cp-card');
}

class CpCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  static get observedAttributes() {
    return ['heading'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'heading') {
      this.shadowRoot.querySelector('h3').textContent = newValue;
    }
  }
}

window.customElements.define('cp-card', CpCard);
