!(function(e, t) {
  if ("function" == typeof define && define.amd)
    define(["../cp-styles/cp-styles.compiled.js"], t);
  else if ("undefined" != typeof exports)
    t(require("../cp-styles/cp-styles.compiled.js"));
  else {
    t(e.cpStylesCompiled), (e.cpCard = {});
  }
})(this, function() {
  "use strict";
  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function t(e, t) {
    if (!e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
  }
  function n(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof t
      );
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
    })),
      t &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(e, t)
          : (e.__proto__ = t));
  }
  var r = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
    o = document.createElement("template");
  o.innerHTML =
    '\n  <style id="cp-card-heading">\n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6 {\n      margin-top: var(--heading-margin-top, 0);\n    }\n  </style>\n  <h3><slot></slot></h3>\n';
  var a = (function(a) {
    function l() {
      e(this, l);
      var n = t(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this));
      return (
        n.attachShadow({ mode: "open" }),
        n.shadowRoot.appendChild(o.content.cloneNode(!0)),
        n
      );
    }
    return (
      n(l, HTMLElement),
      r(l, null, [
        {
          key: "observedAttributes",
          get: function() {
            return ["data-level"];
          }
        }
      ]),
      r(l, [
        {
          key: "attributeChangedCallback",
          value: function(e, t, n) {
            if ("data-level" === e) {
              ({ 1: !0, 2: !0, 3: !0, 4: !0, 5: !0, 6: !0 }[n] || (n = "3"),
                (this.shadowRoot.innerHTML =
                  "<h" + n + "><slot></slot></h" + n + ">"));
            }
          }
        }
      ]),
      l
    );
  })();
  window.customElements.define("cp-card-heading", a);
  var l = document.createElement("template");
  (l.innerHTML =
    '\n  <style>:host {\n  display: block;\n  padding: 31px;\n  border: 1px solid transparent;\n  color: var(--text-color, #333);\n  fill: var(--text-color, #333); }\n\n::slotted(h1:first-child),\n::slotted(h2:first-child),\n::slotted(h3:first-child),\n::slotted(h4:first-child),\n::slotted(h5:first-child),\n::slotted(h6:first-child),\n::slotted(cp-card-heading) {\n  --heading-margin-top: 0; }\n\n:host([data-theme="white"]) {\n  background: var(--white, #fff);\n  border-color: var(--white, #fff);\n  --text-color: var(--gray-night, #333);\n  fill: var(--gray-night, #333); }\n\n:host([data-theme="black"]) {\n  background: var(--black, #1a1a1a);\n  border-color: var(--black, #1a1a1a);\n  --text-color: var(--white, #fff);\n  fill: var(--white, #fff); }\n\n:host([data-theme="dark"]) {\n  background: var(--gray-space, #4c4c4c);\n  border-color: var(--gray-space, #4c4c4c);\n  --text-color: var(--white, #fff);\n  fill: var(--white, #fff); }\n\n:host([data-theme="light"]) {\n  background: var(--gray-platinum, #e7e7e7);\n  border-color: var(--gray-platinum, #e7e7e7);\n  --text-color: var(--gray-night, #333);\n  fill: var(--gray-night, #333); }\n\n:host([data-border="white"]) {\n  border-color: var(--white, #fff); }\n\n:host([data-border="black"]) {\n  border-color: var(--black, #1a1a1a); }\n\n:host([data-border="gray"]) {\n  border-color: var(--border-color, #ededed); }\n\n:host([data-border="dark"]) {\n  border-color: var(--gray-space, #4c4c4c); }\n\n:host([data-border="light"]) {\n  border-color: var(--gray-platinum, #e7e7e7); }\n\n:host([data-border="transparent"]),\n:host([data-border="none"]) {\n  border-color: transparent; }</style>\n\n  <slot></slot>\n'),
    window.ShadyCSS && ShadyCSS.prepareTemplate(l, "cp-card");
  var c = (function(o) {
    function a() {
      e(this, a);
      var n = t(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
      return (
        n.attachShadow({ mode: "open" }),
        n.shadowRoot.appendChild(l.content.cloneNode(!0)),
        n
      );
    }
    return (
      n(a, HTMLElement),
      r(a, [
        {
          key: "connectedCallback",
          value: function() {
            window.ShadyCSS && ShadyCSS.styleElement(this);
          }
        }
      ]),
      a
    );
  })();
  window.customElements.define("cp-card", c);
});
