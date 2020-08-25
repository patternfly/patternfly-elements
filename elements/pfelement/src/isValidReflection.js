export default function isValidReflection(definition) {
  return (
    !definition.reflect || [String, Number, Boolean].includes(definition.type)
  );
}
