import _ from 'lodash';

export const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

const buildDiff = (key, value, marker = 'none') => {
  if (!isObject(value)) {
    return { [key]: value, indicator: marker };
  }
  const result = Object.keys(value)
    .map((currentKey) => (buildDiff(currentKey, value[currentKey])));
  //что с индикатором?
  return { [key]: result, indicator: marker };
};

export const getDifferents = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1).concat(Object.keys(obj2)));
  const sortKeys = allKeys.sort();

  const differents = sortKeys.flatMap((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return buildDiff(key, obj1[key], 'onlyFirst');
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return buildDiff(key, obj2[key], 'onlySecond');
    } if (obj1[key] === obj2[key]) {
      return buildDiff(key, obj1[key], 'notDiff');
    } if (isObject(obj1[key]) && isObject(obj2[key])) {
      return buildDiff(key, getDifferents(obj1[key], obj2[key]), 'notDiff');
    }
    return [buildDiff(key, obj1[key], 'onlyFirst'), buildDiff(key, obj2[key], 'onlySecond')];
  });
  return differents;
};

// console.log(buildDiff('ni', 1, 'first'));

// key: { не ставится индикатор на такой вариант
//   key:val,
// }

// const o1 = {
//   key1: 'gj',
//   key2: 3,
//   key3: {
//     nextK1: 2,
//     nextK2: {
//       has: {
//         keg: 1,
//         h: 2,
//       },
//     },
//   },
// };

// const o2 = {
//   key: 'gj',
//   key2: 2,
//   key3: {
//     nextK1: 2,
//     nextK3: {
//       has: {
//         keg: 'he',
//       },
//     },
//   },
// };
// console.log(getDifferents(o1, o2));
// getDifferents(o1, o2);
// const m = _.merge(o1, o2);
// console.log(_.sortBy(m));
