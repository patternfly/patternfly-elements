import { bsLocal, BS_LOCAL_ARGS } from './fixtures.js';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

const redColour = '\x1b[31m';
const whiteColour = '\x1b[0m';

const local = process.env.BROWSERSTACK_LOCAL === 'true';

export default async function() {
  if (local) {
    console.log('Starting BrowserStackLocal ...');
    // Starts the Local instance with the required arguments
    let localResponseReceived = false;
    bsLocal.start(BS_LOCAL_ARGS, err => {
      if (err) {
        console.error(
          `${redColour}Error starting BrowserStackLocal${whiteColour}`
        );
      } else {
        console.log('BrowserStackLocal Started');
      }

      localResponseReceived = true;
    });
    while (!localResponseReceived) {
      await sleep(1000);
    }
  }
}
