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
