import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  nodeResolve: false,
  port: 8080,
  rootDir: '_site',
  plugins: [
    importMapsPlugin()
  ],
};
