// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, assert, aTimeout, oneEvent, nextFrame, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

// Import the element we're testing.
import { PfePrimaryDetail } from '@patternfly/pfe-primary-detail';

const testBreakpoints = {
  'mobile': { width: 320, height: 568 }, // iPhone 5
  'tablet': { width: 768, height: 1024 },
  'desktop': { width: 1400, height: 1000 },
};

const debounceDelay = 50;

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testComponent = html`
  <pfe-primary-detail id="default" automated-testing>
    <h3 slot="details-nav">Infrastructure and Management</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav">Cloud Computing</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav" id="hasIdNav">Storage</h3>
    <div slot="details" id="hasIdDetails">
      <ul>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav">Runtimes</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
      </ul>
    </div>

    <div slot="details-nav--footer">
      <a href="#">All Products</a>
    </div>
  </pfe-primary-detail>
`;

// - Begin Utility Functions ---------------------------------------------------------------------

/**
 * Make sure active toggle and detail have the correct attributes
 * @param  wrapper Component wrapper DOM object
 */
function checkActiveElementAttributes(wrapper: HTMLElement) {
  const activeId = wrapper.getAttribute('active');
  const activeDetails = Array.from(wrapper.querySelectorAll<HTMLElement>(`[slot="details"]`)).filter(details =>
    activeId === details.getAttribute('aria-labelledby'));
  activeDetails.forEach(detail => {
    const hiddenAttr = detail.hasAttribute('hidden');
    const ariaHidden = detail.getAttribute('aria-hidden');
    expect(hiddenAttr, `Element should not have the hidden attribute if active`).to.be.false;
    expect(ariaHidden, `Element should have attribute aria-hidden="false" if active`).to.equal('false');
  });
}

/**
 * Make sure active toggle and detail have the correct attributes
 * @param  wrapper Component wrapper DOM object
 */
function checkInactiveElementsAttributes(wrapper: HTMLElement) {
  const activeId = wrapper.getAttribute('active');
  const inactiveDetails = Array.from(wrapper.querySelectorAll<HTMLElement>(`[slot="details"]`)).filter(details =>
    activeId !== details.getAttribute('aria-labelledby'));

  inactiveDetails.forEach(detail => {
    const hiddenAttr = detail.hasAttribute('hidden');
    const ariaHidden = detail.getAttribute('aria-hidden');
    expect(ariaHidden, `Element should have attribute aria-hidden="true" if inactive`).to.equal('true');
    expect(hiddenAttr, `Element ${activeId} ${detail.outerHTML} should have the hidden attribute if inactive`).to.be.true;
  });
}

/**
 * Adds a new Detail and Detail Nav item to PFE Primary Detail Component
 * @param object primaryDetailElement Optional, DOM Object for the component wrapper
 * @param string preOrAppend Optional, should be set to 'prepend' or 'append' Whether to add the new items at the end or the beginning
 * @returns array First index is a pointer to the Detail Nav item, the second is a pointer to the content
 */
function addPrimaryDetailsElementContent(
  primaryDetailElement: HTMLElement,
  preOrAppend: string
): Array<HTMLElement> {
  if (typeof primaryDetailElement === 'undefined') {
    primaryDetailElement = document.querySelector('pfe-primary-detail')!;
  }

  if (typeof preOrAppend === 'undefined') {
    preOrAppend = 'append';
  }

  const newDetailNavItem = document.createElement('h3');
  newDetailNavItem.innerText = 'Dynamically added';
  newDetailNavItem.setAttribute('slot', 'details-nav');

  const newDetailContent = document.createElement('div');
  newDetailContent.innerHTML = `
    <ul>
      <li><a href="#nowhere">Dynamic Lorum ipsum dolor sit amet</a></li>
      <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
    </ul>`;
  newDetailContent.setAttribute('slot', 'details');

  switch (preOrAppend) {
    case 'prepend':
      primaryDetailElement.prepend(newDetailContent);
      primaryDetailElement.prepend(newDetailNavItem);
      break;
    case 'append':
      primaryDetailElement.append(newDetailNavItem);
      primaryDetailElement.append(newDetailContent);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('addPrimaryDetailsElementContent: preOrAppend not set correctly');
      break;
  }

  return [newDetailNavItem, newDetailContent];
}

