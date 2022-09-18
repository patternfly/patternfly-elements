import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html, render } from 'lit';

import { spy } from 'sinon';

import { PfeIcon } from '@patternfly/pfe-icon';

describe('<pfe-icon>', function() {
  let icon: PfeIcon;
  let svg: SVGSVGElement;
  let fallback: HTMLElement;

  async function expectIconsEqual(actualIconUrl: URL) {
    await oneEvent(icon, 'load');
    const tpl = await import(actualIconUrl.pathname).then(x => x.default);
    const rootNode = render(tpl, document.createDocumentFragment());
    const actual = icon.shadowRoot?.querySelector('svg');
    const expected = (rootNode.parentNode as DocumentFragment).querySelector('svg');
    expect(actual?.outerHTML).to.equal(expected?.outerHTML);
  }

  beforeEach(async function() {
    // @ts-expect-error: this is necessary to reset test state
    PfeIcon.getters = new Map(); PfeIcon.io.disconnect();
    icon = await fixture(html`<pfe-icon></pfe-icon>`);
    fallback = icon.shadowRoot!.querySelector('.pfe-icon--fallback')!;
    svg = icon.shadowRoot!.querySelector('svg')!;
  });

  it('should upgrade', function() {
    expect(icon, 'pfe-icon should be an instance of PfeIcon')
      .to.be.an.instanceOf(customElements.get('pfe-icon'))
      .and
      .to.be.an.instanceOf(PfeIcon);
  });

  it('should warn if the 2nd argument to addIconSet is not a function', function() {
    const consoleSpy = spy(console, 'warn');

    // @ts-expect-error: 3rd input is a string
    PfeIcon.addIconSet('test', './', 'rh-icon-aed.svg');
    expect(consoleSpy).to.have.been.calledOnceWith(`[PfeIcon.addIconSet(setName, getter)]: getter must be a function`);

    consoleSpy.restore();
  });

  it('should warn if there is no function provided to resolve the icon names', function() {
    const consoleSpy = spy(console, 'warn');

    // @ts-expect-error: testing bad input
    PfeIcon.addIconSet('test', './');

    expect(consoleSpy).to.have.been.calledOnceWith('[PfeIcon.addIconSet(setName, getter)]: getter must be a function');

    consoleSpy.restore();
  });

  describe('with a custom icon set', function() {
    const testIcons = ['aed', 'api', 'atom', 'bike'];

    function getter(_: string, icon: string) {
      return new URL(`./rh-icon-${icon}.js`, import.meta.url);
    }

    beforeEach(async function() {
      // replace the default built-in icon set resolveIconName function
      // with one that loads local icons.  we don't want tests dependent on
      // prod servers.
      PfeIcon.addIconSet('rh', getter);
      icon.set = 'rh';
    });

    it('should change icon when icon name is changed', async function() {
      // wait for each test icon to be loaded, then move to the next one
      for (const iconName of testIcons) {
        icon.icon = iconName;
        expectIconsEqual(getter('rh', iconName));
      }
    });
  });

  it('should change color when pfe-icon\'s color CSS property is changed', async function() {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = 'rgb(11, 12, 13)';
    icon.style.setProperty('color', newColor);
    icon.icon = 'atom';
    await oneEvent(icon, 'load');
    const color = getComputedStyle(icon.shadowRoot!.querySelector('svg')!).getPropertyValue('color');
    expect(color).to.equal(newColor);
  });

  it('should change size based on the relative size attribute values', async function() {
    // a function that accepts "size" values and makes sure they're
    // arranged in order from smallest to largest.
    async function sizeCheck(sizes: PfeIcon['size'][]) {
      let lastSize = { width: 0, height: 0 };
      for (const size of sizes) {
        icon.setAttribute('size', size);
        await icon.updateComplete;
        const { width, height } = icon.getBoundingClientRect();
        expect(width, `size "${size}" should be wider than the size below`).to.be.greaterThan(lastSize.width);
        expect(height, `size "${size}" should be taller than the size below`).to.be.greaterThan(lastSize.height);
        lastSize = { width, height };
      }
    }

    // test all the valid values for "size"
    await sizeCheck(['sm', 'md', 'lg', 'xl']);
  });

  it('should hide the fallback when it successfully upgrades', async function() {
    icon.innerHTML = `<p>Icon failed to load.</p>`;
    // Check that the fallback is hidden when the icon is successfully loaded
    icon.icon = 'atom';
    await oneEvent(icon, 'load');
    expect(icon).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback" hidden>
          <slot></slot>
        </span>
      </div>`);
  });

  it(`should fetch an icon even when the icon set is registered after the element upgrades`, async function() {
    const url = new URL('./rh-icon-bike.js', import.meta.url);
    icon.set = 'asdfasdf';
    icon.icon = 'foo';
    await icon.updateComplete;
    PfeIcon.addIconSet('asdfasdf', () => url);
    await oneEvent(icon, 'load');
    await expectIconsEqual(url);
  });

  it(`should show fallback when given a valid icon set but invalid icon name, fallback provided`, async function() {
    icon.innerHTML = '<p>Image failed to load.</p>.';
    icon.icon = 'no-scrubs';
    await oneEvent(icon, 'error');
    expect(icon.shadowRoot!.querySelector('svg')).to.not.be.ok;
    expect(icon).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback">
          <slot></slot>
        </span>
      </div>`);
  });

  it('should show fallback when given an invalid icon set, fallback provided', async function() {
    icon.innerHTML = '<p>Image failed to load.</p>.';
    icon.set = 'choopee-doopee-pie';
    icon.icon = 'bike';
    await oneEvent(icon, 'error');
    expect(icon.shadowRoot!.querySelector('svg')).to.not.be.ok;
    expect(icon).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback">
          <slot></slot>
        </span>
      </div>`);
  });
});
