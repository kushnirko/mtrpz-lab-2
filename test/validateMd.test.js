import { describe, test, expect } from '@jest/globals';
import validateMd from '../lib/validateMd.js';

describe('Markdown validation module', () => {
  test('plain text', () => {
    const md = 'This text\ncontains\nno markup';
    const err = validateMd(md);
    expect(err).toBeNull();
  });

  // TODO: change to 'too many blank lines'
  test('too many blank lines between paragraphs', () => {
    const md = 'Paragraph 1\n\n\nParagraph 2';
    const err = validateMd(md);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe(
      'invalid markdown (too many spaces between paragraphs)',
    );
  });

  test('unpaired markup of preformatted text', () => {
    const md = 'This text should\n```\ncause an error';
    const err = validateMd(md);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe(
      'invalid markdown (unpaired  markup of preformatted text)',
    );
  });

  test('valid markup of preformatted text', () => {
    const md = '```\nThis text\n```\nshould not cause an\n```\nerror\n```';
    const err = validateMd(md);
    expect(err).toBeNull();
  });

  test('unpaired markup of inline element', () => {
    const md = 'This text should **cause an error';
    const err = validateMd(md);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe(
      'invalid markdown (unpaired markup of inline element)',
    );
  });

  test('nesting markup', () => {
    const md = 'This `text **should cause**` an error';
    const err = validateMd(md);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('invalid markdown (nesting markup)');
  });

  test('valid markup of inline elements', () => {
    const md = '`This_text` should **not** cause**an _error_';
    const err = validateMd(md);
    expect(err).toBeNull();
  });

  test('comprehensive test', () => {
    const md = `\`*\` _This_text_ contains
paragraphs,

\`\`\`
**pre\`formatted** block
\`\`\`
and **different types** of

\`inline\` elements.`;
    const err = validateMd(md);
    expect(err).toBeNull();
  });
});
