/**
 * Renders a string of HTML,
 * first importing the provided component defintions into nodejs' global scope.
 * @param html string to render
 * @param importSpecifiers list of web component definition module import specifiers
 * @param connectedCallbackOptions which elements receive `connectedCallback`
 *   during SSR. Defaults to all elements.
 * @param connectedCallbackOptions.include return true for elements that should receive `connectedCallback`
 * @param connectedCallbackOptions.exclude return true for elements that should not receive `connectedCallback`
 * @example Call `connectedCallback` only for elements whose tag starts with `my-`
 * ```ts
 * await renderGlobal(html, ['my-package/my-el.js'], {
 *   include: el => el.localName.startsWith('my-'),
 * });
 * ```
 * @example Opt out entirely
 * ```ts
 * await renderGlobal(html, ['my-package/my-el.js'], { exclude: () => true });
 * ```
 */
export async function renderGlobal(
  html: string,
  importSpecifiers: string[],
  connectedCallbackOptions?: {
    include?: (element: { localName: string }) => boolean;
    exclude?: (element: { localName: string }) => boolean;
  },
): Promise<string> {
  // hack to avoid circular typescript project reference
  const spec = '@patternfly/pfe-core/ssr-shims.js';
  const { ssrCallConnectedCallback } = await import(spec);
  ssrCallConnectedCallback(connectedCallbackOptions);
  const { ssr } = await import('./ssr.js');
  await Promise.all(importSpecifiers.map(x => import(x)));
  return ssr(html);
}
