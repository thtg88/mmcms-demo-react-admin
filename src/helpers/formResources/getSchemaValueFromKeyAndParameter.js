const getSchemaValueFromKeyAndParameter = (schema, key, parameter) => {
    return schema && schema[key] && schema[key][parameter]
        ? schema[key][parameter]
        : undefined;
};

export default getSchemaValueFromKeyAndParameter;
