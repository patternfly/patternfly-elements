import "../cp-styles/cp-styles.js";

const cardHeadingTemplate = document.createElement("template");
cardHeadingTemplate.innerHTML = `
  <h3><slot></slot></h3>
`;

class CpCardHeading extends HTMLElement {
  static get observedAttributes() {
    return ["data-level"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cardHeadingTemplate.content.cloneNode(true));
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === "data-level") {
      const obj = {
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true
      };

      if (!obj[newValue]) {
        newValue = "3";
      }

      this.shadowRoot.innerHTML = `<h${newValue}><slot></slot></h${newValue}>`;
    }
  }
}

window.customElements.define("cp-card-heading", CpCardHeading);

const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
  <style>:host {
  display: block;
  padding: 31px;
  border: 1px solid transparent;
  color: var(--text-color, #333);
  fill: var(--text-color, #333); }

::slotted(h1:first-child),
::slotted(h2:first-child),
::slotted(h3:first-child),
::slotted(h4:first-child),
::slotted(h5:first-child),
::slotted(h6:first-child) {
  --heading-margin-top: 0; }

:host([data-theme="white"]) {
  background: var(--white, #fff);
  border-color: var(--white, #fff);
  --text-color: var(--gray-night, #333);
  fill: var(--gray-night, #333); }

:host([data-theme="black"]) {
  background: var(--black, #1a1a1a);
  border-color: var(--black, #1a1a1a);
  --text-color: var(--white, #fff);
  fill: var(--white, #fff); }

:host([data-theme="dark"]) {
  background: var(--gray-space, #4c4c4c);
  border-color: var(--gray-space, #4c4c4c);
  --text-color: var(--white, #fff);
  fill: var(--white, #fff); }

:host([data-theme="light"]) {
  background: var(--gray-platinum, #e7e7e7);
  border-color: var(--gray-platinum, #e7e7e7);
  --text-color: var(--gray-night, #333);
  fill: var(--gray-night, #333); }

:host([data-border="white"]) {
  border-color: var(--white, #fff); }

:host([data-border="black"]) {
  border-color: var(--black, #1a1a1a); }

:host([data-border="gray"]) {
  border-color: var(--border-color, #ededed); }

:host([data-border="dark"]) {
  border-color: var(--gray-space, #4c4c4c); }

:host([data-border="light"]) {
  border-color: var(--gray-platinum, #e7e7e7); }

:host([data-border="transparent"]),
:host([data-border="none"]) {
  border-color: transparent; }</style>

  <slot></slot>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(cardTemplate, "cp-card");
}

class CpCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }
}

window.customElements.define("cp-card", CpCard);
