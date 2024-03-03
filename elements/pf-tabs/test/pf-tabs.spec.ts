import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

import { PfTabs } from '../pf-tabs.js';
import { PfTab } from '../pf-tab.js';
import { PfTabPanel } from '../pf-tab-panel.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-tabs>', function() {
  it('instantiates imperatively', function() {
    expect(document.createElement('pf-tabs')).to.be.an.instanceof(PfTabs);
    expect(document.createElement('pf-tab')).to.be.an.instanceof(PfTab);
    expect(document.createElement('pf-tab-panel')).to.be.an.instanceof(PfTabPanel);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfTabs>(html`<pf-tabs></pf-tabs>`);
    expect(el, 'pf-tabs should be an instance of PfeTabs')
      .to.be.an.instanceOf(customElements.get('pf-tabs'))
      .and
      .to.be.an.instanceOf(PfTabs);
  });

  describe('with three valid tab pairs', function() {
    let element: PfTabs;

    const updateComplete = () => allUpdates(element);

    beforeEach(async function() {
      element = await createFixture<PfTabs>(html`
        <pf-tabs>
          <pf-tab slot="tab">tab-1</pf-tab>
          <pf-tab-panel>panel-1</pf-tab-panel>
          <pf-tab slot="tab">tab-2</pf-tab>
          <pf-tab-panel>panel-2</pf-tab-panel>
          <pf-tab slot="tab">tab-3</pf-tab>
          <pf-tab-panel>panel-3</pf-tab-panel>
        </pf-tabs>
      `);
    });

    beforeEach(updateComplete);

    it('should apply aria attributes on initialization', function() {
      const tabs = element.querySelectorAll('pf-tab');
      const panels = element.querySelectorAll('pf-tab-panel');
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

    describe('pressing Tab', function() {
      beforeEach(press('Tab'));
      beforeEach(nextFrame);
      it('should activate the first focusable tab', function() {
        expect(element.querySelector('pf-tab')).to.have.attribute('active');
      });

      it('should activate the first tab panel', function() {
        expect(element.querySelector('pf-tab')).to.not.have.attribute('hidden');
      });
    });

    describe('setting the `vertical` attribute', function() {
      beforeEach(function() {
        element.setAttribute('vertical', '');
      });

      beforeEach(updateComplete);

      it('should have vertical styles', function() {
        // WARNING: asserting on shadow root content;
        const tabs = element.shadowRoot!.querySelector('[part="tabs"]')!;
        const tabsVerticalStyles = getComputedStyle(tabs).flexDirection;
        expect(tabsVerticalStyles).to.be.equal('column');
      });
    });

    describe('setting the second tab\'s `active` attribute', function() {
      beforeEach(function() {
        const [, tab] = element.querySelectorAll('pf-tab');
        tab!.active = true;
      });

      beforeEach(updateComplete);
      beforeEach(nextFrame);

      it('should activate the second tab', function() {
        const [, tab] = element.querySelectorAll('pf-tab');
        expect(tab).to.have.attribute('active');
      });

      it('should activate its panel', function() {
        const [, tab] = element.querySelectorAll('pf-tab');
        expect(tab).to.not.have.attribute('hidden');
      });

      it('should deactivate previously active tab', function() {
        expect(element.querySelector('pf-tab')).to.not.have.attribute('active');
      });

      it('should hide previously active panel', function() {
        expect(element.querySelector('pf-tab-panel')).to.have.attribute('hidden');
      });
    });

    describe('setting `activeIndex` to 2', function() {
      beforeEach(function() {
        element.activeIndex = 2;
      });

      beforeEach(updateComplete);
      beforeEach(nextFrame);

      it('should activate the third tab', function() {
        const [,, tab] = element.querySelectorAll('pf-tab');
        expect(tab).to.have.attribute('active');
      });

      it('should activate the third panel', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.find(x => x.role === 'tabpanel')?.name).to.equal('tab-3');
      });

      describe('then setting the first tab\'s `disabled` attribute', function() {
        beforeEach(async function() {
        element.querySelector('pf-tab')!.disabled = true;
        });

        beforeEach(updateComplete);

        it('should disable the button', async function() {
          const snapshot = await a11ySnapshot();
          const disabledTab = snapshot.children?.find(x => x.role === 'tab' && x.disabled);
          expect(disabledTab).to.be.ok;
        });

        describe('and clicking the disabled tab', function() {
          beforeEach(async function() {
          element.querySelector('pf-tab')!.click();
          });

          beforeEach(updateComplete);

          it('should not activate', function() {
            const [first] = element.querySelectorAll('pf-tab');
            expect(first).to.not.have.attribute('active');
          });

          it('should present the third panel to the ax tree', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.find(x => x.role === 'tabpanel')?.name).to.equal('tab-3');
          });
        });

        describe('then setting `activeIndex` to 0 (i.e. the disabled tab\'s index)', function() {
          beforeEach(function() {
            element.activeIndex = 0;
          });

          beforeEach(updateComplete);

          it('should not activate the first tab', function() {
            expect(element.querySelector('pf-tab')).to.not.have.attribute('active');
          });

          it('should present the third panel to the ax tree', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.find(x => x.role === 'tabpanel')?.name).to.equal('tab-3');
          });
        });
      });
    });

    describe('when viewed in a small viewport', function() {
      beforeEach(async function() {
        // this is a comically narrow viewport, but our tabs have quite short
        // labels, so viewport must be itsy-pitsy in order to cause overflow
        await setViewport({ width: 100, height: 640 });
      });

      beforeEach(updateComplete);

      it('should have visible scroll buttons if overflowed', async function() {
        // Note: overflow buttons are not included in the accessibility tree otherwise we'd test
        // for buttons there. tabindex="-1" is used on the buttons to prevent focus and was a
        // decision made to keep logical keyboard navigation order flow between tabs and panels
        // as the next overflow button exists in the DOM between the tabs container and the open panel
        // and would disrupt the expected flow. For keyboard users they are able to scroll using the
        // left and right arrows keys and do not need direct access to the overflow buttons but still
        // exist as visual cues for which direction is overflowed
        const snapshot = await a11ySnapshot();
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
      describe('when focused on the first tab', function() {
        beforeEach(async function() {
          element.querySelector('pf-tab')!.focus();
        });

        describe('pressing ArrowRight', function() {
          beforeEach(async function() {
            await sendKeys({ down: 'ArrowRight' });
          });

          beforeEach(updateComplete);

          it('should activate the next tab', function() {
            const [first, second, third] = element.querySelectorAll('pf-tab');
            expect(first).to.not.have.attribute('active');
            expect(second).to.have.attribute('active');
            expect(third).to.not.have.attribute('active');
          });
        });

        describe('pressing ArrowLeft', function() {
          beforeEach(async function() {
            await sendKeys({ down: 'ArrowLeft' });
          });

          it('should activate the last tab', function() {
            const [first, second, third] = element.querySelectorAll('pf-tab');
            expect(first).to.not.have.attribute('active');
            expect(second).to.not.have.attribute('active');
            expect(third).to.have.attribute('active');
          });
          describe('then pressing ArrowRight', function() {
            beforeEach(async function() {
              await sendKeys({ down: 'ArrowRight' });
            });

            beforeEach(updateComplete);

            it('should activate the first tab', function() {
              const [first, second, third] = element.querySelectorAll('pf-tab');
              expect(first).to.have.attribute('active');
              expect(second).to.not.have.attribute('active');
              expect(third).to.not.have.attribute('active');
            });
          });
        });
      });
    });

    describe('setting the `manual` attribute', function() {
      beforeEach(function() {
        element.setAttribute('manual', '');
      });

      beforeEach(updateComplete);

      describe('pressing Tab', function() {
        beforeEach(press('Tab'));
        describe('pressing ArrowRight key', function() {
          beforeEach(press('ArrowRight'));

          beforeEach(updateComplete);

          it('should not activate second tab', function() {
            const [first, second, third] = element.querySelectorAll('pf-tab');
            expect(first).to.have.attribute('active');
            expect(second).to.not.have.attribute('active');
            expect(third).to.not.have.attribute('active');
          });

          it('should focus the second tab', function() {
            const [, second] = element.querySelectorAll('pf-tab');
            expect(document.activeElement).to.equal(second);
          });

          describe('pressing enter key', function() {
            beforeEach(press('Enter'));

            beforeEach(updateComplete);

            it('should activate second tab', function() {
              const [first, second, third] = element.querySelectorAll('pf-tab');
              expect(first).to.not.have.attribute('active');
              expect(second).to.have.attribute('active');
              expect(third).to.not.have.attribute('active');
              expect(document.activeElement).to.equal(second);
            });
          });
        });
      });
    });
  });

  describe('when no active tab is given and the first tab is disabled', function() {
    let element: PfTabs;

    beforeEach(async function() {
      element = await createFixture<PfTabs>(html`
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
      `);
    });

    it('should activate the next focusable tab', function() {
      const [, second] = element.querySelectorAll('pf-tab');
      expect(second).to.have.attribute('active');
    });
  });
});
