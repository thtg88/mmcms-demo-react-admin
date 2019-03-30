import actions from './actions';
import { updatePaginatedResourcesFromResource } from '../../helpers/paginatedResources';

const initial_state = {
    created: false,
    current_page: 1,
    destroyed: false,
    error: null,
    fetching_resources: false,
    resource: null,
    paginated_resources: {
        1: []
    },
    resources: [],
    total: 0,
    updated: false,
};

const reducer = (state = initial_state, action) => {
    switch(action.type) {
        case actions.CHANGE_PAGE_RESOURCES:
            return {
                ...state,
                current_page: action.payload.data.page,
            };
        case actions.CLEAR_METADATA_RESOURCES: {
            const { data } = action.payload;

            return {
                ...state,
                current_page: 1,
                destroyed: false,
                error: null,
                fetching_resources: false,
                paginated_resources: (
                        data.query !== ''
                        && data.query !== null
                        && typeof data.query !== 'undefined'
                    )
                    // If I've searched before,
                    // Clear the paginated resources so on next reload
                    // A re-fetch will be needed
                    ? {
                        1: []
                    }
                    : {
                        ...state.paginated_resources
                    }
            };
        }
        case actions.CLEAR_METADATA_RESOURCE_EDIT:
            return {
                ...state,
                created: false,
                error: null,
                resource: null,
                updated: false,
            };
        case actions.CLEAR_METADATA_RESOURCE_CREATE:
            return {
                ...state,
                error: null,
                // created: false,
                resource: null,
            };
        case actions.CREATE_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
            };
        case actions.CREATE_RESOURCE_SUCCESS:
            return {
                ...state,
                created: true,
                error: null,
                resource: action.payload.resource,
            };
        case actions.CREATE_RESOURCE_ERROR:
            return {
                ...state,
                created: false,
                error: action.error,
            };
        case actions.DESTROY_RESOURCE_REQUEST:
            return {
                ...state,
                destroyed: false,
                error: null,
            };
        case actions.DESTROY_RESOURCE_SUCCESS:
            return {
                ...state,
                destroyed: true,
                error: null,
                // resource: action.payload.resource,
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
            };
        case actions.FIND_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case actions.FIND_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case actions.GET_PAGINATED_RESOURCES_REQUEST: {
            const { data } = action.payload;

            return {
                ...state,
                current_page: data.page,
                error: null,
                fetching_resources: true,
                // If searching, reset all pages
                paginated_resources: (
                        typeof data.q !== 'undefined'
                        && data.q !== ''
                    )
                    ? {
                        1: [],
                    }
                    // Otherwise reset page I'm fetching
                    : {
                        ...state.paginated_resources,
                        [data.page]: [],
                    },
                total: 0,
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
            };
        }
        case actions.GET_PAGINATED_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0,
            };
        case actions.UPDATE_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                updated: false,
            };
        case actions.UPDATE_RESOURCE_SUCCESS: {
            const { resource } = action.payload;

            return {
                ...state,
                error: null,
                updated: true,
                resource: action.payload.resource,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
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
