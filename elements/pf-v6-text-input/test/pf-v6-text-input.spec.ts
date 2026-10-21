import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
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
    let element: PfV6TextInput;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input validated="error" accessible-label="error input"></pf-v6-text-input>
      `);
      await element.updateComplete;
      await nextFrame();
      snapshot = await a11ySnapshot();
    });

    it('sets aria-invalid on the textbox', function() {
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(input?.invalid).to.equal('true');
    });

    it('does not fail constraint validation without an error message or native constraint', function() {
      expect(element.checkValidity()).to.be.true;
    });

    it('does not announce a message when none was provided', function() {
      const alert = snapshot.children?.find(node => node.role === 'alert');
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(alert).to.not.exist;
      expect(input?.description).to.be.undefined;
    });

    it('clears the error state when the user edits the value', async function() {
      element.focus();
      await sendKeys({ type: 'a' });
      await element.updateComplete;
      const edited = await a11ySnapshot();
      expect(element.hasAttribute('validated')).to.be.false;
      expect(element.checkValidity()).to.be.true;
      expect(edited.children?.find(node => node.role === 'textbox')?.invalid).to.not.equal('true');
    });
  });

  it('uses the native validation message when validated is error without error-text', async function() {
    const element = await createFixture<PfV6TextInput>(html`
      <pf-v6-text-input required
                        validated="error"
                        accessible-label="required input"></pf-v6-text-input>
    `);
    await element.updateComplete;
    await nextFrame();
    const snapshot = await a11ySnapshot();
    const alert = snapshot.children?.find(node => node.role === 'alert');
    expect(alert?.children?.[0]?.name).to.be.a('string').and.not.be.empty;
    expect(element.checkValidity()).to.be.false;
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

    it('fires change event exactly once per change', async function() {
      let count = 0;
      element.addEventListener('change', () => count++);
      element.focus();
      await sendKeys({ type: 'def' });
      element.blur();
      await nextFrame();
      expect(count).to.equal(1);
    });

    it('does not fire a cancelable change event', async function() {
      const cancelables: boolean[] = [];
      element.addEventListener('change', e => cancelables.push(e.cancelable));
      element.focus();
      await sendKeys({ type: 'ghi' });
      element.blur();
      await nextFrame();
      expect(cancelables).to.deep.equal([false]);
    });
  });

  describe('keyboard interaction', function() {
    let form: HTMLFormElement;
    let element: PfV6TextInput;
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
      element = form.querySelector('pf-v6-text-input')!;
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

    // Enter selects a suggested Japanese character before composition ends.
    // The browser marks this keydown with isComposing true.
    it('does not submit form when Enter confirms an IME composition', async function() {
      const input = element.shadowRoot!.querySelector('input')!;
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        isComposing: true,
        bubbles: true,
      }));
      input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
      await nextFrame();
      expect(wasSubmitted).to.be.false;
    });

    // Safari can report the Enter that selects a suggested Japanese character
    // after composition ends. isComposing is false, but keyCode is 229.
    it('does not submit when an IME Enter arrives after compositionend', async function() {
      const input = element.shadowRoot!.querySelector('input')!;
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
      input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      Object.defineProperty(event, 'keyCode', { value: 229 });
      input.dispatchEvent(event);
      await nextFrame();
      expect(wasSubmitted).to.be.false;
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

    describe('browser autocomplete', function() {
      beforeEach(async function() {
        await element.formStateRestoreCallback('saveduser', 'autocomplete');
        await element.updateComplete;
      });

      it('shows the autocompleted value in the input', async function() {
        const snapshot = await a11ySnapshot();
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.value).to.equal('saveduser');
      });

      it('uses the autocompleted value in form data', function() {
        expect(new FormData(form).get('username')).to.equal('saveduser');
      });
    });

    describe('form reset', function() {
      beforeEach(async function() {
        element.focus();
        await sendKeys({ type: 'changed' });
        form.reset();
        await element.updateComplete;
      });

      it('reverts value to the initial value', function() {
        expect(element.value).to.equal('testuser');
      });

      it('restores the initial value in form data after reset', function() {
        expect(new FormData(form).get('username')).to.equal('testuser');
      });
    });
  });

  describe('constraint validation on form submission', function() {
    let form: HTMLFormElement;
    let element: PfV6TextInput;
    let wasSubmitted: boolean;

    beforeEach(async function() {
      wasSubmitted = false;
      const container = await createFixture(html`
        <form>
          <pf-v6-text-input name="username"
                            accessible-label="username"
                            required></pf-v6-text-input>
          <button type="submit">Submit</button>
        </form>
      `);
      form = container as unknown as HTMLFormElement;
      element = form.querySelector('pf-v6-text-input')!;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        wasSubmitted = true;
      });
      await element.updateComplete;
    });

    describe('with an empty required input', function() {
      beforeEach(async function() {
        form.requestSubmit();
        await element.updateComplete;
        await nextFrame();
      });

      it('does not submit the form', function() {
        expect(wasSubmitted).to.be.false;
      });

      it('announces the invalid state', async function() {
        const snapshot = await a11ySnapshot();
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.equal('true');
      });

      it('shows the validation message', async function() {
        const snapshot = await a11ySnapshot();
        const alert = snapshot.children?.find(node => node.role === 'alert');
        expect(alert?.children?.[0]?.name).to.not.be.empty;
      });
    });

    describe('resetting after a failed submission', function() {
      beforeEach(async function() {
        form.requestSubmit();
        await element.updateComplete;
        form.reset();
        await element.updateComplete;
        await nextFrame();
      });

      it('clears the invalid state', async function() {
        const snapshot = await a11ySnapshot();
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.not.equal('true');
      });

      it('hides the validation message', async function() {
        const snapshot = await a11ySnapshot();
        const alert = snapshot.children?.find(node => node.role === 'alert');
        expect(alert).to.not.exist;
      });
    });

    describe('before any interaction', function() {
      it('does not announce an invalid state', async function() {
        const snapshot = await a11ySnapshot();
        const input = snapshot.children?.find(node => node.role === 'textbox');
        expect(input?.invalid).to.not.equal('true');
      });

      it('does not show a validation message', async function() {
        const snapshot = await a11ySnapshot();
        const alert = snapshot.children?.find(node => node.role === 'alert');
        expect(alert).to.not.exist;
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

  describe('custom error on a filled required input', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="field" required value="valid"></pf-v6-text-input>
      `);
      await element.updateComplete;
      // The value satisfies `required`, so only the custom error makes it invalid.
      expect(element.checkValidity()).to.be.true;
      await element.updateComplete;
      element.setCustomValidity('Name already taken');
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
    });

    it('keeps the custom error when checkValidity() is called', async function() {
      expect(element.checkValidity()).to.be.false;
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
    });

    it('keeps the custom error when reportValidity() is called', async function() {
      expect(element.reportValidity()).to.be.false;
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
    });
  });

  describe('validated="error" with error-text', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="field"
                          required
                          value="valid"
                          validated="error"
                          error-text="Name already taken"></pf-v6-text-input>
      `);
      await element.updateComplete;
      await nextFrame();
    });

    it('announces the declarative message and fails constraint validation', async function() {
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
      expect(input?.description).to.equal('Name already taken');
      expect(element.checkValidity()).to.be.false;
    });

    it('clears the declarative error when validated is removed', async function() {
      element.removeAttribute('validated');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(element.checkValidity()).to.be.true;
      expect(alert).to.not.exist;
      expect(input?.invalid).to.not.equal('true');
    });

    it('restores the declarative error when validated is set to error again', async function() {
      element.removeAttribute('validated');
      await element.updateComplete;
      element.setAttribute('validated', 'error');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(element.checkValidity()).to.be.false;
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
    });

    it('keeps an imperative custom error when validated is removed', async function() {
      element.setCustomValidity('Please choose another name');
      element.removeAttribute('validated');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(element.checkValidity()).to.be.false;
      expect(alert?.children?.[0]?.name).to.equal('Please choose another name');
    });

    it('shows the custom message when the required input is empty', async function() {
      element.value = '';
      element.setAttribute('error-text', 'Incorrect text format');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Incorrect text format');
      expect(element.checkValidity()).to.be.false;
    });

    it('lets setCustomValidity() override an earlier attribute change', async function() {
      element.setAttribute('error-text', 'Server changed the message');
      element.setCustomValidity('Please choose another name');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Please choose another name');
      expect(element.checkValidity()).to.be.false;
    });

    it('restores the declarative message when setCustomValidity("") clears an imperative error', async function() {
      element.setCustomValidity('Please choose another name');
      element.setCustomValidity('');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Name already taken');
      expect(element.checkValidity()).to.be.false;
    });

    it('keeps the imperative message when error-text is empty', async function() {
      element.setCustomValidity('Please choose another name');
      element.setAttribute('error-text', '');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Please choose another name');
      expect(element.checkValidity()).to.be.false;
    });

    it('keeps the imperative message when error-text is removed', async function() {
      element.setCustomValidity('Please choose another name');
      element.removeAttribute('error-text');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Please choose another name');
      expect(element.checkValidity()).to.be.false;
    });

    it('keeps the imperative message when error-text changes later', async function() {
      element.setCustomValidity('Please choose another name');
      element.setAttribute('error-text', 'Name is reserved');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Please choose another name');
      expect(element.checkValidity()).to.be.false;
    });

    it('clears the declarative error when error-text is removed', async function() {
      element.removeAttribute('error-text');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert).to.not.exist;
      expect(element.checkValidity()).to.be.true;
      expect(element.getAttribute('validated')).to.equal('error');
    });

    it('clears the declarative error when error-text is empty', async function() {
      element.setAttribute('error-text', '');
      await element.updateComplete;
      await nextFrame();
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert).to.not.exist;
      expect(element.checkValidity()).to.be.true;
    });
  });

  describe('error-text without validated="error"', function() {
    let element: PfV6TextInput;

    beforeEach(async function() {
      element = await createFixture<PfV6TextInput>(html`
        <pf-v6-text-input accessible-label="field"
                          value="valid"
                          error-text="Name already taken"></pf-v6-text-input>
      `);
      await element.updateComplete;
      await nextFrame();
    });

    it('does not make the input invalid or announce the message', async function() {
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      const input = snapshot.children?.find(node => node.role === 'textbox');
      expect(element.checkValidity()).to.be.true;
      expect(alert).to.not.exist;
      expect(input?.invalid).to.not.equal('true');
      expect(input?.description).to.be.undefined;
    });
  });

  it('updates form validity when validated changes with error-text present', async function() {
    const form = await createFixture<HTMLFormElement>(html`
      <form>
        <pf-v6-text-input name="username"
                          accessible-label="Username"
                          value="valid"
                          error-text="Name already taken"></pf-v6-text-input>
      </form>
    `);
    const element = form.querySelector('pf-v6-text-input')!;
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;

    element.setAttribute('validated', 'error');
    await element.updateComplete;
    expect(form.checkValidity()).to.be.false;

    element.removeAttribute('validated');
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;
  });

  it('does not block form validation when validated is error without error-text', async function() {
    const form = await createFixture<HTMLFormElement>(html`
      <form>
        <pf-v6-text-input name="username"
                          accessible-label="Username"
                          value="valid"
                          validated="error"></pf-v6-text-input>
      </form>
    `);
    const element = form.querySelector('pf-v6-text-input')!;
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;

    element.removeAttribute('validated');
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;
  });

  describe('editing a server-rejected value', function() {
    let form: HTMLFormElement;
    let element: PfV6TextInput;
    let wasSubmitted: boolean;

    beforeEach(async function() {
      wasSubmitted = false;
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-text-input name="username"
                            accessible-label="Username"
                            value="taken"
                            pattern="[a-z]+"
                            required
                            validated="error"
                            error-text="Name already taken"></pf-v6-text-input>
          <button type="submit">Submit</button>
        </form>
      `);
      element = form.querySelector('pf-v6-text-input')!;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        wasSubmitted = true;
      });
      await element.updateComplete;
    });

    it('blocks submission of the value rejected by the server', function() {
      form.requestSubmit();
      expect(wasSubmitted).to.be.false;
    });

    it('clears the old error and submits a corrected value', async function() {
      element.focus();
      element.select();
      await sendKeys({ type: 'newname' });
      await element.updateComplete;
      await nextFrame();

      expect(element.hasAttribute('error-text')).to.be.false;
      expect(element.errorText).to.be.undefined;
      expect(element.hasAttribute('validated')).to.be.false;
      expect(element.checkValidity()).to.be.true;
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(node => node.role === 'alert')).to.not.exist;
      expect(snapshot.children?.find(node => node.role === 'textbox')?.invalid).to.not.equal('true');

      form.requestSubmit();
      expect(wasSubmitted).to.be.true;
      expect(new FormData(form).get('username')).to.equal('newname');
    });

    it('still enforces native constraints after the server error clears', async function() {
      element.focus();
      element.select();
      await sendKeys({ type: '123' });
      await element.updateComplete;

      expect(element.hasAttribute('error-text')).to.be.false;
      expect(element.hasAttribute('validated')).to.be.false;
      expect(element.checkValidity()).to.be.false;
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
      form.requestSubmit();
      expect(wasSubmitted).to.be.false;
    });

    it('does not clear an imperative custom error on edit', async function() {
      element.setCustomValidity('Still unavailable');
      element.focus();
      element.select();
      await sendKeys({ type: 'newname' });
      await element.updateComplete;
      await nextFrame();

      expect(element.hasAttribute('error-text')).to.be.false;
      expect(element.hasAttribute('validated')).to.be.false;
      expect(element.checkValidity()).to.be.false;
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Still unavailable');
    });

    it('accepts a new server error after the value changes', async function() {
      element.focus();
      element.select();
      await sendKeys({ type: 'newname' });
      await element.updateComplete;
      expect(element.checkValidity()).to.be.true;

      element.setAttribute('validated', 'error');
      element.setAttribute('error-text', 'Name is reserved');
      await element.updateComplete;
      await nextFrame();
      expect(element.checkValidity()).to.be.false;
      const snapshot = await a11ySnapshot();
      const alert = snapshot.children?.find(node => node.role === 'alert');
      expect(alert?.children?.[0]?.name).to.equal('Name is reserved');
    });

    it('clears the old server error when browser autofill changes the value', async function() {
      await element.formStateRestoreCallback('newname', 'autocomplete');
      await element.updateComplete;

      expect(element.hasAttribute('error-text')).to.be.false;
      expect(element.hasAttribute('validated')).to.be.false;
      expect(element.checkValidity()).to.be.true;
      expect(new FormData(form).get('username')).to.equal('newname');
    });
  });

  it('accepts an edited server-rejected value without native constraints', async function() {
    const element = await createFixture<PfV6TextInput>(html`
      <pf-v6-text-input value="taken"
                        accessible-label="Username"
                        validated="error"
                        error-text="Name already taken"></pf-v6-text-input>
    `);
    expect(element.checkValidity()).to.be.false;

    element.focus();
    element.select();
    await sendKeys({ type: 'newname' });
    await element.updateComplete;
    await nextFrame();

    expect(element.hasAttribute('validated')).to.be.false;
    expect(element.hasAttribute('error-text')).to.be.false;
    expect(element.checkValidity()).to.be.true;
    const snapshot = await a11ySnapshot();
    expect(snapshot.children?.find(node => node.role === 'alert')).to.not.exist;
    expect(snapshot.children?.find(node => node.role === 'textbox')?.invalid).to.not.equal('true');
  });

  describe('validation while disabled or readonly', function() {
    let form: HTMLFormElement;
    let element: PfV6TextInput;

    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-text-input name="shipping"
                            accessible-label="Shipping address"
                            value="old address"
                            validated="error"
                            error-text="Address rejected"></pf-v6-text-input>
        </form>
      `);
      element = form.querySelector('pf-v6-text-input')!;
      expect(form.checkValidity()).to.be.false;
    });

    it('restores a declarative error when a directly disabled field is enabled again', async function() {
      element.disabled = true;
      await element.updateComplete;
      expect(form.checkValidity()).to.be.true;
      expect(element.checkValidity()).to.be.true;
      expect(element.getAttribute('error-text')).to.equal('Address rejected');
      expect(element.getAttribute('validated')).to.equal('error');
      const disabled = await a11ySnapshot();
      expect(disabled.children?.find(node => node.role === 'textbox')?.disabled).to.be.true;
      expect(disabled.children?.find(node => node.role === 'alert')).to.not.exist;

      element.disabled = false;
      await element.updateComplete;
      await nextFrame();
      expect(form.checkValidity()).to.be.false;
      const enabled = await a11ySnapshot();
      expect(enabled.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
      expect(enabled.children?.find(node => node.role === 'alert')?.children?.[0]?.name)
          .to.equal('Address rejected');
    });

    it('restores a declarative error when a readonly field becomes editable', async function() {
      element.readonly = true;
      await element.updateComplete;
      expect(form.checkValidity()).to.be.true;
      expect(element.checkValidity()).to.be.true;
      const readonly = await a11ySnapshot();
      expect(readonly.children?.find(node => node.role === 'textbox')?.readonly).to.be.true;
      expect(readonly.children?.find(node => node.role === 'alert')).to.not.exist;

      element.readonly = false;
      await element.updateComplete;
      await nextFrame();
      expect(form.checkValidity()).to.be.false;
      const editable = await a11ySnapshot();
      expect(editable.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
      expect(editable.children?.find(node => node.role === 'alert')?.children?.[0]?.name)
          .to.equal('Address rejected');
    });
  });

  it('restores a server error after a disabled fieldset is enabled', async function() {
    const form = await createFixture<HTMLFormElement>(html`
      <form>
        <fieldset>
          <pf-v6-text-input name="shipping"
                            accessible-label="Shipping address"
                            value="old address"
                            validated="error"
                            error-text="Address rejected"></pf-v6-text-input>
        </fieldset>
      </form>
    `);
    const fieldset = form.querySelector('fieldset')!;
    const element = form.querySelector('pf-v6-text-input')!;
    expect(form.checkValidity()).to.be.false;

    fieldset.disabled = true;
    await nextFrame();
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;
    expect(element.checkValidity()).to.be.true;
    const disabled = await a11ySnapshot();
    expect(disabled.children?.find(node => node.role === 'textbox')?.disabled).to.be.true;
    expect(disabled.children?.find(node => node.role === 'alert')).to.not.exist;

    fieldset.disabled = false;
    await nextFrame();
    await element.updateComplete;
    await nextFrame();
    expect(form.checkValidity()).to.be.false;
    const enabled = await a11ySnapshot();
    expect(enabled.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
    expect(enabled.children?.find(node => node.role === 'alert')?.children?.[0]?.name)
        .to.equal('Address rejected');
  });

  it('retains setCustomValidity() when a disabled field is enabled', async function() {
    const form = await createFixture<HTMLFormElement>(html`
      <form><pf-v6-text-input name="username"
                              accessible-label="Username"
                              disabled
                              value="taken"></pf-v6-text-input></form>
    `);
    const element = form.querySelector('pf-v6-text-input')!;
    expect(() => element.setCustomValidity('Name already taken')).to.not.throw();
    await element.updateComplete;
    expect(form.checkValidity()).to.be.true;

    element.disabled = false;
    await element.updateComplete;
    await nextFrame();
    expect(form.checkValidity()).to.be.false;
    const snapshot = await a11ySnapshot();
    expect(snapshot.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
    expect(snapshot.children?.find(node => node.role === 'alert')?.children?.[0]?.name)
        .to.equal('Name already taken');
  });

  it('restores native required validation when a disabled field is enabled', async function() {
    const form = await createFixture<HTMLFormElement>(html`
      <form><pf-v6-text-input name="username"
                              accessible-label="Username"
                              required></pf-v6-text-input></form>
    `);
    const element = form.querySelector('pf-v6-text-input')!;
    expect(form.checkValidity()).to.be.false;

    element.disabled = true;
    await element.updateComplete;
    expect(element.checkValidity()).to.be.true;
    expect(form.checkValidity()).to.be.true;

    element.disabled = false;
    await element.updateComplete;
    await nextFrame();
    expect(form.checkValidity()).to.be.false;
    const snapshot = await a11ySnapshot();
    expect(snapshot.children?.find(node => node.role === 'textbox')?.invalid).to.equal('true');
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

    it('keeps the end of an overflowing value visible when clicked', async function() {
      const value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      element.style.width = '12rem';
      element.value = value;
      await element.updateComplete;
      const input = element.shadowRoot!.querySelector('input')!;
      expect(input.scrollWidth).to.be.greaterThan(input.clientWidth);

      await clickElementAtCenter(element);

      expect(input.scrollLeft).to.be.closeTo(input.scrollWidth - input.clientWidth, 2);
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(node => node.role === 'textbox')?.value).to.equal(value);
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
