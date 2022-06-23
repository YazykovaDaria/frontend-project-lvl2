import yaml from 'js-yaml';
//import { readFileSync } from 'fs';


const parser = (extname, file) => {
  console.log(extname);
  if (extname === '.json') {
    return JSON.parse(file);
  } if (extname === '.yaml' || extname === '.yml') {
    return yaml.load(file);
  }
  throw new Error('incorrect extname');
};

export default parser;

// const y = readFileSync('./__tests__/__fixtures__/test1File2.json', 'utf8');
// const d = JSON.parse(y);
// const n = yaml.dump(d);
// console.log(n);
