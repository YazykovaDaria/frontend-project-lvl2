import yaml from 'js-yaml';
// import { readFileSync } from 'fs';

// console.log(yaml.load(readFileSync('./__tests__/__fixtures__/file1.yaml', 'utf8')));

const parser = (format, file) => {
  if (format === 'json') {
    return JSON.parse(file);
  } if (format === 'yaml' || format === '.yml') {
    return yaml.load(file);
  }
  throw new Error('incorrect file extension');
};

export default parser;
