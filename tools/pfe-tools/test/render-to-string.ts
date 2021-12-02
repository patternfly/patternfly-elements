import type { TemplateResult } from 'lit';
import { render } from 'lit';

export function renderToString(tpl: TemplateResult): string {
  const frag = new DocumentFragment();
  frag.append(document.createElement('div'));
  render(tpl, frag.firstElementChild as HTMLElement);
  return (frag.firstElementChild?.innerHTML ?? '').replace(/<!--[\s\S]*?-->/g, '');
}
