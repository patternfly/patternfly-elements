import { expect, fixture } from '@open-wc/testing';
import { customElement } from 'lit/decorators/custom-element.js';
import { LitElement, html } from 'lit';

import { InternalsController } from '../internals-controller.js';

@customElement('x-internals-test')
class TestInternalsElement extends LitElement {
  static readonly formAssociated = true;

  internals = InternalsController.of(this);

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'x-internals-test': TestInternalsElement;
  }
}

describe('InternalsController', function() {
  describe('form', function() {
    it('returns the owning form', async function() {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <x-internals-test></x-internals-test>
        </form>
      `);
      const element = form.querySelector('x-internals-test')!;
      expect(element.internals.form).to.equal(form);
    });

    it('returns null when the host is not in a form', async function() {
      const element = await fixture<TestInternalsElement>(html`
        <x-internals-test></x-internals-test>
      `);
      expect(element.internals.form).to.be.null;
    });
  });

  describe('shadowRoot', function() {
    it('returns the host shadow root', async function() {
      const element = await fixture<TestInternalsElement>(html`
        <x-internals-test></x-internals-test>
      `);
      expect(element.internals.shadowRoot).to.equal(element.shadowRoot);
    });
  });

  describe('submit', function() {
    let form: HTMLFormElement;
    let element: TestInternalsElement;
    let submitted: boolean;

    beforeEach(async function() {
      submitted = false;
      form = await fixture<HTMLFormElement>(html`
        <form>
          <input name="name" value="initial">
          <x-internals-test></x-internals-test>
        </form>
      `);
      element = form.querySelector('x-internals-test')!;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitted = true;
      });
    });

    it('submits the associated form', function() {
      element.internals.submit();
      expect(submitted).to.be.true;
    });

    it('passes the submitter to the form when the UA accepts it', function() {
      const original = form.requestSubmit.bind(form);
      const calls: (HTMLElement | undefined)[] = [];
      form.requestSubmit = function(submitter?: HTMLElement) {
        calls.push(submitter);
        original();
      } as typeof form.requestSubmit;

      element.internals.submit(element);

      expect(calls).to.deep.equal([element]);
      expect(submitted).to.be.true;
    });

    it('falls back to requestSubmit() when the UA rejects the submitter', function() {
      const original = form.requestSubmit.bind(form);
      const calls: (HTMLElement | undefined)[] = [];
      form.requestSubmit = function(submitter?: HTMLElement) {
        calls.push(submitter);
        if (submitter) {
          throw new TypeError('not a submitter');
        }
        original();
      } as typeof form.requestSubmit;

      element.internals.submit(element);

      expect(calls).to.deep.equal([element, undefined]);
      expect(submitted).to.be.true;
    });

    it('does nothing when the host is not associated with a form', async function() {
      const standalone = await fixture<TestInternalsElement>(html`
        <x-internals-test></x-internals-test>
      `);
      expect(() => standalone.internals.submit()).to.not.throw();
    });
  });
});
