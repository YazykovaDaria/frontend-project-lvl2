import _ from 'lodash';

const indicators = {
  deleted: '- ',
  added: '+ ',
  update: '  ',
  identic: '  ',
  interior: '  ',
};

const getSpace = (depth, amountSpace = 4) => {
const replaser = ' ';
const result = replaser.repeat(depth * amountSpace - 2)
return result;
}

const valueStr = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.entries(value)
    .map(([key, val]) => `${getSpace(depth + 1)}  ${key}: ${valueStr(val, depth + 1)}`)
    .join('\n');
  return `{\n${result}\n${getSpace(depth)}  }`;
};

const stylish = (collection) => {
  const item = (coll, depth) => {
    const lines = coll.flatMap((obj) => {
      const { state } = obj;
      const startStr = `${getSpace(depth)}${indicators[state]}${obj.key}: `;
      if (state === 'interior') {
        return `${startStr}{\n${item(obj.children, depth + 1)}\n${getSpace(depth)}  }`;
      } if (state === 'update') {
        return [`${getSpace(depth)}${indicators.deleted}${obj.key}: ${valueStr(obj.firstVal, depth)}`, `${getSpace(depth)}${indicators.added}${obj.key}: ${valueStr(obj.secondVal, depth)}`];
      }
      return `${startStr}${valueStr(obj.value, depth)}`;
    });
    return lines.join('\n');
  };
  const result = `{\n${item(collection, 1)}\n}`
  return result;
};

export default stylish;
