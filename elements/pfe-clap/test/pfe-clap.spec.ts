import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeClap } from '@patternfly/pfe-clap';

const element = html`
  <pfe-clap></pfe-clap>
`;

describe('<pfe-clap>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeClap>(element);
    const klass = customElements.get('pfe-clap');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeClap);
  });

  // it('should default to not clapping', async function() {
  //   const el = await createFixture<PfeClap>(element);
  //   const isClapping = el.isCapping;
  //   const value = el.shadowRoot?.textContent?.trim();
  //   await el.updateComplete;
  //   expect(isClapping).to.be.false;
  //   expect(value).to.equal('🤲')
  // })

  // it('should clap when I click it', async function() {
  //   const el = await createFixture<PfeClap>(element);
  //   el.shadowRoot?.querySelector('.base').click();
  //   await el.updateComplete;
  //   const isClapping = el.isCapping;
  //   const value = el.shadowRoot?.textContent?.trim();
  //   await el.updateComplete;
  //   expect(isClapping).to.be.true;
  //   expect(value).to.equal('👏')
  // })
});
