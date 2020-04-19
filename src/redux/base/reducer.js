import {
    paginateResources,
    updatePaginatedResourcesFromResource,
} from '../../helpers/paginatedResources';

export const initial_state = {
    created: false,
    destroyed: false,
    current_page: 1,
    error: null,
    fetching_resources: false,
    orders: null,
    paginated_resources: {
        1: [],
    },
    published: false,
    recovered: false,
    regenerated: false,
    resequenced: false,
    resource: null,
    resources: [],
    total: 0,
    unpublished: false,
    updated: false,
    variantsGenerated: false,
    warning: null,
};

const reducer = (actions) => (state = initial_state, action) => {
    switch(action.type) {
        case actions.CHANGE_PAGE_RESOURCES:
            return {
                ...state,
                current_page: action.payload.data.page,
            };
        case actions.CLEAR_METADATA_REPORT: {
            return {
                ...state,
                fetching_resources: false,
                paginated_resources: {1: []},
                resources: [],
            };
        }
        case actions.CLEAR_METADATA_RESOURCES: {
            return {
                ...state,
                created: false,
                destroyed: false,
                error: null,
                warning: null,
            };
        }
        case actions.CLEAR_METADATA_RESOURCE_CREATE:
            return {
                ...state,
                error: null,
                // created: false,
                resource: null,
                warning: null,
            };
        case actions.CLEAR_METADATA_RESOURCE_GENERATE_VARIANTS:
            return {
                ...state,
                error: null,
                variantsGenerated: false,
                warning: null,
            };
        case actions.CLEAR_METADATA_RESOURCE_EDIT:
            return {
                ...state,
                created: false,
                error: null,
                published: false,
                recovered: false,
                resource: null,
                unpublished: false,
                updated: false,
                warning: null,
            };
        case actions.CREATE_RESOURCE_REQUEST: {
            return {
                ...state,
                created: false,
                error: null,
                warning: null,
            };
        }
        case actions.CREATE_RESOURCE_SUCCESS:
            return {
                ...state,
                created: true,
                error: null,
                resource: action.payload.resource,
                warning: null,
            };
        case actions.CREATE_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                created: false,
            };
        case actions.DESTROY_RESOURCE_REQUEST:
            return {
                ...state,
                destroyed: false,
                error: null,
                warning: null,
            };
        case actions.DESTROY_RESOURCE_SUCCESS:
            return {
                ...state,
                destroyed: true,
                error: null,
                // resource: action.payload.resource,
                warning: null,
            };
        case actions.DESTROY_RESOURCE_ERROR:
            return {
                ...state,
                destroyed: false,
                error: action.error,
            };
        case actions.FIND_RESOURCE_REQUEST:
            return {
                ...state,
                error: null,
                warning: null,
            };
        case actions.FIND_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
                warning: null,
            };
        case actions.FIND_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case actions.GENERATE_VARIANTS_RESOURCE_REQUEST: {
            return {
                ...state,
                error: null,
                variantsGenerated: false,
                warning: null,
            };
        }
        case actions.GENERATE_VARIANTS_RESOURCE_SUCCESS: {
            const { resource } = state;
            const { resources } = action.payload;
            return {
                ...state,
                error: null,
                resource: {
                    ...resource,
                    variants: [
                        ...resource.variants,
                        ...resources
                    ],
                },
                variantsGenerated: true,
                warning: null,
            };
        }
        case actions.GENERATE_VARIANTS_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                variantsGenerated: false,
            };
        case actions.GENERATE_VARIANTS_RESOURCE_WARNING:
            return {
                ...state,
                warning: action.warning,
                variantsGenerated: false,
            };
        case actions.GET_ALL_RESOURCES_REQUEST: {
            return {
                ...state,
                error: null,
                fetching_resources: true,
                resources: [],
                warning: null,
            };
        }
        case actions.GET_ALL_RESOURCES_SUCCESS: {
            const { resources } = action.payload;
            return {
                ...state,
                resources,
                error: null,
                fetching_resources: false,
                warning: null,
            };
        }
        case actions.GET_ALL_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
            };
        case actions.GET_ORDER_RESOURCES_REQUEST: {
            return {
                ...state,
                error: null,
                orders: null,
                warning: null,
            };
        }
        case actions.GET_ORDER_RESOURCES_SUCCESS: {
            const { resources } = action.payload;
            return {
                ...state,
                orders: resources,
                error: null,
                warning: null,
            };
        }
        case actions.GET_ORDER_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
            };
        case actions.GET_PAGINATED_RESOURCES_REQUEST: {
            const { data } = action.payload;
            return {
                ...state,
                current_page: data.page,
                error: null,
                fetching_resources: true,
                paginated_resources: {
                    ...state.paginated_resources,
                    [data.page]: []
                },
                total: 0,
                warning: null,
            };
        }
        case actions.GET_PAGINATED_RESOURCES_SUCCESS: {
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                current_page,
                total,
                error: null,
                fetching_resources: false,
                paginated_resources: {
                    ...state.paginated_resources,
                    [current_page]: data,
                },
                warning: null,
            };
        }
        case actions.GET_PAGINATED_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0,
            };
        case actions.PUBLISH_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                published: false,
                warning: null,
            };
        case actions.PUBLISH_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                published: true,
                warning: null,
            };
        }
        case actions.PUBLISH_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                published: false,
            };
        case actions.RECOVER_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                recovered: false,
                warning: null,
            };
        case actions.RECOVER_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                recovered: true,
                warning: null,
            };
        }
        case actions.RECOVER_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                recovered: false,
            };
        case actions.REGENERATE_RESOURCE_REQUEST:
            return {
                ...state,
                error: null,
                regenerated: false,
                warning: null,
            };
        case actions.REGENERATE_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                regenerated: true,
                warning: null,
            };
        }
        case actions.REGENERATE_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                regenerated: false,
            };
        case actions.REGENERATE_THUMBNAILS_REQUEST:
            return {
                ...state,
                error: null,
                regenerated: false,
                warning: null,
            };
        case actions.REGENERATE_THUMBNAILS_SUCCESS: {
            const { resource } = state;
            const { resources } = action.payload;
            return {
                ...state,
                error: null,
                resource: {
                    ...resource,
                    image_thumbnails: [
                        ...resources,
                    ],
                },
                regenerated: true,
                warning: null,
            };
        }
        case actions.REGENERATE_THUMBNAILS_ERROR:
            return {
                ...state,
                error: action.error,
                regenerated: false,
            };
        case actions.SEARCH_RESOURCES_REQUEST: {
            return {
                ...state,
                error: null,
                fetching_resources: true,
                resources: [],
                warning: null,
            };
        }
        case actions.SEARCH_RESOURCES_SUCCESS: {
            const { resources } = action.payload;
            return {
                ...state,
                resources,
                error: null,
                fetching_resources: false,
                warning: null,
            };
        }
        case actions.SEARCH_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
            };
        case actions.SET_PAGINATED_RESOURCES: {
            return {
                ...state,
                error: null,
                paginated_resources: action.payload.data.paginated_resources,
            };
        }
        case actions.SET_RELATIONSHIP_ITEM_RESOURCE: {
            const { resource } = state;
            const { item, relationshipName } = action.payload.data;

            if(!item || !relationshipName) {
                return state;
            }

            if(!resource || !resource[relationshipName] || typeof resource[relationshipName].length === 'undefined') {
                return state;
            }

            // Add item to bottom of array
            resource[relationshipName].push(item);

            return {
                ...state,
                resource: {
                    ...resource,
                    [relationshipName]: [...resource[relationshipName]],
                },
            };
        }
        case actions.SET_RESOURCE: {
            return {
                ...state,
                // error: null,
                resource: action.payload.data.resource,
            };
        }
        case actions.SET_RESOURCES: {
            return {
                ...state,
                // error: null,
                paginated_resources: paginateResources(
                    action.payload.data.resources,
                    action.payload.data.pageSize
                ),
                resources: action.payload.data.resources,
            };
        }
        case actions.SET_SEQUENCE_RESOURCES_REQUEST:
            return {
                ...state,
                error: null,
                resequenced: false,
                warning: null,
            };
        case actions.SET_SEQUENCE_RESOURCES_SUCCESS: {
            const { resources } = action.payload;
            return {
                ...state,
                resources,
                error: null,
                resequenced: true,
                warning: null,
            };
        }
        case actions.SET_SEQUENCE_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                resequenced: false,
            };
        case actions.UNPUBLISH_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                unpublished: false,
                warning: null,
            };
        case actions.UNPUBLISH_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                unpublished: true,
                warning: null,
            };
        }
        case actions.UNPUBLISH_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                unpublished: false,
            };
        case actions.UNSET_RELATIONSHIP_ITEM_RESOURCE: {
            const { resource } = state;
            const { id, relationshipName } = action.payload.data;

            if(!id || !relationshipName) {
                return state;
            }

            if(!resource || !resource[relationshipName] || !resource[relationshipName].length) {
                return state;
            }

            return {
                ...state,
                resource: {
                    ...resource,
                    [relationshipName]: resource[relationshipName].filter(item => item.id !== id),
                },
            };
        }
        case actions.UPDATE_ATTRIBUTES_RESOURCE_REQUEST:
            return {
                ...state,
                error: null,
                updated: false,
            };
        case actions.UPDATE_ATTRIBUTES_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                updated: true,
            };
        }
        case actions.UPDATE_ATTRIBUTES_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                updated: false,
            };
        case actions.UPDATE_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                updated: false,
                warning: null,
            };
        case actions.UPDATE_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                resource,
                error: null,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                updated: true,
                warning: null,
            };
        }
        case actions.UPDATE_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                updated: false,
            };
        default:
            return state;
    }
};

export default reducer;
