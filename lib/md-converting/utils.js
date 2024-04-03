export const determineEol = (text) => {
  const hasCR = text.includes('\r');
  const hasLF = text.includes('\n');

  if (hasCR && hasLF) return '\r\n';
  if (hasCR && !hasLF) return '\r';
  return '\n';
};

export const cutPreformatBlocks = (destination) => (md) => {
  const regExp = /^```\n([\s\S]+?)\n```$/gm;
  return md.replace(regExp, (_, block) => {
    destination.push(block);
    const index = destination.length - 1;
    return `%PRE{${index}}PRE%`;
  });
};

export const pastePreformatBlocks = (source, replacement) => (md) => {
  if (source.length > 0) {
    const regExp = /^%PRE{(\d+?)}PRE%$/gm;
    return md.replace(regExp, (_, index) => {
      const { start, end } = replacement;
      const block = source[parseInt(index, 10)];
      return `${start}${block}${end}`;
    });
  }
  return md;
};

export const convertInlineElements = (replacements) => (md) => [
  /(?<=^|[\s'"(])\*\*(\S\S?|\S.+?\S)\*\*(?=[\s'").,:;!?]|$)/g, // bold
  /(?<=^|[\s'"(])_(\S\S?|\S.+?\S)_(?=[\s'").,:;!?]|$)/g, // italic
  /(?<=^|[\s'"(])`(\S\S?|\S.+?\S)`(?=[\s'").,:;!?]|$)/g, // monospaced
].reduce((str, regExp, index) => {
  const { start, end } = replacements[index];
  return str.replace(regExp, `${start}$1${end}`);
}, md);
