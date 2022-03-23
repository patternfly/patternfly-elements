import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeTooltip } from '@patternfly/pfe-tooltip';

const element = html`
  <pfe-tooltip></pfe-tooltip>
`;

describe('<pfe-tooltip>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeTooltip>(element);
    const klass = customElements.get('pfe-tooltip');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeTooltip);
  });
});
