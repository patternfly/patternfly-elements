import { bsLocal } from './fixtures.js';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

const local = process.env.BROWSERSTACK_LOCAL === 'true';

export default async function() {
  if (local) {
    // Stop the Local instance after your test run is completed, i.e after driver.quit
    let localStopped = false;

    if (bsLocal && bsLocal.isRunning()) {
      bsLocal.stop(() => {
        localStopped = true;
        console.log('Stopped BrowserStackLocal');
      });
      while (!localStopped) {
        await sleep(1000);
      }
    }
  }
}
