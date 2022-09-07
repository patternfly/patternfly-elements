import type { SinonStub } from 'sinon';

import { expect, aTimeout, oneEvent, nextFrame, html } from '@open-wc/testing';
import { spy, stub } from 'sinon';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { getComposedText } from '@patternfly/pfe-tools/test/get-composed-text.js';
import { hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfeClipboard, CopiedEvent } from '@patternfly/pfe-clipboard';

const element = html`
  <pfe-clipboard></pfe-clipboard>
`;

describe('<pfe-clipboard>', async function() {
  beforeEach(async function() {
    stub(navigator.clipboard, 'writeText');
  });

  afterEach(function() {
    (navigator.clipboard.writeText as SinonStub).restore();
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfeClipboard>(element);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pfe-clipboard'))
      .and
      .to.be.an.instanceOf(PfeClipboard);
  });

  it('should render the default slot content', async function() {
    const el = await createFixture<PfeClipboard>(element);
    // strip icon text and whitespace
    const normalizedTextContent = el.shadowRoot!.textContent!.replace(/Copy URL|\s+/g, ' ').trim();
    expect(normalizedTextContent).to.equal('Copied successful.');
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#icon`)!.assignedElements().length).to.equal(0);
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`.pfe-clipboard__text--success`)!.getAttribute('role')).to.equal('alert');
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`.pfe-clipboard__text--success`)!.getAttribute('tabindex')).to.equal('0');
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#success--text`)!).to.not.be.ok;
  });

  it('it should render slot overrides', async function() {
    const el = await createFixture<PfeClipboard>(element);
    const defaultSlot = `<span slot="label">You can totally click to copy url</span>`;
    const textSuccessSlot = `<span slot="success">Making some copies!</span>`;
    const iconSlot = `<pfe-icon slot="icon" icon="web-icon-globe" color="darker"></pfe-icon>`;
    el.innerHTML = `
        ${defaultSlot}
        ${textSuccessSlot}
        ${iconSlot}
    `;
    const $slot = (name: string) => el.shadowRoot!.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;

    const slotted = (s: string) => $slot(s).assignedElements({ flatten: true }).map(i => i.outerHTML.trim()).join('');

    await nextFrame();

    expect(slotted('label'), 'label').to.equal(defaultSlot);
    expect(slotted('success'), 'success').to.equal(textSuccessSlot);
    expect(slotted('icon'), 'icon').to.equal(iconSlot);
  });

  it('it should use deprecated `text` slot', async function() {
    const el = await createFixture<PfeClipboard>(html`
      <pfe-clipboard>
        <span slot="text">You can totally click to copy url</span>
      </pfe-clipboard>
    `);
    const $slot = (name: string) => el.shadowRoot!.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;

    await el.updateComplete;

    expect($slot('label'), 'label').to.be.null;
    expect($slot('text'), 'text').to.be.an.instanceof(HTMLSlotElement);
  });

  it(`should hide the icon when the no-icon attribute set.`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // Activate the no-icon boolean property
    el.setAttribute('no-icon', 'true');
    // wait for setAttribute to apply
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(`#icon`)).to.equal(null);
  });

  it(`should have the correct text color settings for both copied and non-copied states`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // Default text should be set the link variable
    expect(
      getComputedStyle(el.shadowRoot!.querySelector(`.pfe-clipboard__text`)!)
        .getPropertyValue('color'),
      'text style'
    ).to.equal(`rgb(${hexToRgb('#0066cc').join(', ')})`);
    // Default text should be set the feedback--success variable
    expect(
      getComputedStyle(el.shadowRoot!.querySelector(`.pfe-clipboard__text--success`)!)
        .getPropertyValue('color'),
      'success style'
    ).to.equal(`rgb(${hexToRgb('#3e8635').join(', ')})`);
  });

  it('should fire a deprecated pfe-clipboard:copied event when clicked', async function() {
    const handlerSpy = spy();
    document.body.addEventListener('pfe-clipboard:copied', handlerSpy);
    const el = await createFixture<PfeClipboard>(element);
    // Add global event listener for the copy event
    // Simulate click
    setTimeout(el.click.bind(el));
    const event = await oneEvent(document.body, 'pfe-clipboard:copied');
    expect(event.detail.url).to.be.ok;
    expect(event.detail.copiedText).to.be.ok;
    await aTimeout(100);
    expect(handlerSpy).to.have.been.calledOnce;
    document.body.removeEventListener('pfe-clipboard:copied', handlerSpy);
  });

  it('should fire a copied event when clicked', async function() {
    const handlerSpy = spy();
    document.body.addEventListener('copied', handlerSpy);
    const el = await createFixture<PfeClipboard>(element);
    // Add global event listener for the copy event
    // Simulate click
    setTimeout(el.click.bind(el));
    const event = await oneEvent(document.body, 'copied') as unknown as CopiedEvent;
    expect(event.copiedText).to.not.be.empty;
    await aTimeout(100);
    expect(handlerSpy).to.have.been.calledOnce;
    document.body.removeEventListener('pfe-clipboard:copied', handlerSpy);
  });

  it(`should have the correct accessibility attributes`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // manually set the contentToCopy property
    const copyText = `<div>Copy this text</div>`;


    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`.pfe-clipboard__icon`)!.getAttribute('aria-hidden')).to.equal('true');

    el.copyFrom = 'property';
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector(`.pfe-clipboard__button`)!.hasAttribute('aria-disabled'),
      'pfe-clipboard button should be aria-disabled when target=property'
    ).to.be.true;
    el.contentToCopy = copyText;
    el.click();
    expect(navigator.clipboard.writeText).to.have.been.calledWith(copyText);
  });

  it(`should support copying the url by default`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // click the element
    el.click();
    expect(navigator.clipboard.writeText).to.have.been.calledWith(location.href);
  });

  it(`should support copying arbitrary text using contentToCopy property`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    const copyText = `<div>Copy this text</div>`;
    // manually set the contentToCopy property
    el.copyFrom = 'property';
    await el.updateComplete;
    expect(
      el.hasAttribute('disabled'),
      'pfe-clipboard should be disabled when target=property but "contentToCopy" has not been set'
    ).to.be.true;
    el.contentToCopy = copyText;
    await el.updateComplete;
    expect(
      el.hasAttribute('disabled'),
      'pfe-clipboard should not be disabled when target=property and "contentToCopy" has been set'
    ).to.be.false;
    el.click();
    expect(navigator.clipboard.writeText).to.have.been.calledWith(copyText);
  });

  it(`should support copying arbitrary text from a target in the lightdom using the target id.`, async function() {
    const copyText = `Copy this text.`;
    const elementWithTarget = `
      <pfe-clipboard copy-from="#target"></pfe-clipboard>
      <div class="copy-from" id="target">${copyText}</div>
    `;
    const el = await createFixture<PfeClipboard>(elementWithTarget);
    el.click();
    expect(navigator.clipboard.writeText).to.have.been.calledWith(copyText);
  });

  it(`should support copying an input elements value property when it's a target.`, async function() {
    const copyText = `Copy this text.`;
    const elementWithTarget = html`
      <pfe-clipboard copy-from="#target"></pfe-clipboard>
      <input type="text" id="target" value="${copyText}"/>
    `;
    const el = await createFixture<PfeClipboard>(elementWithTarget);
    el.click();
    expect(navigator.clipboard.writeText).to.have.been.calledWith(copyText);
  });

  it(`it should display the success state for 4 seconds`, async function(this: Mocha.Context) {
    this.timeout(4500);
    const el = await createFixture<PfeClipboard>(element);
    const textStyle = getComputedStyle(el.shadowRoot!.querySelector('.pfe-clipboard__text')!);
    const successStyle =
      getComputedStyle(el.shadowRoot!.querySelector('.pfe-clipboard__text--success')!);

    el.click();
    await aTimeout(50);
    // There should be a copied attribute on the host
    expect(el.hasAttribute('copied')).to.equal(true);
    // The text should be hidden
    expect(textStyle.getPropertyValue('display'), 'text style').to.equal('none');
    // The text--success should be visible
    expect(
      successStyle
        .getPropertyValue('display'),
      'success style'
    ).to.equal('flex');
    // after 4 seconds it should return to normal
    // increase the timeout for this test
    await aTimeout(4001);
    // There should be a copied attribute on the host
    expect(el.hasAttribute('copied')).equal(false);
    // The text should be hidden
    expect(textStyle.getPropertyValue('display'), 'text style').to.equal('flex');
    // The text--success should be visible
    expect(successStyle.getPropertyValue('display'), 'success style').to.equal('none');
  });

  it('should use the deprecated text--success slot if specified', async function() {
    const el = await createFixture<PfeClipboard>(html`
      <pfe-clipboard>
        <span slot="text--success">Copied successful.</span>
      </pfe-clipboard>
    `);

    await el.updateComplete;

    el.click();

    const $slot = (name: string) => el.shadowRoot!.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;
    const slottedText = (s: string) => $slot(s).assignedNodes({ flatten: true }).map(i => i.textContent!.trim()).join(' ');

    expect(getComposedText(el).trim()).to.equal('Copied successful.');
    expect($slot('success')).to.be.null;
    expect(slottedText('text--success')).to.equal('Copied successful.');
  });

  it('should use the deprecated text--success slot if added via innerHTML', async function() {
    const el = await createFixture<PfeClipboard>(element);
    el.innerHTML = `<span slot="text--success">Copied successful.</span>`;
    await el.updateComplete;
    await aTimeout(1);
    el.click();

    const $slot = (name: string) => el.shadowRoot!.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;
    const slottedText = (s: string) => $slot(s).assignedNodes({ flatten: true }).map(i => i.textContent!.trim()).join(' ');

    await aTimeout(50);

    expect(getComposedText(el).trim()).to.equal('Copied successful.');
    expect($slot('success')).to.be.null;
    expect(slottedText('text--success')).to.equal('Copied successful.');
  });

  it(`should have a customizable copied state duration.`, async function(this: Mocha.Context) {
    // increase timeout max for this test
    this.timeout(5500);

    const el = await createFixture<PfeClipboard>(element);
    // Set the copied state duration to 5 seconds
    el.setAttribute('copied-duration', '5');
    await el.updateComplete;
    el.click();
    // wait for the copy promise to resolve
    await aTimeout(50);
    // the success message should be immediately showing
    const success = el.shadowRoot!.querySelector('.pfe-clipboard__text--success')!;
    expect(getComputedStyle(success).getPropertyValue('display')).to.equal('flex');

    // wait for copy state to be set back to the default state
    await aTimeout(5001);
    // After the second duration the success message should be hidden
    expect(getComputedStyle(success).getPropertyValue('display')).to.equal('none');
  });
});
