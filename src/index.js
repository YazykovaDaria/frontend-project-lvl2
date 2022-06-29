import { readFileSync } from 'fs';
import path from 'path';
import parser from './parser.js';
import getDifferents from './getDiff.js';
import render from './formatters/index.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), fileName), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const contentFile1 = readFile(filepath1);
  const contentFile2 = readFile(filepath2);
  const obj1 = parser(path.extname(filepath1), contentFile1);
  const obj2 = parser(path.extname(filepath2), contentFile2);
  const differents = getDifferents(obj1, obj2);
  const diff = render(differents, format);
  return diff;
};

export default genDiff;
