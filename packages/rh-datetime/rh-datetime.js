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

    this._type = this.getAttribute('type');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(datetimeTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  get datetime() {
    return this._datetime;
  }

  set datetime(val) {
    if (Date.parse(val) && this._datetime === Date.parse(val)) {
      return;
    }

    const options = this._getOptions();

    this._datetime = Date.parse(val);
    this._datetimeFormatted = new Intl.DateTimeFormat(navigator.language, options).format(this._datetime);
    this.shadowRoot.querySelector('span').innerText = this._datetimeFormatted;
  }

  get type() {
    return this._type;
  }

  get datetimeFormatted() {
    return this._datetimeFormatted;
  }

  static get observedAttributes() {
    return ['datetime', 'type'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'datetime') {
      this.datetime = newVal;
    }
  }

  _getOptions() {
    const props = {
      weekday: {
        'short': 'short',
        'long': 'long'
      },
      day: {
        'numeric': 'numeric',
        '2-digit': '2-digit'
      },
      month: {
        'short': 'short',
        'long': 'long'
      },
      year: {
        'numeric': 'numeric',
        '2-digit': '2-digit'
      },
      hour: {
        'numeric': 'numeric',
        '2-digit': '2-digit'
      },
      minute: {
        'numeric': 'numeric',
        '2-digit': '2-digit'
      },
      second: {
        'numeric': 'numeric',
        '2-digit': '2-digit'
      },
      timeZoneName: {
        'short': 'short',
        'long': 'long'
      }
    };

    let options = {}

    for (const prop in props) {
      const value = props[prop][this.getAttribute(prop)];
      if (value) {
        options[prop] = value;
      }
    }

    return options;
  }
}

window.customElements.define('rh-datetime', RHDatetime);
