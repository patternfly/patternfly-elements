const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const shell = require("shelljs");

const silent = false;

// const spandx = require("spandx");
// const spandxConfig = require("../spandx.config");

// Set the server not to open for testing
// Object.assign(spandxConfig, {
//   open: true,
//   silent: true
// });

module.exports = {
  HOST: "localhost",
  PORT: 8000,
  OPEN: false,
};

const build = shell.exec('npm run build pfe-accordion', {async:true, silent: silent});

build.on('close', async () => {
  const start = shell.exec('npm run start pfe-accordion', {async:true, silent: silent});
  start.on('spawn', async () => {
    // path = instance.getOption("urls").get("local");
    // const url = new URL(path);

    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless"]
    });

    const options = {
      logLevel: "info",
      output: "html",
      onlyCategories: ["performance"],
      port: chrome.port
    };

    const runnerResult = await lighthouse(`http://localhost:8000/elements/pfe-accordion/demo`, options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    fs.writeFileSync("../test/performance/lhreport.html", reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log("Report is done for", runnerResult.lhr.finalUrl);
    console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
  }, 2000);
});
