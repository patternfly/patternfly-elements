import { storiesOf } from "@storybook/polymer";
import "./rh-datetime";

storiesOf("Datetime", module).add("rh-datetime", () => {
  const now = new Date();
  let realtime = now;

  const yearsago = new Date(
    new Date().setFullYear(new Date().getFullYear() - 10)
  );
  const yearago = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );
  const hoursago = new Date(new Date().setHours(new Date().getHours() - 2));
  const minutesago = new Date(
    new Date().setMinutes(new Date().getMinutes() - 10)
  );
  const minutesuntil = new Date(
    new Date().setMinutes(new Date().getMinutes() + 22)
  );
  const hoursuntil = new Date(new Date().setHours(new Date().getHours() + 13));
  const yearuntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const yearsuntil = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  );

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
        <rh-datetime datetime="${now}">
          ${now}
        </rh-datetime>
      </section>
      <section>
        <h2>Local</h2>
        <p>
          <strong>Just date:</strong>
          <rh-datetime
            datetime="${now}"
            type="local"
            day="numeric"
            month="long"
            year="numeric">
            ${now}
          </rh-datetime>
        </p>
        <p>
          <strong>With time: </strong>
          <rh-datetime
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
          </rh-datetime>
        </p>
        <p>
          <strong>With an en-GB locale: </strong>
          <rh-datetime
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
          </rh-datetime>
        </p>
        <p>
          <strong>With a es locale: </strong>
          <rh-datetime
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
          </rh-datetime>
        </p>
      </section>
      <section>
        <h2>Time Adverbial</h2>
        <p>
          <rh-datetime type="relative" datetime="${yearsago}">
            ${yearsago}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${yearago}">
            ${yearago}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${hoursago}">
            ${hoursago}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${minutesago}">
            ${minutesago}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${now}">
            ${now}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${minutesuntil}">
            ${minutesuntil}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${hoursuntil}">
            ${hoursuntil}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${yearuntil}">
            ${yearuntil}
          </rh-datetime>
        </p>
        <p>
          <rh-datetime type="relative" datetime="${yearsuntil}">
            ${yearsuntil}
          </rh-datetime>
        </p>
      </section>
      <section>
        <h2>Real-time updates</h2>
        <rh-datetime
          id="realtime"
          datetime="${realtime}"
          type="local"
          hour="2-digit"
          minute="2-digit"
          second="2-digit">
          ${realtime}
        </rh-datetime>
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
