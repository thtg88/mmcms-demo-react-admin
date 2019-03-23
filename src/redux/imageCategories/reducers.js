import actions from './actions';
import { updatePaginatedResourcesFromResource } from '../../helpers/paginatedResources';

const initial_state = {
    created: false,
    destroyed: false,
    current_page: 1,
    error: null,
    fetching_resources: false,
    paginated_resources: {
        1: [],
    },
    recovered: false,
    resource: null,
    resources: [],
    total: 0,
    updated: false
};

const reducer = (state = initial_state, action) => {
    // console.log('action dispatched', action);

    switch(action.type) {
        case actions.CHANGE_PAGE_RESOURCES:
            return {
                ...state,
                current_page: action.payload.data.page,
            };
        case actions.CLEAR_METADATA_RESOURCES: {
            return {
                ...state,
                created: false,
                destroyed: false,
                error: null,
            };
        }
        case actions.CLEAR_METADATA_RESOURCE_EDIT:
            return {
                ...state,
                created: false,
                error: null,
                recovered: false,
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
        case actions.CREATE_RESOURCE_REQUEST: {
            return {
                ...state,
                error: null,
                created: false,
            };
        }
        case actions.CREATE_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                created: true,
                resource: action.payload.resource,
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
                error: null,
                destroyed: false,
            };
        case actions.DESTROY_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                destroyed: true,
                // resource: action.payload.resource,
            };
        case actions.DESTROY_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                destroyed: false,
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
        case actions.GET_ALL_RESOURCES_REQUEST: {
            return {
                ...state,
                error: null,
                fetching_resources: true,
                resources: [],
            };
        }
        case actions.GET_ALL_RESOURCES_SUCCESS: {
            const { resources } = action.payload;
            return {
                ...state,
                resources,
                error: null,
                fetching_resources: false,
            };
        }
        case actions.GET_ALL_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
            };
        case actions.GET_PAGINATED_RESOURCES_REQUEST: {
            const { data } = action.payload;
            return {
                ...state,
                error: null,
                fetching_resources: true,
                current_page: data.page,
                paginated_resources: {
                    ...state.paginated_resources,
                    [data.page]: []
                },
                total: 0,
            };
        }
        case actions.GET_PAGINATED_RESOURCES_SUCCESS: {
            const { data, total, current_page } = action.payload;
            return {
                ...state,
                current_page: current_page,
                error: null,
                fetching_resources: false,
                paginated_resources: {
                    ...state.paginated_resources,
                    [current_page]: data
                },
                total: total,
            };
        }
        case actions.GET_PAGINATED_RESOURCES_ERROR:
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0,
            };
        case actions.RECOVER_RESOURCE_REQUEST:
            return {
                ...state,
                created: false,
                error: null,
                recovered: false,
            };
        case actions.RECOVER_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                error: null,
                resource: resource,
                paginated_resources: updatePaginatedResourcesFromResource(state.paginated_resources, resource),
                recovered: true,
            };
        }
        case actions.RECOVER_RESOURCE_ERROR:
            return {
                ...state,
                error: action.error,
                recovered: false,
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
                resource: resource,
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
