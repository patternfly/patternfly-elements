import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export const States = {
  OFF: 'off',
  WARNING: 'warn',
  ERROR: 'error',
  ALWAYS: 'always',
  NEVER: 'never',
  IGNORE: 'ignore',
}

