import { html, expect } from '@open-wc/testing';

import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfProgressStepper } from '@patternfly/elements/pf-progress-stepper/pf-progress-stepper.js';

describe('<pf-progress-stepper>', function() {
  it('it should upgrade', async function() {
    const el = await createFixture<PfProgressStepper>(html`<pf-progress-stepper></pf-progress-stepper>`);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pf-progress-stepper'))
      .and
      .to.be.an.instanceOf(PfProgressStepper);
  });
});
