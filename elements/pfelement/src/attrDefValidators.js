export function isAllowedType(definition) {
  return [String, Number, Boolean].includes(definition.type);
}

export function isValidDefaultType(definition) {
  return (
    definition.hasOwnProperty("default") &&
    definition.default.constructor !== definition.type
  );
}
