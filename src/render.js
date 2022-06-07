import _ from 'lodash';
import parser from './parser.js';
import { getDifferents, getDifferentFirstObj, getDifferentSecondObj } from './getDiff.js';

const indicators = ['  - ', '  + ', '    '];

const render = (extension, contentFile1, contentFile2) => {
    const obj1 = parser(extension, contentFile1);
    const obj2 = parser(extension, contentFile2);
    const differents = getDifferents(obj1, obj2);
    const obj1Diff = getDifferentFirstObj(differents);
    const obj2Diff = getDifferentSecondObj(differents);
    const obj1Entries = Object.entries(obj1);
    const obj2Entries = Object.entries(obj2);
    const allEntries = obj1Entries.concat(obj2Entries);

    const unigEntries = (entries) => {
        const set = new Set(entries.map(JSON.stringify));
        const uniqArray = Array.from(set).map(JSON.parse);
        return uniqArray;
    };

    const sort = _.sortBy(unigEntries(allEntries));
    const result = sort.reduce((acc, [key, value]) => {
        // const [key, value] = keyValue;
        if (obj1Diff[key] === value) {
            // const resultString = `${indicators[0]}${key}: ${value}\r\n`;
            acc += `\r\n${indicators[0]}${key}: ${value}`;
            return acc;
        } if (obj2Diff[key] === value) {
            // const resultString = `${indicators[1]}${key}: ${value}\r\n`;
            acc += `\r\n${indicators[1]}${key}: ${value}`;
            return acc;
        }
        // console.log(acc[key]);
        acc += `\r\n${indicators[2]}${key}: ${value}`;
        return acc;
        // console.log('y');
    }, '{');
    //const y = `{\r\n${result}}`;
    // const n = [...obj1, ...obj2];
    //console.log(y);
    return `${result}\r\n}`;
};

export default render;
// const a = [['bey', 1], ['de', 'hf'], ['a', 4], ['a', 4]];
// const b = [['a', 4], ['c', 11]];
// console.log(_.union(a, b));
//console.log(_.uniqBy(col));
// const h = 'a';
// const y = 'n';
// const n = { a: 7, c: 'n' };
// console.log(_.has(n, y));
