import getDifferents from '../getDiff.js';

const isComplexValue = (value) => typeof value === 'object' && value !== null;

const valueStr = (val) => {
    if (isComplexValue(val)) {
        return '[complex value]';
    }
    return typeof val === 'boolean' || val === 'null' ? val : `'${val}'`;
};

const buildStr = (diff, name) => {
    const { state } = diff;
    switch (state) {
        case 'update':
            return `Property '${name}' was updated. From ${valueStr(diff.firstVal)} to ${valueStr(diff.secondVal)}`;
        case 'added':
            return `Property '${name}' was added with value: ${valueStr(diff.value)}`;
        case 'deleted':
            return `Property '${name}' was removed`;
        default:
            throw new Error('incorrect indicator');
    }
};

const plain = (collection) => {
    const item = (coll, name = '') => {
        // console.log(coll);
        const result = coll.filter((obj) => obj.state !== 'identic')
            .flatMap((obj) => {
                //console.log(obj);
                const { state } = obj;
                const nextName = `${name}${obj.key}`;
                if (state === 'interior') {
                    return item(obj.children, `${nextName}.`);
                }
                return buildStr(obj, nextName);
            });
        // console.log(result.join('\n'));
        return result.join('\n');
    };
    return item(collection);
};

//const nextName = `${name}${key}`;
//return item(obj[key], `${nextName}.`);
const a = {
    key: {
        next1: 'h',
        next2: {
            n: 3,
        },
    },
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

//const y = getDifferents(a, b);
// console.log(JSON.stringify(y));
// plain(y);
//console.log(plain(y));

export default plain;
