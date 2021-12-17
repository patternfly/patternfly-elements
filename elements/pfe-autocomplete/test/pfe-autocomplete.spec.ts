import { expect, oneEvent, nextFrame, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import * as sinon from 'sinon';

// Import the element we're testing.
import { PfeAutocomplete } from '@patternfly/pfe-autocomplete';
import { PfeSearchDroplist } from '@patternfly/pfe-autocomplete/pfe-search-droplist.js';

const TEMPLATES = {
  autocomplete: html`
    <pfe-autocomplete>
      <input placeholder="Enter Your Search Term" />
    </pfe-autocomplete>`,

  nolightdom: html`
    <!-- programmatically removing input to trigger slotchange event -->
    <pfe-autocomplete>
      <input />
    </pfe-autocomplete>`,

  badlightdom: html`
    <pfe-autocomplete>
      <div></div>
    </pfe-autocomplete>`,

  hasAriaLabel: html`
    <pfe-autocomplete>
      <input placeholder="Enter your search term" aria-label="Buscar" />
    </pfe-autocomplete>`,

  hasAlternateAriaAnnounceTemplate: html`
    <pfe-autocomplete aria-announce-template="Hey! There are \${numOptions} options.">
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>`,

  textualButton: html`
    <pfe-autocomplete button-text="Click me!">
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>`,
};

describe('<pfe-autocomplete>', function() {
  let autocompleteElem: PfeAutocomplete;
  let input: HTMLInputElement;
  let clearButton: HTMLButtonElement;
  let searchButton: HTMLButtonElement;
  let droplistElem: PfeSearchDroplist;

  // function to run before each test within this suite.
  beforeEach(async function() {
    autocompleteElem = await createFixture<PfeAutocomplete>(TEMPLATES.autocomplete);
    clearButton = autocompleteElem.shadowRoot!.querySelector('.clear-search')!;
    searchButton = autocompleteElem.shadowRoot!.querySelector('.search-button')!;
    droplistElem = autocompleteElem.shadowRoot!.getElementById('dropdown') as PfeSearchDroplist;
    input = autocompleteElem.querySelector('input')!;
  });

  it('should upgrade pfe-autocomplete', async function() {
    expect(await createFixture(TEMPLATES.autocomplete))
      .to.be.an.instanceOf(customElements.get('pfe-autocomplete'))
      .and
      .to.be.an.instanceOf(PfeAutocomplete);
  });

  it('should hide x button when input box is empty', async function() {
    expect(clearButton.hidden).to.be.true;
  });

  it('should clear search when user press x button', async function() {
    input.value = 'search-term';
    autocompleteElem.clear();
    expect(clearButton.hidden).to.be.true;
  });

  // it('should close the overlay when user press x button', async function() { });

  it('should close the overlay when user selects an option', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;

    const option = droplistElem.shadowRoot?.querySelector<HTMLLIElement>('li:nth-child(2)');
    option?.click();

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;
    await nextFrame();

    expect(input.value).to.equal('option 2');

    await autocompleteElem.clear();

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;

    expect(droplistElem.open).to.be.false;
  });

  it('should fire pfe-autocomplete:search-event after click on search icon', async function() {
    input.value = 'test';
    autocompleteElem.requestUpdate();
    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;
    setTimeout(() => searchButton.click());
    const event = await oneEvent(autocompleteElem, 'pfe-autocomplete:search-event');
    expect(event.detail.searchValue).to.equal('test');
  });

  it('should fire pfe-autocomplete:search-event after click on search button', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    const input = textualButton.querySelector('input')!;

    input.value = 'test';
    await textualButton.updateComplete;

    setTimeout(() =>
      textualButton.shadowRoot?.querySelector<HTMLElement>('.search-button--textual')!.click());

    const event = await oneEvent(textualButton, 'pfe-autocomplete:search-event');
    expect(event.detail.searchValue).to.equal('test');
  });

  it('should set selected-value attribute after after click on search icon', async function() {
    input.value = 'test';
    autocompleteElem.requestUpdate();
    await autocompleteElem.updateComplete;
    searchButton.click();
    await autocompleteElem.updateComplete;
    await nextFrame();
    expect(autocompleteElem.getAttribute('selected-value')).to.eql('test');
  });

  it('should set selected-value attribute after after click on search button', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    const input = textualButton.querySelector('input')!;
    input.value = 'test';
    await textualButton.updateComplete;
    textualButton.search();
    await textualButton.updateComplete;
    await nextFrame();
    expect(textualButton.getAttribute('selected-value')).to.eql('test');
  });

  it('should fire pfe-autocomplete:search-event after user click on an option', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await droplistElem.updateComplete;
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;
    setTimeout(()=> option.click());
    const event = await oneEvent(autocompleteElem, 'pfe-autocomplete:search-event');
    expect(event.detail.searchValue).to.equal('option 2');
  });

  it(`should fire a pfe-autocomplete:option-selected event when a user selects an option in the droplist with the enter key`, async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();
    input.focus();
    await sendKeys({ up: 'ArrowDown' });
    await nextFrame();

    setTimeout(() => sendKeys({ up: 'Enter' }));

    const event = await oneEvent(autocompleteElem, 'pfe-autocomplete:option-selected');
    expect(event.detail.optionValue).to.equal('option 1');
  });

  it(`should fire a pfe-autocomplete:option-selected event when a user selects an option in the droplist with the mouse`, async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;
    setTimeout(() => option.click());
    const event = await oneEvent(autocompleteElem, 'pfe-autocomplete:option-selected');
    expect(event.detail.optionValue).to.equal('option 2');
  });

  it(`should fire a pfe-autocomplete:options-shown event when the droplist is shown to the user`, async function() {
    const items = ['option 1', 'option 2'];

    autocompleteElem.autocompleteRequest = function(_, callback) {
      callback(items);
    };

    input.focus();
    setTimeout(() => sendKeys({ type: 'op' }));

    await oneEvent(autocompleteElem, 'pfe-autocomplete:options-shown');

    expect(droplistElem.hasAttribute('open')).to.be.true;
  });

  it(`should fire a pfe-autocomplete:option-cleared event when the input is cleared`, async function() {
    const items = ['option 1', 'option 2'];

    autocompleteElem.autocompleteRequest = function(params, callback) {
      const regx = new RegExp(`^${params.query}`, 'i');
      callback(items.filter(function(item) {
        return regx.test(item);
      }));
    };

    input.focus();

    await sendKeys({ type: 'op' });

    await nextFrame();

    setTimeout(() => clearButton.click());

    await oneEvent(autocompleteElem, 'pfe-autocomplete:option-cleared');
  });

  it('should set selected-value attribute after user click on an option', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;

    option.click();
    await nextFrame();
    expect(autocompleteElem.getAttribute('selected-value')).to.eql('option 2');
  });

  it('should update inputbox value when setting the init-value', async function() {
    autocompleteElem.initValue = 'foo';
    await nextFrame();
    expect(input.value).to.be.equal('foo');
  });

  it('should add active class on first element on keydown when dropdown is open', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await autocompleteElem.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    input.focus();
    await sendKeys({ up: 'ArrowDown' });

    await autocompleteElem.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector('li:nth-child(1)')!;

    expect(option.classList.contains('active')).to.be.true;
  });

  it(`should add aria-selected true on first element on keydown when dropdown is open`, async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();
    input.focus();
    await sendKeys({ up: 'ArrowDown' });
    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector('li:nth-child(1)')!;
    expect(option.hasAttribute('aria-selected')).to.be.true;
  });

  it('should set aria-expanded to true when dropdown is open', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();
    input.focus();
    await sendKeys({ up: 'ArrowDown' });
    await nextFrame();

    expect(input.hasAttribute('aria-expanded')).to.be.eql(true);
  });

  it('should update items list on mutation', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    expect(droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!.innerText)
      .to.equal('option 2');
  });

  it('hides dropdown content when an option is selected', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)');
    option!.click();

    await nextFrame();
    expect(droplistElem.open).to.be.false;
  });

  it('hides dropdown content when an option is clicked', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)');
    option!.click();

    await nextFrame();
    expect(droplistElem.open).to.be.false;
  });

  it('should trigger a console error if there is no light DOM', async function() {
    const spy = sinon.spy(console, 'error');
    const autocompleteNoLightDOM = await createFixture<PfeAutocomplete>(TEMPLATES.nolightdom);
    autocompleteNoLightDOM.innerHTML = '';

    await nextFrame();

    expect(spy).to.have.been.calledWith(`pfe-autocomplete: There must be a input tag in the light DOM`);
    spy.restore();
  });

  it(`should trigger a console error if there isn't a input as the first child of the light DOM`, async function() {
    const spy = sinon.spy(console, 'error');
    const autocompleteBadLightDOM = await createFixture<PfeAutocomplete>(TEMPLATES.badlightdom);

    expect(spy).to.have.been.calledWith(`pfe-autocomplete: The only child in the light DOM must be an input tag`);
    spy.restore();
  });

  it(`should use the provided aria-label instead of the fallback in the component`, async function() {
    await nextFrame();
    const autocompleteHasAriaLabel = await createFixture<PfeAutocomplete>(TEMPLATES.hasAriaLabel);

    const input = autocompleteHasAriaLabel.querySelector('input');
    expect(input!.getAttribute('aria-label')).to.equal('Buscar');
  });

  it('should allow an alternate aria-announce-template', async function() {
    const element =
      await createFixture<PfeAutocomplete>(TEMPLATES.hasAlternateAriaAnnounceTemplate);

    await element.updateComplete;
    const droplistElem: PfeSearchDroplist = element.shadowRoot!.querySelector('#dropdown')!;

    element.data = ['option 1', 'option 2'];
    droplistElem.open = true;

    await element.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    const { textContent } =
      droplistElem.shadowRoot!.querySelector('.suggestions-aria-help.sr-only')!;
    expect(textContent).to.be.eql('Hey! There are 2 options.');
  });

  it('should use the provided button text', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    const text =
      textualButton.shadowRoot!.querySelector('.search-button--textual')!.textContent!.trim();
    expect(text).to.eql('Click me!');
  });

  it('should use the fallback button text when an empty string provided', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    textualButton.setAttribute('button-text', '');
    await textualButton.updateComplete;
    await nextFrame();
    const text =
      textualButton.shadowRoot!.querySelector('.search-button--textual')!.textContent!.trim();

    expect(text).to.eql('Search');
  });
});
