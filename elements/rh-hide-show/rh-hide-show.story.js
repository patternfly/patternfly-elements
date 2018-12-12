import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./rh-hide-show";

const stories = storiesOf("Hide-show", module);
stories.addDecorator(withKnobs);

stories.add("rh-hide-show", () => {
  const orientation = select(
    "Orientation",
    {
      "": "Horizontal",
      vertical: "Vertical"
    },
    ""
  );

  const variant = select("Variant", {
    "": "",
    "rh-variant=primary": "Primary",
    "rh-variant=secondary": "Secondary"
  });

  return `
      <section>
        <h2>Hide Show</h2>
        <rh-hide-show ${orientation} ${variant}>
          <rh-hide-show-set>
            <div heading>Section 1</div>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          </rh-hide-show-set>
          <rh-hide-show-set>
            <div heading>Section 2</div>
            <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.</p>
          </rh-hide-show-set>
          <rh-hide-show-set>
            <div heading>Section 3</div>
            <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
          </rh-hide-show-set>
        </rh-hide-show>
      </section>
      <section>
        <h2>Markup</h2>
        <pre>
        ${escapeHTML(`<rh-hide-show>`)}
            ${escapeHTML(`<rh-hide-show-set>`)}
                ${escapeHTML(`<div heading>Section 1</div>`)}
                ${escapeHTML(`<p>Lorem ipsum dolor sit amet.</p>`)}
            ${escapeHTML(`</rh-hide-show-set>`)}
            ${escapeHTML(`<rh-hide-show-set>`)}
                ${escapeHTML(`<div heading>Section 2</div>`)}
                ${escapeHTML(`<p>Consetetur sadipscing elitr.</p>`)}
            ${escapeHTML(`</rh-hide-show-set>`)}
        ${escapeHTML(`</rh-hide-show>`)}
        </pre>
      </section>
  `;
});
