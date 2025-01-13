import { render, html } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * composes the `unsafeHTML`, `html`, `render`, and `collectResult` functions from lit ssr
 * @param input html partial
 */
export async function ssr(input: string): Promise<string> {
  return collectResult(render(html`${unsafeHTML(input)}`));
}
