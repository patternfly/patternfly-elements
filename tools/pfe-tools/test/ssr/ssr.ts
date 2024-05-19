import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export async function ssr(input: string) {
  return collectResult(render(html`${unsafeHTML(input)}`));
}


