
import { expect, html, nextFrame, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';
import { BaseTabs } from '@patternfly/pfe-tabs/BaseTabs.js';
import { PfeTabs } from '@patternfly/pfe-tabs';

const TEMPLATE = html`
    <pfe-tabs>
      <pfe-tab slot="tab">Users</pfe-tab>
      <pfe-tab-panel>Users</pfe-tab-panel>
      <pfe-tab slot="tab">Containers</pfe-tab>
      <pfe-tab-panel>Containers</pfe-tab-panel>
      <pfe-tab slot="tab">Database</pfe-tab>
      <pfe-tab-panel>Database</pfe-tab-panel>
      <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
      <pfe-tab-panel>Disabled</pfe-tab-panel>
      <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
      <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
    </pfe-tabs>
  `;

describe('<pfe-tabs>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATE);
    expect(el, 'pfe-tabs should be an instance of PfeTabs')
      .to.be.an.instanceOf(customElements.get('pfe-tabs'))
      .and
      .to.be.an.instanceOf(PfeTabs);
  });

  it('should apply correct aria attributes', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATE);
    await nextFrame();
    const tabs = el.querySelectorAll('pfe-tab');
    const tabPanels = el.querySelectorAll('pfe-tab-panels');

    tabs.forEach(function(tab: Element, index: number) {
      const tabId = tab.getAttribute('id');
      const tabControls = tab.getAttribute('aria-controls');
      expect(tab.getAttribute('role')).to.equal('tab');
      tabPanels.forEach(function(panel: Element, pindex: number) {
        if (index === pindex) {
          expect(panel.getAttribute('aria-labelledby')).to.equal(tabId);
          expect(panel.id).to.equal(tabControls);
        }
      });
    });
  });

  it('should activate tab when given active-key attribute', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATE);
    el.activeKey = 2;
    await nextFrame();
    /* given active-key of 2 on a zero based index, nth-of-type(n) takes a 1 based index = 3. */
    const active = el.querySelector('pfe-tab:nth-of-type(3)');
    expect(active!.getAttribute('aria-selected')).to.equal('true');
  });

  it('should activate tab when active-key property is changed', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATE);
    el.activeKey = 2;
    await nextFrame();
    el.activeKey = 0;
    await nextFrame();
    const active = el.querySelector('pfe-tab:first-of-type');
    expect(active!.getAttribute('aria-selected')).to.equal('true');
  });

  it('should open panel at same index of selected tab', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATE);
    await nextFrame();
    el.activeKey = 1;
    await nextFrame();
    const inactivePanel = el.querySelector('pfe-tab-panel:first-of-type');
    /* given active-key of 1 on a zero based index, nth-of-type(n) takes a 1 based index = 2. */
    const activePanel = el.querySelector('pfe-tab-panel:nth-of-type(2)');
    expect(inactivePanel!.hasAttribute('hidden')).to.equal(true);
    expect(activePanel!.hasAttribute('hidden')).to.equal(false);
  });

  describe('vertical tabs', function() {
    it('should have vertical styles', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      el.setAttribute('vertical', '');
      await nextFrame();
      await aTimeout(200);
      const tabs = el.shadowRoot!.querySelector('#tabs')!;
      const tabsVerticalStyles = getComputedStyle(tabs).flexDirection;
      expect(tabsVerticalStyles).to.be.equal('column');
    });
  });

  describe('disabled tabs', function() {
    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
    });

    it('should aria-disable the tab', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pfe-tab:first-of-type')!;
      disabledTab.setAttribute('disabled', 'disabled');
      await nextFrame();
      const ariaDisabled = disabledTab!.hasAttribute('aria-disabled');
      expect(ariaDisabled).to.equal(true);
    });

    it('should have disabled styles', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pfe-tab:first-of-type')!;
      disabledTab.setAttribute('disabled', 'disabled');
      await nextFrame();
      const button = disabledTab!.shadowRoot!.firstElementChild!;
      const disabledStyles = getComputedStyle(button).backgroundColor;
      expect(disabledStyles).to.equal('rgb(245, 245, 245)');
    });

    it('should have disabled styles if aria-disabled attribute is true', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pfe-tab:first-of-type')!;
      disabledTab.setAttribute('aria-disabled', 'true');
      await nextFrame();
      const button = disabledTab!.shadowRoot!.firstElementChild!;
      const disabledStyles = getComputedStyle(button).backgroundColor;
      expect(disabledStyles).to.equal('rgb(245, 245, 245)');
    });
  });

  describe('on small screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
    });

    it('should have visible next and previous buttons on a scrollable tab set', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      el.setAttribute('scrollable', '');
      await nextFrame();
      await aTimeout(200);
      const previousTab = el.shadowRoot!.querySelector('#previousTab')!;
      const nextTab = el.shadowRoot!.querySelector('#nextTab')!;
      const prevDisplayStyle = getComputedStyle(previousTab).display;
      const nextDisplayStyle = getComputedStyle(nextTab).display;
      expect(prevDisplayStyle ).to.not.equal('none');
      expect(nextDisplayStyle).to.not.equal('none');
    });

    it('should not have visible next and previous buttons if scrollable is not set', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      await nextFrame();
      await aTimeout(150);
      const previousTab = el.shadowRoot?.querySelector('#previousTab');
      const nextTab = el.shadowRoot?.querySelector('#nextTab');
      expect(previousTab).to.equal(null);
      expect(nextTab).to.equal(null);
    });

    it('should overflow if too wide', async function() {
      const el = await createFixture<PfeTabs>(TEMPLATE);
      await nextFrame();
      await aTimeout(150);
      const tabs = el.shadowRoot!.querySelector('#tabs')!;
      const tabsOverflow = getComputedStyle(tabs).overflowX === 'auto';
      expect(tabsOverflow).to.equal(true);
    });
  });
});
