/**
 * Renders a string of HTML,
 * first importing the provided component defintions into nodejs' global scope.
 * @param html string to render
 * @param importSpecifiers list of web component definition module import specifiers
 * @param connectedCallbackFilter optional predicate to limit which elements
 *   receive `connectedCallback` during SSR. Defaults to all elements.
 */
export async function renderGlobal(
  html: string,
  importSpecifiers: string[],
  connectedCallbackFilter?: (element: { localName: string }) => boolean,
): Promise<string> {
  // hack to avoid circular typescript project reference
  const spec = '@patternfly/pfe-core/ssr-shims.js';
  const { ssrCallConnectedCallback } = await import(spec);
  ssrCallConnectedCallback(connectedCallbackFilter);
  const { ssr } = await import('./ssr.js');
  await Promise.all(importSpecifiers.map(x => import(x)));
  return ssr(html);
}
