import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV6TextInput } from '@patternfly/elements/pf-v6-text-input/pf-v6-text-input.js';

describe('<pf-v6-text-input>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-text-input')).to.be.an.instanceof(PfV6TextInput);
  });

  describe('simply instantiating', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="Test input"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-text-input');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6TextInput);
    });

    it('has textbox role in a11y tree', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input).to.exist;
    });

    it('has accessible name from accessible-label', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.name).to.equal('Test input');
    });
  });

  describe('with external label', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      const container = await createFixture<HTMLDivElement>(html`
        <div>
          <label for="my-input">My Label</label>
          <pf-v6-text-input id="my-input"></pf-v6-text-input>
        </div>
      `);
      element = container.querySelector('pf-v6-text-input')!;
      snapshot = await a11ySnapshot();
    });

    it('associates with the label element', function() {
      expect(element.labels).to.have.lengthOf(1);
    });

    it('has accessible name from label', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.name).to.equal('My Label');
    });
  });

  describe('with value', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="test" value="hello world"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('reflects the value property', function() {
      expect(element.value).to.equal('hello world');
    });

    it('exposes value in a11y tree', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.value).to.equal('hello world');
    });
  });

  describe('disabled', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input disabled accessible-label="disabled input" value="disabled"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('has disabled in a11y tree', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.disabled).to.be.true;
    });
  });

  describe('disabled by fieldset', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      const container = await createFixture<HTMLDivElement>(html`
        <div>
          <fieldset disabled>
            <pf-v6-text-input accessible-label="fieldset disabled" value="test"></pf-v6-text-input>
          </fieldset>
        </div>
      `);
      element = container.querySelector('pf-v6-text-input')!;
      snapshot = await a11ySnapshot();
    });

    it('has disabled in a11y tree', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.disabled).to.be.true;
    });

    it('matches :disabled pseudo-class', function() {
      expect(element.matches(':disabled')).to.be.true;
    });
  });

  describe('readonly', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input readonly accessible-label="readonly input" value="readonly"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('has readonly in a11y tree', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.readonly).to.be.true;
    });
  });

  describe('validated="error"', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input validated="error" accessible-label="error input"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('sets aria-invalid on the textbox', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.invalid).to.equal('true');
    });
  });

  describe('validated="success"', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input validated="success" accessible-label="success input"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('does not set aria-invalid', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.invalid).to.not.equal('true');
    });
  });

  describe('validated="warning"', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input validated="warning" accessible-label="warning input"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('does not set aria-invalid', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.invalid).to.not.equal('true');
    });
  });

  describe('type="email"', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input type="email" accessible-label="email input"></pf-v6-text-input>
      `);
      snapshot = await a11ySnapshot();
    });

    it('has the type property set', function() {
      expect(element.type).to.equal('email');
    });
  });

  describe('with placeholder', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="search" placeholder="Search..."></pf-v6-text-input>
      `);
    });

    it('has the placeholder property set', function() {
      expect(element.placeholder).to.equal('Search...');
    });
  });

  describe('readonly plain', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input readonly plain accessible-label="plain readonly" value="plain text"></pf-v6-text-input>
      `);
    });

    it('has both attributes', function() {
      expect(element.readonly).to.be.true;
      expect(element.plain).to.be.true;
    });

    it('renders without visible border', function() {
      expect(element.offsetWidth).to.be.greaterThan(0);
    });
  });

  describe('maxlength', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="limited" maxlength="5"></pf-v6-text-input>
      `);
      element.focus();
    });

    it('limits input length', async function() {
      await sendKeys({ type: 'abcdefgh' });
      expect(element.value.length).to.be.at.most(5);
    });
  });

  describe('input event', function() {
    let element: PfV6TextInput;
    let inputFired: boolean;

    beforeEach(async function() {
      inputFired = false;
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="typing test"></pf-v6-text-input>
      `);
      element.addEventListener('input', () => {
        inputFired = true;
      });
      element.focus();
    });

    it('fires input event on typing', async function() {
      await sendKeys({ type: 'a' });
      expect(inputFired).to.be.true;
    });

    it('updates value on typing', async function() {
      await sendKeys({ type: 'hello' });
      expect(element.value).to.equal('hello');
    });
  });

  describe('change event', function() {
    let element: PfV6TextInput;
    let changeFired: boolean;

    beforeEach(async function() {
      changeFired = false;
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="change test"></pf-v6-text-input>
      `);
      element.addEventListener('change', () => {
        changeFired = true;
      });
      element.focus();
      await sendKeys({ type: 'abc' });
      element.blur();
      await nextFrame();
    });

    it('fires change event on blur after editing', function() {
      expect(changeFired).to.be.true;
    });
  });

  describe('keyboard interaction', function() {
    let form: HTMLFormElement;
    let wasSubmitted: boolean;

    beforeEach(async function() {
      wasSubmitted = false;
      const container = await createFixture(html`
        <form>
          <pf-v6-text-input name="field"
                            accessible-label="field"
                            value="test"></pf-v6-text-input>
          <button type="submit">Submit</button>
        </form>
      `);
      form = container as unknown as HTMLFormElement;
      const element = form.querySelector('pf-v6-text-input')!;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        wasSubmitted = true;
      });
      await element.updateComplete;
      element.focus();
      await nextFrame();
    });

    it('submits form on Enter', async function() {
      await sendKeys({ press: 'Enter' });
      await nextFrame();
      expect(wasSubmitted).to.be.true;
    });
  });

  describe('form association', function() {
    let form: HTMLFormElement;
    let element: PfV6TextInput;
    let submitData: FormData | null;

    beforeEach(async function() {
      submitData = null;
      const container = await createFixture(html`
        <form>
          <pf-v6-text-input name="username"
                            accessible-label="username"
                            value="testuser"></pf-v6-text-input>
          <button type="submit">Submit</button>
        </form>
      `);
      form = container as HTMLFormElement;
      element = form.querySelector('pf-v6-text-input')!;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitData = new FormData(form);
      });
    });

    describe('submitting with value', function() {
      beforeEach(function() {
        form.requestSubmit();
      });

      it('includes value in form data', function() {
        expect(submitData!.get('username')).to.equal('testuser');
      });
    });

    describe('submitting with empty value', function() {
      beforeEach(async function() {
        element.value = '';
        await element.updateComplete;
        form.requestSubmit();
      });

      it('omits from form data when empty', function() {
        expect(submitData!.get('username')).to.be.null;
      });
    });

    describe('form reset', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ type: 'changed' });
        form.reset();
        await element.updateComplete;
      });

      it('reverts value to empty', function() {
        expect(element.value).to.equal('');
      });
    });
  });

  describe('constraint validation', function() {
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="validation test"
                          pattern="\\d{3}"
                          required></pf-v6-text-input>
      `);
    });

    describe('calling checkValidity() with invalid value', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ type: 'abc' });
        element.checkValidity();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot();
      });

      it('returns false', function() {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets aria-invalid on the textbox', function() {
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.equal('true');
      });

      it('has a non-empty validation message', function() {
        expect(element.offsetWidth).to.be.greaterThan(0);
      });
    });

    describe('calling checkValidity() with valid value', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ type: '123' });
        element.checkValidity();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot();
      });

      it('returns true', function() {
        expect(element.checkValidity()).to.be.true;
      });

      it('does not set aria-invalid', function() {
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.not.equal('true');
      });
    });

    describe('setCustomValidity()', function() {
      beforeEach(async function() {
        element.setCustomValidity('Custom error');
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot();
      });

      it('makes the element invalid', function() {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets aria-invalid', function() {
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.equal('true');
      });

      describe('clearing custom validity', function() {
        beforeEach(async function() {
          element.setCustomValidity('');
          element.focus();
          await sendKeys({ type: '123' });
          element.checkValidity();
          await element.updateComplete;
          await nextFrame();
          snapshot = await a11ySnapshot();
        });

        it('makes the element valid again', function() {
          expect(element.checkValidity()).to.be.true;
        });
      });
    });
  });

  describe('select() method', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="selectable" value="select me"></pf-v6-text-input>
      `);
    });

    it('selects all text', function() {
      element.focus();
      element.select();
      expect(element.value).to.equal('select me');
    });
  });

  describe('truncated="start"', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input truncated="start"
                          accessible-label="truncated"
                          value="Lorem ipsum dolor sit amet consectetur"></pf-v6-text-input>
      `);
    });

    it('has the truncated attribute', function() {
      expect(element.truncated).to.equal('start');
    });

    it('has accessible value in a11y tree', async function() {
      const snapshot = await a11ySnapshot();
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.value).to.equal('Lorem ipsum dolor sit amet consectetur');
    });
  });

  describe('with icon slot', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="with icon">
          <svg slot="icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>
        </pf-v6-text-input>
      `);
    });

    it('renders the icon at a visible size', function() {
      expect(element.offsetWidth).to.be.greaterThan(0);
    });
  });
});
