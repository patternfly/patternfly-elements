const datetimeTemplate = document.createElement('template');
datetimeTemplate.innerHTML = `
  <style>
    :host {
      display: inline;
    }
  </style>
  <span></span>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(datetimeTemplate, 'rh-datetime');
}

class RHDatetime extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(datetimeTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  get datetime() {
    return new Intl.DateTimeFormat().format(this._datetime);
  }
  set datetime(val) {
    if (Date.parse(val) && this._datetime === Date.parse(val)) return;
    this._datetime = Date.parse(val);
    this.shadowRoot.querySelector('span').innerText = this.datetime;
  }

  static get observedAttributes() { 
    return ['datetime']; 
  }

  attributeChangedCallback(name, oldVal, newVal) {
      this[name] = newVal;
  }

}

window.customElements.define('rh-datetime', RHDatetime);
