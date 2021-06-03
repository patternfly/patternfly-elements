/* 
 * This script is still a work-in-progress.
 * TODO: Needs a way to better report on the timings per component.
*/

const fs = require("fs");
const lighthouse = require("lighthouse");
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const chromeLauncher = require("chrome-launcher");
const shell = require("shelljs");
const tools = require("tools.js");

const silent = true;

process.env.OPEN = false;

const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm run build -- --help`.
  .usage("Usage: npm run perf -- [options]")
  .example([
    ["npm run perf", "(test all components)"],
    ["npm run perf -- pfe-card", "(test one component)"],
    ["npm run perf -- pfe-card pfe-band", "(test multiple components)"],
    ["npm run perf -- --nobuild", "(test all components without building first)"]
  ])
  .options({
    nobuild: {
      default: false,
      alias: "nb",
      describe: "do not build the component(s) prior to running tests",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
const components = argv._.length > 0 ? tools.validateElementNames(argv._) : [];

if (!argv.nobuild) shell.exec(`npm run build ${components.join(" ")}`, {async:false, silent: silent});

const server = shell.exec('npm run start ${components.join(" ")}', {async:true, silent: silent});
server.stdout.on('data', async (data) => {
  const getUrl = data.match(`http://(.*?)/`);
  if (!getUrl || getUrl.length < 2) return;
  const path = getUrl[1];

  let pages = [];

  if (components.length > 0) {
    components.forEach( c => {
      pages.push(`http://${path}/elements/${c}/demo`);
    });
  } else {
    tools.getElementNames.forEach( c => {
      pages.push(`http://${path}/elements/${c}/demo`);
    });
  }


  asyncForEach(pages, async page => {
    try {
      await launchChromeAndRunLighthouse(page).then(results => {
        writeResults(page, results)
      })
    } catch (error) {
      console.log(error)
    }
  })

  const runnerResult = await lighthouse(`http://${path}/elements/pfe-cta/demo`, options);
  server.kill();

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync("./test/performance/lhreport.html", reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
});

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function launchChromeAndRunLighthouse (page) {
  return new Promise((resolve, reject) => {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless"]
    }).then(chrome => {
  
      const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance"],
        port: chrome.port
      };

      const url = `${config.baseUrl}${page.path}`;

      lighthouse(url, options, config.lighthouseConfig)
        .then(results => {
          chrome.kill().then(resolve(results.lhr))
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  })
}

function writeResults (page, results) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory)
  }

  const htmlReport = ReportGenerator.generateReport(results, 'html')
  const resultsPath = getReportFilePath(outputDirectory, page.name)
  return fs.writeFile(resultsPath, htmlReport, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`The report for "${page.name}" was saved at ${resultsPath}`)
  })
}
