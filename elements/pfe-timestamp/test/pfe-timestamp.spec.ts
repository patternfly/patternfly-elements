import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeTimestamp } from '@patternfly/pfe-timestamp';

describe('<pfe-timestamp>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeTimestamp>(`<pfe-timestamp></pfe-timestamp>`);
    expect(element, 'the <pfe-timestamp> should be an instance of PfeTimestamp')
      .to.be.an.instanceof(customElements.get('pfe-timestamp'))
      .and
      .to.be.an.instanceof(PfeTimestamp);
  });

  it('should show the current date by default with default formatting', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp></pfe-timestamp>
    `);

    const formattedDate = new Date().toLocaleString();
    const text = element.shadowRoot!.querySelector('time')!.textContent;

    expect(text, 'should show a default date and time').to.equal(formattedDate);
  });

  it('should set the correct ISO date on the datetime attribute in the time element', async function() {
    const date = new Date().toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}"></pfe-timestamp>
    `);

    const datetimeAttributeValue = element.shadowRoot!.querySelector('time')!.getAttribute('datetime');
    const isoDate = new Date(element.date).toISOString();
    expect(datetimeAttributeValue).to.equal(isoDate);
  });

  it('should show a passed in date with default formatting', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text, 'should show a passed in date with default formatting').to.equal('1/1/2022, 12:00:00 AM');
  });

  it('should show custom formatting when date-format and time-format are passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" date-format="full" time-format="short"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Saturday, January 1, 2022 at 12:00 AM');
  });

  it('should show only a date when date-format is passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" date-format="full"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Saturday, January 1, 2022');
  });

  it('should show only time when time-format is passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" time-format="short"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('12:00 AM');
  });

  it('should show custom formatting when customFormat is passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" .customFormat=${{
        year: '2-digit',
        month: 'short',
        weekday: 'short',
        day: 'numeric',
        hour: 'numeric'
      }}></pfe-timestamp>
    `);
    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Sat, Jan 1, 22, 12 AM');
  });

  it('should show a custom suffix when display-suffix is passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" display-suffix="US Eastern"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 12:00:00 AM US Eastern');
  });

  it('should show a 12 hour time when hour-12 is passed in', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 13:00:00"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 1:00:00 PM');
  });

  it('should show a 24 hour time when hour-12 is set to false', async function() {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 13:00:00" hour-12="false"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 13:00:00');
  });

  it('should show with locale passed in', async function() {
    const date = new Date(2022, 1, 1).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-GB"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('01/02/2022, 00:00:00');
  });

  it('should show a 12 hour time by default for US locale', async function() {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-US"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('2/1/2022, 1:00:00 PM');
  });

  it('should show a 24 hour time for US locale when hour-12 is false', async function() {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-US" hour-12="false"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('2/1/2022, 13:00:00');
  });

  it('should show a 12 hour time for a 24 hour locale when hour-12 is passed', async function() {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-GB" hour-12></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('01/02/2022, 1:00:00 pm');
  });

  it('should show relative time', async function() {
    const date = new Date(2015, 7, 9, 14, 57, 0);
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date.toString()}" relative></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.match(/\d+ years ago/);
  });
});
