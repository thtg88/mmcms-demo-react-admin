const filterSchemaFromAttributes = (schema, attributesSequenceToShow = []) => {
    if(!schema || !attributesSequenceToShow || !attributesSequenceToShow.length) {
        return {};
    }

    return attributesSequenceToShow.reduce((result, attributeName) => {
        return {
            ...result,
            [attributeName]: {...schema[attributeName]},
        }
    }, {});
};

export default filterSchemaFromAttributes
