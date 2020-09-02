export default function isValidAttributeType(definition) {
  return [String, Number, Boolean].includes(definition.type);
}
