import { html, expect, oneEvent } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfAvatar } from '@patternfly/elements/pf-avatar/pf-avatar.js';

const element = html`
  <pf-avatar name="foobar"></pf-avatar>
`;

describe('<pf-avatar>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(element);
    expect(el, 'pf-badge should be an instance of PfAvatar')
      .to.be.an.instanceOf(customElements.get('pf-avatar'))
      .and
      .to.be.an.instanceOf(PfAvatar);
  });

  it('should load a user-provided avatar image', async function() {
    const el = await createFixture<PfeAvatar>(element);
    const img = el.shadowRoot!.querySelector('img')!;
    el.src = 'elements/pf-avatar/test/mwcz.jpg';

    await oneEvent(img, 'load');
    expect(img.complete).to.be.true;
    expect(img.naturalWidth).to.be.above(0, 'image has a natural resolution');
  });
});
