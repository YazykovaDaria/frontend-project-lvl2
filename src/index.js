import { readFileSync } from 'fs';
import path from 'path';
//import render from './render.js';
import parser from './parser.js';
import getDifferents from './getDiff.js';
import plain from './formatters/plain.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), fileName), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const contentFile1 = readFile(filepath1);
  const contentFile2 = readFile(filepath2);
  const obj1 = parser(path.extname(filepath1), contentFile1);
  const obj2 = parser(path.extname(filepath2), contentFile2);
  const differents = getDifferents(obj1, obj2);
  const diff = plain(differents);
  return diff;
};

export default genDiff;
