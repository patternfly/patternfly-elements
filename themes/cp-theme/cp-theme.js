var commonjsGlobal =
  typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
        ? self
        : {};

(function() {
  /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var l,
    aa =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof commonjsGlobal && null != commonjsGlobal
          ? commonjsGlobal
          : this,
    m = {};
  function n() {
    this.end = this.start = 0;
    this.rules = this.parent = this.previous = null;
    this.cssText = this.parsedCssText = "";
    this.atRule = !1;
    this.type = 0;
    this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function p(a) {
    a = a.replace(ba, "").replace(ca, "");
    var b = da,
      c = a,
      e = new n();
    e.start = 0;
    e.end = c.length;
    for (var d = e, f = 0, h = c.length; f < h; f++)
      if ("{" === c[f]) {
        d.rules || (d.rules = []);
        var g = d,
          k = g.rules[g.rules.length - 1] || null;
        d = new n();
        d.start = f + 1;
        d.parent = g;
        d.previous = k;
        g.rules.push(d);
      } else "}" === c[f] && ((d.end = f + 1), (d = d.parent || e));
    return b(e, a);
  }
  function da(a, b) {
    var c = b.substring(a.start, a.end - 1);
    a.parsedCssText = a.cssText = c.trim();
    a.parent &&
      ((c = b.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (c = ea(c)),
      (c = c.replace(fa, " ")),
      (c = c.substring(c.lastIndexOf(";") + 1)),
      (c = a.parsedSelector = a.selector = c.trim()),
      (a.atRule = 0 === c.indexOf("@")),
      a.atRule
        ? 0 === c.indexOf("@media")
          ? (a.type = ha)
          : c.match(ia) &&
            ((a.type = r), (a.keyframesName = a.selector.split(fa).pop()))
        : (a.type = 0 === c.indexOf("--") ? ja : ka));
    if ((c = a.rules))
      for (var e = 0, d = c.length, f; e < d && (f = c[e]); e++) da(f, b);
    return a;
  }
  function ea(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, c) {
      a = c;
      for (c = 6 - a.length; c--; ) a = "0" + a;
      return "\\" + a;
    });
  }
  function la(a, b, c) {
    c = void 0 === c ? "" : c;
    var e = "";
    if (a.cssText || a.rules) {
      var d = a.rules,
        f;
      if ((f = d))
        (f = d[0]), (f = !(f && f.selector && 0 === f.selector.indexOf("--")));
      if (f) {
        f = 0;
        for (var h = d.length, g; f < h && (g = d[f]); f++) e = la(g, b, e);
      } else
        b
          ? (b = a.cssText)
          : ((b = a.cssText),
            (b = b.replace(ma, "").replace(na, "")),
            (b = b.replace(oa, "").replace(pa, ""))),
          (e = b.trim()) && (e = "  " + e + "\n");
    }
    e &&
      (a.selector && (c += a.selector + " {\n"),
      (c += e),
      a.selector && (c += "}\n\n"));
    return c;
  }
  var ka = 1,
    r = 7,
    ha = 4,
    ja = 1e3,
    ba = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    ca = /@import[^;]*;/gim,
    ma = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    na = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    oa = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    pa = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    ia = /^@[^\s]*keyframes/,
    fa = /\s+/g;
  var qa = Promise.resolve();
  function ra(a) {
    if ((a = m[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1);
  }
  function sa(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }
  function ta(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;
    a.b ||
      ((a.b = !0),
      qa.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion;
        a.b = !1;
      }));
  }
  var t = !(window.ShadyDOM && window.ShadyDOM.inUse),
    u;
  function ua(a) {
    u =
      a && a.shimcssproperties
        ? !1
        : t ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports("box-shadow", "0 0 0 var(--foo)")
          );
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (u = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (ua(window.ShadyCSS), (window.ShadyCSS = void 0))
      : ua(window.WebComponents && window.WebComponents.flags);
  var v = u;
  var w = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    y = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    va = /(--[\w-]+)\s*([:,;)]|$)/gi,
    wa = /(animation\s*:)|(animation-name\s*:)/,
    xa = /@media\s(.*)/,
    ya = /\{[^}]*\}/g;
  var za = new Set();
  function z(a, b) {
    if (!a) return "";
    "string" === typeof a && (a = p(a));
    b && A(a, b);
    return la(a, v);
  }
  function B(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = p(a.textContent));
    return a.__cssRules || null;
  }
  function Aa(a) {
    return !!a.parent && a.parent.type === r;
  }
  function A(a, b, c, e) {
    if (a) {
      var d = !1,
        f = a.type;
      if (e && f === ha) {
        var h = a.selector.match(xa);
        h && (window.matchMedia(h[1]).matches || (d = !0));
      }
      f === ka ? b(a) : c && f === r ? c(a) : f === ja && (d = !0);
      if ((a = a.rules) && !d) {
        d = 0;
        f = a.length;
        for (var g; d < f && (g = a[d]); d++) A(g, b, c, e);
      }
    }
  }
  function C(a, b, c, e) {
    var d = document.createElement("style");
    b && d.setAttribute("scope", b);
    d.textContent = a;
    Ba(d, c, e);
    return d;
  }
  var D = null;
  function Ba(a, b, c) {
    b = b || document.head;
    b.insertBefore(a, (c && c.nextSibling) || b.firstChild);
    D
      ? a.compareDocumentPosition(D) === Node.DOCUMENT_POSITION_PRECEDING &&
        (D = a)
      : (D = a);
  }
  function Ca(a, b) {
    var c = a.indexOf("var(");
    if (-1 === c) return b(a, "", "", "");
    a: {
      var e = 0;
      var d = c + 3;
      for (var f = a.length; d < f; d++)
        if ("(" === a[d]) e++;
        else if (")" === a[d] && 0 === --e) break a;
      d = -1;
    }
    e = a.substring(c + 4, d);
    c = a.substring(0, c);
    a = Ca(a.substring(d + 1), b);
    d = e.indexOf(",");
    return -1 === d
      ? b(c, e.trim(), "", a)
      : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
  }
  function E(a, b) {
    t
      ? a.setAttribute("class", b)
      : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  function F(a) {
    var b = a.localName,
      c = "";
    b
      ? -1 < b.indexOf("-") ||
        ((c = b), (b = (a.getAttribute && a.getAttribute("is")) || ""))
      : ((b = a.is), (c = a.extends));
    return { is: b, s: c };
  }
  function G() {}
  function H(a, b, c) {
    var e = I;
    a.__styleScoped ? (a.__styleScoped = null) : Da(e, a, b || "", c);
  }
  function Da(a, b, c, e) {
    b.nodeType === Node.ELEMENT_NODE && Ea(b, c, e);
    if (
      (b =
        "template" === b.localName
          ? (b.content || b.P).childNodes
          : b.children || b.childNodes)
    )
      for (var d = 0; d < b.length; d++) Da(a, b[d], c, e);
  }
  function Ea(a, b, c) {
    if (b)
      if (a.classList)
        c
          ? (a.classList.remove("style-scope"), a.classList.remove(b))
          : (a.classList.add("style-scope"), a.classList.add(b));
      else if (a.getAttribute) {
        var e = a.getAttribute(Fa);
        c
          ? e && ((b = e.replace("style-scope", "").replace(b, "")), E(a, b))
          : E(a, (e ? e + " " : "") + "style-scope " + b);
      }
  }
  function J(a, b, c) {
    var e = I,
      d = a.__cssBuild;
    t || "shady" === d
      ? (b = z(b, c))
      : ((a = F(a)), (b = Ga(e, b, a.is, a.s, c) + "\n\n"));
    return b.trim();
  }
  function Ga(a, b, c, e, d) {
    var f = K(c, e);
    c = c ? Ha + c : "";
    return z(b, function(b) {
      b.c || ((b.selector = b.g = L(a, b, a.b, c, f)), (b.c = !0));
      d && d(b, c, f);
    });
  }
  function K(a, b) {
    return b ? "[is=" + a + "]" : a;
  }
  function L(a, b, c, e, d) {
    var f = b.selector.split(Ia);
    if (!Aa(b)) {
      b = 0;
      for (var h = f.length, g; b < h && (g = f[b]); b++)
        f[b] = c.call(a, g, e, d);
    }
    return f.join(Ia);
  }
  function Ja(a) {
    return a.replace(M, function(a, c, e) {
      -1 < e.indexOf("+")
        ? (e = e.replace(/\+/g, "___"))
        : -1 < e.indexOf("___") && (e = e.replace(/___/g, "+"));
      return ":" + c + "(" + e + ")";
    });
  }
  G.prototype.b = function(a, b, c) {
    var e = !1;
    a = a.trim();
    var d = M.test(a);
    d &&
      ((a = a.replace(M, function(a, b, c) {
        return ":" + b + "(" + c.replace(/\s/g, "") + ")";
      })),
      (a = Ja(a)));
    a = a.replace(Ka, N + " $1");
    a = a.replace(La, function(a, d, g) {
      e || ((a = Ma(g, d, b, c)), (e = e || a.stop), (d = a.G), (g = a.value));
      return d + g;
    });
    d && (a = Ja(a));
    return a;
  };
  function Ma(a, b, c, e) {
    var d = a.indexOf(Na);
    0 <= a.indexOf(N) ? (a = Oa(a, e)) : 0 !== d && (a = c ? Pa(a, c) : a);
    c = !1;
    0 <= d && ((b = ""), (c = !0));
    if (c) {
      var f = !0;
      c &&
        (a = a.replace(Qa, function(a, b) {
          return " > " + b;
        }));
    }
    a = a.replace(Ra, function(a, b, c) {
      return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]';
    });
    return { value: a, G: b, stop: f };
  }
  function Pa(a, b) {
    a = a.split(Sa);
    a[0] += b;
    return a.join(Sa);
  }
  function Oa(a, b) {
    var c = a.match(Ta);
    return (c = (c && c[2].trim()) || "")
      ? c[0].match(Ua)
        ? a.replace(Ta, function(a, c, f) {
            return b + f;
          })
        : c.split(Ua)[0] === b
          ? c
          : Va
      : a.replace(N, b);
  }
  function Wa(a) {
    a.selector === Xa && (a.selector = "html");
  }
  G.prototype.c = function(a) {
    return a.match(Na) ? this.b(a, Ya) : Pa(a.trim(), Ya);
  };
  aa.Object.defineProperties(G.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return "style-scope";
      }
    }
  });
  var M = /:(nth[-\w]+)\(([^)]+)\)/,
    Ya = ":not(.style-scope)",
    Ia = ",",
    La = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
    Ua = /[[.:#*]/,
    N = ":host",
    Xa = ":root",
    Na = "::slotted",
    Ka = new RegExp("^(" + Na + ")"),
    Ta = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Qa = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
    Ra = /(.*):dir\((?:(ltr|rtl))\)/,
    Ha = ".",
    Sa = ":",
    Fa = "class",
    Va = "should_not_match",
    I = new G();
  function Za() {}
  function $a(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];
      if (c.target !== document.documentElement && c.target !== document.head)
        for (var e = 0; e < c.addedNodes.length; e++) {
          var d = c.addedNodes[e];
          if (d.nodeType === Node.ELEMENT_NODE) {
            var f = d.getRootNode();
            var h = d;
            var g = [];
            h.classList
              ? (g = Array.from(h.classList))
              : h instanceof window.SVGElement &&
                h.hasAttribute("class") &&
                (g = h.getAttribute("class").split(/\s+/));
            h = g;
            g = h.indexOf(I.a);
            if ((h = -1 < g ? h[g + 1] : "") && f === d.ownerDocument)
              H(d, h, !0);
            else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (f = f.host))
              if (((f = F(f).is), h === f))
                for (
                  d = window.ShadyDOM.nativeMethods.querySelectorAll.call(
                    d,
                    ":not(." + I.a + ")"
                  ),
                    f = 0;
                  f < d.length;
                  f++
                )
                  Ea(d[f], h);
              else h && H(d, h, !0), H(d, f);
          }
        }
    }
  }
  if (!t) {
    var ab = new MutationObserver($a),
      bb = function(a) {
        ab.observe(a, { childList: !0, subtree: !0 });
      };
    if (
      window.customElements &&
      !window.customElements.polyfillWrapFlushCallback
    )
      bb(document);
    else {
      var cb = function() {
        bb(document.body);
      };
      window.HTMLImports
        ? window.HTMLImports.whenReady(cb)
        : requestAnimationFrame(function() {
            if ("loading" === document.readyState) {
              var a = function() {
                cb();
                document.removeEventListener("readystatechange", a);
              };
              document.addEventListener("readystatechange", a);
            } else cb();
          });
    }
    Za = function() {
      $a(ab.takeRecords());
    };
  }
  var db = Za;
  function P(a, b, c, e, d) {
    this.j = a || null;
    this.b = b || null;
    this.A = c || [];
    this.o = null;
    this.s = d || "";
    this.a = this.h = this.m = null;
  }
  function Q(a) {
    return a ? a.__styleInfo : null;
  }
  function eb(a, b) {
    return (a.__styleInfo = b);
  }
  P.prototype.c = function() {
    return this.j;
  };
  P.prototype._getStyleRules = P.prototype.c;
  function fb(a) {
    var b =
      this.matches ||
      this.matchesSelector ||
      this.mozMatchesSelector ||
      this.msMatchesSelector ||
      this.oMatchesSelector ||
      this.webkitMatchesSelector;
    return b && b.call(this, a);
  }
  var gb = navigator.userAgent.match("Trident");
  function hb() {}
  function ib(a) {
    var b = {},
      c = [],
      e = 0;
    A(
      a,
      function(a) {
        R(a);
        a.index = e++;
        a = a.f.cssText;
        for (var c; (c = va.exec(a)); ) {
          var d = c[1];
          ":" !== c[2] && (b[d] = !0);
        }
      },
      function(a) {
        c.push(a);
      }
    );
    a.b = c;
    a = [];
    for (var d in b) a.push(d);
    return a;
  }
  function R(a) {
    if (!a.f) {
      var b = {},
        c = {};
      S(a, c) && ((b.i = c), (a.rules = null));
      b.cssText = a.parsedCssText.replace(ya, "").replace(w, "");
      a.f = b;
    }
  }
  function S(a, b) {
    var c = a.f;
    if (c) {
      if (c.i) return Object.assign(b, c.i), !0;
    } else {
      c = a.parsedCssText;
      for (var e; (a = w.exec(c)); ) {
        e = (a[2] || a[3]).trim();
        if ("inherit" !== e || "unset" !== e) b[a[1].trim()] = e;
        e = !0;
      }
      return e;
    }
  }
  function T(a, b, c) {
    b &&
      (b =
        0 <= b.indexOf(";")
          ? jb(a, b, c)
          : Ca(b, function(b, d, f, h) {
              if (!d) return b + h;
              (d = T(a, c[d], c)) && "initial" !== d
                ? "apply-shim-inherit" === d && (d = "inherit")
                : (d = T(a, c[f] || f, c) || f);
              return b + (d || "") + h;
            }));
    return (b && b.trim()) || "";
  }
  function jb(a, b, c) {
    b = b.split(";");
    for (var e = 0, d, f; e < b.length; e++)
      if ((d = b[e])) {
        y.lastIndex = 0;
        if ((f = y.exec(d))) d = T(a, c[f[1]], c);
        else if (((f = d.indexOf(":")), -1 !== f)) {
          var h = d.substring(f);
          h = h.trim();
          h = T(a, h, c) || h;
          d = d.substring(0, f) + h;
        }
        b[e] =
          d && d.lastIndexOf(";") === d.length - 1 ? d.slice(0, -1) : d || "";
      }
    return b.join(";");
  }
  function kb(a, b) {
    var c = {},
      e = [];
    A(
      a,
      function(a) {
        a.f || R(a);
        var d = a.g || a.parsedSelector;
        b &&
          a.f.i &&
          d &&
          fb.call(b, d) &&
          (S(a, c),
          (a = a.index),
          (d = parseInt(a / 32, 10)),
          (e[d] = (e[d] || 0) | (1 << a % 32)));
      },
      null,
      !0
    );
    return { i: c, key: e };
  }
  function lb(a, b, c, e, d) {
    c.f || R(c);
    if (c.f.i) {
      b = F(b);
      a = b.is;
      b = b.s;
      b = a ? K(a, b) : "html";
      var f = c.parsedSelector,
        h = ":host > *" === f || "html" === f,
        g = 0 === f.indexOf(":host") && !h;
      "shady" === e &&
        ((h = f === b + " > *." + b || -1 !== f.indexOf("html")),
        (g = !h && 0 === f.indexOf(b)));
      "shadow" === e &&
        ((h = ":host > *" === f || "html" === f), (g = g && !h));
      if (h || g)
        (e = b),
          g &&
            (c.g || (c.g = L(I, c, I.b, a ? Ha + a : "", b)), (e = c.g || b)),
          d({ L: e, J: g, R: h });
    }
  }
  function mb(a, b) {
    var c = {},
      e = {},
      d = U,
      f = b && b.__cssBuild;
    A(
      b,
      function(b) {
        lb(d, a, b, f, function(d) {
          fb.call(a.w || a, d.L) && (d.J ? S(b, c) : S(b, e));
        });
      },
      null,
      !0
    );
    return { K: e, I: c };
  }
  function nb(a, b, c, e) {
    var d = F(b),
      f = K(d.is, d.s),
      h = new RegExp(
        "(?:^|[^.#[:])" +
          (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) +
          "($|[.:[\\s>+~])"
      );
    d = Q(b).j;
    var g = ob(d, e);
    return J(b, d, function(b) {
      var d = "";
      b.f || R(b);
      b.f.cssText && (d = jb(a, b.f.cssText, c));
      b.cssText = d;
      if (!t && !Aa(b) && b.cssText) {
        var k = (d = b.cssText);
        null == b.B && (b.B = wa.test(d));
        if (b.B)
          if (null == b.v) {
            b.v = [];
            for (var q in g)
              (k = g[q]), (k = k(d)), d !== k && ((d = k), b.v.push(q));
          } else {
            for (q = 0; q < b.v.length; ++q) (k = g[b.v[q]]), (d = k(d));
            k = d;
          }
        b.cssText = k;
        b.g = b.g || b.selector;
        d = "." + e;
        q = b.g.split(",");
        k = 0;
        for (var ub = q.length, O; k < ub && (O = q[k]); k++)
          q[k] = O.match(h) ? O.replace(f, d) : d + " " + O;
        b.selector = q.join(",");
      }
    });
  }
  function ob(a, b) {
    a = a.b;
    var c = {};
    if (!t && a)
      for (var e = 0, d = a[e]; e < a.length; d = a[++e]) {
        var f = d,
          h = b;
        f.l = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");
        f.a = f.keyframesName + "-" + h;
        f.g = f.g || f.selector;
        f.selector = f.g.replace(f.keyframesName, f.a);
        c[d.keyframesName] = pb(d);
      }
    return c;
  }
  function pb(a) {
    return function(b) {
      return b.replace(a.l, a.a);
    };
  }
  function qb(a, b) {
    var c = U,
      e = B(a);
    a.textContent = z(e, function(a) {
      var d = (a.cssText = a.parsedCssText);
      a.f &&
        a.f.cssText &&
        ((d = d.replace(ma, "").replace(na, "")), (a.cssText = jb(c, d, b)));
    });
  }
  aa.Object.defineProperties(hb.prototype, {
    a: {
      configurable: !0,
      enumerable: !0,
      get: function() {
        return "x-scope";
      }
    }
  });
  var U = new hb();
  var rb = {},
    V = window.customElements;
  if (V && !t) {
    var sb = V.define;
    V.define = function(a, b, c) {
      var e = document.createComment(" Shady DOM styles for " + a + " "),
        d = document.head;
      d.insertBefore(e, (D ? D.nextSibling : null) || d.firstChild);
      D = e;
      rb[a] = e;
      sb.call(V, a, b, c);
    };
  }
  var W = new function() {
    this.cache = {};
    this.a = 100;
  }();
  function X() {
    this.w = {};
    this.c = document.documentElement;
    var a = new n();
    a.rules = [];
    this.l = eb(this.c, new P(a));
    this.u = !1;
    this.b = this.a = null;
  }
  l = X.prototype;
  l.D = function() {
    db();
  };
  l.H = function(a) {
    return B(a);
  };
  l.N = function(a) {
    return z(a);
  };
  l.prepareTemplate = function(a, b, c) {
    if (!a.l) {
      a.l = !0;
      a.name = b;
      a.extends = c;
      m[b] = a;
      var e = (e = a.content.querySelector("style"))
        ? e.getAttribute("css-build") || ""
        : "";
      var d = [];
      for (
        var f = a.content.querySelectorAll("style"), h = 0;
        h < f.length;
        h++
      ) {
        var g = f[h];
        if (g.hasAttribute("shady-unscoped")) {
          if (!t) {
            var k = g.textContent;
            za.has(k) ||
              (za.add(k), (k = g.cloneNode(!0)), document.head.appendChild(k));
            g.parentNode.removeChild(g);
          }
        } else d.push(g.textContent), g.parentNode.removeChild(g);
      }
      d = d.join("").trim();
      c = { is: b, extends: c, O: e };
      t || H(a.content, b);
      Y(this);
      f = y.test(d) || w.test(d);
      y.lastIndex = 0;
      w.lastIndex = 0;
      d = p(d);
      f && v && this.a && this.a.transformRules(d, b);
      a._styleAst = d;
      a.u = e;
      e = [];
      v || (e = ib(a._styleAst));
      if (!e.length || v)
        (d = t ? a.content : null),
          (b = rb[b]),
          (f = J(c, a._styleAst)),
          (b = f.length ? C(f, c.is, d, b) : void 0),
          (a.a = b);
      a.c = e;
    }
  };
  function tb(a) {
    !a.b &&
      window.ShadyCSS &&
      window.ShadyCSS.CustomStyleInterface &&
      ((a.b = window.ShadyCSS.CustomStyleInterface),
      (a.b.transformCallback = function(b) {
        a.C(b);
      }),
      (a.b.validateCallback = function() {
        requestAnimationFrame(function() {
          (a.b.enqueued || a.u) && a.flushCustomStyles();
        });
      }));
  }
  function Y(a) {
    !a.a &&
      window.ShadyCSS &&
      window.ShadyCSS.ApplyShim &&
      ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = ra));
    tb(a);
  }
  l.flushCustomStyles = function() {
    Y(this);
    if (this.b) {
      var a = this.b.processStyles();
      if (this.b.enqueued) {
        if (v)
          for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b]);
            if (c && v && this.a) {
              var e = B(c);
              Y(this);
              this.a.transformRules(e);
              c.textContent = z(e);
            }
          }
        else
          for (vb(this, this.c, this.l), b = 0; b < a.length; b++)
            (c = this.b.getStyleForCustomStyle(a[b])) && qb(c, this.l.m);
        this.b.enqueued = !1;
        this.u && !v && this.styleDocument();
      }
    }
  };
  l.styleElement = function(a, b) {
    var c = F(a).is,
      e = Q(a);
    if (!e) {
      var d = F(a);
      e = d.is;
      d = d.s;
      var f = rb[e];
      e = m[e];
      if (e) {
        var h = e._styleAst;
        var g = e.c;
      }
      e = eb(a, new P(h, f, g, 0, d));
    }
    a !== this.c && (this.u = !0);
    b && ((e.o = e.o || {}), Object.assign(e.o, b));
    if (v) {
      if (e.o) {
        b = e.o;
        for (var k in b)
          null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k]);
      }
      if (((k = m[c]) || a === this.c) && k && k.a && !sa(k)) {
        if (sa(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion)
          Y(this),
            this.a && this.a.transformRules(k._styleAst, c),
            (k.a.textContent = J(a, e.j)),
            ta(k);
        t &&
          (c = a.shadowRoot) &&
          (c.querySelector("style").textContent = J(a, e.j));
        e.j = k._styleAst;
      }
    } else if ((vb(this, a, e), e.A && e.A.length)) {
      c = e;
      k = F(a).is;
      a: {
        if ((b = W.cache[k]))
          for (h = b.length - 1; 0 <= h; h--) {
            g = b[h];
            b: {
              e = c.A;
              for (d = 0; d < e.length; d++)
                if (((f = e[d]), g.i[f] !== c.m[f])) {
                  e = !1;
                  break b;
                }
              e = !0;
            }
            if (e) {
              b = g;
              break a;
            }
          }
        b = void 0;
      }
      e = b ? b.styleElement : null;
      h = c.h;
      (g = b && b.h) ||
        ((g = this.w[k] = (this.w[k] || 0) + 1), (g = k + "-" + g));
      c.h = g;
      g = c.h;
      d = U;
      d = e ? e.textContent || "" : nb(d, a, c.m, g);
      f = Q(a);
      var x = f.a;
      x &&
        !t &&
        x !== e &&
        (x._useCount--,
        0 >= x._useCount && x.parentNode && x.parentNode.removeChild(x));
      t
        ? f.a
          ? ((f.a.textContent = d), (e = f.a))
          : d && (e = C(d, g, a.shadowRoot, f.b))
        : e
          ? e.parentNode ||
            (gb && -1 < d.indexOf("@media") && (e.textContent = d),
            Ba(e, null, f.b))
          : d && (e = C(d, g, null, f.b));
      e &&
        ((e._useCount = e._useCount || 0),
        f.a != e && e._useCount++,
        (f.a = e));
      g = e;
      t ||
        ((e = c.h),
        (f = d = a.getAttribute("class") || ""),
        h &&
          (f = d.replace(new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"), " ")),
        (f += (f ? " " : "") + "x-scope " + e),
        d !== f && E(a, f));
      b ||
        ((a = W.cache[k] || []),
        a.push({ i: c.m, styleElement: g, h: c.h }),
        a.length > W.a && a.shift(),
        (W.cache[k] = a));
    }
  };
  function wb(a, b) {
    return (b = b.getRootNode().host) ? (Q(b) ? b : wb(a, b)) : a.c;
  }
  function vb(a, b, c) {
    a = wb(a, b);
    var e = Q(a);
    a = Object.create(e.m || null);
    var d = mb(b, c.j);
    b = kb(e.j, b).i;
    Object.assign(a, d.I, b, d.K);
    b = c.o;
    for (var f in b) if ((d = b[f]) || 0 === d) a[f] = d;
    f = U;
    b = Object.getOwnPropertyNames(a);
    for (d = 0; d < b.length; d++) (e = b[d]), (a[e] = T(f, a[e], a));
    c.m = a;
  }
  l.styleDocument = function(a) {
    this.styleSubtree(this.c, a);
  };
  l.styleSubtree = function(a, b) {
    var c = a.shadowRoot;
    (c || a === this.c) && this.styleElement(a, b);
    if ((b = c && (c.children || c.childNodes)))
      for (a = 0; a < b.length; a++) this.styleSubtree(b[a]);
    else if ((a = a.children || a.childNodes))
      for (b = 0; b < a.length; b++) this.styleSubtree(a[b]);
  };
  l.C = function(a) {
    var b = this,
      c = B(a);
    A(c, function(a) {
      if (t) Wa(a);
      else {
        var c = I;
        a.selector = a.parsedSelector;
        Wa(a);
        a.selector = a.g = L(c, a, c.c, void 0, void 0);
      }
      v && (Y(b), b.a && b.a.transformRule(a));
    });
    v ? (a.textContent = z(c)) : this.l.j.rules.push(c);
  };
  l.getComputedStyleValue = function(a, b) {
    var c;
    v || (c = (Q(a) || Q(wb(this, a))).m[b]);
    return (c = c || window.getComputedStyle(a).getPropertyValue(b))
      ? c.trim()
      : "";
  };
  l.M = function(a, b) {
    var c = a.getRootNode();
    b = b ? b.split(/\s/) : [];
    c = c.host && c.host.localName;
    if (!c) {
      var e = a.getAttribute("class");
      if (e) {
        e = e.split(/\s/);
        for (var d = 0; d < e.length; d++)
          if (e[d] === I.a) {
            c = e[d + 1];
            break;
          }
      }
    }
    c && b.push(I.a, c);
    v || ((c = Q(a)) && c.h && b.push(U.a, c.h));
    E(a, b.join(" "));
  };
  l.F = function(a) {
    return Q(a);
  };
  X.prototype.flush = X.prototype.D;
  X.prototype.prepareTemplate = X.prototype.prepareTemplate;
  X.prototype.styleElement = X.prototype.styleElement;
  X.prototype.styleDocument = X.prototype.styleDocument;
  X.prototype.styleSubtree = X.prototype.styleSubtree;
  X.prototype.getComputedStyleValue = X.prototype.getComputedStyleValue;
  X.prototype.setElementClass = X.prototype.M;
  X.prototype._styleInfoForNode = X.prototype.F;
  X.prototype.transformCustomStyleForDocument = X.prototype.C;
  X.prototype.getStyleAst = X.prototype.H;
  X.prototype.styleAstToString = X.prototype.N;
  X.prototype.flushCustomStyles = X.prototype.flushCustomStyles;
  Object.defineProperties(X.prototype, {
    nativeShadow: {
      get: function() {
        return t;
      }
    },
    nativeCss: {
      get: function() {
        return v;
      }
    }
  });
  var Z = new X(),
    xb,
    yb;
  window.ShadyCSS &&
    ((xb = window.ShadyCSS.ApplyShim),
    (yb = window.ShadyCSS.CustomStyleInterface));
  window.ShadyCSS = {
    ScopingShim: Z,
    prepareTemplate: function(a, b, c) {
      Z.flushCustomStyles();
      Z.prepareTemplate(a, b, c);
    },
    styleSubtree: function(a, b) {
      Z.flushCustomStyles();
      Z.styleSubtree(a, b);
    },
    styleElement: function(a) {
      Z.flushCustomStyles();
      Z.styleElement(a);
    },
    styleDocument: function(a) {
      Z.flushCustomStyles();
      Z.styleDocument(a);
    },
    flushCustomStyles: function() {
      Z.flushCustomStyles();
    },
    getComputedStyleValue: function(a, b) {
      return Z.getComputedStyleValue(a, b);
    },
    nativeCss: v,
    nativeShadow: t
  };
  xb && (window.ShadyCSS.ApplyShim = xb);
  yb && (window.ShadyCSS.CustomStyleInterface = yb);
}.call(commonjsGlobal));

