import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfTable } from '@patternfly/elements/pf-table/pf-table.js';

const element = html`
  <pf-table></pf-table>
`;

describe('<pf-table>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfTable>(element);
    const klass = customElements.get('pf-table');
    expect(el)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfTable);
  });
});
