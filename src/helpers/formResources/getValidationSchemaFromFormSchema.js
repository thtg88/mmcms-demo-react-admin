const getValidationSchemaFromFormSchema = schema => {
    if(!schema) {
        return {};
    }

    const validationSchema = Object.entries(schema).reduce(
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

    return validationSchema;
};

export default getValidationSchemaFromFormSchema;