/**
 * Begin tests
 */
describe('<pfe-primary-detail>', function() {
  // Var to hold each instance of the nav
  let primaryDetail: PfePrimaryDetail|null = null;

  // Makes a fresh instance of component for each test case
  beforeEach(async function() {
    // Sets the viewport to desktop for every test
    await setViewport(testBreakpoints['desktop']);
    primaryDetail = await createFixture<PfePrimaryDetail>(testComponent);
  });

  it('it should upgrade', async function() {
    expect(primaryDetail)
      .to.be.an.instanceOf(customElements.get('pfe-primary-detail'))
      .and
      .to.be.an.instanceOf(PfePrimaryDetail);
  });

  it('Component should get proper attributes', async function() {
    expect(
      primaryDetail!.getAttribute('role'),
      'Primary detail component should have a role of tablist'
    )
      .to.equal('tablist');

    expect(
      primaryDetail!.getAttribute('aria-orientation'),
      'Primary detail component should have a aria-orientation set to vertical'
    )
      .to.equal('vertical');
  });

  it('Aria attributes on nav and detail wrappers should point to valid ids', async function() {
    const toggles = primaryDetail!.querySelectorAll<HTMLElement>('[slot="details-nav"]');
    for (const toggle of toggles) {
      const ariaControls = toggle.getAttribute('aria-controls');

      expect(toggle.getAttribute('role'), 'Toggle\'s role is not set to tab')
        .to.equal('tab');

      // Get the details (controlled) element
      const controlledElement = document.getElementById(ariaControls!);
      expect(
        controlledElement,
        'Toggle does not have a valid ID in aria-controls'
      ).to.not.be.null;

      expect(
        controlledElement!.getAttribute('role'),
        'Detail element does not have role set to tabpanel'
      ).to.equal('tabpanel');

      expect(
        controlledElement!.getAttribute('aria-labelledby'),
        'Detail element does not have it\'s toggle\'s ID in aria-labelledby'
      ).to.equal(toggle.id);

      expect(
        controlledElement!.dataset.index,
        'A toggle and it\'s detail wrapper don\'t have the same index'
      ).to.equal(toggle.dataset.index);
    }
  });

  it('First element should be selected by default', async function() {
    await nextFrame();

    const firstNavItem = primaryDetail!.querySelector<HTMLElement>(`[slot="details-nav"][data-index="0"]`);
    const firstDetailItem = primaryDetail!.querySelector<HTMLElement>(`[slot="details"][data-index="0"]`);

    expect(firstNavItem!.hasAttribute('aria-selected'), `First Navigation Element should have aria-selected by defailt`).to.be.true;
    expect(firstDetailItem!.getAttribute('aria-hidden'), `First Detail Element should have aria-hidden="false" by default`).to.equal('false');
    expect(firstDetailItem!.hasAttribute('hidden'), `First Detail Element should have not have hidden attribute`).to.be.false;

    expect(primaryDetail!.active, 'Active property should be null by defaul').to.be.null;
  });

  it('Active and inactive toggles & details should have proper attributes', async function() {
    const inactiveToggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"][aria-selected="false"]`);
    const randomToggleToActivate =
      inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();
    await nextFrame();

    const activeToggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"][aria-selected="true"]`);
    expect(activeToggles!.length).to.equal(1);

    checkActiveElementAttributes(primaryDetail!);
    checkInactiveElementsAttributes(primaryDetail!);
  });

  it(`When an inactive toggle is clicked, it should become active and all others inactive`, async function() {
    const inactiveToggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"][aria-selected="false"]`);
    const randomToggleToActivate =
      inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();

    await nextFrame();

    checkActiveElementAttributes(primaryDetail!);
    checkInactiveElementsAttributes(primaryDetail!);
  });

  it('Specified ids should not be overridden', async function() {
    const detailNavWithId = primaryDetail!.querySelector('#hasIdNav')!;
    const detailWithId = primaryDetail!.querySelector('#hasIdNav')!;

    expect(detailNavWithId).to.not.be.null;
    // Another test should have failed if this was an issue,
    // BUT want to make sure that the element with ID is processed and the ID was maintained
    expect(
      detailNavWithId.hasAttribute('data-index'),
      'Detail nav appears to be in default state and wasn\'t processed?'
    ).to.be.true;

    expect(detailWithId).to.not.be.null;
  });

  it(`Dynamically added content should be processed, have correct attributes, and update when selected`, async function() {
    const inactiveToggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"][aria-selected="false"]`);
    const randomToggleToActivate =
      inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();

    await nextFrame();

    const activeToggleAttribute = primaryDetail!.getAttribute('active');
    const activeToggle = primaryDetail!.querySelector(`[slot="details-nav"][aria-selected="true"]`);

    const [prependedNavItem, prependedDetail] =
      addPrimaryDetailsElementContent(primaryDetail!, 'prepend');

    // Give a little time for the component to process the new content
    await aTimeout(0);

    // Set vars to test dynamically added content
    const firstNavItem = primaryDetail!.querySelector<HTMLElement>('[slot="details-nav"]')!;
    const firstDetail = primaryDetail!.querySelector('div')!;
    const firstDetailMenuItem = firstDetail!.querySelector('li a')!;
    const prependedDetailFirstMenuItem = prependedDetail.querySelector('li a')!;

    assert.strictEqual(
      prependedNavItem.textContent,
      firstNavItem!.textContent,
      'Dynamically prepended content text is not equal to the prepended nav item'
    );

    assert.strictEqual(
      firstDetailMenuItem!.textContent,
      prependedDetailFirstMenuItem!.textContent,
      'Dynamically prepended detail menu does not equal the text of the first detail menu item'
    );

    assert.strictEqual(
      firstNavItem!.dataset.index,
      '0',
      'Dynamically prepended content is not set as the first item'
    );

    assert.strictEqual(
      firstNavItem!.dataset.index,
      firstDetail!.dataset.index,
      'Dynamically prepended toggle and detail do not have the same index'
    );

    assert.strictEqual(
      activeToggle!.id,
      activeToggleAttribute,
      'Active toggle should not change when new content is added to the component'
    );

    // Append a new nav item and detail and set them to vars for testing
    const [appendedNavItem, appendedDetail] =
      addPrimaryDetailsElementContent(primaryDetail!, 'append');

    // Give a little time for the component to process the new content
    await aTimeout(0);

    const navItems = primaryDetail!.querySelectorAll<HTMLElement>('[slot="details-nav"]')!;
    const lastNavItem = navItems[navItems.length - 1];
    const lastDetail = primaryDetail!.querySelector<HTMLElement>('div:last-of-type')!;
    const lastDetailMenuItem = lastDetail!.querySelector('li a');
    const appendedDetailFirstMenuItem = appendedDetail.querySelector('li a');

    assert.strictEqual(
      appendedNavItem.textContent,
      lastNavItem.textContent,
      'Dynamically appended content text is not equal to the appended nav item'
    );

    assert.strictEqual(
      lastDetailMenuItem!.textContent,
      appendedDetailFirstMenuItem!.textContent,
      'Dynamically appended detail menu does not equal the text of the last detail menu item'
    );

    assert.strictEqual(
      lastNavItem.dataset.index,
      '5',
      'Dynamically appended content is not set as the last item'
    );

    assert.strictEqual(
      lastNavItem.dataset.index,
      lastDetail.dataset.index,
      'Dynamically appended toggle and detail do not have the same index'
    );
  });

  it(`Component should go down to compact when the compact class is added`, async function() {
    let breakpointClass = primaryDetail!.shadowRoot?.querySelector('#wrapper')?.classList.contains('compact');
    const breakPointWidth = primaryDetail!.breakpointWidth;
    expect(breakpointClass, `Component should be in desktop state above ${breakPointWidth}`).to.be.false;

    const inactiveToggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"][aria-selected="false"]`);
    const randomToggleToActivate = inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];
    randomToggleToActivate.click();
    await primaryDetail!.updateComplete;

    await setViewport(testBreakpoints.mobile);
    await aTimeout(debounceDelay + 100);
    await primaryDetail!.updateComplete;

    breakpointClass = primaryDetail!.shadowRoot?.querySelector('#wrapper')?.classList.contains('compact');
    expect(breakpointClass, `Component should be compact state below ${breakPointWidth}`).to.be.true;

    let currentActiveToggle = primaryDetail!.querySelector(`[slot="details-nav"][aria-expanded="true"]`);

    assert.strictEqual(randomToggleToActivate.id, currentActiveToggle!.id);

    let postResizeActiveToggle = primaryDetail!.getAttribute('active');

    assert.strictEqual(postResizeActiveToggle, currentActiveToggle!.id);

    expect(
      Array.from(primaryDetail!.shadowRoot!.querySelectorAll('[aria-expanded]'),
        x => x.getAttribute('aria-expanded')).every(x => x === 'true' || x === 'false'),
      'aria-expanded attributes in shadow DOM should either be `"true"` or `"false"`'
    ).to.be.true;

    await setViewport(testBreakpoints.desktop);
    await aTimeout(debounceDelay + 100);
    await primaryDetail!.updateComplete;

    breakpointClass = primaryDetail!.classList.contains('compact');

    expect(breakpointClass, `Component should be in desktop state above ${breakPointWidth}`).to.be.false;

    currentActiveToggle = primaryDetail!.querySelector(`[slot="details-nav"][aria-selected="true"]`);

    postResizeActiveToggle = primaryDetail!.getAttribute('active');

    assert.strictEqual(postResizeActiveToggle, currentActiveToggle!.id);
  });

  it('it should fire a pfe-primary:hidden-tab event when a tab is closed', async function() {
    const eventListener = oneEvent(primaryDetail!, 'pfe-primary-detail:hidden-tab');
    const toggles = primaryDetail!.querySelectorAll<HTMLElement>(`[slot="details-nav"]`);
    const activatedToggle = toggles[Math.floor(Math.random() * toggles.length)];
    activatedToggle.click();

    expect(activatedToggle.getAttribute('aria-selected'), `First activated toggle should be selected`).to.equal('true');

    let activeToggleIndex: number;
    if (activatedToggle.dataset.index) {
      activeToggleIndex = parseInt(activatedToggle.dataset.index);
    }

    const secondActivatedToggle = Array.from(toggles).find(toggle => {
      if (toggle.dataset.index) {
        return parseInt(toggle.dataset.index) !== activeToggleIndex;
      }
    });

    secondActivatedToggle!.click();

    expect(secondActivatedToggle!.getAttribute('aria-selected'), `Second activated toggle should be selected`).to.equal('true');

    const { detail } = await eventListener;

    assert.strictEqual(
      detail.tab.id,
      activatedToggle.id,
      `Since "${activatedToggle.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.tab should point to that detailNav`
    );

    assert.strictEqual(
      detail.details.getAttribute('aria-labelledby'),
      activatedToggle.id,
      `Since "${activatedToggle.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.details should point to the detail pane corresponding to the closed detailNav`
    );
  });

  it('it should fire a pfe-primary:shown-tab event when a tab is opened', async function() {
    const [, secondDetailNav] = primaryDetail!.querySelectorAll<HTMLElement>('[slot="details-nav"]');
    const secondDetails = document.getElementById(secondDetailNav.getAttribute('aria-controls')!)!;
    const eventListener = oneEvent(primaryDetail!, 'pfe-primary-detail:shown-tab');

    // Click on secondDetailNav which will close the activeDetailNav
    secondDetailNav.click();

    const { detail } = await eventListener;
    assert.strictEqual(
      detail.tab.id,
      secondDetailNav.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:shown-tab's event.detail.tab should point to that detailNav`
    );

    assert.strictEqual(
      detail.details.id,
      secondDetails.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:shown-tab's event.detail.details should point to the detail pane corresponding to the closed detailNav`
    );
  });
});
