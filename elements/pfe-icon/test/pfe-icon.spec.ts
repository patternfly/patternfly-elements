import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { spy } from 'sinon';

import { PfeIcon } from '@patternfly/pfe-icon';

describe('<pfe-icon>', function() {
  let icon: PfeIcon;
  let svg: SVGSVGElement;
  let image: SVGImageElement;
  let filter: SVGFilterElement;
  let feFlood: SVGElement;
  let fallback: HTMLElement;

  beforeEach(async function() {
    icon = await fixture(html`<pfe-icon></pfe-icon>`);
    fallback = icon.shadowRoot!.querySelector('.pfe-icon--fallback')!;
    svg = icon.shadowRoot!.querySelector('svg')!;
    image = svg.querySelector('image')!;
    filter = svg.querySelector('filter')!;
    feFlood = filter.querySelector('feFlood')!;
  });

  it('should upgrade', function() {
    expect(icon, 'pfe-icon should be an instance of PfeIcon')
      .to.be.an.instanceOf(customElements.get('pfe-icon'))
      .and
      .to.be.an.instanceOf(PfeIcon);
  });

  it('should warn if the 3rd input to addIconSet is not a function', function() {
    const consoleSpy = spy(console, 'warn');

    // @ts-expect-error: 3rd input is a string
    PfeIcon.addIconSet('test', './', 'rh-icon-aed.svg');
    expect(consoleSpy).to.have.been.calledOnceWith(`[pfe-icon]: The third input to addIconSet should be a function that parses and returns the icon's filename.`);

    consoleSpy.restore();
  });

  it('should warn if there is no function provided to resolve the icon names', function() {
    const consoleSpy = spy(console, 'warn');

    // No 3rd input
    PfeIcon.addIconSet('test', './');

    expect(consoleSpy).to.have.been.calledOnceWith(`[pfe-icon]: The set test needs a resolve function for the icon names.`);

    consoleSpy.restore();
  });

  it('should change icon when icon name is changed', async function() {
    const testIcons = ['rh-aed', 'rh-api', 'rh-atom', 'rh-bike'];

    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfeIcon.addIconSet('rh', '', function(name: string) {
      return `/elements/pfe-icon/test/${name.replace('rh', 'rh-icon')}.svg`;
    });

    // wait for each test icon to be loaded, then move to the next one
    for (const iconName of testIcons) {
      icon.setAttribute('icon', iconName);
      await oneEvent(image, 'load');
      await icon.updateComplete;
      expect(image.getAttribute('href')).to.equal(`/elements/pfe-icon/test/${iconName.replace('rh', 'rh-icon')}.svg`);
    }
  });

  it('should change color when pfe-icon\'s color CSS var is changed', function() {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = 'rgb(11, 12, 13)';

    icon.style.setProperty('--pfe-icon--color', newColor);

    const { floodColor } = getComputedStyle(feFlood);

    expect(floodColor).to.equal(newColor);
    icon.style.removeProperty('--pfe-broadcasted--text');
  });

  it('should change color when pfe-icon\'s LEGACY color CSS var is changed', function() {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = 'rgb(11, 12, 13)';

    icon.style.setProperty('--pfe-icon--Color', newColor);

    const { floodColor } = getComputedStyle(feFlood);

    expect(floodColor).to.equal(newColor);
    icon.style.removeProperty('--pfe-broadcasted--text');
  });

  it('should change color when the broadcast CSS var is changed', function() {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = 'rgb(10, 11, 12)';

    icon.style.setProperty('--pfe-broadcasted--text', newColor);

    const { floodColor } = getComputedStyle(feFlood);
    expect(floodColor).to.equal(newColor);

    icon.style.removeProperty('--pfe-broadcasted--text');
  });

  it('should change size based on the relative size attribute values', async function() {
    // a function that accepts "size" values and makes sure they're
    // arranged in order from smallest to largest.
    async function sizeCheck(sizes: string[]) {
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
    await sizeCheck(['1x', '2x', '3x', '4x']);
    await sizeCheck(['sm', 'md', 'lg', 'xl']);
  });

  it('should hide the fallback when it successfully upgrades', function() {
    icon.innerHTML = `<p>Icon failed to load.</p>`;
    // Get the styles for the fallback element
    const fallbackStyle = getComputedStyle(fallback);
    // Check that the fallback is hidden when the icon is successfully loaded
    expect(fallbackStyle.display, 'Fallback text should be hidden when the icon loads successfully')
      .to.equal('none');
  });

  it(`should fetch an icon even when the icon set is registered after the element upgrades`, async function() {
    icon.setAttribute('icon', 'asdfasdf-foo');

    PfeIcon.addIconSet('asdfasdf', '', () => '/elements/pfe-icon/test/rh-icon-bike.svg');
    await oneEvent(image, 'load');
  });

  // -- Tests with fallback provided
  it(`should hide <image> when given a valid icon set but invalid icon name, fallback provided`, async function() {
    const badIconName = 'rh-badiconname';
    // Add fallback text
    icon.innerHTML = '<p>Image failed to load.</p>.';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const imageStyle = getComputedStyle(image);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should have class has-fallback')
      .to.be.true;
    expect(imageStyle.display, '<image> should have display:none when icon load fails')
      .to.equal('none');
  });

  it(`<svg> should retain whitespace when icon fails to load, no fallback provided`, async function() {
    const badIconName = 'rh-badiconname';
    // Clear fallback text
    icon.innerHTML = '';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const svgStyle = getComputedStyle(svg);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(svgStyle.display, '<svg> should not have display:none when icon load fails')
      .to.not.equal('none');
  });

  it('should hide <image> when given an invalid icon set, fallback provided', async function() {
    const badIconName = 'sdfsdfsdf-asdfasdfsdf';
    // Add fallback text
    icon.innerHTML = '<p>Image failed to load.</p>.';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const imageStyle = getComputedStyle(image);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should have class has-fallback')
      .to.be.true;
    expect(imageStyle.display, '<image> should have display:none when icon load fails')
      .to.equal('none');
  });

  // -- Tests with no fallback provided
  it(`should hide <image> when given a valid icon set but invalid icon name, no fallback provided`, async function() {
    const badIconName = 'rh-badiconname';
    // Clear out fallback text
    icon.innerHTML = '';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const imageStyle = getComputedStyle(image);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(imageStyle.display, '<image> should have display:none when icon load fails')
      .to.equal('none');
  });

  it(`<svg> should retain whitespace when icon fails to load, no fallback provided`, async function() {
    const badIconName = 'rh-badiconname';
    // Clear out fallback text
    icon.innerHTML = '';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const svgStyle = getComputedStyle(svg);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(svgStyle.display, '<svg> should not have display:none when icon load fails')
      .to.not.equal('none');
  });

  it('should hide <image> when given an invalid icon set, no fallback provided', async function() {
    const badIconName = 'sdfsdfsdf-asdfasdfsdf';
    // Clear out fallback text
    icon.innerHTML = '';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the image is hidden
    const imageStyle = getComputedStyle(image);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(imageStyle.display, '<image> should have display:none when icon load fails')
      .to.equal('none');
  });

  // -- Test on-fail="collapse"
  it(`when [on-fail="collapse"] is set on pfe-icon, the <svg> should be hidden on failure`, async function() {
    const badIconName = 'sdfsdfsdf-asdfasdfsdf';
    // Clear out fallback text
    icon.innerHTML = '';
    // Set on-fail attribute
    icon.setAttribute('on-fail', 'collapse');
    await icon.updateComplete;
    // make sure the image is hidden
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    const svgStyle = getComputedStyle(svg);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(svgStyle.display, '<svg> should have display:none')
      .to.equal('none');
  });

  it(`when [on-fail="collapse"] is NOT set on pfe-icon, the <svg> should retain its height on failure`, async function() {
    const badIconName = 'sdfsdfsdf-asdfasdfsdf';
    icon.removeAttribute('on-fail');
    await icon.updateComplete;
    // Clear out fallback text
    icon.innerHTML = '';
    icon.setAttribute('icon', badIconName);
    await oneEvent(image, 'error');
    await icon.updateComplete;
    // make sure the svg retains it's height
    const svgStyle = getComputedStyle(svg);
    expect(icon.classList.contains('load-failed'), 'icon should have class load-failed')
      .to.be.true;
    expect(icon.classList.contains('has-fallback'), 'icon should NOT have class has-fallback')
      .to.be.false;
    expect(svgStyle.height, '<svg> should have height when icon load fails and collapse is not set')
      .to.not.equal(0);
  });
});
