import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeJumpLinks } from '@patternfly/pfe-jump-links';
import { PfeJumpLinksItem } from '../pfe-jump-links-item';
import { PfeJumpLinksList } from '../pfe-jump-links-list';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pfe-jump-links>', function() {
  let element: PfeJumpLinks;

  beforeEach(async function() {
    element = await createFixture<PfeJumpLinks>(html`
      <pfe-jump-links></pfe-jump-links>
    `);
  });

  it('should upgrade', async function() {
    expect(element, 'the <pfe-jump-links> should be an instance of PfeJumpLinks')
      .to.be.an.instanceof(customElements.get('pfe-jump-links'))
      .and
      .to.be.an.instanceof(PfeJumpLinks);
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
