import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToTestFile = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const getCorrectAnswers = (arr) => arr.map((filename) => readFileSync(pathToTestFile(filename), 'utf-8'));

const [stylish, plain, json] = getCorrectAnswers(['stylish.txt', 'plain.txt', 'json.txt']);

test.each(['yaml', 'json'])('diff', (ext) => {
  const path1 = pathToTestFile(`first.${ext}`);
  const path2 = pathToTestFile(`second.${ext}`);
  const testDefaultFormat = genDiff(path1, path2);
  expect(testDefaultFormat).toBe(stylish);
  const testStylish = genDiff(path1, path2, 'stylish');
  expect(testStylish).toBe(stylish);
  const testPlain = genDiff(path1, path2, 'plain');
  expect(testPlain).toBe(plain);
  const testJson = genDiff(path1, path2, 'json');
  expect(testJson).toBe(json);
});
