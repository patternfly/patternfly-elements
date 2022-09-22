import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSpinner } from '@patternfly/pfe-spinner';

describe('<pfe-spinner>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeSpinner>(html`<pfe-spinner>Loading...</pfe-spinner>`);
    expect(element, 'pfe-spinner should be an instance of PfeSpinner')
      .to.be.an.instanceOf(customElements.get('pfe-spinner'))
      .and
      .to.be.an.instanceOf(PfeSpinner);
  });

  it('should properly initialize the component', async () => {
    const element = await createFixture<PfeSpinner>(html`
      <pfe-spinner>Loading...</pfe-spinner>
    `);

    expect(element.getAttribute('size')).to.equal('xl');
  });

  it('should allow sizes of sm, md, lg, xl', async () => {
    let diameterValue;
    const element = await createFixture<PfeSpinner>(html`
      <pfe-spinner>Loading...</pfe-spinner>
    `);

    element.setAttribute('size', 'sm');
    diameterValue = getComputedStyle(element).getPropertyValue('--pf-c-spinner--diameter').trim();
    expect(diameterValue).to.equal('0.625rem');

    element.setAttribute('size', 'md');
    diameterValue = getComputedStyle(element).getPropertyValue('--pf-c-spinner--diameter').trim();
    expect(diameterValue).to.equal('1.125rem');

    element.setAttribute('size', 'lg');
    diameterValue = getComputedStyle(element).getPropertyValue('--pf-c-spinner--diameter').trim();
    expect(diameterValue).to.equal('1.5rem');

    element.setAttribute('size', 'xl');
    diameterValue = getComputedStyle(element).getPropertyValue('--pf-c-spinner--diameter').trim();
    expect(diameterValue).to.equal('3.375rem');
  });

  it('should allow a custom diameter', async () => {
    const customDiameterValue = '80px';
    const element = await createFixture<PfeSpinner>(html`
      <pfe-spinner diameter="${customDiameterValue}">Loading...</pfe-spinner>
    `);

    const diameterValue = getComputedStyle(element).getPropertyValue('--pf-c-spinner--diameter');
    expect(diameterValue).to.equal(customDiameterValue);
  });
});
