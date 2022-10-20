import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeTile } from '@patternfly/pfe-tile';

const element = html`
  <pfe-tile></pfe-tile>
`;

describe('<pfe-tile>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeTile>(element);
    const klass = customElements.get('pfe-tile');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeTile);
  });
});
