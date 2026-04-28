import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Table } from '@patternfly/elements/pf-v5-table/pf-v5-table.js';

const element = html`
  <pf-v5-table></pf-v5-table>
`;

describe('<pf-v5-table>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfV5Table>(element);
    const klass = customElements.get('pf-v5-table');
    expect(el)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfV5Table);
  });
});
