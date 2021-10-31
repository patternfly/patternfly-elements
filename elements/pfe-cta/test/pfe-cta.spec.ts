import { expect, oneEvent, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { spy } from 'sinon';

// Import the element we're testing.
import { PfeCta } from '@patternfly/pfe-cta';

const testElement = html`
  <pfe-cta>
    <a href="https://redhat.com">redhat.com</a>
  </pfe-cta>
`;

describe('<pfe-cta>', () => {
  it('should upgrade', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);
    expect(pfeCta, 'pfe-cta should be an instance of PfeCta')
      .to.be.an.instanceof(customElements.get('pfe-cta'))
      .and
      .to.be.an.instanceof(PfeCta);
  });

  it('should log a warning if there are no children in the light DOM', async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`<pfe-cta>This is wrong</pfe-cta>`);

    await pfeCta.updateComplete;

    expect(warnSpy)
      .to.have.been.calledOnceWith(
        '[pfe-cta]',
        'The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)'
      );

    warnSpy.restore();
  });

  it('should log a warning if the first child in the light DOM is not an anchor', async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`
      <pfe-cta>
        <p>Something</p>
        <a href="#">A link</a>
      </pfe-cta>
    `);

    await pfeCta.updateComplete;

    expect(warnSpy).to.have.been.calledOnceWith(
      '[pfe-cta]',
      'The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)'
    );

    warnSpy.restore();
  });

  it(`it should log a warning if the first child in the light DOM is a default style button`, async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`
      <pfe-cta>
        <button>A button</button>
      </pfe-cta>
    `);

    await pfeCta.updateComplete;

    expect(warnSpy).to.have.been.calledOnceWith(
      '[pfe-cta]',
      'Button tag is not supported semantically by the default link styles'
    );

    warnSpy.restore();
  });

  it('should properly initialize when the contents of the slot change', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);

    await pfeCta.updateComplete;

    expect(pfeCta.data.href, 'before setting innerHTML').to.equal('https://redhat.com/');

    pfeCta.innerHTML = `<a href="https://access.redhat.com">Customer Portal</a>`;

    await pfeCta.updateComplete;

    await nextFrame();

    expect(pfeCta.data.href, 'after setting innerHTML').to.equal('https://access.redhat.com/');
  });

  it('should register an event when clicked', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);

    await pfeCta.updateComplete;

    // prevent navigation
    pfeCta.cta!.addEventListener('click', e => e.preventDefault(), { once: true });

    setTimeout(() => pfeCta.cta!.click());

    const event = await oneEvent(pfeCta, 'pfe-cta:select');

    expect(event).to.be.ok;
  });

  it('should register an event when enter key is pressed', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);

    await pfeCta.updateComplete;

    // prevent navigation
    pfeCta.cta!.addEventListener('keyup', e => e.preventDefault(), { once: true });

    setTimeout(() => {
      pfeCta.cta!.dispatchEvent(new KeyboardEvent('keyup', {
        key: 'Enter',
      }));
    });

    const event = await oneEvent(pfeCta, 'pfe-cta:select');

    expect(event).to.be.ok;
  });

  it('should register an event when the click function is run', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);

    await pfeCta.updateComplete;

    setTimeout(() => pfeCta.click());

    const event = await oneEvent(pfeCta, 'pfe-cta:select');

    expect(event).to.be.ok;
  });
});
