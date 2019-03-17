const updateFormResourceFromErrors = (resource, errors) => {
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

export default updateFormResourceFromErrors;
