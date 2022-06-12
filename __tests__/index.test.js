import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToTestFile = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const testFileNames = ['test1File1.json', 'test1File2.json'];

const testCorrectAnswerFileName = ['test1Answer'];

test('gendiff', () => {
  const file1 = pathToTestFile(testFileNames[0]);
  const file2 = pathToTestFile(testFileNames[1]);
  const correctAnswer = readFileSync(pathToTestFile(testCorrectAnswerFileName[0]), 'utf-8');

  expect(genDiff(file1, file2)).toBe(correctAnswer);
});
