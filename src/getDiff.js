const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};

const findDifferentsInObj = (object1, object2) => {
  const keys = Object.keys(object1);
  // const differentValue = keys.flatMap((key) => {
  //     if (object2[key] !== object1[key]) {
  //         return { [key]: object1[key] };
  //     }
  //     return [];
  // });
  const differentValue = keys.reduce((acc, key) => {
    if (object2[key] !== object1[key]) {
      acc[key] = object1[key];
      return acc;
    }
    return acc;
  }, {});
  return differentValue;
};

const differentInTwoObj = (differentsFirstObj, differentsSeconsObj) => {
  const differents = {
    onlyInFirstObj: differentsFirstObj,
    onlyInSecondObj: differentsSeconsObj,
  };
  return differents;
};

export const getDifferentFirstObj = (different) => different.onlyInFirstObj;
export const getDifferentSecondObj = (different) => different.onlyInSecondObj;

export const getDifferents = (obj1, obj2) => {
  const firstObjectDiff = findDifferentsInObj(obj1, obj2);
  const secondObjectDiff = findDifferentsInObj(obj2, obj1);
  const differents = differentInTwoObj(firstObjectDiff, secondObjectDiff);
  return differents;
};
