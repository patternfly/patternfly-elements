export default function isAllowedType(definition) {
  return [String, Number, Boolean].includes(definition.type);
}

export default function isValidDefaultType(definition) {
  return (
    definition.hasOwnProperty("default") &&
    definition.default.constructor !== definition.type
  );
}
