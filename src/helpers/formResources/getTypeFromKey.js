const getTypeFromKey = (schema, key) => {
    return schema && schema[key] && schema[key].type
        ? schema[key].type
        : 'text';
};

export default getTypeFromKey;