(function() {
  /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var k = {};
  function n() {
    this.end = this.start = 0;
    this.rules = this.parent = this.previous = null;
    this.cssText = this.parsedCssText = "";
    this.atRule = !1;
    this.type = 0;
    this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function p(a) {
    a = a.replace(r, "").replace(aa, "");
    var c = t,
      b = a,
      d = new n();
    d.start = 0;
    d.end = b.length;
    for (var e = d, f = 0, h = b.length; f < h; f++)
      if ("{" === b[f]) {
        e.rules || (e.rules = []);
        var g = e,
          m = g.rules[g.rules.length - 1] || null;
        e = new n();
        e.start = f + 1;
        e.parent = g;
        e.previous = m;
        g.rules.push(e);
      } else "}" === b[f] && ((e.end = f + 1), (e = e.parent || d));
    return c(d, a);
  }
  function t(a, c) {
    var b = c.substring(a.start, a.end - 1);
    a.parsedCssText = a.cssText = b.trim();
    a.parent &&
      ((b = c.substring(
        a.previous ? a.previous.end : a.parent.start,
        a.start - 1
      )),
      (b = ba(b)),
      (b = b.replace(u, " ")),
      (b = b.substring(b.lastIndexOf(";") + 1)),
      (b = a.parsedSelector = a.selector = b.trim()),
      (a.atRule = 0 === b.indexOf("@")),
      a.atRule
        ? 0 === b.indexOf("@media")
          ? (a.type = v)
          : b.match(ca) &&
            ((a.type = x), (a.keyframesName = a.selector.split(u).pop()))
        : (a.type = 0 === b.indexOf("--") ? y : z));
    if ((b = a.rules))
      for (var d = 0, e = b.length, f; d < e && (f = b[d]); d++) t(f, c);
    return a;
  }
  function ba(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(a, b) {
      a = b;
      for (b = 6 - a.length; b--; ) a = "0" + a;
      return "\\" + a;
    });
  }
  function A(a, c, b) {
    b = void 0 === b ? "" : b;
    var d = "";
    if (a.cssText || a.rules) {
      var e = a.rules,
        f;
      if ((f = e))
        (f = e[0]), (f = !(f && f.selector && 0 === f.selector.indexOf("--")));
      if (f) {
        f = 0;
        for (var h = e.length, g; f < h && (g = e[f]); f++) d = A(g, c, d);
      } else
        c
          ? (c = a.cssText)
          : ((c = a.cssText),
            (c = c.replace(da, "").replace(ea, "")),
            (c = c.replace(fa, "").replace(ha, ""))),
          (d = c.trim()) && (d = "  " + d + "\n");
    }
    d &&
      (a.selector && (b += a.selector + " {\n"),
      (b += d),
      a.selector && (b += "}\n\n"));
    return b;
  }
  var z = 1,
    x = 7,
    v = 4,
    y = 1e3,
    r = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    aa = /@import[^;]*;/gim,
    da = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    ea = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    fa = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    ha = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    ca = /^@[^\s]*keyframes/,
    u = /\s+/g;
  var ia = Promise.resolve();
  function ja(a) {
    if ((a = k[a]))
      (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
        (a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0),
        (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1);
  }
  function B(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }
  function ka(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;
    a.b ||
      ((a.b = !0),
      ia.then(function() {
        a._applyShimCurrentVersion = a._applyShimNextVersion;
        a.b = !1;
      }));
  }
  var C = !(window.ShadyDOM && window.ShadyDOM.inUse),
    D;
  function F(a) {
    D =
      a && a.shimcssproperties
        ? !1
        : C ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports("box-shadow", "0 0 0 var(--foo)")
          );
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (D = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (F(window.ShadyCSS), (window.ShadyCSS = void 0))
      : F(window.WebComponents && window.WebComponents.flags);
  var G = D;
  var H = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    I = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    la = /@media\s(.*)/;
  var J = new Set();
  function K(a) {
    if (!a) return "";
    "string" === typeof a && (a = p(a));
    return A(a, G);
  }
  function L(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = p(a.textContent));
    return a.__cssRules || null;
  }
  function M(a, c, b, d) {
    if (a) {
      var e = !1,
        f = a.type;
      if (d && f === v) {
        var h = a.selector.match(la);
        h && (window.matchMedia(h[1]).matches || (e = !0));
      }
      f === z ? c(a) : b && f === x ? b(a) : f === y && (e = !0);
      if ((a = a.rules) && !e) {
        e = 0;
        f = a.length;
        for (var g; e < f && (g = a[e]); e++) M(g, c, b, d);
      }
    }
  }
  function N(a, c) {
    var b = a.indexOf("var(");
    if (-1 === b) return c(a, "", "", "");
    a: {
      var d = 0;
      var e = b + 3;
      for (var f = a.length; e < f; e++)
        if ("(" === a[e]) d++;
        else if (")" === a[e] && 0 === --d) break a;
      e = -1;
    }
    d = a.substring(b + 4, e);
    b = a.substring(0, b);
    a = N(a.substring(e + 1), c);
    e = d.indexOf(",");
    return -1 === e
      ? c(b, d.trim(), "", a)
      : c(b, d.substring(0, e).trim(), d.substring(e + 1).trim(), a);
  }
  var ma = /;\s*/m,
    na = /^\s*(initial)|(inherit)\s*$/,
    O = /\s*!important/;
  function P() {
    this.a = {};
  }
  P.prototype.set = function(a, c) {
    a = a.trim();
    this.a[a] = { h: c, i: {} };
  };
  P.prototype.get = function(a) {
    a = a.trim();
    return this.a[a] || null;
  };
  var Q = null;
  function R() {
    this.b = this.c = null;
    this.a = new P();
  }
  R.prototype.o = function(a) {
    a = I.test(a) || H.test(a);
    I.lastIndex = 0;
    H.lastIndex = 0;
    return a;
  };
  R.prototype.m = function(a, c) {
    if (void 0 === a.a) {
      var b = [];
      for (
        var d = a.content.querySelectorAll("style"), e = 0;
        e < d.length;
        e++
      ) {
        var f = d[e];
        if (f.hasAttribute("shady-unscoped")) {
          if (!C) {
            var h = f.textContent;
            J.has(h) ||
              (J.add(h), (h = f.cloneNode(!0)), document.head.appendChild(h));
            f.parentNode.removeChild(f);
          }
        } else b.push(f.textContent), f.parentNode.removeChild(f);
      }
      (b = b.join("").trim())
        ? ((d = document.createElement("style")),
          (d.textContent = b),
          a.content.insertBefore(d, a.content.firstChild),
          (b = d))
        : (b = null);
      a.a = b;
    }
    return (a = a.a) ? this.j(a, c) : null;
  };
  R.prototype.j = function(a, c) {
    c = void 0 === c ? "" : c;
    var b = L(a);
    this.l(b, c);
    a.textContent = K(b);
    return b;
  };
  R.prototype.f = function(a) {
    var c = this,
      b = L(a);
    M(b, function(a) {
      ":root" === a.selector && (a.selector = "html");
      c.g(a);
    });
    a.textContent = K(b);
    return b;
  };
  R.prototype.l = function(a, c) {
    var b = this;
    this.c = c;
    M(a, function(a) {
      b.g(a);
    });
    this.c = null;
  };
  R.prototype.g = function(a) {
    a.cssText = oa(this, a.parsedCssText);
    ":root" === a.selector && (a.selector = ":host > *");
  };
  function oa(a, c) {
    c = c.replace(H, function(b, c, e, f) {
      return pa(a, b, c, e, f);
    });
    return S(a, c);
  }
  function S(a, c) {
    for (var b; (b = I.exec(c)); ) {
      var d = b[0],
        e = b[1];
      b = b.index;
      var f = c.slice(0, b + d.indexOf("@apply"));
      c = c.slice(b + d.length);
      var h = T(a, f);
      d = void 0;
      var g = a;
      e = e.replace(ma, "");
      var m = [];
      var l = g.a.get(e);
      l || (g.a.set(e, {}), (l = g.a.get(e)));
      if (l) {
        g.c && (l.i[g.c] = !0);
        var q = l.h;
        for (d in q)
          (g = h && h[d]),
            (l = [d, ": var(", e, "_-_", d]),
            g && l.push(",", g.replace(O, "")),
            l.push(")"),
            O.test(q[d]) && l.push(" !important"),
            m.push(l.join(""));
      }
      d = m.join("; ");
      c = "" + f + d + c;
      I.lastIndex = b + d.length;
    }
    return c;
  }
  function T(a, c) {
    c = c.split(";");
    for (var b, d, e = {}, f = 0, h; f < c.length; f++)
      if ((b = c[f]))
        if (((h = b.split(":")), 1 < h.length)) {
          b = h[0].trim();
          var g = a;
          d = b;
          h = h.slice(1).join(":");
          var m = na.exec(h);
          m &&
            (m[1]
              ? (g.b ||
                  ((g.b = document.createElement("meta")),
                  g.b.setAttribute("apply-shim-measure", ""),
                  (g.b.style.all = "initial"),
                  document.head.appendChild(g.b)),
                (d = window.getComputedStyle(g.b).getPropertyValue(d)))
              : (d = "apply-shim-inherit"),
            (h = d));
          d = h;
          e[b] = d;
        }
    return e;
  }
  function qa(a, c) {
    if (Q) for (var b in c.i) b !== a.c && Q(b);
  }
  function pa(a, c, b, d, e) {
    d &&
      N(d, function(c, b) {
        b && a.a.get(b) && (e = "@apply " + b + ";");
      });
    if (!e) return c;
    var f = S(a, "" + e),
      h = c.slice(0, c.indexOf("--")),
      g = (f = T(a, f)),
      m = a.a.get(b),
      l = m && m.h;
    l ? (g = Object.assign(Object.create(l), f)) : a.a.set(b, g);
    var q = [],
      w,
      X = !1;
    for (w in g) {
      var E = f[w];
      void 0 === E && (E = "initial");
      !l || w in l || (X = !0);
      q.push("" + b + "_-_" + w + ": " + E);
    }
    X && qa(a, m);
    m && (m.h = g);
    d && (h = c + ";" + h);
    return "" + h + q.join("; ") + ";";
  }
  R.prototype.detectMixin = R.prototype.o;
  R.prototype.transformStyle = R.prototype.j;
  R.prototype.transformCustomStyle = R.prototype.f;
  R.prototype.transformRules = R.prototype.l;
  R.prototype.transformRule = R.prototype.g;
  R.prototype.transformTemplate = R.prototype.m;
  R.prototype._separator = "_-_";
  Object.defineProperty(R.prototype, "invalidCallback", {
    get: function() {
      return Q;
    },
    set: function(a) {
      Q = a;
    }
  });
  var U = new R();
  function V() {
    this.a = null;
    U.invalidCallback = ja;
  }
  function W(a) {
    a.a ||
      ((a.a = window.ShadyCSS.CustomStyleInterface),
      a.a &&
        ((a.a.transformCallback = function(a) {
          U.f(a);
        }),
        (a.a.validateCallback = function() {
          requestAnimationFrame(function() {
            a.a.enqueued && a.flushCustomStyles();
          });
        })));
  }
  V.prototype.prepareTemplate = function(a, c) {
    W(this);
    k[c] = a;
    c = U.m(a, c);
    a._styleAst = c;
  };
  V.prototype.flushCustomStyles = function() {
    W(this);
    if (this.a) {
      var a = this.a.processStyles();
      if (this.a.enqueued) {
        for (var c = 0; c < a.length; c++) {
          var b = this.a.getStyleForCustomStyle(a[c]);
          b && U.f(b);
        }
        this.a.enqueued = !1;
      }
    }
  };
  V.prototype.styleSubtree = function(a, c) {
    W(this);
    if (c)
      for (var b in c)
        null === b ? a.style.removeProperty(b) : a.style.setProperty(b, c[b]);
    if (a.shadowRoot)
      for (
        this.styleElement(a),
          a = a.shadowRoot.children || a.shadowRoot.childNodes,
          c = 0;
        c < a.length;
        c++
      )
        this.styleSubtree(a[c]);
    else
      for (a = a.children || a.childNodes, c = 0; c < a.length; c++)
        this.styleSubtree(a[c]);
  };
  V.prototype.styleElement = function(a) {
    W(this);
    var c = a.localName,
      b;
    c
      ? -1 < c.indexOf("-")
        ? (b = c)
        : (b = (a.getAttribute && a.getAttribute("is")) || "")
      : (b = a.is);
    if ((c = k[b]) && !B(c)) {
      if (B(c) || c._applyShimValidatingVersion !== c._applyShimNextVersion)
        this.prepareTemplate(c, b), ka(c);
      if ((a = a.shadowRoot))
        if ((a = a.querySelector("style")))
          (a.__cssRules = c._styleAst), (a.textContent = K(c._styleAst));
    }
  };
  V.prototype.styleDocument = function(a) {
    W(this);
    this.styleSubtree(document.body, a);
  };
  if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
    var Y = new V(),
      Z = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
    window.ShadyCSS = {
      prepareTemplate: function(a, c) {
        Y.flushCustomStyles();
        Y.prepareTemplate(a, c);
      },
      styleSubtree: function(a, c) {
        Y.flushCustomStyles();
        Y.styleSubtree(a, c);
      },
      styleElement: function(a) {
        Y.flushCustomStyles();
        Y.styleElement(a);
      },
      styleDocument: function(a) {
        Y.flushCustomStyles();
        Y.styleDocument(a);
      },
      getComputedStyleValue: function(a, c) {
        return (a = window.getComputedStyle(a).getPropertyValue(c))
          ? a.trim()
          : "";
      },
      flushCustomStyles: function() {
        Y.flushCustomStyles();
      },
      nativeCss: G,
      nativeShadow: C
    };
    Z && (window.ShadyCSS.CustomStyleInterface = Z);
  }
  window.ShadyCSS.ApplyShim = U;
}.call(undefined));

