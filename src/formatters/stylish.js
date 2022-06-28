import _ from 'lodash';

const indicators = {
  deleted: '- ',
  added: '+ ',
  update: '  ',
  identic: '  ',
  interior: '  ',
};

// const getTab = (currentDepth, multiplier = 4) => {
//   const space = ' ';
//   const result = space.repeat(currentDepth * multiplier - 2);
//   return result;
// };
// const tab = getTab(depth, 4);
// const tabClose = getTab(depth - 1, 4);


const getSpace = (depth, amountSpace = 4) => {
const replaser = ' ';
  const d = depth * amountSpace - 2;
  console.log(depth);
  const result = replaser.repeat(d)
  return result
}

const valueStr = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.entries(value)
    .map(([key, val]) => `${getSpace(deep + 1)}  ${key}: ${valueStr(val, deep + 1)}`)
    .join('\n');
  return `{\n${result}\n${getSpace(deep)}  }`;
};
// ёбаные пробелы!!!

const stylish = (collection) => {
  const item = (coll, depth) => {

    const lines = coll.flatMap((obj) => {
      const { state } = obj;
      //console.log(state, obj);
      const startStr = `${getSpace(depth)}${indicators[state]}${obj.key}: `;
      if (state === 'interior') {
        return `${startStr}${item(obj.children, depth + 1)}`;
      } if (state === 'update') {
        return [`${getSpace(depth)}${indicators.deleted}${obj.key}: ${valueStr(obj.firstVal, depth)}`, `${getSpace(depth)}${indicators.added}${obj.key}: ${valueStr(obj.secondVal, depth)}`];
      }
      return `${startStr}${valueStr(obj.value, depth)}`;
    });
    //const y = depth === 1 ? 2 : 4;
    const result = ['{', ...lines, `${getSpace(depth)}}`].join('\n');
    //depth > 1 ? depth - 1 : depth
    return result;
  };
  const result = `{\n${item(collection, 1)}\n}`
  return result;
};

export default stylish;
