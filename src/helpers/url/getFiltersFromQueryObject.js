const getFiltersFromQueryObject = (queryObj, emptyFilters) => {
    if(!queryObj) {
        return emptyFilters;
    }

    const uriFilters = [];
    const firstPlaceholder = 'filters[';
    const secondPlaceholder = '][';

    Object.entries(queryObj).forEach(([key, value], idx) => {
        // Filters key should be in the form like
        // filters[0][name]
        // filters[0][operator]
        // filters[0][value]
        if(
            key.indexOf('filters[') === 0
            && key.slice(key.length - 1) === ']'
            && key.indexOf('][') > -1
        ) {
            const trimmedKey = key
                // Remove final ']'
                .slice(0, key.length - 1)
                // Remove leading 'filters['
                .slice(firstPlaceholder.length);
            const filterIdx = parseInt(trimmedKey.slice(0, trimmedKey.indexOf(secondPlaceholder)), 10);
            const filterField = trimmedKey.slice(trimmedKey.indexOf(secondPlaceholder) + secondPlaceholder.length);

            if(!uriFilters[filterIdx]) {
                uriFilters[filterIdx] = {};
            }

            uriFilters[filterIdx][filterField] = !isNaN(value)
                ? parseInt(value, 10)
                : value;

            // console.log(filterIdx, filterField, value);
        }
    });

    const filters = emptyFilters.map((emptyFilter, idx) => {
        const matchingFilters = uriFilters.filter(filter => filter.name === emptyFilter.name);
        if(matchingFilters.length > 0) {
            return {
                ...emptyFilter,
                name: matchingFilters[0].name,
                fieldName: matchingFilters[0].fieldName,
                operator: matchingFilters[0].operator,
                value: matchingFilters[0].value,
            };
        }

        return {...emptyFilter};
    });

    // console.log(filters);

    return filters;
};

export default getFiltersFromQueryObject;
