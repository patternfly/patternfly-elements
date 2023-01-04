import { html, expect, aTimeout, nextFrame } from '@open-wc/testing';

import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeProgressStepper } from '@patternfly/pfe-progress-stepper';

describe('<pfe-progress-stepper>', function() {
  it('it should upgrade', async function() {
    const el = await createFixture<PfeProgressStepper>(html`<pfe-progress-stepper></pfe-progress-stepper>`);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pfe-progress-stepper'))
      .and
      .to.be.an.instanceOf(PfeProgressStepper);
  });
});
