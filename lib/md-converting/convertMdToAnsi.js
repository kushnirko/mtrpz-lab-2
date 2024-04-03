import pipe from '../pipe.js';
import {
  cutPreformatBlocks,
  pastePreformatBlocks,
  convertInlineElements,
} from './utils.js';

export default function convertMdToAnsi(md) {
  const preformatBlocks = [];
  return pipe([
    cutPreformatBlocks(preformatBlocks),
    convertInlineElements([
      { start: '\x1b[1m', end: '\x1b[22m' },
      { start: '\x1b[3m', end: '\x1b[23m' },
      { start: '\x1b[7m', end: '\x1b[27m' },
    ]),
    pastePreformatBlocks(preformatBlocks, {
      start: '\x1b[7m',
      end: '\x1b[27m',
    }),
  ])(md);
}
