import { accessSync, constants } from 'node:fs';
import { basename, extname, dirname } from 'node:path';

const { F_OK, R_OK, W_OK } = constants;

const checkPath = (path, mode) => {
  try {
    accessSync(path, mode);
  } catch (err) {
    return false;
  }
  return true;
};

export const validateInputPath = (path) => {
  if (!checkPath(path, F_OK)) {
    throw new Error(`file ${basename(path)} does not exist`);
  }
  if (!checkPath(path, R_OK)) {
    throw new Error(`file ${basename(path)} is not readable`);
  }
  if (extname(path) !== '.md') throw new Error('invalid input file type');
};

export const validateOutputPath = (path, format) => {
  if (!checkPath(path, F_OK)) {
    const dirName = dirname(path);
    if (!checkPath(dirName, F_OK)) {
      throw new Error(`directory ${dirName} does not exist`);
    }
  } else {
    if (!checkPath(path, W_OK)) {
      throw new Error(`file ${basename(path)} is not writable`);
    }
    const extName = extname(path);
    if (!['.html', '.txt'].includes(extName)) {
      throw new Error('invalid output file type');
    } else if (extName === '.html' && format !== 'html') {
      throw new Error('html file type can be used for html format only');
    }
  }
};
