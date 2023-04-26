import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfPagination } from '@patternfly/elements/pf-pagination/pf-pagination.js';

const element = html`
  <pf-pagination></pf-pagination>
`;

describe('<pf-pagination>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfPagination> (element);
    const klass = customElements.get('pf-pagination');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfPagination);
  });
});
