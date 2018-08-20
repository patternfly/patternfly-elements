// rollup.config.js
import configFactory from "../../scripts/rollup.config.factory.js";
import rhelementPackage from "./package.json";

export default configFactory(rhelementPackage.rhelement);
