import getDifferents from '../getDiff.js';

const isComplexValue = (value) => typeof value === 'object' && value !== null;

const buildStr = (indicator, key, value) => {
    const valueStr = isComplexValue(value) ? '[complex value]' : value;
    switch (indicator) {
        case 'onlyFirst':
            return `Property ${key} was removed`;
        case 'onlySecond':
            return `Property ${key} was added with value: ${valueStr}`;
        case 'notDiff':
            return '*';
        case 'none':
            return '** ';
        default:
            return '==';
        // throw new Error('incorrect indicator');
    }
};

const plain = (collection) => {
    const filter = collection.filter((obj) => obj.indicator !== 'none');
    const result = filter.map((obj) => {
        const keys = Object.keys(obj);
        const [key, indicator] = keys;
        // console.log(keys);
        const str = buildStr(obj[indicator], key, obj[key]);
        return str;
    });
    //console.log(result);
    return result.join('\n');
};

const a = {
    key: {
        nextK: 'hi',
        next2: {
            n: 3,
        }
    }
};

const b = {
    key: {
        next1: 'hi',
        next2: {
            n: 2,
        },
        next3: 'net',
    },
};

const y = getDifferents(a, b);
console.log(JSON.stringify(y));
//plain(y);
//console.log(plain(y));
