const getFormResourceFromValues = (values) => {
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

export default getFormResourceFromValues;
