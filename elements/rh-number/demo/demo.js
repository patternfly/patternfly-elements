const app = new Vue({
  el: "#app",
  data: {
    numbers: [
      { number: 4, type: "ordinal" },
      { number: 2017, type: "bytes", step: 0.2 },
      { number: 12345, type: "abbrev", step: 1000 },
      { number: 0.5678, type: "percent", step: 0.01 },
      { number: 2e6, type: "e", step: 1e4 },
      { number: 97654321.12345678, type: "thousands", step: 1e4 }
    ]
  }
});
