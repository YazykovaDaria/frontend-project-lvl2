import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {

};

const compareFiles = (file1, file2) => {
    const allKeys = Object.keys({ ...file1, ...file2 });
    const sortKeys = _.sortBy(allKeys);
    //console.log(sort);
    const compare = sortKeys.reduce((result, key) => {
        if (_.has(file1, key) && _.has(file2, key)) {
            if (file1[key] === file2[key]) {
                return result += `\r\n   ${key}: ${file1[key]}`;
            }
            return result += `\r\n - ${key}: ${file1[key]}\r\n + ${key}: ${file2[key]}`;
        } if (!file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
            return result += `\r\n + ${key}: ${file2[key]}`;
        }
        return result += `\r\n - ${key}: ${file1[key]}`;
    }, '{')
    const result = `${compare}\r\n}`;
    console.log(result);
    return result;
}
// const f = {
//     "host": "hexlet.io",
//     "timeout": 50,
//     "proxy": "123.234.53.22",
//     "follow": false
// };

// const j = {
//     "timeout": 20,
//     "verbose": true,
//     "host": "hexlet.io"
// };

//compareFiles(f, j);

export default genDiff;
