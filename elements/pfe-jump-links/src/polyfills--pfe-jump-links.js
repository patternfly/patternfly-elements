// @POLYFILL  NodeList.prototype.forEach
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
// @POLYFILL Number.prototype.isInteger
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#polyfill
if (window.Number && !Number.prototype.isInteger) {
  Number.isInteger =
    Number.isInteger ||
    function(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
}

// @POLYFILL Element.prototype.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// @POLYFILL Object.prototype.keys
if (!Object.keys) {
  Object.keys = function(obj) {
    if (obj !== Object(obj)) throw new TypeError("Object.keys called on a non-object");
    var k = [],
      p;
    for (p in obj) if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
    return k;
  };
  Object.keys.forEach = Array.forEach;
}
