import t from "../pfelement/pfelement.js";
class e extends t {
  get html() {
    return "<style>:host {\n  display: inline; }</style>\n<span></span>";
  }
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
    super(e), (this.type = this.getAttribute("type") || "local");
  }
  get type() {
    return this._type;
  }
  set type(t) {
    this._type !== t && (this._type = t);
  }
  get timestamp() {
    return this._timestamp;
  }
  set timestamp(t) {
    this._timestamp !== t &&
      ((this._timestamp = t), this.setDate(new Date(1e3 * t)));
  }
  get datetime() {
    return this._datetime;
  }
  set datetime(t) {
    Date.parse(t) &&
      ((Date.parse(t) && this._datetime === Date.parse(t)) ||
        this.setDate(Date.parse(t)));
  }
  static get observedAttributes() {
    return ["datetime", "type", "timestamp"];
  }
  attributeChangedCallback(t, e, i) {
    this[t] = i;
  }
  setDate(t) {
    (this._datetime = t),
      (this.shadowRoot.querySelector("span").innerText = window.Intl
        ? this._getTypeString()
        : t.toLocaleString());
  }
  _getOptions() {
    const t = {
      weekday: { short: "short", long: "long" },
      day: { numeric: "numeric", "2-digit": "2-digit" },
      month: { short: "short", long: "long" },
      year: { numeric: "numeric", "2-digit": "2-digit" },
      hour: { numeric: "numeric", "2-digit": "2-digit" },
      minute: { numeric: "numeric", "2-digit": "2-digit" },
      second: { numeric: "numeric", "2-digit": "2-digit" },
      timeZoneName: { short: "short", long: "long" }
    };
    let e = {};
    for (const i in t) {
      const s = t[i][this.getAttribute(i)];
      s && (e[i] = s);
    }
    return e;
  }
  _getTypeString() {
    const t = this._getOptions(),
      e = this.getAttribute("locale") || navigator.language;
    let i = "";
    switch (this.type) {
      case "local":
        i = new Intl.DateTimeFormat(e, t).format(this._datetime);
        break;
      case "relative":
        i = this._getTimeRelative(this._datetime - Date.now());
        break;
      default:
        i = this._datetime;
    }
    return i;
  }
  _getTimeRelative(t) {
    const e = t > 0 ? "until" : "ago";
    let i = "just now";
    const s = Math.round(Math.abs(t) / 1e3),
      a = Math.round(s / 60),
      r = Math.round(a / 60),
      n = Math.round(r / 24),
      o = Math.round(n / 30),
      m = Math.round(o / 12);
    return (
      o >= 18
        ? (i = m + " years")
        : o >= 12
          ? (i = "a year")
          : n >= 45
            ? (i = o + " months")
            : n >= 30
              ? (i = "a month")
              : r >= 36
                ? (i = n + " days")
                : r >= 24
                  ? (i = "a day")
                  : a >= 90
                    ? (i = r + " hours")
                    : a >= 45
                      ? (i = "an hour")
                      : s >= 90
                        ? (i = a + " minutes")
                        : s >= 45
                          ? (i = "a minute")
                          : s >= 10 && (i = s + " seconds"),
      "just now" !== i ? `${i} ${e}` : i
    );
  }
}
t.create(e);
export default e;
//# sourceMappingURL=pfe-datetime.js.map
