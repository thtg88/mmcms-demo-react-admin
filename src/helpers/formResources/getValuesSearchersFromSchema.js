const getValuesSearchersFromSchema = (schema) => {
    if(typeof schema !== 'object') {
        return [];
    }
    
    return Object.entries(schema)
        .filter(([name, params], idx) => typeof params.valuesSearcher !== 'undefined' || typeof params.valuesSearchers !== 'undefined')
        .reduce(
            (result, [name, params]) => {
                if(typeof params.valuesSearchers !== 'undefined') {
                    return [
                        ...result,
                        ...params.valuesSearchers.map(tempSearcher => ({...tempSearcher, name: name})),
                        {
                            ...params.valuesSearcher,
                            name: name,
                        },
                    ];
                }

                return [
                    ...result,
                    {
                        ...params.valuesSearcher,
                        name: name,
                    },
                ];
            },
            []
        );
};

export default getValuesSearchersFromSchema;
