const getSchemaValueFromKeyAndParameter = (schema, key, parameter) => {
    return schema[key] && schema[key][parameter]
        ? schema[key][parameter]
        : undefined;
};

export default getSchemaValueFromKeyAndParameter;
