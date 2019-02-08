import e from "../pfelement/pfelement.js";
var t =
  "undefined" != typeof window
    ? window
    : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
        ? self
        : {};
var r,
  n = ((function(e) {
    var r, n;
    (r = t),
      (n = function() {
        var e,
          t,
          r,
          n,
          i,
          a = {},
          o = {},
          l = {
            currentLocale: "en",
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: "0,0",
            scalePercentBy100: !0
          },
          u = {
            currentLocale: l.currentLocale,
            zeroFormat: l.zeroFormat,
            nullFormat: l.nullFormat,
            defaultFormat: l.defaultFormat,
            scalePercentBy100: l.scalePercentBy100
          };
        function s(e, t) {
          (this._input = e), (this._value = t);
        }
        return (
          ((e = function(r) {
            var n, i, o, l;
            if (e.isNumeral(r)) n = r.value();
            else if (0 === r || void 0 === r) n = 0;
            else if (null === r || t.isNaN(r)) n = null;
            else if ("string" == typeof r)
              if (u.zeroFormat && r === u.zeroFormat) n = 0;
              else if (
                (u.nullFormat && r === u.nullFormat) ||
                !r.replace(/[^0-9]+/g, "").length
              )
                n = null;
              else {
                for (i in a)
                  if (
                    (l =
                      "function" == typeof a[i].regexps.unformat
                        ? a[i].regexps.unformat()
                        : a[i].regexps.unformat) &&
                    r.match(l)
                  ) {
                    o = a[i].unformat;
                    break;
                  }
                n = (o = o || e._.stringToNumber)(r);
              }
            else n = Number(r) || null;
            return new s(r, n);
          }).version = "2.0.6"),
          (e.isNumeral = function(e) {
            return e instanceof s;
          }),
          (e._ = t = {
            numberToFormat: function(t, r, n) {
              var i,
                a,
                l,
                u,
                s,
                c,
                f,
                m,
                b = o[e.options.currentLocale],
                h = !1,
                d = !1,
                p = "",
                g = "",
                _ = !1;
              if (
                ((t = t || 0),
                (l = Math.abs(t)),
                e._.includes(r, "(")
                  ? ((h = !0), (r = r.replace(/[\(|\)]/g, "")))
                  : (e._.includes(r, "+") || e._.includes(r, "-")) &&
                    ((c = e._.includes(r, "+")
                      ? r.indexOf("+")
                      : t < 0
                        ? r.indexOf("-")
                        : -1),
                    (r = r.replace(/[\+|\-]/g, ""))),
                e._.includes(r, "a") &&
                  ((a = !!(a = r.match(/a(k|m|b|t)?/)) && a[1]),
                  e._.includes(r, " a") && (p = " "),
                  (r = r.replace(new RegExp(p + "a[kmbt]?"), "")),
                  (l >= 1e12 && !a) || "t" === a
                    ? ((p += b.abbreviations.trillion), (t /= 1e12))
                    : (l < 1e12 && l >= 1e9 && !a) || "b" === a
                      ? ((p += b.abbreviations.billion), (t /= 1e9))
                      : (l < 1e9 && l >= 1e6 && !a) || "m" === a
                        ? ((p += b.abbreviations.million), (t /= 1e6))
                        : ((l < 1e6 && l >= 1e3 && !a) || "k" === a) &&
                          ((p += b.abbreviations.thousand), (t /= 1e3))),
                e._.includes(r, "[.]") &&
                  ((d = !0), (r = r.replace("[.]", "."))),
                (u = t.toString().split(".")[0]),
                (s = r.split(".")[1]),
                (f = r.indexOf(",")),
                (i = (
                  r
                    .split(".")[0]
                    .split(",")[0]
                    .match(/0/g) || []
                ).length),
                s
                  ? (e._.includes(s, "[")
                      ? ((s = (s = s.replace("]", "")).split("[")),
                        (g = e._.toFixed(
                          t,
                          s[0].length + s[1].length,
                          n,
                          s[1].length
                        )))
                      : (g = e._.toFixed(t, s.length, n)),
                    (u = g.split(".")[0]),
                    (g = e._.includes(g, ".")
                      ? b.delimiters.decimal + g.split(".")[1]
                      : ""),
                    d && 0 === Number(g.slice(1)) && (g = ""))
                  : (u = e._.toFixed(t, 0, n)),
                p && !a && Number(u) >= 1e3 && p !== b.abbreviations.trillion)
              )
                switch (((u = String(Number(u) / 1e3)), p)) {
                  case b.abbreviations.thousand:
                    p = b.abbreviations.million;
                    break;
                  case b.abbreviations.million:
                    p = b.abbreviations.billion;
                    break;
                  case b.abbreviations.billion:
                    p = b.abbreviations.trillion;
                }
              if (
                (e._.includes(u, "-") && ((u = u.slice(1)), (_ = !0)),
                u.length < i)
              )
                for (var v = i - u.length; v > 0; v--) u = "0" + u;
              return (
                f > -1 &&
                  (u = u
                    .toString()
                    .replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      "$1" + b.delimiters.thousands
                    )),
                0 === r.indexOf(".") && (u = ""),
                (m = u + g + (p || "")),
                h
                  ? (m = (h && _ ? "(" : "") + m + (h && _ ? ")" : ""))
                  : c >= 0
                    ? (m = 0 === c ? (_ ? "-" : "+") + m : m + (_ ? "-" : "+"))
                    : _ && (m = "-" + m),
                m
              );
            },
            stringToNumber: function(e) {
              var t,
                r,
                n,
                i = o[u.currentLocale],
                a = e,
                l = { thousand: 3, million: 6, billion: 9, trillion: 12 };
              if (u.zeroFormat && e === u.zeroFormat) r = 0;
              else if (
                (u.nullFormat && e === u.nullFormat) ||
                !e.replace(/[^0-9]+/g, "").length
              )
                r = null;
              else {
                for (t in ((r = 1),
                "." !== i.delimiters.decimal &&
                  (e = e.replace(/\./g, "").replace(i.delimiters.decimal, ".")),
                l))
                  if (
                    ((n = new RegExp(
                      "[^a-zA-Z]" +
                        i.abbreviations[t] +
                        "(?:\\)|(\\" +
                        i.currency.symbol +
                        ")?(?:\\))?)?$"
                    )),
                    a.match(n))
                  ) {
                    r *= Math.pow(10, l[t]);
                    break;
                  }
                (r *=
                  (e.split("-").length +
                    Math.min(
                      e.split("(").length - 1,
                      e.split(")").length - 1
                    )) %
                  2
                    ? 1
                    : -1),
                  (e = e.replace(/[^0-9\.]+/g, "")),
                  (r *= Number(e));
              }
              return r;
            },
            isNaN: function(e) {
              return "number" == typeof e && isNaN(e);
            },
            includes: function(e, t) {
              return -1 !== e.indexOf(t);
            },
            insert: function(e, t, r) {
              return e.slice(0, r) + t + e.slice(r);
            },
            reduce: function(e, t) {
              if (null === this)
                throw new TypeError(
                  "Array.prototype.reduce called on null or undefined"
                );
              if ("function" != typeof t)
                throw new TypeError(t + " is not a function");
              var r,
                n = Object(e),
                i = n.length >>> 0,
                a = 0;
              if (3 === arguments.length) r = arguments[2];
              else {
                for (; a < i && !(a in n); ) a++;
                if (a >= i)
                  throw new TypeError(
                    "Reduce of empty array with no initial value"
                  );
                r = n[a++];
              }
              for (; a < i; a++) a in n && (r = t(r, n[a], a, n));
              return r;
            },
            multiplier: function(e) {
              var t = e.toString().split(".");
              return t.length < 2 ? 1 : Math.pow(10, t[1].length);
            },
            correctionFactor: function() {
              return Array.prototype.slice
                .call(arguments)
                .reduce(function(e, r) {
                  var n = t.multiplier(r);
                  return e > n ? e : n;
                }, 1);
            },
            toFixed: function(e, t, r, n) {
              var i,
                a,
                o,
                l,
                u = e.toString().split("."),
                s = t - (n || 0);
              return (
                (i =
                  2 === u.length ? Math.min(Math.max(u[1].length, s), t) : s),
                (o = Math.pow(10, i)),
                (l = (r(e + "e+" + i) / o).toFixed(i)),
                n > t - i &&
                  ((a = new RegExp("\\.?0{1," + (n - (t - i)) + "}$")),
                  (l = l.replace(a, ""))),
                l
              );
            }
          }),
          (e.options = u),
          (e.formats = a),
          (e.locales = o),
          (e.locale = function(e) {
            return e && (u.currentLocale = e.toLowerCase()), u.currentLocale;
          }),
          (e.localeData = function(e) {
            if (!e) return o[u.currentLocale];
            if (((e = e.toLowerCase()), !o[e]))
              throw new Error("Unknown locale : " + e);
            return o[e];
          }),
          (e.reset = function() {
            for (var e in l) u[e] = l[e];
          }),
          (e.zeroFormat = function(e) {
            u.zeroFormat = "string" == typeof e ? e : null;
          }),
          (e.nullFormat = function(e) {
            u.nullFormat = "string" == typeof e ? e : null;
          }),
          (e.defaultFormat = function(e) {
            u.defaultFormat = "string" == typeof e ? e : "0.0";
          }),
          (e.register = function(e, t, r) {
            if (((t = t.toLowerCase()), this[e + "s"][t]))
              throw new TypeError(t + " " + e + " already registered.");
            return (this[e + "s"][t] = r), r;
          }),
          (e.validate = function(t, r) {
            var n, i, a, o, l, u, s, c;
            if (
              ("string" != typeof t &&
                ((t += ""),
                console.warn &&
                  console.warn(
                    "Numeral.js: Value is not string. It has been co-erced to: ",
                    t
                  )),
              (t = t.trim()).match(/^\d+$/))
            )
              return !0;
            if ("" === t) return !1;
            try {
              s = e.localeData(r);
            } catch (t) {
              s = e.localeData(e.locale());
            }
            return (
              (a = s.currency.symbol),
              (l = s.abbreviations),
              (n = s.delimiters.decimal),
              (i =
                "." === s.delimiters.thousands
                  ? "\\."
                  : s.delimiters.thousands),
              (null === (c = t.match(/^[^\d]+/)) ||
                ((t = t.substr(1)), c[0] === a)) &&
                ((null === (c = t.match(/[^\d]+$/)) ||
                  ((t = t.slice(0, -1)),
                  c[0] === l.thousand ||
                    c[0] === l.million ||
                    c[0] === l.billion ||
                    c[0] === l.trillion)) &&
                  ((u = new RegExp(i + "{2}")),
                  !t.match(/[^\d.,]/g) &&
                    (!((o = t.split(n)).length > 2) &&
                      (o.length < 2
                        ? !!o[0].match(/^\d+.*\d$/) && !o[0].match(u)
                        : 1 === o[0].length
                          ? !!o[0].match(/^\d+$/) &&
                            !o[0].match(u) &&
                            !!o[1].match(/^\d+$/)
                          : !!o[0].match(/^\d+.*\d$/) &&
                            !o[0].match(u) &&
                            !!o[1].match(/^\d+$/)))))
            );
          }),
          (e.fn = s.prototype = {
            clone: function() {
              return e(this);
            },
            format: function(t, r) {
              var n,
                i,
                o,
                l = this._value,
                s = t || u.defaultFormat;
              if (((r = r || Math.round), 0 === l && null !== u.zeroFormat))
                i = u.zeroFormat;
              else if (null === l && null !== u.nullFormat) i = u.nullFormat;
              else {
                for (n in a)
                  if (s.match(a[n].regexps.format)) {
                    o = a[n].format;
                    break;
                  }
                i = (o = o || e._.numberToFormat)(l, s, r);
              }
              return i;
            },
            value: function() {
              return this._value;
            },
            input: function() {
              return this._input;
            },
            set: function(e) {
              return (this._value = Number(e)), this;
            },
            add: function(e) {
              var r = t.correctionFactor.call(null, this._value, e);
              return (
                (this._value =
                  t.reduce(
                    [this._value, e],
                    function(e, t, n, i) {
                      return e + Math.round(r * t);
                    },
                    0
                  ) / r),
                this
              );
            },
            subtract: function(e) {
              var r = t.correctionFactor.call(null, this._value, e);
              return (
                (this._value =
                  t.reduce(
                    [e],
                    function(e, t, n, i) {
                      return e - Math.round(r * t);
                    },
                    Math.round(this._value * r)
                  ) / r),
                this
              );
            },
            multiply: function(e) {
              return (
                (this._value = t.reduce(
                  [this._value, e],
                  function(e, r, n, i) {
                    var a = t.correctionFactor(e, r);
                    return (
                      (Math.round(e * a) * Math.round(r * a)) /
                      Math.round(a * a)
                    );
                  },
                  1
                )),
                this
              );
            },
            divide: function(e) {
              return (
                (this._value = t.reduce([this._value, e], function(e, r, n, i) {
                  var a = t.correctionFactor(e, r);
                  return Math.round(e * a) / Math.round(r * a);
                })),
                this
              );
            },
            difference: function(t) {
              return Math.abs(
                e(this._value)
                  .subtract(t)
                  .value()
              );
            }
          }),
          e.register("locale", "en", {
            delimiters: { thousands: ",", decimal: "." },
            abbreviations: {
              thousand: "k",
              million: "m",
              billion: "b",
              trillion: "t"
            },
            ordinal: function(e) {
              var t = e % 10;
              return 1 == ~~((e % 100) / 10)
                ? "th"
                : 1 === t
                  ? "st"
                  : 2 === t
                    ? "nd"
                    : 3 === t
                      ? "rd"
                      : "th";
            },
            currency: { symbol: "$" }
          }),
          e.register("format", "bps", {
            regexps: { format: /(BPS)/, unformat: /(BPS)/ },
            format: function(t, r, n) {
              var i,
                a = e._.includes(r, " BPS") ? " " : "";
              return (
                (t *= 1e4),
                (r = r.replace(/\s?BPS/, "")),
                (i = e._.numberToFormat(t, r, n)),
                e._.includes(i, ")")
                  ? ((i = i.split("")).splice(-1, 0, a + "BPS"),
                    (i = i.join("")))
                  : (i = i + a + "BPS"),
                i
              );
            },
            unformat: function(t) {
              return +(1e-4 * e._.stringToNumber(t)).toFixed(15);
            }
          }),
          (n = {
            base: 1024,
            suffixes: [
              "B",
              "KiB",
              "MiB",
              "GiB",
              "TiB",
              "PiB",
              "EiB",
              "ZiB",
              "YiB"
            ]
          }),
          (i =
            "(" +
            (i = (r = {
              base: 1e3,
              suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
            }).suffixes
              .concat(
                n.suffixes.filter(function(e) {
                  return r.suffixes.indexOf(e) < 0;
                })
              )
              .join("|")).replace("B", "B(?!PS)") +
            ")"),
          e.register("format", "bytes", {
            regexps: { format: /([0\s]i?b)/, unformat: new RegExp(i) },
            format: function(t, i, a) {
              var o,
                l,
                u,
                s = e._.includes(i, "ib") ? n : r,
                c = e._.includes(i, " b") || e._.includes(i, " ib") ? " " : "";
              for (
                i = i.replace(/\s?i?b/, ""), o = 0;
                o <= s.suffixes.length;
                o++
              )
                if (
                  ((l = Math.pow(s.base, o)),
                  (u = Math.pow(s.base, o + 1)),
                  null === t || 0 === t || (t >= l && t < u))
                ) {
                  (c += s.suffixes[o]), l > 0 && (t /= l);
                  break;
                }
              return e._.numberToFormat(t, i, a) + c;
            },
            unformat: function(t) {
              var i,
                a,
                o = e._.stringToNumber(t);
              if (o) {
                for (i = r.suffixes.length - 1; i >= 0; i--) {
                  if (e._.includes(t, r.suffixes[i])) {
                    a = Math.pow(r.base, i);
                    break;
                  }
                  if (e._.includes(t, n.suffixes[i])) {
                    a = Math.pow(n.base, i);
                    break;
                  }
                }
                o *= a || 1;
              }
              return o;
            }
          }),
          e.register("format", "currency", {
            regexps: { format: /(\$)/ },
            format: function(t, r, n) {
              var i,
                a,
                o = e.locales[e.options.currentLocale],
                l = {
                  before: r.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                  after: r.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                };
              for (
                r = r.replace(/\s?\$\s?/, ""),
                  i = e._.numberToFormat(t, r, n),
                  t >= 0
                    ? ((l.before = l.before.replace(/[\-\(]/, "")),
                      (l.after = l.after.replace(/[\-\)]/, "")))
                    : t < 0 &&
                      !e._.includes(l.before, "-") &&
                      !e._.includes(l.before, "(") &&
                      (l.before = "-" + l.before),
                  a = 0;
                a < l.before.length;
                a++
              )
                switch (l.before[a]) {
                  case "$":
                    i = e._.insert(i, o.currency.symbol, a);
                    break;
                  case " ":
                    i = e._.insert(i, " ", a + o.currency.symbol.length - 1);
                }
              for (a = l.after.length - 1; a >= 0; a--)
                switch (l.after[a]) {
                  case "$":
                    i =
                      a === l.after.length - 1
                        ? i + o.currency.symbol
                        : e._.insert(
                            i,
                            o.currency.symbol,
                            -(l.after.length - (1 + a))
                          );
                    break;
                  case " ":
                    i =
                      a === l.after.length - 1
                        ? i + " "
                        : e._.insert(
                            i,
                            " ",
                            -(
                              l.after.length -
                              (1 + a) +
                              o.currency.symbol.length -
                              1
                            )
                          );
                }
              return i;
            }
          }),
          e.register("format", "exponential", {
            regexps: { format: /(e\+|e-)/, unformat: /(e\+|e-)/ },
            format: function(t, r, n) {
              var i = ("number" != typeof t || e._.isNaN(t)
                ? "0e+0"
                : t.toExponential()
              ).split("e");
              return (
                (r = r.replace(/e[\+|\-]{1}0/, "")),
                e._.numberToFormat(Number(i[0]), r, n) + "e" + i[1]
              );
            },
            unformat: function(t) {
              var r = e._.includes(t, "e+") ? t.split("e+") : t.split("e-"),
                n = Number(r[0]),
                i = Number(r[1]);
              return (
                (i = e._.includes(t, "e-") ? (i *= -1) : i),
                e._.reduce(
                  [n, Math.pow(10, i)],
                  function(t, r, n, i) {
                    var a = e._.correctionFactor(t, r);
                    return (t * a * (r * a)) / (a * a);
                  },
                  1
                )
              );
            }
          }),
          e.register("format", "ordinal", {
            regexps: { format: /(o)/ },
            format: function(t, r, n) {
              var i = e.locales[e.options.currentLocale],
                a = e._.includes(r, " o") ? " " : "";
              return (
                (r = r.replace(/\s?o/, "")),
                (a += i.ordinal(t)),
                e._.numberToFormat(t, r, n) + a
              );
            }
          }),
          e.register("format", "percentage", {
            regexps: { format: /(%)/, unformat: /(%)/ },
            format: function(t, r, n) {
              var i,
                a = e._.includes(r, " %") ? " " : "";
              return (
                e.options.scalePercentBy100 && (t *= 100),
                (r = r.replace(/\s?\%/, "")),
                (i = e._.numberToFormat(t, r, n)),
                e._.includes(i, ")")
                  ? ((i = i.split("")).splice(-1, 0, a + "%"), (i = i.join("")))
                  : (i = i + a + "%"),
                i
              );
            },
            unformat: function(t) {
              var r = e._.stringToNumber(t);
              return e.options.scalePercentBy100 ? 0.01 * r : r;
            }
          }),
          e.register("format", "time", {
            regexps: { format: /(:)/, unformat: /(:)/ },
            format: function(e, t, r) {
              var n = Math.floor(e / 60 / 60),
                i = Math.floor((e - 60 * n * 60) / 60),
                a = Math.round(e - 60 * n * 60 - 60 * i);
              return (
                n + ":" + (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a)
              );
            },
            unformat: function(e) {
              var t = e.split(":"),
                r = 0;
              return (
                3 === t.length
                  ? ((r += 60 * Number(t[0]) * 60),
                    (r += 60 * Number(t[1])),
                    (r += Number(t[2])))
                  : 2 === t.length &&
                    ((r += 60 * Number(t[0])), (r += Number(t[1]))),
                Number(r)
              );
            }
          }),
          e
        );
      }),
      e.exports ? (e.exports = n()) : (r.numeral = n());
  })((r = { exports: {} }), r.exports),
  r.exports);
