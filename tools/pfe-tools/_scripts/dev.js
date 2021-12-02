import glob from 'glob';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';

const cwd = fileURLToPath(new URL('../', import.meta.url));

const entryPoints = glob.sync('**/*.ts', { cwd, ignore: '**/*.d.ts' });

esbuild.build({
  target: 'es2020',
  watch: true,
  color: true,
  outdir: cwd,
  entryPoints,
});
