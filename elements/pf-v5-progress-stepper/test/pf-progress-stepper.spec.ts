import { html, expect } from '@open-wc/testing';

import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfV5ProgressStepper } from '@patternfly/elements/pf-v5-progress-stepper/pf-v5-progress-stepper.js';
import { PfV5ProgressStep } from '../pf-v5-progress-step.js';

describe('<pf-v5-progress-stepper>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-progress-stepper')).to.be.an.instanceof(PfV5ProgressStepper);
    expect(document.createElement('pf-v5-progress-step')).to.be.an.instanceof(PfV5ProgressStep);
  });

  it('it should upgrade', async function() {
    const el = await createFixture<PfV5ProgressStepper>(html`<pf-v5-progress-stepper></pf-v5-progress-stepper>`);
    expect(el)
        .to.be.an.instanceOf(customElements.get('pf-v5-progress-stepper'))
        .and
        .to.be.an.instanceOf(PfV5ProgressStepper);
  });
});
