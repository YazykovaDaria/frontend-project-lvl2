import _ from 'lodash';

const isObject = (value) => {
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
  return { [key]: result, indicator: marker };
};

const getDifferents = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1).concat(Object.keys(obj2)));
  const sortKeys = allKeys.sort();

  const differents = sortKeys.flatMap((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, state: 'deleted', value: obj1[key] };
      //buildDiff(key, obj1[key], 'onlyFirst');
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, state: 'added', value: obj2[key] }
      //buildDiff(key, obj2[key], 'onlySecond');
    }
    // if (obj1[key] === obj2[key]) {
    //   return buildDiff(key, obj1[key], 'notDiff');
    // }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, children: getDifferents(obj1[key], obj2[key]), state: 'interior' };
      //buildDiff(key, getDifferents(obj1[key], obj2[key]), 'notDiff');
    } if (obj1[key] !== obj2[key]) {
      return { key, state: 'update', firstVal: obj1[key], secondVal: obj2[key] };
      //[buildDiff(key, obj1[key], 'onlyFirst'), buildDiff(key, obj2[key], 'onlySecond')];
    }
    return { key, value: obj1[key], state: 'identic' };
  });
  return differents;
};

export default getDifferents;
