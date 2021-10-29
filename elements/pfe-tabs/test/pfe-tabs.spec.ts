import type { PfeTabPanel } from '../pfe-tab-panel';

import { expect, aTimeout, nextFrame, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeTabs } from '@patternfly/pfe-tabs';
import { PfeTab } from '@patternfly/pfe-tabs/pfe-tab';

import '@patternfly/pfe-tabs';

import sinon from 'sinon';

/* @TODO: Add focus-state tests to validate against document.activeElement */

const TEMPLATES = {
  // These templates purposefully include bad aria-attributes
  // in order for us to test that the components provide cogent a11y properties
  /* eslint-disable lit-a11y/role-has-required-aria-attrs */
  default: html`
    <pfe-tabs id="default">
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">
        <h2>Tab 2</h2>
      </pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">Tab 3</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
    </pfe-tabs>
  `,

  withIds: html`
    <pfe-tabs id="withIds">
      <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel" id="panel1">
        <h2>Content 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
      <pfe-tab-panel role="region" slot="panel" id="panel2">
        <h2>Content 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="tab3">Tab 3</pfe-tab>
      <pfe-tab-panel role="region" slot="panel" id="panel3">
        <h2>Content 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
    </pfe-tabs>
  `,

  verticalTabs: html`
    <pfe-tabs id="verticalTabs" vertical>
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">Tab 2</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">Tab 3</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
    </pfe-tabs>
  `,

  withSelectedIndexAttribute: html`
    <pfe-tabs id="withSelectedIndexAttribute" selected-index="1">
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">Tab 2</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab">Tab 3</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <h2>Content 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
    </pfe-tabs>
  `,

  dynamic: html`
    <pfe-tabs id="dynamic">
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel" id="dynamicTab1">Tab 1 Content</pfe-tab-panel>
    </pfe-tabs>
  `,

  initialVariant: html`
    <pfe-tabs id="initialVariant" variant="earth">
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
    </pfe-tabs>
  `,

  variantChange: html`
    <pfe-tabs id="variantChange">
      <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
    </pfe-tabs>
  `,

  history: html`
    <pfe-tabs id="history" tab-history>
      <pfe-tab role="heading" slot="tab" id="historyTab1">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="historyTab2">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
    </pfe-tabs>
  `,

  pfeIdHistory: html`
    <pfe-tabs id="pfe-id-history" tab-history>
      <pfe-tab role="heading" slot="tab" id="historyTab1">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="historyTab2">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
    </pfe-tabs>
  `,

  tabsInTabs: html`
    <pfe-tabs id="tabs-in-tabs">
      <pfe-tab role="heading" slot="tab" id="tabs-in-tabs-1">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">
        <pfe-tabs id="subtabset">
          <pfe-tab role="heading" slot="tab" id="subtab1">Sub Tab 1</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">
            <h2>Content for Sub Tab 1</h2>
            <button id="btn">Button</button>
          </pfe-tab-panel>
          <pfe-tab role="heading" slot="tab" id="subtab2">Sub Tab 2</pfe-tab>
          <pfe-tab-panel role="region" slot="panel" id="subtab2panel">
            <h2>Content for Sub Tab 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.</p>
          </pfe-tab-panel>
        </pfe-tabs>
      </pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="tabs-in-tabs-2">Tab 2</pfe-tab>
      <pfe-tab-panel role="region" slot="panel" id="tabs-in-tabs-panel2">
        <h1>Tab 2 Content</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
      </pfe-tab-panel>
    </pfe-tabs>
  `,

  fromQueryString: html`
    <pfe-tabs id="fromQueryString">
      <pfe-tab role="heading" slot="tab" id="fromQueryStringTab1">Tab 1</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
      <pfe-tab role="heading" slot="tab" id="fromQueryStringTab2">Tab 2</pfe-tab>
      <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
    </pfe-tabs>
  `,
  /* eslint-enable lit-a11y/role-has-required-aria-attrs */
};

