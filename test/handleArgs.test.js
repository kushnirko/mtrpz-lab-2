import {
  jest,
  describe,
  test,
  expect,
} from '@jest/globals';
import handleArgs from '../lib/handleArgs.js';

const mockArgv = (...args) => jest.replaceProperty(
  process,
  'argv',
  ['this will be sliced', 'this will also be sliced', ...args],
);

describe('CMD arguments handling module', () => {
  test('no arguments', () => {
    mockArgv();
    expect(() => handleArgs()).toThrow('no input file path provided');
  });

  test('only input path', () => {
    mockArgv('/path/to/valid/markdown');
    const { inputPath, outputPath, format } = handleArgs();
    expect(inputPath).toBe('/path/to/valid/markdown');
    expect(outputPath).toBeUndefined();
    expect(format).toBe('ansi');
  });

  test('no output path', () => {
    mockArgv('top-secret-data', '--out');
    expect(() => handleArgs()).toThrow('no output path provided');
  });

  test('input and output paths', () => {
    mockArgv('input.md', '--out', 'output.html');
    const { inputPath, outputPath, format } = handleArgs();
    expect(inputPath).toBe('input.md');
    expect(outputPath).toBe('output.html');
    expect(format).toBe('html');
  });

  test('input path and format', () => {
    mockArgv('hello.world', '--format=none');
    const { inputPath, outputPath, format } = handleArgs();
    expect(inputPath).toBe('hello.world');
    expect(outputPath).toBeUndefined();
    expect(format).toBe('none');
  });

  test('input path, output path and format', () => {
    mockArgv('input', '--out', 'output', '--format=😉');
    const { inputPath, outputPath, format } = handleArgs();
    expect(inputPath).toBe('input');
    expect(outputPath).toBe('output');
    expect(format).toBe('😉');
  });

  test('invalid argument', () => {
    mockArgv('🙂', '😈', '--format=🙃');
    expect(() => handleArgs()).toThrow('invalid argument - 😈');
  });
});
