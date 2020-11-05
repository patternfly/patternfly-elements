const { join } = require("path");
const { exec } = require("child_process");

require("dotenv").config();

let proc;

exports.config = {
  logLevel: "error",
  framework: "mocha",
  mochaOpts: {
    timeout: 30000
  },
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  baseUrl: "http://localhost:8080/",
  specs: [`./elements/${process.argv.length > 3 ? `+(${process.argv.slice(3).join("|")})` : "*"}/test/*_e2e.js`],
  reporters: ["spec"],
  maxInstances: 3,
  capabilities: [
    {
      os: "OS X",
      browserName: "chrome",
      browser_version: "83.0",
      resolution: "1920x1080",
      "browserstack.local": "true",
      "browserstack.selenium_version": "3.5.2"
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "IE",
      browser_version: "11.0",
      resolution: "1920x1080",
      "browserstack.local": "true",
      "browserstack.selenium_version": "3.5.2"
    }
  ],
  services: [
    ["browserstack", { browserstackLocal: true }],
    [
      "image-comparison",
      {
        baselineFolder: join(process.cwd(), "./test/vrt-baseline/"),
        formatImageName: `{tag}`,
        screenshotPath: join(process.cwd(), ".tmp/"),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        disableCSSAnimation: true
      }
    ]
  ],
  onPrepare: () => {
    proc = exec("http-server");
  },
  onComplete: () => {
    proc.kill();
  }
};
