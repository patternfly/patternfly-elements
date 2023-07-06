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

  it('should set the correct value on the progress bar', async function() {
    const element = await fixture<PfProgress>(html`
      <pf-progress value="33">
      </pf-progress>
    `);
    expect(element.value).to.equal(33);
  });

  it('should set the correct title on the progress bar', async function() {
    const element = await fixture<PfProgress>(html`
      <pf-progress title="Progress title">
      </pf-progress>
    `);
    expect(element.title).to.equal('Progress title');
  });

  it('should have the correct value with the max value set', async function() {
    const max = Math.floor(Math.random() * 100);
    const value = Math.floor(Math.random() * (max));

    const element = await fixture<PfProgress>(html`
      <pf-progress value="${value}" max="${max}">
      </pf-progress>
    `);
    expect(element.value).to.equal(value);
    expect(element.max).to.equal(max);
  });
});