const i = {
  abbrev: "0a",
  ordinal: "0o",
  percent: "0%",
  bytes: "0[.][00] ib",
  e: "0[.00]e+0",
  thousands: "0,0[.][00]"
};
n.locales.en.delimiters.thousands = " ";
class a extends e {
  get html() {
    return "<style>:host {\n  display: inline;\n  white-space: nowrap; }</style>\n<span></span>";
  }
  static get tag() {
    return "pfe-number";
  }
  get styleUrl() {
    return "pfe-number.scss";
  }
  get templateUrl() {
    return "pfe-number.html";
  }
  static get observedAttributes() {
    return ["number", "format", "type"];
  }
  constructor() {
    super(a);
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.connected = !0),
      this._determineFormat(),
      this._setInitialNumber();
  }
  attributeChangedCallback(e, t, r) {
    switch ((super.attributeChangedCallback(...arguments), e)) {
      case "type":
        this._determineFormat();
        break;
      case "format":
        this._updateNumber(this.getAttribute("number"), r);
        break;
      case "number":
        this._updateNumber(r, this.getAttribute("format"));
    }
  }
  _setInitialNumber() {
    const e = !Number.isNaN(parseFloat(this.getAttribute("number"))),
      t = !Number.isNaN(parseFloat(this.textContent));
    e
      ? this.setAttribute("number", this.getAttribute("number"))
      : t && this.setAttribute("number", this.textContent);
  }
  _determineFormat() {
    let e = this.getAttribute("type");
    e && i[e]
      ? this.setAttribute("format", i[e])
      : this.setAttribute("format", this.getAttribute("format") || "0");
  }
  _updateNumber(e, t) {
    this.shadowRoot.querySelector("span").textContent = this._format(e, t);
  }
  _format(e, t) {
    return n(e).format(t);
  }
}
e.create(a);
//# sourceMappingURL=pfe-number.js.map
