import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { PfV6BackgroundImage } from '../pf-v6-background-image.js';

describe('<pf-v6-background-image>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-background-image')).to.be.an.instanceof(PfV6BackgroundImage);
  });

  describe('simply instantiating', function() {
    let element: PfV6BackgroundImage;

    beforeEach(async function() {
      element = await createFixture<PfV6BackgroundImage>(html`
        <pf-v6-background-image></pf-v6-background-image>
      `);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-background-image');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6BackgroundImage);
    });

    it('should not have a background image set', function() {
      const bg = element.shadowRoot!.querySelector('#background')!;
      const styles = getComputedStyle(bg);
      expect(styles.getPropertyValue('background-image')).to.equal('none');
    });
  });

  describe('with src attribute', function() {
    let element: PfV6BackgroundImage;

    beforeEach(async function() {
      element = await createFixture<PfV6BackgroundImage>(html`
        <pf-v6-background-image src="/test/image.jpg"></pf-v6-background-image>
      `);
    });

    it('should apply the background image', function() {
      const bg = element.shadowRoot!.querySelector('#background')!;
      const styles = getComputedStyle(bg);
      expect(styles.getPropertyValue('background-image')).to.contain('/test/image.jpg');
    });

    it('should update background image when src changes dynamically', async function() {
      element.src = '/test/other-image.jpg';
      await element.updateComplete;
      const bg = element.shadowRoot!.querySelector('#background')!;
      const styles = getComputedStyle(bg);
      expect(styles.getPropertyValue('background-image')).to.contain('/test/other-image.jpg');
    });

    it('should not intercept pointer events', function() {
      const styles = getComputedStyle(element);
      expect(styles.pointerEvents).to.equal('none');
    });

    it('should be presentational in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      interface A11yNode {
        role?: string;
        children?: A11yNode[];
      }
      function findNode(node: A11yNode): boolean {
        if (node.role === 'img') {
          return true;
        } else {
          return node.children?.some(findNode) ?? false;
        }
      }
      expect(findNode(snapshot), 'no img role should exist in the tree').to.be.false;
    });
  });
});
