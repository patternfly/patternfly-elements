import { expect, html, aTimeout, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import type { PfOption } from '../pf-option.js';

async function holdShift() {
  await sendKeys({ down: 'Shift' });
}

async function releaseShift() {
  await sendKeys({ up: 'Shift' });
}

async function holdCtrl() {
  await sendKeys({ down: 'Control' });
}

async function releaseCtrl() {
  await sendKeys({ up: 'Control' });
}

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

/**
 * Compare selection to an array of strings
 * @param element pf-select
 * @returns a list of values of each selected option
 */
function getSelectedOptionValues(element: PfSelect): string[] {
  return element.selected.filter(x => !!x).map(x => x!.value);
}

// a11yShapshot does not surface the options
function getVisibleOptionValues(element: PfSelect): string[] {
  return element.options.filter(x => !x.hidden).map(x => x.value);
}

// a11yShapshot does not surface the options
function getActiveOption(element: PfSelect) {
  return element.options.find(x => x.active);
}

describe('<pf-select>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-select')).to.be.an.instanceof(PfSelect);
  });

  it('should upgrade', async function() {
    expect(await createFixture<PfSelect>(html`<pf-select></pf-select>`))
        .to.be.an.instanceOf(customElements.get('pf-select'))
        .and
        .to.be.an.instanceOf(PfSelect);
  });

  describe('with accessible-label attribute and 3 items', function() {
    let element: PfSelect;
    const updateComplete = () => element.updateComplete;
    const focus = () => element.focus;

    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select accessible-label="label">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
        </pf-select>`);
    });

    it('passes aXe audit', async function() {
      await expect(element).to.be.accessible();
    });

    it('labels the combobox with the accessible-label attribuet', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'combobox',
        name: 'label',
      });
    });

    it('does not have redundant role', async function() {
      expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
    });

    it('sets aria-setsize="3" and aria-posinset on items', function() {
      element.options.forEach((option, i) => {
        expect(option).to.have.attr('aria-setsize', '3');
        expect(option).to.have.attr('aria-posinset', `${i + 1}`);
      });
    });

    describe('focus()', function() {
      beforeEach(focus);
      beforeEach(updateComplete);
      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));

        it('labels the listbox with the accessible-label attribute', async function() {
          expect(await a11ySnapshot()).to.axContainQuery({
            role: 'listbox',
            name: 'label',
          });
        });

        it('focuses on the first item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);
          it('selects the first item', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal([
              '1',
            ]);
          });
          it('exposes selection to assistive technology', async function() {
            expect(await a11ySnapshot()).to.axContainQuery({
              role: 'combobox',
              value: '1',
            });
          });
        });
      });
    });
  });

  describe('with `placeholder` attribute and 3 items', function() {
    let element: PfSelect;
    const updateComplete = () => element.updateComplete;
    const focus = () => element.focus;

    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select placeholder="placeholder">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
        </pf-select>`);
    });

    it('passes aXe audit', async function() {
      await expect(element).to.be.accessible();
    });

    it('labels the combobox with the placeholder attribute', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'combobox',
        name: 'placeholder',
      });
    });

    it('does not have redundant role', async function() {
      expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
    });

    it('sets aria-setsize="4" and aria-posinset on items', function() {
      element.options.forEach((option, i) => {
        expect(option).to.have.attr('aria-setsize', '4');
        expect(option).to.have.attr('aria-posinset', `${i + 1}`);
      });
    });

    describe('focus()', function() {
      beforeEach(focus);
      beforeEach(updateComplete);
      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));

        it('labels the listbox with the placeholder attribute', async function() {
          expect(await a11ySnapshot()).to.axContainQuery({
            role: 'listbox',
            name: 'placeholder',
          });
        });

        it('focuses on the placeholder item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('placeholder');
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('selects nothing', async function() {
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          it('does not close the listbox nothing', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal([]);
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);

            it('focuses on the first item', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
            });

            describe('Space', function() {
              beforeEach(press(' '));
              beforeEach(updateComplete);
              it('selects option 1', function() {
                expect(getSelectedOptionValues(element)).to.deep.equal([
                  '1',
                ]);
              });
              it('exposes selection to assistive technology', async function() {
                expect(await a11ySnapshot()).to.axContainQuery({
                  role: 'combobox',
                  value: '1',
                });
              });
            });
          });
        });
      });
    });
  });

  describe('with 3 items and associated <label> elements', function() {
    let element: PfSelect;
    const updateComplete = () => element.updateComplete;
    const focus = () => element.focus;

    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select id="select">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
        </pf-select>
        <label for="select">label1</label>
        <label for="select">label2</label>
        `);
    });

    it('passes aXe audit', async function() {
      await expect(element).to.be.accessible();
    });

    it('does not have redundant role', async function() {
      expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
    });

    it('labels the combobox with the label elements', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'combobox',
        name: 'label1label2',
      });
    });

    it('sets aria-setsize="3" and aria-posinset on items', function() {
      element.options.forEach((option, i) => {
        expect(option).to.have.attr('aria-setsize', '3');
        expect(option).to.have.attr('aria-posinset', `${i + 1}`);
      });
    });

    describe('focus()', function() {
      beforeEach(focus);
      beforeEach(updateComplete);
      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));

        it('labels the listbox with the label elements', async function() {
          expect(await a11ySnapshot()).to.axContainQuery({
            role: 'listbox',
            name: 'label1label2',
          });
        });

        it('focuses on the first item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);
          it('selects the first item', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal([
              '1',
            ]);
          });
          it('exposes selection to assistive technology', async function() {
            expect(await a11ySnapshot()).to.axContainQuery({
              role: 'combobox',
              value: '1',
            });
          });
        });
      });
    });
  });

  describe('in a deep shadow root', function() {
    let element: PfSelect;
    const focus = () => element.focus();
    const updateComplete = () => element.updateComplete;
    beforeEach(async function() {
      const fixture = await createFixture(html`
      <shadow-root>
        <template shadowrootmode="open">
          <shadow-root>
            <template shadowrootmode="open">
              <pf-select variant="single"
                         accessible-label="Choose a number"
                         placeholder="Choose a number">
                <pf-option value="1">1</pf-option>
                <pf-option value="2">2</pf-option>
                <pf-option value="3">3</pf-option>
                <pf-option value="4">4</pf-option>
                <pf-option value="5">5</pf-option>
                <pf-option value="6">6</pf-option>
                <pf-option value="7">7</pf-option>
                <pf-option value="8">8</pf-option>
              </pf-select>
            </template>
          </shadow-root>
        </template>
      </shadow-root>`);

      function attachShadowRoots(root?: Document | ShadowRoot) {
        root?.querySelectorAll<HTMLTemplateElement>('template[shadowrootmode]').forEach(template => {
          const mode = template.getAttribute('shadowrootmode') as 'open' | 'closed';
          const shadowRoot = template.parentElement?.attachShadow?.({ mode });
          shadowRoot?.appendChild(template.content);
          template.remove();
          attachShadowRoots(shadowRoot);
        });
      }
      attachShadowRoots(document);

      const select = fixture.shadowRoot?.firstElementChild?.shadowRoot?.querySelector('pf-select');
      if (select) {
        element = select;
        await element?.updateComplete;
      } else {
        throw new Error('no element!');
      }
    });

    describe('expanding', function() {
      beforeEach(focus);
      beforeEach(press('Enter'));
      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('remains expanded', function() {
          expect(element.expanded).to.be.true;
        });
        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('remains expanded', function() {
            expect(element.expanded).to.be.true;
          });
          describe('Space', function() {
            beforeEach(press(' '));
            beforeEach(updateComplete);
            it('closes', function() {
              expect(element.expanded).to.be.false;
            });
            it('sets value', function() {
              expect(element.value).to.equal('2');
            });
          });
        });
      });
    });
  });

  describe('with 8 items', function() {
    let element: PfSelect;
    const updateComplete = () => element.updateComplete;
    const focus = () => element.focus();

    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select>
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
          <pf-option value="4">4</pf-option>
          <pf-option value="5">5</pf-option>
          <pf-option value="6">6</pf-option>
          <pf-option value="7">7</pf-option>
          <pf-option value="8">8</pf-option>
        </pf-select>`);
    });

    it('does not pass aXe audit', async function() {
      await expect(element).to.not.be.accessible();
    });

    it('sets aria-setsize and aria-posinset on items', function() {
      element.options.forEach((option, i) => {
        expect(option).to.have.attr('aria-setsize', '8');
        expect(option).to.have.attr('aria-posinset', `${i + 1}`);
      });
    });

    describe('click combobox button', function() {
      beforeEach(() => clickElementAtCenter(element));
      beforeEach(updateComplete);

      it('does not pass aXe audit', async function() {
        await expect(element).to.not.be.accessible();
      });

      it('expands the listbox', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the first item', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        it('does not focus the combobox button', async function() {
          expect(await a11ySnapshot()).to.not.have.axTreeFocusedNode;
        });
      });
    });

    describe('focus()', function() {
      beforeEach(focus);
      beforeEach(updateComplete);

      it('focuses on the combobox button', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
      });

      it('does not expand the listbox', async function() {
        expect(element.expanded).to.be.false;
        expect(await a11ySnapshot()).to.not.axContainRole('listbox');
      });

      describe('Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands the listbox', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        it('focuses on the first item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });
      });

      describe('Space', function() {
        beforeEach(function() {
          document.body.style.height = '8000px';
        });
        afterEach(function() {
          document.body.style.height = 'initial';
        });

        beforeEach(press(' '));
        beforeEach(updateComplete);
        beforeEach(() => aTimeout(300));

        it('expands the listbox', async function() {
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        it('focuses on the first item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });

        it('does not scroll the screen', function() {
          expect(window.scrollY).to.equal(0);
        });
      });

      describe('Home', function() {
        beforeEach(press('Home'));
        beforeEach(updateComplete);

        it('expands the listbox', async function() {
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        it('focuses on option 1', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });
      });

      describe('End', function() {
        beforeEach(press('End'));
        beforeEach(updateComplete);

        it('expands the listbox', async function() {
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        it('focuses on option 8', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands the listbox', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        it('focuses on the first item', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          beforeEach(updateComplete);
          it('focuses on the last option', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
          });
          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses on option 1', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
            });
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('focuses on option 2', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('2');
          });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses on option 1', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
            });
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses on option 3', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('3');
            });

            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);

              it('selects option 3', function() {
                expect(getSelectedOptionValues(element)).to.deep.equal([
                  '3',
                ]);
              });

              it('exposes selection to assistive technology', async function() {
                expect(await a11ySnapshot()).to.axContainQuery({
                  role: 'combobox',
                  value: '3',
                });
              });

              it('hides the listbox', async function() {
                expect(element.expanded).to.be.false;
                expect(await a11ySnapshot()).to.not.axContainRole('listbox');
              });

              describe('ArrowDown', function() {
                beforeEach(press('ArrowDown'));
                beforeEach(updateComplete);

                it('expands the listbox', async function() {
                  expect(element.expanded).to.be.true;
                  expect(await a11ySnapshot()).to.axContainRole('listbox');
                });

                describe('Home', function() {
                  beforeEach(press('Home'));
                  beforeEach(updateComplete);

                  it('focuses on option 1', async function() {
                    expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                  });

                  describe('Home', function() {
                    beforeEach(press('Home'));
                    beforeEach(updateComplete);

                    it('focuses on option 1', async function() {
                      expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                    });
                  });
                });
              });
            });
          });

          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('selects option 2', function() {
              expect(getSelectedOptionValues(element)).to.deep.equal(['2']);
            });

            it('exposes selection to assistive technology', async function() {
              expect(await a11ySnapshot()).to.axContainQuery({
                role: 'combobox',
                value: '2',
              });
            });
          });
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });

          it('focuses the combobox toggle', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox');
          });

          it('selects option 1', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal([
              '1',
            ]);
          });

          it('exposes selection to assistive technology', async function() {
            expect(await a11ySnapshot()).to.axContainQuery({
              role: 'combobox',
              value: '1',
            });
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });
          it('does not focus on the combobox button', async function() {
            expect(await a11ySnapshot()).to.not.have.axTreeFocusedNode;
          });
        });

        describe('Shift+Tab', function() {
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
          beforeEach(updateComplete);

          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });

          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox');
          });
        });

        describe('Escape', function() {
          beforeEach(press('Escape'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);

          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });

          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox');
          });
        });
      });
    });
  });
});

