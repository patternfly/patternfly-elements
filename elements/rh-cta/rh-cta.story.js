import { storiesOf } from "@storybook/polymer";
import "./rh-cta";

storiesOf("Call To Action", module).add(
  "rh-cta",
  () => `
    <p>
      <rh-cta class="solid"><a href="#">Become a Member</a></rh-cta>
      <rh-cta class="outlined"><a href="#">Sign Up</a></rh-cta>
      <rh-cta class="ghost"><a href="#">More info</a></rh-cta>
    </p>

    <p>
      <rh-cta><a href="#">Learn more</a></rh-cta>
    </p>

    <p>
      <rh-cta class="ghost"><a href="#">More info</a></rh-cta><rh-cta class="solid"><a href="#">Become a Member</a></rh-cta>
    </p>
  `
);
