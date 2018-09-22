const getResourceFromResourcesAndId = (resources, id) => {
    if(
        resources === null
        || typeof resources === 'undefined'
        || Object.keys(resources).length === 0 && resources.constructor === Object
    ) {
        return null;
    }

    let resource = null;
    Object.entries(resources).forEach(([page, paginated_resources]) => {
        const resource_search = paginated_resources.find(resource => resource.id === parseInt(id, 10));

        // console.log(resource_search);

        if(resource_search !== null) {
            resource = resource_search;
            return false;
        }
    });

    return resource;
};

export default getResourceFromResourcesAndId;
