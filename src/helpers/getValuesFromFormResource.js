const getValuesFromFormResource = (resource) => {
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

    console.log(values);

    return values;
};

export default getValuesFromFormResource;
