/**
 * This converts property names such as background-color into BEM format (i.e., BackgroundColor)
 * @param {String} property - CSS property name in hyphen format (padding-top, margin-bottom, etc.).
 * @example
 * // returns PaddingTop
 * toBEM(padding-top);
 * @return {String} property - String where the provided property is converted to PascalCase.
 * @TODO needs to be migrated to a mixin of pfelement
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

/**
 * This converts shorthand CSS variables to explicit variables; for example,
 * if a user sets --pfe-card--Padding, this captures that and converts it to
 * --pfe-card--PaddingTop, --pfe-card--PaddingBottom, --pfe-card--PaddingRight, --pfe-card--PaddingLeft.
 * @param {String} property - CSS property name in hyphen format (padding-top, margin-bottom, etc.).
 * @param {Array} parts - CSS properties to break the shorthand into ([border-width, border-style, border-color]).
 * @example getExplicitProps("padding", ["padding-top", "padding-right", "padding-bottom", "padding-left"]);
 * @TODO needs to be migrated to a mixin of pfelement
 */
export function getExplicitProps(context, property, parts) {
  const variable = context.cssVariable(`--${context.tag}--${toBEM(property)}`);
  if (variable) {
    let cssprops = {};
    cssprops[property] = variable;
    const actual = context.getComputedValue(cssprops, parts);

    if (actual)
      Object.entries(actual).forEach(item => {
        const prop = toBEM(item[0]),
          value = item[1];
        context.cssVariable(`--${context.tag}--${prop}`, value);
      });
  }
}
