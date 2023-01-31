import type { ReactiveElement } from 'lit';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfJumpLinks } from '@patternfly/elements/pf-jump-links/pf-jump-links.js';
import { PfJumpLinksItem } from '../pf-jump-links-item.js';
import { PfJumpLinksList } from '../pf-jump-links-list.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

async function allUpdates(element: ReactiveElement) {
  let count = 0;
  do {
    if (count > 100) {
      throw new Error('Too Many Updates');
    }
    await element.updateComplete;
    count++;
  } while (!await element.updateComplete);
}

describe('<pf-jump-links>', function() {
  let element: PfJumpLinks;

  beforeEach(async function() {
    element = await createFixture<PfJumpLinks>(html`
      <pf-jump-links>
        <pf-jump-links-item id="first">Inactive section</pf-jump-links-item>
        <pf-jump-links-item id="second">Active section</pf-jump-links-item>
        <pf-jump-links-item id="third">Inactive section</pf-jump-links-item>
      </pf-jump-links>
    `);
    await allUpdates(element);
  });

  describe('tabbing to first item', function() {
    let firstItem: PfJumpLinksItem;
    let secondItem: PfJumpLinksItem;
    let initialActiveElement: Element|null;
    beforeEach(async function() {
      [firstItem, secondItem] = element.querySelectorAll<PfJumpLinksItem>('pf-jump-links-item');
      await sendKeys({ press: 'Tab' });
      initialActiveElement = document.activeElement;
    });

    it('should focus a this first jump-links-item', function() {
      expect(document.activeElement).to.equal(firstItem);
    });

    describe('pressing right arrow key', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'ArrowRight' });
        await allUpdates(element);
        await nextFrame();
      });
      it('should focus a jump-links-item', function() {
        expect(document.activeElement).to.be.an.instanceof(PfJumpLinksItem);
      });
      it('should change focus when keyboard navigation is used', function() {
        expect(document.activeElement).to.not.equal(initialActiveElement);
      });
      it('should focus the second jump links item', function() {
        expect(document.activeElement).to.equal(secondItem);
      });
    });
  });
});

describe('<pf-jump-links-item>', function() {
  let element: PfJumpLinksItem;

  beforeEach(async function() {
    element = await createFixture<PfJumpLinksItem>(html`
      <pf-jump-links-item></pf-jump-links-item>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
      .to.be.an.instanceof(customElements.get('pf-jump-links-item'))
      .and
      .to.be.an.instanceof(PfJumpLinksItem);
  });
});

describe('<pf-jump-links-list>', function() {
  let element: PfJumpLinksList;

  beforeEach(async function() {
    element = await createFixture<PfJumpLinks>(html`
      <pf-jump-links-list></pf-jump-links-list>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
      .to.be.an.instanceof(customElements.get('pf-jump-links-list'))
      .and
      .to.be.an.instanceof(PfJumpLinksList);
  });
});
