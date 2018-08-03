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

window.addEventListener("WebComponentsReady", () => {
  console.log("[reveal] web components ready");
  reveal(false);
});
