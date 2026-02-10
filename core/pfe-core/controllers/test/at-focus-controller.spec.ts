import { expect, fixture } from '@open-wc/testing';
import { customElement } from 'lit/decorators/custom-element.js';
import { LitElement, html } from 'lit';

import { RovingTabindexController } from '../roving-tabindex-controller.js';

@customElement('x-at-focus-test')
class TestElement extends LitElement {
  controller = RovingTabindexController.of(this, {
    getItems: () => [...this.querySelectorAll<HTMLElement>('.item')],
  });

  protected override render() {
    return html`<slot></slot>`;
  }
}

describe('ATFocusController', function() {
  describe('atFocusedItemIndex', function() {
    describe('with all items focusable', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item">0</div>
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
          </x-at-focus-test>
        `);
      });

      it('initializes to first item', function() {
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });

      it('sets to a valid index', function() {
        element.controller.atFocusedItemIndex = 3;
        expect(element.controller.atFocusedItemIndex).to.equal(3);
      });

      it('wraps to last item when navigating before start', function() {
        element.controller.atFocusedItemIndex = 0;
        element.controller.atFocusedItemIndex--;
        const { items } = element.controller;
        expect(items.at(element.controller.atFocusedItemIndex))
            .to.equal(items[4]);
      });

      it('wraps to first item when navigating past end', function() {
        element.controller.atFocusedItemIndex = 4;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });
    });

    describe('with non-focusable placeholder at index 0', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item" aria-hidden="true">Placeholder</div>
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
          </x-at-focus-test>
        `);
      });

      it('initializes to first focusable item', function() {
        expect(element.controller.atFocusedItemIndex).to.equal(1);
      });

      it('wraps to last when navigating up from first focusable', function() {
        element.controller.atFocusedItemIndex = 1;
        element.controller.atFocusedItemIndex--;
        expect(element.controller.atFocusedItemIndex).to.equal(4);
      });

      it('snaps to first focusable when set to placeholder from elsewhere', function() {
        element.controller.atFocusedItemIndex = 3;
        element.controller.atFocusedItemIndex = 0;
        expect(element.controller.atFocusedItemIndex).to.equal(1);
      });

      it('wraps to first focusable when navigating past end', function() {
        element.controller.atFocusedItemIndex = 4;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(1);
      });
    });

    describe('with mid-list non-focusable items', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item">A</div>
            <div class="item" aria-hidden="true">X</div>
            <div class="item">B</div>
            <div class="item" aria-hidden="true">Y</div>
            <div class="item">C</div>
          </x-at-focus-test>
        `);
      });

      it('scans forward past non-focusable item', function() {
        element.controller.atFocusedItemIndex = 0;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(2);
      });

      it('scans backward past non-focusable item', function() {
        element.controller.atFocusedItemIndex = 2;
        element.controller.atFocusedItemIndex--;
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });

      it('scans forward past second non-focusable item', function() {
        element.controller.atFocusedItemIndex = 2;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(4);
      });

      it('scans backward past second non-focusable item', function() {
        element.controller.atFocusedItemIndex = 4;
        element.controller.atFocusedItemIndex--;
        expect(element.controller.atFocusedItemIndex).to.equal(2);
      });
    });

    describe('with consecutive non-focusable items', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item">A</div>
            <div class="item" aria-hidden="true">X</div>
            <div class="item" aria-hidden="true">Y</div>
            <div class="item">B</div>
          </x-at-focus-test>
        `);
      });

      it('scans forward past two consecutive non-focusable items', function() {
        element.controller.atFocusedItemIndex = 0;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(3);
      });

      it('scans backward past two consecutive non-focusable items', function() {
        element.controller.atFocusedItemIndex = 3;
        element.controller.atFocusedItemIndex--;
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });
    });

    describe('with non-focusable tail', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item">A</div>
            <div class="item">B</div>
            <div class="item" aria-hidden="true">X</div>
            <div class="item" aria-hidden="true">Y</div>
          </x-at-focus-test>
        `);
      });

      it('wraps to first when navigating forward into non-focusable tail', function() {
        element.controller.atFocusedItemIndex = 1;
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });

      it('wraps to last focusable when navigating backward into non-focusable head', async function() {
        const el: TestElement = await fixture(html`
          <x-at-focus-test>
            <div class="item" aria-hidden="true">X</div>
            <div class="item" aria-hidden="true">Y</div>
            <div class="item">A</div>
            <div class="item">B</div>
          </x-at-focus-test>
        `);
        el.controller.atFocusedItemIndex = 2;
        el.controller.atFocusedItemIndex--;
        expect(el.controller.atFocusedItemIndex).to.equal(3);
      });
    });

    describe('with only one focusable item', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item" aria-hidden="true">X</div>
            <div class="item">A</div>
            <div class="item" aria-hidden="true">Y</div>
          </x-at-focus-test>
        `);
      });

      it('stays on sole focusable item when navigating forward', function() {
        expect(element.controller.atFocusedItemIndex).to.equal(1);
        element.controller.atFocusedItemIndex++;
        expect(element.controller.atFocusedItemIndex).to.equal(1);
      });

      it('stays on sole focusable item when navigating backward', function() {
        expect(element.controller.atFocusedItemIndex).to.equal(1);
        element.controller.atFocusedItemIndex--;
        expect(element.controller.atFocusedItemIndex).to.equal(1);
      });
    });

    describe('with no focusable items', function() {
      let element: TestElement;

      beforeEach(async function() {
        element = await fixture(html`
          <x-at-focus-test>
            <div class="item" aria-hidden="true">X</div>
            <div class="item" aria-hidden="true">Y</div>
          </x-at-focus-test>
        `);
      });

      it('stores index as-is', function() {
        element.controller.atFocusedItemIndex = 0;
        expect(element.controller.atFocusedItemIndex).to.equal(0);
      });
    });
  });
});
