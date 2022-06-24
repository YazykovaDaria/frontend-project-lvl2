import getDifferents from '../getDiff.js';

const indicators = {
  deleted: '- ',
  added: '+ ',
  update: '  ',
  identic: '  ',
  interior: '',
};

const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

const amountSpace = 4;
const replaser = ' ';
const getSpace = (deep, spaces = 2) => replaser.repeat(deep * amountSpace - spaces);
// ёбаные пробелы!!!

const stylish = (collection) => {
  const item = (coll, depth) => {
    //console.log(coll);

    const valueStr = (value) => {
      if (!isObject(value)) {
        return value;
      }
      const result = Object.entries(value)
        .map(([key, val]) => `${getSpace(depth)}  ${key}: ${valueStr(val, depth + 1)}`)
        .join('\n');
      return `{\n${result}\n${getSpace(depth - 1)}  }`;
    };

    const lines = coll.flatMap((obj) => {
      const { state } = obj;
      console.log(state, obj);
      const startStr = `${getSpace(depth)}${indicators[state]}${obj.key}: `;
      if (state === 'interior') {
        return `${startStr}${item(obj.children, depth + 1)}`;
      } if (state === 'update') {
        return [`${startStr}${valueStr(obj.firstVal)}`, `${startStr}${valueStr(obj.secondVal)}`];
      }
      return `${startStr}${valueStr(obj.value)}`;
    });
    const result = ['{', ...lines, `${getSpace(depth - 1)}}`].join('\n');
    //console.log(result);
    return result;
  };
  return item(collection, 2);
};

export default stylish;
const a = {
  key1: {
    next1: 'hi',
    // n: 3,
    next11: {
      n: 3,
    },
  },
};

const b = {
  key2: {
    next2: 'h',
    next22: {
      n: 2,
    },
    next3: 'net',
  },
};
const m = [
  { key: 'follow', state: 'added', value: false },
  { key: 'setting1', value: 'Value 1', state: 'identic' },
  { key: 'setting2', state: 'deleted', value: 200 },
  { key: 'setting3', state: 'update', firstVal: true, secondVal: null },
  { key: 'setting4', state: 'added', value: 'blah blah' },
  { key: 'setting5', state: 'added', value: { key5: 'value5' } },
]
// const y = getDifferents(a, b);
console.log(stylish(m));
// console.log(y);
