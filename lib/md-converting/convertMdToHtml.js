import pipe from '../pipe.js';
import {
  cutPreformatBlocks,
  pastePreformatBlocks,
  convertInlineElements,
} from './utils.js';

const convertParagraphs = (md) => {
  const paragraphs = md.split('\n\n');
  return paragraphs
    .map((paragraph) => {
      const start = paragraph.startsWith('%PRE{') ? '\n' : '';
      const end = paragraph.endsWith('}PRE%') ? '\n' : '';
      return `<p>${start}${paragraph}${end}</p>`;
    })
    .join('\n');
};

export default function convertMdToHtml(md) {
  const preformatBlocks = [];
  return pipe([
    cutPreformatBlocks(preformatBlocks),
    convertInlineElements([
      { start: '<b>', end: '</b>' },
      { start: '<i>', end: '</i>' },
      { start: '<tt>', end: '</tt>' },
    ]),
    convertParagraphs,
    pastePreformatBlocks(preformatBlocks, {
      start: '<pre>\n',
      end: '\n</pre>',
    }),
  ])(md);
}
