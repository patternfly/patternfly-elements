import { expect, fixture, nextFrame } from '@open-wc/testing';

import { customElement } from 'lit/decorators/custom-element.js';
import {
  ReactiveElement,
  html,
  render,
  type PropertyValues,
  type TemplateResult,
} from 'lit';

import { SlotController } from '../slot-controller.js';

describe('SlotController', function() {
  describe('with named and anonymous slots', function() {
    @customElement('test-slot-controller-with-named-and-anonymous')
    class TestSlotControllerWithNamedAndAnonymous extends ReactiveElement {
      declare static template: TemplateResult;

      controller = new SlotController(this, 'a', null);

      render(): TemplateResult {
        return html`
          <slot name="a"></slot>
          <slot name="b"></slot>
          <slot></slot>
        `;
      }
    }
    describe('with no content', function() {
      let element: TestSlotControllerWithNamedAndAnonymous;
      beforeEach(async function() {
        element = await fixture(html`
          <test-slot-controller-with-named-and-anonymous></test-slot-controller-with-named-and-anonymous>
        `);
      });
      it('reports empty named slots', function() {
        expect(element.controller.hasSlotted('a')).to.be.false;
        expect(element.controller.isEmpty('a')).to.be.true;
      });
      it('reports empty default slot', function() {
        expect(element.controller.hasSlotted(null)).to.be.false;
        expect(element.controller.isEmpty(null)).to.be.true;
      });
      it('reports empty default slot with no arguments', function() {
        expect(element.controller.hasSlotted()).to.be.false;
        expect(element.controller.isEmpty()).to.be.true;
      });
    });

    describe('with element content in default slot', function() {
      let element: TestSlotControllerWithNamedAndAnonymous;
      beforeEach(async function() {
        element = await fixture(html`
          <test-slot-controller-with-named-and-anonymous>
            <p>element</p>
          </test-slot-controller-with-named-and-anonymous>
        `);
      });
      it('reports empty named slots', function() {
        expect(element.controller.hasSlotted('a')).to.be.false;
        expect(element.controller.isEmpty('a')).to.be.true;
      });
      it('reports non-empty default slot', function() {
        expect(element.controller.hasSlotted(null)).to.be.true;
        expect(element.controller.isEmpty(null)).to.be.false;
      });
      it('reports non-empty default slot with no arguments', function() {
        expect(element.controller.hasSlotted()).to.be.true;
        expect(element.controller.isEmpty()).to.be.false;
      });
    });

    describe('with element content in named slot', function() {
      let element: TestSlotControllerWithNamedAndAnonymous;
      beforeEach(async function() {
        element = await fixture(html`
          <test-slot-controller-with-named-and-anonymous>
            <p slot="a">element</p>
          </test-slot-controller-with-named-and-anonymous>
        `);
      });
      it('reports non-empty named slots', function() {
        expect(element.controller.hasSlotted('a')).to.be.true;
        expect(element.controller.isEmpty('a')).to.be.false;
      });
      it('reports empty default slot', function() {
        expect(element.controller.hasSlotted(null)).to.be.false;
        expect(element.controller.isEmpty(null)).to.be.true;
      });
      it('reports empty default slot with no arguments', function() {
        expect(element.controller.hasSlotted()).to.be.false;
        expect(element.controller.isEmpty()).to.be.true;
      });
    });

    describe('with text content in default slot', function() {
      let element: TestSlotControllerWithNamedAndAnonymous;
      beforeEach(async function() {
        element = await fixture(html`
          <test-slot-controller-with-named-and-anonymous>
            text
          </test-slot-controller-with-named-and-anonymous>
        `);
      });
      it('reports empty named slots', function() {
        expect(element.controller.hasSlotted('a')).to.be.false;
        expect(element.controller.isEmpty('a')).to.be.true;
      });
      it('reports nonjgempty default slot', function() {
        expect(element.controller.hasSlotted(null)).to.be.true;
        expect(element.controller.isEmpty(null)).to.be.false;
      });
      it('reports non-empty default slot with no arguments', function() {
        expect(element.controller.hasSlotted()).to.be.true;
        expect(element.controller.isEmpty()).to.be.false;
      });
    });
  });
});
