import yaml from 'js-yaml';

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
