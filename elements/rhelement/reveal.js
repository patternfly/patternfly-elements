/*
 * Copyright 2018 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// if it's taking a long time to upgrade all the web components, reveal the
// page after waiting this many milliseconds.
const REVEAL_TIMEOUT = 1000;

export function reveal(fromTimer = false) {
  console.log(
    `[reveal] ${
      fromTimer ? "timer elapsed, " : "elements ready, "
    }revealing the body`
  );
  window.document.body.removeAttribute("unresolved");
}

let tid;

export function startTimer(timeout = REVEAL_TIMEOUT) {
  // stop any existing timers before starting a new one
  if (typeof tid === "number") {
    stopTimer(tid);
  }
  console.log(`[reveal] starting page reveal timer (${timeout} ms)`);
  tid = setTimeout(() => reveal(true), timeout);
}

export function stopTimer() {
  if (typeof tid === "number") {
    console.log("[reveal] stopping page reveal timer");
    clearTimeout(tid);
    tid = undefined;
  } else {
    console.log("[reveal] no page reveal timer running");
  }
}

export function autoReveal() {
  // If Web Components are already ready, run the handler right away.  If they
  // are not yet ready, wait.
  //
  // see https://github.com/github/webcomponentsjs#webcomponents-loaderjs for
  // info about web component readiness events
  if (window.WebComponents.ready) {
    handleWebComponentsReady();
  } else {
    window.addEventListener("WebComponentsReady", handleWebComponentsReady);
  }
}

function handleWebComponentsReady() {
  console.log("[reveal] web components ready");
  reveal(false);
  stopTimer();
}
