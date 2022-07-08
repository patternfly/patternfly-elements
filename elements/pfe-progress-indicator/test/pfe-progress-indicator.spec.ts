import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeProgressIndicator } from '@patternfly/pfe-progress-indicator';

const TEMPLATE = html`
<pfe-progress-indicator>
  This is the element content.
</pfe-progress-indicator>
`;

describe('<pfe-progress-indicator>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeProgressIndicator>(html`<pfe-progress-indicator></pfe-progress-indicator>`);
    expect(element, 'pfe-progress-indicator should be an instance of PfeProgressIndicator')
      .to.be.an.instanceOf(customElements.get('pfe-progress-indicator'))
      .and
      .to.be.an.instanceOf(PfeProgressIndicator);
  });

  it('should have the proper animation css', async function() {
    const element = await createFixture<PfeProgressIndicator>(html`<pfe-progress-indicator indeterminate></pfe-progress-indicator>`);
    const style = getComputedStyle(element.shadowRoot!.getElementById('container')!, ':after');
    expect(style.getPropertyValue('animation-name')).to.equal('spin');
    expect(style.getPropertyValue('animation-duration')).to.equal('1s');
    expect(style.getPropertyValue('animation-timing-function')).to.equal('linear');
    expect(style.getPropertyValue('animation-play-state')).to.equal('running');
    expect(style.getPropertyValue('animation-iteration-count')).to.equal('infinite');
  });

  it('should properly initialize when the contents of the slot change', async function() {
    const element = await createFixture<PfeProgressIndicator>(TEMPLATE);
    element.innerHTML = `<p>My loading message...</p>`;
    await element.updateComplete;
    expect(element).lightDom.to.equal('<p>My loading message...</p>');
  });

  it('should log a warning if there is no backup loading message', async function() {
    const element = await createFixture<PfeProgressIndicator>(TEMPLATE);
    element.innerHTML = `<p>My loading message...</p>`;
    expect(element).lightDom.to.equal('<p>My loading message...</p>');
  });
});
