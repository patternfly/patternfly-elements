import { expect, html, fixture } from '@open-wc/testing';
import { PfV5Progress } from '@patternfly/elements/pf-v5-progress/pf-v5-progress.js';

describe('<pf-v5-progress>', function() {
  let element: PfV5Progress;

  beforeEach(async function() {
    element = await fixture<PfV5Progress>(html`
      <pf-v5-progress value="33"
                  title="Progress title"
                  label="Progress label">
      </pf-v5-progress>
    `);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-v5-progress');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfV5Progress);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should set the correct value on the progress bar', async function() {
    const element = await fixture<PfV5Progress>(html`
      <pf-v5-progress value="33">
      </pf-v5-progress>
    `);
    expect(element.value).to.equal(33);
  });

  it('should set the correct title on the progress bar', async function() {
    const element = await fixture<PfV5Progress>(html`
      <pf-v5-progress title="Progress title">
      </pf-v5-progress>
    `);
    expect(element.title).to.equal('Progress title');
  });

  it('should have the correct value with the max value set', async function() {
    const max = Math.floor(Math.random() * 100);
    const value = Math.floor(Math.random() * (max));

    const element = await fixture<PfV5Progress>(html`
      <pf-v5-progress value="${value}" max="${max}">
      </pf-v5-progress>
    `);
    expect(element.value).to.equal(value);
    expect(element.max).to.equal(max);
  });
});
