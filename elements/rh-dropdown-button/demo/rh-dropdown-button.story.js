import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./cp-tooltip";

storiesOf("Tooltip", module).add(
  "Tooltip",
  () => `
    <style>
      [aria-describedby] {
        border-bottom: 3px dashed purple;
      }
    </style>
    
    <p>Lorem <span aria-describedby="tooltip-default">ipsum dolor</span> sit amet, consectetur <span aria-describedby="tooltip-left">adipisicing elit</span>, sed do eiusmod tempor incididunt ut labore et <span aria-describedby="tooltip-right">dolore magna</span> aliqua. Ut enim ad minim veniam, quis <span aria-describedby="tooltip-top">nostrud exercitation</span> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <span aria-describedby="tooltip-bottom">reprehenderit in voluptate</span> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <cp-tooltip id="tooltip-default">This is a default tooltip</cp-tooltip>
    <cp-tooltip id="tooltip-left" data-position="left">This is a left tooltip</cp-tooltip>
    <cp-tooltip id="tooltip-right" data-position="right">This is a right tooltip</cp-tooltip>
    <cp-tooltip id="tooltip-top" data-position="top">This is a top tooltip</cp-tooltip>
    <cp-tooltip id="tooltip-bottom" data-position="bottom">This is a bottom tooltip. Here is a bunch more content to make this tooltip really obnoxious.</cp-tooltip>
  `
);
