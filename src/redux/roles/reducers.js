import actions from './actions';
import { updatePaginatedResourcesFromResource } from '../../helpers/paginatedResources';

const initial_state = {
    created: false,
    destroyed: false,
    current_page: 1,
    error: null,
    fetching_resources: false,
    resource: null,
    resources: {
        1: []
    },
    total: 0,
    updated: false
};

const reducer = (state = initial_state, action) => {
    // console.log('action dispatched', action);
    switch(action.type) {
        case actions.CHANGE_PAGE_RESOURCES:
            return {
                ...state,
                current_page: action.payload.data.page
            };
        case actions.CLEAR_METADATA_RESOURCES: {
            const { data } = action.payload;
            // console.log(action.type);
            return {
                ...state,
                current_page: 1,
                destroyed: false,
                error: null,
                fetching_resources: false,
                resources: (
                        data.query !== ''
                        && data.query !== null
                        && typeof data.query !== 'undefined'
                    )
                    // If I've searched before,
                    // Clear the resources so on next reload
                    // A re-fetch will be needed
                    ? {
                        1: []
                    }
                    : {
                        ...state.resources
                    }
            };
        }
        case actions.CLEAR_METADATA_RESOURCE_EDIT:
            return {
                ...state,
                error: null,
                updated: false,
                created: false,
                resource: null
            };
        case actions.CLEAR_METADATA_RESOURCE_CREATE:
            return {
                ...state,
                error: null,
                // created: false,
                resource: null
            };
        case actions.CREATE_RESOURCE_REQUEST: {
            // console.log('creatingResource dispatched');
            return {
                ...state,
                error: null,
                created: false
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
            // console.log('creatingResource error:', action);
            return {
                ...state,
                error: action.error,
                created: false
            };
        case actions.DESTROY_RESOURCE_REQUEST:
            // console.log('deletingResource dispatched');
            return {
                ...state,
                error: null,
                destroyed: false
            };
        case actions.DESTROY_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                destroyed: true,
                // resource: action.payload.resource,
            };
        case actions.DESTROY_RESOURCE_ERROR:
            // console.log('deletingResource error:', action);
            return {
                ...state,
                error: action.error,
                destroyed: false
            };
        case actions.FIND_RESOURCE_REQUEST:
            // console.log('findResource dispatched');
            return {
                ...state,
                error: null
            };
        case actions.FIND_RESOURCE_SUCCESS:
            return {
                ...state,
                error: null,
                resource: action.payload.resource,
            };
        case actions.FIND_RESOURCE_ERROR:
            // console.log('findResource error:', action);
            return {
                ...state,
                error: action.error
            };
        case actions.GET_PAGINATED_RESOURCES_REQUEST: {
            // console.log('getPaginatedResources state', state);
            // console.log('getPaginatedResources dispatched', action);
            const { data } = action.payload;
            return {
                ...state,
                error: null,
                fetching_resources: true,
                current_page: data.page,
                resources: {
                    ...state.resources,
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
                resources: {
                    ...state.resources,
                    [current_page]: data
                },
                total: total,
            };
        }
        case actions.GET_PAGINATED_RESOURCES_ERROR:
            // console.log('getPaginatedResources error:', action);
            return {
                ...state,
                error: action.error,
                fetching_resources: false,
                total: 0
            };
        case actions.UPDATE_RESOURCE_REQUEST:
            // console.log('updatingResource dispatched');
            return {
                ...state,
                created: false,
                error: null,
                updated: false
            };
        case actions.UPDATE_RESOURCE_SUCCESS: {
            const { resource } = action.payload;
            return {
                ...state,
                error: null,
                updated: true,
                resource: resource,
                resources: updatePaginatedResourcesFromResource(state.resources, resource)
            };
        }
        case actions.UPDATE_RESOURCE_ERROR:
            // console.log('updatingResource error:', action);
            return {
                ...state,
                error: action.error,
                updated: false
            };
        default:
            return state;
    }
};

export default reducer;
