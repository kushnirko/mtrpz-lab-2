import { describe, test, expect } from '@jest/globals';
import convertMdToHtml from '../lib/md-converting/convertMdToHtml.js';

describe('Markdown to HTML converting module', () => {
  test('paragraphs', () => {
    const md = 'Paragraph\n1\n\nParagraph\n2';
    const html = convertMdToHtml(md);
    expect(html).toBe('<p>Paragraph\n1</p>\n<p>Paragraph\n2</p>');
  });

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
    const html = convertMdToHtml(md);
    expect(html).toBe(`<p>
<pre>
This **text**
</pre>
contains
<pre>
3
</pre>
preformatted
<pre>
_blocks_
</pre>
</p>`);
  });

  test('bold', () => {
    const md = '**This*text** contains **3** parts **in**bold**';
    const html = convertMdToHtml(md);
    expect(html).toBe(
      '<p><b>This*text</b> contains <b>3</b> parts <b>in**bold</b></p>',
    );
  });

  test('italic', () => {
    const md = '_This_text_ contains _3_ parts _in__italic_';
    const html = convertMdToHtml(md);
    expect(html).toBe(
      '<p><i>This_text</i> contains <i>3</i> parts <i>in__italic</i></p>',
    );
  });

  test('monospaced', () => {
    const md = '`This`text` contains `3` `monospaced``parts`';
    const html = convertMdToHtml(md);
    expect(html).toBe(
      '<p><tt>This`text</tt> contains <tt>3</tt> <tt>monospaced``parts</tt></p>',
    );
  });

  test('different length of inline elements', () => {
    const md = '**I** _do_ `not` _like_ **bugs!**';
    const html = convertMdToHtml(md);
    expect(html).toBe(
      '<p><b>I</b> <i>do</i> <tt>not</tt> <i>like</i> <b>bugs!</b></p>',
    );
  });

  test('text with punctuations', () => {
    const md = 'Are "`there`" (_too_) many **punctuations**, in this `text`?';
    const html = convertMdToHtml(md);
    expect(html).toBe(
      '<p>Are "<tt>there</tt>" (<i>too</i>) many <b>punctuations</b>, in this <tt>text</tt>?</p>',
    );
  });

  test('cyrillic text', () => {
    const md = 'Ходить **гарбуз**\n`по` городу';
    const html = convertMdToHtml(md);
    expect(html).toBe('<p>Ходить <b>гарбуз</b>\n<tt>по</tt> городу</p>');
  });

  test('comprehensive test', () => {
    const md = `\`*\` _This_text_ contains
paragraphs,

\`\`\`
**pre_formatted** block
\`\`\`
and **different types** of

\`inline\` elements.`;
    const html = convertMdToHtml(md);
    expect(html).toBe(`<p><tt>*</tt> <i>This_text</i> contains
paragraphs,</p>
<p>
<pre>
**pre_formatted** block
</pre>
and <b>different types</b> of</p>
<p><tt>inline</tt> elements.</p>`);
  });
});
