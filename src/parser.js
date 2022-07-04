import yaml from 'js-yaml';

const parser = (extname, file) => {
  switch (extname) {
    case 'json':
      return JSON.parse(file);
    case 'yaml' || 'yml':
      return yaml.load(file);
    default:
      throw new Error(`incorrect extname "${extname}"`);
  }
};

export default parser;
