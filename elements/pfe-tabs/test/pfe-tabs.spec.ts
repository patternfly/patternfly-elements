
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';
import { PfeTabs } from '@patternfly/pfe-tabs';

const TEMPLATES = {
  simple: html`
    <pfe-tabs>
      <pfe-tab slot="tab">Tab 1</pfe-tab>
      <pfe-tab slot="tab">Tab 2</pfe-tab>
      <pfe-tab-panel>Tab 1 Panel</pfe-tab-panel>
      <pfe-tab-panel>Tab 2 Panel</pfe-tab-panel>
    </pfe-tabs>
  `,

  default: html`
    <pfe-tabs>
      <pfe-tab id="users" slot="tab">Users</pfe-tab>
      <pfe-tab slot="tab">Containers</pfe-tab>
      <pfe-tab slot="tab">Database</pfe-tab>
      <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
      <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
      <pfe-tab-panel>Users</pfe-tab-panel>
      <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
      <pfe-tab-panel>Database</pfe-tab-panel>
      <pfe-tab-panel>Disabled</pfe-tab-panel>
      <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
    </pfe-tabs>
  `,

  verticalTabs: html`
    <pfe-tabs vertical>
      <pfe-tab id="users" slot="tab">Users</pfe-tab>
      <pfe-tab slot="tab">Containers</pfe-tab>
      <pfe-tab slot="tab">Database</pfe-tab>
      <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
      <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
      <pfe-tab-panel>Users</pfe-tab-panel>
      <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
      <pfe-tab-panel>Database</pfe-tab-panel>
      <pfe-tab-panel>Disabled</pfe-tab-panel>
      <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
    </pfe-tabs>
  `,

  boxTabs: html`
    <pfe-tabs vertical>
      <pfe-tab id="users" slot="tab">Users</pfe-tab>
      <pfe-tab slot="tab">Containers</pfe-tab>
      <pfe-tab slot="tab">Database</pfe-tab>
      <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
      <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
      <pfe-tab-panel>Users</pfe-tab-panel>
      <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
      <pfe-tab-panel>Database</pfe-tab-panel>
      <pfe-tab-panel>Disabled</pfe-tab-panel>
      <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
    </pfe-tabs>
  `,

  activeKeyAttribute: html`
    <pfe-tabs active-key="2">
      <pfe-tab id="users" slot="tab">Users</pfe-tab>
      <pfe-tab slot="tab">Containers</pfe-tab>
      <pfe-tab slot="tab">Database</pfe-tab>
      <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
      <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
      <pfe-tab-panel>Users</pfe-tab-panel>
      <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
      <pfe-tab-panel>Database</pfe-tab-panel>
      <pfe-tab-panel>Disabled</pfe-tab-panel>
      <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
    </pfe-tabs>
  `
  /* eslint-enable lit-a11y/role-has-required-aria-attrs */
};

describe('<pfe-tabs>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATES.default);
    expect(el, 'pfe-tabs should be an instance of PfeTabs')
      .to.be.an.instanceOf(customElements.get('pfe-tabs'))
      .and
      .to.be.an.instanceOf(PfeTabs);
  });

  it('should apply correct aria attributes', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATES.simple);
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
    const el = await createFixture<PfeTabs>(TEMPLATES.activeKeyAttribute);
    await nextFrame();
    /* given active-key of 2 on a zero based index, nth-of-type(n) takes a 1 based index = 3. */
    const active = el.querySelector('pfe-tab:nth-of-type(3)');
    expect(active!.getAttribute('aria-selected')).to.equal('true');
  });

  it('should activate tab when active-key property is changed', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATES.activeKeyAttribute);
    await nextFrame();
    el.activeKey = 0;
    await nextFrame();
    const active = el.querySelector('pfe-tab:first-of-type');
    expect(active!.getAttribute('aria-selected')).to.equal('true');
  });

  it('should open panel at same index of selected tab', async function() {
    const el = await createFixture<PfeTabs>(TEMPLATES.activeKeyAttribute);
    await nextFrame();
    el.activeKey = 1;
    await nextFrame();
    const inactivePanel = el.querySelector('pfe-tab-panel:first-of-type');
    /* given active-key of 1 on a zero based index, nth-of-type(n) takes a 1 based index = 2. */
    const activePanel = el.querySelector('pfe-tab-panel:nth-of-type(2)');
    expect(inactivePanel!.hasAttribute('hidden')).to.equal(true);
    expect(activePanel!.hasAttribute('hidden')).to.equal(false);
  });
});
