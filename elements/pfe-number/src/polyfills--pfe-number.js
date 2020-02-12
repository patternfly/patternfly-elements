// @POLYFILL  isNaN, non-mutating polyfill for IE11
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
const isNaN = Number.isNaN || (n => n !== null && (n != n || +n != n));
