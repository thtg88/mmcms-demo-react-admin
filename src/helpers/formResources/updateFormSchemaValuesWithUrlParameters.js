const updateFormSchemaValuesWithUrlParameters = (formSchema, urlParams) => {
    Object.entries(urlParams).forEach(([name, value], idx) => {
        if(formSchema[name]) {
            formSchema[name].value = value;
        }
    });

    return formSchema;
};

export default updateFormSchemaValuesWithUrlParameters;
