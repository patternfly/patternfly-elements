// const getElementNames =  require("../../scripts/get-element-names");

// describe("PatternFly Elements", () => {
//   const elementNames = getElementNames.getElementNames();
//   const shortenedElements = [elementNames[0], elementNames[1]];
//   const tests = [];
//   let iteration = 0;

//   shortenedElements.forEach(element => {
//     const test = element => {
//       console.log(`ELEMENT: ${element}`)
      
//       const promise = new Promise((resolve, reject) => {
//         before(() => {
//           console.log(`NAVIGATING TO ${element}`);
//           browser.url(`/elements/${element}/demo`);
//         });
      
//         it("should take a screenshot", () => {
//           browser.saveFullPageScreen("fullPage");
//         });
      
//         it("should compare to the baseline", () => {
//           expect(browser.checkFullPageScreen("fullPage")).toBeLessThan(1.25);
//           console.log(`DONE TESTING ${element}`);
//           resolve();
//         });
//       });

//       return promise;
//     }

//     tests.push(test);
//   });

//   function executeTest(test) {
//     test(shortenedElements[iteration]).then(() => {
//       if (tests.length) {
//         tests.shift();

//         if (tests.length) {
//           iteration++;
//           executeTest(tests[0]);
//         }
//       }
//     });
//   }

//   executeTest(tests[0]);

//   // before(() => {
//   //   browser.url("/demo");
//   // });

//   // it("should take a screenshot", () => {
//   //   browser.saveFullPageScreen("fullPage");
//   // });

//   // it("should compare to the baseline", () => {
//   //   expect(browser.checkFullPageScreen("fullPage")).toBeLessThan(1.25);
//   // });
// });