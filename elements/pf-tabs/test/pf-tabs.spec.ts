import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

import { PfTabs } from '../pf-tabs.js';
import { PfTab } from '../pf-tab.js';
import { PfTabPanel } from '../pf-tab-panel.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

const TEMPLATE = html`
    <pf-tabs>
      <pf-tab slot="tab">Users</pf-tab>
      <pf-tab-panel>Users</pf-tab-panel>
      <pf-tab slot="tab">Containers</pf-tab>
      <pf-tab-panel>Containers</pf-tab-panel>
      <pf-tab slot="tab">Database</pf-tab>
      <pf-tab-panel>Database</pf-tab-panel>
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
  let element: PfTabs;
  let tab: PfTab;
  let panel: PfTabPanel;

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

  describe('default behavior', function() {
    let tabs: PfTab[];
    let tab: PfTab;
    let panels: PfTabPanel[];
    let panel: PfTabPanel;

    beforeEach(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      await allUpdates(element);
      tabs = Array.from(element.querySelectorAll('pf-tab')!);
      [tab] = tabs;
      panels = Array.from(element.querySelectorAll('pf-tab-panel')!);
      [panel] = panels;
    });

    it('should apply aria attributes on initialization', function() {
      tabs.forEach(function(tab: Element, index: number) {
        const tabId = tab.getAttribute('id');
        const tabControls = tab.getAttribute('aria-controls');
        panels.forEach(function(panel: Element, pindex: number) {
          if (index === pindex) {
            expect(panel.getAttribute('aria-labelledby')).to.equal(tabId);
            expect(panel.id).to.equal(tabControls);
          }
        });
      });
    });

    it('should activate the first focusable tab', function() {
      expect(tab.hasAttribute('active')).to.equal(true);
    });

    it('should activate the first tab panel', function() {
      expect(panel.hasAttribute('hidden')).to.equal(false);
    });
  });

  describe('with `vertical` attribute', function() {
    beforeEach(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      element.setAttribute('vertical', '');
      await allUpdates(element);
    });

    it('should have vertical styles', function() {
      const tabs = element.shadowRoot!.querySelector('[part="tabs"]')!;
      const tabsVerticalStyles = getComputedStyle(tabs).flexDirection;
      expect(tabsVerticalStyles).to.be.equal('column');
    });
  });

  describe('when a tab is set `active`', function() {
    let previousTab: PfTab;
    let previousPanel: PfTabPanel;

    beforeEach(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      tab = element.querySelector('pf-tab:nth-of-type(2)')!;
      tab.active = true;
      await allUpdates(element);
      panel = element.querySelector('pf-tab-panel:nth-of-type(2)')!;
      previousTab = element.querySelector('pf-tab:first-of-type')!;
      previousPanel = element.querySelector('pf-tab-panel:first-of-type')!;
    });

    it('should activate the tab', function() {
      expect(tab.hasAttribute('active')).to.be.true;
    });

    it('should activate its panel', function() {
      expect(panel.hasAttribute('hidden')).to.be.false;
    });

    it('should deactivate previously active tab', function() {
      expect(previousTab.hasAttribute('active')).to.be.false;
    });

    it('should hide previously active panel', function() {
      expect(previousPanel.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('when `activeIndex` is set', function() {
    let snapshot: A11yTreeSnapshot;
    let index: number;
    before(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      index = 2;
      element.activeIndex = index;
      await allUpdates(element);
      tab = element.querySelector('pf-tab:nth-of-type(3)')!;
      snapshot = await a11ySnapshot();
    });

    it('should activate the tab', function() {
      expect(tab.hasAttribute('active')).to.be.true;
    });

    it('should activate its panel', function() {
      expect(panel.hasAttribute('hidden')).to.be.false;
      expect(snapshot.children?.find(x => x.role === 'tabpanel')?.name).to.equal('Database');
    });
  });

  describe('when a tab is `disabled`', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      tab = element.querySelector('pf-tab')!;
      tab.disabled = true;
      await allUpdates(element);
      snapshot = await a11ySnapshot();
    });

    it('should disable the button', function() {
      const [disabledTab] = snapshot.children!;
      const tabButton = disabledTab.children!.find(x => x.role === 'button')!;
      expect(tabButton.disabled).to.equal(true);
    });

    describe('when clicked', function() {
      beforeEach(async function() {
        tab.click();
        await nextFrame();
      });

      it('should not activate', function() {
        expect(tab.hasAttribute('active')).to.be.false;
      });
    });

    describe('when activeIndex is set to disabled tab', function() {
      beforeEach(async function() {
        element.activeIndex = 0;
        await allUpdates(element);
      });

      it('should not activate', function() {
        expect(tab.hasAttribute('active')).to.be.false;
      });
    });
  });

  describe('when no active tab is given and the first tab is disabled', function() {
    let secondTab: PfTab;
    beforeEach(async function() {
      element = await createFixture<PfTabs>(DISABLED);
      await allUpdates(element);
      secondTab = element.querySelector('pf-tab:nth-of-type(2)')!;
    });

    it('should activate the next focusable tab', function() {
      expect(secondTab.hasAttribute('active')).to.equal(true);
    });
  });

  describe('when viewed in a small viewport', function() {
    beforeEach(async function() {
      await setViewport({ width: 240, height: 640 });
      element = await createFixture<PfTabs>(TEMPLATE);
      await allUpdates(element);
    });

    it('should have visible scroll buttons if overflowed', function() {
      /**
       * Note: overflow buttons are not included in the accessibility tree otherwise we'd test
       * for buttons there. tabindex="-1" is used on the buttons to prevent focus and was a
       * decision made to keep logical keyboard navigation order flow between tabs and panels
       * as the next overflow button exists in the DOM between the tabs container and the open panel
       * and would disrupt the expected flow. For keyboard users they are able to scroll using the
       * left and right arrows keys and do not need direct access to the overflow buttons but still
       * exist as visual cues for which direction is overflowed
       **/
      const previousTab = element.shadowRoot!.querySelector('#previousTab')!;
      const nextTab = element.shadowRoot!.querySelector('#nextTab')!;
      expect(previousTab).to.not.be.null;
      expect(nextTab).to.not.be.null;
      const prevDisplayStyle = getComputedStyle(previousTab).display;
      const nextDisplayStyle = getComputedStyle(nextTab).display;
      expect(prevDisplayStyle ).to.not.equal('none');
      expect(nextDisplayStyle).to.not.equal('none');
    });
  });

  describe(`when navigated by keyboard`, function() {
    let nextTab: PfTab;
    let afterKeyPress: Element | null;

    describe('when pressing the right arrow key from first tab', function() {
      beforeEach(async function() {
        element = await createFixture<PfTabs>(TEMPLATE);
        await allUpdates(element);
        tab = element.querySelector('pf-tab:first-of-type')!;
        tab.focus();
        await allUpdates(element);
        await sendKeys({ down: 'ArrowRight' });
        await allUpdates(element);
        afterKeyPress = document.activeElement;
        nextTab = element.querySelector('pf-tab:nth-of-type(2)')!;
      });

      it('should activate the next tab', function() {
        expect(nextTab.hasAttribute('active')).to.be.true;
        expect(afterKeyPress).to.equal(nextTab);
      });
    });

    describe('when pressing the left arrow key from first tab', function() {
      beforeEach(async function() {
        element = await createFixture<PfTabs>(TEMPLATE);
        await allUpdates(element);
        tab = element.querySelector('pf-tab:first-of-type')!;
        tab.focus();
        await allUpdates(element);
        await sendKeys({ down: 'ArrowLeft' });
        await allUpdates(element);
        afterKeyPress = document.activeElement;
        nextTab = element.querySelector('pf-tab:last-of-type')!;
      });

      it('should activate the last tab', function() {
        expect(nextTab.hasAttribute('active')).to.be.true;
        expect(afterKeyPress).to.equal(nextTab);
      });
    });

    describe('when pressing the right arrow key from last tab', function() {
      beforeEach(async function() {
        element = await createFixture<PfTabs>(TEMPLATE);
        await allUpdates(element);
        tab = element.querySelector('pf-tab:last-of-type')!;
        tab.focus();
        await allUpdates(element);
        await sendKeys({ down: 'ArrowRight' });
        await allUpdates(element);
        afterKeyPress = document.activeElement;
        nextTab = element.querySelector('pf-tab:first-of-type')!;
      });

      it('should activate the last tab', function() {
        expect(nextTab.hasAttribute('active')).to.be.true;
        expect(afterKeyPress).to.equal(nextTab);
      });
    });
  });

  describe('when `manual` attribute is set', function() {
    let element: PfTabs;
    let firstTab: PfTab;
    let secondTab: PfTab;
    let initialFocus: Element | null;
    let afterFocus: Element | null;

    beforeEach(async function() {
      element = await createFixture<PfTabs>(TEMPLATE);
      element.manual = true;
      await allUpdates(element);
      [firstTab, secondTab] = element.querySelectorAll('pf-tab');
      initialFocus = document.activeElement;
    });

    describe('pressing right arrow key', function() {
      beforeEach(async function() {
        firstTab?.focus(); // ensure focus on first tab
        await sendKeys({ down: 'ArrowRight' });
        await allUpdates(element);
        afterFocus = document.activeElement;
      });

      it('should not activate second tab', function() {
        expect(firstTab.active).to.be.true;
        expect(secondTab.active).to.be.false;
        expect(initialFocus).to.be.ok
          .and.to.not.equal(afterFocus);
        expect(initialFocus).to.not.equal(secondTab);
      });

      describe('pressing enter key', function() {
        beforeEach(async function() {
          await sendKeys({ down: 'Enter' });
          await allUpdates(element);
          afterFocus = document.activeElement;
        });

        it('should activate second tab', function() {
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
