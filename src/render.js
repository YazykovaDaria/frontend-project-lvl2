//import { isObject, getDifferents } from './getDiff.js';
// разобраться с кол-м пробелов и выдачей индикаторов
const getIndicator = (indicator) => {
  switch (indicator) {
    case 'onlyFirst':
      return '- ';
    case 'onlySecond':
      return '+ ';
    case ('notDiff' || 'none'):
      return '  ';
    default:
      return '*';
    // throw new Error('incorrect indicator');
  }
};

const render = (collection) => {
  const item = (value, depth) => {
    const replacer = ' ';
    const spacesCount = 3;
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const result = value.flatMap((obj) => {
      const { indicator } = obj;
      // console.log(indicator);
      const keys = Object.keys(obj)
        .flatMap((key) => {
          if (key !== 'indicator') {
            // console.log(obj[key]);
            const keyStr = `${currentIndent}${getIndicator(indicator)}${[key]}`;
            if (Array.isArray(obj[key])) {
              return `${keyStr}: ${item(obj[key], depth + 1)}`;
            }
            // это работает подправить перенос и скобки
            // if (isObject(obj[key])) {
            //   const str = Object.entries(obj[key])
            //     .map(([currentKey, currentValue]) => `${currentKey}: ${currentValue}`);
            //   return `${keyStr}: ${str}`;
            // }
            return `${keyStr}: ${obj[key]}`;
            // console.log(obj[key])
          }
          return [];
        });

      // console.log(y);
      return keys;
    });
    const y = ['{', ...result, `${bracketIndent}}`].join('\n');
    return y;
  };
  const f = item(collection, 1);
  //console.log(f);
  return f;
};

const o1 = {
  key1: 'gj',
  key2: 3,
  key3: {
    nextK1: 2,
    nextK2: {
      // вот эта вложенность не прокатывает, у меня тут объект без индикаторов, как распаковать?
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
//const h = getDifferents(o1, o2);
// console.log(h);
//render(h);
export default render;
