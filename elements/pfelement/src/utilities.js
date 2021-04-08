/**
 * This converts property  names such as background-color into BEM format (i.e., BackgroundColor)
 * @param {String} property - CSS property name in hyphen format (padding-top, margin-bottom, etc.).
 * @example
 * // returns PaddingTop
 * toBEM(padding-top);
 * @return {String} property - String where the provided property is converted to PascalCase.
 */
export function toBEM(property) {
  // Capitalize the first letter
  property = `${property.charAt(0).toUpperCase()}${property.slice(1)}`;
  // Replace dash with uppercase letter
  property = property.replace(/\-([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
  return property;
}
