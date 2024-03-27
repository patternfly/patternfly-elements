/**
 * Whether or not the container contains the node,
 * and if not, whether the node is contained by any element
 * slotted in to the container
 */
export function containsDeep(container: Element, node: Node) {
  if (container.contains(node)) {
    return true;
  } else {
    for (const slot of container.querySelectorAll('slot') ?? []) {
      for (const el of slot.assignedElements()) {
        if (el.contains(node)) {
          return true;
        }
      }
    }
    return false;
  }
}
