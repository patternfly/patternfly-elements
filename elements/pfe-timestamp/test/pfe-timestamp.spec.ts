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

  it('should set the correct ISO date on the datetime attribute in the time element', async () => {
    const date = new Date().toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}"></pfe-timestamp>
    `);

    const datetimeAttributeValue = element.shadowRoot!.querySelector('time')!.getAttribute('datetime');
    const isoDate = new Date(element.date).toISOString();
    expect(datetimeAttributeValue).to.equal(isoDate);
  });

  it('should show a passed in date with default formatting', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text, 'should show a passed in date with default formatting').to.equal('1/1/2022, 12:00:00 AM');
  });

  it('should show custom formatting when date-format and time-format are passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" date-format="full" time-format="short"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Saturday, January 1, 2022 at 12:00 AM');
  });

  it('should show only a date when date-format is passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" date-format="full"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Saturday, January 1, 2022');
  });

  it('should show only time when time-format is passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" time-format="short"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('12:00 AM');
  });

  it('should show custom formatting when custom-format is passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" custom-format='{ "year": "2-digit", "month": "short", "weekday": "short", "day": "numeric", "hour": "numeric" }'></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('Sat, Jan 1, 22, 12 AM');
  });

  it('should show a custom suffix when display-suffix is passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 00:00:00" display-suffix="US Eastern"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 12:00:00 AM US Eastern');
  });

  it('should show a 12 hour time when is-12-hour is passed in', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 13:00:00"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 1:00:00 PM');
  });

  it('should show a 24 hour time when is-12-hour is set to false', async () => {
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="Sat Jan 01 2022 13:00:00" is-12-hour="false"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('1/1/2022, 13:00:00');
  });

  it('should show with locale passed in', async () => {
    const date = new Date(2022, 1, 1).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-GB"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('01/02/2022, 00:00:00');
  });

  it('should show a 12 hour time by default for US locale', async () => {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-US"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('2/1/2022, 1:00:00 PM');
  });

  it('should show a 24 hour time for US locale when is-12-hour is false', async () => {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-US" is-12-hour="false"></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('2/1/2022, 13:00:00');
  });

  it('should show a 12 hour time for a 24 hour locale when is-12-hour is passed', async () => {
    const date = new Date(2022, 1, 1, 13, 0).toString();
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" locale="en-GB" is-12-hour></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.equal('01/02/2022, 1:00:00 pm');
  });

  // it('should show the default tooltip content for the default variant', async () => {
  //   const date = new Date('1 Jan 2022 00:00:00 EST').toString();
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp date="${date}" tooltip='{ "variant": "default" }'></pfe-timestamp>
  //   `);

  //   const tooltipText = element.shadowRoot!.querySelector('span[slot="content"]')!.textContent;
  //   expect(tooltipText).to.equal('1/1/2022, 5:00:00 AM UTC');
  // });

  // it('should show a custom tooltip suffix for the default variant', async () => {
  //   const date = new Date('1 Jan 2022 00:00:00 EST').toString();
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp date="${date}" tooltip='{ "variant": "default", "suffix": "Coordinated Universal Time" }'></pfe-timestamp>
  //   `);

  //   const tooltipText = element.shadowRoot!.querySelector('span[slot="content"]')!.textContent;
  //   expect(tooltipText).to.equal('1/1/2022, 5:00:00 AM Coordinated Universal Time');
  // });

  // it('should show custom tooltip content', async () => {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp tooltip='{ "variant": "custom", "content": "Custom tooltip content" }'></pfe-timestamp>
  //   `);

  //   const tooltipText = element.shadowRoot!.querySelector('span[slot="content"]')!.textContent;
  //   expect(tooltipText).to.equal('Custom tooltip content');
  // });

  it('should show relative time', async () => {
    const date = new Date(2015, 7, 9, 14, 57, 0);
    const element = await createFixture<PfeTimestamp>(html`
      <pfe-timestamp date="${date}" relative></pfe-timestamp>
    `);

    const text = element.shadowRoot!.querySelector('time')!.textContent;
    expect(text).to.match(/\d+ years ago/);
  });

  // it('should show a simple date format if just a datetime attribute is provided', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="simple" datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   expect(text, 'should just show a simple date').to.equal('1/2/2006');
  // });

  // it('should show a formatted date', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="justdate"
  //         type="local"
  //         day="numeric"
  //         month="long"
  //         year="numeric"
  //         locale="en-US"
  //         datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   expect(text, 'should show a formatted date').to.equal('January 2, 2006');
  // });

  // it('should show a formatted date with time', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="withtime"
  //         type="local"
  //         weekday="long"
  //         month="short"
  //         day="2-digit"
  //         year="numeric"
  //         hour="2-digit"
  //         minute="2-digit"
  //         second="2-digit"
  //         locale="en-US"
  //         datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const { textContent } = element.shadowRoot!.querySelector('span')!;
  //   const regex = /.*?, .*?, \d{4}, \d+:\d+:\d+ .{2}/;

  //   expect(regex.test(textContent!), 'should show a formatted date with time')
  //     .to.be.true;
  // });

  // it('should show a relative time since the date', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="yearsago" type="relative" datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   await element.updateComplete;

  //   expect(text, 'should show a relative time since the date')
  //     .to.match(/\d+ years ago/);
  // });

  // it('unix timestamp should convert and display properly', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="simpleUnixtime" timestamp="1136214245">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   expect(text, 'should show a relative time since the date').to.equal('1/2/2006');
  // });

  // it('should show a formatted date with time for a different locale', async function() {
  //   const element = await createFixture<PfeTimestamp>(html`
  //     <pfe-timestamp id="esLocale"
  //         type="local"
  //         weekday="long"
  //         month="short"
  //         day="2-digit"
  //         year="numeric"
  //         locale="es"
  //         datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   expect(text, 'should show a (locally) formatted date with time')
  //     .to.equal('lunes, 02 de ene de 2006');
  // });

  // it('should show formatted date for a specified time zone', async function() {
  //   const element = await createFixture<PfeTimestamp>(`
  //     <pfe-timestamp
  //       id="withTimeZone"
  //       time-zone="UTC"
  //       time-zone-name="short"
  //       datetime="Mon Jan 2 15:04:05 EST 2006">
  //       Mon Jan 2 15:04:05 EST 2006
  //     </pfe-timestamp>`);
  //   const text = element.shadowRoot!.querySelector('span')!.textContent;

  //   expect(text, 'should show a formatted date for a specified time zone')
  //     .to.equal('1/2/2006, UTC');
  // });
});