describe('<pf-select variant="checkbox">', function() {
  let element: PfSelect;
  let items: PfOption[];
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="checkbox"
                 placeholder="placeholder"
                 accessible-label="Check it out">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
        <pf-option value="4">4</pf-option>
        <pf-option value="5">5</pf-option>
        <pf-option value="6">6</pf-option>
        <pf-option value="7">7</pf-option>
        <pf-option value="8">8</pf-option>
      </pf-select>`);
    items = Array.from(element.querySelectorAll('pf-option'));
  });

  it('is accessible', async function() {
    await expect(element).to.be.accessible();
  });

  it('does not have redundant role', async function() {
    expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
  });

  describe('focus()', function() {
    beforeEach(focus);

    beforeEach(updateComplete);
    describe('Enter', function() {
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(1)).to.be.ok;
        expect(snapshot.children?.at(1)?.role).to.equal('listbox');
      });

      it('should NOT use checkbox role for options', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(1)?.children?.filter(x => x.role === 'checkbox')?.length)
            .to.equal(0);
      });
    });

    describe('Space', function() {
      beforeEach(press(' '));
      beforeEach(updateComplete);
      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);
      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses the placeholder', async function() {
        expect(await a11ySnapshot()).to.have.axTreeFocusedNode.to.have.axName('placeholder');
      });

      describe('Shift+Tab', function() {
        beforeEach(holdShift);
        beforeEach(press('Tab'));
        beforeEach(releaseShift);
        beforeEach(updateComplete);

        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox');
        });
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        // a little extra sleep to de-flake this test
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });
        it('hides the listbox', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox).to.be.undefined;
        });
      });

      describe('Escape', function() {
        beforeEach(press('Escape'));
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });
        it('hides the listbox', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.undefined;
        });
        it('focuses the button', async function() {
          const snapshot = await a11ySnapshot();
          const focused = querySnapshot(snapshot, { focused: true });
          expect(focused?.role).to.equal('combobox');
        });
      });

      describe('Ctrl-A', function() {
        beforeEach(holdCtrl);
        beforeEach(press('A'));
        beforeEach(releaseCtrl);
        beforeEach(updateComplete);
        it('selects all', function() {
          expect(element.selected.length).to.equal(items.length);
        });
        it('remains expanded', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        describe('Ctrl-A', function() {
          beforeEach(holdCtrl);
          beforeEach(press('A'));
          beforeEach(releaseCtrl);
          beforeEach(updateComplete);
          it('deselects all', function() {
            expect(element.selected.length).to.equal(0);
          });
          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });
        });
      });

      describe('Space', function() {
        it('does not select anything', function() {
          expect(element.selected).to.deep.equal([]);
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            // because the placeholder was focused
            expect(getSelectedOptionValues(element)).to.deep.equal(['1']);
          });

          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);

            it('focuses option 2', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot).to.have.axQuery({
                focused: true,
                name: '2',
              });
            });

            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds option 2 to selection', function() {
                expect(getSelectedOptionValues(element)).to.deep.equal([
                  '1',
                  '2',
                ]);
              });

              it('remains expanded', async function() {
                expect(element.expanded).to.be.true;
                expect(await a11ySnapshot()).to.axContainRole('listbox');
              });
            });
          });

          describe('holding Shift', function() {
            beforeEach(holdShift);
            afterEach(releaseShift);
            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(nextFrame);
              it('adds option 2 to selection', function() {
                expect(getSelectedOptionValues(element)).to.deep.equal([
                  '1',
                  '2',
                ]);
              });
              describe('Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);
                it('makes no change', function() {
                  expect(getSelectedOptionValues(element)).to.deep.equal([
                    '1',
                    '2',
                  ]);
                });
                beforeEach(updateComplete);
                describe('ArrowDown', function() {
                  beforeEach(press('ArrowDown'));
                  beforeEach(updateComplete);
                  it('adds option 3 to the selected list', function() {
                    expect(getSelectedOptionValues(element)).to.deep.equal([
                      '1',
                      '2',
                      '3',
                    ]);
                  });
                  describe('ArrowUp', function() {
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    it('makes no change to selection', function() {
                      expect(getSelectedOptionValues(element)).to.deep.equal([
                        '1',
                        '2',
                        '3',
                      ]);
                    });
                  });
                });
              });
            });
          });
        });
      });

      describe('clicking the first item', function() {
        beforeEach(() => clickElementAtCenter(items.at(0)!));
        beforeEach(updateComplete);

        it('selects option 1', function() {
          // because the placeholder was focused
          expect(getSelectedOptionValues(element)).to.deep.equal(['1']);
        });

        it('remains expanded', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        describe('holding Shift', function() {
          beforeEach(holdShift);
          afterEach(releaseShift);
          describe('clicking the 7th item', function() {
            beforeEach(() => clickElementAtCenter(items.at(6)!));
            it('remains expanded', async function() {
              expect(element.expanded).to.be.true;
              expect(await a11ySnapshot()).to.axContainRole('listbox');
            });

            it('selects items 1-7', function() {
              expect(getSelectedOptionValues(element)).to.deep.equal([
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
              ]);
            });

            describe('releasing Shift', function() {
              beforeEach(releaseShift);
              describe('clicking 6th item', function() {
                beforeEach(() => clickElementAtCenter(items.at(5)!));
                it('deselects item 6', function() {
                  expect(getSelectedOptionValues(element)).to.not.contain('6');
                });
                describe('holding Shift', function() {
                  beforeEach(holdShift);
                  describe('clicking 2nd item', function() {
                    beforeEach(() => clickElementAtCenter(items.at(1)!));
                    it('deselects items 2-6', function() {
                      expect(getSelectedOptionValues(element)).to.deep.equal(['1', '7']);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

describe('<pf-select variant="typeahead">', function() {
  let element: PfSelect;
  const label = 'label';
  const placeholder = 'placeholder';
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();

  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeahead">
        <pf-option>Blue</pf-option>
        <pf-option>Green</pf-option>
        <pf-option>Magenta</pf-option>
        <pf-option>Orange</pf-option>
        <pf-option>Purple</pf-option>
        <pf-option>Periwinkle</pf-option>
        <pf-option>Pink</pf-option>
        <pf-option>Red</pf-option>
        <pf-option>Yellow</pf-option>
      </pf-select>`);
  });

  beforeEach(nextFrame);

  it('does not have redundant role', async function() {
    expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
  });

  it('labels the combobox input with the first option', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'combobox',
      name: 'Blue',
    });
  });

  describe('with an `accessible-label` attribute', function() {
    beforeEach(function() {
      element.setAttribute('accessible-label', label);
    });
    beforeEach(nextFrame);
    it('does not have redundant role', async function() {
      expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
    });
    it('labels the combobox with the label', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'combobox',
        name: label,
      });
    });
    it('labels the toggle button with the label', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'button',
        name: label,
      });
    });
  });

  describe('with a `placeholder` attribute', function() {
    beforeEach(function() {
      element.setAttribute('placeholder', placeholder);
    });
    beforeEach(nextFrame);
    it('lists the placeholder as first among the options', function() {
      expect(element.options.at(0)).to.have.text(placeholder);
    });
    it('does not have redundant role', async function() {
      expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
    });
    it('labels the combobox with the placeholder', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'combobox',
        name: placeholder,
      });
    });
    it('labels the toggle button with the placeholder', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'button',
        name: placeholder,
      });
    });
  });

  describe('focus()', function() {
    beforeEach(focus);
    beforeEach(updateComplete);

    it('focuses the combobox input', async function() {
      expect(await a11ySnapshot()).axTreeFocusedNode
          .to.have.axRole('combobox')
          .and
          .to.have.axName('Blue');
    });

    describe('"r"', function() {
      beforeEach(press('r'));
      beforeEach(updateComplete);

      it('only shows options that start with "r" or "R"', async function() {
        expect(getVisibleOptionValues(element)).to.deep.equal([
          'Red',
        ]);
      });
    });

    describe('Space', function() {
      beforeEach(function() {
        document.body.style.height = '8000px';
      });
      afterEach(function() {
        document.body.style.height = 'initial';
      });

      beforeEach(press(' '));
      beforeEach(updateComplete);
      beforeEach(() => aTimeout(300));

      it('does not expand the listbox', async function() {
        expect(await a11ySnapshot()).to.not.axContainRole('listbox');
      });

      it('does not scroll the screen', function() {
        expect(window.scrollY).to.equal(0);
      });
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);
      beforeEach(() => aTimeout(200));

      it('shows the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses option 1', function() {
        expect(getActiveOption(element)).to.have.value('Blue');
      });

      it('does not move keyboard focus', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('focuses option 2', function() {
          expect(getActiveOption(element)).to.have.text('Green');
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);

          it('selects option 2', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal([
              'Green',
            ]);
          });

          it('sets typeahead input to second option value', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axProperty('value', 'Green');
          });

          it('retains focus on combobox input', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          });

          it('hides the listbox', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });
        });
      });

      describe('ArrowUp', function() {
        beforeEach(press('ArrowUp'));
        beforeEach(updateComplete);
        it('focuses the last item', async function() {
          expect(getActiveOption(element)).to.have.value('Yellow');
        });
      });
    });

    describe('"p"', function() {
      beforeEach(press('p'));
      beforeEach(updateComplete);

      it('shows the listbox and maintains focus', async function() {
        expect(await a11ySnapshot())
            .to.axContainRole('listbox')
            .and.axTreeFocusedNode
            .to.have.axRole('combobox')
            .and.to.have.axProperty('value', 'p');
      });

      it('only shows listbox items starting with the letter p', function() {
        expect(getVisibleOptionValues(element)).to.deep.equal([
          'Purple',
          'Periwinkle',
          'Pink',
        ]);
      });

      describe('Backspace', function() {
        beforeEach(press('Backspace'));
        beforeEach(updateComplete);

        it('shows the listbox and maintains focus', async function() {
          expect(await a11ySnapshot())
              .to.axContainRole('listbox')
              .and.axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.not.have.axProperty('value', 'p');
        });

        it('all options are visible', async function() {
          expect(getVisibleOptionValues(element)).to.deep.equal([
            'Blue',
            'Green',
            'Magenta',
            'Orange',
            'Purple',
            'Periwinkle',
            'Pink',
            'Red',
            'Yellow',
          ]);
        });
      });

      describe('"u"', function() {
        let lastInputEvent: Event | undefined;
        beforeEach(function() {
          element.addEventListener('input', function(event) {
            lastInputEvent = event;
          });
        });
        afterEach(function() {
          lastInputEvent = undefined;
        });
        beforeEach(press('u'));
        beforeEach(updateComplete);

        it('only shows the option "Purple"', function() {
          expect(getVisibleOptionValues(element)).to.deep.equal([
            'Purple',
          ]);
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('focuses the option "Purple"', function() {
            expect(getActiveOption(element)).to.have.text('Purple');
          });

          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('selects the option "Purple"', function() {
              expect(getSelectedOptionValues(element)).to.deep.equal([
                'Purple',
              ]);
            });

            describe('Backspace (x5)', function() {
              beforeEach(press('Backspace'));
              beforeEach(press('Backspace'));
              beforeEach(press('Backspace'));
              beforeEach(press('Backspace'));
              beforeEach(press('Backspace'));

              it('shows the options starting with "P"', function() {
                expect(getVisibleOptionValues(element)).to.deep.equal([
                  'Purple',
                  'Periwinkle',
                  'Pink',
                ]);
              });

              describe('Home', function() {
                beforeEach(press('Home'));

                it('retains focus on the option "Purple"', function() {
                  expect(getActiveOption(element)).to.have.text('Purple');
                });

                it('moves cursor to start', function() {
                  // WARNING: ties test to DOM structure
                  const input = element.shadowRoot?.querySelector('input');
                  expect(input?.selectionStart).to.equal(0);
                });
              });
              describe('End', function() {
                beforeEach(press('End'));

                it('retains focus on the option "Purple"', function() {
                  expect(getActiveOption(element)).to.have.text('Purple');
                });

                it('moves cursor to start', function() {
                  // WARNING: ties test to DOM structure
                  const input = element.shadowRoot?.querySelector('input');
                  expect(input?.selectionStart).to.equal(1);
                });
              });
            });
          });
        });
      });
    });
  });

  describe.skip('setting filter to "*"', function() {
    beforeEach(function() {
      // @ts-expect-error: todo: add filter feature
      element.filter = '*';
    });
    beforeEach(updateComplete);
    it('does not error', async function() {
      const snapshot = await a11ySnapshot();
      const [, , listbox] = snapshot.children ?? [];
      expect(listbox?.children).to.not.be.ok;
    });
  });

  describe.skip('custom filtering', function() {
    beforeEach(function() {
      // @ts-expect-error: we intend to implement this in the next release
      element.customFilter = option =>
        // @ts-expect-error: TODO add filter feature
        new RegExp(element.filter).test(option.value);
    });

    beforeEach(focus);

    beforeEach(updateComplete);

    describe('r', function() {
      beforeEach(press('r'));
      beforeEach(updateComplete);
      it('shows options that contain "r"', async function() {
        expect(getVisibleOptionValues(element)).to.deep.equal([
          'Green',
          'Orange',
          'Purple',
        ]);
      });
    });

    describe('typing "R"', function() {
      beforeEach(press('R'));
      beforeEach(nextFrame);
      beforeEach(updateComplete);
      it('shows options that start with "r"', async function() {
        expect(getVisibleOptionValues(element)).to.deep.equal([
          'Red',
        ]);
      });
    });
  });
});

