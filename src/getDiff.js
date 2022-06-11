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
      [keyIndicator]: { Obj1Diff: obj1[key], Obj2Diff: obj2[key] },
    };
    // console.log(diff);
    return Object.assign(acc, diff);
  }, {});
  return differents;
};

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

// const findDifferentsInObj = (object1, object2) => {
//   const keys = Object.keys(object1);
//   const differentValue = keys.reduce((acc, key) => {
//     if (object2[key] !== object1[key]) {
//       acc[key] = object1[key];
//       return acc;
//     }
//     return acc;
//   }, {});
//   return differentValue;
// };

// const differentInTwoObj = (differentsFirstObj, differentsSeconsObj) => {
//   const differents = {
//     onlyInFirstObj: differentsFirstObj,
//     onlyInSecondObj: differentsSeconsObj,
//   };
//   return differents;
// };

// export const getDifferentFirstObj = (different) => different.onlyInFirstObj;
// export const getDifferentSecondObj = (different) => different.onlyInSecondObj;

// export const getDifferents = (obj1, obj2) => {
//   const firstObjectDiff = findDifferentsInObj(obj1, obj2);
//   const secondObjectDiff = findDifferentsInObj(obj2, obj1);
//   const differents = differentInTwoObj(firstObjectDiff, secondObjectDiff);
//   return differents;
// };
