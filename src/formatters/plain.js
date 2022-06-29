const isComplexValue = (value) => typeof value === 'object' && value !== null;

const valueStr = (val) => {
  if (isComplexValue(val)) {
    return '[complex value]';
  }
  return typeof val !== 'string' || val === null ? val : `'${val}'`;
};

const plain = (collection) => {
  const item = (coll, name = '') => {
    const result = coll.filter((obj) => obj.state !== 'identic')
      .flatMap((obj) => {
        const { state } = obj;
        const nextName = `${name}${obj.key}`;
        if (state === 'interior') {
          return item(obj.children, `${nextName}.`);
        }
        switch (state) {
          case 'update':
            return `Property '${nextName}' was updated. From ${valueStr(obj.firstVal)} to ${valueStr(obj.secondVal)}`;
          case 'added':
            return `Property '${nextName}' was added with value: ${valueStr(obj.value)}`;
          case 'deleted':
            return `Property '${nextName}' was removed`;
          default:
            throw new Error('incorrect state');
        }
      });
    return result.join('\n');
  };
  return item(collection);
};

export default plain;