describe('<pf-select variant="typeahead" accessible-label="label">', function() {
  let element: PfSelect;
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeahead" accessible-label="label">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
      </pf-select>`);
  });

  it('passes aXe audit', async function() {
    await expect(element).to.be.accessible();
  });

  it('labels the combobox with the placeholder attribute', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'combobox',
      name: 'label',
    });
  });

  it('labels the toggle button with the placeholder attribute', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'button',
      name: 'label',
    });
  });

  describe('show()', function() {
    beforeEach(() => element.show());
    it('labels the listbox with the placeholder attribute', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'listbox',
        name: 'label',
      });
    });
  });
});

describe('<pf-select variant="typeahead" placeholder="placeholder">', function() {
  let element: PfSelect;
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeahead" placeholder="placeholder">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
      </pf-select>`);
  });

  it('passes aXe audit', async function() {
    await expect(element).to.be.accessible();
  });

  it('labels the toggle button with the placeholder attribute', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'button',
      name: 'placeholder',
    });
  });

  it('labels the combobox with the placeholder attribute', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'combobox',
      name: 'placeholder',
    });
  });

  describe('show()', function() {
    beforeEach(() => element.show());
    it('labels the listbox with the placeholder attribute', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'listbox',
        name: 'placeholder',
      });
    });
  });
});

