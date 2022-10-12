import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeClipboardCopy } from '@patternfly/pfe-clipboard-copy';

const element = html`
  <pfe-clipboard-copy></pfe-clipboard-copy>
`;

describe('<pfe-clipboard-copy>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeClipboardCopy>(element);
    const klass = customElements.get('pfe-clipboard-copy');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeClipboardCopy);
  });
});
