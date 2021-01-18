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
