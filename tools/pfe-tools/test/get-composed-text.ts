/**
 * Gets the composed text content of an element via the Selection API
 * WARNING: this is not reliable, should be improved with a treewalker
 * @param node node to get text
 */
export function getComposedText(node: Node) {
  const range = new Range();
  range.selectNodeContents(node);
  return range.toString();
}
