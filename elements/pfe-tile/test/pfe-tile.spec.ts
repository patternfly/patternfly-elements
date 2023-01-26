import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeTile } from '@patternfly/elements/pfe-tile/pfe-tile.js';

const TEMPLATE = html`
  <pfe-tile>
    <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
    Default Content
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
`;


describe('<pfe-tile>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeTile>(TEMPLATE);
    const klass = customElements.get('pfe-tile');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeTile);
  });

  it('should have a selected styles when selected', async function() {
    const el = await createFixture <PfeTile>(TEMPLATE);
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
    const el = await createFixture <PfeTile>(TEMPLATE);
    el.stacked = 'md';
    await nextFrame();
    // TODO: don't test shadowroots
    const { flexDirection } = getComputedStyle(el.shadowRoot!.querySelector('[part="header"]')!);
    expect(flexDirection).to.equal('column');
  });

  it('should have disabled styles when disabled', async function() {
    const el = await createFixture <PfeTile>(TEMPLATE);
    el.setAttribute('disabled', '');
    await nextFrame();
    const { backgroundColor } = getComputedStyle(el);
    expect(backgroundColor).to.equal('rgb(240, 240, 240)');
    // TODO: don't test shadowroots
    const { color } = getComputedStyle(el.shadowRoot!.querySelector('[part="title"]')!);
    expect(color).to.equal('rgb(106, 110, 115)');
  });
});
