const preformatBlocks = [];

const convertPreformatBlocks = (data) => {
  const regExp = /(?<=^|\n)```(\n[\s\S]+?\n)```(?=\n|$)/g;
  const replacement = '<pre>$1</pre>';
  return data.replace(regExp, replacement);
};

const cutPreformatBlocks = (data) => {
  const regExp = /(?<=(^|\n)<pre>\n)[\s\S]+?(?=\n<\/pre>(\n|$))/g;
  return data.replace(regExp, (block) => {
    preformatBlocks.push(block);
    const index = preformatBlocks.length - 1;
    return index.toString();
  });
};

const convertInlineElements = (data) => {
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
    data,
  );
};

const pastePreformatBlocks = (data) => {
  if (preformatBlocks.length > 0) {
    const regExp = /(?<=(^|\n)<pre>\n)\d+?(?=\n<\/pre>(\n|$))/g;
    return data.replace(regExp, (index) => preformatBlocks[index]);
  }
  return data;
};

const convertParagraphs = (data) => {
  const paragraphs = data.split('\n\n');
  return paragraphs
    .map((paragraph) => {
      const start = (paragraph.startsWith('<pre>') ? '\n' : '');
      const end = (paragraph.endsWith('</pre>') ? '\n' : '');
      return `<p>${start}${paragraph}${end}</p>`;
    })
    .join('\n');
};

const convertMdToHtml = (data) => convertParagraphs(
  pastePreformatBlocks(
    convertInlineElements(
      cutPreformatBlocks(
        convertPreformatBlocks(data),
      ),
    ),
  ),
);

module.exports = convertMdToHtml;
