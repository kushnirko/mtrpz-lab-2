import { describe, test, expect } from '@jest/globals';
import validateMd from '../lib/validateMd.js';

describe('Markdown validation module', () => {
  test('empty line', () => {
    const md = '';
    expect(() => validateMd(md)).toThrow(
      'invalid markdown (no markdown - empty line)',
    );
  });

  test('plain text', () => {
    const md = 'This text\ncontains\nno markup';
    expect(validateMd(md)).toBeUndefined();
  });

  test('too many blank lines', () => {
    const md = 'Paragraph 1\n\n\nParagraph 2';
    expect(() => validateMd(md)).toThrow(
      'invalid markdown (too many blank lines in a row)',
    );
  });

  test('unpaired markup of preformatted text', () => {
    const md = 'This text should\n```\ncause an error';
    expect(() => validateMd(md)).toThrow(
      'invalid markdown (unpaired  markup of preformatted text)',
    );
  });

  test('valid markup of preformatted text', () => {
    const md = '```\nThis text\n```\nshould not cause an\n```\nerror\n```';
    expect(validateMd(md)).toBeUndefined();
  });

  test('unpaired markup of inline element', () => {
    const md = 'This text should **cause an error';
    expect(() => validateMd(md)).toThrow(
      'invalid markdown (unpaired markup of inline element)',
    );
  });

  test('nesting markup', () => {
    const md = 'This `text **should cause**` an error';
    expect(() => validateMd(md)).toThrow('invalid markdown (nesting markup)');
  });

  test('valid markup of inline elements', () => {
    const md = '`This_text` should **not** cause**an _error_';
    expect(validateMd(md)).toBeUndefined();
  });

  test('comprehensive test', () => {
    const md = `\`*\` _This_text_ contains
paragraphs,

\`\`\`
**pre\`formatted** block
\`\`\`
and **different types** of

\`inline\` elements.`;
    expect(validateMd(md)).toBeUndefined();
  });
});
