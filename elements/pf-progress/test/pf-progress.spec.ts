import { expect, html, fixture } from '@open-wc/testing';
import { PfProgress } from '@patternfly/elements/pf-progress/pf-progress.js';

describe('<pf-progress>', function() {
  let element: PfProgress;

  beforeEach(async function() {
    element = await fixture<PfProgress>(html`
      <pf-progress value="33"
                  title="Progress title"
                  label="Progress label">
      </pf-progress>
    `);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-progress');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfProgress);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });
});
