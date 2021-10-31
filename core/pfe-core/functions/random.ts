/**
 * A quick way to fetch a random ID value.
 * _Note:_ All values are prefixed automatically to ensure an ID-safe value is returned.
 * @param  prefix id-safe string prefix
 */
export function getRandomId(prefix = 'pfe') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
