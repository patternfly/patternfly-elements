import PFElement from "../../pfelement/dist/pfelement.js";

class PfeDatetime extends PFElement {
  static get tag() {
    return "pfe-datetime";
  }

  get styleUrl() {
    return "pfe-datetime.scss";
  }

  get templateUrl() {
    return "pfe-datetime.html";
  }

  constructor() {
    super(PfeDatetime);

    this.type = this.getAttribute("type") || "local";
  }

  get type() {
    return this._type;
  }

  set type(val) {
    if (this._type === val) {
      return;
    }

    this._type = val;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(val) {
    if (this._timestamp === val) {
      return;
    }

    this._timestamp = val;
    this.setDate(new Date(val * 1000));
  }

  get datetime() {
    return this._datetime;
  }

  set datetime(val) {
    if (!Date.parse(val)) {
      return;
    }

    if (Date.parse(val) && this._datetime === Date.parse(val)) {
      return;
    }

    this.setDate(Date.parse(val));
  }

  static get observedAttributes() {
    return ["datetime", "type", "timestamp"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this[attr] = newVal;
  }

  setDate(date) {
    this._datetime = date;
    this.shadowRoot.querySelector("span").innerText = window.Intl
      ? this._getTypeString()
      : date.toLocaleString();
  }

  _getOptions() {
    const props = {
      weekday: {
        short: "short",
        long: "long"
      },
      day: {
        numeric: "numeric",
        "2-digit": "2-digit"
      },
      month: {
        short: "short",
        long: "long"
      },
      year: {
        numeric: "numeric",
        "2-digit": "2-digit"
      },
      hour: {
        numeric: "numeric",
        "2-digit": "2-digit"
      },
      minute: {
        numeric: "numeric",
        "2-digit": "2-digit"
      },
      second: {
        numeric: "numeric",
        "2-digit": "2-digit"
      },
      timeZoneName: {
        short: "short",
        long: "long"
      }
    };

    let options = {};

    for (const prop in props) {
      // converting the prop name from camel case to
      // hyphenated so it matches the attribute.
      // for example: timeZoneName to time-zone-name
      let attributeName = prop
        .replace(/[\w]([A-Z])/g, match => {
          return match[0] + "-" + match[1];
        })
        .toLowerCase();

      const value = props[prop][this.getAttribute(attributeName)];
      if (value) {
        options[prop] = value;
      }
    }

    if (this.getAttribute("time-zone")) {
      options.timeZone = this.getAttribute("time-zone");
    }

    return options;
  }

  _getTypeString() {
    const options = this._getOptions();
    const locale = this.getAttribute("locale") || navigator.language;
    let dt = "";
    switch (this.type) {
      case "local":
        dt = new Intl.DateTimeFormat(locale, options).format(this._datetime);
        break;
      case "relative":
        dt = this._getTimeRelative(this._datetime - Date.now());
        break;
      default:
        dt = this._datetime;
    }
    return dt;
  }

  _getTimeRelative(ms) {
    const tense = ms > 0 ? "until" : "ago";
    let str = "just now";
    // Based off of Github Relative Time
    // https://github.com/github/time-elements/blob/master/src/relative-time.js
    const s = Math.round(Math.abs(ms) / 1000);
    const min = Math.round(s / 60);
    const h = Math.round(min / 60);
    const d = Math.round(h / 24);
    const m = Math.round(d / 30);
    const y = Math.round(m / 12);
    if (m >= 18) {
      str = y + " years";
    } else if (m >= 12) {
      str = "a year";
    } else if (d >= 45) {
      str = m + " months";
    } else if (d >= 30) {
      str = "a month";
    } else if (h >= 36) {
      str = d + " days";
    } else if (h >= 24) {
      str = "a day";
    } else if (min >= 90) {
      str = h + " hours";
    } else if (min >= 45) {
      str = "an hour";
    } else if (s >= 90) {
      str = min + " minutes";
    } else if (s >= 45) {
      str = "a minute";
    } else if (s >= 10) {
      str = s + " seconds";
    }
    return str !== "just now" ? `${str} ${tense}` : str;
  }
}

PFElement.create(PfeDatetime);

export default PfeDatetime;
