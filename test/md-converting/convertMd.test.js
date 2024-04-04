import { describe, expect, test } from '@jest/globals';
import convertMd from '../../lib/md-converting/convertMd.js';

describe('Markdown converting module', () => {
  test('invalid format', () => {
    const md = 'Some **meaningful** text';
    const format = 'none';
    expect(() => convertMd(md, format)).toThrow('unsupported output format - none');
  });

  test('html format', () => {
    const md = 'Some **meaningful** text';
    const format = 'html';
    const html = convertMd(md, format);
    expect(html).toBe('<p>Some <b>meaningful</b> text</p>');
  });

  test('ansi escapes format', () => {
    const md = 'Some **meaningful** text';
    const format = 'ansi';
    const ansi = convertMd(md, format);
    expect(ansi).toBe('Some \x1b[1mmeaningful\x1b[22m text');
  });

  test('not unix-like eol', () => {
    const md = 'This _text_\rhas **a**\rnon-UNIX `EOL`';
    const ansi = convertMd(md, 'ansi');
    expect(ansi).toBe(
      'This \x1b[3mtext\x1b[23m\rhas \x1b[1ma\x1b[22m\rnon-UNIX \x1b[7mEOL\x1b[27m',
    );
  });

  test('different length of inline elements', () => {
    const md = '**I** _do_ `not` _like_ **bugs!**';
    const html = convertMd(md, 'html');
    expect(html).toBe('<p><b>I</b> <i>do</i> <tt>not</tt> <i>like</i> <b>bugs!</b></p>');
  });

  test('text with punctuations', () => {
    const md = 'Are "`there`" (_too_) many **punctuations**, in this `text`?';
    const html = convertMd(md, 'html');
    expect(html).toBe(
      '<p>Are "<tt>there</tt>" (<i>too</i>) many <b>punctuations</b>, in this <tt>text</tt>?</p>',
    );
  });

  test('cyrillic text', () => {
    const md = 'Ходить **гарбуз**\n`по` городу';
    const ansi = convertMd(md, 'ansi');
    expect(ansi).toBe('Ходить \x1b[1mгарбуз\x1b[22m\n\x1b[7mпо\x1b[27m городу');
  });
});
