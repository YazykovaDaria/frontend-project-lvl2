import _ from 'lodash';

const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

const getDifferents = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1).concat(Object.keys(obj2)));
  const sortKeys = allKeys.sort();

  const differents = sortKeys.flatMap((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, state: 'deleted', value: obj1[key] };
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, state: 'added', value: obj2[key] };
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, children: getDifferents(obj1[key], obj2[key]), state: 'interior' };
    } if (obj1[key] !== obj2[key]) {
      return {
        key, state: 'update', firstVal: obj1[key], secondVal: obj2[key],
      };
    }
    return { key, value: obj1[key], state: 'identic' };
  });
  return differents;
};

export default getDifferents;
