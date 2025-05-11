/**
 * Renders a string of HTML,
 * first importing the provided component defintions into nodejs' global scope.
 * @param html string to render
 * @param importSpecifiers list of web component definition module import specifiers
 */
export async function renderGlobal(
  html: string,
  importSpecifiers: string[],
): Promise<string> {
  // hack to avoid circular typescript project reference
  const spec = '@patternfly/pfe-core/ssr-shims.js';
  await import(spec);
  const { ssr } = await import('./ssr.js');
  await Promise.all(importSpecifiers.map(x => import(x)));
  return ssr(html);
}
