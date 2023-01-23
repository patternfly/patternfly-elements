import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfTile } from '@patternfly/elements/pf-tile/pf-tile.js';

const TEMPLATE = html`
  <pf-tile>
    <pf-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pf-icon>
    Default Content
    <div slot="body">Subtext goes here</div>
  </pf-tile>
`;


describe('<pf-tile>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfTile>(TEMPLATE);
    const klass = customElements.get('pf-tile');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfTile);
  });

  it('should have a selected styles when selected', async function() {
    const el = await createFixture <PfTile>(TEMPLATE);
    el.selected = true;
    await nextFrame();
    const { height } = getComputedStyle(el, ':after');
    expect(height).to.equal('3px');
    const { backgroundColor } = getComputedStyle(el, ':after');
    expect(backgroundColor).to.equal('rgb(0, 102, 204)');
    // TODO: don't test shadowroots
    const { color } = getComputedStyle(el.shadowRoot!.querySelector('[part="icon"]')!);
    expect(color).to.be.equal('rgb(0, 102, 204)');
  });

  it('should be flex direction column if stacked', async function() {
    const el = await createFixture <PfTile>(TEMPLATE);
    el.stacked = 'md';
    await nextFrame();
    // TODO: don't test shadowroots
    const { flexDirection } = getComputedStyle(el.shadowRoot!.querySelector('[part="header"]')!);
    expect(flexDirection).to.equal('column');
  });

  it('should have disabled styles when disabled', async function() {
    const el = await createFixture <PfTile>(TEMPLATE);
    el.setAttribute('disabled', '');
    await nextFrame();
    const { backgroundColor } = getComputedStyle(el);
    expect(backgroundColor).to.equal('rgb(240, 240, 240)');
    // TODO: don't test shadowroots
    const { color } = getComputedStyle(el.shadowRoot!.querySelector('[part="title"]')!);
    expect(color).to.equal('rgb(106, 110, 115)');
  });
});
