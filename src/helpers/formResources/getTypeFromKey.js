const getTypeFromKey = (schema, key) => {
    return schema[key] && schema[key].type
        ? schema[key].type
        : 'text';
};

export default getTypeFromKey;
