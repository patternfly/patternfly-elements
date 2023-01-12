import { expect, nextFrame, html, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { PfeJumpLinks } from '@patternfly/pfe-jump-links';
import { PfeJumpLinksItem } from '../pfe-jump-links-item';
import { PfeJumpLinksList } from '../pfe-jump-links-list';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pfe-jump-links>', function() {
  let element: PfeJumpLinks;

  beforeEach(async function() {
    element = await createFixture<PfeJumpLinks>(html`
      <pfe-jump-links>
        <pfe-jump-links-item id="first">Inactive section</pfe-jump-links-item>
        <pfe-jump-links-item id="second">Active section</pfe-jump-links-item>
        <pfe-jump-links-item id="third">Inactive section</pfe-jump-links-item>
      </pfe-jump-links>
    `);
  });

  it('should change focus when keyboard navigation is used', async function() {
    await element.updateComplete;
    const firstItem = element.querySelector('pfe-jump-links-item:first-of-type') as HTMLElement;
    const secondItem = element.querySelector('pfe-jump-links-item:nth-of-type(2)')?.id;
    firstItem?.focus();
    const initial = document.activeElement?.id;
    await sendKeys({ down: 'ArrowRight' });
    await nextFrame();
    const after = document.activeElement?.id;
    expect(initial).to.not.equal(after);
    expect(secondItem).to.equal(after);
  });
});

describe('<pfe-jump-links-item>', function() {
  let element: PfeJumpLinksItem;

  beforeEach(async function() {
    element = await createFixture<PfeJumpLinksItem>(html`
      <pfe-jump-links-item></pfe-jump-links-item>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
      .to.be.an.instanceof(customElements.get('pfe-jump-links-item'))
      .and
      .to.be.an.instanceof(PfeJumpLinksItem);
  });
});

describe('<pfe-jump-links-list>', function() {
  let element: PfeJumpLinksList;

  beforeEach(async function() {
    element = await createFixture<PfeJumpLinks>(html`
      <pfe-jump-links-list></pfe-jump-links-list>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
      .to.be.an.instanceof(customElements.get('pfe-jump-links-list'))
      .and
      .to.be.an.instanceof(PfeJumpLinksList);
  });
});
