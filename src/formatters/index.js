import plain from './plain.js';
import stylish from './stylish.js';

const render = (collection, format) => {
    switch (format) {
        case 'stylish':
            return stylish(collection);
            case 'plain':
            return plain(collection);
            default:
                return 'uncorrect format';
    }
};

export default render;
