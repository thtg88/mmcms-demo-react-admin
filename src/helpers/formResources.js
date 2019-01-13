export const getFormResourceFromValues = (values, schema) => {
    if(!values) {
        return {};
    }

    const resource = Object.entries(values).reduce(
        (result, [key, value]) => {
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
    return schema[key] && schema[key].rules
        ? schema[key].rules
        : undefined;
};

export const getValidationSchemaFromFormResource = (resource) => {
    if(!resource) {
        return {};
    }

    const schema = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
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

    return schema;
};

export const getValuesFromFormResource = (resource) => {
    if(!resource) {
        return {};
    }

    const values = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
            return {
                ...result,
                [name]: parameters.value
            };
        },
        {}
    );

    return values;
};

export const updateFormResourceFromErrors = (resource, errors) => {
    const new_resource = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
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

export const get = (target, field) => {
    const pathArray = splitNested(field);
    let result;

    try {
        result = pathArray.reduce(
            (curr, path) => {
                return curr[path];
            },
            target
        );
    } catch (e) {}

    return result ? result : 'N/A';
};

const splitNested = (str) => {
    return [str]
        .join('.')
        .replace(/\[/g, '.')
        .replace(/\]/g, '')
        .split('.');
};
