import { expect, html, fixture } from '@open-wc/testing';
// import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

describe('<pf-dropdown>', function() {
  let element: PfDropdown;
  let snapshot: A11yTreeSnapshot;
  beforeEach(async function() {
    element = await fixture<PfDropdown>(html`
      <pf-dropdown>
        <pf-button slot="trigger">Toggle dropdown</pf-button>
        <pf-dropdown-item value="value4">item4</pf-dropdown-item>
        <pf-dropdown-item value="value3">item3</pf-dropdown-item>
        <pf-dropdown-items-group label="Group 1">
          <pf-dropdown-item value="value1">item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">item2</pf-dropdown-item>
          <pf-dropdown-item divider></pf-dropdown-item>
          <pf-dropdown-item value="value3">item3</pf-dropdown-item>
        </pf-dropdown-items-group>
        <pf-dropdown-items-group label="Group 2">
          <pf-dropdown-item value="value1">item1</pf-dropdown-item>
          <pf-dropdown-item value="value2">item2</pf-dropdown-item>
          <pf-dropdown-item disabled value="disabled"
            >disabled</pf-dropdown-item
          >
          <pf-dropdown-item value="value3">item3</pf-dropdown-item>
        </pf-dropdown-items-group>
      </pf-dropdown>
    `);
    snapshot = await a11ySnapshot();
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-dropdown');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfDropdown);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });
  // it('should show dropdown content to assistive technology', async function() {
  //   await sendKeys({ press: 'Tab' });
  //   expect(document.activeElement).to.be.an.instanceof(PfButton);
  //   await sendKeys({ press: 'Enter' });
  //   snapshot = await a11ySnapshot();
  //   console.log(snapshot.children);
  //   // expect(snapshot.children).to.deep.equal([]);
  //   expect(snapshot.children).to.deep.equal([
  //     {
  //       name: 'Toggle dropdown',
  //       role: 'button',
  //     },
  //     {
  //       role: 'listbox',
  //       orientation: 'vertical',
  //     },
  //   ]);
  // });
  // describe('simply instantiating', function() {
  //   let element: PfDropdown;
  //   it('should upgrade', async function() {
  //     element = await createFixture<PfDropdown>(html`<pf-dropdown></pf-dropdown>`);
  //     const klass = customElements.get('pf-dropdown');
  //     expect(element)
  //       .to.be.an.instanceOf(klass)
  //       .and
  //       .to.be.an.instanceOf(PfDropdown);
  //   });
  // });
});