(function() {
  /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var c = !(window.ShadyDOM && window.ShadyDOM.inUse),
    f;
  function g(a) {
    f =
      a && a.shimcssproperties
        ? !1
        : c ||
          !(
            navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
            !window.CSS ||
            !CSS.supports ||
            !CSS.supports("box-shadow", "0 0 0 var(--foo)")
          );
  }
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
    ? (f = window.ShadyCSS.nativeCss)
    : window.ShadyCSS
      ? (g(window.ShadyCSS), (window.ShadyCSS = void 0))
      : g(window.WebComponents && window.WebComponents.flags);
  var h = f;
  function k(a, b) {
    for (var d in b)
      null === d ? a.style.removeProperty(d) : a.style.setProperty(d, b[d]);
  }
  var l = null,
    m = (window.HTMLImports && window.HTMLImports.whenReady) || null,
    n;
  function p(a) {
    requestAnimationFrame(function() {
      m
        ? m(a)
        : (l ||
            ((l = new Promise(function(a) {
              n = a;
            })),
            "complete" === document.readyState
              ? n()
              : document.addEventListener("readystatechange", function() {
                  "complete" === document.readyState && n();
                })),
          l.then(function() {
            a && a();
          }));
    });
  }
  var q = null,
    r = null;
  function t() {
    this.customStyles = [];
    this.enqueued = !1;
    p(function() {
      window.ShadyCSS.flushCustomStyles();
    });
  }
  function u(a) {
    !a.enqueued && r && ((a.enqueued = !0), p(r));
  }
  t.prototype.c = function(a) {
    a.__seenByShadyCSS ||
      ((a.__seenByShadyCSS = !0), this.customStyles.push(a), u(this));
  };
  t.prototype.b = function(a) {
    if (a.__shadyCSSCachedStyle) return a.__shadyCSSCachedStyle;
    var b;
    a.getStyle ? (b = a.getStyle()) : (b = a);
    return b;
  };
  t.prototype.a = function() {
    for (var a = this.customStyles, b = 0; b < a.length; b++) {
      var d = a[b];
      if (!d.__shadyCSSCachedStyle) {
        var e = this.b(d);
        e &&
          ((e = e.__appliedElement || e),
          q && q(e),
          (d.__shadyCSSCachedStyle = e));
      }
    }
    return a;
  };
  t.prototype.addCustomStyle = t.prototype.c;
  t.prototype.getStyleForCustomStyle = t.prototype.b;
  t.prototype.processStyles = t.prototype.a;
  Object.defineProperties(t.prototype, {
    transformCallback: {
      get: function() {
        return q;
      },
      set: function(a) {
        q = a;
      }
    },
    validateCallback: {
      get: function() {
        return r;
      },
      set: function(a) {
        var b = !1;
        r || (b = !0);
        r = a;
        b && u(this);
      }
    }
  });
  var v = new t();
  window.ShadyCSS ||
    (window.ShadyCSS = {
      prepareTemplate: function() {},
      styleSubtree: function(a, b) {
        v.a();
        k(a, b);
      },
      styleElement: function() {
        v.a();
      },
      styleDocument: function(a) {
        v.a();
        k(document.body, a);
      },
      getComputedStyleValue: function(a, b) {
        return (a = window.getComputedStyle(a).getPropertyValue(b))
          ? a.trim()
          : "";
      },
      flushCustomStyles: function() {},
      nativeCss: h,
      nativeShadow: c
    });
  window.ShadyCSS.CustomStyleInterface = v;
}.call(undefined));

