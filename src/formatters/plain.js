import getDifferents from '../getDiff.js';

const isComplexValue = (value) => typeof value === 'object' && value !== null;

const valueStr = (val) => {
    if (isComplexValue(val)) {
        return '[complex value]';
    }
    return typeof val === 'boolean' || val === 'null' ? val : `'${val}'`;
};

const buildStr = (indicator, name, value1) => {
    // console.log(indicator);
    switch (indicator) {
        case 'onlyFirst':
            return `Property '${name}' was updated. From ${valueStr(value1)} to ***`;
        case 'onlySecond':
            return `Property '${name}' was added with value: ${valueStr(value1)}`;
        case 'notDiff':
            return `Property '${name}' was removed`;
        default:
            return '==';
        // throw new Error('incorrect indicator');
    }
};

const plain = (collection) => {
    const item = (coll, name = '') => {
        //console.log(coll);
        const filter = coll.filter((obj) => obj.indicator !== 'none');
        const result = filter.flatMap((obj) => {
            const { indicator } = obj;
            // console.log(indicator);
            const keys = Object.keys(obj)
                .map((key) => {
                    const nextName = `${name}${key}`;
                    if (key !== 'indicator') {
                        if (Array.isArray(obj[key])) {
                            // && indicator === 'notDiff'
                            return item(obj[key], `${nextName}.`);
                        }
                        // console.log(obj[indicator]);
                        const str = buildStr(indicator, nextName, obj[key]);
                        return str;
                    }
                    return [];
                });
            return keys;
        });
        //console.log(result.join('\n'));
        return result.join('\n');
    };
    return item(collection);
};

const a = {
    key: {
        nextK: 'hi',
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

// const y = getDifferents(a, b);
// console.log(JSON.stringify(y));
// plain(y);
// console.log(plain(y));

export default plain;
