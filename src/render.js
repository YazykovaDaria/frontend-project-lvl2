import { isObject } from './getDiff.js';

const getIndicator = (indicator) => {
  switch (indicator) {
    case '-*':
      return '- ';
    case '+*':
      return '+ ';
    case '=*':
      return '  ';
    default:
      throw new Error('incorrect indicator');
  }
};

const render = (object) => {
  const item = (obj, depth) => {
    const replacer = ' ';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const keys = Object.keys(obj);
    const res = keys.flatMap((key) => {
      const indicator = key.slice(0, 2);
      console.log(key)
      const clearKey = key.slice(2);

      if (Array.isArray(obj[key])) {
        const str1 = `${currentIndent}${getIndicator('-*')}${clearKey}: ${obj[key][0]}`;
        const str2 = `${currentIndent}${getIndicator('+*')}${clearKey}: ${obj[key][1]}`;
        return [str1, str2];
      } if (isObject(obj[key])) {
        const children = item(obj[key], depth + 1);
        return `${currentIndent}${getIndicator(indicator)}${clearKey}: ${children}`;
      }
      return `${currentIndent}${getIndicator(indicator)}${clearKey}: ${obj[key]}`;
    });
    return ['{', ...res, `${bracketIndent}}`].join('\n');
  };
  const f = item(object, 1);
  console.log(f);
  return f;
};

// const n = {
//   '+*key': 'gj',
//   '-*key1': 'gj',
//   '-+key2': [3, 2],
//   '=*key3': {
//     '=*nextK1': 2,
//     '=*nextK2': {
//       '-+has': [3, 2],
//     },
//   },
// };

// console.log(render(n));
export default render;
