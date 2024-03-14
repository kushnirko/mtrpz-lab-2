const checkSimpleErrors = (data) => {
  const errors = [
    {
      regExp: /\n{3,}/g,
      message: 'too many spaces between paragraphs',
    },
  ];

  const found = errors.find((err) => err.regExp.test(data));
  if (found) throw Error(found.message);
  return data;
};

const checkUnpairedPreformat = (data) => {
  const regExp = /(^|\n)```(\n|$)/g;
  const matches = data.match(regExp);
  if (matches.length % 2 !== 0) {
    throw new Error('unpaired  markup of preformatted text');
  }
  return data;
};

const removePreformatBlocks = (data) => {
  const regExp = /(?<=^|\n)```\n[\s\S]+?\n```(?=\n|$)/g;
  return data.replace(regExp, '');
};

const checkNesting = (data) => {
  const regExp = /(?<=(^|[\s'"(])(\*\*|`|_))(\S.+?\S)(?=\2([\s'").,:;!?]|$))/g;
  const matches = data.match(regExp);
  if (matches.some((match) => regExp.test(match))) {
    throw new Error('nesting markup');
  }
  return data;
};

const removeInlineMarkup = (data) => {
  const regExp = /(?<=^|[\s'"(])(\*\*|`|_)(\S.+?\S|\S)\1(?=[\s'").,:;!?]|$)/g;
  return data.replace(regExp, '$2');
};

const checkUnpairedInline = (data) => {
  const regExps = [
    /(^|[\s'"(])(\*\*|`|_)\S/, // checks for unclosed inline markup
    /\S(\*\*|`|_)([\s'").,:;!?]|$)/, // checks for unopened inline markup
  ];

  if (regExps.some((regExp) => regExp.test(data))) {
    throw new Error('unpaired markup of inline element');
  }
  return data;
};

const validateMd = (data) => {
  try {
    checkUnpairedInline(
      removeInlineMarkup(
        checkNesting(
          removePreformatBlocks(
            checkUnpairedPreformat(
              checkSimpleErrors(data),
            ),
          ),
        ),
      ),
    );
  } catch (err) {
    return new Error(`invalid markdown (${err.message})`);
  }
  return null;
};

module.exports = validateMd;
