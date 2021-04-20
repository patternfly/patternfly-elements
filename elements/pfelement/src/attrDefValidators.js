/**
 * Verify that a property definition's `type` field contains one of the allowed
 * types.  If the definition type resolves to falsy, assumes String type.
 * @param {constructor} definition
 * @default String
 * @return {Boolean} True if the definition type is one of String, Number, or Boolean
 */
export function isAllowedType(definition) {
  return [String, Number, Boolean].includes(definition.type || String);
}

/**
 * Verify that a property definition's `default` value is of the correct type.
 *
 * A `default` value is valid if it's of the same type as the `type`
 * definition.  Or, if there is no `type` definition, then it must be a String
 * (the default value for `type`).
 * @param {type} definition
 * @return {Boolean} True if the default value matches the type of the definition object.
 */
export function isValidDefaultType(definition) {
  return definition.hasOwnProperty("default") && definition.default.constructor === definition.type;
}
