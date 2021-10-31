import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeCodeblock } from '@patternfly/pfe-codeblock';

const TEMPLATES = {

  markupTest: html`<pfe-codeblock code-language="markup" id="markup-test">
<pre codeblock-container>
<code>
&#x3C;h1&#x3E;example html&#x3C;/h1&#x3E;
&#x3C;p&#x3E;some paragraph text&#x3C;/p&#x3E;
</code>
</pre>
</pfe-codeblock>`,

  javascriptTest: html`<pfe-codeblock code-language="javascript" id="javascript-test">
<pre codeblock-container>
<code>
const example="javascript"
let test=null;
</code>
</pre>
</pfe-codeblock>`,

  defaultMarkupTest: html`
<pfe-codeblock id="default-markup-test">
<pre codeblock-container>
<code>
const example="javascript"
let test=null;
</code>
</pre>
</pfe-codeblock>`,

  markupTestLinenumbers: html`
<pfe-codeblock code-line-numbers code-language="markup" id="markup-test-linenumebrs">
<pre codeblock-container>
<code>
&#x3C;h1&#x3E;example html&#x3C;/h1&#x3E;
&#x3C;p&#x3E;some paragraph text&#x3C;/p&#x3E;
</code>
</pre>
</pfe-codeblock>`,

  javascriptTestLinenumebrsOffset: html`
<pfe-codeblock code-line-numbers code-language="javascript" id="javascript-test-linenumebrs-offset" code-line-number-start="-2">
<pre codeblock-container>
<code>
const example="javascript"
let test=null;
</code>
</pre>
</pfe-codeblock>`,
};

describe('<pfe-codeblock>', function() {
  it('should upgrade', async function() {
    expect(await createFixture(TEMPLATES.defaultMarkupTest))
      .to.be.an.instanceOf(customElements.get('pfe-codeblock'))
      .and
      .to.be.an.instanceOf(PfeCodeblock);
  });

  // Write tests for each attribute
  it('should set the code language for the codeblock to markup', async function() {
    const element = await createFixture<PfeCodeblock>(TEMPLATES.markupTest);
    const resultCount = element.shadowRoot!.querySelectorAll('pre.language-markup').length;
    expect(resultCount).to.equal(1);
  });

  it('should set the code language for the codeblock to javascript', async function() {
    const element = await createFixture<PfeCodeblock>(TEMPLATES.javascriptTest);
    const resultCount = element.shadowRoot!.querySelectorAll('pre.language-javascript').length;
    expect(resultCount).to.equal(1);
  });

  it(`should set the code language for the codeblock to default markup with an empty language property`, async function() {
    const element = await createFixture<PfeCodeblock>(TEMPLATES.defaultMarkupTest);
    const resultCount = element.shadowRoot!.querySelectorAll('pre.language-markup').length;
    expect(resultCount).to.equal(1);
  });

  it('should set the line number option', async function() {
    const element = await createFixture<PfeCodeblock>(TEMPLATES.markupTestLinenumbers);
    const resultCount = element.shadowRoot!.querySelectorAll('pre.line-numbers').length;
    expect(resultCount).to.equal(1);
  });

  it('should set the starting line number value', async function() {
    const element = await createFixture<PfeCodeblock>(TEMPLATES.javascriptTestLinenumebrsOffset);
    const styleDataLineCount =
      element.shadowRoot!.querySelector<HTMLElement>('pre.line-numbers')!.style.counterReset;
    expect(styleDataLineCount).to.equal('linenumber -3');
  });
});
