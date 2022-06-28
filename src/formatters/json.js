
const json = (collection) => {
const result = collection.map((obj) => {
    return JSON.stringify(obj, null, 2);
})
return result.join('\n');
}

export default json;