describe('<pfe-tabs>', function() {
  it('should add the proper attributes to the tabs and panels', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const tab = tabs.querySelector('pfe-tab')!;
    const panel = tabs.querySelector('pfe-tab-panel')!;

    await Promise.all(Array.from(tabs.querySelectorAll('pfe-tab'), x => x.updateComplete));

    expect(tab.hasAttribute('id')).to.be.true;
    expect(panel.hasAttribute('id')).to.be.true;
    expect(tabs.getAttribute('role')).to.equal('tablist');
    expect(tab.getAttribute('role')).to.equal('tab');
    expect(tab.hasAttribute('aria-selected')).to.be.true;
    expect(tab.hasAttribute('aria-controls')).to.be.true;
    expect(panel.getAttribute('role')).to.equal('tabpanel');
    expect(panel.hasAttribute('aria-labelledby')).to.be.true;
    expect(tab.id).to.equal(panel.getAttribute('aria-labelledby'));
    expect(tab.getAttribute('aria-controls')).to.equal(panel.id);
  });

  it('should add the proper attributes to the first tab', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const tab = tabs.querySelector('pfe-tab')!;

    expect(tab.getAttribute('tabindex')).to.equal('0');
    expect(tab.getAttribute('aria-selected')).to.equal('true');
  });

  it('should add the proper attributes to the second tab', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const tab2 = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;

    expect(tab2.getAttribute('tabindex')).to.equal('-1');
    expect(tab2.getAttribute('aria-selected')).to.equal('false');
  });

  it('should use the ids that are provided instead of generating new ones', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.withIds)!;
    const firstTab = tabs.querySelector('pfe-tab')!;
    const firstPanel = tabs.querySelector('pfe-tab-panel')!;

    expect(firstTab.id).to.equal('tab1');
    expect(firstPanel.id).to.equal('panel1');
  });

  it('should open the first tab and panel by default', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const firstTab = tabs.querySelector('pfe-tab')!;
    const firstPanel = tabs.querySelector('pfe-tab-panel')!;
    const secondTab = tabs.querySelector('pfe-tabs pfe-tab:nth-of-type(2)')!;
    const secondPanel = tabs.querySelector('pfe-tabs pfe-tab-panel:nth-of-type(2)')!;

    expect(firstTab.getAttribute('aria-selected')).to.equal('true');
    expect(!firstPanel.hasAttribute('hidden')).to.equal(true);
    expect(secondTab.getAttribute('aria-selected')).to.equal('false');
    expect(secondPanel.hasAttribute('hidden')).to.equal(true);
  });

  it('should select a new tab when it is clicked on', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const secondTab = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;
    const secondPanel = tabs.querySelector<PfeTabPanel>('pfe-tab-panel:nth-of-type(2)')!;

    secondTab.click();

    await tabs.updateComplete;
    await aTimeout(50);
    expect(secondTab.getAttribute('aria-selected')).to.equal('true');
    expect(!secondPanel.hasAttribute('hidden')).to.be.true;
  });

  it('should select a new tab when using the select method', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const secondTab = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;
    const secondPanel = tabs.querySelector<PfeTabPanel>('pfe-tab-panel:nth-of-type(2)')!;

    tabs.select(secondTab);
    await tabs.updateComplete;
    await aTimeout(50);

    expect(secondTab.getAttribute('aria-selected')).to.equal('true');
    expect(!secondPanel.hasAttribute('hidden')).to.be.true;
  });

  it('should select a new tab when using the selectIndex method', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const secondTab = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;
    const secondPanel = tabs.querySelector<PfeTabPanel>('pfe-tab-panel:nth-of-type(2)')!;

    tabs.selectIndex(1);
    await aTimeout(50);

    expect(secondTab.getAttribute('aria-selected')).to.equal('true');
    expect(!secondPanel.hasAttribute('hidden')).to.be.true;
  });

  it(`should throw an error when passing a bad index value to the selectIndex method`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const badIndex = 5;
    const spy = sinon.spy(console, 'warn');

    tabs.selectIndex(badIndex);

    await aTimeout(50);

    sinon.assert.calledWith(spy, '[pfe-tabs#default]', `tab ${badIndex} does not exist`);
  });

  it('should fire a pfe-tabs:hidden-tab event when a tab is closed', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const firstTab = tabs.querySelector('pfe-tab')!;
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-tabs:hidden-tab', handlerSpy);

    await tabs.updateComplete;
    tabs.selectIndex(1);
    const eventDetail = handlerSpy.getCall(0).args[0].detail;

    expect(handlerSpy).to.have.been.calledOnce;
    // @ts-expect-error: don't test private props
    expect(firstTab.pfeId).to.equal(eventDetail.tab.pfeId);

    document.removeEventListener('pfe-tabs:hidden-tab', handlerSpy);
  });

  it('should fire a pfe-tabs:shown-tab event when a tab is opened', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const secondTab = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-tabs:shown-tab', handlerSpy);

    await tabs.updateComplete;
    tabs.selectIndex(1);
    const eventDetail = handlerSpy.getCall(0).args[0].detail;

    expect(handlerSpy).to.have.been.calledOnce;
    // @ts-expect-error: don't test private props
    expect(secondTab.pfeId).to.equal(eventDetail.tab.pfeId);

    document.removeEventListener('pfe-tabs:shown-tab', handlerSpy);
  });

  it(`should set aria-orientation to vertical when the vertical attribute is present`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.verticalTabs)!;
    const ariaOrientationAttribute = tabs.getAttribute('aria-orientation');
    expect(ariaOrientationAttribute).to.equal('vertical');
  });

  it(`should change aria-orientation to horizontal when the vertical attribute is removed`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.verticalTabs)!;

    tabs.removeAttribute('vertical');
    await tabs.updateComplete;

    expect(tabs.getAttribute('aria-orientation')).to.equal('horizontal');
  });

  it(`should add a vertical attribute to each tab and panel if the tabs have a vertical attribute`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.verticalTabs)!;
    const allTabs = [...tabs.querySelectorAll('pfe-tab')];
    const allPanels = [...tabs.querySelectorAll('pfe-tab-panel')];

    await aTimeout(100);

    allTabs.forEach(tab => expect(tab.hasAttribute('vertical')).to.be.true);
    allPanels.forEach(panel => expect(panel.hasAttribute('vertical')).to.be.true);
  });

  it(`it should remove the vertical attribute on each tab and panel if the tabs have the vertical attribute removed`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.verticalTabs)!;
    const allTabs = [...tabs.querySelectorAll('pfe-tab')];
    const allPanels = [...tabs.querySelectorAll('pfe-tab-panel')];

    tabs.removeAttribute('vertical');
    await tabs.updateComplete;

    for (const tab of allTabs!)
      expect(tab.hasAttribute('vertical')).to.be.false;
    for (const panel of allPanels)
      expect(panel.hasAttribute('vertical')).to.be.false;
  });

  it('should open to the correct tab specified by the selected-index attribute', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.withSelectedIndexAttribute)!;

    const secondTab = tabs.querySelector('pfe-tabs pfe-tab:nth-of-type(2)')!;
    const secondPanel = tabs.querySelector('pfe-tabs pfe-tab-panel:nth-of-type(2)')!;

    expect(secondTab.getAttribute('aria-selected')).to.equal('true');
    expect(!secondPanel.hasAttribute('hidden')).to.be.true;
  });

  it('should move the content from the tab into the shadow DOM', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.verticalTabs)!;
    const secondTab = tabs.querySelector<PfeTab>('pfe-tab:nth-of-type(2)')!;
    const shadowTab = secondTab.shadowRoot!.querySelector('#tab')!;
    expect(secondTab.textContent!.trim()).to.equal(shadowTab.textContent!.trim());
  });

  it('should add an h3 tag to the tab if one is not provided', async function() {
    const htag = document.createElement('h3');
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const firstTab = tabs.querySelector('pfe-tab:first-child')!;
    const shadowTab = firstTab.shadowRoot!.querySelector('#tab')!;
    htag.appendChild(firstTab.childNodes[0]);
    await aTimeout(10);
    expect(htag.outerHTML.trim()).to.equal(shadowTab.innerHTML.trim());
  });

  it('should reflect content changes in the tab into the shadow DOM', async function() {
    // Capture the elements to compare
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const firstTab = tabs.querySelector('pfe-tab')!;
    const shadowTab = firstTab.shadowRoot!.querySelector('#tab')!;

    // Update the content of the tab
    document.querySelector('#default pfe-tab')!.textContent = 'Lorem ipsum';

    await aTimeout(50);
    expect('Lorem ipsum').to.equal(shadowTab.textContent);
  });

  it('should reflect markup changes in the tab into the shadow DOM', async function() {
    // Capture the elements to compare
    const tabs = await createFixture<PfeTabs>(TEMPLATES.default)!;
    const firstTab = tabs.querySelector('pfe-tab')!;

    // Update the markup of the tab
    const documentFragment = document.createDocumentFragment();
    const heading = document.createElement('h4');
    const span = document.createElement('span');
    heading.textContent = 'New tab ';
    span.textContent = '1';
    heading.append(span);

    documentFragment.appendChild(heading);
    firstTab.innerHTML = '';
    firstTab.appendChild(documentFragment);

    await tabs.updateComplete;
    await aTimeout(50);
    const shadowTab = firstTab.shadowRoot!.querySelector('#tab')!;
    expect(shadowTab.innerHTML).to.equal('<h4>New tab 1</h4>');
  });

  it('should properly initialize any dynamically added tabs and panels', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.dynamic)!;
    const documentFragment = document.createDocumentFragment();

    const newTab = document.createElement('pfe-tab');
    newTab.id = 'newTab';
    newTab.setAttribute('role', 'heading');
    newTab.setAttribute('slot', 'tab');
    newTab.textContent = `New Tab`;

    const newPanel = document.createElement('pfe-tab-panel');
    newPanel.id = 'newPanel';
    newPanel.setAttribute('role', 'region');
    newPanel.setAttribute('slot', 'panel');
    newPanel.textContent = `New Panel`;

    documentFragment.appendChild(newTab);
    documentFragment.appendChild(newPanel);
    tabs.appendChild(documentFragment);

    const dynamicTab1 = document.querySelector('#dynamicTab1')!;
    dynamicTab1.innerHTML += 'More text';

    await tabs.updateComplete;
    await aTimeout(50);

    const newTabElement = document.querySelector('#newTab')!;
    const newPanelElement = document.querySelector('#newPanel')!;

    expect(newTabElement.getAttribute('role')).to.equal('tab');
    expect(newTabElement.hasAttribute('id')).to.be.true;
    expect(newTabElement.hasAttribute('aria-controls')).to.be.true;
    expect(newTabElement.getAttribute('aria-controls')).to.equal(newPanelElement.id);
    expect(newTabElement.getAttribute('variant')).to.equal('wind');

    expect(newPanelElement.getAttribute('role')).to.equal('tabpanel');
    expect(newPanelElement.hasAttribute('id')).to.be.true;
    expect(newPanelElement.hasAttribute('aria-labelledby')).to.be.true;
    expect(newPanelElement.hasAttribute('hidden')).to.be.true;
    expect(newPanelElement.getAttribute('aria-labelledby')).to.equal(newTabElement.id);
    expect(newPanelElement.getAttribute('variant')).to.equal('wind');
  });

  it('should honor a variant attribute value other than the default variant', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.initialVariant)!;
    const tab = tabs.querySelector('pfe-tab')!;
    const panel = tabs.querySelector('pfe-tab-panel')!;

    await aTimeout(100);

    expect(tab.getAttribute('variant')).to.equal('earth');
    expect(panel.getAttribute('variant')).to.equal('earth');
  });

  it(`should update the tabs and panels variant attribute if the tabs variant value changes`, async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.variantChange)!;
    const tab = tabs.querySelector('pfe-tab')!;
    const panel = tabs.querySelector('pfe-tab-panel')!;

    await aTimeout(100);

    expect(tab.getAttribute('variant'), 'tab').to.equal('wind');
    expect(panel.getAttribute('variant'), 'panel').to.equal('wind');

    tabs.setAttribute('variant', 'earth');

    await aTimeout(100);

    expect(tab.getAttribute('variant'), 'tab').to.equal('earth');
    expect(panel.getAttribute('variant'), 'panel').to.equal('earth');
  });

  it('should function properly with tabs in tabs', async function() {
    const tabset1 = await createFixture<PfeTabs>(TEMPLATES.tabsInTabs)!;
    const tabset1Tab1 = tabset1.querySelector<PfeTabs>('#tabs-in-tabs-1')!;
    const tabset1Tab2 = tabset1.querySelector<PfeTabs>('#tabs-in-tabs-2')!;
    const tabset1Tab2Panel = tabset1.querySelector<PfeTabs>('#tabs-in-tabs-panel2')!;
    const tabset2 = tabset1.querySelector<PfeTabs>('pfe-tabs')!;
    const tabset2SubTab1 = tabset2.querySelector<PfeTabs>('#subtab1')!;
    const tabset2SubTab2 = tabset2.querySelector<PfeTabs>('#subtab2')!;
    const tabset2SubTabPanel = tabset2.querySelector<PfeTabs>('#subtab2panel')!;

    tabset2SubTab2.click();
    await nextFrame();

    expect(tabset2SubTab2.getAttribute('aria-selected')).to.equal('true');
    expect(!tabset2SubTabPanel.hasAttribute('hidden')).to.be.true;

    tabset1Tab2.click();
    await nextFrame();

    expect(tabset1Tab2.getAttribute('aria-selected')).to.equal('true');
    expect(!tabset1Tab2Panel.hasAttribute('hidden')).to.be.true;

    tabset1Tab1.click();
    await nextFrame();

    expect(tabset2SubTab2.getAttribute('aria-selected')).to.equal('true');
    expect(!tabset2SubTabPanel.hasAttribute('hidden')).to.be.true;
  });

  it('should not stop events from inside tabs from propagating', async function() {
    const tabs = await createFixture<PfeTabs>(TEMPLATES.tabsInTabs)!;
    const btn = document.querySelector<HTMLButtonElement>('#btn')!;
    const handlerSpy = sinon.spy();

    document.addEventListener('click', handlerSpy);
    btn.click();

    const [event] = handlerSpy.getCall(0).args;
    expect(handlerSpy).to.have.been.calledOnce;

    document.removeEventListener('click', handlerSpy);
  });

  describe('Tab History', function() {
    it(`should show the correct tab if there is a querystring parameter in the URL`, async function() {
      // the parameter should be equal to the id of the tabset
      // the value should be equal to the id of the tab you want opened
      const searchParams = new URLSearchParams(location.search);
      const oldPath = `${window.location.pathname}?${searchParams.toString()}`;
      searchParams.set('fromQueryString', 'fromQueryStringTab2');
      const newPath = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, '', newPath);

      const tabs = await createFixture<PfeTabs>(TEMPLATES.fromQueryString)!;

      const tab2 = tabs.querySelector('#fromQueryStringTab2')!;
      expect(tabs.selectedIndex).to.equal(1);
      expect(tab2.hasAttribute('aria-selected')).to.be.true;

      history.pushState(null, '', oldPath);
    });

    it(`it should show the correct tab if there is a querystring parameter in the URL and the tabset is using pfe-id instead of the id attribute`, async function() {
      // the parameter should be equal to the id of the tabset
      // the value should be equal to the id of the tab you want opened
      const searchParams = new URLSearchParams(location.search);
      const oldPath = `${window.location.pathname}?${searchParams.toString()}`;
      searchParams.set('fromQueryString', 'fromQueryStringTab2');
      const newPath = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, '', newPath);

      const tabs = await createFixture<PfeTabs>(TEMPLATES.fromQueryString)!;

      const tab2 = tabs.querySelector(`[id="fromQueryStringTab2"]`)!;
      expect(tabs.selectedIndex).to.equal(1);
      expect(tab2.hasAttribute('aria-selected')).to.be.true;
      history.pushState(null, '', oldPath);
    });

    it(`should open the first tab if the querystring in the URL doesn't match the id of any of the tabs`, async function() {
      const searchParams = new URLSearchParams(window.location.search);
      const oldPath = `${window.location.pathname}?${searchParams.toString()}`;
      searchParams.set('pfe-fromQueryString', 'iDontExist');
      const newPath = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, '', newPath);

      const tabs = await createFixture<PfeTabs>(TEMPLATES.fromQueryString)!;
      const tab1 = tabs.querySelector('#fromQueryStringTab1')!;

      await nextFrame();

      expect(tabs.selectedIndex).to.equal(0);
      expect(tab1.hasAttribute('aria-selected')).to.be.true;
      history.pushState(null, '', oldPath);
    });

    it(`should update the URL on tab selection if the tab-history attribute is present`, async function() {
      const tabs = await createFixture<PfeTabs>(TEMPLATES.history)!;
      const tab2 = tabs.querySelector<PfeTab>('#historyTab2')!;

      tab2.click();
      await aTimeout(50);

      const urlSearchParams = new URLSearchParams(window.location.search);
      expect(urlSearchParams.get('history')).to.equal('historyTab2');
      expect(tabs.selectedIndex).to.equal(1);
      expect(tab2.hasAttribute('aria-selected')).to.be.true;
    });

    it(`it should update the URL on tab selection if the tab-history attribute is present`, async function() {
      // we don't want to communicate that this is available. the only
      // reason we're doing this is to support pfe-content-set and allow
      // developers to continue using id attributes on pfe-content-set
      const tabs = await createFixture<PfeTabs>(TEMPLATES.pfeIdHistory)!;

      const tab2 = tabs.querySelector<HTMLElement>('#historyTab2')!;

      tab2.click();

      await tabs.updateComplete;
      const urlSearchParams = new URLSearchParams(window.location.search);
      expect(urlSearchParams.get('history')).to.equal('historyTab2');
      expect(tabs.selectedIndex).to.equal(1);
      expect(tab2.hasAttribute('aria-selected')).to.be.true;
    });

    it('should stop updating the URL if the tab-history attribute is removed', async function() {
      // this test builds on the previous test
      const tabs = await createFixture<PfeTabs>(TEMPLATES.history)!;
      const tab1 = tabs.querySelector<HTMLElement>('#historyTab1')!;

      tabs.tabHistory = false;

      await aTimeout(10);

      tab1.click();

      await aTimeout(10);

      const urlSearchParams = new URLSearchParams(window.location.search);
      expect(urlSearchParams.get('history')).to.equal('historyTab2');
      expect(tabs.selectedIndex).to.equal(0);
      expect(tab1.hasAttribute('aria-selected')).to.be.true;
    });
  });
});
