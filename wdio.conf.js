const { join } = require("path");
const { exec } = require("child_process");

const argv = require("yargs").argv;
const patterns = argv._.length > 1 ? argv._.slice(1) : [];

require("dotenv").config();

let proc;

exports.config = {
  logLevel: "error",
  framework: "mocha",
  mochaOpts: {
    colors: true,
    timeout: 90000
  },
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  baseUrl: "http://localhost:8080/",
  specs: [`./elements/${patterns.length > 0 ? `+(${patterns.join("|")})` : "*"}/test/*_e2e.js`],
  reporters: [
    "spec",
    ["mochawesome", {
        outputDir: './test/vrt-results',
    }]
  ],
  maxInstances: 3,
  capabilities: [
    {
      browserName: "Chrome",
      browserVersion: "latest",
      "bstack:options" : {
        "os" : "OS X",
        "osVersion" : "Catalina",
        "resolution" : "1920x1080",
        "seleniumVersion" : "3.14.0",
      }
    },
    // {
    //   browserName: "Safari",
    //   browserVersion: "latest",
    //   "bstack:options" : {
    //     "os" : "OS X",
    //     "osVersion" : "Big Sur",
    //     "resolution" : "1920x1080",
    //     "seleniumVersion" : "3.14.0",
    //   }
    // },
    {
      browserName: "IE",
      browserVersion: "11.0",
      "bstack:options" : {
        "os" : "Windows",
        "osVersion" : "10",
        "resolution" : "1920x1200",
        "seleniumVersion" : "3.5.2",
      },
    },
    // {
    //   "browserName" : "Edge",
    //   "browserVersion" : "latest",
    //   'bstack:options' : {
    //     "os" : "Windows",
    //     "osVersion" : "10",
    //     "resolution" : "1920x1080",
    //     "seleniumVersion" : "3.14.0",
    //   }
    // }
  ],
  services: [
    ["browserstack", {
      browserstackLocal: true,
    }],
    [
      "image-comparison",
      {
        baselineFolder: join(process.cwd(), "./test/vrt-baseline/"),
        formatImageName: `{tag}`,
        screenshotPath: join(process.cwd(), "./test/vrt-snapshots"),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        disableCSSAnimation: true,
        hideScrollBars: true
      }
    ]
  ],
  onPrepare: () => {
    proc = exec("http-server");
  },
  onComplete: () => {
    const mergeResults = require('wdio-mochawesome-reporter/mergeResults');
    mergeResults('./test/vrt-results', 'wdio-*', 'vrt-results.json');
    proc.kill();
  }
};
