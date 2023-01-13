import type { ReactiveElement } from 'lit';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfeJumpLinks } from '@patternfly/pfe-jump-links';
import { PfeJumpLinksItem } from '../pfe-jump-links-item';
import { PfeJumpLinksList } from '../pfe-jump-links-list';

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
    await allUpdates(element);
  });

  describe('tabbing to first item', function() {
    let firstItem: PfeJumpLinksItem;
    let secondItem: PfeJumpLinksItem;
    let initialActiveElement: Element|null;
    beforeEach(async function() {
      [firstItem, secondItem] = element.querySelectorAll<PfeJumpLinksItem>('pfe-jump-links-item');
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
        expect(document.activeElement).to.be.an.instanceof(PfeJumpLinksItem);
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
