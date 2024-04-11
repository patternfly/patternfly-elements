#!/usr/bin/env node
import { main } from '../main.js';

(async function() {
  try {
    await main();
  } catch (e) {
    if (e) {
      console.error(e);
    }
  }
})();
