export const getFormResourceFromValues = (values, schema, attributesToShow = []) => {
    if(!values) {
        return {};
    }

    const resource = Object.entries(values).reduce(
        (result, [key, value]) => {
            // If I'm not showing the attribute,
            // Skip the item (just progress with the result object)
            if(attributesToShow.indexOf(key) === -1) {
                return {
                    ...result
                };
            }

            // Disabled attribute
            let disabled = false;
            if(schema[key] && typeof schema[key].disabled !== 'undefined') {
                disabled = schema[key].disabled;
            } else if(key.length > 3 && key.indexOf('_at') === key.length - 3) {
                disabled = true;
            }

            // Label text
            const label = getSchemaValueFromKeyAndParameter(schema, key, 'label');

            // Empty option text (for select inputs)
            const empty_option = getSchemaValueFromKeyAndParameter(schema, key, 'empty_option');

            // Values array of values and texts (for select inputs)
            const values = getSchemaValueFromKeyAndParameter(schema, key, 'values');

            // Form Feedback to show additional message below form input
            const formText = getSchemaValueFromKeyAndParameter(schema, key, 'formText');

            let data = {
                type: getTypeFromKey(schema, key),
                value: value,
                errors: [],
                rules: getValidationRulesFromKey(schema, key),
                disabled: disabled
            };
            if(typeof label !== 'undefined') {
                data.label = label;
            }
            if(typeof empty_option !== 'undefined') {
                data.empty_option = empty_option;
            }
            if(typeof values !== 'undefined') {
                data.values = values;
            }
            if(typeof formText !== 'undefined') {
                data.formText = formText;
            }

            return {
                ...result,
                [key]: {
                    ...data
                },
            };
        },
        {}
    );

    return resource;
};

export const getSchemaValueFromKeyAndParameter = (schema, key, parameter) => {
    return schema[key] && schema[key][parameter]
        ? schema[key][parameter]
        : undefined;
};

export const getTypeFromKey = (schema, key) => {
    return schema[key] && schema[key].type
        ? schema[key].type
        : 'text';
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

export const setResourceFieldAttributeValue = (schema, field, attribute, value) => {
    return {
        ...schema,
        [field]: {
            ...schema[field],
            [attribute]: value
        }
    };
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
