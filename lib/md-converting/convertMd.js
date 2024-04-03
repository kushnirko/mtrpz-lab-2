import convertMdToAnsi from './convertMdToAnsi.js';
import convertMdToHtml from './convertMdToHtml.js';

const converters = {
  ansi: convertMdToAnsi,
  html: convertMdToHtml,
};

export default function convertMd(md, format) {
  if (!Object.keys(converters).includes(format)) {
    throw new Error(`unsupported output format - ${format}`);
  }
  return converters[format](md);
}