describe('<label for="select"><pf-select variant="typeahead">', function() {
  let element: PfSelect;
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeahead" id="select">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
      </pf-select>
      <label for="select">label1</label>
      <label for="select">label2</label>
      `);
  });

  it('passes aXe audit', async function() {
    await expect(element).to.be.accessible();
  });

  it('labels the combobox with the label elements', async function() {
    expect(await a11ySnapshot()).to.axContainQuery({
      role: 'combobox',
      name: 'label1label2',
    });
  });
  describe('show()', function() {
    beforeEach(() => element.show());
    it('labels the listbox with the placeholder attribute', async function() {
      expect(await a11ySnapshot()).to.axContainQuery({
        role: 'listbox',
        name: 'label1label2',
      });
    });
  });
});

// try again when we implement activedescendant
describe.skip('<pf-select variant="typeaheadmulti">', function() {
  let element: PfSelect;
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeaheadmulti">
        <pf-option value="Amethyst">Amethyst</pf-option>
        <pf-option value="Beryl">Beryl</pf-option>
        <pf-option value="Chalcedony">Chalcedony</pf-option>
        <pf-option value="Diamond">Diamond</pf-option>
        <pf-option value="Emerald">Emerald</pf-option>
        <pf-option value="Fool's Gold">Fool's Gold</pf-option>
        <pf-option value="Garnet">Garnet</pf-option>
        <pf-option value="Halite">Halite</pf-option>
        <pf-option value="Iris">Iris</pf-option>
      </pf-select>`);
  });

  describe('focus()', function() {
    beforeEach(focus);
    beforeEach(updateComplete);

    it('focuses the typeahead input', async function() {
      expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);

      it('shows the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses the first option', async function() {
        expect(getActiveOption(element)).to.have.property('value', 'Amethyst');
      });

      describe('Shift+Tab', function() {
        beforeEach(holdShift);
        beforeEach(press('Tab'));
        beforeEach(releaseShift);
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });

        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        it('focuses the toggle button', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
        });

        describe('Shift+Tab', function() {
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
          beforeEach(updateComplete);
          it('focuses the combobox input', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox');
          });
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('selects the second option', function() {
            expect(getSelectedOptionValues(element)).to.deep.equal(['Beryl']);
          });
          it('focuses on second option', async function() {
            expect(getActiveOption(element)).to.have.property('value', 'Beryl');
          });
          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });
          it('shows 1 chip', async function() {
            expect(await a11ySnapshot())
                .to.axContainQuery({
                  role: 'button',
                  name: 'Close',
                  description: 'Beryl',
                });
          });
          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses the first option', async function() {
              expect(getActiveOption(element)).to.equal('Amethyst');
              expect(await a11ySnapshot())
                  .axTreeFocusedNode.to.have.axName('Amethyst');
            });
            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds second option to selected values', function() {
                expect(getSelectedOptionValues(element)).to.deep.equal([
                  'Amethyst',
                  'Beryl',
                ]);
              });
              it('accessible combo button label should be "2 items selected"', async function() {
                expect(await a11ySnapshot())
                    .axTreeFocusedNode
                    .to.have.axRole('combobox')
                    .and
                    .to.have.axName('2 items selected');
              });
              it('shows 2 chips', async function() {
                expect(await a11ySnapshot())
                    .to.axContainQuery({ role: 'button', name: 'Close', description: 'Amethyst' })
                    .and
                    .to.axContainQuery({ role: 'button', name: 'Close', description: 'Beryl' });
              });
              describe('Shift+Tab', function() {
                beforeEach(holdShift);
                beforeEach(press('Tab'));
                beforeEach(releaseShift);
                beforeEach(updateComplete);
                it('focuses the combobox input', async function() {
                  expect(await a11ySnapshot())
                      .axTreeFocusedNode
                      .to.have.axRole('combobox');
                });
                describe('Shift+Tab', function() {
                  beforeEach(holdShift);
                  beforeEach(press('Tab'));
                  beforeEach(releaseShift);
                  beforeEach(updateComplete);
                  it('focuses the combobox input', async function() {
                    expect(await a11ySnapshot())
                        .axTreeFocusedNode
                        .to.have.axRole('combobox');
                  });
                  describe('Shift+Tab', function() {
                    beforeEach(holdShift);
                    beforeEach(press('Tab'));
                    beforeEach(releaseShift);
                    beforeEach(updateComplete);
                    it('focuses the last chip\'s close button', async function() {
                      expect(await a11ySnapshot())
                          .axTreeFocusedNode
                          .to.have.axRole('button')
                          .and
                          .to.have.axName('Close')
                          .and
                          .to.have.axDescription('Beryl');
                    });
                    describe('Space', function() {
                      beforeEach(updateComplete);
                      beforeEach(press(' '));
                      beforeEach(updateComplete);
                      beforeEach(updateComplete);
                      it('removes the second chip', async function() {
                        expect(await a11ySnapshot()).to.not.have.axDescription('Beryl');
                      });
                      it('removes the second option from the selected values', function() {
                        expect(getSelectedOptionValues(element)).to.deep.equal([
                          'Amethyst',
                        ]);
                      });
                      it('focuses the combobox', async function() {
                        expect(await a11ySnapshot())
                            .axTreeFocusedNode
                            .to.have.axRole('combobox');
                      });
                      describe('Shift+Tab', function() {
                        beforeEach(holdShift);
                        beforeEach(press('Tab'));
                        beforeEach(releaseShift);
                        beforeEach(updateComplete);
                        it('focuses the first chip', async function() {
                          expect(await a11ySnapshot())
                              .axTreeFocusedNode
                              .to.have.axRole('combobox')
                              .and
                              .to.have.axDescription('Amethyst');
                        });
                        describe('Space', function() {
                          beforeEach(press(' '));
                          beforeEach(updateComplete);
                          it('removes all chips', async function() {
                            expect(await a11ySnapshot()).to.not.axContainRole('button');
                          });
                          it('focuses the combobox', async function() {
                            expect(await a11ySnapshot())
                                .axTreeFocusedNode
                                .to.have.axRole('combobox');
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
