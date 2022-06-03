const findDifferentsInObj = (object1, object2) => {
    const keys = Object.keys(object1);
    const differentValue = keys.flatMap((key) => {
        if (object2[key] !== object1[key]) {
            return { [key]: object1[key] };
        }
        return [];
    });
    return differentValue;
};

const differentInTwoObj = (differentsFirstObj, differentsSeconsObj) => {
    const differents = {
        onlyInFirstObj: differentsFirstObj,
        onlyInSecondObj: differentsSeconsObj,
    };
    return differents;
};

export const getDifferentFirstFile = (different) => different.onlyInFirstObj;
export const getDifferentSecondFile = (different) => different.onlyInSecondObj;

const getDifferents = (file1, file2) => {
    const obj1 = JSON.parse(file1);
    const obj2 = JSON.parse(file2);
    const differents = differentInTwoObj(findDifferentsInObj(obj1, obj2), findDifferentsInObj(obj2, obj1));
    return differents;
};

export default getDifferents;
