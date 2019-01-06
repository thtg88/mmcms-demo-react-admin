export const getFormResourceFromValues = (values, schema) => {
    if(
        typeof values === 'undefined'
        || values === null
    ) {
        return {};
    }

    const resource = Object.entries(values).reduce(
        (result, [key, value]) => {
            // console.log(result);

            return {
                ...result,
                [key]: {
                    type: 'text',
                    value: value,
                    errors: [],
                    rules: getValidationRulesFromKey(schema, key),
                    disabled: key.length > 3 && key.indexOf('_at') === key.length -3 ? true : false
                }
            };
        },
        {}
    );

    return resource;
};

export const getValidationRulesFromKey = (schema, key) => {
    // console.log(schema, key, schema[key]);
    return schema[key] && schema[key].rules ? schema[key].rules : undefined;
};

export const getValidationSchemaFromFormResource = (resource) => {
    if(!resource) {
        return {};
    }

    const schema = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
            // console.log(result);

            if(parameters.rules) {
                return {
                    ...result,
                    [name]: parameters.rules
                };
            }

            // If no rules set,
            // avoid setting rules
            return {
                ...result
            };
        },
        {}
    );

    // console.log(schema);

    return schema;
};

export const getValuesFromFormResource = (resource) => {
    if(
        typeof resource === 'undefined'
        || resource === null
    ) {
        return {};
    }

    const values = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
            // console.log(result);

            return {
                ...result,
                [name]: parameters.value
            };
        },
        {}
    );

    // console.log(values);

    return values;
};

export const updateFormResourceFromErrors = (resource, errors) => {
    const new_resource = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
            // console.log(result, name, parameters);

            return {
                ...result,
                [name]: {
                    ...parameters,
                    errors: errors.inner.filter((error) => {
                            return name === error.path;
                        })
                        .map((error) => {
                            return error.message;
                        })
                }
            };
        },
        {}
    );

    return new_resource;
};
