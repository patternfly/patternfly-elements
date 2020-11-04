/**
 * Verify that a property definition's `type` field contains one of the allowed
 * types.
 *
 * Allowed types are String, Number, and Boolean.  If `type` is falsy, it
 * defaults to String.
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
 */
export function isValidDefaultType(definition) {
  return definition.hasOwnProperty("default") && definition.default.constructor === definition.type;
}
