import { expect, aTimeout, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeToast } from '@patternfly/pfe-toast';

const TEMPLATE = html`<pfe-toast id="test">
  This is the element content.
</pfe-toast>`;

describe('<pfe-toast>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(html`<pfe-toast></pfe-toast>`);
    expect(el, 'pfe-toast should be an instance of PfeToast')
      .to.be.an.instanceOf(customElements.get('pfe-toast'))
      .and
      .to.be.an.instanceOf(PfeToast);
  });

  it('should be hidden by default', async function() {
    const pfeToast = await createFixture<PfeToast>(TEMPLATE);

    expect(pfeToast.hasAttribute('hidden')).to.be.true;
  });

  it('should open programmatically', async function() {
    const pfeToast = await createFixture<PfeToast>(TEMPLATE);

    pfeToast.open();

    await aTimeout(600);

    expect(pfeToast.hasAttribute('hidden')).to.be.false;
    expect(pfeToast.classList.contains('open')).to.be.true;
  });

  it('should close programmatically', async function() {
    const pfeToast = await createFixture<PfeToast>(TEMPLATE);

    pfeToast.close();

    await aTimeout(600);

    expect(pfeToast.hasAttribute('hidden')).to.be.true;
    expect(pfeToast.classList.contains('open')).to.be.false;
  });

  it('should auto-dismiss after the provided time', async function() {
    const pfeToast = await createFixture<PfeToast>(html`
      <pfe-toast id="autoDismiss" auto-dismiss="500">
        This is the element content.
      </pfe-toast>`);

    const autoDismissDelay = pfeToast.autoDismiss;

    expect(autoDismissDelay, 'auto-dismiss should have provided value').to.equal('500');

    await pfeToast.updateComplete;

    pfeToast.open();

    await pfeToast.updateComplete;

    expect(pfeToast.hidden, 'hidden after open call').to.be.false;

    await aTimeout(1100);

    expect(pfeToast.classList.contains('open'), 'open').to.be.false;
    expect(pfeToast.hidden, 'hidden').to.be.true;
  });

  it('should have the right attributes when auto-dismiss enabled', async function() {
    // test a11y attributes once finalized (waiting for feedback)
  });

  it('should have the right attributes when auto-dismiss disabled', async function() {
    // test a11y attributes once finalized (waiting for feedback)
  });
});
