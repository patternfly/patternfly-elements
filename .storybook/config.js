import { configure, addParameters } from "@storybook/polymer";

import "./custom-theme.css";

const req = require.context("../elements", true, /\.story\.js$/);

// Theming doc: https://github.com/storybookjs/storybook/blob/next/docs/src/pages/configurations/theming/index.md
// Parameters: https://github.com/storybookjs/storybook/blob/next/docs/src/pages/configurations/options-parameter/index.md
addParameters({
  options: {
    panelPosition: "bottom",
    theme: {
      brandTitle: "PatternFly Elements",
      brandUrl: "patternflyelements.org",
      // brandImage: "/brand/logo/svg/pfe-icon-blue-shaded.svg",
    }
  },
  layout: 'centered',
});

function loadStories() {
  req.keys().forEach(filename => {
    if (filename.includes("node_modules")) {
      return;
    }

    return req(filename);
  });
}

configure(loadStories, module);
