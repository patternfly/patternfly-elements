import { html, expect, oneEvent } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeAvatar } from '@patternfly/elements/pfe-avatar/pfe-avatar.js';

const element = html`
  <pfe-avatar name="foobar"></pfe-avatar>
`;

describe('<pfe-avatar>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(element);
    expect(el, 'pfe-badge should be an instance of PfeAvatar')
      .to.be.an.instanceOf(customElements.get('pfe-avatar'))
      .and
      .to.be.an.instanceOf(PfeAvatar);
  });

  it('should load a user-provided avatar image', async function() {
    const el = await createFixture<PfeAvatar>(element);
    const img = el.shadowRoot!.querySelector('img')!;
    el.src = 'elements/pfe-avatar/test/mwcz.jpg';

    await oneEvent(img, 'load');
    expect(img.complete).to.be.true;
    expect(img.naturalWidth).to.be.above(0, 'image has a natural resolution');
  });
});
