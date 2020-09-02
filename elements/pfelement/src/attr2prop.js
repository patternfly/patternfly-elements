export default function attr2prop(attr, prefix) {
  return attr
    .replace(new RegExp(`^${prefix}`), "")
    .replace(/-([A-Za-z])/g, l => l[1].toUpperCase());
}
