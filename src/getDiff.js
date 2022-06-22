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
      return { key, indicator: 'remove', value: obj1[key] };
      //buildDiff(key, obj1[key], 'onlyFirst');
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, indicator: 'add', value: obj2[key] }
      //buildDiff(key, obj2[key], 'onlySecond');
    }
    // if (obj1[key] === obj2[key]) {
    //   return buildDiff(key, obj1[key], 'notDiff');
    // }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, children: getDifferents(obj1[key], obj2[key]), indicator: 'inside' };
      //buildDiff(key, getDifferents(obj1[key], obj2[key]), 'notDiff');
    } if (obj1[key] !== obj2[key]) {
      return { key, indicator: 'update', firstVal: obj1[key], secondVal: obj2[key] };
      //[buildDiff(key, obj1[key], 'onlyFirst'), buildDiff(key, obj2[key], 'onlySecond')];
    }
    return { key, value: obj1[key], indicator: 'identic' };
  });
  return differents;
};

export default getDifferents;
