import {
  describe, beforeAll, afterAll, test, expect,
} from '@jest/globals';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { validateInputPath, validateOutputPath } from '../lib/validatePath.js';

describe('Paths validation module', () => {
  beforeAll(() => {
    mkdirSync('./paths');
    const files = [
      { path: './paths/valid.md', mode: 0o666 },
      { path: './paths/valid.txt', mode: 0o666 },
      { path: './paths/valid.html', mode: 0o666 },
      { path: './paths/valid.xml', mode: 0o666 },
      { path: './paths/non-readable.md', mode: 0o222 },
      { path: './paths/non-writable.txt', mode: 0o444 },
    ];
    files.forEach((file) => {
      writeFileSync(file.path, '', { mode: file.mode });
    });
  });

  afterAll(() => {
    rmSync('./paths', { recursive: true, force: true });
  });

  test('non-existent input file', () => {
    const path = './paths/non-existent.md';
    expect(() => validateInputPath(path)).toThrow(
      'file non-existent.md does not exist',
    );
  });

  test('non-readable input file', () => {
    const path = './paths/non-readable.md';
    expect(() => validateInputPath(path)).toThrow(
      'file non-readable.md is not readable',
    );
  });

  test('not *.md input file', () => {
    const path = './paths/valid.xml';
    expect(() => validateInputPath(path)).toThrow('invalid input file type');
  });

  test('valid input file', () => {
    const path = './paths/valid.md';
    expect(validateInputPath(path)).toBeUndefined();
  });

  test('non-existent output file', () => {
    const path = './paths/non-existent.txt';
    expect(validateOutputPath(path, 'text')).toBeUndefined();
  });

  test('non-existent output path', () => {
    const path = './paths/non-existent/non-existent.txt';
    expect(() => validateOutputPath(path, 'pdf')).toThrow(
      'directory ./paths/non-existent does not exist',
    );
  });

  test('non-writable output file', () => {
    const path = './paths/non-writable.txt';
    expect(() => validateOutputPath(path, 'html')).toThrow(
      'file non-writable.txt is not writable',
    );
  });

  test('not *.txt or *.html output file', () => {
    const path = './paths/valid.xml';
    expect(() => validateOutputPath(path, 'html')).toThrow(
      'invalid output file type',
    );
  });

  test('*.html output file but not html format', () => {
    const path = './paths/valid.html';
    expect(() => validateOutputPath(path, 'ansi')).toThrow(
      'html file type can be used for html format only',
    );
  });

  test('valid output file', () => {
    const path = './paths/valid.txt';
    expect(validateOutputPath(path, 'none')).toBeUndefined();
  });
});
