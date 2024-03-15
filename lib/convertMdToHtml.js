import { pipe } from './utils.js';

const preformatBlocks = [];

const convertPreformatBlocks = (md) => {
  const regExp = /(?<=^|\n)```(\n[\s\S]+?\n)```(?=\n|$)/g;
  const replacement = '<pre>$1</pre>';
  return md.replace(regExp, replacement);
};

const cutPreformatBlocks = (md) => {
  const regExp = /(?<=(^|\n)<pre>\n)[\s\S]+?(?=\n<\/pre>(\n|$))/g;
  return md.replace(regExp, (block) => {
    preformatBlocks.push(block);
    const index = preformatBlocks.length - 1;
    return index.toString();
  });
};

const convertInlineElements = (md) => {
  const inlineElements = [
    {
      regExp: /(?<=^|[\s'"(])\*\*(\S.+?\S|\S)\*\*(?=[\s'").,:;!?]|$)/g,
      replacement: '<b>$1</b>',
    },
    {
      regExp: /(?<=^|[\s'"(])_(\S.+?\S|\S)_(?=[\s'").,:;!?]|$)/g,
      replacement: '<i>$1</i>',
    },
    {
      regExp: /(?<=^|[\s'"(])`(\S.+?\S|\S)`(?=[\s'").,:;!?]|$)/g,
      replacement: '<tt>$1</tt>',
    },
  ];

  return inlineElements.reduce(
    (str, element) => str.replace(element.regExp, element.replacement),
    md,
  );
};

const pastePreformatBlocks = (md) => {
  if (preformatBlocks.length > 0) {
    const regExp = /(?<=(^|\n)<pre>\n)\d+?(?=\n<\/pre>(\n|$))/g;
    return md.replace(regExp, (index) => preformatBlocks[index]);
  }
  return md;
};

const convertParagraphs = (md) => {
  const paragraphs = md.split('\n\n');
  return paragraphs
    .map((paragraph) => {
      const start = (paragraph.startsWith('<pre>') ? '\n' : '');
      const end = (paragraph.endsWith('</pre>') ? '\n' : '');
      return `<p>${start}${paragraph}${end}</p>`;
    })
    .join('\n');
};

export default function convertMdToHtml(md) {
  return pipe([
    convertPreformatBlocks,
    cutPreformatBlocks,
    convertInlineElements,
    pastePreformatBlocks,
    convertParagraphs,
  ])(md);
}
