import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSwitch } from '@patternfly/pfe-switch';

const element = html`
  <pfe-switch></pfe-switch>
`;

describe('<pfe-switch>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeSwitch>(element);
    const klass = customElements.get('pfe-switch');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeSwitch);
  });
});
