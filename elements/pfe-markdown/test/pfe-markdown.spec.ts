import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

// Import the element we're testing.
import { PfeMarkdown } from '@patternfly/pfe-markdown';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const TEMPLATES = {
  'original': html`<pfe-markdown>
    <div pfe-markdown-container># pfe-markdown</div>
  </pfe-markdown>`,
  'dynamic': html`<pfe-markdown>
    <div pfe-markdown-container></div>
  </pfe-markdown>`,
  'added': html`<pfe-markdown>
    <div pfe-markdown-container># pfe-markdown</div>
  </pfe-markdown>`,
  'removed': html`<pfe-markdown>
    <div pfe-markdown-container># pfe-markdown</div>
  </pfe-markdown>`,
};

describe('<pfe-markdown>', function() {
  it('should upgrade pfe-markdown', async function() {
    const pfeAccordion = await createFixture<PfeMarkdown>(html`<pfe-markdown></pfe-markdown>`);
    expect(pfeAccordion, 'pfe-markdown should be an instance of PfeMarkdown')
      .to.be.an.instanceof(customElements.get('pfe-markdown'))
      .and
      .to.be.an.instanceof(PfeMarkdown);
  });

  it(`should take markdown from the pfe-markdown-container and format it in the pfe-markdown-render div`, async function() {
    const element = await createFixture<PfeMarkdown>(TEMPLATES.original);
    expect(element.querySelector('[pfe-markdown-render]')).lightDom.to.equal(`
      <h1 id="pfe-markdown">pfe-markdown</h1>
    `.trim());
  });

  it(`should render as markdown any dynamically added markdown in the pfe-markdown-container div`, async function() {
    const markdownText = '# Dynamic Markdown';
    const element = await createFixture<PfeMarkdown>(TEMPLATES.dynamic);

    element.querySelector('[pfe-markdown-container]')!.innerHTML = markdownText;

    await element.updateComplete;

    expect(element.querySelector('[pfe-markdown-render]')).lightDom.to.equal(`
      <h1 id="dynamic-markdown">Dynamic Markdown</h1>
    `.trim());
  });

  it('should render any additional markdown added to the light dom', async function() {
    const element = await createFixture<PfeMarkdown>(TEMPLATES.added);
    const markdownRender = element.querySelector('[pfe-markdown-render]')!;
    const markdown = markdownRender.innerHTML.trim();
    expect(markdown).to.equal(`
      <h1 id="pfe-markdown">pfe-markdown</h1>
    `.trim());

    element.querySelector('[pfe-markdown-container]')!.innerHTML += `\n## Heading Level 2`;

    await element.updateComplete;
    expect(element.querySelector('[pfe-markdown-render]')).lightDom.to.equal(`
      <h1 id="pfe-markdown">pfe-markdown</h1>
      <h2 id="heading-level-2">Heading Level 2</h2>
    `.trim());
  });

  it(`should clear the markdown render if markdown container innerHTML is removed`, async function() {
    const element = await createFixture<PfeMarkdown>(TEMPLATES.removed);
    element.querySelector('[pfe-markdown-container]')!.innerHTML = '';

    await element.updateComplete;
    expect(element.querySelector('[pfe-markdown-render]')).lightDom.to.equal('');
  });
});
