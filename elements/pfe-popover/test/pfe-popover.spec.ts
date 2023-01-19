import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfePopover } from '@patternfly/pfe-popover';

const element = html`
  <pfe-popover></pfe-popover>
`;

describe('<pfe-popover>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfePopover>(element);
    const klass = customElements.get('pfe-popover');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfePopover);
  });
});
