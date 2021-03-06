export const getResourceFromPaginatedResourcesAndId = (resources, id) => {
    if(
        resources === null
        || typeof resources === 'undefined'
        || (Object.keys(resources).length === 0 && resources.constructor === Object)
    ) {
        return null;
    }

    let resource = null;
    Object.entries(resources).forEach(([page, paginated_resources]) => {
        const resource_search = paginated_resources.find(resource => resource.id === parseInt(id, 10));

        if(resource_search !== null) {
            resource = resource_search;
        }
    });

    return resource;
};

/**
 * Replaces the updated resource in the paginated set of resources.
 */
export const updatePaginatedResourcesFromResource = (paginated_resources, new_resource) => {

    // Create new object
    let new_resources = {};

    // We skip the update if either of the paginated resources is not defined
    // Which means resources have not been fetched yet
    if(paginated_resources) {
        Object.entries(paginated_resources).forEach(([page, page_resources]) => {
            new_resources[page] = page_resources.map((resource, idx) => {
                if(resource.id === new_resource.id) {
                    return {
                        ...new_resource
                    };
                }

                return resource;
            });
        });
    }

    return new_resources;
};

/**
 * Paginate a given array of resources,
 * into an object with the page number as key,
 * and an array of pageSize resources as a value.
 */
export const paginateResources = (resources, pageSize) => {
    let page = 1;

    if(resources.length === 0) {
        return {
            [page]: []
        };
    }

    const paginatedResources = resources.reduce(
        (
            result,
            resource
        ) => {
            if(result[page]) {
                if(result[page].length >= pageSize) {
                    page++;
                }
            }

            if(!result[page]){
                result[page] = [];
            }

            return {
                ...result,
                [page]: [
                    ...result[page],
                    resource,
                ],
            };
        },
        {}
    );

    return paginatedResources;
};

export const getSortingOptionFromSortNameAndDirection = (
    options,
    name,
    direction,
    defaultOption
) => {
    if(
        !name
        || !direction
        || !options
        || !options.length
    ) {
        if(!defaultOption) {
            return null;
        }

        return {...defaultOption};
    }

    const selectedOptions = options.filter(sortingOption => {
        return !!(
            sortingOption
            && name === sortingOption.name
            && direction === sortingOption.direction
        );
    });

    return selectedOptions.length > 0
        ? {...selectedOptions[0]}
        : {...defaultOption};
};
