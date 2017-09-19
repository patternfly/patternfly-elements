import "../cp-styles/cp-styles.js";

const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <style>:host {
  display: block;
  padding: 29px;
  border: 1px solid transparent; }
  :host > h3 {
    margin: 0 0 10px; }

:host([data-theme="dark"]) {
  background: #252527;
  border-color: #252527;
  color: #fff; }

:host([data-theme="red"]) {
  background: #a30000;
  border-color: #a30000;
  color: #fff; }

:host([data-theme="white"]) {
  background: #fff;
  border-color: #fff; }

:host([data-theme="light"]) {
  background: #f0f0f0;
  border-color: #f0f0f0; }

:host([data-border="dark"]) {
  border-color: #252527; }

:host([data-border="light"]) {
  border-color: #ccc; }

:host([data-border="gray"]) {
  border-color: #d2d3d5; }</style>

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
