import type { TemplateResult } from 'lit';
import { render } from 'lit';

/**
 * Returns a string representing the innerHTML of the container this template is rendered to
 * @param tpl lit-html template
 */
export function renderToString(tpl: TemplateResult): string {
  const frag = new DocumentFragment();
  frag.append(document.createElement('div'));
  render(tpl, frag.firstElementChild as HTMLElement);
  return (frag.firstElementChild?.innerHTML ?? '').replace(/<!--[\s\S]*?-->/g, '');
}
