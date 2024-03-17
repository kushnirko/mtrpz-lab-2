import { pipe } from './utils.js';

const checkSimpleErrors = (md) => {
  const errors = [
    {
      regExp: /\n{3,}/g,
      message: 'too many spaces between paragraphs',
    },
  ];

  const found = errors.find((err) => err.regExp.test(md));
  if (found) throw Error(found.message);
  return md;
};

const checkUnpairedPreformat = (md) => {
  const regExp = /(^|\n)```(\n|$)/g;
  const matches = md.match(regExp);
  if (matches && matches.length % 2 !== 0) {
    throw new Error('unpaired  markup of preformatted text');
  }
  return md;
};

const removePreformatBlocks = (md) => {
  const regExp = /(?<=^|\n)```\n[\s\S]+?\n```(?=\n|$)/g;
  return md.replace(regExp, '');
};

const checkNesting = (md) => {
  const regExp = /(?<=(^|[\s'"(])(\*\*|`|_))(\S.+?\S)(?=\2([\s'").,:;!?]|$))/g;
  const matches = md.match(regExp);
  if (matches && matches.some((match) => regExp.test(match))) {
    throw new Error('nesting markup');
  }
  return md;
};

const removeInlineMarkup = (md) => {
  const regExp = /(?<=^|[\s'"(])(\*\*|`|_)(\S.+?\S|\S)\1(?=[\s'").,:;!?]|$)/g;
  return md.replace(regExp, '$2');
};

const checkUnpairedInline = (md) => {
  const regExps = [
    /(^|[\s'"(])(\*\*|`|_)\S/, // checks for unclosed inline markup
    /\S(\*\*|`|_)([\s'").,:;!?]|$)/, // checks for unopened inline markup
  ];

  if (regExps.some((regExp) => regExp.test(md))) {
    throw new Error('unpaired markup of inline element');
  }
  return md;
};

export default function validateMd(md) {
  try {
    pipe([
      checkSimpleErrors,
      checkUnpairedPreformat,
      removePreformatBlocks,
      checkNesting,
      removeInlineMarkup,
      checkUnpairedInline,
    ])(md);
  } catch (err) {
    return new Error(`invalid markdown (${err.message})`);
  }
  return null;
}
