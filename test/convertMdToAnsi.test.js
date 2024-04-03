import { describe, test, expect } from '@jest/globals';
import convertMdToAnsi from '../lib/md-converting/convertMdToAnsi.js';

describe('Markdown to ANSI escapes converting module', () => {
  test('preformatted text markup', () => {
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
    const ansi = convertMdToAnsi(md);
    expect(ansi).toBe(`\x1b[7mThis **text**\x1b[27m
contains
\x1b[7m3\x1b[27m
preformatted
\x1b[7m_blocks_\x1b[27m`);
  });

  test('bold', () => {
    const md = '**This*text** contains **3** parts **in**bold**';
    const ansi = convertMdToAnsi(md);
    expect(ansi).toBe(
      '\x1b[1mThis*text\x1b[22m contains \x1b[1m3\x1b[22m parts \x1b[1min**bold\x1b[22m',
    );
  });

  test('italic', () => {
    const md = '_This_text_ contains _3_ parts _in__italic_';
    const ansi = convertMdToAnsi(md);
    expect(ansi).toBe(
      '\x1b[3mThis_text\x1b[23m contains \x1b[3m3\x1b[23m parts \x1b[3min__italic\x1b[23m',
    );
  });

  test('monospaced', () => {
    const md = '`This`text` contains `3` `monospaced``parts`';
    const ansi = convertMdToAnsi(md);
    expect(ansi).toBe(
      '\x1b[7mThis`text\x1b[27m contains \x1b[7m3\x1b[27m \x1b[7mmonospaced``parts\x1b[27m',
    );
  });

  test('comprehensive test', () => {
    const md = `\`*\` _This_text_ contains
paragraphs,

\`\`\`
**pre_formatted** block
\`\`\`
and **different types** of

\`inline\` elements.`;
    const ansi = convertMdToAnsi(md);
    expect(ansi).toBe(`\x1b[7m*\x1b[27m \x1b[3mThis_text\x1b[23m contains
paragraphs,

\x1b[7m**pre_formatted** block\x1b[27m
and \x1b[1mdifferent types\x1b[22m of

\x1b[7minline\x1b[27m elements.`);
  });
});
