import { readFileSync, writeFileSync } from 'node:fs';
import { validateInputPath, validateOutputPath } from './validatePath.js';

export const read = (path) => {
  validateInputPath(path);
  return readFileSync(path, 'utf-8');
};

export const write = (path, data, format) => {
  validateOutputPath(path, format);
  writeFileSync(path, data);
};
