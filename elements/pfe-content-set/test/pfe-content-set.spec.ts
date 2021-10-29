import type { PfeTabs } from '@patternfly/pfe-tabs';
import type { PfeTab } from '@patternfly/pfe-tabs/pfe-tab';

import { expect, html, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';

import { PfeContentSet } from '@patternfly/pfe-content-set';
import { PfeTabPanel } from '@patternfly/pfe-tabs/pfe-tab-panel';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const template = html`
  <pfe-content-set id="default">
    <h2 pfe-content-set--header="" id="heading1">Heading 1</h2>
    <p pfe-content-set--panel="">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.</p>
    <h2 pfe-content-set--header="" id="heading2">Heading 2</h2>
    <p pfe-content-set--panel="">Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.</p>
    <h2 pfe-content-set--header="" id="heading3">Heading 3</h2>
    <p pfe-content-set--panel="">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore
      dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd
      magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
      amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat.</p>
  </pfe-content-set>`;

describe('<pfe-content-set>', function() {
  it('should upgrade', async function() {
    const pfeContentSet = await createFixture<PfeContentSet>(template);

    expect(pfeContentSet, 'pfe-content-set should be an instance of PfeContentSet')
      .to.be.an.instanceOf(customElements.get('pfe-content-set'))
      .and
      .to.be.an.instanceOf(PfeContentSet);
  });

  it('should have the proper attributes for tabs', async function() {
    const pfeContentSet = await createFixture<PfeContentSet>(template);
    const pfeTabs = pfeContentSet.view! as PfeTabs;

    const firstHeader = pfeTabs.querySelector<PfeTab>('pfe-tab:nth-child(1)')!;
    const thirdHeader = pfeTabs.querySelector<PfeTab>('pfe-tab:nth-child(5)')!;
    const panel = pfeTabs.querySelector<PfeTabPanel>('pfe-tab-panel')!;

    await pfeTabs.updateComplete;
    await firstHeader.updateComplete;
    await thirdHeader.updateComplete;
    await panel.updateComplete;

    expect(firstHeader.hasAttribute('aria-controls')).to.be.true;
    expect(firstHeader.getAttribute('tabindex')).to.equal('0');
    expect(firstHeader.getAttribute('aria-selected')).to.equal('true');

    expect(thirdHeader.hasAttribute('aria-controls')).to.be.true;
    expect(thirdHeader.getAttribute('tabindex')).to.equal('-1');
    expect(thirdHeader.getAttribute('aria-selected')).to.equal('false');

    expect(panel.hasAttribute('aria-labelledby')).to.be.true;
  });

  describe('on a small screen', function() {
    beforeEach(async function() {
      await setViewport({ width: 600, height: 800 });
    });

    it('should be an accordion', async function() {
      const element = await createFixture<PfeContentSet>(template);

      const pfeAccordion = element.view!;

      const firstHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(1)')!;
      const firstPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)')!;
      const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)')!;
      const thirdHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(3)')!;

      await aTimeout(50);

      expect(firstHeader.hasAttribute('aria-controls')).to.be.true;
      expect(firstPanel.hasAttribute('aria-labelledby')).to.be.true;
      expect(secondPanel.hasAttribute('aria-labelledby')).to.be.true;
      expect(thirdHeader.hasAttribute('aria-controls')).to.be.true;
    });
  });
});
