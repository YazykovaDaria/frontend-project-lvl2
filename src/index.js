import { readFileSync } from 'fs';
import path from 'path';
import render from './render.js';
// import getDifferents from './getDiff.js';
// import parser from './parser.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), fileName), 'utf-8');

// const compareFiles = (file1, file2) => {
//   const parse1 = JSON.parse(file1);
//   const parse2 = JSON.parse(file2);
//   const allKeys = Object.keys({ ...parse1, ...parse2 });
//   // console.log(allKeys);
//   const sortKeys = _.sortBy(allKeys);
//   // console.log(sort);
//   const compare = sortKeys.reduce((result, key) => {
//     if (_.has(parse1, key) && _.has(parse2, key)) {
//       if (parse1[key] === parse2[key]) {
//         return result += `\r\n   ${key}: ${parse1[key]}`;
//       }
//       return result += `\r\n - ${key}: ${parse1[key]}\r\n + ${key}: ${parse2[key]}`;
//     } if (!parse1.hasOwnProperty(key) && parse2.hasOwnProperty(key)) {
//       return result += `\r\n + ${key}: ${parse2[key]}`;
//     }
//     return result += `\r\n - ${key}: ${parse1[key]}`;
//   }, '{');
//   const result = `${compare}\r\n}`;
//   // console.log(result);
//   return result;
// };

const genDiff = (filepath1, filepath2) => {
  const contentFile1 = readFile(filepath1);
  const contentFile2 = readFile(filepath2);
  const fileExtension = filepath1.slice(-4);
  const result = render(fileExtension, contentFile1, contentFile2);
  return result;
  //const differents = parser(contentFile1, contentFile2);
  // console.log(contentFile1);
  //const compare = compareFiles(contentFile1, contentFile2);
  //return compare;
};

export default genDiff;
