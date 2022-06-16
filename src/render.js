const getIndicator = (indicator) => {
  switch (indicator) {
    case 'onlyFirst':
      return '- ';
    case 'onlySecond':
      return '+ ';
    case 'notDiff':
      return '  ';
    case 'none':
      return '  ';
    default:
      throw new Error('incorrect indicator');
  }
};

const render = (collection) => {
  const item = (value, depth) => {
    // const replacer = ' ';
    // const spacesCount = 4;
    // const space = 2;
    // const indentSize = depth * spacesCount;
    // const currentIndent = replacer.repeat(indentSize - space);
    // const bracketIndent = replacer.repeat(indentSize - 1 - spacesCount);
    const amountSpace = 4;
    const replaser = ' ';
    const getSpace = (deep, spaces = 2) => replaser.repeat((deep * amountSpace) - spaces);

    const lines = value.flatMap((obj) => {
      const { indicator } = obj;
      const keys = Object.keys(obj)
        .flatMap((key) => {
          if (key !== 'indicator') {
            const keyStr = `${getSpace(depth)}${getIndicator(indicator)}${[key]}`;
            if (Array.isArray(obj[key])) {
              return `${keyStr}: ${item(obj[key], depth + 1)}`;
            }
            return `${keyStr}: ${obj[key]}`;
          }
          return [];
        });
      return keys;
    });
    const result = ['{', ...lines, `${getSpace(depth - 1)}}`].join('\n');
    return result;
  };
  return item(collection, 1);
};

export default render;