(function() {
  const templateId = "cp-theme";

  if (document.getElementById(templateId)) {
    return;
  }

  const cpthemeTemplate = document.createElement("div");

  cpthemeTemplate.setAttribute("style", "display: none;");
  cpthemeTemplate.setAttribute("id", templateId);
  cpthemeTemplate.innerHTML = `<style id="${templateId}-style">:root {
  --pfe-theme--color--text: #333;
  --pfe-theme--color--text--on-dark: #fff;
  --pfe-theme--color--text--on-saturated: #fff;
  --pfe-theme--color--ui-link: #06c;
  --pfe-theme--color--ui-link--visited: #7551a6;
  --pfe-theme--color--ui-link--hover: #004080;
  --pfe-theme--color--ui-link--focus: #004080;
  --pfe-theme--color--ui-link--on-dark: #73bcf7;
  --pfe-theme--color--ui-link--on-dark--visited: #967abd;
  --pfe-theme--color--ui-link--on-dark--hover: #2b9af3;
  --pfe-theme--color--ui-link--on-dark--focus: #2b9af3;
  --pfe-theme--color--ui-link--on-saturated: #73bcf7;
  --pfe-theme--color--ui-link--on-saturated--visited: #967abd;
  --pfe-theme--color--ui-link--on-saturated--hover: #2b9af3;
  --pfe-theme--color--ui-link--on-saturated--focus: #2b9af3;
  --pfe-theme--color--ui-base: #0076e0;
  --pfe-theme--color--ui-base--hover: #004080;
  --pfe-theme--color--ui-base--text: #fff;
  --pfe-theme--color--ui-base--text--hover: #fff;
  --pfe-theme--color--ui-complement: #464646;
  --pfe-theme--color--ui-complement--hover: #1e1e1e;
  --pfe-theme--color--ui-complement--text: #fff;
  --pfe-theme--color--ui-complement--text--hover: #fff;
  --pfe-theme--color--ui-accent: #c00;
  --pfe-theme--color--ui-accent--hover: #820000;
  --pfe-theme--color--ui-accent--text: #fff;
  --pfe-theme--color--ui-accent--text--hover: #fff;
  --pfe-theme--color--ui-disabled: #d2d2d2;
  --pfe-theme--color--ui-disabled--hover: #d2d2d2;
  --pfe-theme--color--ui-disabled--text: #aaa;
  --pfe-theme--color--ui-disabled--text--hover: #aaa;
  --pfe-theme--color--surface--lightest: #fff;
  --pfe-theme--color--surface--lightest--text: #333;
  --pfe-theme--color--surface--lightest--link: #06c;
  --pfe-theme--color--surface--lightest--link--visited: #7551a6;
  --pfe-theme--color--surface--lightest--link--hover: #004080;
  --pfe-theme--color--surface--lightest--link--focus: #004080;
  --pfe-theme--color--surface--lighter: #f0f0f0;
  --pfe-theme--color--surface--lighter--text: #333;
  --pfe-theme--color--surface--lighter--link: #06c;
  --pfe-theme--color--surface--lighter--link--visited: #7551a6;
  --pfe-theme--color--surface--lighter--link--hover: #004080;
  --pfe-theme--color--surface--lighter--link--focus: #004080;
  --pfe-theme--color--surface--base: #d2d2d2;
  --pfe-theme--color--surface--base--text: #333;
  --pfe-theme--color--surface--base--link: #06c;
  --pfe-theme--color--surface--base--link--visited: #7551a6;
  --pfe-theme--color--surface--base--link--hover: #004080;
  --pfe-theme--color--surface--base--link--focus: #004080;
  --pfe-theme--color--surface--darker: #464646;
  --pfe-theme--color--surface--darker--text: #fff;
  --pfe-theme--color--surface--darker--link: #73bcf7;
  --pfe-theme--color--surface--darker--link--visited: #967abd;
  --pfe-theme--color--surface--darker--link--hover: #2b9af3;
  --pfe-theme--color--surface--darker--link--focus: #2b9af3;
  --pfe-theme--color--surface--darkest: #1e1e1e;
  --pfe-theme--color--surface--darkest--text: #fff;
  --pfe-theme--color--surface--darkest--link: #73bcf7;
  --pfe-theme--color--surface--darkest--link--visited: #967abd;
  --pfe-theme--color--surface--darkest--link--hover: #2b9af3;
  --pfe-theme--color--surface--darkest--link--focus: #2b9af3;
  --pfe-theme--color--surface--complement: #264a60;
  --pfe-theme--color--surface--complement--text: #fff;
  --pfe-theme--color--surface--complement--link: #fff;
  --pfe-theme--color--surface--complement--link--visited: #fff;
  --pfe-theme--color--surface--complement--link--hover: #e6e6e6;
  --pfe-theme--color--surface--complement--link--focus: #e6e6e6;
  --pfe-theme--color--surface--accent: #c00;
  --pfe-theme--color--surface--accent--text: #fff;
  --pfe-theme--color--surface--accent--link: #fff;
  --pfe-theme--color--surface--accent--link--visited: #fff;
  --pfe-theme--color--surface--accent--link--hover: #e6e6e6;
  --pfe-theme--color--surface--accent--link--focus: #e6e6e6;
  --pfe-theme--color--surface--border: #ccc;
  --pfe-theme--color--surface--border--lightest: #e7e7e7;
  --pfe-theme--color--surface--border--darkest: #333;
  --pfe-theme--color--feedback--critical: #f44336;
  --pfe-theme--color--feedback--critical--lightest: #ffebee;
  --pfe-theme--color--feedback--critical--darkest: #b71c1c;
  --pfe-theme--color--feedback--important: #ff5722;
  --pfe-theme--color--feedback--important--lightest: #fbe9e7;
  --pfe-theme--color--feedback--important--darkest: #bf360c;
  --pfe-theme--color--feedback--moderate: #ff8f00;
  --pfe-theme--color--feedback--moderate--lightest: #fff8e1;
  --pfe-theme--color--feedback--moderate--darkest: #bd5200;
  --pfe-theme--color--feedback--success: #2e7d32;
  --pfe-theme--color--feedback--success--lightest: #e8f5e9;
  --pfe-theme--color--feedback--success--darkest: #1b5e20;
  --pfe-theme--color--feedback--info: #0277bd;
  --pfe-theme--color--feedback--info--lightest: #e1f5fe;
  --pfe-theme--color--feedback--info--darkest: #01579b;
  --pfe-theme--color--feedback--default: #606060;
  --pfe-theme--color--feedback--default--lightest: #dfdfdf;
  --pfe-theme--color--feedback--default--darkest: #464646;
  --pfe-theme--container-spacer: 1rem;
  --pfe-theme--container-padding: 1rem;
  --pfe-theme--content-spacer: 1rem;
  --pfe-theme--font-size: 16px;
  --pfe-theme--line-height: 1.5;
  --pfe-theme--font-family: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --pfe-theme--font-family--heading: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --pfe-theme--font-family--code: "Overpass Mono", Consolas, Monaco,  Andale Mono , monospace;
  --pfe-theme--font-size--heading--alpha: 2rem;
  --pfe-theme--font-size--heading--beta: 1.75rem;
  --pfe-theme--font-size--heading--gamma: 1.5rem;
  --pfe-theme--font-size--heading--delta: 1.25rem;
  --pfe-theme--font-size--heading--epsilon: 1.125rem;
  --pfe-theme--font-size--heading--zeta: 1rem;
  --pfe-theme--link--text-decoration: underline;
  --pfe-theme--link--text-decoration--hover: underline;
  --pfe-theme--surface--border-width: 1px;
  --pfe-theme--surface--border-style: solid;
  --pfe-theme--surface--border-radius: 0;
  --pfe-theme--ui--border-width: 1px;
  --pfe-theme--ui--border-style: solid;
  --pfe-theme--ui--border-radius: 2px;
  --pfe-theme--box-shadow--sm: 0  0.0625rem  0.125rem 0 rgba(#1e1e1e, .2);
  --pfe-theme--box-shadow--md: 0  0.125rem  0.0625rem 0.0625rem rgba(#1e1e1e, .12), 0  0.25rem  0.6875rem 0.375rem rgba(#1e1e1e, .05);
  --pfe-theme--box-shadow--lg: 0  0.1875rem  0.4375rem 0.1875rem rgba(#1e1e1e, .13), 0  0.6875rem  1.5rem 1rem rgba(#1e1e1e, .12);
  --pfe-theme--box-shadow--inset: inset 0 0 0.625rem 0 rgba(#1e1e1e, .25);
  --pfe-theme--animation-timing: cubic-bezier(0.465, 0.183, 0.153, 0.946); }

*, *::before, *::after {
  box-sizing: border-box; }

body {
  font-family: var(--pfe-theme--font-family);
  font-size: var(--pfe-theme--font-size);
  line-height: var(--pfe-theme--line-height); }

a {
  color: var(--pfe-broadcasted--color--ui-link, #06c); }

a:visited {
  color: var(--pfe-broadcasted--color--ui-link--visited, var(--pfe-broadcasted--color--ui-link, #7551a6)); }

a:hover {
  color: var(--pfe-broadcasted--color--ui-link--hover, var(--pfe-broadcasted--color--ui-link, #004080)); }

a:focus {
  color: var(--pfe-broadcasted--color--ui-link--focus, var(--pfe-broadcasted--color--ui-link, #004080)); }

p {
  margin: 1em 0; }</style>`;

  document.head.appendChild(cpthemeTemplate);

  if (window.ShadyCSS) {
    window.ShadyCSS.CustomStyleInterface.addCustomStyle(
      document.querySelector(`#${templateId}-style`)
    );
  }
})();
//# sourceMappingURL=cp-theme.js.map
