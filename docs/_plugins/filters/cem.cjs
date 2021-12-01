// @ts-check

const all = (...ps) => x => ps.every(p => p(x));
const not = p => x => !p(x);

const isField = x => x.kind === 'field';
const isMethod = x => x.kind === 'method';
const isStatic = x => x.static;
const isPublic = x => !x.privacy || !x.privacy?.match?.(/private|protected/);

/**
 * @typedef {object} EleventyContext
 * @property {object} page
 */

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').Declaration}
 */
function getDeclaration(tagName, manifest) {
  const [decl] = (manifest.modules ?? [])
    .flatMap(x => x.declarations)
    .filter(x => (/** @type{*}*/(x)).tagName === tagName);
  return decl;
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').Attribute}
 */
function getAttributes(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl?.attributes ?? [];
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').ClassField}
 */
function getProperties(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return (decl?.members ?? [])
    .filter(all(isField, not(isStatic), isPublic, x =>
      !(decl.attributes ?? [])?.some(y =>
        y.fieldName === x.name)));
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').Attribute}
 */
function getCssCustomProperties(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl?.cssProperties ?? [];
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').CssPart}
 */
function getCssParts(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl?.cssParts ?? [];
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {string}
 */
function getDescription(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl?.description ?? '';
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').Event}
 */
function getEvents(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl?.events ?? [];
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').Slot[]}
 */
function getSlots(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return decl.slots ?? [];
}

/**
 * @this {EleventyContext}
 * @param  {string} tagName custom element tagName
 * @param  {import('custom-elements-manifest/schema').Package} manifest
 * @return {import('custom-elements-manifest/schema').ClassMethod[]}
 */
function getMethods(tagName, manifest) {
  const decl = getDeclaration.call(this, tagName, manifest);
  return (decl?.members ?? [])
    .filter(all(isMethod, not(isStatic), isPublic));
}

module.exports = {
  getAttributes,
  getCssCustomProperties,
  getCssParts,
  getDeclaration,
  getDescription,
  getEvents,
  getMethods,
  getProperties,
  getSlots,
};
