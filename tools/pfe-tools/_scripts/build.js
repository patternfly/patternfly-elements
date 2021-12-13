import glob from 'glob';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';

const WATCH = !!process.argv?.splice(2)?.find(arg => arg === 'watch');

const cwd = fileURLToPath(new URL('../', import.meta.url));

const entryPoints = glob.sync('**/*.ts', { cwd, ignore: '**/*.d.ts' });

esbuild.build({
  target: 'es2020',
  watch: WATCH,
  color: true,
  outdir: cwd,
  entryPoints,
});
