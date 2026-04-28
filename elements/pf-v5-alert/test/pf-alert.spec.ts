import { html, fixture, expect } from '@open-wc/testing';
import '../pf-v5-alert.js';

describe('pf-v5-alert Unit Tests', () => {
  it('should create the component', async () => {
    const el = await fixture(html`<pf-v5-alert></pf-v5-alert>`) as any;
    expect(el).to.exist;
    expect(el.variant).to.equal('neutral');
  });

  it('should render a title slot', async () => {
    const el = await fixture(html`
      <pf-v5-alert><span slot="title">My Title</span></pf-v5-alert>
    `);
    const titleSlot = el.shadowRoot!.querySelector('#title slot[name="title"]');
    expect(titleSlot).to.exist;
  });

  it('close button should appear when dismissable=true', async () => {
    const el = await fixture(html`<pf-v5-alert .dismissable=${true}></pf-v5-alert>`);
    const btn = el.shadowRoot!.querySelector('#close')!;
    expect(btn.hasAttribute('hidden')).to.be.false;
  });

  it('should remove itself after timeout', async () => {
    const el = await fixture(html`<pf-v5-alert .timeout=${50}></pf-v5-alert>`);
    const removed = new Promise<void>(resolve => el.addEventListener('close', () => resolve()));
    await removed;
    expect(document.body.contains(el)).to.be.false;
  });

  it('should toggle expanded when toggle button clicked', async () => {
    const el = await fixture(html`
      <pf-v5-alert expandable><span>Content</span></pf-v5-alert>
    `) as any;
    await el.updateComplete;
    const toggle = el.shadowRoot!.querySelector('#toggle') as HTMLElement;
    const initial = el.expanded;
    toggle.click();
    await el.updateComplete;
    expect(el.expanded).to.equal(!initial);
    toggle.click();
    await el.updateComplete;
    expect(el.expanded).to.equal(initial);
  });
});
