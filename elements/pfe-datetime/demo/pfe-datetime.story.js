import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeDatetime from "../dist/pfe-datetime";

const stories = storiesOf("Datetime", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeDatetime.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeDatetime.tag, () => {
  let config = {};
  // const props = PfeCta.schemaProperties;
  // Manually defining props but this can be done in a schema instead

  const props = {
    datetime: {
      title: "Datetime",
      type: "string",
      default: "January 9, 2019",
      required: true
    },
    type: {
      title: "Type",
      type: "string",
      enum: ["local", "relative"],
      default: "local",
      required: true
    },
    weekday: {
      title: "Weekday",
      type: "string",
      enum: ["short", "long"]
    },
    day: {
      title: "Day",
      type: "string",
      enum: ["numeric", "2-digit"],
      default: "numeric"
    },
    month: {
      title: "Month",
      type: "string",
      enum: ["short", "long"],
      default: "long"
    },
    year: {
      title: "Year",
      type: "string",
      enum: ["numeric", "2-digit"],
      default: "numeric"
    },
    hour: {
      title: "Hour",
      type: "string",
      enum: ["numeric", "2-digit"]
    },
    minute: {
      title: "Minute",
      type: "string",
      enum: ["numeric", "2-digit"]
    },
    second: {
      title: "Second",
      type: "string",
      enum: ["numeric", "2-digit"]
    },
    locale: {
      title: "Locale",
      type: "string",
      default: "en-US"
    },
    "time-zone": {
      title: "Time Zone",
      type: "string"
    },
    "time-zone-name": {
      title: "Time Zone Name",
      type: "string",
      enum: ["short", "long"]
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeDatetime, props);

  // Fallback date is the "content" for this component
  config.slots = [
    {
      content: config.prop.datetime
    }
  ];

  const render = template(config);
  return `<h1>${tools.demo(render)}</h1>${tools.code(render)}`;
});

storiesOf("Datetime", module).add("Demo", () => {
  const now = new Date();
  let realtime = now;

  const yearsago = new Date(new Date().setFullYear(new Date().getFullYear() - 10));
  const yearago = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const hoursago = new Date(new Date().setHours(new Date().getHours() - 2));
  const minutesago = new Date(new Date().setMinutes(new Date().getMinutes() - 10));
  const minutesuntil = new Date(new Date().setMinutes(new Date().getMinutes() + 22));
  const hoursuntil = new Date(new Date().setHours(new Date().getHours() + 13));
  const yearuntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const yearsuntil = new Date(new Date().setFullYear(new Date().getFullYear() + 10));

  function timer() {
    document.getElementById("realtime").setAttribute("datetime", new Date());
    window.requestAnimationFrame(timer);
  }

  window.requestAnimationFrame(timer);

  return `
      <style>
        section {
          margin-bottom: 32px;
        }
      </style>

      <section>
        <h2>Unformatted</h2>
        <pfe-datetime datetime="${now}">
          ${now}
        </pfe-datetime>
      </section>
      <section>
        <h2>Local</h2>
        <p>
          <strong>Just date:</strong>
          <pfe-datetime
            datetime="${now}"
            type="local"
            day="numeric"
            month="long"
            year="numeric">
            ${now}
          </pfe-datetime>
        </p>
        <p>
          <strong>With time: </strong>
          <pfe-datetime
            datetime="${now}"
            type="local"
            weekday="long"
            month="short"
            day="2-digit"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            second="2-digit">
            ${now}
          </pfe-datetime>
        </p>
        <p>
          <strong>With an en-GB locale: </strong>
          <pfe-datetime
            datetime="${now}"
            type="local"
            weekday="long"
            month="short"
            day="2-digit"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
            locale="en-GB">
            ${now}
          </pfe-datetime>
        </p>
        <p>
          <strong>With a es locale: </strong>
          <pfe-datetime
            datetime="${now}"
            type="local"
            weekday="long"
            month="short"
            day="2-digit"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
            locale="es">
            ${now}
          </pfe-datetime>
        </p>
        <p>
          <strong>With a time zone: </strong>
          <pfe-datetime
            datetime="${now}"
            type="local"
            weekday="long"
            month="short"
            day="2-digit"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
            time-zone="UTC"
            time-zone-name="short">
            ${now}
          </pfe-datetime>
        </p>
      </section>
      <section>
        <h2>Time Adverbial</h2>
        <p>
          <pfe-datetime type="relative" datetime="${yearsago}">
            ${yearsago}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${yearago}">
            ${yearago}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${hoursago}">
            ${hoursago}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${minutesago}">
            ${minutesago}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${now}">
            ${now}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${minutesuntil}">
            ${minutesuntil}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${hoursuntil}">
            ${hoursuntil}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${yearuntil}">
            ${yearuntil}
          </pfe-datetime>
        </p>
        <p>
          <pfe-datetime type="relative" datetime="${yearsuntil}">
            ${yearsuntil}
          </pfe-datetime>
        </p>
      </section>
      <section>
        <h2>Real-time updates</h2>
        <pfe-datetime
          id="realtime"
          datetime="${realtime}"
          type="local"
          hour="2-digit"
          minute="2-digit"
          second="2-digit">
          ${realtime}
        </pfe-datetime>
      </section>

      <script>
        (() => {
          var realtime = document.getElementById('realtime');
          var relative1 = document.getElementById('minutesago');
          var relative2 = document.getElementById('hoursuntil');
          var relative3 = document.getElementById('daysuntil');

          relative1.setAttribute('datetime', new Date(Date.now() - 600000).toString());
          relative2.setAttribute('datetime', new Date(Date.now() + 6000000).toString());
          relative3.setAttribute('datetime', new Date(Date.now() + 200000000).toString());

          function timer() {
            realtime.setAttribute('datetime', new Date());
            window.requestAnimationFrame(timer);
          }

          window.requestAnimationFrame(timer);
        })();
      </script>
    `;
});
