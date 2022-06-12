import _ from 'lodash';

export const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

export const getDifferents = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1).concat(Object.keys(obj2)));
  const sortKeys = allKeys.sort();
  const differents = sortKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const keyIndicator = `-*${[key]}`;
      const diff = { [keyIndicator]: obj1[key] };
      return Object.assign(acc, diff);
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      const keyIndicator = `+*${[key]}`;
      const diff = { [keyIndicator]: obj2[key] };
      return Object.assign(acc, diff);
    } if (obj1[key] === obj2[key]) {
      const keyIndicator = `=*${[key]}`;
      const diff = { [keyIndicator]: obj1[key] };
      return Object.assign(acc, diff);
    } if (isObject(obj1[key]) && isObject(obj2[key])) {
      const keyIndicator = `=*${[key]}`;
      const diff = { [keyIndicator]: getDifferents(obj1[key], obj2[key]) };
      return Object.assign(acc, diff);
    }
    const keyIndicator = `-+${[key]}`;
    const diff = {
      [keyIndicator]: [obj1[key], obj2[key]],
    };
    // console.log(diff);
    return Object.assign(acc, diff);
  }, {});
  return differents;
};
// key: { не ставится индикатор на такой вариант
//   key:val,
// }

// const o1 = {
//   key1: 'gj',
//   key2: 3,
//   key3: {
//     nextK1: 2,
//     nextK2: {
//       has: 'hey',
//     },
//   },
// };

// const o2 = {
//   key: 'gj',
//   key2: 2,
//   key3: {
//     nextK1: 2,
//     nextK2: {
//       has: 'he',
//     },
//   },
// };
//console.log(getDifferents(o1, o2));
// getDifferents(o1, o2);
