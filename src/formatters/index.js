import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const render = (collection, format) => {
  switch (format) {
    case 'stylish':
      return stylish(collection);
    case 'plain':
      return plain(collection);
      case 'json':
        return json(collection);
    default:
      throw new Error('incorrect format');
  }
};

export default render;
