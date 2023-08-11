import { expect, html, nextFrame, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { PfTabs } from '../pf-tabs.js';
import { PfTab } from '../pf-tab.js';
import { PfTabPanel } from '../pf-tab-panel.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

const TEMPLATE = html`
    <pf-tabs>
      <pf-tab slot="tab" active>Users</pf-tab>
      <pf-tab-panel>Users</pf-tab-panel>
      <pf-tab slot="tab">Containers</pf-tab>
      <pf-tab-panel>Containers</pf-tab-panel>
      <pf-tab slot="tab">Database</pf-tab>
      <pf-tab-panel>Database</pf-tab-panel>
      <pf-tab slot="tab" disabled>Disabled</pf-tab>
      <pf-tab-panel>Disabled</pf-tab-panel>
      <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
      <pf-tab-panel>Aria Disabled</pf-tab-panel>
    </pf-tabs>
  `;

const DISABLED = html`
  <pf-tabs>
    <pf-tab slot="tab" disabled>Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
    <pf-tab slot="tab" disabled>Disabled</pf-tab>
    <pf-tab-panel>Disabled</pf-tab-panel>
    <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
    <pf-tab-panel>Aria Disabled</pf-tab-panel>
  </pf-tabs>
`;

describe('<pf-tabs>', function() {
  it('instantiates imperatively', function() {
    expect(document.createElement('pf-tabs')).to.be.an.instanceof(PfTabs);
    expect(document.createElement('pf-tab')).to.be.an.instanceof(PfTab);
    expect(document.createElement('pf-tab-panel')).to.be.an.instanceof(PfTabPanel);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    expect(el, 'pf-tabs should be an instance of PfeTabs')
      .to.be.an.instanceOf(customElements.get('pf-tabs'))
      .and
      .to.be.an.instanceOf(PfTabs);
  });

  it('should apply correct aria attributes', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    await nextFrame();
    const tabs = el.querySelectorAll('pf-tab');
    const tabPanels = el.querySelectorAll('pf-tab-panels');

    tabs.forEach(function(tab: Element, index: number) {
      const tabId = tab.getAttribute('id');
      const tabControls = tab.getAttribute('aria-controls');
      tabPanels.forEach(function(panel: Element, pindex: number) {
        if (index === pindex) {
          expect(panel.getAttribute('aria-labelledby')).to.equal(tabId);
          expect(panel.id).to.equal(tabControls);
        }
      });
    });
  });

  it('should activate the first focusable tab when first tab is disabled and no active is given', async function() {
    const el = await createFixture<PfTabs>(DISABLED);
    await nextFrame();
    const secondTab = el.querySelector('pf-tab:nth-of-type(2)');
    expect(secondTab!.hasAttribute('active')).to.equal(true);
  });

  it('should activate tab when given an active attribute', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    const tab = el.querySelector('pf-tab:nth-of-type(3)');
    tab!.setAttribute('active', '');
    await nextFrame();
    expect(tab!.hasAttribute('active'), 'active attr').to.equal(true);
    const panel = (await a11ySnapshot()).children.find(x => x.role === 'tabpanel');
    expect(panel?.name, 'active panel').to.equal('Database');
  });

  it('should activate tab when activeIndex property is changed', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    el.activeIndex = 2;
    await nextFrame();
    el.activeIndex = 0;
    await nextFrame();
    const tab = el.querySelector('pf-tab:first-of-type');
    expect(tab!.hasAttribute('active')).to.equal(true);
    const panel = (await a11ySnapshot()).children.find(x => x.role === 'tabpanel');
    expect(panel?.name, 'active panel').to.equal('Users');
  });

  it('should change focus when keyboard navigation is used', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    await el.updateComplete;
    const firstTab = el.querySelector('pf-tab:first-of-type') as HTMLElement;
    const secondTab = el.querySelector('pf-tab:nth-of-type(2)')?.id;
    firstTab?.focus();
    await nextFrame();
    const initial = document.activeElement?.id;
    await sendKeys({ down: 'ArrowRight' });
    await nextFrame();
    const after = document.activeElement?.id;
    expect(initial).to.not.equal(after);
    expect(secondTab).to.equal(after);
  });

  it('should open panel at same index of selected tab', async function() {
    const el = await createFixture<PfTabs>(TEMPLATE);
    await nextFrame();
    el.activeIndex = 1;
    await nextFrame();
    const inactivePanel = el.querySelector('pf-tab-panel:first-of-type');
    /* given active-key of 1 on a zero based index, nth-of-type(n) takes a 1 based index = 2. */
    const activePanel = el.querySelector('pf-tab-panel:nth-of-type(2)');
    expect(inactivePanel!.hasAttribute('hidden')).to.equal(true);
    expect(activePanel!.hasAttribute('hidden')).to.equal(false);
  });

  describe('vertical tabs', function() {
    it('should have vertical styles', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      el.setAttribute('vertical', '');
      await nextFrame();
      const tabs = el.shadowRoot!.querySelector('[part="tabs"]')!;
      const tabsVerticalStyles = getComputedStyle(tabs).flexDirection;
      expect(tabsVerticalStyles).to.be.equal('column');
    });
  });

  describe('disabled tabs', function() {
    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
    });

    it('should disable the tab button if disabled attr is present', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pf-tab:nth-of-type(2)')! as PfTab;
      disabledTab.disabled = true;
      await nextFrame();
      const tab = (await a11ySnapshot()).children.find(x => x.role === 'tab' && x.name === 'Containers');
      expect(tab?.children.find(x => x.role === 'button')?.disabled).to.equal(true);
    });

    it('should have disabled css styles if disabled', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pf-tab:first-of-type')!;
      disabledTab.setAttribute('disabled', 'disabled');
      await nextFrame();
      const button = disabledTab!.shadowRoot!.firstElementChild!;
      const disabledStyles = getComputedStyle(button).backgroundColor;
      expect(disabledStyles).to.equal('rgb(245, 245, 245)');
    });

    it('should have disabled css styles if aria-disabled attribute is true', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      const disabledTab = el.querySelector('pf-tab:first-of-type')!;
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

    it('should overflow if too wide', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      const tabs = el.shadowRoot!.querySelector('[part="tabs"]')!;
      const tabsOverflow = getComputedStyle(tabs).overflowX === 'auto';
      expect(tabsOverflow).to.equal(true);
    });

    it('should have visible scroll buttons if overflowed', async function() {
      const el = await createFixture<PfTabs>(TEMPLATE);
      // Property 'scrollTimeoutDelay' is protected and only accessible within class 'PfeTabs' and its subclasses.
      // using 150 as a static representation.
      await aTimeout(150);
      const previousTab = el.shadowRoot!.querySelector('#previousTab')!;
      const nextTab = el.shadowRoot!.querySelector('#nextTab')!;
      const prevDisplayStyle = getComputedStyle(previousTab).display;
      const nextDisplayStyle = getComputedStyle(nextTab).display;
      expect(prevDisplayStyle ).to.not.equal('none');
      expect(nextDisplayStyle).to.not.equal('none');
    });
  });

  describe('manual activation', function() {
    let element: PfTabs;
    let firstTab: PfTab;
    let secondTab: PfTab;
    let initialFocus: Element | null;
    let afterFocus: Element | null;
    beforeEach(async function() {
      element = await createFixture<PfTabs>(html`
        <pf-tabs manual>
          <pf-tab slot="tab" active>Users</pf-tab>
          <pf-tab-panel>Users</pf-tab-panel>
          <pf-tab slot="tab">Containers</pf-tab>
          <pf-tab-panel>Containers</pf-tab-panel>
          <pf-tab slot="tab">Database</pf-tab>
          <pf-tab-panel>Database</pf-tab-panel>
          <pf-tab slot="tab" disabled>Disabled</pf-tab>
          <pf-tab-panel>Disabled</pf-tab-panel>
          <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
          <pf-tab-panel>Aria Disabled</pf-tab-panel>
        </pf-tabs>
      `);
      [firstTab, secondTab] = element.querySelectorAll('pf-tab');
      await element.updateComplete;
      await nextFrame();
      initialFocus = document.activeElement;
    });

    describe('pressing right arrow', function() {
      beforeEach(async function() {
        firstTab?.focus();
        await sendKeys({ down: 'ArrowRight' });
        await element.updateComplete;
        await nextFrame();
        afterFocus = document.activeElement;
      });
      it('should not activate second tab', function() {
        expect(firstTab.active).to.be.true;
        expect(secondTab.active).to.be.false;
        expect(initialFocus).to.be.ok
          .and.to.not.equal(afterFocus);
        expect(initialFocus).to.not.equal(secondTab);
      });
      describe('then pressing enter', function() {
        beforeEach(async function() {
          await sendKeys({ down: 'Enter' });
          await nextFrame();
          afterFocus = document.activeElement;
        });
        it('should activate second tab', async function() {
          expect(firstTab.active).to.be.false;
          expect(secondTab.active).to.be.true;
          expect(afterFocus).to.equal(secondTab);
          expect(afterFocus).to.not.equal(initialFocus);
          expect(afterFocus).to.not.equal(firstTab);
        });
      });
    });
  });
});
