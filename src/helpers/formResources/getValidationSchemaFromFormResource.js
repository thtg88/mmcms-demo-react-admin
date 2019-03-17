const getValidationSchemaFromFormResource = (resource) => {
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

export default getValidationSchemaFromFormResource;
