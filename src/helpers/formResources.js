export const getFormResourceFromValues = (values) => {
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
                    value: value
                }
            };
        },
        {}
    );

    return resource;
};

export const getValidationSchemaFromFormResource = (resource) => {
    if(!resource) {
        return {};
    }

    const schema = Object.entries(resource).reduce(
        (result, [name, parameters]) => {
            // console.log(result);

            return {
                ...result,
                [name]: parameters.rules
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
                }
            };
        },
        {}
    );

    return new_resource;
};
