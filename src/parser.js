import yaml from 'js-yaml';
import { readFileSync } from 'fs';

console.log(yaml.load(readFileSync('./__tests__/__fixtures__/file1.yaml', 'utf8')));
const parser = (format, file) => {

}

export default parser;
