import getDifferents from '../getDiff.js';

const indicators = {
deleted: '- ',
added: '+ ',
update: '  ',
identic: '  ',
interior: '',
};

//переделать под новую логику дифа!
const render = (collection) => {

  const item = (coll, depth) => {
    const amountSpace = 4;
    const replaser = ' ';
    const getSpace = (deep, spaces = 2) => replaser.repeat((deep * amountSpace) - spaces);
    //((deep * amountSpace - spaces));

    const lines = coll.flatMap((obj) => {
      const { state } = obj;
        const startStr = `${getSpace(depth)}${indicators[state]}${obj.key}: `;
      if (state === 'interior') {
        return `${getSpace(depth)}${obj.key}: ${item(obj.children, depth + 1)}`;
      }
      switch (state) {
        case 'deleted':
            const srt = `${getSpace(depth)}- ${obj.key}: ${obj.value}`
          return srt;
        case 'added':
            const s = `${getSpace(depth)}+ ${obj.key}: ${obj.value}`
          return s;
        case 'update':
          return [`${getSpace(depth)}  ${obj.key}: ${obj.firstVal}`, `${getSpace(depth)}  ${obj.key}: ${obj.secondVal}`];
        case 'identic':
          return `${getSpace(depth)}  ${obj.key}: ${obj.value}`;
        default:
          throw new Error('incorrect state');
      }
    });
    const result = ['{', ...lines, `${getSpace(depth - 1)}}`].join('\n');
    return result;
};
  return item(collection, 2);
};


const a = {
  key: {
    next1: 'hi',
    n: 3,
    next2: {
        n: 3,
    },
  },
};

const b = {
  key: {
    next1: 'h',
    next2: {
        n: 2,
    },
    next3: 'net',
  },
};

const y = getDifferents(a, b);
console.log(render(y));
// const n = 'added'
// console.log(indicators[n]);
