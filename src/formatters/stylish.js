import getDifferents from '../getDiff.js';

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

//переделать под новую логику дифа!
const render = (collection) => {
  const item = (value, depth) => {
    const amountSpace = 4;
    const replaser = ' ';
    const getSpace = (deep, spaces = 2) => replaser.repeat((deep * amountSpace - spaces));

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

const a = {
  key: {
    next1: 'hi',
    n: 3,
    // next2: {
    //     n: 3,
    // },
  },
};

const b = {
  key: {
    next1: 'h',
    // next2: {
    //     n: 2,
    // },
    // next3: 'net',
  },
};

const y = getDifferents(a, b);
