const { join } = require("path");
require("dotenv").config();

exports.config = {
  logLevel: "info",
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  baseUrl: "http://localhost:8000/",
  specs: ["./test/vrt/**/*"],
  capabilities: [
    {
      os: "Windows",
      os_version: "10",
      browserName: "IE",
      browser_version: "11.0",
      resolution: "1920x1080",
      project: "Overview page",
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
        formatImageName: `{tag}-{logName}-{width}x{height}`,
        screenshotPath: join(process.cwd(), ".tmp/"),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true
      }
    ]
  ]
};
