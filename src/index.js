import { readFileSync } from 'fs';
import path from 'path';
import render from './render.js';
import { getDifferents } from './getDiff.js';
import parser from './parser.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), fileName), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const contentFile1 = readFile(filepath1);
  const contentFile2 = readFile(filepath2);
  const obj1 = parser(filepath1.slice(-4), contentFile1);
  const obj2 = parser(filepath2.slice(-4), contentFile2);
  const differents = getDifferents(obj1, obj2);
  const diff = render(differents);
  return diff;
};

export default genDiff;
