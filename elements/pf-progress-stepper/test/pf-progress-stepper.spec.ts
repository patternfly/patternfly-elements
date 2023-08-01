import { html, expect } from '@open-wc/testing';

import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfProgressStepper } from '@patternfly/elements/pf-progress-stepper/pf-progress-stepper.js';
import { PfProgressStep } from '../pf-progress-step.js';

describe('<pf-progress-stepper>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-progress-stepper')).to.be.an.instanceof(PfProgressStepper);
    expect(document.createElement('pf-progress-step')).to.be.an.instanceof(PfProgressStep);
  });

  it('it should upgrade', async function() {
    const el = await createFixture<PfProgressStepper>(html`<pf-progress-stepper></pf-progress-stepper>`);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pf-progress-stepper'))
      .and
      .to.be.an.instanceOf(PfProgressStepper);
  });
});
