// rollup.config.js
import configFactory from "<%= rollupConfigLocation %>";
import pfelementPackage from "./package.json";

export default configFactory(pfelementPackage.pfelement);
