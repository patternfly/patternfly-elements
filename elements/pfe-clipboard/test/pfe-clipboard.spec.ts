import { expect, aTimeout, oneEvent, html } from '@open-wc/testing';
import { spy, stub, SinonStub } from 'sinon';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfeClipboard } from '@patternfly/pfe-clipboard';

const element = html`
  <pfe-clipboard></pfe-clipboard>
`;

describe('<pfe-clipboard>', async function() {
  const clipboardMocks = new Set<SinonStub>();

  beforeEach(() => clipboardMocks.add(stub(navigator.clipboard, 'writeText')));
  afterEach(() => clipboardMocks.forEach(x => x.restore()));

  it('should upgrade', async function() {
    const el = await createFixture<PfeClipboard>(element);
    expect(el)
      .to.be.an.instanceOf(customElements.get('pfe-clipboard'))
      .and
      .to.be.an.instanceOf(PfeClipboard);
  });

  it('should render the default slot content.', async function() {
    const el = await createFixture<PfeClipboard>(element);
    expect(el.shadowRoot!.querySelector('#text')!.textContent).to.equal('Copy URL');
    expect(el.shadowRoot!.querySelector('#text--success')!.textContent).to.equal('Copied');
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#icon`)!.assignedElements().length).to.equal(0);
  });

  it('it should render slot overrides', async function() {
    const el = await createFixture<PfeClipboard>(element);
    // The default slot override will be handled by transposeSlot
    const defaultSlot = `<span slot="text">You can totally click to copy url</span>`;
    const textSuccessSlot = `<span slot="text--success">Making some copies!</span>`;
    const iconSlot = `<pfe-icon slot="icon" icon="web-icon-globe" color="darker"></pfe-icon>`;
    el.innerHTML = `
        ${defaultSlot}
        ${textSuccessSlot}
        ${iconSlot}
    `;
    // transposeSlot should have sent it to the text named slot
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#text`)!.assignedElements({ flatten: true })
      .map(i => i.outerHTML.trim()).join('')).to.equal(defaultSlot);
    // The success and icon slots should be working as expected also
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#text--success`)!.assignedElements({ flatten: true })
      .map(i => i.outerHTML.trim()).join('')).to.equal(textSuccessSlot);
    // deprecated slot
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#text--success`)!.assignedElements({ flatten: true })
      .map(i => i.outerHTML.trim()).join('')).to.equal(textSuccessSlot);
    expect(el.shadowRoot!.querySelector<HTMLSlotElement>(`#icon`)!.assignedElements({ flatten: true })
      .map(i => i.outerHTML.trim()).join('')).to.equal(iconSlot);
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
    const event = await oneEvent(document.body, 'copied');
    expect(event.detail.copiedText).to.not.be.empty;
    await aTimeout(100);
    expect(handlerSpy).to.have.been.calledOnce;
    document.body.removeEventListener('pfe-clipboard:copied', handlerSpy);
  });

  it(`should have the correct accessibility attributes`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // Add global event listener for the copy event
    expect(el.getAttribute('role')).to.equal('button');
    expect(el.getAttribute('tabindex')).to.equal('0');
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

  it(`it should display the text--success state for 3 seconds`, async function(this: Mocha.Context) {
    this.timeout(3500);
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
    ).to.equal('block');
    // after 3 seconds it should return to normal
    // increase the timeout for this test
    await aTimeout(3001);
    // There should be a copied attribute on the host
    expect(el.hasAttribute('copied')).equal(false);
    // The text should be hidden
    expect(textStyle.getPropertyValue('display'), 'text style').to.equal('block');
    // The text--success should be visible
    expect(successStyle.getPropertyValue('display'), 'success style').to.equal('none');
  });

  it(`should have a customizable copied state duration.`, async function() {
    const el = await createFixture<PfeClipboard>(element);
    // Set the copied state duration to 1 second
    el.setAttribute('copied-duration', '1');
    await el.updateComplete;
    el.click();
    // wait for the copy promise to resolve
    await aTimeout(50);
    // the success message should be immediately showing
    const success = el.shadowRoot!.querySelector('.pfe-clipboard__text--success')!;
    expect(getComputedStyle(success).getPropertyValue('display')).to.equal('block');
    await aTimeout(1001);
    // After the second duration the success message should be hidden
    expect(getComputedStyle(success).getPropertyValue('display')).to.equal('none');
  });
});
