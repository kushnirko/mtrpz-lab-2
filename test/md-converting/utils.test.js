import { describe, expect, test } from '@jest/globals';
import {
  determineEol,
  cutPreformatBlocks,
  pastePreformatBlocks,
  convertInlineElements,
} from '../../lib/md-converting/utils.js';

describe('Markdown converting utils module', () => {
  test('Function determineEol', () => {
    const text = 'This text\r\nhas a\r\nWindows EOL';
    const eol = determineEol(text);
    expect(eol).toBe('\r\n');
  });

  test('Function cutPreformatBlocks', () => {
    const md = `\`\`\`
This **text**
\`\`\`
contains
\`\`\`
3
\`\`\`
preformatted
\`\`\`
_blocks_
\`\`\``;
    const preformatBlocks = [];
    const tempMetadata = cutPreformatBlocks(preformatBlocks)(md);
    expect(tempMetadata).toBe(`%PRE{0}PRE%
contains
%PRE{1}PRE%
preformatted
%PRE{2}PRE%`);
    expect(preformatBlocks).toEqual(['This **text**', '3', '_blocks_']);
  });

  test('Function pastePreformatBlocks', () => {
    const tempMetadata = `%PRE{0}PRE%
contains
%PRE{1}PRE%
preformatted
%PRE{2}PRE%`;
    const preformatBlocks = ['This **text**', '3', '_blocks_'];
    const replacement = { start: '🍏', end: '🍎' };
    const res = pastePreformatBlocks(preformatBlocks, replacement)(tempMetadata);
    expect(res).toBe(`🍏This **text**🍎
contains
🍏3🍎
preformatted
🍏_blocks_🍎`);
  });

  test('Function convertInlineElements', () => {
    const md = '**bold** _italic_ `monospaced`';
    const replacements = [
      { start: '🐸', end: '🐶' },
      { start: '🐼', end: '🐱' },
      { start: '🐷', end: '🐵' },
    ];
    const res = convertInlineElements(replacements)(md);
    expect(res).toBe('🐸bold🐶 🐼italic🐱 🐷monospaced🐵');
  });
});
