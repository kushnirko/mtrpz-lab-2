import convertMdToAnsi from './convertMdToAnsi.js';
import convertMdToHtml from './convertMdToHtml.js';
import pipe from '../pipe.js';
import { determineEol } from './utils.js';

const converters = {
  ansi: convertMdToAnsi,
  html: convertMdToHtml,
};

export default function convertMd(md, format) {
  if (!Object.keys(converters).includes(format)) {
    throw new Error(`unsupported output format - ${format}`);
  }
  const eol = determineEol(md);
  return eol === '\n'
    ? converters[format](md)
    : pipe([
      (text) => text.replace(eol, '\n'),
      converters[format],
      (text) => text.replace('\n', eol),
    ])(md);
}
