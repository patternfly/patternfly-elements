import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfPopover } from '@patternfly/elements/pf-popover/pf-popover.js';

const element = html`
  <pf-popover></pf-popover>
`;

describe('<pf-popover>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfPopover>(element);
    const klass = customElements.get('pf-popover');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfPopover);
  });
});
