import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToTestFile = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const getCorrectAnswers = (arr) => arr.map((filename) => readFileSync(pathToTestFile(filename), 'utf-8'));

const correctAnswers = getCorrectAnswers(['stylish.txt', 'plain.txt', 'json.txt']);

test.each(['yaml', 'json'])('diff', (ext) => {
  const path1 = pathToTestFile(`first.${ext}`);
  const path2 = pathToTestFile(`second.${ext}`);
  const testStylish = genDiff(path1, path2, 'stylish');
  expect(testStylish).toBe(correctAnswers[0]);
  const testPlain = genDiff(path1, path2, 'plain');
  expect(testPlain).toBe(correctAnswers[1]);
  const testJson = genDiff(path1, path2, 'json');
  expect(testJson).toBe(correctAnswers[2]);
});
