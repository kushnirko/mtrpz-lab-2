import pipe from './pipe.js';

const fail = (message) => {
  throw new Error(`invalid markdown (${message})`);
};

const checkSimpleErrors = (md) => {
  const errors = [
    {
      regExp: /\n{3,}/g,
      message: 'too many blank lines in a row',
    },
  ];

  const found = errors.find((err) => err.regExp.test(md));
  if (found) fail(found.message);
  return md;
};

const checkUnpairedPreformat = (md) => {
  const regExp = /(^|\n)```(\n|$)/g;
  const matches = md.match(regExp);
  if (matches && matches.length % 2 !== 0) {
    fail('unpaired  markup of preformatted text');
  }
  return md;
};

const removePreformatBlocks = (md) => {
  const regExp = /(?<=^|\n)```\n[\s\S]+?\n```(?=\n|$)/g;
  return md.replace(regExp, '');
};

const checkNesting = (md) => {
  // prettier-ignore
  const regExp = /(?<=(^|[\s'"(])(\*\*|`|_))(\S\S?|\S.+?\S)(?=\2([\s'").,:;!?]|$))/g;
  const matches = md.match(regExp);
  if (matches && matches.some((match) => regExp.test(match))) {
    fail('nesting markup');
  }
  return md;
};

const removeInlineMarkup = (md) => {
  // prettier-ignore
  const regExp = /(?<=^|[\s'"(])(\*\*|`|_)(\S\S?|\S.+?\S)\1(?=[\s'").,:;!?]|$)/g;
  return md.replace(regExp, '$2');
};

const checkUnpairedInline = (md) => {
  const regExps = [
    /(^|[\s'"(])(\*\*|`|_)\S/, // checks for unclosed inline markup
    /\S(\*\*|`|_)([\s'").,:;!?]|$)/, // checks for unopened inline markup
  ];

  if (regExps.some((regExp) => regExp.test(md))) {
    fail('unpaired markup of inline element');
  }
  return md;
};

export default function validateMd(md) {
  if (md === '') fail('no markdown - empty line');
  pipe([
    checkSimpleErrors,
    checkUnpairedPreformat,
    removePreformatBlocks,
    checkNesting,
    removeInlineMarkup,
    checkUnpairedInline,
  ])(md);
}
