import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV5JumpLinks } from '../pf-v5-jump-links.js';
import { PfV5JumpLinksItem } from '../pf-v5-jump-links-item.js';
import { PfV5JumpLinksList } from '../pf-v5-jump-links-list.js';

import '@patternfly/pfe-tools/test/stub-logger.js';
import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

describe('<pf-v5-jump-links>', function() {
  let element: PfV5JumpLinks;
  let firstItem: PfV5JumpLinksItem;
  let secondItem: PfV5JumpLinksItem;

  beforeEach(async function() {
    element = await createFixture<PfV5JumpLinks>(html`
      <pf-v5-jump-links>
        <pf-v5-jump-links-item id="first">Inactive section</pf-v5-jump-links-item>
        <pf-v5-jump-links-item id="second" active>Active section</pf-v5-jump-links-item>
        <pf-v5-jump-links-item id="third">Inactive section</pf-v5-jump-links-item>
      </pf-v5-jump-links>
    `);
    await allUpdates(element);
    [firstItem, secondItem] = element.querySelectorAll<PfV5JumpLinksItem>('pf-v5-jump-links-item');
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-jump-links')).to.be.an.instanceof(PfV5JumpLinks);
    expect(document.createElement('pf-v5-jump-links-item')).to.be.an.instanceof(PfV5JumpLinksItem);
    expect(document.createElement('pf-v5-jump-links-list')).to.be.an.instanceof(PfV5JumpLinksList);
  });

  describe('tabbing to first item', function() {
    let initialActiveElement: Element | null;
    beforeEach(async function() {
      initialActiveElement = document.activeElement;
      await sendKeys({ press: 'Tab' });
      await nextFrame();
    });

    it('should focus the first jump-links-item', function() {
      expect(document.activeElement).to.equal(firstItem);
    });

    describe('pressing right arrow key', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'ArrowRight' });
        await allUpdates(element);
        await nextFrame();
      });
      it('should focus a jump-links-item', function() {
        expect(document.activeElement).to.be.an.instanceof(PfV5JumpLinksItem);
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

describe('<pf-v5-jump-links-item>', function() {
  let element: PfV5JumpLinksItem;

  beforeEach(async function() {
    element = await createFixture<PfV5JumpLinksItem>(html`
      <pf-v5-jump-links-item></pf-v5-jump-links-item>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
        .to.be.an.instanceof(customElements.get('pf-v5-jump-links-item'))
        .and
        .to.be.an.instanceof(PfV5JumpLinksItem);
  });
});

describe('<pf-v5-jump-links-list>', function() {
  let element: PfV5JumpLinksList;

  beforeEach(async function() {
    element = await createFixture<PfV5JumpLinks>(html`
      <pf-v5-jump-links-list></pf-v5-jump-links-list>
    `);
  });

  it('should upgrade', async function() {
    expect(element)
        .to.be.an.instanceof(customElements.get('pf-v5-jump-links-list'))
        .and
        .to.be.an.instanceof(PfV5JumpLinksList);
  });
});
