import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { EditorView, minimalSetup } from 'codemirror';
import type { ViewUpdate } from '@codemirror/view';
import { html as htmlPlugin } from '@codemirror/lang-html';
import { property } from 'lit/decorators/property.js';

@customElement('pft-html-editor')
export class PftHtmlEditor extends LitElement {
  #view!: EditorView;

  @property() value = '<p></p>';

  protected override firstUpdated(): void {
    this.#view = new EditorView({
      doc: this.value,
      root: this.shadowRoot!,
      parent: this.shadowRoot!.getElementById('container')!,
      extensions: [
        minimalSetup,
        EditorView.updateListener.of(update => this.#onChange(update)),
        htmlPlugin({
        }),
      ],
    });
    this.#view.setRoot(this.shadowRoot!);
  }

  protected override render(): TemplateResult<1> {
    return html`
      <div id="container"></div>
    `;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('value') && this.#view) {
      const { value } = this;
      const to = this.#view.state.doc.length;
      this.#view.dispatch({ changes: { from: 0, to, insert: value } });
    }
  }

  #onChange(update: ViewUpdate) {
    if (update.docChanged && update.transactions.some(x => x.isUserEvent)) {
      this.value = update.state.doc.toString();
      this.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}
