import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

let element: PfSelect;
let snapshot: A11yTreeSnapshot;

async function shiftHold() {
  await sendKeys({ down: 'Shift' });
}

async function shiftRelease() {
  await sendKeys({ up: 'Shift' });
  await element.updateComplete;
}
async function ctrlA() {
  await sendKeys({ down: 'Control' });
  await sendKeys({ down: 'a' });
  await sendKeys({ up: 'a' });
  await sendKeys({ up: 'Control' });
  await element.updateComplete;
}

async function press(key = 'Tab') {
  await sendKeys({ down: key });
  await sendKeys({ up: key });
  await element.updateComplete;
}

describe('<pf-select>', function() {
  const OPTIONS = html`
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>`;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-select')).to.be.an.instanceof(PfSelect);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSelect>(html`<pf-select></pf-select>`);
      const klass = customElements.get('pf-select');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfSelect);
    });
  });

  describe('always-expanded', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select always-expanded>
          <pf-option disabled>Select a color</pf-option>
          ${OPTIONS}
        </pf-select>`);
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    describe('should be accessible', async function() {
      it('is accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });

    it('should be open', function() {
      const [listbox] = snapshot.children;
      expect(listbox.children).to.deep.equal([
        { role: 'option', name: 'Blue' },
        { role: 'option', name: 'Green' },
        { role: 'option', name: 'Magenta' },
        { role: 'option', name: 'Orange' },
        { role: 'option', name: 'Purple' },
        { role: 'option', name: 'Pink' },
        { role: 'option', name: 'Red' },
        { role: 'option', name: 'Yellow' }
      ]);
    });

    describe('setting filter to "r"', function() {
      beforeEach(async function() {
        element.caseSensitive = false;
        element.filter = 'r';
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('shows options that start with "r" or "R"', function() {
        const [listbox] = snapshot.children;
        expect(listbox.children).to.deep.equal([{ role: 'option', name: 'Red' }]);
      });

      describe('match anywhere', function() {
        beforeEach(async function() {
          element.matchAnywhere = true;
          await element.updateComplete;
          snapshot = await a11ySnapshot();
        });
        it('shows options with "r" anywhere in them', function() {
          const [listbox] = snapshot.children;
          expect(listbox.children).to.deep.equal([
            { role: 'option', name: 'Green' },
            { role: 'option', name: 'Orange' },
            { role: 'option', name: 'Purple' },
            { role: 'option', name: 'Red' }
          ]);
        });
      });

      describe('case sensitive', function() {
        beforeEach(async function() {
          element.caseSensitive = true;
          await element.updateComplete;
          snapshot = await a11ySnapshot();
        });
        it('shows options that start with "r" or shows full list if none', function() {
          const [listbox] = snapshot.children;
          expect(listbox.children).to.deep.equal([
            { role: 'option', name: 'Blue' },
            { role: 'option', name: 'Green' },
            { role: 'option', name: 'Magenta' },
            { role: 'option', name: 'Orange' },
            { role: 'option', name: 'Purple' },
            { role: 'option', name: 'Pink' },
            { role: 'option', name: 'Red' },
            { role: 'option', name: 'Yellow' }
          ]);
        });
      });
    });

    describe('setting filter to "*"', function() {
      beforeEach(async function() {
        element.filter = '*';
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });
      it('shows all options', function() {
        const [listbox] = snapshot.children;
        expect(listbox.children).to.deep.equal([
          { role: 'option', name: 'Blue' },
          { role: 'option', name: 'Green' },
          { role: 'option', name: 'Magenta' },
          { role: 'option', name: 'Orange' },
          { role: 'option', name: 'Purple' },
          { role: 'option', name: 'Pink' },
          { role: 'option', name: 'Red' },
          { role: 'option', name: 'Yellow' }
        ]);
      });
    });
  });

  describe('single-select', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select>
          <pf-option disabled>Select a color</pf-option>
          ${OPTIONS}
        </pf-select>`);
      await element.updateComplete;
    });

    describe('should be accessible', async function() {
      it('is accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });

    describe('toggling open', function() {
      beforeEach(async function() {
        element.focus();
        await element.updateComplete;
        await press('Enter');
        snapshot = await a11ySnapshot();
      });

      it('opens', function() {
        const [button, listbox] = snapshot.children;
        const { expanded } = element;
        expect(expanded).to.be.true;
        expect(button).to.deep.equal({
          role: 'button',
          name: 'Options',
          expanded: true,
          focused: true,
          haspopup: 'listbox'
        });
        expect(listbox).to.exist;
      });

      describe('pressing ArrowDown', function() {
        beforeEach(async function() {
          await press('ArrowDown');
          snapshot = await a11ySnapshot();
        });

        it('focuses on first option', function() {
          const [, listbox] = snapshot.children;
          const [first] = listbox.children;
          expect(first).to.deep.equal({ role: 'option', name: 'Blue', focused: true });
        });
        describe('pressing ArrowDown', function() {
          beforeEach(async function() {
            await press('ArrowDown');
            snapshot = await a11ySnapshot();
          });
          it('focuses on second option', async function() {
            const [, listbox] = snapshot.children;
            const [, second] = listbox.children;
            expect(second).to.deep.equal({ role: 'option', name: 'Green', focused: true });
          });

          describe('clicking the second option', function() {
            beforeEach(async function() {
              await press('Enter');
              snapshot = await a11ySnapshot();
            });
            it('selects it', function() {
              const { selectedList } = element;
              expect(selectedList).to.equal('Green');
            });
          });
        });
      });

      describe('toggling closed', function() {
        beforeEach(async function() {
          await press(' ');
          snapshot = await a11ySnapshot();
        });
        it('closes', function() {
          const [button, listbox] = snapshot.children;
          const { expanded } = element;
          expect(expanded).to.be.false;
          expect(button).to.deep.equal({ role: 'button', name: 'Options', focused: true, haspopup: 'listbox' });
          expect(listbox).to.be.undefined;
        });
      });
    });
  });

  describe('multiple select `always-expanded`', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`<pf-select multi always-expanded>${OPTIONS}</pf-select>`);
      await element.updateComplete;
    });
    describe('clicking first option', function() {
      beforeEach(async function() {
        element.focus();
        await press('Enter');
      });
      it('selects the option', function() {
        const { selectedList } = element;
        expect(selectedList).to.equal('Blue');
      });

      describe('clicking second option', function() {
        beforeEach(async function() {
          await press('ArrowDown');
          await press('Enter');
        });
        it('add the option to selected list', function() {
          const { selectedList } = element;
          expect(selectedList).to.equal('Blue, Green');
        });

        describe('using Shift to select multiple options', function() {
          beforeEach(async function() {
            await shiftHold();
            await press('ArrowDown');
            await press('ArrowDown');
            await shiftRelease();
          });
          it('add the option to selected list', function() {
            const { selectedList } = element;
            expect(selectedList).to.equal('Blue, Green, Magenta, Orange');
          });

          describe('clicking on a selected option', function() {
            beforeEach(async function() {
              await press('ArrowUp');
              await press('Enter');
            });
            it('deselects the option', function() {
              const { selectedList } = element;
              expect(selectedList).to.equal('Blue, Green, Orange');
            });

            describe('using Shift to deselect multiple options', function() {
              beforeEach(async function() {
                await shiftHold();
                await press('ArrowUp');
                await press('ArrowUp');
                await shiftRelease();
              });
              it('deselects the options', function() {
                const { selectedList } = element;
                expect(selectedList).to.equal('Orange');
              });

              describe('pressing Ctrl+A', function() {
                beforeEach(async function() {
                  await ctrlA();
                });
                it('selects all options', function() {
                  const { selectedList } = element;
                  expect(selectedList).to.equal('Blue, Green, Magenta, Orange, Purple, Pink, Red, Yellow');
                });

                describe('pressing Ctrl+A when everything is selected', function() {
                  beforeEach(async function() {
                    await ctrlA();
                  });
                  it('deselects all options', function() {
                    const { selectedList } = element;
                    expect(selectedList).to.equal('');
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('selected-items-display', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select multi>
          <pf-option value="Amethyst" selected>Amethyst</pf-option>
          <pf-option value="Aqua" selected>Aqua</pf-option>
          ${OPTIONS}
        </pf-select>`);
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    describe('setting to "default"', function() {
      beforeEach(async function() {
        element.selectedItemsDisplay = 'default';
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('button text should be "2 items selected"', function() {
        const [button] = snapshot.children;
        expect(button).to.deep.equal({ role: 'button', name: '2 items selected', haspopup: 'listbox' });
      });
    });

    describe('setting to "badge"', function() {
      beforeEach(async function() {
        element.selectedItemsDisplay = 'badge';
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('button text should be "Options 2"', function() {
        const [button] = snapshot.children;
        expect(button).to.deep.equal({ role: 'button', name: 'Options 2', haspopup: 'listbox' });
      });
    });

    describe('setting to "chips"', function() {
      beforeEach(async function() {
        element.selectedItemsDisplay = 'chips';
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('button text should be "Options 2"', function() {
        expect(snapshot.children).to.deep.equal([
          { role: 'text', name: 'Current selections' },
          { role: 'text', name: 'Amethyst' },
          { role: 'button', name: 'Close', description: 'Amethyst' },
          { role: 'text', name: 'Aqua' },
          { role: 'button', name: 'Close', description: 'Aqua' },
          { role: 'button', name: 'Options', haspopup: 'listbox' }
        ]);
      });
    });

    describe('checkboxes', function() {
      beforeEach(async function() {
        element.checkboxes = true;
        element.alwaysExpanded = true;
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('checkboxes should NOT be visible to screen readers', function() {
        const [listbox] = snapshot.children;
        expect(listbox.children).to.deep.equal([
          { role: 'option', name: 'Amethyst', selected: true },
          { role: 'option', name: 'Aqua', selected: true },
          { role: 'option', name: 'Blue' },
          { role: 'option', name: 'Green' },
          { role: 'option', name: 'Magenta' },
          { role: 'option', name: 'Orange' },
          { role: 'option', name: 'Purple' },
          { role: 'option', name: 'Pink' },
          { role: 'option', name: 'Red' },
          { role: 'option', name: 'Yellow' }
        ]);
      });
    });
  });

  describe('typeahead', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select typeahead>${OPTIONS}</pf-select>`);
      await element.updateComplete;
      element.focus();
      snapshot = await a11ySnapshot();
    });

    it('has a text input for typeahead', function() {
      const [typeahead] = snapshot.children;
      expect(typeahead).to.deep.equal({
        role: 'combobox',
        name: 'Options',
        focused: true,
        autocomplete: 'both',
        haspopup: 'listbox'
      });
    });

    describe('changing input value to "p"', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'p' });
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });

      it('show listbox items starting with "p"', function() {
        const [,, listbox] = snapshot.children;
        expect(listbox.children).to.deep.equal([
          { role: 'option', name: 'Purple' },
          { role: 'option', name: 'Pink' }
        ]);
      });

      describe('pressing Backspace so input value is ""', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Backspace' });
          await element.updateComplete;
          snapshot = await a11ySnapshot();
        });

        it('all options are visible', function() {
          const [,, listbox] = snapshot.children;
          expect(listbox.children).to.deep.equal([
            { role: 'option', name: 'Blue' },
            { role: 'option', name: 'Green' },
            { role: 'option', name: 'Magenta' },
            { role: 'option', name: 'Orange' },
            { role: 'option', name: 'Purple' },
            { role: 'option', name: 'Pink' },
            { role: 'option', name: 'Red' },
            { role: 'option', name: 'Yellow' }
          ]);
        });
      });
    });
  });
});
