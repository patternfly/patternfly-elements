import type { SinonStub } from 'sinon';

import { sendKeys } from '@web/test-runner-commands';
import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfClipboardCopy } from '@patternfly/elements/pf-clipboard-copy/pf-clipboard-copy.js';

import { stub } from 'sinon';

describe('<pf-clipboard-copy>', function() {
  let element: PfClipboardCopy;
  beforeEach(function stubCopy() {
    stub(navigator.clipboard, 'writeText');
  });

  afterEach(function restoreCopy() {
    (navigator.clipboard.writeText as SinonStub).restore();
  });

  beforeEach(async function() {
    element = await createFixture<PfClipboardCopy>(html`
      <pf-clipboard-copy></pf-clipboard-copy>
    `);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-clipboard-copy');
    expect(element)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfClipboardCopy);
  });

  describe('setting value attribute', function() {
    const VALUE = 'another copy item!';
    beforeEach(async function() {
      element.setAttribute('value', VALUE);
      await element.updateComplete;
    });
    describe('then calling copy()', function() {
      beforeEach(async function() {
        await element.copy();
      });
      it('should copy the new value.', function() {
        expect(navigator.clipboard.writeText).to.have.been.calledWith(VALUE);
      });
    });
  });

  describe('setting readonly attribute', function() {
    const VALUE = 'HI';
    beforeEach(async function() {
      element.toggleAttribute('readonly', true);
      await element.updateComplete;
    });
    describe('then focusing the element and typing', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ type: VALUE });
      });
      describe('then calling copy', function() {
        beforeEach(async function() {
          await element.copy();
        });
        it('should not include the new value', async function() {
          expect(navigator.clipboard.writeText).to.not.have.been.calledWith(VALUE);
        });
      });
    });
  });

  describe('setting expandable value', function() {
    let initialHeight: number;
    let initialFocus: Element;
    const VALUE = 'Hello!';
    beforeEach(async function() {
      element.toggleAttribute('expandable', true);
      await element.updateComplete;
      initialHeight = element.getBoundingClientRect().height;
    });
    describe('then focusing the element and pressing SPACE', function() {
      beforeEach(async function() {
        element.focus();
        initialFocus = element.shadowRoot!.activeElement!;
        await sendKeys({ press: ' ' });
      });
      it('it should be expanded', async function() {
        expect(element.getBoundingClientRect().height).to.be.greaterThan(initialHeight);
      });
      describe('then focusing the textarea', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await sendKeys({ press: 'Tab' });
        });
        it('focuses a different element', function() {
          expect(element.shadowRoot?.activeElement).to.not.equal(initialFocus);
        });
        describe('then typing', function() {
          beforeEach(async function() {
            await sendKeys({ type: VALUE });
          });
          it('updates the value property', function() {
            expect(element.value).to.equal(VALUE);
          });
        });
      });
    });
  });
});
