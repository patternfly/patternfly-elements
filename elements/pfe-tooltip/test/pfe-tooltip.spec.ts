import { expect, html, fixture } from '@open-wc/testing';
import { PfeTooltip } from '../pfe-tooltip.js';
import { setViewport } from '@web/test-runner-commands';

const blankElement = html`
<pfe-tooltip>
</pfe-tooltip>
`;

const basicElement = html`
<pfe-tooltip position="left">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
      <path
        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z">
      </path>
    </svg>
  </div>
  <div slot="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Mi eget mauris pharetra et ultrices.
  </div>
</pfe-tooltip>
`;

const createElement = (position: string, offset: number[] = [0, 15]) => {
  let styles = '';
  switch (position) {
    case 'top':
      styles = 'margin: 150px 0px 0px 150px;';
      break;
    case 'left':
      styles = 'margin: 40px 0px 0px 350px;';
      break;
    case 'right':
      break;
    case 'bottom':
      styles = 'margin-left: 150px';
      break;
  }
  return html`
  <pfe-tooltip position="${position}" style="${styles}" .offset="${offset}">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
        <path
          d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z">
        </path>
      </svg>
    </div>
    <div slot="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Mi eget mauris pharetra et ultrices.
    </div>
  </pfe-tooltip>
  `;
};

describe('<pfe-tooltip>', function() {
  beforeEach(async function() {
    await setViewport({ width: 1000, height: 1000 });
  });
  it('should upgrade', async function() {
    const element = await fixture<PfeTooltip>(blankElement);
    const klass = customElements.get('pfe-tooltip');
    expect(element)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeTooltip);
  });

  it('should be accessible', async function() {
    const element = await fixture<PfeTooltip>(basicElement);

    expect(element).shadowDom.to.be.accessible();
  });

  it('should reflect left position', async function() {
    const element = await fixture<PfeTooltip>(createElement('left'));

    const placement = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('data-popper-placement');

    expect(placement).to.equal('left');
  });

  it('should reflect top position', async function() {
    const element = await fixture<PfeTooltip>(createElement('top'));

    const placement = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('data-popper-placement');

    expect(placement).to.equal('top');
  });

  it('should reflect right position', async function() {
    const element = await fixture<PfeTooltip>(createElement('right'));

    const placement = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('data-popper-placement');

    expect(placement).to.equal('right');
  });

  it('should reflect bottom position', async function() {
    const element = await fixture<PfeTooltip>(createElement('bottom'));

    const placement = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('data-popper-placement');

    expect(placement).to.equal('bottom');
  });

  it('should reflect offset position', async function() {
    const element = await fixture<PfeTooltip>(createElement('bottom', [100, 100]));

    element.click();

    await element.updateComplete;

    const style = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('style');

    expect(style).to.exist;
  });

  it('should default aria-hidden to true', async function() {
    const element = await fixture<PfeTooltip>(basicElement);

    await element.updateComplete;

    const ariaHidden = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('aria-hidden');

    expect(ariaHidden).to.equal('true');
  });

  it('should set aria-hidden to false when element is focused', async function() {
    const element = await fixture<PfeTooltip>(basicElement);

    element.click();

    await element.updateComplete;

    const ariaHidden = element?.shadowRoot?.querySelector('[id^=pfe-tooltip]')?.getAttribute('aria-hidden');

    expect(ariaHidden).to.equal('false');
  });
});

