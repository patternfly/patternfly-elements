/**
 * Construct a CustomEvent with the given name and detail.
 * The event bubbles and is composed.
 */
export function pfeEvent<T>(name: string, detail?: T): CustomEvent<T> {
  return new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  });
}
