const getValuesFromFormSchema = (formSchema) => {
    if(
        typeof formSchema === 'undefined'
        || formSchema === null
    ) {
        return {};
    }

    const values = Object.entries(formSchema).reduce(
        (result, [name, parameters]) => {
            if(parameters.disabled === true) {
                return result;
            }

            // A subtle bug in Chrome time field, returns the value of the time input
            // without seconds, if seconds are 0, e.g. 08:15 instead of 08:15:00,
            // which causes a validation error with our PHP Laravel API.
            // This hack appends ":00" at the end of the string
            // if it contains only one colon ":" character.
            const newValue = (
                parameters.type === 'time'
                && parameters.value
                && parameters.value.length
                && (parameters.value.match(/:/g) || []).length === 1
            )
                ? parameters.value+':00'
                : parameters.value;

            return {
                ...result,
                [name]: newValue,
            };
        },
        {}
    );

    return values;
};

export default getValuesFromFormSchema;
