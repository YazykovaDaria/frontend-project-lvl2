import { isObject, getDifferents } from './getDiff.js';

const getIndicator = (indicator) => {
  switch (indicator) {
    case 'onlyFirst':
      return '- ';
    case 'onlySecond':
      return '+ ';
    case ('notDiff' || undefined):
      return '  ';
    default:
      return '*';
    //throw new Error('incorrect indicator');
  }
};

const render = (collection) => {
  const item = (value, depth) => {

    const result = value.flatMap((obj) => {
      const replacer = ' ';
      const spacesCount = 2;
      const indentSize = depth * spacesCount;
      const currentIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);

      const keys = Object.entries(obj)
        .flatMap(([key, val]) => {
          const { indicator } = key;
          const keyStr = `${currentIndent}${getIndicator(indicator)}${[key]}`;
          if (!isObject(val)) {
            return `${keyStr}: ${val}`;
          }
          // разобраться с формированием строк (просмотреть какие кл-зн получаю) и индикаторами!
          return `${keyStr}: ${item(val, depth + 1)}`;
        });
      const y = ['{', ...keys, `${bracketIndent}}`].join('\n');
      //console.log(y);
      return y;
    });
    return result;
  };
  const f = item(collection, 1);
  console.log(f);
  return f;
};

const o1 = {
  key1: 'gj',
  key2: 3,
  key3: {
    nextK1: 2,
    nextK2: {
      has: {
        keg: 1,
        h: 2,
      },
    },
  },
};

const o2 = {
  key: 'gj',
  key2: 2,
  key3: {
    nextK1: 2,
    nextK3: {
      has: {
        keg: 'he',
      },
    },
  },
};
// console.log(getDifferents(o1, o2));
const h = getDifferents(o1, o2);
//console.log(render(h));
render(h);
export default render;
