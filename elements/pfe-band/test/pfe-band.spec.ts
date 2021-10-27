import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb, getColor } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfeBand } from '@patternfly/pfe-band';
import { setViewport } from '@web/test-runner-commands';

// Themes and their expected hex values
const colors = {
  default: '#f0f0f0',
  darker: '#3c3f42',
  darkest: '#151515',
  accent: '#004080',
  complement: '#002952',
  lightest: '#ffffff',
};

describe('<pfe-band>', function() {
  let band: PfeBand;

  beforeEach(async function() {
    band = await createFixture<PfeBand>(html`
      <pfe-band id="band1">
          <header slot="header">
            <h1>Default band, header region</h1>
            <p>Header region, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </header>
          <article>
            <h2>Body region</h2>
            <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
            <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          </article>
          <a href="#" slot="footer">Footer region</a>
          <div slot="aside">
            <h3>Aside: right body bottom</h3>
            <p>Ut wisi enim ad minim veniam.</p>
            <a href="#">Learn more</a>
          </div>
      </pfe-band>
    `);
  });

  // Test that the web component rendered
  it('should upgrade', function() {
    expect(band, 'pfe-band should be an instance of PfeBand')
      .to.be.an.instanceof(customElements.get('pfe-band'))
      .and
      .to.be.an.instanceof(PfeBand);
  });

  // Iterate over the colors object to test expected background color results
  for (const [name, color] of Object.entries(colors)) {
    it(`it should have a background color of ${color} when color is ${name}`, async function() {
      // If this is not the default background, update the variable
      if (name !== 'default') {
        band.setAttribute('color', name);
      }

      await band.updateComplete;
      // Test that the color is rendering as expected
      expect(getColor(band, 'background-color'))
        .to.deep.equal(hexToRgb(color));
    });
  }

  // Test that the default padding is correct
  it('should have default padding when no size attribute is set', async function() {
    // Test that the color is rendering as expected
    // @TODO need a way to adjust the viewport
    await setViewport({ width: 500, height: 800 });
    await band.updateComplete;
    expect(getComputedStyle(band, null).getPropertyValue('padding'))
      .to.equal('32px 16px');
    await setViewport({ width: 600, height: 800 });
    await band.updateComplete;
    expect(getComputedStyle(band, null).getPropertyValue('padding'))
      .to.equal('64px 16px');
  });

  // Test that the padding is reduced if the size is set to small
  it('should have reduced padding when the size attribute is small', async function() {
    // Update the color attribute
    band.setAttribute('pfe-size', 'small');
    await band.updateComplete;
    await setViewport({ width: 500, height: 800 });
    await band.updateComplete;
    expect(getComputedStyle(band, null).getPropertyValue('padding'))
      .to.equal('32px 16px');
    await setViewport({ width: 600, height: 800 });
    await band.updateComplete;
    expect(getComputedStyle(band, null).getPropertyValue('padding'))
      .to.equal('64px 16px');
  });

  // Test the default positions of the aside region in the DOM
  it('should have rendered the markup correctly for the aside defaults', function() {
    const container = band.shadowRoot!.querySelector('.pfe-band__container');
    const [header, body, aside, footer] = container!.children;

    // Test that the container exists
    expect(container, '.pfe-band__container is not `undefined`').to.be.ok;

    // Test that the header is the first item in the container
    expect(header.className).to.equal('pfe-band__header');
    // Test that the body is the second item in the container
    expect(body.className).to.equal('pfe-band__body');
    // Test that the aside is the third item in the container
    expect(aside.className).to.equal('pfe-band__aside');
    // Test that the footer is the last item in the container
    expect(footer.className).to.equal('pfe-band__footer');
  });

  // @TODO Write tests for aside layout variations and rendered view
});
